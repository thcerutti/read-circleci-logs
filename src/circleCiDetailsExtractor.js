const axios = require("axios");
const clearColorCodeRegex =
  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/gm;

module.exports = {
  getPipelineSteps: async (vcsType, username, project, buildNum) => {
    let url = `https://circleci.com/api/v1.1/project/${vcsType}/${username}/${project}/${buildNum}`;

    console.log("🚀 ~ file: circleCiDetailsExtractor.js:9 ~ getPipelineSteps: ~ url", url)
    const content = await axios.get(url);
    return content.data.steps;
  },
  getEslintDetails: async (pipelineSteps, eslintPipelineName) => {
    const filteredStep = pipelineSteps.filter(
      (item) => item.name === eslintPipelineName
    );
    const stepDetailUrl = filteredStep[0]?.actions[0]?.output_url;
    const x = await axios.get(stepDetailUrl);

    return x.data[0].message.replace(clearColorCodeRegex, "");
  },
};
