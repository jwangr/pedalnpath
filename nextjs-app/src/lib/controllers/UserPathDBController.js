import NotFoundError from "../utils/errors/NotFoundError";
import BikePathDao from "../dao/BikePathDao";
import UserPathDao from "../dao/UserPathDao";
import ValidateNewBikePath from "../utils/validation/ValidateNewBikePath";
import ValidationError from "../utils/validation/ValidationError";

export default class UserPathDBController {
  constructor(
    dao = new UserPathDao(),
    pathDao = new BikePathDao(),
    validator = new ValidateNewBikePath()
  ) {
    (this.dao = dao), (this.pathDao = pathDao), (this.validator = validator);
  }
  async getPaths(req) {
    const { searchParams } = new URL(req.url);
    const title = searchParams?.get("title");
    const userId = Number(searchParams?.get("id"));

    // validate userId
    if (!Number.isInteger(userId) || userId <= 0)
      throw new ValidationError("A valid UserId is required. ");

    // returns specific UserPath with 'title'
    if (title) {
      const path = await this.dao.findPathByName(title, userId);
      if (!path)
        throw new NotFoundError(`${title} is not saved to user's profile`);
      return path;
    }

    // else return all paths in UserPathDB
    return await this.dao.getAllPaths(userId);
    // or returns empty array ( [] )
  }

  async findPathByName(title) {
    const path = await this.dao.findPathByName(title);
    if (!path) throw new NotFoundError(`Unable to find ${title}. `);
    return path;
  }

  async deletePath(req) {
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams?.get("id"));
    const id = Number(searchParams.get("pathId"));

    // validate id
    if (
      !Number.isInteger(userId) ||
      !Number.isInteger(id) ||
      userId <= 0 ||
      id <= 0
    )
      throw new ValidationError(
        "Please provide valid ID's for user and bikepath. "
      );

    // check that this path is in database
    const route = this.dao.findPathById(id, userId);

    if (!route) {
      throw new Error("Path isn't saved to user's profile");
    }

    // else return error message if path is not in database
    return await this.dao.deletePath(id, userId);
  }

  async toggleAddDelete(req) {
    const { userId, path } = await req.json();
    console.log(`UserPath controller received ${(userId, path)}`);

    // validate bikepath
    if (!userId || !Number.isInteger(userId) || userId <= 0)
      throw new ValidationError("Provide a valid userId. ");
    if (!path.title) throw new ValidationError("Please provide a valid path. ");

    // check if path is in global database
    const bikepath = await this.pathDao.findPathByName(path.title);

    if (!bikepath) {
      // add to global database and user's profile
      const validatedPath = this.validator.validatePath(bikepath);
      const newPath = await this.pathDao.createPath(validatedPath);
      console.log("Created new path in global database. Adding to user list.");
      return await this.dao.savePath(newPath.id, userId);
    }

    // else path exists but check if path is in user's database
    const saved = await this.dao.findPathByName(path.title, userId);

    console.log(`In the global database: ${saved}`);

    if (saved) {
      return await this.dao.deletePath(saved.id, userId);
    }
    return await this.dao.savePath(bikepath.id, userId);
  }

  async toggleCompleted(req) {
    const { userId, pathId } = await req.json();
    const current = await this.dao.findPathById(Number(pathId), userId);

    return await this.dao.toggleCompleted(Number(pathId), !current.completed);
  }
}
