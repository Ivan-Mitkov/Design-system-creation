import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Select from "./Select";

const options = [
  {
    label: "Strict Black",
    value: "strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "pink",
  },
];
test("should renders all options pass to it", () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);

  fireEvent.click(getByTestId("DseSelectButton"));

  expect(getAllByRole("menuitemradio")).toHaveLength(options.length);
});

test("renders options using custom renderOption method if passed as props", () => {
  const { getByTestId, getAllByTestId } = render(
    <Select
      options={options}
      renderOption={({ option, getOptionRecommendedProps }) => {
        return (
          <li data-testid="customRenderOption" {...getOptionRecommendedProps()}>
            {option.label}
          </li>
        );
      }}
    />
  );

  fireEvent.click(getByTestId("DseSelectButton"));

  expect(getAllByTestId("customRenderOption")).toHaveLength(options.length);
});

test("calls the onOptionSelected prop with the selected option and its index if passed ", () => {
  const onOptioSelected = jest.fn();
  const { getAllByRole, getByTestId } = render(
    <Select options={options} onOptionSelected={onOptioSelected} />
  );
  fireEvent.click(getByTestId("DseSelectButton"));
  fireEvent.click(getAllByRole("menuitemradio")[0]);
  // debug()
  expect(onOptioSelected).toHaveBeenCalledWith(options[0], 0);
});

test("the button label changes to the selected option label ", () => {
  const { getAllByRole, getByTestId, debug } = render(
    <Select options={options} />
  );
  fireEvent.click(getByTestId("DseSelectButton"));
  fireEvent.click(getAllByRole("menuitemradio")[0]);
  // debug();
  expect(getByTestId("DseSelectButton")).toHaveTextContent(options[0].label);
});

test("snapshot of the selected option state ", () => {
  const { getAllByRole, getByTestId, asFragment } = render(
    <Select options={options} />
  );
  fireEvent.click(getByTestId("DseSelectButton"));
  fireEvent.click(getAllByRole("menuitemradio")[0]);
  expect(asFragment()).toMatchSnapshot();
});
test("snapshot of the base state ", () => {
  const { asFragment } = render(<Select options={options} />);

  expect(asFragment()).toMatchSnapshot();
});
test("snapshot of the options menu open state ", () => {
  const { getByTestId, asFragment } = render(<Select options={options} />);
  fireEvent.click(getByTestId("DseSelectButton"));
  expect(asFragment()).toMatchSnapshot();
});

test("can customize select label ", () => {
  const { getByText } = render(
    <Select options={options} label="This is a custom label" />
  );

  expect(getByText(/This is a custom label/)).toBeInTheDocument();
});
