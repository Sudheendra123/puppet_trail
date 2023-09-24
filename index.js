const { app, BrowserWindow, ipcMain } = require("electron");
const puppeteer = require("puppeteer");
const path = require("path");

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
            devTools: true,
        },
    });
   
    mainWindow.loadFile("index.html");
    ipcMain.on("navigate", async (event, url) => {
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
        setTimeout(() => {
            mainWindow.webContents.send('res', 'Data sent from Puppeteer');
          }, 2000); 
       
    })

    // mainWindow.webContents.once('dom-ready', () => {
    //     // Wait for the web page to be fully loaded
    //     // const button = mainWindow.webContents.executeJavaScript('document.querySelector("#your-button-id")');
    //     const textarea = mainWindow.webContents.executeJavaScript('document.querySelector("#res")');
    //     if (textarea) {
    //         // Copy the button's value to the textarea
    //         textarea.value = string;
    //       }

    // })
    

});
    
   
