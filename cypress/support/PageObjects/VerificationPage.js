class VerificationPage {
    getVerificationPageText() {
        return cy.xpath("//div[@data-qa-id='main-section']/descendant::span");
    }
}
export default VerificationPage;