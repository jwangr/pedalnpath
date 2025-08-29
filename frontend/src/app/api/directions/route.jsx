import axios from "axios";

export async function POST(req, res) {
  const { start, end } = await req.json(); // destructure the body into start and finish coordinates (of format [lat, long])

  const url =`http://localhost:5000/route/v1/bicycle/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&steps=true`;
  
  const response = await axios.get(url);
  const data = response.data;
  return new Response(JSON.stringify(data), { status: 200 });
}
