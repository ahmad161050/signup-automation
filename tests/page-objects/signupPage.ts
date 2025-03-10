import { Page } from "@playwright/test";

export class SignUpPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private acceptCookiesButton = "button:has-text('Accept All')";
    private cookieBanner = "#cookie-banner";
    private signUpButton = "a[href='/users/sign_up']";
    private signInUrl = "https://circula-qa-challenge.vercel.app/users/sign_in";
    private signUpUrl = "https://circula-qa-challenge.vercel.app/users/sign_up";
    private emailField = "input[name='email']";
    private passwordField = "input[name='password']";
    private termsCheckbox = "input[type='checkbox'][name='acceptTos']";
    private tryForFreeButton = "button:has-text('Try for free')";
    private step2HeaderLabel = "text=Your contact details";
    private firstNameField = "input[name='firstname']";
    private lastNameField = "input[name='lastname']";
    private phoneNumberField = "input[name='phoneNumber']";
    private nextStepButton = "button:has-text('Next step')";
    private backButton = "button:has-text('Back')";

    private contactUsLink = "text=Contact us.";

    // Step 2 Locators
    private step2Header = "text=Your contact details";
    private firstNameError = "div.cwxtiA:nth-child(1) > label:nth-child(2) > div:nth-child(3) > div:nth-child(1)";
    private lastNameError = "div.cwxtiA:nth-child(1) > label:nth-child(2) > div:nth-child(3) > div:nth-child(1)";
    private nextStepDisabled = "button.sc-7f49027d-0.gZLAHz[disabled]";

    // Step 3 Locators
    private step3Header = "text=Company information";
    private companyNameErrorMessage = "div.sc-b4bf297b-0.jQHmRc";
    private companyNameField = "input[name='organizationName']";
    public countryDropdown = "input[name='country']";
    private createAccountButton = "button:has-text('Create an account')";
    private countryErrorMessage = "div:has-text('Company registration country is required')";
    private countryNotFoundMessage = "div.sc-b4bf297b-0.gcxTMi";
    private countryDropdownOption = (country: string) => `li[role="option"]:has-text("${country}")`;
    // Locator for the Sweden option in the country dropdown
    private get countryDropdownSweden() {
        return this.page.locator('div[data-testid="autocomplete-menu-portal"] ul > li:has-text("Sweden")');
    }



    // Open dropdown button


    // Dropdown list container
    private dropdownList = 'ul.sc-eb60ccfc-0.sc-81a14cdd-0.gKVWWJ.epDTKF.sc-21b8c28b-0.oIVtt';

    // Country option in dropdown
    private dropdownButton = 'div[role="img"][aria-hidden="true"]'; // Open dropdown button
    private countriesDropdownList = 'ul[role="listbox"]'; // Dropdown list container
    private countryOption = (countryName: string) => `ul[role='listbox'] li:has-text("${countryName}")`; // Country option




    // Email Error Messages
    private emailErrorInvalidFormat = "text='Please correct the e-mail address.'";
    private emailErrorNonWorkEmail = "text='Please provide your work email.'";

    // Password Error Locators (Icons + Text)
    private passwordErrorContainer = "div.sc-eb60ccfc-0.sc-b2fd84a5-0.sc-a5185f9a-0";
    private passwordErrorMinLengthIcon = `${this.passwordErrorContainer} symbol#cross`;
    private passwordErrorMissingLetterIcon = `${this.passwordErrorContainer} symbol#cross`;
    private passwordErrorMissingNumberIcon = `${this.passwordErrorContainer} symbol#cross`;

    // Combining the Error Text with Icons
    private passwordErrorMinLength = `${this.passwordErrorMinLengthIcon} + div:has-text('Min. 8 characters')`;
    private passwordErrorMissingLetter = `${this.passwordErrorMissingLetterIcon} + div:has-text('At least 1 letter')`;
    private passwordErrorMissingNumber = `${this.passwordErrorMissingNumberIcon} + div:has-text('At least 1 number')`;

    // Terms and Conditions Error Message
    private termsErrorMessage = "text='Please accept the Terms and Conditions to continue.'";

    // Navigate to the sign-in page
    async navigateToSignIn() {
        await this.page.goto(this.signInUrl); // Waits for full load
    }

    // Accept cookies on the sign-in page
    async acceptCookies() {
        await this.page.click(this.acceptCookiesButton);
    }


    // Check if the cookie banner is still visible
    async isCookieBannerVisible(): Promise<boolean> {
        return await this.page.locator(this.cookieBanner).isVisible({ timeout: 60000 });
    }


    // Validate if the current page is Sign-In page
    async isOnSignInPage(): Promise<boolean> {
        return (await this.page.url()).includes("sign_in");
    }

    // Click on "Sign Up" button
    async clickSignUpButton() {
        await this.page.waitForSelector(this.signUpButton, { timeout: 10000 }); // Ensure button is visible
        await this.page.click(this.signUpButton, { timeout: 30000 }); // Allow enough time for interaction
        await this.page.waitForLoadState('networkidle'); // Ensure navigation completes
    }



    async isOnSignUpPage(): Promise<boolean> {
        await this.page.waitForLoadState('domcontentloaded'); // Ensure the page is fully loaded
        return (await this.page.url()).includes("sign_up");
    }

    // Enter email in the email field
    async enterEmail(email: string) {
        await this.page.fill(this.emailField, email);
    }

    // Check if any email error message is visible
    async isEmailErrorVisible(): Promise<boolean> {
        const invalidFormatError = await this.page.locator(this.emailErrorInvalidFormat).isVisible();
        const nonWorkEmailError = await this.page.locator(this.emailErrorNonWorkEmail).isVisible();
        return invalidFormatError || nonWorkEmailError;
    }

    // Enter password in the password field
    async enterPassword(password: string) {
        await this.page.fill(this.passwordField, password);
    }

    // Check if any password error is visible
    async isPasswordErrorVisible(): Promise<boolean> {
        const minLengthError = await this.page.locator(this.passwordErrorMinLength).isVisible();
        const missingLetterError = await this.page.locator(this.passwordErrorMissingLetter).isVisible();
        const missingNumberError = await this.page.locator(this.passwordErrorMissingNumber).isVisible();

        return minLengthError || missingLetterError || missingNumberError;
    }

    /// Check the Terms and Conditions checkbox
    async checkTermsAndConditions() {
        await this.page.locator(this.termsCheckbox).click({ force: true });
    }

    // Check if the Terms and Conditions error message is visible
    async isTermsErrorVisible(): Promise<boolean> {
        return await this.page.locator(this.termsErrorMessage).isVisible();
    }

    async isTryForFreeButtonEnabled(): Promise<boolean> {
        return await this.page.locator(this.tryForFreeButton).isEnabled();
    }

    // Clicks the 'Try for free' button
    async clickTryForFreeButton() {
        await this.page.click(this.tryForFreeButton);
    }

    // Validates if the user is on step 2 of the signup process
    async isOnSignUpStep2(): Promise<boolean> {
        return await this.page.locator(this.step2HeaderLabel).isVisible();
    }
    // Clear First Name field
    async clearFirstNameField() {
        await this.page.locator(this.firstNameField).fill("");
    }

    // Clear Last Name field
    async clearLastNameField() {
        await this.page.locator(this.lastNameField).fill("");
    }
    // Clear Phone Number Name field
    async clearPhoneNumberField() {
        await this.page.locator(this.phoneNumberField).fill("");
    }

    // Click "Next Step" button to proceed to Step 3
    async clickNextStepButton() {
        await this.page.locator(this.nextStepButton).click();
    }

    // Check if First Name error message is visible
    async isFirstNameErrorVisible(): Promise<boolean> {
        return await this.page.locator(this.firstNameError).isVisible();
    }

    // Check if Last Name error message is visible
    async isLastNameErrorVisible(): Promise<boolean> {
        return await this.page.locator(this.lastNameError).isVisible();
    }

    // Check if "Next Step" button is disabled
    async isNextStepButtonDisabled(): Promise<boolean> {
        return await this.page.locator(this.nextStepButton).isDisabled();
    }

    // Enter first name
    async enterFirstName(firstName: string) {
        await this.page.fill(this.firstNameField, firstName);
    }

    // Enter last name
    async enterLastName(lastName: string) {
        await this.page.fill(this.lastNameField, lastName);
        await this.page.waitForTimeout(1000);
    }

    // Check if "Next Step" button is enabled
    async isNextStepButtonEnabled(): Promise<boolean> {
        return await this.page.locator(this.nextStepButton).isEnabled();
    }
    // Enter phone number
    async enterPhoneNumber(phoneNumber: string) {
        await this.page.fill(this.phoneNumberField, phoneNumber);
    }

    // Check if the user is on Step 3
    async isOnSignUpStep3(): Promise<boolean> {
        await this.page.waitForSelector(this.step3Header, { state: "visible", timeout: 30000 });
        return true;
    }
    // Enter Company Name
    async enterCompanyName(companyName: string) {
        await this.page.fill(this.companyNameField, companyName);
    }

    // Click "Create an Account" button
    async clickCreateAccountButton() {
        await this.page.click("button:has-text('Create an account')");
    }

    // Check if Company Name error message is visible
    async isCompanyNameErrorVisible(errorMessage: string): Promise<boolean> {
        return await this.page.locator(this.companyNameErrorMessage).filter({ hasText: errorMessage }).isVisible();
    }
    // Method to Check if Country Dropdown is Visible
    async isCountryDropdownVisible(): Promise<boolean> {
        return await this.page.locator(this.countryDropdown).isVisible();
    }
    // Method to leave the country dropdown empty
    async clearCountryDropdown() {
        await this.page.locator(this.countryDropdown).fill("");  // Clear input field if applicable
    }

    // Check if the country field error is visible
    async isCountryErrorVisible(expectedMessage: string): Promise<boolean> {
        return await this.page.locator(`div:has-text('${expectedMessage}')`).isVisible();
    }
    // Click on 'Contact us' link
    async clickContactUsLink() {
        await this.page.click(this.contactUsLink);
    }
    // Search for a country in the dropdown
    async searchCountry(country: string) {
        await this.page.fill(this.countryDropdown, country);
    }

    // Check if the country not found message appears
    async isCountryNotFoundMessageVisible(): Promise<boolean> {
        const locator = this.page.locator(this.countryNotFoundMessage);

        // Wait for up to 5 seconds for the message to appear
        await locator.waitFor({ state: "visible", timeout: 5000 }).catch(() => { });

        return await locator.isVisible();
    }

    // Method to clear the country field
    async clearCountryField() {
        await this.page.locator(this.countryDropdown).fill(""); // Clears the input
    }

    // Search for a country in the dropdown field
    async searchCountryInDropdown(countryName: string) {
        this.clearCountryDropdown();
        await this.page.fill(this.countryDropdown, countryName);

    }
    private get countryDropdownSweden2() {
        return this.page.locator('div[data-testid="autocomplete-menu-portal"] ul > li:has-text("Sweden")');
    }

    async selectCountryFromDropdown() {
        console.log("Waiting for dropdown to be visible...");
        await this.page.waitForSelector(this.dropdownList, { state: "visible", timeout: 30000 });
    
        console.log("Trying to find and select Sweden...");
    
        let attempts = 0;
        let isVisible = false;
    
        while (attempts < 15) { // Max 15 scroll attempts to avoid infinite loop
            const countryOption = this.page.locator(`div[data-testid="autocomplete-menu-portal"] ul > li:has-text("Sweden")`);
    
            isVisible = await countryOption.isVisible();
            if (isVisible) {
                console.log("Sweden found, clicking...");
                await countryOption.scrollIntoViewIfNeeded();
                await countryOption.click({ force: true });
                return;
            }
    
            console.log(`Sweden not found, scrolling attempt ${attempts + 1}`);
            await this.page.mouse.wheel(0, 300);
            await this.page.waitForTimeout(500); // Give some time for items to load
            attempts++;
        }
    
        throw new Error("Sweden option not found in dropdown after scrolling.");
    }
    
    
    // Select a country from the dropdown search results
    /*
    async selectCountryFromDropdown() {
        await this.countryDropdownSweden.click({ force: true }); // Click with force
    }

    */

    // Method to get the selected country text
    async getSelectedCountry(): Promise<string> {
        return await this.page.locator(this.countryDropdown).inputValue();
    }

}




