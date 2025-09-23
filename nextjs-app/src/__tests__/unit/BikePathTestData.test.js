import { BikePathTestData } from "../helpers/BikePathTestData";

describe("BikePathTestData Factory", () => {
  test("should provide consistent sample data", () => {
    const path1 = BikePathTestData.getSamplePath(0);
    const path2 = BikePathTestData.getSamplePath(0);

    // Should return deep copies, not references
    expect(path1).toEqual(path2);
    expect(path1).not.toBe(path2);
  });

  test("should provide multiple different sample paths", () => {
    const allPaths = BikePathTestData.getAllSamplePaths();

    expect(allPaths).toHaveLength(3);
    expect(allPaths[0].title).toBe("Scenic River Trail");
    expect(allPaths[1].title).toBe("Mountain Challenge");
    expect(allPaths[2].title).toBe("Urban Explorer");
  });

  test("should provide new path data for creation tests", () => {
    const newPath = BikePathTestData.getNewPathData();

    expect(newPath).toHaveProperty("title");
    expect(newPath).toHaveProperty("description");
    expect(newPath).toHaveProperty("startCoordinate");
    expect(newPath).toHaveProperty("endCoordinate");
    expect(Array.isArray(newPath.startCoordinate)).toBe(true);
    expect(Array.isArray(newPath.endCoordinate)).toBe(true);
  });

  test("should create mock requests with proper structure", () => {
    const mockReq = BikePathTestData.createMockRequest(
      "http://test.com",
      "GET",
      { test: "data" }
    );

    expect(mockReq.url).toBe("http://test.com");
    expect(mockReq.method).toBe("GET");
    expect(typeof mockReq.json).toBe("function");
  });

  test("should create consistent DAO mocks", () => {
    const mockDao1 = BikePathTestData.createMockDaoImplementation();
    const mockDao2 = BikePathTestData.createMockDaoImplementation();

    // Should have the same structure
    expect(Object.keys(mockDao1)).toEqual(Object.keys(mockDao2));
    expect(typeof mockDao1.getAllPaths).toBe("function");
    expect(typeof mockDao1.createPath).toBe("function");
    expect(typeof mockDao1.deletePath).toBe("function");
    expect(typeof mockDao1.findPathByName).toBe("function");
  });

  test("mock DAO functions should be Jest mocks", () => {
    const mockDao = BikePathTestData.createMockDaoImplementation();

    expect(jest.isMockFunction(mockDao.getAllPaths)).toBe(true);
    expect(jest.isMockFunction(mockDao.createPath)).toBe(true);
    expect(jest.isMockFunction(mockDao.deletePath)).toBe(true);
    expect(jest.isMockFunction(mockDao.findPathByName)).toBe(true);
  });
});
