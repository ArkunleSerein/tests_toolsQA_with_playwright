import { test, expect, defineConfig } from '@playwright/test';
import { ElementsPage } from '../../pages/ElementsPage';

test.describe('Text Box Tests', () => {
    test.beforeEach(async ({ page }) => {
        
        const elementsPage = new ElementsPage(page);
        await elementsPage.navigateTo('https://demoqa.com/text-box');
        console.log('✅ Navigated to text box page');
    });

    test('Should submit valid data in the text box form', async ({ page }) => {
        const elementsPage = new ElementsPage(page);
        await elementsPage.fillTextBox('John Doe', 'john.doe@example.com', '123 Main St', '456 Elm St');
        console.log('✅ Filled text box with valid data');
        const result = await elementsPage.getSubmittedData();

        expect(result).toContain('John Doe');
        expect(result).toContain('john.doe@example.com');
        expect(result).toContain('123 Main St');
        expect(result).toContain('456 Elm St');
        console.log('✅ Valid data submission test passed');
    });

    test('Should not allow submission with invalid email', async ({ page }) => {
        const elementsPage = new ElementsPage(page);
        await elementsPage.fillTextBox('John Doe', 'invalid-email', '123 Main St', '456 Elm St');
        console.log('✅ Filled text box with invalid email');

        const emailFieldError = await page.$('.field-error');
        expect(emailFieldError).not.toBeNull();
        console.log('✅ Invalid email submission test passed');
    });

    test('Should handle empty form submission gracefully', async ({ page }) => {
        const elementsPage = new ElementsPage(page);
        await elementsPage.clickSubmitButton();
        console.log('✅ Clicked submit button with empty form');

        const result = await elementsPage.getSubmittedData();
        expect(result).toBe('');
        console.log('✅ Empty form submission test passed');
    });

    test('Should handle very long inputs without breaking the UI', async ({ page }) => {
        const longText = 'a'.repeat(1000); // Génère une chaîne de 1000 caractères.
        const elementsPage = new ElementsPage(page);

        await elementsPage.fillTextBox(longText, `${longText}@example.com`, longText, longText);
        console.log('✅ Filled text box with very long inputs');
        const result = await elementsPage.getSubmittedData();

        expect(result).toContain(longText);
        console.log('✅ Very long inputs test passed');
    });
});