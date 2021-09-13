import FontSize from "../Fontsize";
test("snapshot of fontsizes", () => {
  expect(FontSize).toMatchSnapshot();
});
