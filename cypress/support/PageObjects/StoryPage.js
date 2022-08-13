class StoryPage {
    getStoryTitle() {
        return cy.xpath("(//h1[@data-qa-id='story-title'])");
    }

    getCommentSection() {
        return cy.xpath("//*[@data-qa-id='btn-comment']");
    }
    
    getCommentFieldInput() {
        return cy.xpath("(//div[@data-qa-id='comment-section']/descendant::*[@data-slate-leaf='true'])[1]");
    }

    getTypedComment() {
        return cy.xpath("(//*[@data-qa-id='input-comment']/descendant::*[@contenteditable='true']/descendant::span)[1]");
    }

    getSubmitCommentButton() {
        return cy.get("#track_submit_comment");
    }

    getCommenterComment() {
        return cy.xpath("(//*[@data-qa-id='comment-item']/descendant::*[@data-slate-string='true'])[1]");
    }

    getCommenterName() {
        return cy.xpath("(//*[@data-qa-id='commenter-name'])[1]");
    }
}

export default StoryPage;