import OSRMDao from "../dao/OSRMDao";

export default class OSRMController {
    osrm = new OSRMDao();

    // accepts an ARRAY of coordinates in [lat, lon] format
    async getDirections(waypoints) {
        console.log('waypoints are ' + waypoints)
        if (!waypoints) { throw new Error("Please type in waypoints") }
        const lonLatWaypoints = waypoints.map(([lat, lon]) => [lon, lat]);

        const data = await this.osrm.getDirections(lonLatWaypoints);
        return data;
    }

    async getGeocode(location) {
        const coordinates = await this.osrm.getGeocode(location);
        return coordinates;
    }

}