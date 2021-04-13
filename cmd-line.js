// -- Dependencies -- \\
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');
const ytdl = require('ytdl-core');
const chalk = require('chalk');

readline.question(chalk.redBright('Please enter a youtube link for me to download!\n'), link => {
	ytdl(link).pipe(fs.createWriteStream('output.mp4'));
	console.log('Video has been downloaded. Please check the ' + chalk.blueBright('output.mp4 ') + 'file for your video!');
	console.log(chalk.redBright('Thanks for using my program! Have fun!'));
	readline.close();
});