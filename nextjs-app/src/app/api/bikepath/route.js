import BikePathDBController from "@/lib/controllers/BikePathDBController";
import ValidationError from "@/lib/utils/validation/ValidationError";
import { NextResponse } from "next/server";
import { NotFoundError } from "openai";

const controller = new BikePathDBController();

// Get all the bike paths from DB
export async function GET(req) {
  try {
    const response = await controller.getPaths(req);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    let status;
    status = error instanceof NotFoundError ? 404 : 500;
    return NextResponse.json(
      {
        message: error.message,
      },
      { status }
    );
  }
}

export async function POST(req) {
  try {
    const response = await controller.createPath(req);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: error.statusCode }
      );
    }
    // Unexpected errors
    return NextResponse.json(
      {
        messagse: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const response = await controller.deletePath(req);
    return new NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Failed to delete path",
      },
      { status: 500 }
    );
  }
}
