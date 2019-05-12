const { app, Menu, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

function createMenu () {
  const menuTemplate = [{
    label: 'Key Box',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => { app.quit() } }
    ]
  }]

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
}

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
    mainWindow.setResizable(false)
    mainWindow.setMaximizable(false)
    mainWindow.setFullScreenable(false)
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
}

app.on('ready', () => {
  createWindow()
  createMenu()
})

app.on('window-all-closed', () => {
  app.quit()
})
