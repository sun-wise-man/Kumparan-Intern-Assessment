/// <reference types="cypress"/>

import LoginPage from "../support/PageObjects/LoginPage"

function openLoginPage() {
    cy.visit('https://kumparan.com/login');

}

describe("Login",() => {
    const loginPage = new LoginPage();

    context("ABLE to log in using the correct credentials",() => {
        before(openLoginPage());
        
        it('should input all the correct credentials',() => {
            
        })
    })
})