Feature: Manages to import all events of a calendar from "calendar-api" to the "events-api".

    Background:
        Given API endpoint is given by env "API_BASE_URL"
        Given calendar-api-endpoint is given by env "SVF_CALENDARAPI_BASEURL"
        Given events-api-endpoint is given by env "SVF_EVENTSAPI_BASEURL"

    Scenario: Trigger the import of all events from a filled calendar e.g. paper recycling
        When I send a GET request to "/api/calendars/import/fs5r0j9thgru6jto0d3pnnemo49pd36l@import.calendar.google.com"
        Then the API should respond with status code 200
        And the response should contain an object
        And the response object should contain the property "status" of type "number" with value "200"
        And the response object should contain the property "results" of type "number" with value greater than "0"

    Scenario: Trigger the import of all events from an empty calendar e.g. empty test calendar
        When I send a GET request to "/api/calendars/import/c_46994e65f2a4d424f41dcd72cbbdf9c8d01cedb2d4ca4eb850d24b6f5de32289@group.calendar.google.com"
        Then the API should respond with status code 200
        And the response should contain an object
        And the response object should contain the property "status" of type "number" with value "204"
        And the response object should contain the property "results" of type "number" with value "0"
        And the response object should contain the property "timestamp" of type "string"

    Scenario: Trigger the import without a calendar id should respond with an error
        When I send a GET request to "/api/calendars/import/"
        Then the API should respond with status code 400
        And the response object should contain the property "status" of type "number" with value "400"

    Scenario: Trigger the import for an unknown calendar should respond with an error
        When I send a GET request to "/api/calendars/import/unknown@import.calendar.google.com"
        Then the API should respond with status code 404
        And the response object should contain the property "status" of type "number" with value "404"

    Scenario: Trigger the import for an calendar which has not changed since latest trigger should respond with not modified
        When I send a GET request to "/api/calendars/import/0fc2sup8usvqp7520n0krkn0ipdmmf0o@import.calendar.google.com"
        And I send a GET request to "/api/calendars/import/0fc2sup8usvqp7520n0krkn0ipdmmf0o@import.calendar.google.com"
        Then the API should respond with status code 200
        And the response should contain an object
        And the response object should contain the property "status" of type "number" with value "304"
        And the response object should contain the property "results" of type "number" with value "0"
        And the response object should contain the property "timestamp" of type "string"

    Scenario: Trigger the import for an calendar with timeframe parameters from and to as iso timestamps
        When I send a GET request to "/api/calendars/import/fs5r0j9thgru6jto0d3pnnemo49pd36l@import.calendar.google.com?from=2024-12-01T00:00:00Z&to=2024-12-31T23:59:59Z"
        Then the API should respond with status code 200
        And the response should contain an object
        And the response object should contain the property "status" of type "number" with value "200"
        And the response object should contain the property "results" of type "number" with value greater than "0"
        And the response object should contain the property "timestamp" of type "string"
        And the response object should contain the property "from" of type "string" with value "2024-12-01T00:00:00Z"
        And the response object should contain the property "to" of type "string" with value "2024-12-31T23:59:59Z"