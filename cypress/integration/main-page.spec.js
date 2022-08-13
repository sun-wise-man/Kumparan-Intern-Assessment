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
        mainPage.getFirstStoryInCarousel().invoke('text').then((headlineTitle) => {
            mainPage.getFirstStoryInCarousel().click({force: true});

            storyPage.getStoryTitle().should('have.text', headlineTitle);
        })
    })

    it("should open the first trending news on trending section", () => {
        mainPage.getFirstStoryInTrending().invoke('text').then((headlineTitle) =>{
            mainPage.getFirstStoryInTrending.click({force: true});

            storyPage.getStoryTitle().should('have.text', headlineTitle);
        })
    })

})