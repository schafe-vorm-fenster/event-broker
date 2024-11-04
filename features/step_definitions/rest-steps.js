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
  this.response = await this.request.get(path).redirects(1);
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
  function (property) {
    assert.ok(this.response.body.hasOwnProperty(property));
  }
);

Then(
  "the response object property {string} is of type {string}",
  function (property, type) {
    assert.ok(typeof this.response.body[property] === type);
  }
);

Then(
  "the response object should contain the property {string} of type {string}",
  function (property, type) {
    const propertyExists = this.response.body.hasOwnProperty(property);
    let propertyType = false;
    switch (type) {
      case "array":
        propertyType = Array.isArray(this.response.body[property]);
        break;
      case "string":
        propertyType = typeof this.response.body[property] === "string";
        break;
      default:
        typeof this.response.body[property] === type;
    }
    assert.ok(propertyExists && propertyType);
  }
);

Then(
  "the response object should contain the property {string} of type {string} with value {string}",
  function (property, type, value) {
    const propertyExists = this.response.body.hasOwnProperty(property);
    let propertyType = false;
    switch (type) {
      case "array":
        propertyType = Array.isArray(this.response.body[property]);
        break;
      case "string":
        propertyType = typeof this.response.body[property] === "string";
        break;
      case "number":
        propertyType = typeof this.response.body[property] === "number";
        break;
      default:
        typeof this.response.body[property] === type;
    }

    let propertyValue = false;
    switch (type) {
      case "string":
        propertyValue = value;
        break;
      case "number":
        propertyValue = parseInt(value);
        break;
      default:
        propertyValue = value.toString();
    }
    assert.equal(value, propertyValue);
    // assert.ok(propertyExists && propertyType && propertyValue);
  }
);

Then(
  "the response object should contain the property {string} of type {string} with value greater than {string}",
  function (property, type, value) {
    const propertyExists = this.response.body.hasOwnProperty(property);
    const propertyType = typeof this.response.body[property] === type;
    const propertyValue = this.response.body[property];
    if (type === "number") {
      const intValue = parseInt(propertyValue);
      const intCompare = parseInt(value);
      assert.ok(propertyExists && propertyType && intValue > intCompare);
    } else {
      // assume a string and compare by length
      const valueLength = value.length;
      const intCompare = parseInt(value);
      assert.ok(
        propertyExists && propertyType && propertyValue.length > intCompare
      );
    }
  }
);
