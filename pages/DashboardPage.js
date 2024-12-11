// @ts-check

class DashboardPage {
    /**
     * @param {import("@playwright/test").Page} page
     */
    constructor(page) {
		this.page = page;

        // Selectors
		this.pageTitleText = '(//h1)[2]'; 
    }

    /**
    * @param {string} navbarTitle
    */
    async clickNavbarButton(navbarTitle){
        await this.page.click('//nav/button/h2[contains(text(),"' + navbarTitle + '")]');
    }

    /**
    * @returns {Promise<string[]>}
    */
    async getCurrentPage(){
        return await this.page.locator(this.pageTitleText).allInnerTexts();
    }

    /**
    * @param {string} columnName
    * @returns {Promise<string>}
    */
    async getColumnXpath(columnName){
        return '//div[h2[contains(text(), "' + columnName + '")]]';
    }

    /**
    * @param {string} taskName
    * @returns {Promise<string>}
    */
    async getTaskCardXpath(taskName){
        return '//div[h3[contains(text(), "' + taskName + '")]]';
    }

    /**
    * Extracts all the tags (text of <span> elements) within the given task card.
    * @param {string} taskName - The locator for the task card.
    * @returns {Promise<string[]>}
    */
    async getTaskTags(taskName){
        const taskCard = this.page.locator(await this.getTaskCardXpath(taskName));
        const tagXPath = '//span'; // XPath to find all span elements within the task card
        const tags = await taskCard.locator(tagXPath).allTextContents();
        //console.log(tags);
        return tags; // Return the list of tag texts
    }

    /**
    * Checks if a parent element contains a specific child element.
    * @param {string} columnName - The selector for the parent element.
    * @param {string} taskName - The selector for the child element.
    * @returns {Promise<boolean>} - True if the child element exists within the parent, false otherwise.
    */
    async doesColumnContainTask(columnName, taskName) {
        const parent = this.page.locator(await this.getColumnXpath(columnName));
        const child = parent.locator(await this.getTaskCardXpath(taskName));

        // console.log(await parent.allInnerTexts());
        // console.log((await child.count()));
        return (await child.count()) > 0;
    }
}
  
module.exports = DashboardPage;