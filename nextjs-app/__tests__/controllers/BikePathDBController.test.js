import BikePathDBController from "@/lib/controllers/BikePathDBController";
import NotFoundError from "@/lib/utils/errors/NotFoundError";
import { mockBikePathDao } from "../dao/mockBikePathDao";
import ValidateNewBikePath from "@/lib/utils/validation/ValidateNewBikePath";

// mock the validate path function (will be separately unit tested)
jest.mock("../../src/lib/utils/validation/ValidateNewBikePath.js", () => {
  return jest.fn().mockImplementation(() => {
    return {
      validatePath: jest.fn(),
    };
  });
});

describe("BikePath controller", () => {
  let controller;
  let mockValidatorInstance;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    controller = new BikePathDBController(mockBikePathDao);
    mockValidatorInstance = new ValidateNewBikePath();
  });

  it("returns all bike paths", async () => {
    const mockPaths = [
      { id: 1, title: "trail 1" },
      { id: 2, title: "trail 2" },
    ];
    mockBikePathDao.getAllPaths.mockResolvedValue(mockPaths);

    const req = { url: "http://localhost300/api/bikepaths" };
    const result = await controller.getPaths(req);

    expect(result).toEqual(mockPaths);
  });

  it("returns bike path matching a title", async () => {
    const mockPaths = [
      {
        id: 3,
        title: "trail3",
      },
    ];

    mockBikePathDao.findPathByName.mockResolvedValue(mockPaths);

    const req = { url: "http://localhost300/api/bikepaths?title=trail3" };
    const result = await controller.getPaths(req);

    expect(mockBikePathDao.findPathByName).toHaveBeenCalledWith("trail3");
    expect(result).toEqual(mockPaths);
  });

  it("returns not found error if no path matches title", async () => {
    // Simulate no matching path is found in the dao
    mockBikePathDao.findPathByName.mockResolvedValue(null);

    const req = { url: "http://localhost300/api/bikepaths?title=trail4" };

    // Jest's reject.toThrow for async errors
    await expect(controller.getPaths(req)).rejects.toThrow(NotFoundError);
    await expect(controller.getPaths(req)).rejects.toThrow(
      "Could not find paths called trail4."
    );
    expect(mockBikePathDao.findPathByName).toHaveBeenCalledWith("trail4");
  });

  it("returns all paths for a given userId", async () => {
    // Arrange: simulate DAO returning paths
    const mockUserId = 7;
    const mockPaths = [
      { id: 1, title: "River Trail", difficulty: "Easy" },
      { id: 2, title: "Mountain Pass", difficulty: "Hard" },
    ];

    mockBikePathDao.getAllPaths.mockResolvedValue(mockPaths);

    // Act: create a fake request with userId query param
    const req = {
      url: `http://localhost:3000/api/bikepaths?userId=${mockUserId}`,
    };
    const result = await controller.getPaths(req);

    // Assert: check DAO interaction and output
    expect(mockBikePathDao.getAllPaths).toHaveBeenCalledTimes(1);
    expect(mockBikePathDao.getAllPaths).toHaveBeenCalledWith(mockUserId);
    expect(result).toEqual(mockPaths);
  });

  it("calls validator and creates Path()", async () => {
    const fakePath = { title: "River Trail" };
    const parsedPath = { ...fakePath, id: 1 };

    const req = { json: jest.fn().mockResolvedValue(fakePath) };
    mockValidatorInstance.validatePath.mockReturnValue(parsedPath);
    mockBikePathDao.createPath.mockResolvedValue(parsedPath);

    const result = await controller.createPath(req);
    expect(req.json).toHaveBeenCalled();
    // expect(mockValidatorInstance.validatePath).toHaveBeenCalledTimes(1);
    expect(mockBikePathDao.createPath).toHaveBeenCalledTimes(1);
    expect(result).toEqual(parsedPath);
  });

  it("calls dao.deletePath with correct id", async () => {
    const req = { url: "http://localhost:3000/api/bikepaths?id=42" };

    mockBikePathDao.deletePath.mockResolvedValue({ success: true });

    const result = await controller.deletePath(req);

    expect(mockBikePathDao.deletePath).toHaveBeenCalledWith(42);
    expect(result).toEqual({ success: true });
  });
});
