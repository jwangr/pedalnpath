import { db } from "@/lib/db";

export default class UserPathDao {
    async getAllPaths(userId) {
        return await db.userPath.findMany({
            where: {
                userId
            },
            include: {
                bikepath: true // includes related field, bikepaths
            }
        })
    }

    async findPathByName(title, userId) {
        return await db.userPath.findFirst({
            where: {
                bikepath: {
                    title
                },
                userId
            }
        })
    }

    async findPathById(id, userId) {
        return await db.userPath.findFirst({
            where: {
                id,
                userId
            }
        })
    }

    async savePath(bikepathId, userId) {

        const newPath = await db.userPath.create({
            data: {
                userId,
                bikepathId
            },
        });

        return { newPath, added: true };
    }

    async deletePath(id, userId) {
        const path = await db.userPath.delete({
            where: { id, userId }
        })
        return { path, added: false }
    }

    async toggleCompleted(id, completedStatus) {
        return await db.userPath.update({
            where: {
                id
            },
            data: {
                completed: completedStatus
            }
        })
    }

}