import BikePathDao from "../dao/BikePathDao";
const dao = new BikePathDao();

export default class BikePathDBController {
    async getAllPaths() {
        return await dao.getAllPaths()
    }

    async createPath(path) {
        return await dao.createPath(path);
    }

    async deletePath(id) {
        return await dao.deletePath(id);
    }

    async findPathByName(name) {
        return await dao.findPathByName(name);
    }

    async toggleAddDelete(path) {
        const checkPath = await this.findPathByName(path.title);

        if (checkPath) {
            await this.deletePath(checkPath.id);
            return { added: false };
        } else {
            await this.createPath(path);
            return { added: true };
        }
    }
}