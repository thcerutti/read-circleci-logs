const { getAllWarnings, getFilesPath } = require("../src/eslintExtractor");

const sampleText = `
yarn run v1.22.11
$ eslint src/**/*.js

/home/circleci/project/src/anotherFile.js
  1:1  warning  'console' is not defined  no-undef

/home/circleci/project/src/index.js
   3:3  warning  'console' is not defined                 no-undef
   8:3  warning  'console' is not defined                 no-undef
  11:5  warning  'myUnusedvar' is defined but never used  no-unused-vars

✖ 4 problems (0 errors, 4 warnings)

Done in 0.37s.
`;

describe("given an `eslintExtractor` object", () => {
  describe("on `getAllWarnings` call", () => {
    it("should return expected warnings", () => {
      const warnings = getAllWarnings(sampleText);
      expect(warnings["no-unused-vars"]).toBe(1);
      expect(warnings["no-undef"]).toBe(3);
    });
  });

  describe("on `getFilesPath` call", () => {
    const expected = [
      "/home/circleci/project/src/anotherFile.js",
      "/home/circleci/project/src/index.js",
    ];
    it("should return the files path", () => {
      const actual = getFilesPath(sampleText);
      expect(actual).toEqual(expected);
    });
  });
});
