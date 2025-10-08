import { NotFoundError } from "openai";
import BikePathDao from "../dao/BikePathDao";
import UserPathDao from "../dao/UserPathDao";
import ValidateNewBikePath from "../utils/validation/ValidateNewBikePath";
import ValidationError from "../utils/validation/ValidationError";
const dao = new UserPathDao();
const pathDao = new BikePathDao();
const validator = new ValidateNewBikePath();

export default class UserPathDBController {
  async getPaths(req) {
    const { searchParams } = new URL(req.url);
    const title = searchParams?.get("title");
    const userId = Number(searchParams?.get("id"));

    // validate userId
    if (isNaN(userId))
      throw new ValidationError("A valid UserId is required. ");

    // returns specific UserPath with 'title'
    if (title) {
      const path = await dao.findPathByName(title, userId);
      if (!path)
        throw new NotFoundError(`${title} is not saved to user's profile`);
      return path;
    }

    // else return all paths in UserPathDB
    return await dao.getAllPaths(userId);
    // or returns empty array ( [] )
  }

  async findPathByName(title) {
    const path = await dao.findPathByName(title);
    if (!path) throw new NotFoundError(`Unable to find ${title}. `);
  }

  async deletePath(req) {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams?.get("id"));
    const id = Number(searchParams.get("pathId"));

    // validate id
    if (isNaN(userId) || isNaN(id))
      throw new ValidationError(
        "Please provide valid ID's for user and bikepath. "
      );

    // check that this path is in database
    const route = dao.findPathById(id, userId);

    if (!route) {
      throw new Error("Path isn't saved to user's profile");
    }

    // else return error message if path is not in database
    return await dao.deletePath(id, userId);
  }

  async toggleAddDelete(req) {
    const { userId, path } = await req.json();
    console.log(`UserPath controller received ${(userId, path)}`);

    // validate bikepath
    if (!userId || isNaN(userId))
      throw new ValidationError("Provide a valid userId. ");
    if (!path.title) throw new ValidationError("Please provide a valid path. ");

    // check if path is in global database
    const bikepath = await pathDao.findPathByName(path.title);

    if (!bikepath) {
      // add to global database and user's profile
      const validatedPath = validator.validatePath(bikepath);
      const newPath = await pathDao.createPath(validatedPath);
      console.log("Created new path in global database. Adding to user list.");
      return await dao.savePath(newPath.id, userId);
    }

    // else path exists but check if path is in user's database
    const saved = await dao.findPathByName(path.title, userId);

    console.log(`In the global database: ${saved}`);

    if (saved) {
      return await dao.deletePath(saved.id, userId);
    }
    return await dao.savePath(bikepath.id, userId);
  }

  async toggleCompleted(req) {
    const { userId, pathId } = await req.json();
    const current = await dao.findPathById(Number(pathId), userId);

    return await dao.toggleCompleted(Number(pathId), !current.completed);
  }
}
