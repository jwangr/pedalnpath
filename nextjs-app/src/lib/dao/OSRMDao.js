import axios from "axios";

export default class OSRMDao {
  async getDirections(coordinates) {
    // coordinates: [waypoint1[], waypoint2[], waypoint3[], waypoint4[] , etc. ]
    const urlQuery = coordinates.join(";");
    const url = `http://localhost:5000/route/v1/bicycle/${urlQuery}?overview=full&steps=true`;

    const response = await axios.get(url);
    const data = response.data;
    return data;
  }

  async getGeocode(location) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        location
      )}&format=json`
    );

    const data = await res.json();

    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  }
}
