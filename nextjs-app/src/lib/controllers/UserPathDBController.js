import UserPathDao from "../dao/UserPathDao";
const dao = new UserPathDao();

export default class UserPathDBController {
    async getPaths(req) {
        const { searchParams } = new URL(req.url);
        const title = searchParams?.get('title');
        const userId = Number(searchParams?.get('id'));

        // returns specific UserPath with 'title'
        if (title) {
            return await dao.findPathByName(title, userId)
            // or returns null
        }

        // else return all paths in UserPathDB
        return await dao.getAllPaths(userId);
        // or returns empty array ( [] )

    }

    async findPathByName(title) {
        return await dao.findPathByName()
    }

    async savePath(userId, bikepathId) {
        return await dao.savePath()
    }

    async deletePath(req) {
        const { searchParams } = new URL(req.url)
        const userId = Number(searchParams?.get('id'));
        const id = Number(searchParams.get('id'))

        // check that this path is in database
        const route = dao.findPathById(id, userId)

        if (!route) {
            throw new Error("Path isn't saved to user's profile")
        }

        // else return error message if path is not in database
        return await dao.deletePath(id, userId)

    }
}