const { remote } = require('webdriverio');
const login_flow = require('./login_flow');
const add_to_cart = require('./add_to_cart');

const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Nexus 6 API 33',
    'appium:platformVersion': '13.0',
    'appium:appPackage': 'mm.com.citymall.preprod',
    'appium:appActivity': 'com.shop.citymall.MainActivity'
};
capabilities.setCa
const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
};

async function runTest() {
    const driver = await remote(wdOpts);

    try {
        await login_flow(driver);
        await driver.pause(3000);

        const home_menu = await driver.$("~Home\nTab 1 of 5");
        await home_menu.click();

        await driver.pause(3000);

        const cart_icon = await driver.$('//android.view.View[@index="1"]');
        await cart_icon.click();
        await driver.pause(3000);


        // Perform the scroll action
        await driver.execute('mobile: scroll', {
            strategy: 'accessibility id',
            selector: 'PROCEED TO CHECKOUT',
            direction: 'down'
        });
        await driver.pause(5000); // Optional pause for stability

        // Re-find the element after scrolling
        const check_out_btn = await driver.$('//android.widget.Button[@content-desc="PROCEED TO CHECKOUT"]');
        await check_out_btn.click();

        await driver.pause(3000);

        const shipping_address_rdo = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.View\").instance(9)");
        await shipping_address_rdo.click();
        await driver.pause(3000);

        const next_btn = await driver.$("accessibility id:NEXT");
        await next_btn.click();
        await driver.pause(3000);

        const proceed_btn = await driver.$("accessibility id:PROCEED");
        await proceed_btn.click();
        await driver.pause(3000);

        const deli_slot_option = await driver.$("accessibility id:4PM-7PM");
        await deli_slot_option.click();
        await driver.pause(3000);

        const deli_slot_btn = await driver.$("accessibility id:NEXT");
        await deli_slot_btn.click();
        await driver.pause(3000);

        const COD_option = await driver.$('//android.view.View[@index="1"]');
        await COD_option.click();
        await driver.pause(3000);

        const term_condition_checkbox = await driver.$("class name:android.widget.CheckBox");
        await term_condition_checkbox.click();
        await driver.pause(3000);

        await driver.execute('mobile: scroll', {
            strategy: 'accessibility id',
            selector: 'PAY AND CONFIRM ORDER',
            direction: 'down'
        });
        await driver.pause(3000);

        const confirm_btn = await driver.$('//*[@content-desc="PAY AND CONFIRM ORDER"]');
        await confirm_btn.click();

        // await driver.execute('mobile: scroll', {
        //     strategy: 'accessibility id',
        //     selector: 'CONTINUE SHOPPING',
        //     direction: 'down'
        // });
        await driver.pause(3000);

        const continue_btn = await driver.$("accessibility id:CONTINUE SHOPPING");
        await continue_btn.click();
        await driver.pause(3000);

        console.log('success');


    } catch (error) {
        console.error('Error occurred:', error.message);
        console.error('Error stack:', error.stack);
    }
    await driver.deleteSession();
}

runTest();