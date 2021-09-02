import React from 'react';

const Select = ({ options = [], label = "Please select an option", onOptionSelected, }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const onOptionClicked = (option, index) => {
        if (onOptionSelected) {
            onOptionSelected(option, index);
        }
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    return (React.createElement("div", null,
        React.createElement("button", { onClick: onLabelClick }, label),
        isOpen && (React.createElement("ul", null, options.map((option, i) => {
            return (React.createElement("li", { key: option.value, onClick: () => onOptionClicked(option, i) }, option.label));
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
