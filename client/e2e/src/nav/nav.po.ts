import { browser, by, element } from 'protractor';

export class NavPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-nav .container .navbar-brand')).getText();
  }

  async setUser(user: any) {
    console.log(user.password);
    await element(by.name('loginusername')).sendKeys(user.username);
    await element(by.name('loginpassword')).sendKeys(user.password);
  }
  async clickLogin() {
    await element(by.id('loginBtn')).click();
  }
  async checkLogout() {
    if (await element(by.css('.dropdown-toggle')).isPresent()) {
      await element(by.css('.dropdown-toggle')).click();
      if (await element(by.id('logoutBtn')).isPresent()) {
        await element(by.id('logoutBtn')).click();
      }
    }
  }
  async clickLogout() {
    await element(by.id('logoutBtn')).click();
  }
  async checkLink(): Promise<string> {
    return await element(by.id('home-navbar')).getText();
  }
  async getError(): Promise<boolean> {
    return element(by.css('.toast-message')).isPresent();
  }
}
