/// <reference types="cypress"/>

describe("Commenting on a story", () => {
    const xpathFirstNewsInTrending = "(//*[@data-qa-id='trending-story-item']/descendant::span[@data-qa-id='title'])[1]";
    const xpathStoryTitle = "(//h1[@data-qa-id='story-title'])";
    const xpathLoginButton = "//button[@data-qa-id='hd-login']";
    const xpathEmailInput = "//input[@data-qa-id='input-email']";
    const xpathPasswordInput = "//input[@data-qa-id='input-password']"
    const xpathSubmitButton = "//button[@data-qa-id='btn-save']";
    const xpathAvatarName = "(//div[@data-qa-id='hd-pic-user']/div)[1]"

    context("when logged in", () => {
        before(()=>{
            cy.visit("https://kumparan.com/");
            cy.xpath(xpathLoginButton).click();
        })

        it("should logged in", () => {
            cy.xpath(xpathEmailInput)
                .type(Cypress.env('email'))
                .should('have.value', Cypress.env('email'));

            cy.xpath(xpathPasswordInput)
                .type(Cypress.env('password'))
                .should('have.value', Cypress.env('password'));

            cy.xpath(xpathSubmitButton).click();
            
            cy.xpath(xpathAvatarName)
                .invoke('attr', 'name')
                .should('equal', Cypress.env('name'));

            cy.title().should('eq',"kumparan.com - Platform Media Berita Kolaboratif, Terkini Indonesia Hari Ini");
        })

        it("should open a trending news", () => {
            cy.xpath(xpathFirstNewsInTrending).invoke('text').then((headlineTitle) =>{
                cy.xpath(xpathFirstNewsInTrending).click({force: true})
                cy.xpath(xpathStoryTitle).should('have.text', headlineTitle);
            })
        })
    
        it("should leave a comment", () => {

        })
    })
    
    
})