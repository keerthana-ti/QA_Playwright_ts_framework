module.exports = {
  default: {
    paths: [
      'tests/features/**/*.feature'
    ],

    require: [
      'tests/step-definitions/**/*.ts',
      'tests/hooks/**/*.ts'
    ],

    requireModule: [
      'tsx/cjs'
    ],

    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'allure-cucumberjs/reporter'
    ],

    timeout: 15000,

    publishQuiet: true
  }
};