const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 415,
    height: 750,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.argv[2] === 'dev') {
    mainWindow.loadURL('http://localhost:8080')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist', 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
}

app.on('ready', createWindow)
