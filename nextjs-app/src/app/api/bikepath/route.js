import BikePathDBController from "@/lib/controllers/BikePathDBController";

const controller = new BikePathDBController();

// Get all the bike paths from DB
export async function GET(req, res) {
  const response = await controller.getAllPaths();
  return new Response(JSON.stringify(response), { status: 200 });
}
