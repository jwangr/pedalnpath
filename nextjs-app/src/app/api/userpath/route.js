import UserPathDBController from "@/lib/controllers/UserPathDBController"

const controller = new UserPathDBController();

// finds all paths in userPathsDB or specified path
export async function GET(req) {
    const response = await controller.getPaths(req);
    return new Response(JSON.stringify(response), { status: 200 })
}