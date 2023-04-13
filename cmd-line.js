// -- Dependencies -- \\
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require("fs");
const ytdl = require("ytdl-core");
const chalk = require("chalk");

readline.question(
  chalk.redBright("Please enter a youtube link for me to download!\n"),
  async link => {
    if (!ytdl.validateURL(link)) {
      console.log("Invalid URL");
      return;
    }
    let title = "";
    let details = await ytdl.getBasicInfo(link, {
      format: "mp4",
    });
    title = details.player_response.videoDetails.title.replace(
      /[^\x00-\x7F]/g,
      ""
    );
    readline.question("Video or Audio?\n", async type => {
      if (["video", "v", "audio", "a"].includes(type.toLowerCase())) {
        let filetype =
          type.toLowerCase() == "video" || type.toLowerCase() == "v"
            ? "mp4"
            : "mp3";
        await ytdl(link, {
          format: filetype,
          filter: filetype == "mp4" ? "videoandaudio" : "audioonly",
        }).pipe(fs.createWriteStream(`${title}.${filetype}`));
        console.log(
          "Video has been downloaded. Please check the " +
            chalk.blueBright(`${title}.${filetype}`) +
            " file for your video!"
        );
        console.log(chalk.redBright("Thanks for using my program! Have fun!"));
        readline.close();
      }
    });
  }
);
