import React from "react";
import Text from "../../atoms/Text";
import Color from "../../atoms/Color";
import { CheckIcon, Icon } from "./icons";

const KEY_KODES = {
  ENTER: "Enter",
  SPACE: " ",
  DOWN_ARROW: "ArrowDown",
  UP_ARROW: "ArrowUp",
  ESCAPE: "Escape",
};

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
  /**
   * move between options with keyboard 1
   */
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(
    null
  );

  const [optionsRefs, setOptionRefs] = React.useState<
    React.RefObject<HTMLLIElement>[]
  >([]);
  React.useEffect(() => {
    setOptionRefs(options.map((_) => React.createRef<HTMLLIElement>()));
  }, [options.length]);

  /**
   * calculate height of the button
   */
  const labelRef = React.useRef<HTMLButtonElement>(null);
  const [overlayTop, setOverlayTop] = React.useState<number>(0);
  React.useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  /**
   * Options
   */
  const onOptionClicked = (option: SelectOption, index: number) => {
    if (onOptionSelected) {
      onOptionSelected(option, index);
    }
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const onLabelClick: React.MouseEventHandler = () => {
    setIsOpen(!isOpen);
  };
  /**
   * move between options with keyboard 2
   */
  const getNextOptionIndex = (
    currentOptionIndex: number | null,
    options: Array<SelectOption>
  ) => {
    if (currentOptionIndex === null) {
      return 0;
    }
    if (currentOptionIndex === options.length - 1) {
      return 0;
    }
    return currentOptionIndex + 1;
  };
  const getPreviousOptionIndex = (
    currentOptionIndex: number | null,
    options: Array<SelectOption>
  ) => {
    if (currentOptionIndex === null) {
      return 0;
    }
    if (currentOptionIndex === 0) {
      return options.length - 1;
    }
    return currentOptionIndex - 1;
  };
  React.useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      let ref = optionsRefs[highlightedIndex];
      if (ref && ref.current) {
        ref.current.focus();
      }
      if (selectedIndex !== null && isOpen) {
        ref = optionsRefs[selectedIndex];
        if (ref && ref.current) {
          ref.current.focus();
        }
      }
    }
  }, [isOpen, highlightedIndex, selectedIndex]);

  const higlightOption = (index: number | null) => {
    setHighlightedIndex(index);
  };
  const onButtonKeyDown: React.KeyboardEventHandler = (event) => {
    event.preventDefault();
    if (
      [KEY_KODES.ENTER, KEY_KODES.DOWN_ARROW, KEY_KODES.SPACE].includes(
        event.key
      )
    ) {
      setIsOpen(true);
      //set focus on the list item
      higlightOption(selectedIndex || 0);
    }
  };
  const onOptionKeyDown: React.KeyboardEventHandler = (event) => {
    // console.log(event.key);
    if (event.key === KEY_KODES.ESCAPE) {
      setIsOpen(false);
      return;
    }
    if (event.key === KEY_KODES.DOWN_ARROW) {
      const nextOptionIndex = getNextOptionIndex(highlightedIndex, options);
      higlightOption(nextOptionIndex);
    }
    if (event.key === KEY_KODES.UP_ARROW) {
      const previousOptionIndex = getPreviousOptionIndex(
        highlightedIndex,
        options
      );
      higlightOption(previousOptionIndex);
    }
    if (event.key === KEY_KODES.ENTER) {
      if (highlightedIndex !== null) {
        onOptionClicked(options[highlightedIndex], highlightedIndex);
      }
    }
  };
  let selectedOption = null;
  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex].label;
  }

  return (
    <div className="dse-select">
      <button
        data-testid="DseSelectButton"
        className="dse-select__label"
        onClick={onLabelClick}
        onKeyDown={onButtonKeyDown}
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
            //pass control to state
            const isHighLighted = highlightedIndex === i;
            /**
             * add refs for keybord moving
             */
            const ref = optionsRefs[i];
            /***
             * use render props for rendering component
             * */
            const renderOptionProps = {
              option,
              isSelected,

              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  //props we recomend
                  role: "menuitemradio",
                  "aria-checked": isSelected ? true : undefined,
                  "aria-label": option.label,
                  ref,
                  key: option.value,
                  //https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                  tabIndex: isHighLighted ? -1 : 0,
                  className: `dse-select__option ${
                    isSelected ? "dse-select__option--selected" : ""
                  } ${isHighLighted ? "dse-select__option--highlighted" : ""}`,
                  onClick: () => onOptionClicked(option, i),
                  //control highlighted еlement with state NOT mouse hover
                  onMouseEnter: () => {
                    higlightOption(i);
                  },
                  onMouseLeave: () => {
                    higlightOption(null);
                  },
                  onKeyDown: onOptionKeyDown,

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
              <li {...renderOptionProps.getOptionRecommendedProps()}>
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
