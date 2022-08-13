class MainPage {
    getStoryInCarousel() {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        return cy.xpath(`(//*[@data-qa-id='headline-card']/descendant::span[@data-qa-id='title'])[${randomNumber}]`);
    }

    getStoryInTrending() {
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        return cy.xpath(`(//*[@data-qa-id='trending-story-item']/descendant::span[@data-qa-id='title'])[${randomNumber}]`);
    }

    getAvatarInNavigationBar() {
        return cy.xpath("(//div[@data-qa-id='hd-pic-user']/div)[1]");
    }

    getLoginButton() {
        return cy.xpath("//button[@data-qa-id='hd-login']")
    }
}
export default MainPage;