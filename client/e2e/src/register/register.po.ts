import { browser, by, element } from 'protractor';

export class RegisterPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }
  async clickRegister() {
    element(by.id('registerBtn')).click();
  }
  async setNewUser(user: any) {
    await element(by.name('signupusername')).sendKeys(user.username);
    await element(by.name('signuppassword')).sendKeys(user.password);
  }

  async clickAddUser() {
    await element(by.id('registerUserBtn')).click();
  }

  async getPageTitleText(): Promise<string> {
    return element(by.css('app-register h2')).getText();
  }

  async getError(): Promise<boolean> {
    return element(by.css('.toast-message')).isPresent();
  }
}
