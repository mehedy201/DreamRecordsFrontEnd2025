import * as RadioGroup from "@radix-ui/react-radio-group";
import SearchDropdown from "../../../components/SearchDropdown";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SelectDropdownForCreateRelease from "../../../components/SelectDropdownForCreateRelease";
import { ArrowRight } from "lucide-react";
import ReleaseImgUpload from "../../../components/ReleaseImgUpload";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setReleaseAlbumInfo } from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";

function AlbumInformation({ step, setStep, steps }) {
  const { userNameIdRoll } = useSelector((state) => state.userData);
  const { yearsList } = useSelector((state) => state.yearsAndStatus);
  const { releaseAlbumInfo } = useSelector((state) => state.releaseData);
  const { reFetchLabel, reFetchArtist } = useSelector(
    (state) => state.reFetchSlice
  );

  const dispatch = useDispatch();

  const [imgLink, setImgLink] = useState(
    releaseAlbumInfo ? releaseAlbumInfo?.imgUrl : ""
  );
  const defaultImgURL = releaseAlbumInfo.imgURL;
  const defaultKey = releaseAlbumInfo.key;
  const [uploadedImage, setUploadedImage] = useState({
    imgURL: defaultImgURL,
    key: defaultKey,
  });

  // Genre Data Get Form API ____________________________
  const [allGenre, setAllGenre] = useState();
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/settings/genre`
      )
      .then((res) => {
        const data = res.data.data;
        const genreArray = data.map((item) => item.genre);
        setAllGenre(genreArray);
      });
  }, []);

  // Label Data Get Form API ____________________________
  const [lebel, setLabel] = useState();
  useEffect(() => {
    if (userNameIdRoll) {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/labels/for-release/${userNameIdRoll[1]}`
        )
        .then((res) => {
          setLabel(res.data.data);
        });
    }
  }, [userNameIdRoll, reFetchLabel]);

  const [isUPC, setIsUPC] = useState(
    releaseAlbumInfo ? releaseAlbumInfo?.haveUPCean : "yes"
  );

  // Form For Submit Album Information ____________________________________________________
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: releaseAlbumInfo,
  });
  const [imgNotFoundErr, setImgNotFoundErr] = useState();
  const onSubmit = async (data) => {
    setImgNotFoundErr("");
    if (!uploadedImage) {
      setImgNotFoundErr("Please Add Image");
      return;
    }
    if (data.haveUPCean === "no") delete data?.UPC;

    const albumInfoData = { ...data, ...uploadedImage };

    dispatch(setReleaseAlbumInfo(albumInfoData));

    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  return (
    <div>
      <h3 className="create-release-heading">Fill Album Information</h3>
      <div className="createRelease-content-div">
        {" "}
        <ReleaseImgUpload
          link={`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/upload-release-img`}
          setImgLink={setImgLink}
          imgLink={imgLink}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
        {imgNotFoundErr && <p style={{ color: "#ea3958" }}>{imgNotFoundErr}</p>}
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Release Tittle *</label>
          <input
            type="text"
            {...register("releaseTitle", { required: true })}
          />
          {errors.releaseTitle && (
            <span style={{ color: "#ea3958" }}>Release Tittle Required</span>
          )}

          <label>Version/subtittle</label>
          <input type="text" {...register("subTitle")} />

          {/* <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">
                Is this a compilation of various artists? *
              </label>
              <Controller
                name="isVariousArtists"
                control={control}
                rules={{ required: "This selection is required" }}
                render={({ field }) => (
                  <RadioGroup.Root
                    className="radio-group"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsVariousArtists(value);
                      console.log(value)
                    }}
                  >
                    <label className="radio-label">
                      <RadioGroup.Item className="radio-item" value="no" /> No
                    </label>
                    <label className="radio-label">
                      <RadioGroup.Item className="radio-item" value="yes" /> Yes
                    </label>
                  </RadioGroup.Root>
                )}
              />
              {errors.isVariousArtists && (
                <span style={{ color: "#ea3958" }}>This field Required</span>
              )}
            </div>
            {isVariousArtists === "no" && (
              <div>
                <label htmlFor="">Select Artist *</label>
                <SearchDropdown
                  items={artist}
                  searchTxt="Search and select artist"
                  itemName="Artist"
                  register={{ ...register("artist", { required: isVariousArtists === "no" ? true : false }) }}
                  onSelect={(items) =>
                    setValue("artist", items, { shouldValidate: true })
                  }
                  value={watch("artist")} // Pass current value
                />
                {errors.artist && (
                  <span style={{ color: "#ea3958" }}>Please Select Artist</span>
                )}
              </div>
            )}
          </div>
          <label htmlFor="">Featuring</label>
          <SearchDropdown
            items={artist}
            itemName="Artist"
            searchTxt="Search and select Featuring"
            onSelect={(items) =>
              setValue("featuring", items, { shouldValidate: true })
            }
            value={watch("featuring")}
          /> */}

          <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">Genre *</label>

              <SelectDropdownForCreateRelease
                options={allGenre}
                placeholder="Select genre..."
                className="createRelease-dropdown"
                register={{ ...register("genre", { required: true }) }}
                dataName="genre"
                setValue={setValue}
                defaultValue={watch("genre")}
              />
              {errors.genre && (
                <span style={{ color: "#ea3958" }}>Genre Required</span>
              )}
            </div>
            <div>
              <label htmlFor="">Sub-Genre</label>
              {/* <SelectDropdownForCreateRelease
                options={allGenre}
                placeholder="Select sub-genre..."
                className="createRelease-dropdown"
                dataName='subGenre'
                register={{...register("subGenre", { required: true})}}
                setValue={setValue}
                defaultValue={watch("subGenre")}
              /> */}
              <input type="text" {...register("subGenre")} />
              {errors.subGenre && (
                <span style={{ color: "#ea3958" }}>Sub Genre Required</span>
              )}
            </div>
          </div>
          <label htmlFor="">Label Name *</label>
          <SearchDropdown
            items={lebel}
            itemName="Label"
            searchTxt="Search and select label"
            onSelect={(items) =>
              setValue("labels", items, { shouldValidate: true })
            }
            register={{ ...register("labels", { required: true }) }}
            value={watch("labels")}
          />
          {errors.labels && (
            <span style={{ color: "#ea3958" }}>Please Select Label</span>
          )}

          <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">Production Year *</label>
              <SelectDropdownForCreateRelease
                options={yearsList.map(String)}
                placeholder="Select a year..."
                className="createRelease-dropdown"
                dataName="productionYear"
                register={{ ...register("productionYear", { required: true }) }}
                setValue={setValue}
                defaultValue={watch("productionYear")}
              />
              {errors.productionYear && (
                <span style={{ color: "#ea3958" }}>
                  Production Year Required
                </span>
              )}
            </div>
            <div>
              <label htmlFor="">Physical/Original release date *</label>
              <input
                {...register("orginalReleaseDate", { required: true })}
                type="date"
                style={{
                  width: "auto",
                  height: "40px",
                  padding: "0 !important",
                }}
              />
              {errors.orginalReleaseDate && (
                <span style={{ color: "#ea3958" }}>
                  Physical/Original release date Required
                </span>
              )}
            </div>
          </div>
          <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">℗ line *</label>
              <input type="text" {...register("pLine", { required: true })} />
              {errors.pLine && (
                <span style={{ color: "#ea3958" }}>P Line Required</span>
              )}
            </div>
            <div>
              <label htmlFor="">© line *</label>
              <input type="text" {...register("cLine", { required: true })} />
              {errors.cLine && (
                <span style={{ color: "#ea3958" }}>C Line Required</span>
              )}
            </div>
          </div>
          <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">Do you already have a UPC/EAN? *</label>

              <Controller
                name="haveUPCean"
                control={control}
                rules={{ required: "This selection is required" }}
                render={({ field }) => (
                  <RadioGroup.Root
                    className="radio-group"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsUPC(value);
                    }}
                  >
                    <label className="radio-label">
                      <RadioGroup.Item className="radio-item" value="no" /> No
                    </label>
                    <label className="radio-label">
                      <RadioGroup.Item className="radio-item" value="yes" /> Yes
                    </label>
                  </RadioGroup.Root>
                )}
              />
              {errors.haveUPCean && (
                <span style={{ color: "#ea3958" }}>This field Required</span>
              )}
            </div>
            {isUPC === "yes" && (
              <div>
                <label htmlFor="">UPC/EAN *</label>
                <input {...register("UPC", { required: true })} type="text" />
                {errors.UPC && (
                  <span style={{ color: "#ea3958" }}>
                    UPC/EAN field Required
                  </span>
                )}
              </div>
            )}
          </div>
          {step === 4 || (
            <div
              style={{ justifyContent: "end" }}
              className="createRelease-btns"
            >
              <button type="submit" className="theme-btn">
                Next &nbsp; <ArrowRight />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
AlbumInformation.propTypes = {
  artist: PropTypes.array.isRequired,
  LablesItems: PropTypes.array.isRequired,
};
export default AlbumInformation;
