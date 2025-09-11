import BikePathDBController from "@/lib/controllers/BikePathDBController";

const controller = new BikePathDBController();

// Get all the bike paths from DB
export async function POST(req, res) {
    try {
        const path = await req.json();
        const result = await controller.toggleAddDelete(path);
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.log("Error at toggleAdd/route.js")
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
