Feature: As a user I expect to be able to delete a new contact

  @regression
  Scenario: As a user I can delete a new contact
    Given I am on the "home" page
    And I click the "create" button
    When I am directed to the "create contact" page
    And I fill in the "name" input with "Maude Flanders"
    Then I select the "Female" option from the "gender"
    And I fill in the "phone" input with "939-555-0113"
    And I fill in the "street" input with "740 Evergreen Terrace"
    And I fill in the "city" input with "Shelbyville"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Maude Flanders"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "name" should contain the text "Maude Flanders"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Female"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "740 Evergreen Terrace, Shelbyville"
    And the "edit" should be displayed
    And the "delete" should be displayed

    And I click accept on the alert dialog
    And I click the "delete" button
    And I am directed to the "home" page
    And I fill in the "search" input with "Maude Flanders"
    And the "contact" should not be displayed
    And the "no items message" should contain the text "There are no items to display"

  Scenario: As a user I can back of deleting a new contact


  Scenario: As a user I can delete the second searched contact
