import { NotFoundError } from "openai";
import BikePathDao from "../dao/BikePathDao";
import ValidateNewBikePath from "../utils/validation/validateNewBikePath";
import ValidationError from "../utils/validation/ValidationError";
const dao = new BikePathDao();

export default class BikePathDBController {
  async getPaths(req) {
    const { searchParams } = new URL(req.url);
    const title = searchParams?.get("title");
    const userId = searchParams?.get("userId");

    if (title) {
      const paths = await dao.findPathByName(title);
      if (!paths)
        throw new NotFoundError(`Could not find paths called ${title}.`);
    }

    return await dao.getAllPaths(parseInt(userId));
  }

  async createPath(req) {
    try {
      const validator = new ValidateNewBikePath();

      const path = await req.json();
      const parsedPath = validator.validatePath(path);

      return await dao.createPath(parsedPath);
    } catch (error) {
      if (error.code === "P2002") {
        // prisma client error for un-unique bike paths
        throw new ValidationError(
          "Bike path with the same title or coordinates already exists."
        );
      }
    }
  }

  async deletePath(req) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams?.get("id"));

    return await dao.deletePath(id);
  }

  async toggleAddDelete(path) {
    const checkPath = await dao.findPathByName(path.title);

    if (checkPath) {
      await dao.deletePath(checkPath.id);
      return { added: false };
    } else {
      await dao.createPath(path);
      return { added: true };
    }
  }
}
