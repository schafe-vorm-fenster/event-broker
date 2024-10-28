const { Given, When, Then } = require("@cucumber/cucumber");
const supertest = require("supertest");
const assert = require("assert");

let request;
let response;

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
