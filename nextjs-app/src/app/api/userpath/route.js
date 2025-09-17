import UserPathDBController from "@/lib/controllers/UserPathDBController"

const controller = new UserPathDBController();

// finds all paths in userPathsDB or specified path
export async function GET(req) {
    const response = await controller.getPaths(req);
    return new Response(JSON.stringify(response), { status: 200 })
}

export async function DELETE(req) {
    try {
        const response = await controller.deletePath(req);
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 404 })
    }
}

export async function POST(req) {
    const response = await controller.toggleAddDelete(req);
    return new Response(JSON.stringify(response), { status: 200 })

}