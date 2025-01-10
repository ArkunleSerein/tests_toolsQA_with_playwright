import { Page, expect, type Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly mobileField: Locator;
    readonly genderRadio: (label: string) => Locator;
    readonly dateOfBirthInput: Locator;
    readonly subjectInput: Locator;
    readonly hobbiesCheckbox: (label: string) => Locator;
    readonly uploadPicture: Locator;
    readonly currentAddress: Locator;
    readonly stateDropdown: Locator;
    readonly cityDropdown: Locator;
    readonly submitButton: Locator;
    readonly modalContent: Locator;

    constructor(page: Page) {
        this.page = page;
        this.page = page;
        this.firstNameField = this.page.locator('#firstName');
        this.lastNameField = this.page.locator('#lastName');
        this.emailField = this.page.locator('#userEmail');
        this.mobileField = this.page.locator('#userNumber');
        this.genderRadio = (label: string) =>
            this.page.locator(`label[for="gender-radio-${label}"]`);
        this.dateOfBirthInput = this.page.locator('#dateOfBirthInput');
        this.subjectInput = this.page.locator('.subjects-auto-complete__input input');
        this.hobbiesCheckbox = (label: string) =>
            this.page.locator(`label[for="hobbies-checkbox-${label}"]`);
        this.uploadPicture = this.page.locator('#uploadPicture');
        this.currentAddress = this.page.locator('#currentAddress');
        this.stateDropdown = this.page.locator('#react-select-3-input');
        this.cityDropdown = this.page.locator('#react-select-4-input');
        this.submitButton = this.page.locator('#submit');
        this.modalContent = this.page.locator('.modal-content');
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}
