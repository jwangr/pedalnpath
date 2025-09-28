import polyline from "@mapbox/polyline";
import OSRMController from "@/lib/controllers/OSRMController";
const osrmController = new OSRMController();

export async function POST(req, res) {
  const { waypoints } = await req.json(); // destructure the body into start and finish coordinates (of format [lat, long])
  console.log(waypoints);
  const OSRMData = await osrmController.getDirections(waypoints);
  if (OSRMData?.code === "Ok") {
    const encoded = OSRMData.routes[0]?.geometry;
    const geometry = polyline.decode(encoded);
    const duration_seconds = OSRMData.routes[0]?.duration;
    const duration_minutes = Math.floor(duration_seconds / 60) % 60;
    const duration_hours = Math.floor(duration_seconds / 3600);
    const duration = duration_hours
      ? `${duration_hours}hr ${duration_minutes}min`
      : `${duration_minutes}min`;
    const distanceKm = (OSRMData.routes[0]?.distance / 1000).toFixed(1);

    return new Response(
      JSON.stringify({
        code: "Ok",
        geometry,
        duration,
        distanceKm,
      }),
      { status: 200 }
    );
  }

  return (
    new Response(
      JSON.stringify({ code: "Error", message: "Failed to get OSRM route" })
    ),
    { status: 500 }
  );
}
