const isUserInQueryRegion = (user, queryRegion) => {
  let foundAMatch = false;
  if (Object.keys(queryRegion).length === 3) {
    foundAMatch =
      user.location.country === queryRegion.country &&
      user.location.province === queryRegion.province &&
      user.location.city === queryRegion.city;
  } else if (Object.keys(queryRegion).length === 2) {
    foundAMatch =
      user.location.country === queryRegion.country &&
      user.location.province === queryRegion.province;
  } else if (Object.keys(queryRegion).length === 1) {
    foundAMatch = user.location.country === queryRegion.country;
  } else {
    foundAMatch = false;
  }
  return foundAMatch;
};

const calculateRvalue = (numberOfBetterScores, numberOfSameRegionHomes) => {
  const percentageOfMoreEfficientHomes =
    (numberOfBetterScores * 100) / numberOfSameRegionHomes;
  if (percentageOfMoreEfficientHomes >= 90) return 1;
  else if (percentageOfMoreEfficientHomes >= 80) return 2;
  else if (percentageOfMoreEfficientHomes >= 70) return 3;
  else if (percentageOfMoreEfficientHomes >= 60) return 4;
  else if (percentageOfMoreEfficientHomes >= 50) return 5;
  else if (percentageOfMoreEfficientHomes >= 40) return 6;
  else if (percentageOfMoreEfficientHomes >= 30) return 7;
  else if (percentageOfMoreEfficientHomes >= 20) return 8;
  else if (percentageOfMoreEfficientHomes >= 10) return 9;
  else return 10;
};

const getUserHomeRating = (users, queryUser) => {
  let numberOfSameRegionHomes = 0;
  let numberOfBetterScores = 0;
  const rValuesList = [];
  let queryUserRvalue = 0;

  users.forEach((user) => {
    if (isUserInQueryRegion(user, queryUser.region)) {
      numberOfSameRegionHomes++;
      rValuesList.push(user.rValue);
      if (user.name === queryUser.name) queryUserRvalue = user.rValue;
    }
  });
  rValuesList.forEach((rValue) => {
    if (rValue > queryUserRvalue) numberOfBetterScores++;
  });
  return calculateRvalue(numberOfBetterScores, numberOfSameRegionHomes);
};

module.exports = {
  getUserHomeRating,
  isUserInQueryRegion,
  calculateRvalue,
};
