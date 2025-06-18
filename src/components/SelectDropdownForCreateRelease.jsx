import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import PropTypes from "prop-types";

const SelectDropdownForCreateRelease = ({
  options,
  placeholder,
  className,
  dataName,
  setValue,
  errors,
  defaultValue
}) => {


  return (
    <>
        <Select.Root 
            defaultValue={defaultValue}
            onValueChange={value => setValue(dataName, value, { shouldValidate: true })} 
            >
        <Select.Trigger className={`dropdown-trigger ${className || ""}`}>
            <Select.Value placeholder={placeholder || "Select an option"} />
            <Select.Icon className="select-icon">
            <ChevronDown />
            </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
            <Select.Content
            className="dropdown-content"
            style={{ padding: 0, overflowY: "auto" }}
            >
            <Select.Viewport>
                {options?.map((option, index) => (
                <Select.Item key={index} value={option} className="select-item">
                    <Select.ItemText>{option}</Select.ItemText>
                    <Select.ItemIndicator className="select-item-indicator">
                    <Check size={18} />
                    </Select.ItemIndicator>
                </Select.Item>
                ))}
            </Select.Viewport>
            </Select.Content>
        </Select.Portal>
        </Select.Root>
        {errors?.[dataName] && (
        <p style={{color: '#ea3958'}} className="error-message" role="alert">
          {errors[dataName].message || "This field is required"}
        </p>
      )}
    </>
  );
};

SelectDropdownForCreateRelease.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  dataName: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.object
};

export default SelectDropdownForCreateRelease;
