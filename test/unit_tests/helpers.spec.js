const expect = require("expect");
const sinon = require("sinon");
const helpers = require("../../src/helpers");

describe("helpers", () => {
  let _helpers;

  beforeEach(() => {
    _helpers = sinon.mock(helpers);
  });

  afterEach(() => {
    _helpers.verify();
  });

  describe("stringTrimmer", () => {
    it("should return empty array for emptry string", () => {
      expect(helpers.stringTrimmer("")).toEqual([]);
    });
    it("should split the string by white spaces between quates", () => {
      expect(
        helpers.stringTrimmer('"John Doe" "Canada/Ontario/Toronto" 1.5')
      ).toEqual(["John Doe", "Canada/Ontario/Toronto", "1.5"]);
    });
  });
});
