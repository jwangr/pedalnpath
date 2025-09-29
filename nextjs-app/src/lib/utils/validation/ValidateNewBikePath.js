import ValidationError from "./ValidationError";

export default class ValidateNewBikePath {
  validatePath(path) {
    let parsedPath;

    if (!path.title || typeof path.title !== "string") {
      throw new ValidationError("Path must have a valid title");
    }

    if (
      !path.startCoordinate ||
      !Array.isArray(path.startCoordinate) ||
      path.startCoordinate.length !== 2
    ) {
      throw new ValidationError(
        "Path must have a valid startCoordinate [lat, lng]"
      );
    }

    if (
      !path.endCoordinate ||
      !Array.isArray(path.endCoordinate) ||
      path.endCoordinate.length !== 2
    ) {
      throw new ValidationError(
        "Path must have a valid endCoordinate [lat, lng]"
      );
    }

    if (!Array.isArray(path.coordinates) || path.coordinates.length < 2) {
      throw new ValidationError(
        "Path must include coordinates array with at least 2 points"
      );
    }

    if (path.distanceKm && isNaN(parseFloat(path.distanceKm))) {
      throw new ValidationError("Distance must be a decimal number");
    }

    parsedPath = {
      title: path.title.trim(),
      description: path.description || "",
      difficulty: path.difficulty || "Unknown",
      distanceKm: parseFloat(path.distanceKm),
      duration: path.duration || "",
      startLat: path.startCoordinate[0],
      startLng: path.startCoordinate[1],
      endLat: path.endCoordinate[0],
      endLng: path.endCoordinate[1],
      coordinates: path.coordinates,
      notes: path.notes || "",
      trackType: path.trackType || "",
      highlights: path.highlights || [],
      suitableFor: path.suitableFor || [],
    };

    return parsedPath;
  }
}
