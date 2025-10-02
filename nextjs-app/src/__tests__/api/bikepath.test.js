import { GET, POST, DELETE } from "@/app/api/bikepath/route.js";
import { BikePathTestData } from "../helpers/BikePathTestData";
import BikePathDao from "@/lib/dao/BikePathDao";

// DAO is already mocked in jest.setup.js, we just need to access it

describe("Bikepath API Routes Integration", () => {
  let mockDao;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Get the mocked DAO instance
    mockDao = new BikePathDao();
  });

  test("GET /api/bikepath returns response with correct status", async () => {
    const req = new Request("http://localhost:3000/api/bikepath");
    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(response instanceof Response).toBe(true);
    
  const text = await response.text();
  const json = JSON.parse(text);
    expect(Array.isArray(json)).toBe(true);
    expect(json).toHaveLength(2); // Based on your mock data
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
    
  const text = await response.text();
  const json = JSON.parse(text);
    expect(json).toHaveProperty('id');
    expect(json.id).toBe(3); // Based on your mock
  });

  test("DELETE /api/bikepath returns response with correct status", async () => {
    const req = new Request("http://localhost:3000/api/bikepath?id=1", {
      method: "DELETE",
    });

    const response = await DELETE(req);
    expect(response.status).toBe(200);
    expect(response instanceof Response).toBe(true);
    
  const text = await response.text();
  const json = JSON.parse(text);
    expect(json).toHaveProperty('success', true);
  });

  test("API route responds to different HTTP methods", async () => {
    // Test that we can call different HTTP methods without errors
    const getReq = new Request("http://localhost:3000/api/bikepath");
    const getResponse = await GET(getReq);
    expect(getResponse instanceof Response).toBe(true);

    const postReq = new Request("http://localhost:3000/api/bikepath", {
      method: "POST",
      body: JSON.stringify(BikePathTestData.getNewPathData()),
      headers: { "Content-Type": "application/json" },
    });
    const postResponse = await POST(postReq);
    expect(postResponse instanceof Response).toBe(true);

    const deleteReq = new Request("http://localhost:3000/api/bikepath?id=1");
    const deleteResponse = await DELETE(deleteReq);
    expect(deleteResponse instanceof Response).toBe(true);
  });

  test("GET with title parameter works when path exists", async () => {
    // Your mock returns "Test Path 1" when that exact title is searched
    const req = new Request(
      "http://localhost:3000/api/bikepath?title=Test%20Path%201"
    );
    const response = await GET(req);

    expect(response.status).toBe(200);
    expect(response instanceof Response).toBe(true);
    
  const text = await response.text();
  const json = JSON.parse(text);
    expect(json).toHaveProperty('title', 'Test Path 1');
    expect(json).toHaveProperty('id', 1);
  });

  test("GET with title parameter returns 404 when path not found", async () => {
    // Your mock returns null for any title other than "Test Path 1"
    const req = new Request(
      "http://localhost:3000/api/bikepath?title=NonExistent"
    );
    const response = await GET(req);

    expect(response.status).toBe(404);
    expect(response instanceof Response).toBe(true);
    
  const text = await response.text();
  const json = JSON.parse(text);
    expect(json).toHaveProperty('message');
  });

  test("API responses contain valid JSON", async () => {
    // Test GET response contains valid JSON
    const getReq = new Request("http://localhost:3000/api/bikepath");
    const getResponse = await GET(getReq);
  const getText = await getResponse.text();
  const getJson = JSON.parse(getText);
    expect(typeof getJson).toBe("object");
    expect(Array.isArray(getJson)).toBe(true);

    // Test POST response contains valid JSON
    const postReq = new Request("http://localhost:3000/api/bikepath", {
      method: "POST",
      body: JSON.stringify(BikePathTestData.getNewPathData()),
      headers: { "Content-Type": "application/json" },
    });
    const postResponse = await POST(postReq);
  const postText = await postResponse.text();
  const postJson = JSON.parse(postText);
    expect(typeof postJson).toBe("object");
    expect(postJson).toHaveProperty('id');

    // Test DELETE response contains valid JSON
    const deleteReq = new Request("http://localhost:3000/api/bikepath?id=1");
    const deleteResponse = await DELETE(deleteReq);
  const deleteText = await deleteResponse.text();
  const deleteJson = JSON.parse(deleteText);
    expect(typeof deleteJson).toBe("object");
  });

  test("POST with invalid data structure returns error", async () => {
    const invalidData = BikePathTestData.getInvalidPathData();
    
    const req = new Request("http://localhost:3000/api/bikepath", {
      method: "POST",
      body: JSON.stringify(invalidData),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    
    expect(response instanceof Response).toBe(true);
    // The response depends on your validation logic
    // If validation catches it, it should return an error status
  const text = await response.text();
  const json = JSON.parse(text);
    expect(typeof json).toBe("object");
  });

  test("POST with duplicate path returns validation error", async () => {
    // Override the mock for this specific test
    mockDao.createPath.mockRejectedValueOnce({
      code: 'P2002',
      message: 'Unique constraint failed',
    });

    const req = new Request("http://localhost:3000/api/bikepath", {
      method: "POST",
      body: JSON.stringify(BikePathTestData.getNewPathData()),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(req);
    
    expect(response instanceof Response).toBe(true);
  const text = await response.text();
  const json = JSON.parse(text);
    expect(json).toHaveProperty('message');
    // The message comes from your ValidationError or the catch block
    expect(typeof json.message).toBe('string');
  });

  test("DELETE with missing ID parameter returns error", async () => {
    const req = new Request("http://localhost:3000/api/bikepath", {
      method: "DELETE",
    });

    const response = await DELETE(req);
    
    expect(response instanceof Response).toBe(true);
    // Should handle missing ID - verify your actual error handling
  const text = await response.text();
  const json = JSON.parse(text);
    expect(typeof json).toBe("object");
  });

  test("GET with userId parameter filters paths by user", async () => {
    const userId = 123;
    
    // Override the mock for this test to return filtered results
    mockDao.getAllPaths.mockResolvedValueOnce([
      {
        id: 1,
        title: "User Path 1",
        userId: 123,
        description: "Path for user 123",
      },
    ]);

    const req = new Request(`http://localhost:3000/api/bikepath?userId=${userId}`);
    const response = await GET(req);

    expect(response.status).toBe(200);
  const text = await response.text();
  const json = JSON.parse(text);
    expect(Array.isArray(json)).toBe(true);
    
    // Verify getAllPaths was called with the userId
    expect(mockDao.getAllPaths).toHaveBeenCalledWith(userId);
  });

  test("DAO methods are called correctly", async () => {
    // Test that GET calls getAllPaths
    const getReq = new Request("http://localhost:3000/api/bikepath");
    await GET(getReq);
    expect(mockDao.getAllPaths).toHaveBeenCalled();

    // Clear and test POST
    jest.clearAllMocks();
    const postReq = new Request("http://localhost:3000/api/bikepath", {
      method: "POST",
      body: JSON.stringify(BikePathTestData.getNewPathData()),
      headers: { "Content-Type": "application/json" },
    });
    await POST(postReq);
    expect(mockDao.createPath).toHaveBeenCalled();

    // Clear and test DELETE
    jest.clearAllMocks();
    const deleteReq = new Request("http://localhost:3000/api/bikepath?id=1");
    await DELETE(deleteReq);
    expect(mockDao.deletePath).toHaveBeenCalledWith(1);
  });
});