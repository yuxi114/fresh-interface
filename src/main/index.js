'use strict'

import {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  if (process.platform === 'darwin') {
    const template = [{
      label: 'Application',
      submenu: [{
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function () {
          app.quit()
        }
      }]
    },
    {
      label: 'Edit',
      submenu: [{
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      }
      ]
    }
    ]
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  } else {
    Menu.setApplicationMenu(null)
  }
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
const { URL } = require('url')
const axios = require('axios')
const domain = 'http://jelly.jd.com'
let num = 1
async function freshInterface (url, cookie) {
  const pathname = new URL(url).pathname
  const id = new URL(url).searchParams.get('id')
  const preview = new URL(url).searchParams.get('preview') ? {
    preview: new URL(url).searchParams.get('preview')
  } : ''
  await axios.get(`${domain}${pathname}`, {
    params: {
      id,
      ...preview
    },
    headers: {
      Cookie: `${cookie}`
    }
  })
    .then(res => {
      console.log(num++, 'num')
    })
    .catch(err => {
      console.log(err, 'err')
    })
}
ipcMain.on('fresh-fnterface', (event, url, cookie) => {
  freshInterface(url, cookie)
})
