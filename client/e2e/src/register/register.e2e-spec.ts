import { browser, by, element, logging } from 'protractor';
import { RegisterPage } from './register.po';

describe('SCI Register Page', () => {
  let page: RegisterPage;

  beforeEach(async () => {
    page = new RegisterPage();
    await page.navigateTo();
  });

  it('it should show title Sign up', async () => {
    expect(await page.getPageTitleText()).toEqual('Sign up');
  });

  it('when register with no username, should show error', async () => {
    await page.setNewUser({
      username: '',
      password: 'password',
    });
    browser.sleep(5000);
    await page.clickAddUser();

    expect(await page.getError()).toBe(true);
  });

  it('when register with no password, should show error', async () => {
    await page.setNewUser({
      username: 'testuser',
      password: '',
    });
    browser.sleep(5000);
    await page.clickAddUser();

    expect(await page.getError()).toBe(true);
  });

  it('when register with an existing username, should show error', async () => {
    await page.setNewUser({
      username: 'admin',
      password: 'password',
    });
    browser.sleep(5000);
    await page.clickAddUser();
    expect(await page.getError()).toBe(true);
  });

  it('when register with correct username and password, should not show error', async () => {
    await page.setNewUser({
      username: 'user123',
      password: 'password',
    });
    await page.clickAddUser();
    expect(await page.getError()).toBe(false);
  });
});
