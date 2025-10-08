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
import ValidateNewBikePath from "@/lib/utils/validation/ValidateNewBikePath";

describe("User paths controller", () => {
  let controller;
  let validator;
  let mockFindPathByNameResult = [{ id: 1 }];
  let mockfindPathById = { title: "mockfindPathById" };
  let mockDeletedPath = { title: "mockDeletedPath" };
  let mockSavedPath = { title: "mockSavedPath" };
  let mockCreatedPath = { title: "mockCreatedPath" };

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
    mockUserPathDao.savePath = jest.fn().mockResolvedValue(mockSavedPath);

    // mock bikepath dao
    mockBikePathDao.findPathByName = jest
      .fn()
      .mockResolvedValue(mockFindPathByNameResult);
    mockBikePathDao.createPath = jest.fn().mockResolvedValue(mockCreatedPath);

    // mock validator instance -> functions mocked below
    validator = new ValidateNewBikePath();

    controller = new UserPathDBController(
      mockUserPathDao,
      mockBikePathDao,
      validator
    );
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
    mockUserPathDao.findPathById.mockResolvedValue(null);

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
    expect(result).toEqual(mockDeletedPath);
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
    expect(result).toEqual(mockSavedPath);
  });
  it("toggleAddDelete: checks and saves any new path to global database", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({
        userId: 2,
        path: { title: "title" },
      }),
    };

    // Mock resolved values
    mockBikePathDao.findPathByName.mockResolvedValue(null); //mockResolvedValue for sync functions, like API calls
    validator.validatePath = jest
      .fn()
      .mockReturnValue({ title: "validatedPath" }); // mockReturnValue for non-async functions, like in validation
    mockBikePathDao.createPath.mockResolvedValue({
      id: "newPath ID",
    });

    // Action
    const result = await controller.toggleAddDelete(mockReq);

    // Assertions
    expect(validator.validatePath).toHaveBeenCalledWith({ title: "title" });
    expect(mockBikePathDao.createPath).toHaveBeenCalledWith({
      title: "validatedPath",
    });
    expect(mockUserPathDao.savePath).toHaveBeenCalledWith("newPath ID", 2);
    expect(result).toEqual(mockSavedPath);
  });
  it("toggleAddDelete: throws error if userId is invalid", async () => {
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
        json: jest.fn().mockResolvedValue({
          userId: id,
          path: {
            title: "title",
          },
        }),
      };
      await expect(controller.toggleAddDelete(mockReq)).rejects.toThrow(
        ValidationError
      );
      await expect(controller.toggleAddDelete(mockReq)).rejects.toThrow(
        "Provide a valid userId"
      );
    }
  });
  it("toggleAddDelete: throws error if requested path missing title", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({
        userId: 2,
        path: {
          id: "Missing title",
        },
      }),
    };
    await expect(controller.toggleAddDelete(mockReq)).rejects.toThrow(
      ValidationError
    );
    await expect(controller.toggleAddDelete(mockReq)).rejects.toThrow(
      "Please provide a valid path"
    );
  });
  it("toggleAddDelete: throws an error if validation fails for new path", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({
        userId: 2,
        path: {
          title: "title",
        },
      }),
    };

    // mock return values
    mockBikePathDao.findPathByName.mockResolvedValue(null);
    validator.validatePath = jest.fn(() => {
      throw new ValidationError("Invalid path");
    });

    // Assertions
    await expect(controller.toggleAddDelete(mockReq)).rejects.toThrow(
      ValidationError
    );
  });
  it("toggleCompleted: changes path completion", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({
        userId: 2,
        pathId: 3,
      }),
    };

    // mock return values
    mockUserPathDao.findPathById.mockResolvedValue({
      tite: "found path by ID",
      completed: false,
    });
    mockUserPathDao.toggleCompleted.mockResolvedValue({
      title: "toggledPath",
    });

    // Actions
    const result = await controller.toggleCompleted(mockReq);

    // Assertions
    expect(mockUserPathDao.findPathById).toHaveBeenCalledWith(3, 2);
    expect(mockUserPathDao.toggleCompleted).toHaveBeenCalledWith(3, true);
    expect(result).toEqual({ title: "toggledPath" });
  });
  it("toggleCompleted: throws error if path not found in database", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({
        userId: 2,
        pathId: 3,
      }),
    };

    // mock return values
    mockUserPathDao.findPathById.mockResolvedValue(null);

    // Assertions
    await expect(controller.toggleCompleted(mockReq)).rejects.toThrow(
      new NotFoundError("Path not found.")
    );
  });
  it("toggleCompleted: throws error if invalid user ID or path ID", async () => {
    const mockReq = {
      json: jest.fn(),
    };
    const invalidCases = [
      { userId: null, pathId: 1, reason: "userId is null" },
      { userId: 1, pathId: null, reason: "pathId is null" },
      { userId: "1", pathId: 1, reason: "userId is a string" },
      { userId: 1, pathId: "2", reason: "pathId is a string" },
      { userId: 0, pathId: 1, reason: "userId is zero" },
      { userId: -1, pathId: 1, reason: "userId is negative" },
      { userId: 1, pathId: 0, reason: "pathId is zero" },
      { userId: 1, pathId: -5, reason: "pathId is negative" },
      { userId: NaN, pathId: 1, reason: "userId is NaN" },
      { userId: 1, pathId: NaN, reason: "pathId is NaN" },
    ];

    invalidCases.forEach(async ({ userId, pathId, reason }) => {
      mockReq.json.mockResolvedValue({ userId, pathId });
      await expect(controller.toggleCompleted(mockReq)).rejects.toThrow(
        new ValidationError("Invalid user ID or path ID")
      );
    });
  });
});
