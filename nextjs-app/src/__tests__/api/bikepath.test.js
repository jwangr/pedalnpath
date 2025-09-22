import { GET } from "@/app/api/bikepath/route.js";

test("GET /api/bikepath returns all bike paths", async () => {
  const req = new Request("http://localhost:3000/api/bikepath");
  const response = await GET(req);
  const data = await res.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});
