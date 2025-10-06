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
    console.log(result);
  });
});
