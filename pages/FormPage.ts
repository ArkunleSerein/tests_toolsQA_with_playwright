import { Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormPage extends BasePage {

    // Locators pour les champs et boutons

    // Méthodes pour interagir avec les champs
    async fillFirstName(firstName: string) {
        await this.firstNameField.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email);
    }

    async selectGender(gender: string) {
        await this.genderRadio(gender).click();
    }

    async fillMobileNumber(mobile: string) {
        await this.mobileField.fill(mobile);
    }

    async selectDateOfBirth(date: string) {
        await this.dateOfBirthInput.fill(date); // Format : 'MM/DD/YYYY'
    }

    async addSubject(subject: string) {
        await this.subjectInput.fill(subject);
        await this.page.keyboard.press('Enter');
    }

    async selectHobby(hobby: string) {
        await this.hobbiesCheckbox(hobby).click();
    }

    async uploadFile(filePath: string) {
        await this.uploadPicture.setInputFiles(filePath);
    }

    async fillAddress(address: string) {
        await this.currentAddress.fill(address);
    }

    async selectStateAndCity(state: string, city: string) {
        await this.stateDropdown.fill(state);
        await this.page.keyboard.press('Enter');
        await this.cityDropdown.fill(city);
        await this.page.keyboard.press('Enter');
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async getModalContent(): Promise<string> {
        return this.modalContent.textContent();
    }
}
