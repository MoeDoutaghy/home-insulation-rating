const dataModeler = require("./dataModeler");
const insulationQualityRater = require("./insulationQualityRater");
const helpers = require("./helpers");
const userData = [];
const rawQueryData = [];
const outputRegionList = [];
let newlineFlag = false;

const processUserInput = (input) => {
  try {
    const trimmedString = helpers.stringTrimmer(input);
    if (!trimmedString.length && !userData.length) {
      throw new Error(
        "Invalid data format! Try again or 'control + c' to exit."
      );
    }
    if (userData.length && !trimmedString.length && newlineFlag === false) {
      newlineFlag = true;
      console.log(
        `> Enter query string (when done, enter 'control + c' to display the output):`
      );
      return;
    }
    if (!newlineFlag) {
      if (trimmedString.length === 3) {
        userData.push(dataModeler.userDataModeler(trimmedString));
      } else {
        throw new Error(
          "Invalid user data format! Try again or 'control + c' to exit."
        );
      }
    } else {
      if (trimmedString.length === 2) {
        rawQueryData.push(dataModeler.queryDataModeler(trimmedString));
        outputRegionList.push(trimmedString[1]);
      } else {
        throw new Error(
          "Invalid query data format! Try again or 'control + c' to exit."
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const prepareAndDisplayOutput = () => {
  console.log(`
 ================
| Program Result |
 ================`);
  rawQueryData.forEach((queryUser, idx) => {
    console.log(
      `"${queryUser.name}" "${
        outputRegionList[idx]
      }" ${insulationQualityRater.getUserHomeRating(userData, queryUser)}`
    );
  });
};

module.exports = {
  processUserInput,
  prepareAndDisplayOutput,
};
