module.exports = function(config) {
  config.set({

      frameworks: ["jasmine", "karma-typescript"],
      files: [
          { pattern: "src/**/*.ts" }
      ],
      preprocessors: {
          "**/*.ts": ["karma-typescript"]
      },
      karmaTypescriptConfig: {
        compilerOptions: {
            module: "commonjs"
        },
        tsconfig: "./tsconfig.json"
      },
      reporters: ["dots", "karma-typescript"],
      customLaunchers: {
        ChromeDebugging: {
          base: 'Chrome'
        }
      },
      browsers: ["ChromeDebugging"],
      singleRun: false
  });
};