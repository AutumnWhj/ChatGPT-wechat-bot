import fs from 'fs';
import puppeteer from 'puppeteer-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
puppeteer.use(stealth());

const sleep = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export async function getCookies() {
  try {
    const browser = await puppeteer.launch({
      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: false,
      args: ['--proxy-server=127.0.0.1:51837'],
      ignoreHTTPSErrors: true,
    });
    const page = (await browser.pages())[0];
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    );
    console.log(11111111);
    await page.goto('https://chat.openai.com');
    await page.waitForSelector('#__next .btn-primary');
    // wait for networkidle
    await sleep(5 * 1000);
    await page.click('#__next .btn-primary');

    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    console.log(2222);
    await page.type('#username', '');
    await sleep(1 * 1000);
    await page.click('button[type="submit"]');

    await page.waitForSelector('#password');

    await page.type('#password', '');
    await page.click('button[type="submit"]');
    console.log(333);
    // await sleep(1 * 1000);
    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });
    console.log(4444);
    const cookies = await page.cookies();
    // fs.writeFileSync('cookies.json', JSON.stringify(cookies));

    // await sleep(60 * 1000);
    await browser.close();
    return cookies;
  } catch (error) {
    console.log('error: ', error);
  }
}
