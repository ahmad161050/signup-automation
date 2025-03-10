module.exports = {
    default: {
      require: ["tests/step-definitions/**/*.ts"],
      format: ["progress", "json:reports/cucumber-report.json"],
      publishQuiet: true,
      paths: ["tests/features/**/*.feature"],
      requireModule: ["ts-node/register"]
    }
  };

  