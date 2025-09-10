import GeminiDao from "../dao/GeminiDao";

export default class ExploreController {
    gemini = new GeminiDao();

    // 1) async sendToGemini(data) -> returns
    async sendToGemini(location) {
        const data = await this.gemini.sendRequest(location);
        return data;
    }

    async createRoute(location) {

    }

}