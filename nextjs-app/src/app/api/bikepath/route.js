import BikePathDBController from "@/lib/controllers/BikePathDBController";

const controller = new BikePathDBController();

// Get all the bike paths from DB
export async function GET(req) {
  const response = await controller.getPaths(req);
  return new Response(JSON.stringify(response), { status: 200 });
}

export async function POST(req) {
  const response = await controller.createPath(req);
  return new Response(JSON.stringify(response), { status: 200 });
}

export async function DELETE(req) {
  const response = await controller.deletePath(req);
  return new Response(JSON.stringify(response), { status: 200 });
}