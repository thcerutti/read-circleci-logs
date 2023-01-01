const axios = require("axios");

module.exports = {
  getPipelineSteps: async (vcsType, username, project, buildNum) => {
    let url = `https://circleci.com/api/v1.1/project/${vcsType}/${username}/${project}/${buildNum}`;

    const content = await axios.get(url);
    return content.data.steps;
  },
  getEslintDetails: async (pipelineDetails, eslintPipelineName) => {
    const filteredStep = pipelineDetails.filter(
      (item) => item.name === eslintPipelineName
    );
    const stepDetailUrl = filteredStep[0]?.actions[0]?.output_url;
    const x = await axios.get(stepDetailUrl);
    return x.data[0].message;
  },
};
