import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/test-utils.js";
import PathsItem from "./PathsItem";
import {
  useGetUserPathsQuery,
  useToggleCompletedMutation,
} from "@/services/userPaths";
import ToggleCompleted from "./ToggleCompleted";

jest.mock("@/services/userPaths", () => ({
  useToggleCompletedMutation: jest.fn(),
}));

describe("Toggle complete component", () => {
  let mockToggleCompleted;

  beforeEach(() => {
    mockToggleCompleted = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        completed: true,
      }),
    });
    useToggleCompletedMutation.mockReturnValue([
      mockToggleCompleted, // mock the trigger function
      {
        data: { completed: true },
        isLoading: false,
        isSuccess: true,
        isError: false,
      },
    ]);
  });

  it("Calls togglecomplete when clicked", async () => {
    renderWithTheme(
      <ToggleCompleted
        bikeRoute={{ id: 123, title: "Title", completed: false }}
        userId={3}
      />
    );


    const switchInput = screen.getByRole("switch");
    await fireEvent.click(switchInput);

    expect(mockToggleCompleted).toHaveBeenCalledWith({
      userId: 3,
      pathId: 123,
    });
  });
});
