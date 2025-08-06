import * as RadioGroup from "@radix-ui/react-radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setReleaseDate } from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";

function ReleaseDate({ step, setStep, steps, handlePrev }) {

  const { releaseDate} = useSelector(state => state.releaseData);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split('T')[0];



  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      releaseOption: releaseDate?.releaseOption ? releaseDate.releaseOption : "specificDate",
      releaseDate: releaseDate?.releaseDate ? releaseDate?.releaseDate : "",
    },
  });

  const selectedOption = watch("releaseOption");
  const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const isoDate = tomorrow.toISOString().split('T')[0];
  const onSubmit = (data) => {
    if(data.releaseOption === 'AsSoonAsPossible'){
      data.releaseDate = isoDate
    }
    console.log(data)
    dispatch(setReleaseDate(data))
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  return (
    <>
      <h3 className="create-release-heading">Release start date</h3>
      <div className="createRelease-content-div">
        <br />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="releaseOption"
            control={control}
            render={({ field }) => (
              <RadioGroup.Root
                className="radio-group releaseDtae-radio-group"
                value={field.value}
                onValueChange={field.onChange}
              >
                <div>
                  <label className="radio-label">
                    <span style={{ justifyContent: "left" }}>
                      <RadioGroup.Item
                        className="radio-item"
                        value="AsSoonAsPossible"
                      />
                      &nbsp; As soon as possible
                    </span>
                  </label>
                  <p style={{ fontSize: "14px", color: "#838383" }}>
                    Usually a few hours, but can be a few days for some
                    stores/services.
                  </p>
                </div>
                <div>
                  <label className="radio-label">
                    <span>
                      <RadioGroup.Item
                        className="radio-item"
                        value="specificDate"
                      />
                      &nbsp; On a specific date
                    </span>
                  </label>
                  <br />
                  {selectedOption === "specificDate" && (
                    <Controller
                      name="releaseDate"
                      control={control}
                      rules={{ 
                        required: "Date is required",
                        validate: value => 
                          value >= today || "Please select today or a future date"
                      }}
                      render={({ field }) => (
                        <>
                          <input
                            type="date"
                            style={{ width: "auto", color: "#838383" }}
                            {...field}
                          />
                          {errors.releaseDate && (
                            <p style={{ color: "red", fontSize: "12px" }}>
                              {errors.releaseDate.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  )}
                </div>
              </RadioGroup.Root>
            )}
          />

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
                  type="button"
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
                type="button"
              >
                cancel
              </button>
              {step < steps.length - 1 ? (
                <button className="theme-btn" type="submit">
                  Next &nbsp; <ArrowRight />
                </button>
              ) : (
                <button className="theme-btn" type="submit">
                  Submit &nbsp; <ArrowRight />
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default ReleaseDate;
