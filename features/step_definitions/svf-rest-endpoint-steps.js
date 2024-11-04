const dotenv = require("dotenv");
const { Given } = require("@cucumber/cucumber");
const assert = require("assert");

Given("calendar-api-endpoint is given by env {string}", function (envVar) {
  dotenv.config();
  const apiBaseUrl = process.env[envVar];
  assert.ok(apiBaseUrl.length > 8);
});

Given("events-api-endpoint is given by env {string}", function (envVar) {
  dotenv.config();
  const apiBaseUrl = process.env[envVar];
  assert.ok(apiBaseUrl.length > 8);
});
