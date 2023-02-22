var express = require("express");
var router = express.Router();
const {
  getPipelineSteps,
  getEslintDetails,
} = require("../src/circleCiDetailsExtractor");
const { getAllWarnings, getFilesPath } = require("../src/eslintExtractor");
const fs = require('fs')

/* GET home page. */
router.get("/", function (_, res, next) {
  res.render("index", { title: "Express" });
});

/* POST receive webhook data */
router.post("/pipeline-finished", async (req, res, next) => {
  const { job, project } = req.body;
  const [vcs, user, projectName] = project.slug.split("/");
  const pipelineDetails = await getPipelineSteps(vcs, user, projectName, job.number);
  const eslintDetails = await getEslintDetails(pipelineDetails, "Run ESLint");
  const warnings = getAllWarnings(eslintDetails)
  const paths = getFilesPath(eslintDetails)

  res.json({
    jobNumber: job.number,
    projectSlug: `${vcs}/${user}/${projectName}`,
    pipelineDetails,
    eslintDetails,
    warnings,
    paths
   });
});

module.exports = router;
