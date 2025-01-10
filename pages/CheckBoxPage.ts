import { BasePage } from './BasePage';

export class CheckBoxPage extends BasePage {

    private resultSelector = '#result';
    private collapseSign = 'rct-icon-expand-close';

    private checkBoxSelector = (label: string) => `xpath=//span[contains(text(),"${label}")]/preceding-sibling::span[@class='rct-checkbox']`;

    async expandAll(): Promise<void> {
        await this.page.getByLabel('Expand all').click();
    }

    async collapseAll(): Promise<void> {
        await this.page.getByLabel('Collapse all').click();
    }

    async isTreeExpanded(): Promise<boolean> {
        return await this.page.locator(`.${this.collapseSign}`).isVisible();
    }


    async selectCheckBox(label: string): Promise<void> {
        await this.page.click(this.checkBoxSelector(label));
    }

    async deselectCheckBox(label: string): Promise<void> {
        const checkBox = this.page.locator(this.checkBoxSelector(label));

        // Attendre que l'état du checkbox soit changé avant de cliquer dessus
        await checkBox.waitFor();
        const isChecked = checkBox.locator('.rct-icon-check');
        if (isChecked ) {
            await checkBox.click();
        }
    }

    async getSelectedResult(): Promise<string> {
        const resultElement = this.page.locator(this.resultSelector);

        // Vérifier si l'élément est visible avant de récupérer le texte
        if (await resultElement.isVisible()) {
            return await resultElement.innerText();
        }

        // Retourner une chaîne vide si aucun résultat n'est visible
        return '';
    }

}
