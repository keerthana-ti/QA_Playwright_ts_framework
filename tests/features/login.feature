Feature: Chainex Login

  Scenario: Login with valid credentials
    Given I am on the Chainex login page
    When I enter valid username and password
    And I click the login button
    Then I should be redirected to the OTP page