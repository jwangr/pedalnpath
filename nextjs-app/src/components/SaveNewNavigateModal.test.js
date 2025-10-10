// mock external services

import SaveNewNavigateModal from "./SaveNewNavigateModal";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/test-utils";
import { useCreateBikePathMutation } from "@/services/bikePaths";

jest.mock("../services/bikePaths.js", () => ({
  useCreateBikePathMutation: jest.fn(),
}));

describe("Save new path via navigate page modal", () => {
  let path;
  let mockSavePathFn;

  beforeEach(() => {
    path = { title: "Path to be created" };

    // mock mutation:
    mockSavePathFn = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        title: "New Path",
      }),
    });
    useCreateBikePathMutation.mockReturnValue([
      mockSavePathFn,
      {
        data: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        error: null,
      },
    ]);
  });

  it("opens modal when save button is clicked", () => {
    renderWithTheme(<SaveNewNavigateModal path={path} />);

    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);

    expect(screen.getByText("Create New Path")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveValue(
      "Path to be created"
    );
  });

  it("calls savePath mutation on save button click", () => {
    renderWithTheme(<SaveNewNavigateModal path={path} />);

    const button = screen.getByRole("button", { name: "Save" });
    fireEvent.click(button);
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Path Title" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(mockSavePathFn).toHaveBeenCalledWith({
      title: "New Path Title",
      description: "",
      difficulty: "",
      highlights: [],
      notes: "",
      suitableFor: [],
      trackType: "",
    });
  });
});
