import { screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/test-utils.js";

import MapComponent from "./ExplorePageMap.jsx";

describe("Explore Page Input", () => {
  it("renders one input field", () => {
    renderWithTheme(<MapComponent />);

    screen.debug();
  });
});
