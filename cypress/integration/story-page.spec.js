/// <reference types="cypress"/>

import LoginPage from '../support/PageObjects/LoginPage';
import MainPage from '../support/PageObjects/MainPage'
import StoryPage from '../support/PageObjects/StoryPage'

const mainPage = new MainPage();
const storyPage = new StoryPage();
const loginPage = new LoginPage();

function openTrendingStory() {
    cy.visit("https://kumparan.com/");
    cy.title()
        .should('eq',"kumparan.com - Platform Media Berita Kolaboratif, Terkini Indonesia Hari Ini");

    mainPage.getStoryInTrending()
        .click({force: true})
        .invoke('text')
        .then((headlineTitle) =>{
            storyPage.getStoryTitle().should('have.text', headlineTitle);
        })
}

describe("Commenting on a story", () => {
    const typedComment = "Wadaw";

    context("when logged in", () => {
        before(()=>{
            openTrendingStory();
        })
    
        it("should type a comment", () => {
            storyPage.getCommentSection().click({force: true});

            storyPage.getCommentFieldInput().scrollIntoView().should('be.visible');

            storyPage.getCommentFieldInput()
                .click({force: true})
                .type(typedComment, {force: true})
                .invoke('text')
                .then(() => {
                    storyPage.getTypedComment().should('have.text', typedComment);
                })
            
            storyPage.getSubmitCommentButton()
                .should('have.css', 'border-top-color', 'rgb(4, 164, 164)')
                .click({force: true});            
        })

        it("should logged in", () => {
            cy.url().should('eq','https://kumparan.com/login');

            loginPage.getEmailFieldInput()
                .type(Cypress.env('email'))
                .should('have.value', Cypress.env('email'));

            loginPage.getPasswordFieldInput()
                .type(Cypress.env('password'))
                .should('have.value', Cypress.env('password'));

            loginPage.getSubmitButton().click();
            
            mainPage.getAvatarInNavigationBar()
                .invoke('attr', 'name')
                .should('equal', Cypress.env('name'));
        })
        
        it("should leave a comment", () => {
            storyPage.getCommentSection().click({force: true});

            storyPage.getCommentFieldInput()
                .scrollIntoView()
                .should('be.visible')
                .then(() => {
                    storyPage.getCommenterComment()
                        .should('have.text', typedComment);
                    
                    storyPage.getCommenterName()
                        .should('have.text', Cypress.env('name'));
                });
        })
    })

    context("when NOT logged in", () => {
        before(() => {
            openTrendingStory();
        })

        it('should type a comment',() => {
            storyPage.getCommentSection().click({force: true});
            storyPage.getCommentFieldInput()
                .type(typedComment, {force: true})
                .invoke('text')
                .then(() => {
                    storyPage.getTypedComment().should('have.text', typedComment);
                })

            storyPage.getSubmitCommentButton()
                .should('have.css', 'border-top-color', 'rgb(4, 164, 164)')
                .click({force: true});
        })
    
        it("redirected to login page", () => {
            cy.url().should('eq','https://kumparan.com/login');
        })
        
        it('should NOT leave a comment', () => {
            cy.go('back');

            storyPage.getStoryTitle().should('have.exist');
            storyPage.getCommentSection().click({force: true});
            
            storyPage.getTotalComment()
                .scrollIntoView()
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    if(text == "0 Komentar") {
                        storyPage.getCommenterComment()
                            .should('not.have.exist').then(()=>{
                                storyPage.getCommenterName()
                                    .should('not.exist');
                            });
                    }
                    else {
                        storyPage.getCommenterComment()
                            .should('not.have.text', typedComment).then(()=> {
                                storyPage.getCommenterName()
                                    .should('not.have.value',Cypress.env('name'));
                            });
                    }
                })            
        })
    })
})