import axios from "axios";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

//4. Define the API handler function.
export async function POST(req, res) {
  const body = await req.json(); // parses body into JSON
  const location = body.value;

  const response = await axios.post(
    GEMINI_API_URL,
    {
      contents: [
        {
          parts: [
            {
              text: `List of bicycle tracks around ${location}? Respond in JSON like this [{coordinates: [0, 0], title: 'Example', description}, ...].`,
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
    candidates[0]?.content?.parts[0]?.text || "{title: 'No response from Gemini'}";
  data = data.replace(/```json|```/g, "").trim();
  console.log(data);
  
  return new Response(data, { status: 200 });
}
