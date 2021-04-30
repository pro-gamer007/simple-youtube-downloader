const { app, BrowserWindow, ipcMain, remote } = require('electron');
const { dialog } = remote;
const ytdl = require('ytdl-core');
const fs = require('fs');

function createWindow() {
	const win = new BrowserWindow({
		width: 1920 / 2,
		height: 1080 / 2,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	win.loadFile('index.html');
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

ipcMain.on('link', async(event, arg) => {
	const video = ytdl(arg)
	const { filePath } = await dialog.showSaveDialog({
	    defaultPath: 'output.mp4'
  	});
  	if (filePath) {
    		fs.writeFile(filePath, video);
  	}
});
