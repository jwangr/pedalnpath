import { render, screen } from "@testing-library/react";
import HeaderBanner from "./HeaderBanner.jsx";
import { renderWithTheme } from "@/test/test-utils.js";

test("renders HeaderBanner text", () => {
  renderWithTheme(
    <HeaderBanner h1="Main Title" h4="Subheading" subtitle1="Subtitle" />
  );

  screen.debug(); // should now print the Paper + Typography DOM

  //   Assertions
  expect(screen.getByText("Main Title")).toBeInTheDocument();
  expect(screen.getByText("Subheading")).toBeInTheDocument();
  expect(screen.getByText("Subtitle")).toBeInTheDocument();
});
