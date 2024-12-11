// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const LoginPage = require('../pages/LoginPage'); // Import the LoginPage class
const DashboardPage = require('../pages/DashboardPage'); // Import the LoginPage class
const testData = JSON.parse(JSON.stringify(require('../tests/testCases.json'))); // Import the JSON data

test.beforeEach(async ({ page }) => {
	await page.goto(testData[0].url);
	
	// Perform login
	await new LoginPage(page).login(testData[0].username, testData[0].password);
});

testData.forEach(({ test_cases }) => {
	test_cases.forEach(({ testCaseTitle, expectedNavbarTitle, expectedTaskName, expectedTags, expectedColumn }) => {
		test(testCaseTitle, async ({ page }) => {
			const dashboardPage = new DashboardPage(page);

			// Navigate to correct navbar section
			await dashboardPage.clickNavbarButton(expectedNavbarTitle);

			// Verify the correct page is open
			// console.log(expectedNavbarTitle);
			// console.log(await dashboardPage.getCurrentPage());
			expect((await dashboardPage.getCurrentPage()).includes(expectedNavbarTitle)).toBeTruthy();

			// Verify the task is in the expected column
			//console.log(await dashboardPage.doesColumnContainTask(expectedColumn, taskName));
			expect(await dashboardPage.doesColumnContainTask(expectedColumn, expectedTaskName))
				.toBeTruthy();
			
			// Verify tags are present
			// console.log(expectedTags);
			// console.log(await dashboardPage.getTaskTags(expectedTaskName));
			for (const tag of expectedTags) {
				expect((await dashboardPage.getTaskTags(expectedTaskName)).includes(tag))
					.toBeTruthy();
			}
		});
	});
});
