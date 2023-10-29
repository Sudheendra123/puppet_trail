const puppeteer = require('puppeteer');

async function extractData(event, url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    var vulnerablities = await page.evaluate(() => {
      var nodes = [...document.getElementsByClassName(" vulnerable")].map(
        (elem) => elem.textContent
      );
      var classNameArray = [];
      for (let i = 0; i < nodes.length; i++) {
        classNameArray.push(nodes[i].split("cpe")[0]);
      }
      return classNameArray;
    });

    const string = await page.evaluate((array) => {
      const newArr = [];
      for (const selector of array) {
        const buttonElements = document.querySelectorAll(
          'button[data-display-name="' + selector + '"]'
        );

        buttonElements.forEach((button) => {
          button.click();
          const a = document.getElementById("modal-text");
          a.select();
          document.execCommand("Copy");
          newArr.push(a.value.replaceAll("\n", ""));
        });
      }
      return newArr;
    }, vulnerablities);
    console.log(string);
    await browser.close();

    return string;

}

module.exports = { extractData };