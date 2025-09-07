import OSRMController from "@/lib/controllers/OSRMController";
const osrmController = new OSRMController();

export async function POST(req, res) {
  const {waypoints} = await req.json(); // destructure the body into start and finish coordinates (of format [lat, long])
  console.log(waypoints);
  const response = await osrmController.getDirections(waypoints);
  return new Response(JSON.stringify(response), { status: 200 });
}