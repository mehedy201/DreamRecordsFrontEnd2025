import { useState } from "react";
import "./Settings.css";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
// import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import * as RadioGroup from "@radix-ui/react-radio-group";
import Dropdown from "../../components/Dropdown";
// import * as RadixRadioGroup from "@radix-ui/react-radio-group";
function Settings() {
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [bankAccountType, setBankAccountType] = useState("savings");
  const [bankBusinessTypeOption, setBankBusinessTypeOption] = useState(false);
  return (
    <div className="main-content">
      <h2 style={{ fontSize: "24px", fontWeight: "500" }}>Settings</h2>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
        <div className="settings-div">
          <h4>Payout Preference</h4>
          <p>Default Payout Method</p>
          <div className="form-container" style={{ position: "relative" }}>
            {/* Radix UI Select */}
            <Select.Root value={paymentMethod} onValueChange={setPaymentMethod}>
              <Select.Trigger className="select-trigger">
                <span>
                  {paymentMethod === "bank"
                    ? "Bank Account"
                    : paymentMethod === "payoneer"
                    ? "Payoneer"
                    : paymentMethod === "paypal"
                    ? "PayPal"
                    : "bKash"}
                </span>
                <Select.Icon className="chevron-icon">
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="settings-select-content"
                  position="popper"
                >
                  <Select.Viewport>
                    <Select.Item className="settings-select-item" value="bank">
                      Bank Account
                    </Select.Item>
                    <Select.Item
                      className="settings-select-item"
                      value="payoneer"
                    >
                      Payoneer
                    </Select.Item>
                    <Select.Item
                      className="settings-select-item"
                      value="paypal"
                    >
                      PayPal
                    </Select.Item>
                    <Select.Item className="settings-select-item" value="bKash">
                      bKash
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            {/* Dynamic Form Fields */}
            {paymentMethod === "bank" ? (
              <div>
                <p>Account Type*</p>
                <RadioGroup.Root
                  className="radio-group"
                  value={bankAccountType}
                  onValueChange={setBankAccountType}
                >
                  <label className="radio-label">
                    <RadioGroup.Item className="radio-item" value="savings" />
                    Savings
                  </label>
                  <label className="radio-label">
                    <RadioGroup.Item className="radio-item" value="current" />
                    Current
                  </label>
                </RadioGroup.Root>

                <div className="settings-form-grid">
                  {bankAccountType === "savings" ? (
                    <>
                      <div>
                        <label>Beneficiary Name</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>Bank Name</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>Account No.</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>IFSC Code</label>
                        <input type="text" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label>Beneficiary Name</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>Bank Name</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>Account No.</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>IFSC Code</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>Business Entity Type</label>
                        <Dropdown
                          label="Private Limited Company"
                          options={["Option 1", "Option 2", "Option 3"]}
                          onSelect={setBankBusinessTypeOption}
                          select={bankBusinessTypeOption}
                        />
                      </div>
                      <div>
                        <label>GST Registered?</label>
                        <RadioGroup.Root
                          className="radio-group"
                          style={{ marginTop: "16px" }}
                          defaultValue="yes"
                        >
                          <label className="radio-label">
                            <RadioGroup.Item
                              className="radio-item"
                              value="yes"
                            />
                            <span>Yes</span>
                          </label>
                          <label className="radio-label">
                            <RadioGroup.Item
                              className="radio-item"
                              value="no"
                            />
                            <span>No</span>
                          </label>
                        </RadioGroup.Root>
                      </div>
                      <div>
                        <label>GST Number</label>
                        <input type="text" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : paymentMethod === "payoneer" ? (
              <div className="settings-form-grid">
                <div>
                  <label>Payoneer ID</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Payoneer Email</label>
                  <input type="text" />
                </div>
              </div>
            ) : paymentMethod === "paypal" ? (
              <div className="settings-form-grid">
                <div>
                  <label>Paypal ID</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Paypal Email</label>
                  <input type="text" />
                </div>
              </div>
            ) : (
              <div className="settings-form-grid">
                <div>
                  <label>Full Name (As per bKash Account)</label>
                  <input type="text" />
                </div>
                <div>
                  <label>bKash ID</label>
                  <input type="text" />
                </div>
              </div>
            )}

            {/* Save Button */}
            <button className="settings-save-btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
