import { __esModule } from "@/generated/prisma";
import mockOSRMDao from "../dao/mockOSRMDao";
import OSRMController from "@/lib/controllers/OSRMController";
import validateGeminiCoordinates from "@/lib/utils/validation/ValidateGeminiCoordinates";
import ValidateOSRMRequest from "@/lib/utils/validation/ValidateOSRMRequest";

jest.mock("../../src/lib/dao/OSRMDao.js", () => ({
  __esModule: true,
  default: mockOSRMDao,
}));

jest.mock(
  "../../src/lib/utils/validation/ValidateGeminiCoordinates.js",
  () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue([10, 10]),
  })
);

// mock the class constructor & its methods
jest.mock("../../src/lib/utils/validation/ValidateOSRMRequest.js", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    validateLocation: jest.fn().mockResolvedValue("location"),
  })),
}));

describe("OSRM controller", () => {
  let controller;
  let validator;
  let mockValidateLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // mock dao functions
    mockOSRMDao.getGeocode.mockResolvedValue([0, 0]);
    mockOSRMDao.getDirections.mockResolvedValue([0, 0], [1, 1], [2, 2]);

    // mock validateOSRMrequest class functions and validateGeminiCoordinates functions -> done above

    validator = new ValidateOSRMRequest();
    mockValidateLocation = validator.validateLocation;
    controller = new OSRMController(mockOSRMDao, validator); // make new controller with the mock OSRM dao and mock validator
  });

  it("returns the geocode of locations", async () => {
    await expect(controller.getGeocode("location")).resolves.toEqual([0, 0]);
  });

  it("gets geocode and the OSRM route for discrete start and end points", async () => {
    // mock request object
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ start: "Point A", end: "Point B" }),
    };

    const result = await controller.getGeocodeAndDirections(mockRequest);
    expect(validator.validateLocation).toHaveBeenCalledTimes(2);
    expect(mockOSRMDao.getGeocode).toHaveBeenCalledTimes(2);
    expect(result).toEqual([0, 0], [1, 1], [2, 2]);
  });
  it("validates an array of coordinates and gets OSRM route", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        waypoints: [
          [0, 0],
          [1, 1],
          [2, 2],
        ],
      }),
    };

    const result = await controller.getGeocodeAndDirections(mockRequest);
    expect(validateGeminiCoordinates).toHaveBeenCalledTimes(1);
    expect(validateGeminiCoordinates).toHaveBeenCalledWith([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
    expect(result).toEqual([0, 0], [1, 1], [2, 2]);
  });
  it("throws if validateLocation fails", async () => {
    controller.validate.validateLocation.mockRejectedValue(
      new Error("Invalid location")
    );
    const mockReq = {
      json: jest.fn().mockResolvedValue({ start: [1, 2], end: [3, 4] }),
    };

    await expect(controller.getGeocodeAndDirections(mockReq)).rejects.toThrow(
      "Invalid location"
    );
  });

  it("throws if DAO getDirections fails", async () => {
    mockOSRMDao.getDirections.mockRejectedValue(new Error("OSRM error"));
    const mockReq = {
      json: jest.fn().mockResolvedValue({ start: [1, 2], end: [3, 4] }),
    };

    await expect(controller.getGeocodeAndDirections(mockReq)).rejects.toThrow(
      "OSRM error"
    );
  });
});
