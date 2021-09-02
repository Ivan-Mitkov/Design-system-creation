import React from 'react';

const Margin = ({ space = "none", left = false, right = false, top = false, bottom = false, children, }) => {
    let className = ``;
    if (left) {
        className = `${className} dse-margin-left-${space}`;
    }
    if (right) {
        className = `${className} dse-margin-right-${space}`;
    }
    if (top) {
        className = `${className} dse-margin-top-${space}`;
    }
    if (bottom) {
        className = `${className} dse-margin-bottom-${space}`;
    }
    if (!left && !right && !bottom && !top && space) {
        className = `dse-margin-${space}`;
    }
    return React.createElement("div", { className: className }, children);
};

export { Margin as default };
//# sourceMappingURL=Margin.js.map
