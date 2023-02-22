const axios = require("axios");

const clearColorCodeRegex =
  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/gm;

module.exports = {
  getAllWarnings: (inputText) => {
    const groupRegex =
      /(?<line_column>\d+:\d+)( {2})(?<type>\w+)( {2})(?<description>.+ {2})(?<short_name>.+)/gm;
    const dic = [];
    for (const myMatch of inputText.matchAll(groupRegex)) {
      dic.push({ ...myMatch.groups });
    }
    return dic;
  },
  getFilesPath: (inputText) => {
    const filesPathRegex = /^\/.*.js/gm;
    return inputText.match(filesPathRegex);
  },
  getEslintDetails: async (pipelineSteps, eslintPipelineName) => {
    const filteredStep = pipelineSteps.filter(
      (item) => item.name === eslintPipelineName
    );
    const stepDetailUrl = filteredStep[0]?.actions[0]?.output_url;
    const stepDetails = await axios.get(stepDetailUrl);

    return stepDetails.data[0].message.replace(clearColorCodeRegex, "");
  },
};
