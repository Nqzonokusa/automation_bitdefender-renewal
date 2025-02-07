const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch(
        {
            executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
            headless: false,
            defaultViewport: { width: 1920, height: 1080 },
            args: ['--start-maximized']
        });
    const page = await browser.newPage();
    const firstName = generateRandomName(); // Make firstName a fixed value
    const email = firstName + '@gmail.com';
    const password = 'Password.';

    // Navigate the page to a URL
    await page.goto(`https://www.bitdefender.com/en-us/consumer/fragments/trial`, { waitUntil: 'networkidle0' });

    // Select the free trial button
    await page.click('a[title="Start your free trial"]');
    // Wait for the page to load
    await page.waitForNavigation();

    // Fill in the form
    await page.waitForSelector('#first_name_input');
    await page.type('#first_name_input', firstName + ' ' + generateRandomName());

    await page.waitForSelector('#email_address_strong');
    await page.type('#email_address_strong', email);

    await page.waitForSelector('#password_strong_input');
    await page.type('#password_strong_input', password);

    // Click checkbox for terms and conditions
    await page.waitForSelector('#signup-terms-checkbox:enabled'); // Wait for the checkbox to be enabled
    page.$eval(`#signup-terms-checkbox`, element => element.click());

    // Click the submit button
    await page.click('#submit-create');

    // Save the email and password to a file
    saveToFile(email, password);

    // Wait for the page to load
    await page.waitForNavigation({ waitUntil: 'load' });

    await browser.close();

})();

function generateRandomName() {
    const num = 8;
    let res = '';
    for (let i = 0; i < num; i++) {
        const random = Math.floor(Math.random() * 26);
        res += String.fromCharCode(97 + random);
    };
    return res;
}

function saveToFile(email, password) {
    fs.appendFile('details.txt',
        '\n\nEmail: ' + email +
        '\nPassword: ' + password, (err) => {
            if (err) throw err;
            console.log('Data has been written to the file');
        });
}