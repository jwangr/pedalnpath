import BikePathDBController from "@/lib/controllers/BikePathDBController";
import NotFoundError from "@/lib/utils/errors/NotFoundError";
import { mockBikePathDao } from "../dao/mockBikePathDao";

describe("BikePath controller", () => {
  let controller;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    controller = new BikePathDBController(mockBikePathDao);
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
});
