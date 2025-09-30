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
      )}&format=json&countrycodes=nz`
    );

    const data = await res.json();
    const cleanedData = data.map((place) => ({
      name: place.name,
      lat: place.lat,
      lon: place.lon,
    }));

    console.log(cleanedData);

    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  }
}
