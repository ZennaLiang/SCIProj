import { browser, by, element, logging } from 'protractor';
import { NavPage } from './nav.po';

describe('Navbar', () => {
  let page: NavPage;

  beforeEach(async () => {
    page = new NavPage();
    await page.navigateTo();
  });
  afterEach(async () => {});

  it('it should show SCI App', async () => {
    expect(await page.getTitleText()).toEqual('SCI App');
  });

  it('when login with correct username and password, there should not be errors', async () => {
    await page.setUser({
      username: 'user',
      password: 'password',
    });

    await page.clickLogin();
    browser.sleep(3000);
    expect(await page.getError()).toBe(false);

    expect(browser.getCurrentUrl()).toContain('/main');
    await page.checkLogout();
  });

  it('when login with wrong password, show error', async () => {
    await page.navigateTo();
    await page.setUser({
      username: 'user',
      password: 'a',
    });
    browser.sleep(5000);
    await page.clickLogin();

    expect(await page.getError()).toBe(true);
  });

  it('when login with no username, shoud show error', async () => {
    await page.setUser({
      username: '',
      password: 'password',
    });
    browser.sleep(5000);
    await page.clickLogin();

    expect(await page.getError()).toBe(true);
  });
});
