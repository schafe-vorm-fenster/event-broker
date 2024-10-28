const dotenv = require("dotenv");
const { Given, When, Then } = require("@cucumber/cucumber");
const supertest = require("supertest");
const assert = require("assert");

let request;
let response;

Given("API endpoint is given by env {string}", function (string) {
  dotenv.config();
  const apiBaseUrl = process.env[string];
  this.request = supertest(apiBaseUrl);
});

Given("API endpoint is {string}", function (string) {
  this.request = supertest(string);
});

When("I send a GET request to {string}", async function (path) {
  this.response = await this.request.get(path);
});

Then("the API should respond with status code {int}", function (int) {
  assert.equal(this.response.status, int);
});

Then("the response content type should be JSON", function () {
  assert.equal(this.response.type, "application/json");
});

Then("the response should contain an array of objects", function () {
  assert.ok(Array.isArray(this.response.body));
});

// And the response should contain an object
Then("the response should contain an object", function () {
  assert.ok(typeof this.response.body === "object");
});

// And the response object should contain the property "status"
Then(
  "the response object should contain the property {string}",
  function (string) {
    assert.ok(this.response.body.hasOwnProperty(string));
  }
);

Then(
  "the response object property {string} is of type {string}",
  function (property, type) {
    assert.ok(typeof this.response.body[property] === type);
  }
);
