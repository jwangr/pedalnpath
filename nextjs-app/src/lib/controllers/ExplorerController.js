import GeminiDao from "../dao/GeminiDao";
import dirty from 'dirty-json';

export default class ExploreController {
    gemini = new GeminiDao();

    // 1) async sendToGemini(data) -> returns
    async sendToGemini(location) {
        const data = await this.gemini.sendRequest(location);
        const cleanedData = dirty.parse(data)
        return cleanedData;
    }

    async createRoute(location) {

    }

}