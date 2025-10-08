import { __esModule } from "@/generated/prisma";
import mockOSRMDao from "../dao/mockOSRMDao";
import OSRMController from "@/lib/controllers/OSRMController";

jest.mock("../../src/lib/dao/OSRMDao.js", () => ({
  __esModule: true,
  default: mockOSRMDao,
}));

describe("OSRM controller", () => {
  let controller;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOSRMDao.getGeocode.mockResolvedValue([0, 0]);

    controller = new OSRMController(mockOSRMDao);
  });

  it("returns the geocode of locations", async () => {
    await expect(controller.getGeocode("location")).resolves.toEqual([0, 0]);
  });
});
