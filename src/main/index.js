'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { videoSupport } from './ffmpeg-helper'

import { Express } from './express'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let httpServer
let express
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
	
	

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 620,
    useContentSize: true,
    width: 960,
		frame: false,
		thickFrame :true,
		autoHideMenuBar:true, 
		opcity:0,
		titleBarStyle:'hiddenInset',
		maximizable:false //Bo
  })
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
	
	mainWindow.on('enter-full-screen', function(){
		console.log("enter")
	})
	
	mainWindow.on('leave-full-screen', function(){
		console.log('leave')
	})

	ipcMain.on('fileDrop', (event, arg) => {
		videoSupport(arg).then((checkResult) => {
			 express.videoSourceInfo = {videoSourcePath:arg, checkResult: checkResult};
			 console.log(express)
			 mainWindow.webContents.send('duration', checkResult.duration);
		}).catch(err => {
			 mainWindow.webContents.send('error', err);
		})
	})
	
	
	
	express = new Express()
	express.createServer()
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
