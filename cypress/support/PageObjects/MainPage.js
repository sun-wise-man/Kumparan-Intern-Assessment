class MainPage {
    getFirstStoryInCarousel() {
        return cy.xpath("(//*[@data-qa-id='headline-card']/descendant::span[@data-qa-id='title'])[1]");
    }

    getFirstStoryInTrending() {
        return cy.xpath("(//*[@data-qa-id='trending-story-item']/descendant::span[@data-qa-id='title'])[1]");
    }

    getAvatarInNavigationBar() {
        return cy.xpath("(//div[@data-qa-id='hd-pic-user']/div)[1]");
    }

    getLoginButton() {
        return cy.xpath("//button[@data-qa-id='hd-login']")
    }
}
export default MainPage;