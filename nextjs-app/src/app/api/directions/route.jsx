import OSRMController from "@/lib/controllers/OSRMController";
import { formatOSRMResponse } from "@/lib/utils/osrm/formatOSRMResponse";
import { NextResponse } from "next/server";
import ValidationError from "@/lib/utils/validation/ValidationError";
const osrmController = new OSRMController();

export async function POST(req, res) {
  try {
    const OSRMData = await osrmController.getGeocodeAndDirections(req);
    const formattedPath = formatOSRMResponse(OSRMData);
    return NextResponse.json({
      code: "Ok",
      ...formattedPath,
    });
  } catch (error) {
    let status;
    error instanceof ValidationError ? (status = error.statusCode) : (status = 500);
    return NextResponse.json(
      {
        error: error.message || "Unable to process request currently.",
      },
      { status }
    );
  }
}
