# LoopQA Evaluation #
---

## Introduction: ##
Create a Playwright-driven test suite that leverages data-driven techniques to minimize code duplication and improve scalability. By driving test scenarios from a JSON object, we can dynamically adapt each test case without repeating code, ensuring a clean and maintainable structure as new cases are added.

## Implementation: ##
- Software Requirements
    - npx 10.9.0
    - node v22.12.0

- The test and the test data is stored in the tests/ folder. 
- The test data is stored in the [tests/testCases.json](tests/testCases.json) file. 
    - The file represents the testcases that have been requested, and all applicable data.
    - You will find the url, username, and password stored in the outer json.
    - You will find the test case data under the field 'test_cases'.
- In the test file [tests/elementVerifyTests.test.js](tests/elementVerifyTests.test.js), we loop through
the test cases listed under the 'test_cases' field in the json file.
- This project uses Page Object Models. The pages are stored in the pages/ folder. \
    - Pages used:
        1. LoginPage - Stores locators and functions used on the login page.
            - enterUsername(username) - fills the username field
            - enterPassword(password) - fills the password field
            - clickLogin() - clicks the login button

        2. DashboardPage - Stores locators and functions used on the dashboard page. 
            - clickNavbarButton(navbarTitle) - clicks the navbar button identified by the arg 'navbarTitle'
            - getCurrentPage() - returns a list of strings, in which should reside the current page title 
            - getColumnXpath(columnName) - returns a dynamic xpath for the column corresponding to arg 'columnName'
            - getTaskCardXpath(taskName) - returns a dynamic xpath for the task card corresponding to arg 'taskName'
            - getTaskTags(taskName) - returns an array of strings representing all of the tasks for listed in the task card
            - doesColumnContainTask(columnName, taskName) - returns a boolean which will be true if the task card identified by arg 'taskName' is under the column identified by arg 'columnName'

Challenges: \
None.

Results: \
All tests passed. 

Recommendations: \
None
