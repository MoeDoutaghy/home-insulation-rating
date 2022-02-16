const userDataModeler = (data) => {
  return {
    name: data[0],
    location: locationObjectBuilder(data[1]),
    rValue: parseFloat(data[2]),
  };
};

const queryDataModeler = (data) => {
  return {
    name: data[0],
    region: locationObjectBuilder(data[1]),
  };
};
const locationObjectBuilder = (location) => {
  const parsedLocation = location.split("/");
  const locationObjectKeys = ["country", "province", "city"];
  const locationObject = {};
  try {
    if (parsedLocation.length > 3) {
      throw new Error("Invalid location format.");
    }
    for (let i = 0; i < parsedLocation.length; i++) {
      locationObject[locationObjectKeys[i]] = parsedLocation[i];
    }

    return locationObject;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { userDataModeler, queryDataModeler, locationObjectBuilder };
