import { useUpdateReviewMutation } from "@/services/reviews";
import { renderWithTheme } from "@/test/test-utils";
import { fireEvent, screen } from "@testing-library/react";

jest.mock("@/services/reviews", () => ({
  useUpdateReviewMutation: jest.fn(),
}));

import EditModal from "./EditReviewModal";
import { act } from "react";

let mockEditPost = jest.fn();
let review = {
  id: 1,
  score: 5,
  comment: "Not bad, doable",
  userId: 4,
  bikepathId: 19,
  createdAt: "2025-09-23T23:23:24.420Z",
  user: { id: 4, email: "hulu@example.com" },
  bikepath: { title: "Bikepath title" },
};

beforeEach(() => {
  jest.clearAllMocks();
  mockEditPost.mockReturnValue({
    unwrap: jest.fn().mockResolvedValue({
      response: "edited review",
    }),
  });
  useUpdateReviewMutation.mockReturnValue([
    mockEditPost,
    {
      data: { response: "edited review" },
      error: null,
      isError: false,
      isLoading: false,
      isSuccess: true,
    },
  ]);
});

it("displays an edit button", () => {
  renderWithTheme(<EditModal review={review} />);
  expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
});
it("displays a modal with review info, when the edit button is clicked", async () => {
  renderWithTheme(<EditModal review={review} />);
  const editButton = screen.getByRole("button", { name: "Edit" });
  fireEvent.click(editButton);
  await screen.findByText("Not bad, doable");
  screen.debug(document.body);

  //   Assertions
  const modal = await screen.findByRole("presentation");
  expect(modal).toBeInTheDocument();
  expect(screen.getByText("Bikepath title")).toBeInTheDocument();
  expect(screen.getByText("Not bad, doable")).toBeInTheDocument();
});
it("calls update mutation when Save/Submit button is clicked", async () => {
  renderWithTheme(<EditModal review={review} />);

  fireEvent.click(screen.getByRole("button", { name: /edit/i }));

  // Assuming modal has an editable comment input
  const commentBox = await screen.findByRole("textbox");
  fireEvent.change(commentBox, { target: { value: "Updated review comment" } });

  // Click the save button
  const saveButton = screen.getByRole("button", { name: /save/i });
  fireEvent.click(saveButton);

  // Verify mutation called
  expect(mockEditPost).toHaveBeenCalledWith({
    bikepathId: 19,
    review: {
      comment: "Updated review comment",
      id: 1,
      score: 5,
    },
  });
});
