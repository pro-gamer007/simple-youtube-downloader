const { app, BrowserWindow, ipcMain } = require('electron');
const ytdl = require('ytdl-core');
const fs = require('fs');

function createWindow() {
	const win = new BrowserWindow({
		width: 1920 / 2,
		height: 1080 / 2,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
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

ipcMain.on('link', (event, arg) => {
	ytdl(arg).pipe(fs.createWriteStream('output.mp4'));
});