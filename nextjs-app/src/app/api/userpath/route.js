import UserPathDBController from "@/lib/controllers/UserPathDBController"

const controller = new UserPathDBController();

// finds all paths in userPathsDB or specified path
export async function GET(req) {
    try {
        const response = await controller.getPaths(req);
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }, { status: 404 }))
    }

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
    // Example payload: {
    //     "userId": 4,
    //     "path": {
    //     "title": "test run",
    //         "startCoordinate": [0, 0],
    //             "endCoordinate": [0, 0],
    //                 "coordinates": [[0, 0], [0, 0], [0, 0]],
    //                     "highlights": "none"
    //     }
    // }
    const response = await controller.toggleAddDelete(req);
    return new Response(JSON.stringify(response), { status: 200 })

}

export async function PUT(req) {
    // Example payload: {
    //     "userId": 4,
    //      "pathId": 30,
    //     "path": {
    //     "title": "test run",
    //         "startCoordinate": [0, 0],
    //             "endCoordinate": [0, 0],
    //                 "coordinates": [[0, 0], [0, 0], [0, 0]],
    //                     "highlights": "none"
    //     }
    // }    

    try {
        const response = await controller.toggleCompleted(req)
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }, { status: 404 }))
    }

}