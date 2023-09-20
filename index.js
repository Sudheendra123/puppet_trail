const { app, BrowserWindow, ipcMain } = require("electron");
const puppeteer = require("puppeteer");
const path = require("path");

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true, // Enable context isolation
            preload: path.join(__dirname, "preload.js"),
            devTools: true,
        },
    });
    mainWindow.loadFile("index.html");
    ipcMain.on("navigate", async (event, url) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        var copyText = "";
        var imp = "";
        var result;
        var newResult = [];
        var value;
        var t = []
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


        const attributeCount = await page.evaluate((array) => {
            const lengths = [];
            for (let i = 0; i < array.length; i++) {
                // Use document.querySelectorAll to find elements with the attribute
                const elements = document.querySelectorAll('button[data-display-name="' + array[i] + '"]');
                // console.log(elements.length)
                lengths.push(elements.length);

            }
            return lengths;


        }, vulnerablities);

        console.log("attributeCount", attributeCount, "vulnerablities", vulnerablities)

        const hhh = await page.evaluate( (array, array2) => {
            const newArr = []; // Initialize newArr
          
            for (let i = 0; i < array.length; i++) { // i length 6
              for (let j = 0; j < array[i]; j++) { //first iteration 13 i value here is 0
                // Use the 'page' object passed as an argument
                 document.querySelector('button[data-display-name="' + array2[i] + '"]').click();
          
                // Perform some action to copy text to clipboard
                const a = document.getElementById("modal-text");
                a.select();
                document.execCommand("Copy");
          
                // Push the copied value into newArr
                newArr.push(a.value)
              }
            }
          
            return newArr; // Return newArr
          }, attributeCount, vulnerablities);
          
          console.log(hhh); // This will print the value of newArr
       
          
          
          
          
          
    })
})

