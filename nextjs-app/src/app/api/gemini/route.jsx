import ExploreController from "@/lib/controllers/ExplorerController";

const explorer = new ExploreController();

export async function POST(req, res) {
  const body = await req.json(); // parses body into JSON
  const location = body.value;

  // send over to ExplorerController
  const data = await explorer.sendToGemini(location);
  return new Response(data, { status: 200 });
}
