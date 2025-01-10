import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../../pages/CheckBoxPage';

test.describe('Check Box Tests', () => {
    test.beforeEach(async ({ page }) => {
        const checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.navigateTo('https://demoqa.com/checkbox');
    });

    test('Should expand and collapse the tree structure', async ({ page }) => {
        const checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.expandAll();
        console.log('🌳 Tree expanded');

        await checkBoxPage.collapseAll();
        console.log('🌳 Tree collapsed');
        expect(await checkBoxPage.isTreeExpanded());
        console.log('✅ Test "expand and collapse the tree structure" passed');
    });

    test('Should select a single checkbox and validate the result', async ({ page }) => {
        const checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.expandAll();
        await checkBoxPage.selectCheckBox('Desktop');
        const result = await checkBoxPage.getSelectedResult();
        //console.log('Selected Result:', result);

        const normalizedResult = result.replace(/\s+/g, ' ').trim();
        //console.log('Normalized Result:', normalizedResult);

        const expected = 'You have selected : desktop notes commands';
        expect(normalizedResult).toContain(expected);
        console.log('✅ Test "select a single checkbox and validate the result" passed');
    });

    test('Should select multiple checkboxes and validate the results', async ({ page }) => {
        const checkBoxPage = new CheckBoxPage(page);
        await checkBoxPage.expandAll();
        await checkBoxPage.selectCheckBox('Desktop');
        await checkBoxPage.selectCheckBox('Documents');

        const result = await checkBoxPage.getSelectedResult();
        //console.log('Selected Result:', result);
        // Normalize the result string by removing extra spaces and newlines
        const normalizedResult = result.replace(/\s+/g, ' ').trim();
        //console.log('Normalized Result:', normalizedResult);

        const expected = 'You have selected : desktop notes commands documents workspace react angular veu office public private classified general';
        expect(normalizedResult).toContain(expected);
        console.log('✅ Test "select multiple checkboxes and validate the results" passed');
    });

    test('Should deselect a checkbox and validate the result', async ({ page }) => {
        const checkBoxPage = new CheckBoxPage(page);

        // Étendre toutes les sections
        await checkBoxPage.expandAll();

        // Sélectionner puis désélectionner une case
        await checkBoxPage.selectCheckBox('Desktop');
        await checkBoxPage.deselectCheckBox('Desktop');

        // Vérifier que le résultat est vide après la désélection
        const result = await checkBoxPage.getSelectedResult();
        console.log('Selected Result:', result);
        expect(result).toBe(''); // Le résultat attendu est une chaîne vide
        console.log('✅ Test "deselect a checkbox and validate the result" passed');
    });
});