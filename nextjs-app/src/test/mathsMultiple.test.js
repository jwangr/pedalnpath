import { expect } from "chai";
import multiple from "./mathsMultiple.js";

describe("multiple", () => {
  it("should multiply two positive numbers", () => {
    expect(multiple(2, 3)).to.equal(6);
    expect(multiple(5, 4)).to.equal(20);
  });
});
