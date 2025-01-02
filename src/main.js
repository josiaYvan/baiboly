const { app, BrowserWindow, ipcMain } = require("electron");
const axios = require("axios");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 150,
    width: 200,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.loadFile(path.join(__dirname, "view", "index.html"),);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function fetchAuditeurs() {
  axios
    .get(
      "https://emiaradio:5a7db0eY@api.infomaniak.com/1/radios/stats/listeners?mountpoint=/emiaradio-48.aac"
    )
    .then((response) => {
      const auditeurs = response.data.data;
      mainWindow.webContents.send("updateAuditeurs", auditeurs);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données : ", error);
    });
}

setInterval(fetchAuditeurs, 3000);
