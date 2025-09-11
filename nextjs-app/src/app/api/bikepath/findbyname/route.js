import BikePathDBController from "@/lib/controllers/BikePathDBController";

const controller = new BikePathDBController();

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
    const response = await controller.findPathByName(title);
    return new Response(JSON.stringify(response), { status: 200 })
}