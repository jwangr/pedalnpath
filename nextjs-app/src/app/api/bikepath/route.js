import BikePathDBController from "@/lib/controllers/BikePathDBController";
import ValidationError from "@/lib/utils/validation/ValidationError";
import { NextResponse } from "next/server";

const controller = new BikePathDBController();

// Get all the bike paths from DB
export async function GET(req) {
  const response = await controller.getPaths(req);
  return new Response(JSON.stringify(response), { status: 200 });
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
  }
}

export async function DELETE(req) {
  const response = await controller.deletePath(req);
  return new Response(JSON.stringify(response), { status: 200 });
}
