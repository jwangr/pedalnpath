import OSRMDao from "../dao/OSRMDao";
import ValidateOSRMRequest from "../utils/validation/ValidateOSRMRequest";
const osrm = new OSRMDao();
const validate = new ValidateOSRMRequest();

export default class OSRMController {
  async getGeocode(location) {
    const coordinates = await osrm.getGeocode(location);
    return coordinates;
  }

  async getGeocodeAndDirections(req) {
    const { start, end } = await req.json();

    // validate start and end values
    const startChecked = await validate.validateLocation(start);
    const endChecked = await validate.validateLocation(end);

    // convert to geocode
    const startGeocode = await this.getGeocode(startChecked);
    const endGeocode = await this.getGeocode(endChecked);

    // convert LatLon geocodes to LonLat;
    const waypoints = [startGeocode, endGeocode].map(([lat, lon]) => [
      lon,
      lat,
    ]);

    // send OSRM request
    return await osrm.getDirections(waypoints);
  }
}
