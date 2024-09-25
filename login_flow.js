async function login_flow(driver) {

    try {
        const option = await driver.$('//*[@content-desc="English"]');
        await option.click();

        const nextButton = await driver.$('//*[@content-desc="NEXT"]');
        await nextButton.click();
        await driver.pause(2000);

        const allow_btn = await driver.$("id:com.android.permissioncontroller:id/permission_allow_button");
        await allow_btn.click();

        await driver.pause(3000);

        //const close_btn = await driver.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]");

        const close_btn = await driver.$('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]');
        await close_btn.click();

        const account_tab = await driver.$("~Account\nTab 5 of 5");
        await account_tab.click();

        const login_register = await driver.$("~Login or Register");
        await login_register.click();

        const mobile_radio = await driver.$("//android.view.View[@content-desc=\"Mobile Number\"]/android.view.View");
        await mobile_radio.click();

        const mobile_text = await driver.$("-android uiautomator:new UiSelector().className(\"android.widget.EditText\").instance(0)");
        await mobile_text.click();

        // const mobile_text = await driver.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.widget.EditText[1]");
        // await mobile_text.click();
        await mobile_text.setValue("9453112931");

        const password_text = await driver.$("-android uiautomator:new UiSelector().className(\"android.widget.EditText\").instance(1)");
        await password_text.click();
        await password_text.setValue("Abcd1234");

        driver.hideKeyboard();

        const btn_login = await driver.$("accessibility id:LOG IN");
        await btn_login.click();
        await driver.pause(3000);

        return driver;

    } catch (error) {
        console.error('Error occurred:', error.message);
        console.error('Error stack:', error.stack);
    }

}

module.exports = login_flow;