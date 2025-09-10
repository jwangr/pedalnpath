import { db } from "@/lib/db";

export default class BikePathDao {
    async getAllPaths() {
        return await db.bikepath.findMany()
    }

    async createPath(bikeroute) {
        const newPath = await db.bikepath.create({
            data: {
                title: bikeroute.title,
                description: bikeroute.description,
                difficulty: bikeroute.difficulty,
                distanceKm: bikeroute.distanceKm,
                startLat: bikeroute.startLat,
                startLng: bikeroute.startLng,
                endLat: bikeroute.endLat,
                endLng: bikeroute.endLng,
                suitableFor: bikeroute.suitableFor,
                duration: bikeroute.duration,
            },
        });

        return newPath;
    }

    async deletePath(id) {
        return await db.bikepath.delete({
            where: { id }
        })
    }
}