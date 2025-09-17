import { db } from "@/lib/db";

export default class UserPathDao {
    async getAllPaths(userId) {
        return await db.userPath.findMany({
            where: {
                userId
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

        return newPath;
    }

    async deletePath(id, userId) {
        return await db.userPath.delete({
            where: { id, userId }
        })
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