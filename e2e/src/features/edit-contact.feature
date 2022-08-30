Feature: As a user I expect to be able to edit a new contact

  @regression
  Scenario: As a user I expect to be able to edit a new contact
    Given I am on the "home" page
    And I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    And I fill in the "name" input with "Tina Bradley"
    And I select the "Female" option from the "gender"
    And I fill in the "phone" input with "153-555-0113"
    And I fill in the "street" input with "760 Puma Terrace"
    And I fill in the "city" input with "Springfield"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Tina Bradley"
    And the "contact" should be displayed
    And I click the "edit" button

    And I fill in the "name" input with "Ned Brady"
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input with "163-555-0113"
    And I fill in the "street" input with "800 Puma Terrace"
    And I fill in the "city" input with "Shelbyville"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Ned Brady"
    And the "contact" should be displayed

    And the "full name label" should contain the text "Name:"
    And the "name" should equal the text "Ned Brady"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should equal the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should equal the text "800 Puma Terrace, Shelbyville"

    And the "edit" should be displayed
    And the "delete" should be displayed

  Scenario: As a user I can hit a validation error on each field on edit contact
