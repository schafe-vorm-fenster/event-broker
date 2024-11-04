# Feature: Manages to import all events of all calendars from "calendar-api" to the "events-api".

#     Background:
#         Given calendar-api-endpoint is given by env "SVF_CALENDARAPI_BASEURL"
#         Given events-api-endpoint is given by env "SVF_EVENTSAPI_BASEURL"

#     Scenario: Trigger the import of all events from all calendars
#         When I send a GET request to "/api/calendar/import/all"
#         Then the API should respond with status code 201
#         And the response should contain an object
#         And the response object should contain the property "status" of type "number" with value "201"
#         And the response object should contain the property "timestamp" of type "string"
#         # maybe return a list of calendars triggered?
        
#     Scenario: Trigger the import for an calendar which has not changed since latest trigger should respond with not modified
#         When I send a GET request to "/api/calendar/import/all"
#         And I send a GET request to "/api/calendar/import/all"
#         Then the API should respond with status code 304
#         And the response should contain an object
#         And the response object should contain the property "status" of type "number" with value "304"
#         And the response object should contain the property "timestamp" of type "string"
