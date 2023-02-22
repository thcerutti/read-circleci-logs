const axios = require("axios");

module.exports = {
  getPipelineSteps: async (vcsType, username, project, buildNum) => {
    let url = `https://circleci.com/api/v1.1/project/${vcsType}/${username}/${project}/${buildNum}`;

    const content = await axios.get(url);
    return content.data.steps;
  },
};
