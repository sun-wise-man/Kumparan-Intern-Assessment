/// <reference types="cypress"/>

import RegisterPage from "../support/PageObjects/RegisterPage";
import VerificationPage from "../support/PageObjects/VerificationPage";

const Jabber = require('jabber');
const registerPage = new RegisterPage();
const verificationPage= new VerificationPage();

function openRegisterPage() {
    cy.visit('https://kumparan.com/register');
    registerPage.getEmailFieldInput().should('exist');
}

describe('Sign-in', () =>{
    const jabber = new Jabber();

    var randEmail = jabber.createEmail('example.com');

    context('ABLE to sign-in using unregistered email', () => {
        before(() => {
            openRegisterPage()
        });

        it('should input an unregistered email', () => {
            registerPage.getEmailFieldInput()
                .type(randEmail)
                .should('have.value', randEmail)
                .blur();
        })
        
        it('should sign-in with an unregistered email', () => {
            registerPage.getRegisterButton()
                .should('have.css', 'cursor', 'pointer')
                .click({force: true});

            registerPage.getModalViewText()
                .should('have.text', 'Link verifikasi sudah dikirim ke email kamu. Yuk langsung buka email dan klik link verifikasinya agar akun kamu aktif.');
        })

        it('should redirect to verification page', () => {
            registerPage.getModalViewButton()
                .click({force: true});
                
            verificationPage.getVerificationPageText()
                .should('contain', randEmail);
        })
    })

    context('UNABLE to sign-in using registered email', () => {
        before(() => {
            openRegisterPage()
        });

        it('should input a registered email', () => {
            registerPage.getEmailFieldInput()
                .type(Cypress.env('email'))
                .should('have.value', Cypress.env('email'))
                .blur();
        })

        it('should NOT sign-in with a registered email', () => {
            cy.intercept('POST','https://auth-v4.kumparan.com/user/registration').as('postRegister');

            registerPage.getRegisterButton()
                .should('have.css', 'cursor', 'pointer')
                .click({force: true});

            cy.wait('@postRegister')
                .its('response')
                .then((response) => {
                    const {statusCode, body} = response;
                    expect(statusCode).to.eq(409);
                    expect(body.message).to.eq("Email sudah terdaftar");
                })
        })

        it('should show validation error text',() => {
            registerPage.getValidationText()
                .should('contain','Email sudah terdaftar');
        })
    })

    context('UNABLE to sign-in with non-email format', () => {
        const nonEmail = "randomEmail";

        before(() => {
            openRegisterPage()
        });

        it('should input a non-email format text',() => {
            registerPage.getEmailFieldInput()
                .type(nonEmail)
                .should('have.value', nonEmail)
                .blur();
        })

        it('should NOT able to click register button',() => {
            registerPage.getRegisterButton()
                .should('have.css', 'cursor', 'not-allowed');
        })

        it('should show validation error text',() => {
            registerPage.getValidationText()
                .should('contain','Harus diisi dengan format email');
        })
    })

    context.only('UNABLE to sign-in with empty email field', () => {
        before(() => {
            openRegisterPage()
        });

        it('should input empty text',() => {
            registerPage.getEmailFieldInput()
                .clear()
                .should('be.empty')
                .blur();
        })

        it('should NOT able to click register button',() => {
            registerPage.getRegisterButton()
                .should('have.css', 'cursor', 'not-allowed');
        })

        it('should show validation error text',() => {
            registerPage.getValidationText()
                .filter(':contains("Tidak boleh kosong")')
                .should('have.length',1);
        })
    })
})