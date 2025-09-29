import ExploreController from "@/lib/controllers/ExplorerController";
import ValidationError from "@/lib/utils/validation/ValidationError";
import { NextResponse } from "next/server";

const explorer = new ExploreController();

export async function POST(req, res) {
  const body = await req.json(); // parses body into JSON
  const location = body.value;

  try {
    const data = await explorer.sendToGemini(location);
    return NextResponse.json(data);
  } catch (error) {
    let status;
    error instanceof ValidationError ? (status = 401) : (status = 500);
    return NextResponse.json(
      {
        error: error.message || "Internal server error",
      },
      { status }
    );
  }
}
