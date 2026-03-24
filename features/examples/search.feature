# Feature: Search Functionality
#   As a user
#   I want to search for items
#   So that I can find what I need quickly

#   Background:
    # Given I am logged in as "test.user@example.com"
#     And I am on the home page

#   @search
#   Scenario: Search with valid query
#     When I enter "laptop" in the search box
#     And I click the search button
#     Then I should see search results
#     And the results should contain "laptop"

#   @search
#   Scenario: Search with no results
#     When I enter "xyznonexistent" in the search box
#     And I click the search button
#     Then I should see a message "No results found"

#   @search
#   Scenario: Search with empty query
#     When I click the search button without entering text
#     Then I should see a validation message "Please enter a search term"

#   @search
#   @regression
#   Scenario Outline: Search with different queries
#     When I enter "<query>" in the search box
#     And I click the search button
#     Then I should see search results for "<query>"

#     Examples:
#       | query      |
#       | laptop     |
#       | phone      |
#       | headphones |
#       | keyboard   |
