const axios = require("axios");

const { getPipelineSteps } = require("../src/circle-ci");

const { getEslintDetails } = require("../src/eslint");

describe("given an `circleCiDetailsExtractor` object", () => {
  const vcsType = "github";
  const username = "thcerutti";
  const project = "sample-lint-postprocess";
  let buildNum = "63";

  beforeEach(async () => {
    let { data } = await axios.get(
      "https://circleci.com/api/v1.1/project/github/thcerutti/sample-lint-postprocess"
    );
    buildNum = data[0]?.build_num;
  });

  describe("on a `getPipelineSteps` call", () => {
    it("should get pipeline details", async () => {
      expect(true).toBe(true);
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
        "Create post content from lint result file",
        "Install curl",
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
      expect(
        details.indexOf("/home/circleci/project/src/anotherFile.js") > 0
      ).toBe(true);
      expect(details.indexOf("/home/circleci/project/src/index.js") > 0).toBe(
        true
      );
    });
  });
});
