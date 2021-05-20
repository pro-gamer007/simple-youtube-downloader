const { app, BrowserWindow, ipcMain, dialog, Tray, Menu } = require('electron');
const ytdl = require('ytdl-core');
const fs = require('fs');

let win = null;
function createWindow() {
	win = new BrowserWindow({
		width: 1920 / 2,
		height: 1080 / 2,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		icon: __dirname + '/logo.png',
	});
	win.loadFile('index.html');
}

let tray = null;
app.whenReady().then(() => {
	createWindow();
	tray = new Tray('./tray.png');
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Close',
			click() { app.quit(); },
		},
		{
			label: 'Open',
			click() { win.show(); },
		},
	]);
	tray.setToolTip('Youtube Downloader.');
	tray.setContextMenu(contextMenu);
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

ipcMain.on('link', async (event, arg) => {
	const isValid = ytdl.validateURL(arg);
	if (!isValid) {
		const { filePath } = await dialog.showSaveDialog({
			defaultPath: 'not-a-rickroll.mp4',
		});
		if (filePath) {
			ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ').pipe(fs.createWriteStream(filePath));
		}
	}
	else {
		const { filePath } = await dialog.showSaveDialog({
			defaultPath: 'output.mp4',
		});
		if (filePath) {
			ytdl(arg).pipe(fs.createWriteStream(filePath));
		}
	}
});
