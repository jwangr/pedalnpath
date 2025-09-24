import ReviewController from "@/lib/controllers/ReviewController";

const controller = new ReviewController();

export async function GET(req, {params}) {
    const { id } = await params;
  const response = await controller.getStats(parseInt(id));
  return new Response(JSON.stringify(response), { status: 200 });
}