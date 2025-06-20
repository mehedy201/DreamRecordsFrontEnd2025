import * as RadioGroup from "@radix-ui/react-radio-group";
import ReleaseAudioUpload from "../../../components/ReleaseAudioUpload";
import SearchDropdown from "../../../components/SearchDropdown";
import SelectDropdown from "../../../components/SelectDropdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";

const TrackInformationUploadForm = ({artistsItems, lablesItems, trackFormat, step, setStep, steps,setShowForm, handlePrev}) => {

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
            <input type="text" />
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
                <input type="text" />
            </div>
            <div>
                <label>Producer</label>
                <input type="text" />
            </div>
            </div>
            <label>Publisher</label>
            <input type="text" />
            <div className="form-grid release-form-grid">
            <div>
                <label htmlFor="">Genre *</label>
                <SelectDropdown
                options={["Option 1", "Option 2", "Option 3"]}
                placeholder="Select genre..."
                className="createRelease-dropdown"
                />
            </div>
            <div>
                <label htmlFor="">Sub-Genre *</label>
                <SelectDropdown
                options={["Option 1", "Option 2", "Option 3"]}
                placeholder="Select sub-genre..."
                className="createRelease-dropdown"
                />
            </div>
            <div>
                <label>℗ line *</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="">Production Year *</label>
                <SelectDropdown
                options={["Option 1", "Option 2", "Option 3"]}
                placeholder="Select a year..."
                className="createRelease-dropdown"
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
                <input type="text" />
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
                <input type="number" />
            </div>
            </div>
            <label htmlFor="">Lyrics Language *</label>
            <SelectDropdown
            options={["Option 1", "Option 2", "Option 3"]}
            placeholder="Select language..."
            className="createRelease-dropdown"
            />

            <label htmlFor="">Lyrics</label>
            <textarea></textarea>
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
