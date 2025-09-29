import { POST } from "@/app/api/gemini/route.jsx";
import { GeminiTestData } from "../helpers/GeminiTestData";

// No need to mock DAO here because jest.setup.js already handles it

describe("Gemini API Routes Integration", () => {
  test("POST /api/gemini returns response with correct status and JSON", async () => {
    const newGeminiData = GeminiTestData.getNewGeminiData();

    const req = GeminiTestData.createMockRequest(
      "http://localhost:3000/api/gemini",
      "POST",
      newGeminiData
    );

    const response = await POST(req);

    expect(response.status).toBe(200);
    expect(response instanceof Response).toBe(true);

    const json = await response.json();
    const parsed = JSON.parse(json);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0].title).toBe(
      "Queenstown Trail - Lake Wakatipu Ride"
    );
  });

  test("POST /api/gemini with invalid data still responds", async () => {
    const invalidData = GeminiTestData.getInvalidGeminiData();

    const req = GeminiTestData.createMockRequest(
      "http://localhost:3000/api/gemini",
      "POST",
      invalidData
    );

    const response = await POST(req);

    expect(response.status).toBe(200);
    expect(response instanceof Response).toBe(true);
  });

});
