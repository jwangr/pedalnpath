import CommentsController from "@/lib/controllers/ReviewController.js";

const controller = new CommentsController();

// Get all comments for all paths
export async function GET() {
  const response = await controller.onePathAllReviews(parseInt(id));
  return new Response(JSON.stringify(response), { status: 200 });
}