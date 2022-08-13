class StoryPage {
    getStoryTitle() {
        return cy.xpath("(//h1[@data-qa-id='story-title'])");
    }

    getCommentSection() {
        return cy.xpath("//*[@data-qa-id='btn-comment']", {timeout: 5000});
    }
    
    getCommentFieldInput() {
        return cy.xpath("//div[@data-qa-id='input-comment']/descendant::div[@contenteditable='true']", {timeout: 10000});
    }

    getTypedComment() {
        return cy.xpath("(//*[@data-qa-id='input-comment']/descendant::*[@contenteditable='true']/descendant::span)[1]");
    }

    getSubmitCommentButton() {
        return cy.get("#track_submit_comment");
    }

    getTotalComment() {
        return cy.xpath("//*[@data-qa-id='total-comment']")
    }

    getCommenterComment() {
        return cy.xpath("(//*[@data-qa-id='comment-item']/descendant::*[@data-slate-string='true'])[1]");
    }

    getCommenterName() {
        return cy.xpath("(//span[@data-qa-id='commenter-name'])[1]");
    }
}

export default StoryPage;