/// <reference types="cypress"/>

describe('Open a news page', () => {
    const xpathFirstNewsInCarousel = "(//*[@data-qa-id='headline-card']/descendant::span[@data-qa-id='title'])[1]";
    const xpathStoryTitle = "(//h1[@data-qa-id='story-title'])";
    const xpathFirstNewsInTrending = "(//*[@data-qa-id='trending-story-item']/descendant::span[@data-qa-id='title'])[1]";

    beforeEach(() => {
        cy.visit("https://kumparan.com/");
        cy.title().should('eq',"kumparan.com - Platform Media Berita Kolaboratif, Terkini Indonesia Hari Ini");
    })

    it("should open the first headline news on carousel", () => {
        cy.xpath(xpathFirstNewsInCarousel).invoke('text').then((headlineTitle) => {
            // cy.log(headlineTitle);
            cy.xpath(xpathFirstNewsInCarousel).click({force: true});
            
            // Assert
            cy.xpath(xpathStoryTitle).should('have.text', headlineTitle);
        })
    })

    it("should open the first trending news on trending section", () => {
        cy.xpath(xpathFirstNewsInTrending).invoke('text').then((headlineTitle) =>{
            cy.xpath(xpathFirstNewsInTrending).click({force: true});

            // Assert
            cy.xpath(xpathStoryTitle).should('have.text', headlineTitle);
        })
    })

})