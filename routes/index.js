var express = require("express");
var router = express.Router();
const {
  getPipelineSteps,
  getEslintDetails,
} = require("../src/circleCiDetailsExtractor");
const { getAllWarnings, getFilesPath } = require("../src/eslintExtractor");
const fs = require('fs')

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/pipeline-finished", async (req, res, next) => {
  const { job, project } = req.body;
  console.log("jobNumber", job.number);
  const [vcs, user, projectName] = project.slug.split("/");
  console.log("project info", vcs, user, projectName);

  const pipelineDetails = await getPipelineSteps(vcs, user, projectName, job.number);
  console.log(pipelineDetails);

  const details = await getEslintDetails(pipelineDetails, "Run ESLint");
  console.log(details);

  const warnings = getAllWarnings(details)
  const paths = getFilesPath(details)
  console.log('warnings and paths', warnings, paths);

  res.json({ 
    warnings,
    paths
   });
});

module.exports = router;
