import { db } from "../db/index.js";

export default class BikePathDao {
  async getAllPaths(id = null) {
    return await db.bikepath.findMany({
      ...(id
        ? {
            include: {
              users: {
                where: {
                  userId: id,
                },
              },
            },
          }
        : {}),
        orderBy: {
          title: 'asc',
        }
    });
  }

  async findPathByName(title) {
    return await db.bikepath.findFirst({
      where: { title },
    });
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
        duration: bikeroute.duration,
        coordinates: JSON.parse(JSON.stringify(bikeroute.coordinates)),
        suitableFor: bikeroute?.suitableFor,
        highlights: bikeroute?.highlights,
        notes: bikeroute?.notes,
        trackType: bikeroute?.trackType,
      },
    });

    return newPath;
  }

  async deletePath(id) {
    return await db.bikepath.delete({
      where: { id },
    });
  }
}
