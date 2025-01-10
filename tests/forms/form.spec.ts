import { test, expect } from '@playwright/test';
import { FormPage } from '../../pages/FormPage';


test.describe('Form Page Tests', () => {
    

    test.beforeEach(async ({ page }) => {
        // Naviguer vers la page
        const formPage = new FormPage(page);
        await formPage.navigateTo('https://demoqa.com/automation-practice-form');
    });
    // Naviguer vers la page
    
    
    test('Should fill the form and submit successfully', async ({ page }) => {
        const formPage = new FormPage(page);
        // Remplir le formulaire
        await formPage.fillFirstName('John');
        await formPage.fillLastName('Doe');
        await formPage.fillEmail('john.doe@example.com');
        await formPage.selectGender('1'); // 1 pour Male
        await formPage.fillMobileNumber('1234567890');
        await formPage.selectDateOfBirth('01/01/2000');
        await formPage.addSubject('Math');
        await formPage.selectHobby('1'); // 1 pour Sports
        await formPage.uploadFile('path/to/image.jpg');
        await formPage.fillAddress('123 Test Street');
        await formPage.selectStateAndCity('NCR', 'Delhi');

        // Soumettre le formulaire
        await formPage.submitForm();

        // Vérifier que le formulaire a été soumis avec succès
        const modalContent = await formPage.getModalContent();
        expect(modalContent).toContain('Thanks for submitting the form');
    });

    test('Should validate required fields', async ({ page }) => {
        const formPage = new FormPage(page);

        // Naviguer vers la page
        await page.goto('/automation-practice-form');

        // Soumettre sans remplir le formulaire
        await formPage.submitForm();

        // Vérifier qu'une erreur est affichée pour les champs requis
        const firstNameError = page.locator('#firstName:invalid');
        const emailError = page.locator('#userEmail:invalid');
        const mobileError = page.locator('#userNumber:invalid');

        await expect(firstNameError).toBeVisible();
        await expect(emailError).toBeVisible();
        await expect(mobileError).toBeVisible();
    });
});
