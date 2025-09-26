import { db } from "@/lib/db";

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
    });
  }

  async findPathByName(title) {
    return await db.bikepath.findFirst({
      where: { title },
    });
  }

  async createPath(bikeroute) {
    // create suitableForCreate array
    const suitableForCreateArray = bikeroute.suitableFor?.map((element) => ({
      suitableFor: element,
    }));

    const newPath = await db.bikepath.create({
      data: {
        title: bikeroute.title,
        description: bikeroute.description,
        difficulty: bikeroute.difficulty,
        distanceKm: bikeroute.distanceKm,
        startLat: bikeroute.startCoordinate[0],
        startLng: bikeroute.startCoordinate[1],
        endLat: bikeroute.endCoordinate[0],
        endLng: bikeroute.endCoordinate[1],
        duration: bikeroute.duration,
        coordinates: JSON.parse(JSON.stringify(bikeroute.coordinates)),
        suitableFor: bikeroute?.suitableFor,
        highlights: bikeroute?.highlights,
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
