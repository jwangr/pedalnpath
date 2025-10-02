import { expect } from "chai";
import { describe, it, beforeEach, afterEach } from "mocha";
import sinon from "sinon";

// import bikepath controllers and dao
import BikePathDBController from "../lib/controllers/BikePathDBController.js";
import BikePathDao from "../lib/dao/BikePathDao.js";

describe("BikePathController", () => {
  let bikePathController;
  let validateNewBikePath;
  let mockDao;

  beforeEach(async () => {
    // Create a mock DAO
    mockDao = {
      getAllPaths: sinon.stub(),
      findPathByName: sinon.stub(),
      createPath: sinon.stub(),
      deletePath: sinon.stub(),
    };

    // Import validators dynamically to stub them
    validateNewBikePath = await import(
      "../lib/utils/validation/ValidateNewBikePath.js"
    );

    // Create controller instance with mock DAO
    bikePathController = new BikePathDBController(mockDao);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getAllPaths", () => {
    it("Should find a bike path when title is provided", async () => {
      // Arrange the expected request and response
      const title = "Otago";
      const expectedPath = {
        id: 1,
        name: "Otago",
        startLat: 2,
        startLng: 2,
        endLat: 2,
        endLng: 2,
        notes: "string",
        trackType: "string",
        highlights: [],
        coordinates: [],
        suitableFor: [],
      };

      mockDao.findPathByName.resolves(expectedPath);

      // Act
      const result = await bikePathController.getAllPaths(title);

      // Assert
      expect(mockDao.findPathByName.calledOnceWith(title)).to.be.true;
      expect(result).to.deep.equal(expectedPath);
    });
  });
});
