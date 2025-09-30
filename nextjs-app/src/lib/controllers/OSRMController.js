import OSRMDao from "../dao/OSRMDao";
import validateGeminiCoordinates from "../utils/validation/validateGeminiResponse copy";
import ValidateOSRMRequest from "../utils/validation/ValidateOSRMRequest";
const osrm = new OSRMDao();
const validate = new ValidateOSRMRequest();

export default class OSRMController {
  async getGeocode(location) {
    const coordinates = await osrm.getGeocode(location);
    return coordinates;
  }

  async getGeocodeAndDirections(req) {
    const { start, end, waypoints } = await req.json();

    let coordinates = [];

    if (start && end) {
      // validate start and end values
      const startChecked = await validate.validateLocation(start);
      const endChecked = await validate.validateLocation(end);

      // convert to geocode (lat, lon)
      const startGeocode = await this.getGeocode(startChecked);
      const endGeocode = await this.getGeocode(endChecked);

      // convert LatLon geocodes to LonLat;
      coordinates = [startGeocode, endGeocode].map(([lat, lon]) => [lon, lat]);
    } else if (waypoints) {
      coordinates = waypoints.map(([lat, lon]) => [lon, lat]);
      console.log(`Waypoints noted by controller are: `, coordinates);
      validateGeminiCoordinates(coordinates);
    }

    // send OSRM request
    return await osrm.getDirections(coordinates);
  }
}
