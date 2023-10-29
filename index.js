const { app, BrowserWindow, ipcMain } = require("electron");
const puppeteer = require("puppeteer");
const puppeteerLogic = require("./puppeteerLogic")
const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: true,
    },
  });

  mainWindow.loadFile("index.html");
  ipcMain.on("fetch-data", async (event, url) => {
    try{
    const data = await puppeteerLogic.extractData(event, url);
    console.log("DATA", data)
    event.reply('extracted-data', data);
    }
    catch(e){
      alert('Error fetching data. Please try again.')
        console.log("ERROR", e)
    }
  });

  ipcMain.on('copy-to-clipboard', (event, data) => {
    // Copy data to the clipboard
    const { clipboard } = require('electron');
    clipboard.writeText(data);
  });


});
