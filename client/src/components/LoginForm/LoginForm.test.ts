import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { preview } from 'vite';
import type { PreviewServer } from 'vite';
import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';

describe('LoginForm', () => {
  let server: PreviewServer;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    server = await preview({ preview: { port: 3333 } });
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()));
    });
  });

  test('shows a success message after submitting a form', async () => {
    await page.goto('http://localhost:3333/login');
    await page.waitForSelector('form');

    await expect(page).toFillForm('form', {
      username: 'kilo1',
      password: 'password',
    });
    await expect(page).toClick('button', { text: 'Login' });
    // await expect(page).toMatch('You are now signed in.')
  });

  test('shows an error message if authentication fails', async () => {
    await page.goto('http://localhost:3333/login');
    await page.waitForSelector('form');

    await expect(page).toFillForm('form', {
      username: 'kilo2',
      password: 'password123',
    });

    await expect(page).toClick('button', { text: 'Login' });
    await expect(page).toMatch('Please enter a correct username/password.');
  });
});
