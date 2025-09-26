import BikePathDao from "../dao/BikePathDao";
const dao = new BikePathDao();

export default class BikePathDBController {
  async getPaths(req) {
    const { searchParams } = new URL(req.url);
    const title = searchParams?.get("title");
    const userId = searchParams?.get('userId');

    if (title) {
      return await dao.findPathByName(title);
    }

    return await dao.getAllPaths(parseInt(userId));
  }

  async createPath(req) {
    const path = await req.json();
    return await dao.createPath(path);
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
