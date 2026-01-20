Feature: User Logout
  As a logged-in user
  I want to log out of the application
  So that I can secure my account

  Background:
    Given I am logged in as "test.user@example.com"

  @authentication
  Scenario: Successful logout
    When I am on the dashboard page
    And I click on the user menu
    And I click the logout button
    Then I should be redirected to the login page
    And I should not be able to access the dashboard without logging in again

  @authentication
  Scenario: Logout from any page
    When I am on the profile page
    And I click on the user menu
    And I click the logout button
    Then I should be redirected to the login page
