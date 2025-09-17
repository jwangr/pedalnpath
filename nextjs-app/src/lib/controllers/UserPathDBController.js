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

    async deletePath(id) {
        return await dao.deletePath()
    }
}