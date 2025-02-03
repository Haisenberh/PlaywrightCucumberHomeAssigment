Feature: User Registration via CSV Data
  Scenario Outline: User can register on site using valid CSV data
    Given I am on the registration page
    When I register user using CSV data from file <testUserDataFile>
    And I save user registration number to file <sharedFile>
    Then I should see registration confirmation success message

    Examples:
      | testUserDataFile | sharedFile |
      | valid-user-test-data.csv | registration-data.csv |
  
  Scenario Outline: User can login to the application using registered username and password
    Given I am on the login page
    When I login using CSV data from file <testUserDataFile>
    Then I should see a Registration Number displayed on the page
    When I read registration number from file <sharedDataFile>
    Then Registration Number on home page conform user one

    Examples:
      | testUserDataFile | sharedDataFile |
      | valid-register-test-data.csv | registration-data.csv |

  Scenario Outline: User can't register on site with invalid username
    Given I am on the registration page
    When I register user using CSV data from file <testUserDataFile>
    Then I should see an error message with text <errorMessage>

    Examples:
      | testUserDataFile | errorMessage |
      | invalid-register-test-data.csv | Invalid username address. |
