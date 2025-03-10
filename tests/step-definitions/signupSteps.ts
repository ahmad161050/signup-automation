import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Page, chromium } from "@playwright/test";
import { SignUpPage } from "../page-objects/signupPage";

let page: Page;
let signUpPage: SignUpPage;

Given("I navigate to the given sign-in url", async function () {
  const browser = await chromium.launch({ headless: false, slowMo: 100 }); // Slow down execution slightly
  page = await browser.newPage();
  signUpPage = new SignUpPage(page);

  await signUpPage.navigateToSignIn();
  await page.waitForTimeout(3000);

  // Explicit waits to avoid timeouts
  await page.waitForLoadState('domcontentloaded'); // Ensure DOM is loaded
  await page.waitForLoadState('networkidle'); // Ensure all requests are finished
});


When("I accept the cookies", async function () {
  await page.waitForTimeout(3000);
  await signUpPage.acceptCookies();
});

Then("The cookies banner should disappear", async function () {
  const isBannerVisible = await signUpPage.isCookieBannerVisible();
  expect(isBannerVisible).toBeFalsy();
});

Then("I should be navigated to the sign-in page", async function () {
  const isSignInPage = await signUpPage.isOnSignInPage();
  expect(isSignInPage).toBeTruthy();
});

When("I click on the {string} button", async function (buttonText) {
  if (buttonText === "Start a free trial") {
    await signUpPage.clickSignUpButton();
  } else {
    throw new Error(`Button with text '${buttonText}' not found`);
  }
});

Then("I should be navigated to the sign-up page step 1", async function () {
  const isSignUpPage = await signUpPage.isOnSignUpPage();
  expect(isSignUpPage).toBeTruthy();
});

When("I leave all mandatory fields empty", async function () { });

When("I try to proceed from step 1 to step 2 of sign-up", async function () { });

Then("I should see an error message {string}", async function (errorMessage) { });

When("I enter an invalid email format {string}", async function (email) { });

When("I enter a non-work email {string}", async function (email) { });

When("I enter a valid work email {string}", async function (email) {
  await page.waitForTimeout(4000);
  await signUpPage.enterEmail(email);
});

Then("The email field should accept the input", async function () {
  await page.waitForTimeout(500);
  const isErrorVisible = await signUpPage.isEmailErrorVisible();
  expect(isErrorVisible).toBeFalsy();
});

When("I enter a password less than 8 characters {string}", async function (password) { });

When("I enter a password without numbers {string}", async function (password) { });

When("I enter a password without letters {string}", async function (password) { });

When("I enter a valid password {string}", async function (password) {
  await signUpPage.enterPassword(password);
  await page.waitForTimeout(2000);
});

Then("The password field should accept the input", async function () {
  await page.waitForTimeout(500);
  const isErrorVisible = await signUpPage.isPasswordErrorVisible();
  expect(isErrorVisible).toBeFalsy();
});

When("I check the Terms and Conditions checkbox", async function () {
  await signUpPage.checkTermsAndConditions();
  await page.waitForTimeout(2000);
});

Then("The error for terms acceptance should disappear", async function () {
  await page.waitForTimeout(500);
  const isErrorVisible = await signUpPage.isTermsErrorVisible();
  expect(isErrorVisible).toBeFalsy();
});


Then('The "Try for free" button should be enabled', async function () {
  const isEnabled = await signUpPage.isTryForFreeButtonEnabled();
  expect(isEnabled).toBeTruthy();
});

When("any required field is missing or invalid in step 1", async function () { });


When("I added valid input to all required fields in step 1", async function () { });

When('I click on "Try for free" button in step 1', async function () {
  await signUpPage.clickTryForFreeButton();
});

Then("I should be navigated to sign-up page step 2", async function () {
  const isStep2Page = await signUpPage.isOnSignUpStep2();
  expect(isStep2Page).toBeTruthy();
});
When("I click on {string} button in step 2", async function (buttonText) { });

Then("The mandatory email field should contain {string} in step 1", async function (email) { });

Then("The mandatory password field should contain {string} step 1", async function (password) { });

Then("The Terms and Conditions checkbox should remain checked", async function () { });

When("I leave the First Name and Last Name fields empty", async function () {
  await signUpPage.clearFirstNameField();
  await signUpPage.clearLastNameField();
});
When("I try to proceed from step 2 to step 3 of signup", async function () {
  await signUpPage.clickNextStepButton();
});
Then('I should see an error message {string} and {string}', async function (firstNameError, lastNameError) {
  const firstNameErrorVisible = await signUpPage.isFirstNameErrorVisible();
  const lastNameErrorVisible = await signUpPage.isLastNameErrorVisible();

  expect(firstNameErrorVisible).toBeTruthy();
  expect(lastNameErrorVisible).toBeTruthy();
});
Then("The {string} button should be disabled in step 2", async function (buttonText) {
  const isDisabled = await signUpPage.isNextStepButtonDisabled();
  expect(isDisabled).toBeTruthy();
});
When("I enter a valid First Name {string}", async function (firstName) {
  await signUpPage.enterFirstName(firstName);
});

When("I enter a valid Last Name {string}", async function (lastName) {
  await signUpPage.enterLastName(lastName);

});

Then("The First Name and Last Name fields should accept input without error", async function () { });

When("I enter phone number {string}", async function (phoneNumber) {
  await signUpPage.enterPhoneNumber(phoneNumber);
});

Then("The phone number field should accept the input", async function () { });

Then("The {string} button should be enabled in step 2", async function (button) {
  if (button === "Next Step") {
    const isNextStepEnabled = await signUpPage.isNextStepButtonEnabled();
    expect(isNextStepEnabled).toBeTruthy();
  } else {
    throw new Error(`Button '${button}' not found.`);
  }
});
When("any required field is missing or invalid in step 2", async function () { });

When("I complete all required fields in step 2", async function () { });

Then("I should be navigated to sign-up step 3", async function () {
  const isStep3Visible = await signUpPage.isOnSignUpStep3();
  expect(isStep3Visible).toBeTruthy();
});

When("I leave the Company Name field empty", async function () {
  await signUpPage.enterCompanyName(""); // Enter empty value
});

When("I try to proceed to create an account in step 3", async function () {
  await signUpPage.clickCreateAccountButton();
});

Then("I should see an error message {string} in step 3", async function (errorMessage) {
  const errorVisible = await signUpPage.isCompanyNameErrorVisible(errorMessage);
  expect(errorVisible).toBeTruthy();
});

When("I enter a company name {string} in Company Name field", async function (companyName) {
  await signUpPage.enterCompanyName(companyName);
});

Then("The error message for Company Name field should disappear", async function () { });

Then('The "Where is your company registered?" dropdown should be visible', async function () {
  const isDropdownVisible = await signUpPage.isCountryDropdownVisible();
  expect(isDropdownVisible).toBeTruthy();
});

When("I leave the country dropdown empty", async function () {
  await signUpPage.clearCountryDropdown();  // Method to clear or leave dropdown empty
});

Then("I should see an error message {string} in step 3 country field", async function (errorMessage) { });

When("I search for a country {string} that is not listed in country drop-down", async function (country) {
  await signUpPage.searchCountry(country);
});

Then("The info text 'Can't find your country? Contact us.' should be displayed", async function () {
  const isInfoDisplayed = await signUpPage.isCountryNotFoundMessageVisible();
  expect(isInfoDisplayed).toBeTruthy();
});

When('I click on "Contact us" in country drop-down in step 3', async function () {
});

Then("I should be navigated to the 'Contact Us' form", async function () { });

When('I click on {string} button to navigate back to sign-up page',function (backButton) { });

When("I clear the country drop-down field", async function () {
  await signUpPage.clearCountryField();
});

When('I search for a country "{string}" in drop-down search', async function (countryName) {
  await signUpPage.searchCountry(countryName);
});

When('I search the existing country {string} in drop-down search', async function (countryName) {
  await signUpPage.searchCountryInDropdown(countryName);
});

When('I select the country from drop-down search results', async function () {
  await page.waitForTimeout(3000);
  await signUpPage.selectCountryFromDropdown();
});

Then('The country {string} should be selected in the country field', async function (expectedCountry) {
  const selectedCountry = await signUpPage.getSelectedCountry();
  expect(selectedCountry).toEqual(expectedCountry);
});
