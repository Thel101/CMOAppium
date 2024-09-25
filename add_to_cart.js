async function add_to_cart(driver) {
   
    try {
      
        await driver.pause(3000);

        const home_menu = await driver.$("~Categories\nTab 2 of 5");
        await home_menu.click();

        await driver.pause(3000);

        const grocery = await driver.$("~Grocery & Staple Food");
        await grocery.click();
        await driver.pause(3000);

        const rice_category = await driver.$("~Rice");
        await rice_category.click();
        await driver.pause(3000);

        const view_all_btn = await driver.$('(//android.view.View[@content-desc="View all "])[2]');
        await view_all_btn.click();
        await driver.pause(3000);

        const product = await driver.$("~Best Seller\nAyeyar Phyarpon Paw San Hmwe Rice 2kg\n6,450 Ks\nSold by CMHL");
        await product.click();
        await driver.pause(3000);

        const add_to_cart_btn = await driver.$("accessibility id:ADD TO CART");
        await add_to_cart_btn.click();
        await driver.pause(3000);

        console.log('success');

        const cart_icon = await driver.$('//android.view.View[@index="2"]');
        await cart_icon.click();
        await driver.pause(3000);

        // const check_out_btn = await driver.$("~PROCEED TO CHECKOUT");// Replace 'selector' with the actual selector for your element


        // await driver.execute('mobile: scroll', { direction: 'down' });

        // Perform the scroll action
        await driver.execute('mobile: scroll', {
            strategy: 'accessibility id',
            selector: 'PROCEED TO CHECKOUT',
            direction: 'down'
        });
        await driver.pause(5000); // Optional pause for stability

        // Re-find the element after scrolling
        const check_out_btn = await driver.$('//android.widget.Button[@content-desc="PROCEED TO CHECKOUT"]');
        console.log('success');
        // // Wait until the element is displayed
        // await driver.waitUntil(async () => (await check_out_btn.isDisplayed()), {
        //     timeout: 5000,
        //     timeoutMsg: 'Element not visible after scrolling'
        // });

        // Click the element
        await check_out_btn.click();

        await driver.pause(3000);

        const shipping_address_rdo = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.View\").instance(9)");
        await shipping_address_rdo.click();
        await driver.pause(3000);

        const next_btn = await driver.$("accessibility id:NEXT");
        await next_btn.click();
        await driver.pause(3000);

        console.log('success');
        


    } catch (error) {
        console.error('Error occurred:', error.message);
        console.error('Error stack:', error.stack);
    }
    await driver.deleteSession();
}

runTest();