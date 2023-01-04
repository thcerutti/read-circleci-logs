const {
  getPipelineSteps,
  getEslintDetails,
} = require("./src/circleCiDetailsExtractor");

const {getAllWarnings} = require('./src/eslintExtractor')

const vcsType = "github";
const username = "thcerutti";
const project = "sample-lint-postprocess";
const buildNum = "54";

getPipelineSteps(vcsType, username, project, buildNum).then(async (steps) => {
  const eslintLogs = await getEslintDetails(steps, "Run ESLint");
  const eslintWarnings = getAllWarnings(eslintLogs)
  console.log(eslintWarnings);
});
