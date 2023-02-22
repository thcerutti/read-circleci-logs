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
};
