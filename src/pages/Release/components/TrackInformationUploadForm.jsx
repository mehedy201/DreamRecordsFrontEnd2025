import * as RadioGroup from "@radix-ui/react-radio-group";
import ReleaseAudioUpload from "../../../components/ReleaseAudioUpload";
import SearchDropdown from "../../../components/SearchDropdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import SelectDropdownForCreateRelease from "../../../components/SelectDropdownForCreateRelease";
import { useSelector } from "react-redux";

const TrackInformationUploadForm = ({artistsItems, lablesItems, trackFormat, step, setStep, steps,setShowForm, handlePrev}) => {

    const { yearsList } = useSelector(state => state.yearsAndStatus);
    // Genre and Language Data Get Form API ____________________________
    const [allGenre, setAllGenre] = useState()
    const [language, setLanguage] = useState()
    useEffect(() => {
        axios.get(`http://localhost:5000/admin/api/v1/genre`)
        .then(res => {
            const data = res.data.data;
            const genreArray = data.map(item => item.genre);
            setAllGenre(genreArray);
        })
        axios.get('http://localhost:5000/admin/api/v1/language')
        .then(res => {
            const data = res.data.data
            const l = data.map(item => item.language);
            console.log(l)
            setLanguage(l);
        })
    }, [])
    
    const {register, handleSubmit, setValue, watch, control, formState: {errors}} = useForm()
    
    const onSubmit = async (data) => {
        if(trackFormat === 'Singles'){
            console.log(data)  
            if (step < steps.length - 1) {
                setStep(step + 1);
            }
        }else{
            console.log(data)  
            setShowForm(false)
        }        
    }


  return (
    <div>
      <>
        <ReleaseAudioUpload/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Tittle *</label>
            <input type="text" {...register("tittle", { required: true})}/>
            {errors.tittle && <span style={{color: '#ea3958', marginTop: '5px'}}> Tittle Required</span>}

            <label>Version/Subtittle</label>
            <input type="text" {...register("versionSubtittle")}/>
            <div className="form-grid release-form-grid">
            <div>
                <label htmlFor="">Primary Artist *</label>

                <SearchDropdown
                    items={artistsItems}
                    searchTxt="Search and select primary artist"
                    itemName="Artist"
                    register={{...register("primaryArtist", { required: true})}}
                    onSelect={(items) => setValue("primaryArtist", items, { shouldValidate: true })}
                    value={watch("primaryArtist")}
                />
                {errors.primaryArtist && <span style={{color: '#ea3958'}}>Please Select Artist</span>}
            </div>
            <div>
                <label htmlFor="">Featuring</label>

                <SearchDropdown
                    items={artistsItems}
                    searchTxt="Search and select featuring"
                    itemName="Artist"
                    onSelect={(items) => setValue("featuring", items, { shouldValidate: true })}
                    value={watch("featuring")}
                />
            </div>
            <div>
                <label htmlFor="">Lyricist *</label>

                <SearchDropdown
                    items={artistsItems}
                    searchTxt="Search and select lyricist"
                    itemName="Artist"
                    register={{...register("lyricist", { required: true})}}
                    onSelect={(items) => setValue("lyricist", items, { shouldValidate: true })}
                    value={watch("lyricist")}
                />
                {errors.lyricist && <span style={{color: '#ea3958'}}>Please Select Lyricist</span>}
            </div>
            <div>
                <label htmlFor="">Composer *</label>

                <SearchDropdown
                    items={artistsItems}
                    searchTxt="Search and select composer"
                    itemName="Artist"
                    register={{...register("composer", { required: true})}}
                    onSelect={(items) => setValue("composer", items, { shouldValidate: true })}
                    value={watch("composer")}
                />
                {errors.composer && <span style={{color: '#ea3958'}}>Please Select Composer</span>}
            </div>
            <div>
                <label>Arranger</label>
                <input type="text" {...register("arranger")}/>
            </div>
            <div>
                <label>Producer</label>
                <input type="text" {...register("producer")}/>
            </div>
            </div>
            <label>Publisher</label>
            <input type="text" {...register("publisher")}/>
            <div className="form-grid release-form-grid">
            <div>
                <label htmlFor="">Genre *</label>
                <SelectDropdownForCreateRelease
                    options={allGenre}
                    placeholder="Select genre..."
                    className="createRelease-dropdown"
                    register={{...register("genre", { required: true})}}
                    dataName='genre'
                    setValue={setValue}
                    defaultValue={watch("genre")}
                    errors={errors}
                />
            </div>
            <div>
                <label htmlFor="">Sub-Genre *</label>
                <SelectDropdownForCreateRelease
                    options={allGenre}
                    placeholder="Select sub-genre..."
                    className="createRelease-dropdown"
                    register={{...register("subGenre", { required: true})}}
                    dataName='subGenre'
                    setValue={setValue}
                    defaultValue={watch("subGenre")}
                    errors={errors}
                />
            </div>
            <div>
                <label>℗ line *</label>
                <input type="text" {...register("pLine", { required: true})}/>
            </div>
            <div>
                <label htmlFor="">Production Year *</label>
                <SelectDropdownForCreateRelease
                    options={yearsList.map(String)}
                    placeholder="Select a year..."
                    className="createRelease-dropdown"
                    register={{...register("productionYear", { required: true})}}
                    dataName='productionYear'
                    setValue={setValue}
                    defaultValue={watch("productionYear")}
                    errors={errors}
                />
            </div>
            <div>
                <label htmlFor="">Do you already have a ISRC? *</label>
                <RadioGroup.Root className="radio-group" defaultValue="Yes">
                <label className="radio-label">
                    <span>
                    <RadioGroup.Item className="radio-item" value="No" />
                    &nbsp; No
                    </span>
                </label>
                <label className="radio-label">
                    <span>
                    <RadioGroup.Item className="radio-item" value="Yes" />
                    &nbsp; Yes
                    </span>
                </label>
                </RadioGroup.Root>
            </div>
            <div>
                <label>ISRC *</label>
                <input type="text" {...register("ISRC", { required: true})}/>
            </div>
            <div>
                <label htmlFor="">Parental advisory *</label>
                <RadioGroup.Root className="radio-group" defaultValue="Yes">
                <label className="radio-label">
                    <span>
                    <RadioGroup.Item className="radio-item" value="No" />
                    &nbsp; No
                    </span>
                </label>
                <label className="radio-label">
                    <span>
                    <RadioGroup.Item className="radio-item" value="Yes" />
                    &nbsp; Yes
                    </span>
                </label>
                <label className="radio-label">
                    <span>
                    <RadioGroup.Item className="radio-item" value="Cleaned" />
                    &nbsp; Cleaned
                    </span>
                </label>
                </RadioGroup.Root>
            </div>
            <div>
                <label htmlFor="">Preview start </label>
                <input type="number" {...register("previewStart")}/>
            </div>
            </div>
            <label htmlFor="">Lyrics Language *</label>
            <SelectDropdownForCreateRelease
                options={language}
                placeholder="Select language..."
                className="createRelease-dropdown"
                register={{...register("language", { required: true})}}
                dataName='language'
                setValue={setValue}
                defaultValue={watch("language")}
                errors={errors}
            />

            <label htmlFor="">Lyrics</label>
            <textarea {...register("text")}></textarea>
            <br />
            <br />
            {
                trackFormat === 'Singles' ?
                <>
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
                        <ArrowLeft /> &nbsp; Back
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
                    {step < steps.length - 1 ? (
                    <button className="theme-btn" type="submit">
                        Next &nbsp; <ArrowRight />
                    </button>
                    ) : (
                    <button className="theme-btn" onClick={() => setStep(4)}>
                        Submit &nbsp; <ArrowRight />
                    </button>
                    )}
                </div>
                )}
                </> : <button type="submit" className="theme-btn" style={{ width: "100%", margin: "0" }}>
                Add Track +
                </button>
            }
        </form>
      </>
    </div>
  );
};

export default TrackInformationUploadForm;
