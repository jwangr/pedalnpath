import GeminiDao from "../dao/GeminiDao";

export default class ExploreController {
    gemini = new GeminiDao();

    // 1) async sendToGemini(data) -> returns
    async sendToGemini(location) {
        const data = await this.gemini.sendRequest(location);
        return data;
        //   {
        //     "title": "Arrowtown River Trail (Access from Lake Hayes)",
        //     "description": "Joins on from the South end of the Lake Hayes loop and follows the Arrow river towards Arrowtown. A beautiful mix of easy riding and more technical sections. Suitable for mountain bikes or bikes with wide tyres.",
        //     "coordinates": [
        //       -45.0267, 168.7066,
        //       -45.0332, 168.6955,
        //       -45.0389, 168.6834,
        //       -45.0445, 168.6713
        //     ],
        //     "startCoordinate": [-45.0267, 168.7066],
        //     "endCoordinate": [-45.0445, 168.6713],
        //     "difficulty": "Medium",
        //     "surface": ["Gravel", "Dirt", "Some paved sections"],
        //     "distanceKm": 5,
        //     "estimatedTimeMinutes": 40
        //   }
        // ]
    }

    async createRoute(location) {

    }

}