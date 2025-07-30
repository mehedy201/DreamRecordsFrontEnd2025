import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";

const PersonalDetails = () => {

    const [phone, setPhone] = useState("");
    const [formData, setFormData] = useState('individual');

    return (
        <div>
            <div>
                <label>Account Type*</label>
                <RadioGroup.Root
                  className="signUp-radio-group radio-group"
                  value={formData}
                  onValueChange={(value) => {
                        console.log(value)
                        setFormData(value)
                    }
                  }
                >
                  <label
                    className="radio-label signUp-label"
                    style={{
                      border:
                        formData === "Individual" &&
                        "1px solid #dc3e42",
                    }}
                  >
                    <RadioGroup.Item
                      className="radio-item"
                      value="Individual"
                    />
                    Individual
                  </label>
                  <label
                    className="radio-label signUp-label"
                    style={{
                      border:
                        formData === "Distributor" &&
                        "1px solid #dc3e42",
                    }}
                  >
                    <RadioGroup.Item
                      className="radio-item"
                      value="Distributor"
                    />
                    Distributor
                  </label>
                  <label
                    className="radio-label signUp-label"
                    style={{
                      border:
                        formData === "IndividualArtist" &&
                        "1px solid #dc3e42",
                    }}
                  >
                    <RadioGroup.Item
                      className="radio-item"
                      value="IndividualArtist"
                    />
                    Individual Artist
                  </label>
                </RadioGroup.Root>
                <label>First Name *</label>

                <input
                  type="text"
                  name="firstName"
                //   onChange={handleChange}
                />
                <label>Last Name *</label>

                <input
                  type="text"
                  name="lastName"
                //   onChange={handleChange}
                />
                <label>Phone *</label>
                <PhoneInput
                  country={"in"} // Default country
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  inputClass="phone-input-field"
                  buttonClass="phone-dropdown"
                  className="signUp-phone-input"
                />
            </div>
        </div>
    );
};

export default PersonalDetails;