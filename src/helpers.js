const stringTrimmer = (stringLine = "") =>
  (stringLine.match(/[^\s"]+|"([^"]*)"/gi) || []).map((word) =>
    word.replace(/^"(.+(?="$))"$/, "$1")
  );

module.exports = {
  stringTrimmer,
};
