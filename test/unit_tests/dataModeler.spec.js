const expect = require("expect");
const sinon = require("sinon");
const dataModeler = require("../../src/dataModeler");
const mockError = new Error("Invalid location format.");

describe("dataModeler", () => {
  let _dataModeler;

  beforeEach(() => {
    _dataModeler = sinon.mock(dataModeler);
  });

  afterEach(() => {
    _dataModeler.verify();
  });

  describe("userDataModeler", () => {
    const userData = ["John Doe", "Canada/Ontario/Toronto", "1.5"];
    const queryData = ["John Doe", "Canada/Ontario/Toronto"];
    it("should return an object with user data", () => {
      expect(dataModeler.userDataModeler(userData)).toEqual({
        name: "John Doe",
        location: {
          city: "Toronto",
          country: "Canada",
          province: "Ontario",
        },
        rValue: 1.5,
      });
    });
    it("should return an object with query data", () => {
      expect(dataModeler.queryDataModeler(queryData)).toEqual({
        name: "John Doe",
        region: {
          city: "Toronto",
          country: "Canada",
          province: "Ontario",
        },
      });
    });
    it("should return an error if location format is wrong object with query data", () => {
      expect(
        dataModeler.locationObjectBuilder(
          "Canada/British Columbia/Vancouve/abc"
        )
      ).toEqual();
    });
    it("should correct location object", () => {
      expect(
        dataModeler.locationObjectBuilder("Canada/British Columbia/Vancouver")
      ).toEqual({
        country: "Canada",
        province: "British Columbia",
        city: "Vancouver",
      });
    });
  });
});
