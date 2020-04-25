module.exports = function(config) {
  config.set({

      frameworks: ["jasmine", "karma-typescript"],
      files: [
          { pattern: "src/**/*.ts" },
          { pattern: "src/**/*.js" }
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
          base: 'Chrome',
          flags: ['--remote-debugging-port=9333']
        }
      },
      browsers: ["ChromeDebugging"],
      singleRun: true
  });
};