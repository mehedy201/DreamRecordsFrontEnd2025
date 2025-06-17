import * as RadioGroup from "@radix-ui/react-radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";

function ReleaseDate({step, setStep, steps, handleNext, handlePrev}) {
  return (
    <>
      <h3 className="create-release-heading">Release start date</h3>
      <div className="createRelease-content-div">
        <br />
        <RadioGroup.Root
          className="radio-group releaseDtae-radio-group"
          defaultValue="specificDate"
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
                <RadioGroup.Item className="radio-item" value="specificDate" />
                &nbsp; On a specific date
              </span>
            </label>
            <br />
            <input type="date" style={{ width: "auto", color: "#838383" }} />
          </div>
        </RadioGroup.Root>
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
          {step < steps.length - 1 ? (
            <button className="theme-btn" onClick={handleNext}>
              Next &nbsp; <ArrowRight />
            </button>
          ) : (
            <button className="theme-btn" onClick={() => setStep(4)}>
              Submit &nbsp; <ArrowRight />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default ReleaseDate;
