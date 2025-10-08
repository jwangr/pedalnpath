import NotFoundError from "@/lib/utils/errors/NotFoundError";
import mockUserPathDao from "../dao/mockUserPathDao";

// mock external dao and functions
jest.mock("../../src/lib/dao/UserPathDao.js", () => ({
  __esModule: true,
  default: mockUserPathDao,
}));

jest.mock("../../src/lib/dao/BikePathDao.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../src/lib/utils/validation/ValidateNewBikePath.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import UserPathDBController from "@/lib/controllers/UserPathDBController";
import ValidationError from "@/lib/utils/validation/ValidationError";
import { mockBikePathDao } from "../dao/mockBikePathDao";

describe("User paths controller", () => {
  let controller;
  let mockFindPathByNameResult = [{ id: 1 }];
  let mockfindPathById = { title: "mockfindPathById" };
  let mockDeletedPath = { title: "mockDeletedPath" };

  beforeEach(() => {
    jest.clearAllMocks();
    // mock dao functions return values
    mockUserPathDao.getAllPaths = jest
      .fn()
      .mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]);
    mockUserPathDao.findPathByName = jest
      .fn()
      .mockResolvedValue(mockFindPathByNameResult);
    mockUserPathDao.findPathById = jest
      .fn()
      .mockResolvedValue(mockfindPathById);
    mockUserPathDao.deletePath = jest.fn().mockResolvedValue(mockDeletedPath);

    // mock bikepath dao
    mockBikePathDao.findPathByName = jest
      .fn()
      .mockResolvedValue(mockFindPathByNameResult);

    controller = new UserPathDBController(mockUserPathDao, mockBikePathDao);
  });

  it("gets all paths for specified user", async () => {
    const mockReq = {
      url: "https://localhost:3000/api/userpath?id=2",
    };
    const result = await controller.getPaths(mockReq);
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
  it("gets all (1) paths matching specified title", async () => {
    const mockReq = {
      url: "https://localhost:3000/api/userpath?title=test&id=2",
    };
    const result = await controller.getPaths(mockReq);
    expect(mockUserPathDao.findPathByName).toHaveBeenCalledWith("test", 2);
    expect(result).toEqual(mockFindPathByNameResult);
  });
  it("getPaths throws an error if no path matches specified title", async () => {
    const mockReq = {
      url: "https://localhost:3000/api/userpath?title=test&id=2",
    };
    mockUserPathDao.findPathByName = jest.fn().mockResolvedValue(null);
    await expect(controller.getPaths(mockReq)).rejects.toThrow(NotFoundError);
  });
  it("getPaths throws an error if userId is not valid", async () => {
    const invalidUserIds = [
      "-1", // negative number
      "abc", // non-numeric string
      "0.5", // float
      "0", // 0
      null, // null
      undefined, // undefined
    ];
    for (const id of invalidUserIds) {
      const mockReq = {
        url: `https://localhost:3000/api/userpath?title=test&id=${id}`,
      };
      await expect(controller.getPaths(mockReq)).rejects.toThrow(
        ValidationError
      );
      await expect(controller.getPaths(mockReq)).rejects.toThrow(
        "A valid UserId is required"
      );
    }
  });
  it("deletePath: deletes path", async () => {
    const mockReq = {
      url: `https://localhost:3000/api/userpath?id=1&pathId=2`,
    };
    const result = await controller.deletePath(mockReq);
    expect(mockUserPathDao.findPathById).toHaveBeenCalledTimes(1);
    expect(mockUserPathDao.findPathById).toHaveBeenCalledWith(2, 1);
    expect(result).toEqual(mockDeletedPath);
  });
  it("deletePath: throws an error if invalid user id or path id", async () => {
    const invalidCases = [
      { userId: -1, pathId: 1 },
      { userId: 0, pathId: 2 },
      { userId: 1, pathId: -5 },
      { userId: 1, pathId: 0 },
      { userId: "abc", pathId: 1 },
      { userId: 1, pathId: "xyz" },
      { userId: null, pathId: 1 },
      { userId: 1, pathId: null },
      { userId: undefined, pathId: 1 },
      { userId: 1, pathId: undefined },
    ];

    for (const { userId, pathId } of invalidCases) {
      const mockReq = {
        url: `https://localhost:3000/api/userpath?id=${userId}&pathId=${pathId}`,
      };
      await expect(controller.deletePath(mockReq)).rejects.toThrow(
        ValidationError
      );

      await expect(controller.deletePath(mockReq)).rejects.toThrow(
        "Please provide valid ID's for user and bikepath."
      );
    }
  });
  it("deletePath: throws an error if path not found in database", async () => {
    const mockReq = {
      url: `http://localhost/api/deletepath?id=1&pathId=10`,
    };

    // Mock DAO to return null (path not found)
    mockUserPathDao.findPathById.mockReturnValue(null);

    await expect(controller.deletePath(mockReq)).rejects.toThrow(
      "Path isn't saved to user's profile"
    );
  });
  it("toggleAddDelete: removes saved path from user's database", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({
        userId: 2,
        path: { title: "title" },
      }),
    };
    mockUserPathDao.findPathByName.mockResolvedValue({
      userId: 2,
      id: 3,
      bikepathId: 1,
    });
    const result = await controller.toggleAddDelete(mockReq);
    expect(mockBikePathDao.findPathByName).toHaveBeenCalledWith("title");
    expect(mockUserPathDao.findPathByName).toHaveBeenCalledWith("title", 2);
    expect(mockUserPathDao.deletePath).toHaveBeenCalledWith(3, 2);
  });
  it("toggleAddDelete: saves path to user's database", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({
        userId: 2,
        path: { title: "title" },
      }),
    };
    mockBikePathDao.findPathByName.mockResolvedValue({ id: 3 });
    mockUserPathDao.findPathByName.mockResolvedValue();
    
    const result = await controller.toggleAddDelete(mockReq);
    expect(mockBikePathDao.findPathByName).toHaveBeenCalledWith("title");
    expect(mockUserPathDao.findPathByName).toHaveBeenCalledWith("title", 2);
    expect(mockUserPathDao.savePath).toHaveBeenCalledWith(3, 2);
  });
});
