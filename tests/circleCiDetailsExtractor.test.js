const {
  getPipelineSteps,
  getEslintDetails,
} = require("../src/circleCiDetailsExtractor");

describe("given an `circleCiDetailsExtractor` object", () => {
  const vcsType = "github";
  const username = "thcerutti";
  const project = "sample-lint-postprocess";
  const buildNum = "54";

  describe("on a `getPipelineSteps` call", () => {
    it("should get pipeline details", async () => {
      const actual = await getPipelineSteps(
        vcsType,
        username,
        project,
        buildNum
      );

      const expected = [
        "Spin up environment",
        "Preparing environment variables",
        "Checkout code",
        "Install Yarn",
        "Install dependencies",
        "Run ESLint",
        "Install curl",
        "Encode content.txt file in base64 format",
        "Upload lint result data to server",
      ];

      expect(actual.map((item) => item.name)).toEqual(expected);
    });
  });

  describe("on a `getEslintDetails` call", () => {
    it("should get the correct content", async () => {
      const pipelineSteps = await getPipelineSteps(
        vcsType,
        username,
        project,
        buildNum
      );
      const details = await getEslintDetails(pipelineSteps, "Run ESLint");
      expect(details.indexOf('/home/circleci/project/src/anotherFile.js') > 0).toBe(true);
      expect(details.indexOf('/home/circleci/project/src/index.js') > 0).toBe(true);
    });
  });
});
