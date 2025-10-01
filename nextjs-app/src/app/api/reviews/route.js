import CommentsController from "@/lib/controllers/ReviewController.js";
import { NextResponse } from "next/server";

const controller = new CommentsController();

// Get all reviews for all the paths
export async function GET(req) {
  const response = await controller.allPathsAllReviews(req);
  return NextResponse.json({
    response,
  });
}
