const sampleText = `
yarn run v1.22.11
$ eslint src/**/*.js

/home/circleci/project/src/anotherFile.js
  1:1  warning  'console' is not defined  no-undef

/home/circleci/project/src/index.js
   3:3  warning  'console' is not defined                 no-undef
   8:3  warning  'console' is not defined                 no-undef
  11:5  warning  'myUnusedvar' is defined but never used  no-unused-vars

✖ 4 problems (0 errors, 4 warnings)

Done in 0.37s.
`

const findPaths = sampleText.match(/^\/.*.js/gm)
console.log(findPaths);

const onlyLintMessages = sampleText.match(/^.*\d:\d.*$/gm)
console.log(onlyLintMessages);

findPaths.map(path => {
  const sourceInLines = sampleText.split('\n')
  console.log('path', sourceInLines.indexOf(path))
})

console.log(sampleText.indexOf('\n\n'))