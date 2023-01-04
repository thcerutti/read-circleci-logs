module.exports =  {
  getAllWarnings: (inputText) => {
    const warningTypeRegex = /\w.[-].*/gm;
    const match = inputText.match(warningTypeRegex);

    let dic = {};
    match.map((element) => {
      if (dic[element]) {
        dic[element]++;
      } else {
        dic[element] = 1;
      }
    });
    return dic;
  },
  getFilesPath: (inputText) => {
    const filesPathRegex = /^\/.*.js/gm
    return inputText.match(filesPathRegex)
  }
};
