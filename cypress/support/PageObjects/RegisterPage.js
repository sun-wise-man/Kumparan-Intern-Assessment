class RegisterPage {
    getEmailFieldInput() {
        return cy.xpath("//input[@data-qa-id='input-email']");
    }

    getRegisterButton() {
        return cy.xpath("//button[@data-qa-id='btn-save']");
    }
    
    getModalViewText() {
        return cy.xpath("(//div[@data-qa-id='modal']/descendant::span)[1]");
    }

    getModalViewButton() {
        return cy.xpath("//button[@data-qa-id='btn-process']");
    }

    getValidationText() {
        return cy.xpath("//div[@data-qa-id='main-section']/descendant::span");
    }

    getEmailBox() {
        return cy.xpath("//input[@data-qa-id='input-email']/ancestor::div");
    }
}
export default RegisterPage;