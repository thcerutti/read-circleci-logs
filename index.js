const axios = require('axios')

const url = 'https://circleci.com/api/v1.1/project/github/thcerutti/sample-lint-postprocess/54'

axios.get(url).then(res => {
  const steps = res.data.steps;
  steps.map(async step => {
    step.actions.map(async action => {
      if (step.name === 'Run ESLint'){
        // console.log('output_url', action.output_url)
        const url = action.output_url
        const x = await axios.get(url)
        console.log(`[[${step.name}]]`)
        console.log(x.data[0].message)
        console.log('---------------------------------------------')
      }
    })
  })
})