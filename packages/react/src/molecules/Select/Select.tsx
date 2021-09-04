import React from "react";

const Icon = () => (
  <svg
    width="1.1rem"
    height="1.1rem"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="{2}"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

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

  //calculate height of the button
  const labelRef = React.useRef<HTMLButtonElement>(null);
  const [overlayTop, setOverlayTop] = React.useState<number>(0);
  React.useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);
  //options
  const onOptionClicked = (option: SelectOption, index: number) => {
    if (onOptionSelected) {
      onOptionSelected(option, index);
    }
  };

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="dse-select">
      <button
        className="dse-select__label"
        onClick={onLabelClick}
        //to calculate the height of the button for the overlay position
        ref={labelRef}
      >
        <span>{label}</span> <Icon />
      </button>
      {isOpen && (
        <ul style={{ top: overlayTop }} className="dse-select__overlay">
          {options.map((option, i) => {
            return (
              <li
                key={option.value}
                className="dse-select__option"
                onClick={() => onOptionClicked(option, i)}
              >
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
