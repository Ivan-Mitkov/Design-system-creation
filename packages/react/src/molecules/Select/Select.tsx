import React from "react";
import Text from "../../atoms/Text";
import Color from "../../atoms/Color";
interface IconOption {
  strokeColor?: string;
  classes?: string;
}
const Icon: React.FC<IconOption> = ({ strokeColor, classes }) => (
  <svg
    width="1.1rem"
    height="1.1rem"
    xmlns="http://www.w3.org/2000/svg"
    className={classes}
    fill="none"
    viewBox="0 0 24 24"
    stroke={strokeColor || "currentColor"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="{2}"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
const CheckIcon: React.FC<IconOption> = ({ strokeColor }) => (
  <svg
    width="1rem"
    height="1rem"
    className="w-6 h-6"
    fill="none"
    stroke={strokeColor || "currentColor"}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

interface SelectOption {
  label: string;
  value: string;
}
interface RenderOptionsProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}
interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionsProps) => React.ReactElement;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  label = "Please select an option",
  onOptionSelected,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

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
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  };

  let selectedOption = null;
  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex].label;
  }

  return (
    <div className="dse-select">
      <button
        className="dse-select__label"
        onClick={onLabelClick}
        //to calculate the height of the button for the overlay position
        ref={labelRef}
        //for screen readers
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        aria-controls="dse-select-list"
      >
        <Text>{selectedIndex === null ? label : selectedOption}</Text>{" "}
        <Icon
          classes={`dse-select__caret ${
            isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"
          }`}
        />
      </button>
      {isOpen && (
        <ul
          //screen readers
          role="menu"
          id="dse-select-list"
          style={{ top: overlayTop }}
          className="dse-select__overlay"
        >
          {options.map((option, i) => {
            const isSelected = selectedIndex === i;
            /***
             * use render props for rendering component
             * */
            const renderOptionProps = {
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  //props we recomend
                  key: option.value,
                  className: `dse-select__option ${
                    isSelected ? "dse-select__option--selected" : ""
                  }`,
                  onClick: () => onOptionClicked(option, i),
                  //additional props
                  ...overrideProps,
                };
              },
            };
            if (renderOption) {
              return renderOption(renderOptionProps);
            }
            /***
             * end use render props for rendering component
             * */
            return (
              <li
                key={option.value}
                className={`dse-select__option ${
                  isSelected ? "dse-select__option--selected" : ""
                }`}
                onClick={() => onOptionClicked(option, i)}
              >
                {
                  //if we are using the renderProps we will overrides this components
                }
                <Text size="sm">{option.label}</Text>
                {isSelected && (
                  <Color hexCode="#ffffff">
                    <CheckIcon strokeColor={"#5ece7b"} />
                  </Color>
                )}
                {
                  //override end
                }
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
