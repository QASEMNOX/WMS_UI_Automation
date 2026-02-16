// @ts-check

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 20000,
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    ignoreHTTPSErrors: true,
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    screenshot: 'on',
    video: 'on',
    trace: 'on'
    //trace : 'retain-on-fail'
  },

});
module.exports = config;
