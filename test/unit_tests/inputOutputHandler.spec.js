const expect = require("expect");
const sinon = require("sinon");
const inputOutputHandler = require("../../src/inputOutputHandler");
const dataModeler = require("../../src/dataModeler");
const helpers = require("../../src/helpers");
const insulationQualityRater = require("../../src/insulationQualityRater");
const mockError = new Error("Boom!");
describe("inputOutputHandler", () => {
  let _inputOutputHandler;
  let _dataModeler;
  let _helpers;
  let _insulationQualityRater;

  const rawQueryData = [
    { name: "John Doe", region: { country: "Canada" } },
    {
      name: "John Doe",
      region: { country: "Canada", province: "Ontario" },
    },
    {
      name: "Alicia Yazzie",
      region: { country: "US", province: "Arizona" },
    },
  ];

  const userData = [
    {
      name: "John Doe",
      location: { country: "Canada", province: "Ontario", city: "Toronto" },
      rValue: 1.5,
    },
    {
      name: "Samanta Smith",
      location: { country: "Canada", province: "Ontario", city: "London" },
      rValue: 3.7,
    },
    {
      name: "Adam Xin",
      location: {
        country: "Canada",
        province: "British Columbia",
        city: "Vancouver",
      },
      rValue: 2.11,
    },
    {
      name: "Monica Taylor",
      location: { country: "Canada", province: "Ontario", city: "Toronto" },
      rValue: 2.11,
    },
    {
      name: "Alicia Yazzie",
      location: { country: "US", province: "Arizona", city: "Phoenix" },
      rValue: 5.532,
    },
    {
      name: "Mohammed Zadeh",
      location: { country: "Canada", province: "Ontario", city: "Toronto" },
      rValue: 1.43,
    },
  ];
  beforeEach(() => {
    _inputOutputHandler = sinon.mock(inputOutputHandler);
    _dataModeler = sinon.mock(dataModeler);
    _helpers = sinon.mock(helpers);
    _insulationQualityRater = sinon.mock(insulationQualityRater);
  });

  afterEach(() => {
    _inputOutputHandler.verify();
    _dataModeler.verify();
    _helpers.verify();
    _insulationQualityRater.verify();
  });

  describe("processUserInput", () => {
    it("should process input successfully", () => {
      _helpers
        .expects("stringTrimmer")
        .withArgs('"John Doe" "Canada/Ontario/Toronto" 1.5')
        .returns(["John Doe", "Canada/Ontario/Toronto", "1.5"]);
      _dataModeler
        .expects("userDataModeler")
        .withArgs(["John Doe", "Canada/Ontario/Toronto", "1.5"])
        .returns({
          name: "John Doe",
          location: { country: "Canada", province: "Ontario", city: "Toronto" },
          rValue: 1.5,
        });
      expect(
        inputOutputHandler.processUserInput(
          '"John Doe" "Canada/Ontario/Toronto" 1.5'
        )
      ).toEqual();
    });
    it("should return an error if data format is wrong", () => {
      _helpers.expects("stringTrimmer").withArgs("").returns([]);
      _dataModeler.expects("userDataModeler").never();
      expect(inputOutputHandler.processUserInput("")).toEqual();
    });
    it("should process query input successfully", () => {
      _helpers
        .expects("stringTrimmer")
        .withArgs('"John Doe" "Canada/Ontario/Toronto"')
        .returns(["John Doe", "Canada/Ontario/Toronto"]);
      _dataModeler
        .expects("queryDataModeler")
        .withArgs(["John Doe", "Canada/Ontario/Toronto"])
        .returns({
          name: "John Doe",
          location: { country: "Canada", province: "Ontario", city: "Toronto" },
        });
      expect(
        inputOutputHandler.processUserInput(
          '"John Doe" "Canada/Ontario/Toronto"'
        )
      ).toEqual();
    });
  });
});
