const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "file:///C:/Users/sudhe/Downloads/check.html",
    { waitUntil: "load" }
  );

  var text = await page.evaluate(() => {
    return Array.from(
        document.querySelectorAll('button[class="copybutton"]'),
      (element) => element.textContent
    );
  });
  console.log(text.length)

 var jjj = await page.evaluate(() => {
    var copyText = "";
    var imp = "";
    for (let i = 0; i < 10; i++) {
      copyText = document.querySelector("#modal-text");
      copyText.select();
      document.execCommand("Copy");
      imp += copyText.value;
    }
     return imp
  });

  console.log("jjjjj", jjj)  
  await page.screenshot({ path: "example.png" });
})();
