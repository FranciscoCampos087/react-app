Feature: As a user I expect to be able to search a new contact

  @smoke @regression
  Scenario: As a user I don't expect to see a contact that does not exist
    Given I am on the "home" page
    And I fill in the "search" input with "Funky Name"
    Then the "contact" should not be displayed
    And the "no items message" should contain the text "There are no items to display"
