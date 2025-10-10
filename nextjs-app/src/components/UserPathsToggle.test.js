import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithTheme } from "@/test/test-utils.js";
import {
  useGetUserPathsQuery,
  useToggleAddDeleteMutation,
} from "@/services/userPaths";
import UserPathsToggle from "./UserPathsToggle";
import { useGetBikePathsQuery } from "@/services/bikePaths";
jest.mock("@/services/userPaths", () => ({
  useToggleAddDeleteMutation: jest.fn(),
}));

jest.mock("@/services/bikePaths", () => ({
  useGetBikePathsQuery: jest.fn(),
}));

describe("Toggle complete component", () => {
  let mockToggleAddDelete;

  beforeEach(() => {
    mockToggleAddDelete = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({
        added: true,
      }),
    });
    useToggleAddDeleteMutation.mockReturnValue([
      mockToggleAddDelete, // mock the trigger function
      {
        data: { added: true },
        isLoading: false,
        isSuccess: true,
        isError: false,
      },
    ]);
    useGetBikePathsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
      refetch: jest.fn(),
    });
  });

  it("Calls toggle add/delete when clicked", async () => {
    renderWithTheme(
      <UserPathsToggle
        bikeRoute={{ id: 123, title: "Title", added: false }}
        userId={3}
      />
    );

    const switchInput = screen.getByRole("checkbox");
    await fireEvent.click(switchInput);

    expect(mockToggleAddDelete).toHaveBeenCalledWith({
      userId: 3,
      path: {
        added: false,
        id: 123,
        title: "Title",
      },
    });
  });
});
