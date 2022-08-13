class LoginPage {
    getEmailFieldInput() {
        return cy.xpath("//input[@data-qa-id='input-email']");
    }

    getPasswordFieldInput() {
        return cy.xpath("//input[@data-qa-id='input-password']");
    }

    getSubmitButton() {
        return cy.xpath("//button[@data-qa-id='btn-save']");
    }

}
export default LoginPage;