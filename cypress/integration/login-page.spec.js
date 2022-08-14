/// <reference types="cypress"/>

import LoginPage from "../support/PageObjects/LoginPage"
import MainPage from "../support/PageObjects/MainPage";

const Jabber = require('jabber');
const loginPage = new LoginPage();
const mainPage = new MainPage();

function openLoginPage() {
    cy.visit('https://kumparan.com/login');
    loginPage.getEmailFieldInput().should('exist');
    loginPage.getPasswordFieldInput().should('exist');
}

describe("Login",() => {
    const jabber = new Jabber();
    
    var randEmail = jabber.createEmail('example.com');
    var randWord = jabber.createWord(8, true);

    context('ABLE to log in using the correct credentials',() => {
        before(() => {
            openLoginPage()
        });
        
        it('should input all the correct credentials',() => {
            loginPage.getEmailFieldInput()
                .type(Cypress.env('email'))
                .should('have.value', Cypress.env('email'));
            
            loginPage.getPasswordFieldInput()
                .type(Cypress.env('password'))
                .should('have.value', Cypress.env('password'))
        })

        it('should log in with the correct credentials',() => {
            cy.intercept('POST','https://auth-v4.kumparan.com/user/login').as('postLogin');

            loginPage.getSubmitButton()
                .click({force: true});

            cy.wait('@postLogin').its('response').then((response) => {
                const { statusCode, body } = response;
                expect(statusCode).to.eq(200);
                expect(body.is_new_user).to.eq(false);
            })
        })

        it('should redirect to main page',() => {
            cy.url().should('contain','/?ref=login')

            mainPage.getAvatarInNavigationBar()
                .invoke('attr', 'name')
                .should('equal', Cypress.env('name'));
        })
    })

    context('UNABLE to login with the incorrect credential(s)',() => {
        before(() => {
            openLoginPage()
        });

        it('should input correct email with incorrect credential(s)',() => {
            loginPage.getEmailFieldInput()
                .type(randEmail)
                .should('have.value', randEmail);
            
            loginPage.getPasswordFieldInput()
                .type(randWord)
                .should('have.value', randWord);
        })

        it('should NOT log in with the incorrect credentials',() => {
            cy.intercept('POST','https://auth-v4.kumparan.com/user/login').as('postLogin');

            loginPage.getSubmitButton()
                .click({force: true});

            cy.wait('@postLogin').its('response').then((response) => {
                const { statusCode, body } = response;
                expect(statusCode).to.not.equal(200);
                expect(body.is_new_user).not.exist;
            })
        })

        it('should show validation error text',() => {
            loginPage.getValidationText()
                .filter(":contains('Email atau Password Salah')")
                .should('have.length', 2);
        })
    })
    context('UNABLE to login with empty email and password fields',() => {
        before(() => {
            openLoginPage()
        });
        
        it('should input empty text',() => {
            loginPage.getEmailFieldInput()
                .clear()
                .should('be.empty')
                .blur();

            loginPage.getPasswordFieldInput()
                .clear()
                .should('be.empty')
                .blur();
        })
        
        it('should show validation error text',() => {
            loginPage.getValidationText()
                .filter(":contains('Tidak boleh kosong')")
                .should('have.length', 2);
        })
    })
})