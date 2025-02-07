// Script Name: {katalon}

const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.launch(
        {
            executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
            headless: false,
            defaultViewport: { width: 1920, height: 1080 },
            args: ['--start-maximized']
        });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(`https://www.bitdefender.com/en-us/consumer/fragments/trial`, { waitUntil: 'networkidle0' });

    // Select the free trial button
    await page.click('a[title="Start your free trial"]');
    // Wait for the page to load
    await page.waitForNavigation();

    await browser.close();
})();

