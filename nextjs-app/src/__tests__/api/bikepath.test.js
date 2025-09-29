import { GET, POST, DELETE } from "@/app/api/bikepath/route.js";
import { BikePathTestData } from "../helpers/BikePathTestData";

// The DAO is mocked globally in jest.setup.js

// API Route Integration Tests
describe("Bikepath API Routes Integration", () => {
  test("GET /api/bikepath returns response with correct status", async () => {
    const req = new Request("http://localhost:3000/api/bikepath");
    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(response instanceof Response).toBe(true);
  });

  test("POST /api/bikepath returns response with correct status", async () => {
    const newPathData = BikePathTestData.getNewPathData();
    const req = new Request("http://localhost:3000/api/bikepath", {
      method: "POST",
      body: JSON.stringify(newPathData),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    expect(response.status).toBe(200);
    expect(response instanceof Response).toBe(true);
  });

  test("DELETE /api/bikepath returns response with correct status", async () => {
    const req = new Request("http://localhost:3000/api/bikepath?id=1", {
      method: "DELETE",
    });

    const response = await DELETE(req);
    expect(response.status).toBe(200);
    expect(response instanceof Response).toBe(true);
  });

  test("API route responds to different HTTP methods", async () => {
    // Test that we can call different HTTP methods without errors
    const getReq = new Request("http://localhost:3000/api/bikepath");
    const getResponse = await GET(getReq);
    expect(getResponse instanceof Response).toBe(true);

    const postReq = new Request("http://localhost:3000/api/bikepath", {
      method: "POST",
      body: JSON.stringify(BikePathTestData.getNewPathData()),
    });
    const postResponse = await POST(postReq);
    expect(postResponse instanceof Response).toBe(true);

    const deleteReq = new Request("http://localhost:3000/api/bikepath?id=1");
    const deleteResponse = await DELETE(deleteReq);
    expect(deleteResponse instanceof Response).toBe(true);
  });

  test("GET with title parameter works", async () => {
    const req = new Request(
      "http://localhost:3000/api/bikepath?title=Test%20Path"
    );
    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(response instanceof Response).toBe(true);
  });

  test("API responses contain valid JSON", async () => {
    // Test GET response contains valid JSON
    const getReq = new Request("http://localhost:3000/api/bikepath");
    const getResponse = await GET(getReq);
    const getJson = await getResponse.json();
    expect(typeof getJson).toBe("object");

    // Test POST response contains valid JSON
    const postReq = new Request("http://localhost:3000/api/bikepath", {
      method: "POST",
      body: JSON.stringify(BikePathTestData.getNewPathData()),
      headers: { "Content-Type": "application/json" },
    });
    const postResponse = await POST(postReq);
    const postJson = await postResponse.json();
    expect(typeof postJson).toBe("object");

    // Test DELETE response contains valid JSON
    const deleteReq = new Request("http://localhost:3000/api/bikepath?id=1");
    const deleteResponse = await DELETE(deleteReq);
    const deleteJson = await deleteResponse.json();
    expect(typeof deleteJson).toBe("object");
  });

  test("POST with invalid data structure", async () => {
    const invalidData = BikePathTestData.getInvalidPathData();
    const req = new Request("http://localhost:3000/api/bikepath", {
      method: "POST",
      body: JSON.stringify(invalidData),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    // Even with invalid data, the route should respond (error handling is in controller)
    expect(response instanceof Response).toBe(true);
    expect(response.status).toBe(200);
  });

  test("DELETE with missing ID parameter", async () => {
    const req = new Request("http://localhost:3000/api/bikepath", {
      method: "DELETE",
    });

    const response = await DELETE(req);
    expect(response instanceof Response).toBe(true);
    expect(response.status).toBe(200);
  });
});
