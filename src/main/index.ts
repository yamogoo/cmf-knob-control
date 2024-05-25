import { app, shell, BrowserWindow, ipcMain, screen, Menu, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import icon from '../../resources/icon.png'

import { defineLogger } from './utils/logger'
import { createControlBoard } from './controlBoard'

import { MenuHelper } from './menuHelper'

import { config } from 'dotenv'
config()

const logger = defineLogger(app.name)

const controlBoard = createControlBoard(logger)

let mainWindow: BrowserWindow

function createWindow(): void {
  const appIcon = nativeImage.createFromPath('../../resources/icon.png')
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon: appIcon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    },
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 60
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

const getConfig = (): void => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { size, touchSupport } = primaryDisplay

  const version = app.getVersion()

  // Overwrite app name:
  app.setName('CMF: Home Control')
  const name = app.getName()
  const locale = app.getLocale()
  const systemLocale = app.getSystemLocale()
  const preferedLanguages = app.getPreferredSystemLanguages()

  logger.logInfo('config', {
    hardware: { size, touchSupport },
    app: { version, name, locale, systemLocale, preferedLanguages }
  })

  // Login on start
  // const loginSettings: app.getLoginItemSettings()
  // app.setLoginItemSettings({ openAtLogin: true })
}

app.whenReady().then(() => {
  // Get Config (Device and App)
  getConfig()

  // Starting Control Board
  controlBoard.start()

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  // Menu
  const menuHelper = new MenuHelper(mainWindow)
  Menu.setApplicationMenu(menuHelper.mainMenu)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', () => {
  onQuite(app)
})

const onQuite = (app: Electron.App) => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
