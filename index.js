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

    // Fill in the form
    await page.waitForSelector('#first_name_input');
    await page.type('#first_name_input', 'test');

    await page.waitForSelector('#email_address_strong');
    await page.type('#email_address_strong', 'test' + 'gmail.com');

    await page.waitForSelector('#password_strong_input');
    await page.type('#password_strong_input', 'password.');
    
    // Click checkbox for terms and conditions
    await page.click('#signup-terms-checkbox');

    //await browser.close();
})();

