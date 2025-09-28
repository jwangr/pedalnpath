import CommentsController from "@/lib/controllers/ReviewController.js";

const controller = new CommentsController();

// Get all comments for one path
export async function GET(req, { params }) {
  const { id } = await params;
  const response = await controller.onePathAllReviews(parseInt(id));
  return new Response(JSON.stringify(response), { status: 200 });
}

// Creates a new comment
export async function POST(req, { params }) {
  const { id } = await params;
  const { score, comment, userId } = await req.json();

  const response = await controller.createReview(
    score,
    comment,
    userId,
    parseInt(id)
  );

  return new Response(JSON.stringify(response), { status: 200 });
}

export async function PUT(req) {
  const review = await req.json();

  const response = await controller.updateReview(review.id, review);

  return new Response(JSON.stringify(response), { status: 200 });
}

// Deletes a comment
export async function DELETE(req) {
  const { userId, reviewId } = await req.json();

  try {
    const response = await controller.deleteReview(userId, reviewId);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (err) {
    return Response.json(
      { error: err.error || "Unable to delete this review." },
      { status: 403 || 500 }
    );
  }
}
