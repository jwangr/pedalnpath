import BikePathDao from "../dao/BikePathDao";
const dao = new BikePathDao();

export default class BikePathDBController {
    async getAllPaths() {
        return await dao.getAllPaths()
    }

    async createPath(path) {
        return await dao.createPath(path);
    }

    async deletePath(id){
        return await dao.deletePath(id);
    }
}