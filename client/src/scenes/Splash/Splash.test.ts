import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { preview } from 'vite';
import type { PreviewServer } from 'vite';
import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';

describe('splash page', async () => {
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

  test('should display "COMING SOON" text on page', async () => {
    await page.goto('http://localhost:3333');
    const header2 = (await page.$('h2'))!;
    expect(header2).toBeDefined();

    let text = await page.evaluate((h2) => h2.textContent, header2);
    expect(text).toBe('COMING SOON');
  });
});
