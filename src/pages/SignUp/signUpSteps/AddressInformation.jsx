import Dropdown from '../../../components/Dropdown';

const AddressInformation = () => {
    return (
        <div>
            <div>
                <label htmlFor="">Address Line 1 *</label>
                <input
                  type="text"
                  name="addressLine1"
                />
                <label htmlFor="">Address Line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                />
                <div className="signUp-form-grid">
                  <div>
                    <label htmlFor="">Select Country *</label>
                    <Dropdown
                      label="India"
                      options={["Option 1", "Option 2", "Option 3"]}
                      className="signUp-dropdown-trigger"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Select State *</label>
                    <Dropdown
                      label="West Bengal"
                      options={["Option 1", "Option 2", "Option 3"]}
                      className="signUp-dropdown-trigger"
                    />
                  </div>
                  <div>
                    <label htmlFor="">City *</label>

                    <input
                      type="text"
                      name="state"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      className="input-field"
                    />
                  </div>
                </div>
            </div>
        </div>
    );
};

export default AddressInformation;