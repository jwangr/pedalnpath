import BikePathDao from "../dao/BikePathDao";
import UserPathDao from "../dao/UserPathDao";
const dao = new UserPathDao();
const pathDao = new BikePathDao();

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

    async savePath(bikepathId, userId) {
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

    async toggleAddDelete(req) {
        const { userId, path } = await req.json();
        console.log(`UserPath controller received ${userId, path}`)

        // check if path is in global database
        const bikepath = await pathDao.findPathByName(path.title)

        if (!bikepath) {
            // add to global database and user's profile
            const newPath = await pathDao.createPath(path);
            console.log('Created new path in global database. Adding to user list.')
            return await dao.savePath(newPath.id, userId)
        }

        // else path exists but check if path is in user's database
        const saved = await dao.findPathByName(path.title, userId)

        console.log(`In the global database: ${saved}`)

        if (saved) {
            return await dao.deletePath(saved.id, userId)
        }
        return await dao.savePath(bikepath.id, userId)

    }

    async toggleCompleted(req) {
        const { userId, path } = await req.json();

        // find the UserPath which matches userId and Path
        const saved = await dao.findPathByName(path.title, userId)

        if (!saved) {
            throw new Error("Not saved in user's list")
        }

        return await dao.toggleCompleted(saved.id, !saved.completed)
    }

}