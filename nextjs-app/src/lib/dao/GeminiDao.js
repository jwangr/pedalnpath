import axios from "axios";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default class GeminiDao {
  async sendRequest(location) {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: `List of bicycle tracks around ${location}? Return the result in JSON format,
                                [{
                                title: "",
                                description: "",
                                difficulty: "",
                                distanceKm: number,
                                duration: "",
                                startCoordinate: [0, 0],
                                endCoordinate: [0, 0],
                                coordinates: [ [0, 0], [0, 0], [0, 0]]
                                highlights: ["", "", ""],
                                notes: "",
                                trackType: "",
                                suitableFor: ["", "", ""],
                                }]`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GEMINI_API_KEY,
        },
      }
    );
    const candidates = response.data.candidates;

    let data =
      candidates[0]?.content?.parts[0]?.text ||
      "{title: 'No response from Gemini'}";
    data = data.replace(/```json|```/g, "").trim();
    console.log(data);

    return data;
  }

  async checkinNZ(location) {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: `Is ${location} in New Zealand? Return a response in JSON format: {validLocation: true/false}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GEMINI_API_KEY,
        },
      }
    );
    const candidates = response.data.candidates;

    let data =
      candidates[0]?.content?.parts[0]?.text ||
      "{title: 'No response from Gemini'}";
    data = data.replace(/```json|```/g, "").trim();
    console.log(data);

    return data;
  }
}
