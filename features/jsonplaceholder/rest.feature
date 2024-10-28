Feature: Manage Posts on JSONPlaceholder API

    Background:
        Given API endpoint is "https://jsonplaceholder.typicode.com"

    Scenario: Retrieve a list of posts
        When I send a GET request to "/posts"
        Then the API should respond with status code 200
        And the response should contain an array of objects
