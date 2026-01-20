Feature: User Login
  As a user
  I want to log in to the application
  So that I can access my account

  Background:
    Given I am on the login page

  @smoke @authentication
  Scenario: Successful login with valid credentials
    When I enter email "test.user@example.com"
    And I enter password "SecurePassword123"
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message

  @smoke @authentication
  Scenario: Failed login with invalid credentials
    When I enter email "invalid@example.com"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see an error message "Invalid credentials"
    And I should remain on the login page

  @authentication
  Scenario: Login with empty email
    When I enter password "SecurePassword123"
    And I click the login button
    Then I should see a validation error for email field

  @authentication
  Scenario: Login with empty password
    When I enter email "test.user@example.com"
    And I click the login button
    Then I should see a validation error for password field

  @authentication
  Scenario Outline: Login with various invalid emails
    When I enter email "<email>"
    And I enter password "SecurePassword123"
    And I click the login button
    Then I should see an error message

    Examples:
      | email           |
      | invalid-email   |
      | @example.com    |
      | user@          |
      | user @test.com  |
