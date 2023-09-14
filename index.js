const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "file:///C:/Users/sudhe/Downloads/ASSCD_cwt_automationoptimisation_2.0.0-beta20230910150115-dependency-check.html",
    { waitUntil: "load" }
  );
    var copyText = "";
  var imp = "";
  var jjj = await page.evaluate(() => {
    var nodes = [...document.getElementsByClassName(" vulnerable")].map(
      (elem) => elem.textContent
    );

    var classNameArray = [];
    for (let i = 0; i < nodes.length; i++) {
      classNameArray.push(nodes[i].split("cpe")[0]);
    }

    // var copyText = "";
    // var imp = "";
    // for (let i = 0; i < classNameArray.length; i++) {
    //   page.click('button[data-display-name="' + classNameArray[i] + '"]');
     
    //   var result = document.getElementById("modal-text");
    //   copyText +=  page.evaluate(el => el.textContent, result)
    //   // input.select();
    //   // imp += document.execCommand("Copy");
    // }
    return classNameArray;
  });

  var result;
  var value;

  for (let i = 0; i < jjj.length; i++) {
    await page.click('button[data-display-name="' + jjj[i] + '"]');
    await page.screenshot({ path: "example.png" });
     result = page.evaluate(()=>{
      return document.getElementById("modal-text");
    })
     value = await result[0].evaluate(el => el.textContent, result)
    // copyText +=  await page.evaluate(el => el.textContent, result)
    // input.select();
    // imp += document.execCommand("Copy");
  }
  console.log('result', value)

  



  console.log("jjjjj", jjj);
  // console.log("wkjhkjhka",copyText)
  // await page.screenshot({ path: "example.png" });
})();
