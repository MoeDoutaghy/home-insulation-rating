const expect = require("expect");
const sinon = require("sinon");
const insulationQualityRater = require("../../src/insulationQualityRater");
const mockError = new Error("Boom!");
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
describe("insulationQualityRater", () => {
  let _insulationQualityRater;

  beforeEach(() => {
    _insulationQualityRater = sinon.mock(insulationQualityRater);
  });

  afterEach(() => {
    _insulationQualityRater.verify();
  });

  describe("isUserInQueryRegion", () => {
    it("should return true when user is in the query region", () => {
      expect(
        insulationQualityRater.isUserInQueryRegion(
          {
            name: "John Doe",
            location: {
              country: "Canada",
              province: "Ontario",
              city: "Toronto",
            },
            rValue: 1.5,
          },
          { country: "Canada", province: "Ontario" }
        )
      ).toEqual(true);
    });
    it("should return true when user is in the query region with city", () => {
      expect(
        insulationQualityRater.isUserInQueryRegion(
          {
            name: "John Doe",
            location: {
              country: "Canada",
              province: "Ontario",
              city: "Toronto",
            },
            rValue: 1.5,
          },
          { country: "Canada", province: "Ontario", city: "Toronto" }
        )
      ).toEqual(true);
    });
    it("should return true when user is in the query region with country only", () => {
      expect(
        insulationQualityRater.isUserInQueryRegion(
          {
            name: "John Doe",
            location: {
              country: "Canada",
              province: "Ontario",
              city: "Toronto",
            },
            rValue: 1.5,
          },
          { country: "Canada" }
        )
      ).toEqual(true);
    });
    it("should return false when user is not in the query region", () => {
      expect(
        insulationQualityRater.isUserInQueryRegion(
          {
            name: "John Doe",
            location: {
              country: "Canada",
              province: "Ontario",
              city: "Toronto",
            },
            rValue: 1.5,
          },
          { country: "US" }
        )
      ).toEqual(false);
    });
  });
});

describe("calculateRvalue", () => {
  it("should return rating 1", () => {
    expect(insulationQualityRater.calculateRvalue(95, 100)).toEqual(1);
  });
  it("should return rating 2", () => {
    expect(insulationQualityRater.calculateRvalue(85, 100)).toEqual(2);
  });
  it("should return rating 3", () => {
    expect(insulationQualityRater.calculateRvalue(75, 100)).toEqual(3);
  });
  it("should return rating 4", () => {
    expect(insulationQualityRater.calculateRvalue(65, 100)).toEqual(4);
  });
  it("should return rating 5", () => {
    expect(insulationQualityRater.calculateRvalue(55, 100)).toEqual(5);
  });
  it("should return rating 6", () => {
    expect(insulationQualityRater.calculateRvalue(45, 100)).toEqual(6);
  });
  it("should return rating 7", () => {
    expect(insulationQualityRater.calculateRvalue(34, 100)).toEqual(7);
  });
  it("should return rating 8", () => {
    expect(insulationQualityRater.calculateRvalue(23, 100)).toEqual(8);
  });
  it("should return rating 9", () => {
    expect(insulationQualityRater.calculateRvalue(14, 100)).toEqual(9);
  });
  it("should return rating 10", () => {
    expect(insulationQualityRater.calculateRvalue(9, 100)).toEqual(10);
  });
});

describe("getUserHomeRating", () => {
  it("should return rating 4 for a given user", () => {
    expect(
      insulationQualityRater.getUserHomeRating(userData, {
        name: "John Doe",
        region: { country: "Canada" },
      })
    ).toEqual(4);
  });
});
