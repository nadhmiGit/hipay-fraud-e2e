Feature: Webdriveruniversity - Login Page

  Background: Pre conditions
    Given I navigate to the webdriveruniversity login page

  #  And I switch to the new browser tab
  @smoke
  @webuniv
  Scenario Outline: Validate valid & invalid login
    When I enter email of webUniv "<username>"
    And I enter password of webUniv "<password>"
    And I click the login button of webUniv

    #   Then I should be presented with an alert box which contains text '<expectedAlertText>'
    Examples:
      | username  | password     | expectedAlertText    |
      | webdriver | webdriver123 | validation succeeded |
      | webdriver | Password123  | validation failed    |
