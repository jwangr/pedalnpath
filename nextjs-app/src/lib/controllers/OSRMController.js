import OSRMDao from "../dao/OSRMDao";
import validateGeminiCoordinates from "../utils/validation/ValidateGeminiCoordinates";
import ValidateOSRMRequest from "../utils/validation/ValidateOSRMRequest";

export default class OSRMController {
  constructor(osrm = new OSRMDao(), validate = new ValidateOSRMRequest()) {
    this.osrm = osrm;
    this.validate = validate;
  }
  async getGeocode(location) {
    const coordinates = await this.osrm.getGeocode(location);
    return coordinates;
  }

  async getGeocodeAndDirections(req) {
    const { start, end, waypoints } = await req.json();

    let coordinates = [];

    if (start && end) {
      // validate start and end values
      const startChecked = await this.validate.validateLocation(start);
      const endChecked = await this.validate.validateLocation(end);

      // convert to geocode (lat, lon)
      const startGeocode = await this.getGeocode(startChecked);
      const endGeocode = await this.getGeocode(endChecked);
      console.log(startGeocode, endGeocode)

      // convert LatLon geocodes to LonLat;
      coordinates = [startGeocode, endGeocode].map(([lat, lon]) => [lon, lat]);
      console.log(coordinates)
    } else if (waypoints) {
      coordinates = waypoints.map(([lat, lon]) => [lon, lat]);
      console.log(`Waypoints noted by controller are: `, coordinates);
      validateGeminiCoordinates(coordinates);
    }

    // send OSRM request
    return await this.osrm.getDirections(coordinates);
  }
}
