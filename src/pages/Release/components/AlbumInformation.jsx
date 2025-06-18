import * as RadioGroup from "@radix-ui/react-radio-group";
import SearchDropdown from "../../../components/SearchDropdown";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SelectDropdownForCreateRelease from "../../../components/SelectDropdownForCreateRelease";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReleaseImgUpload from "../../../components/ReleaseImgUpload";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setReleaseAlbumInfo } from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";

function AlbumInformation({ artistsItems, LablesItems, step, setStep, steps, handlePrev }) {
    
  const {userNameIdRoll} = useSelector((state) => state.userData);
  const { yearsList } = useSelector(state => state.yearsAndStatus);
  const { releaseAlbumInfo } = useSelector(state => state.releaseData);
  const dispatch = useDispatch()

  const [imgLink, setImgLink] = useState();
  const [uploadedImage, setUploadedImage] = useState();

  const [allGenre, setAllGenre] = useState()
  useEffect(() => {

    axios.get(`http://localhost:5000/admin/api/v1/genre`)
    .then(res => {
        const data = res.data.data;
        const genreArray = data.map(item => item.genre);
        setAllGenre(genreArray);
    })




    // if(userNameIdRoll){
    //   axios.get(`http://localhost:5000/api/v1/release/${userNameIdRoll[1]}?page=1&limit=6&status=All`)
    //           .then( res => {
    //             if(res.status == 200){
    //               console.log(res.data.data)
    //             }
    //           })
    //           .catch(er => console.log(er));
    // }
  }, [])

  const [isVariousArtists, setIsVariousArtists] = useState("no");
  const [isUPC, setIsUPC] = useState("yes");


  const {register, handleSubmit, setValue, watch, control, formState: {errors}} = useForm({
    defaultValues: releaseAlbumInfo
  })
  const onSubmit = async (data) => {
    console.log(data)  
    dispatch(setReleaseAlbumInfo(data))       
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  }

  return (
    <div>
      <h3 className="create-release-heading">Fill Album Information</h3>
      <div className="createRelease-content-div">
        {" "}
        <ReleaseImgUpload
          link={`http://localhost:5000/api/v1/release/upload-release-img`}
          setImgLink={setImgLink}
          imgLink={imgLink}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          title="Album Artwork *"
          description="This will be displayed on Release profile"
          placeholderImg="upload-img.png"
          placeholderTxt="Drop your image here"
        />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Release Tittle *</label>
          <input type="text" {...register("releaseTitle", { required: true})}/>
          {errors.releaseTitle && <span style={{color: '#ea3958'}}>Release Tittle Name Required</span>}

          <label>Version/subtittle</label>
          <input type="text" {...register("subTitle")}/>

          <div className="form-grid release-form-grid">
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
                      setIsVariousArtists(value)
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
              {errors.isVariousArtists && <span style={{color: '#ea3958'}}>This field Required</span>}

            </div>
            {isVariousArtists === "yes" && 
              <div>
                <label htmlFor="">Select Artist *</label>
                <SearchDropdown
                  items={artistsItems}
                  itemKey="name"
                  imagePath="artists/"
                  imageKey="img"
                  searchTxt="Search and select artist"
                  itemName="Artist"
                  onSelect={(items) => setValue("globalArtist", items, { shouldValidate: true })}
                  register={{...register("globalArtist", { required: true})}}
                />
                {errors.globalArtist && <span style={{color: '#ea3958'}}>Please Select Artist</span>}
              </div>
            }
          </div>
          <label htmlFor="">Featuring</label>
          <SearchDropdown
            items={artistsItems}
            itemKey="name"
            imagePath="artists/"
            imageKey="img"
            itemName="Artist"
            searchTxt="Search and select Genre"
            onSelect={(items) => setValue("globalFeatureing", items, { shouldValidate: true })}
          />
         
          <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">Genre *</label>

              <SelectDropdownForCreateRelease
                options={allGenre}
                placeholder="Select genre..."
                className="createRelease-dropdown"
                register={{...register("globalGenre", { required: true})}}
                dataName='globalGenre'
                setValue={setValue}
                defaultValue={watch("globalGenre")}
                errors={errors}
              />
            </div>
            <div>
              <label htmlFor="">Sub-Genre *</label>
              <SelectDropdownForCreateRelease
                options={allGenre}
                placeholder="Select sub-genre..."
                className="createRelease-dropdown"
                dataName='globalSubGenre'
                register={{...register("globalSubGenre", { required: true})}}
                setValue={setValue}
                defaultValue={watch("globalSubGenre")}
                errors={errors}
              />
            </div>
          </div>
          <label htmlFor="">Label Name *</label>
          <SearchDropdown
            items={LablesItems}
            itemKey="name"
            imagePath="lables/"
            imageKey="img"
            itemName="Label"
            searchTxt="Search and select label"
            onSelect={(items) => setValue("globalLabel", items, { shouldValidate: true })}
            register={{...register("globalLabel", { required: true})}}
          />
          {errors.globalLabel && <span style={{color: '#ea3958'}}>Please Select Label</span>}

          <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">Production Year *</label>
              <SelectDropdownForCreateRelease
                options={yearsList.map(String)}
                placeholder="Select a year..."
                className="createRelease-dropdown"
                dataName='productionYear'
                register={{...register("productionYear", { required: true})}}
                setValue={setValue}
                defaultValue={watch("productionYear")}
                errors={errors}
              />
            </div>
            <div>
              <label htmlFor="">Physical/Original release date *</label>
              <input
                {...register("orginalReleaseDate", { required: true})}
                type="date"
                style={{
                  width: "auto",
                  height: "40px",
                  padding: "0 !important",
                }}
              />
              {errors.orginalReleaseDate && <span style={{color: '#ea3958'}}>Physical/Original release date Required</span>}
            </div>
          </div>
          <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">℗ line *</label>
              <input type="text" defaultValue={'P Line'} {...register("pLine", { required: true})}/>
              {errors.pLine && <span style={{color: '#ea3958'}}>P Line Required</span>}
            </div>
            <div>
              <label htmlFor="">© line *</label>
              <input type="text" defaultValue={'C Line'} {...register("cLine", { required: true})}/>
              {errors.cLine && <span style={{color: '#ea3958'}}>C Line Required</span>}
            </div>
          </div>
          <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">Do you already have a UPC/EAN? *</label>

              {/* <RadioGroup.Root
                {...register("haveUPCean", { required: true})}
                className="radio-group"
                value={isUPC}
                onValueChange={value =>setIsUPC(value)}
              >
                <label className="radio-label">
                  <span>
                    <RadioGroup.Item className="radio-item" value="no" />
                    &nbsp; No
                  </span>
                </label>
                <label className="radio-label">
                  <span>
                    <RadioGroup.Item className="radio-item" value="yes" />
                    &nbsp; Yes
                  </span>
                </label>
              </RadioGroup.Root> */}

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
                      setIsUPC(value)
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
              {errors.haveUPCean && <span style={{color: '#ea3958'}}>This field Required</span>}
            </div>
            {isUPC === "yes" && (
              <div>
                <label htmlFor="">UPC/EAN *</label>
                <input {...register("UPC", { required: true})} type="text" />
                {errors.UPC && <span style={{color: '#ea3958'}}>UPC/EAN field Required</span>}
              </div>
            )}
          </div>
            {step === 4 || (
              <div className="createRelease-btns">
                {step > 0 && (
                  <button
                    className="theme-btn2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handlePrev}
                  >
                    <ArrowLeft />
                    &nbsp; Back
                  </button>
                )}
                <button
                  style={{
                    margin: "auto",
                    background: "none",
                    border: "none",
                  }}
                >
                  cancel
                </button>
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
  artistsItems: PropTypes.array.isRequired,
  LablesItems: PropTypes.array.isRequired,
};
export default AlbumInformation;
