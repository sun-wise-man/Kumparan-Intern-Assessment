/// <reference types="cypress"/>

import MainPage from '../support/PageObjects/MainPage'
import StoryPage from '../support/PageObjects/StoryPage'

describe('Open a news page', () => {    
    const mainPage = new MainPage();
    const storyPage = new StoryPage();

    beforeEach(() => {
        cy.visit("https://kumparan.com/");
        cy.title()
            .should('eq',"kumparan.com - Platform Media Berita Kolaboratif, Terkini Indonesia Hari Ini");
    })

    it("should open the first headline news on carousel", () => {
        mainPage.getStoryInCarousel()
            .click({force: true})
            .invoke('text')
            .then((headlineTitle) => {
                storyPage.getStoryTitle().should('have.text', headlineTitle);
        })
    })

    it("should open the first trending news on trending section", () => {
        mainPage.getStoryInTrending()
            .click({force: true})
            .invoke('text')
            .then((headlineTitle) =>{
                storyPage.getStoryTitle().should('have.text', headlineTitle);
        })
    })

})