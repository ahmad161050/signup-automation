Feature: User Signup Flow

    Scenario: Handle cookies on the sign-in page
        Given I navigate to the given sign-in url
        When I accept the cookies
        Then The cookies banner should disappear
        And I should be navigated to the sign-in page

    Scenario: Navigate to sign-up page from sign-in page
        Given I should be navigated to the sign-in page
        When I click on the "Start a free trial" button
        Then I should be navigated to the sign-up page step-1

    Scenario: Handle cookies on the sign-up page
        When I accept the cookies
        Then The cookies banner should disappear

    Scenario: Validate email, password, and terms acceptance in step-1
        Given I should be navigated to the sign-up page step-1
        When I leave all mandatory fields empty
        And I try to proceed from step-1 to step-2 of sign-up
        Then I should see an error message "Work email is required."
        And I should see an error message "Min. 8 characters"
        And I should see an error message "At least 1 letter"
        And I should see an error message "At least 1 number"
        And I should see an error message "Please accept the Terms and Conditions to continue."

        When I enter an invalid email format "invalidemail.com"
        Then I should see an error message "Please correct the e-mail address."

        When I enter a non-work email "ahmad@gmail.com"
        Then I should see an error message "Please provide your work email."

        When I enter a valid work email "test@company.com"
        Then The email field should accept the input

        When I enter a password less than 8 characters "short"
        Then I should see an error message "Min. 8 characters"

        When I enter a password without numbers "PasswordTest"
        Then I should see an error message "At least 1 number"

        When I enter a password without letters "12345678"
        Then I should see an error message "At least 1 letter"

        When I enter a valid password "Password1"
        Then The password field should accept the input

        When I check the Terms and Conditions checkbox
        Then The error for terms acceptance should disappear

    Scenario: Validate navigation to 'Terms and Conditions' form
        Given I should be navigated to the sign-up page step-1
        #When I click on "Terms and Conditions" form navigation button on sign-up step-1
        #Then I should be naviagted to "Terms and Conditions" form

    Scenario: Navigate back to sign-up form from 'Terms and Conditions' form
        #Given I should be naviagted to "Terms and Conditions" form
        #When I click on "Back" navigation button on "Terms and Conditons" form
        #Then I should be navigated to the sign-up page step-1

    Scenario: Validate navigation to 'Privacy Policy' form
        Given I should be navigated to the sign-up page step-1
        #When I click on "Privacy Policy" form navigation button on sign-up step-1
        #hen I should be naviagted to "Privacy Policy" form

    Scenario: Navigate back to sign-up form from 'Privacy Policy' form
        #Given I should be naviagted to "Privacy Policy" form
        #When I click on "Back" navigation button on "Privacy Policy" form
        #Then I should be navigated to the sign-up page step-1

    Scenario: Validate 'Try for free' button state based on valid inputs in step-1
        Given I should be navigated to the sign-up page step-1
        #When I enter a valid work email "test@company.com"
        #And I enter a valid password "Password1"
        #And I check the Terms and Conditions checkbox
        Then The "Try for free" button should be enabled

        When any required field is missing or invalid in step-1
    #Then The "Try for free" button should be disabled

    Scenario: Validate navigation from step-1 to step-2
        Given I should be navigated to the sign-up page step-1
        When I added valid input to all required fields in step-1
        And I click on "Try for free" button in step-1
        Then I should be navigated to sign-up page step-2

    Scenario: Validate data persistence when navigating back to step-1 from step-2 and Navigate back to step-2
        Given I should be navigated to sign-up page step-2
        When I click on "Back" button in step-2
        Then The mandatory email field should contain "test@company.com" in step-1
        And The mandatory password field should contain "Password1" step-1
        And The Terms and Conditions checkbox should remain checked

        #When I click on "Try for free" button in step-1
        Then I should be navigated to sign-up page step-2

    Scenario: Validate required fields error messages in step-2
        Given I should be navigated to sign-up page step-2
        When I leave the First Name and Last Name fields empty
        And I try to proceed from step-two to step-three of sign-up
        Then I should see an error message "First name is required" and "Last name is required"
        And The "Next Step" button should be disabled in step-2

    Scenario: Validate First Name and Last Name inputs
        Given I should be navigated to sign-up page step-2
        When I enter a valid First Name "John"
        And I enter a valid Last Name "Doe"
        Then The First Name and Last Name fields should accept input without error
    #And The "Next Step" button should be enabled in step-2

    Scenario: Validate phone number field accepts valid input
        Given I should be navigated to sign-up page step-2
        When I enter phone number "1234567890"
        Then The phone number field should accept the input

    Scenario: Validate 'Next Step' button state based on input in step-2
        Given I should be navigated to sign-up page step-2
        #When I enter a valid First Name "John"
        #And I enter a valid Last Name "Doe"
        #And I enter phone number "1234567890"
        Then The "Next Step" button should be enabled in step-2

        When any required field is missing or invalid in step-2
    #Then The "Next Step" button should be disabled in step-2

    Scenario: Validate navigation from step-2 to step-3
        Given I should be navigated to sign-up page step-2
        When I complete all required fields in step-2
        And I try to proceed from step-two to step-three of sign-up
        Then I should be navigated to sign-up step-3

    Scenario: Validate company name mandatory field
        Given I should be navigated to sign-up step-3
        #When I leave the Company Name field empty
        #And I try to proceed to create an account in step-3
        #Then I should see an error message "Company name is required" in step-3

        When I enter a company name "Plazz AG" in Company Name field
    #Then The error message for Company Name field should disappear

    Scenario: Validate country dropdown presence
        Given I should be navigated to sign-up step-3
        Then The "Where is your company registered?" dropdown should be visible

    Scenario: Validate sign-up form submission without selecting a country
        Given I should be navigated to sign-up step-3
        When I leave the country dropdown empty
        And I try to proceed to create an account in step-3
        Then I should see an error message "Company registration country is required" in step-3 country field

    Scenario: Validate navigation to 'Contact Us' form when no country is found
        Given I should be navigated to sign-up step-3
        When I search for a country "Pakistan" that is not listed in country drop-down
        Then The info text 'Can't find your country? Contact us.' should be displayed
        When I click on "Contact us" in country drop-down in step-3
        Then I should be navigated to the 'Contact Us' form

    Scenario: Validate navigation back to signup form from 'Contact Us' form
        Given I should be navigated to the 'Contact Us' form
        When I click on "Back" button to navigate back to sign-up page
        Then I should be navigated to sign-up step-3

    Scenario: Validate selecting a country by searching an existing country in the dropdown
        Given I should be navigated to sign-up step-3
        When I clear the country drop-down field
        And I search the existing country "Sweden" in drop-down search
        And I select the country from drop-down search results
        Then The country "Sweden" should be selected in the country field

    Scenario: Validate selecting a country by scrolling the existing countries drop-down list
    #Given I should be navigated to sign-up step-3
    #When I clear the country drop-down field
    #And I scroll the countries drop-down list
    #And I select the country "Sweden" from countries drop-down list
    #Then The country "Sweden" should be selected in the country field

    Scenario: Validate data persistence when navigating back to step-2 and step 1 from step-3 and Navigate back to step-3
        #Given I should be navigated to sign-up step-3
        #When I click on "Back" button in step-3
        #Then The mandatory First Name field should contain "John" in step-2
        #And The mandatory Last Name field should contain "Doe" in step-2

        #When I click on "Back" button in step-2
        #Then The mandatory email field should contain "test@company.com" in step-1
        #And The mandatory password field should contain "Password1" step-1
        #And The Terms and Conditions checkbox should remain checked

        #When I click on "Try for free" button in step-1
        #And I click on "Next Step" button in step-2
        #Then I should be navigated to sign-up step-3
