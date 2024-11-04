Feature: Check if health endpoint responds properly.

    Background:
        Given API endpoint is given by env "API_BASE_URL"

    Scenario: Retrieve health status
        When I send a GET request to "/api/health"
        Then the API should respond with status code 200
        And the response should contain an object
        And the response object should contain the property "status"
        And the response object property "status" is of type "number"

    Scenario: Retrieve health status of used service
        When I send a GET request to "/api/health"
        Then the API should respond with status code 200
        And the response should contain an object
        And the response object should contain the property "services" of type "array"