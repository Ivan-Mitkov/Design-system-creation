import React from "react";

interface SelectOption {
  label: string;
  value: string;
}
interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
}
const Select: React.FC<SelectProps> = ({
  options = [],
  label = "Please select an option",
  onOptionSelected,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onOptionClicked = (option: SelectOption, index: number) => {
    if (onOptionSelected) {
      onOptionSelected(option, index);
    }
  };

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button onClick={onLabelClick}>{label}</button>
      {isOpen && (
        <ul>
          {options.map((option, i) => {
            return (
              <li key={option.value} onClick={() => onOptionClicked(option, i)}>
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
