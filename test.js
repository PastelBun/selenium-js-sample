const {Builder, By, Key, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

// Create Firefox Options
let options = new firefox.Options();

// Set the correct Firefox binary path (Snap or system-wide)
options.setBinary('/snap/firefox/4173/usr/lib/firefox/firefox');

async function example() {
    let driver;
    try {
        driver = await new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();
        
        // Navigate to DuckDuckGo
        await driver.get('https://www.duckduckgo.com');

        // Enter text "WebDriver" and perform keyboard action "Enter"
        await driver.findElement(By.name('q')).sendKeys('WebDriver', Key.ENTER);

        // DuckDuckGo's first search result
        let firstResult = await driver.wait(until.elementLocated(By.css('h2 a')), 10000);

        console.log(await firstResult.getAttribute('textContent'));
    }
    finally {
        if (driver) {
            await driver.quit();
        }
    }
}

example();
