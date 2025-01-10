import { BasePage } from './BasePage';

export class ElementsPage extends BasePage {
    private userNameSelector = '#userName';
    private userEmailSelector = '#userEmail';
    private currentAddressSelector = '#currentAddress';
    private permanentAddressSelector = '#permanentAddress';
    private submitButtonSelector = '#submit';
    private outputSelector = '#output';
    private emailFieldErrorSelector = '.error-message'; // Exemple de sélecteur pour message d'erreur.

    async fillTextBox(name: string, email: string, currentAddress: string, permanentAddress: string): Promise<void> {
        await this.page.fill(this.userNameSelector, name);
        await this.page.fill(this.userEmailSelector, email);
        await this.page.fill(this.currentAddressSelector, currentAddress);
        await this.page.fill(this.permanentAddressSelector, permanentAddress);
        await this.page.click(this.submitButtonSelector);
    }

    async clickSubmitButton(): Promise<void> {
        await this.page.click(this.submitButtonSelector);
    }

    async getSubmittedData(): Promise<string> {
        return await this.page.innerText(this.outputSelector);
    }

    async getEmailFieldError(): Promise<string> {
        return await this.page.innerText(this.emailFieldErrorSelector);
    }

    
}
