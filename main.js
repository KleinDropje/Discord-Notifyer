const Discord = require("discord.js");

const bot = new Discord.Client();

const ping = require("minecraft-server-util");

const token = "add your token here";

const prefix = "!";

bot.on("ready", () => {
  console.log("Bot has come online.");
});

bot.on("message", (message) => {
  let args = message.content.split(" ");

  //Create Memory
  if (message.content.startsWith(prefix + "cn")) {
    message.channel
      .send(`What would you like to call your appointment ?`)
      .then(() => {
        message.channel
          .awaitMessages((m) => m.author.id == message.author.id, {
            max: 1,
            time: 20000,
          })
          .then((message) => {
            message = message.first();
            const Name = message.content;
            message.channel
              .send(`When would you like us to notify you (in minutes)?`)
              .then(() => {
                message.channel
                  .awaitMessages((m) => m.author.id == message.author.id, {
                    max: 1,
                    time: 20000,
                  })
                  .then((message) => {
                    message = message.first();
                    const Time = message.content;
                    if (!Number(message.content)) {
                      message.channel.send("Please insert a number.");
                      return;
                    }
                    const Embed = new Discord.MessageEmbed()
                      .setColor("#C86A56")
                      .setTitle(Name)
                      .setAuthor("You have a new notification!")
                      .setDescription(`<@${message.author.id}>`)
                      .setTimestamp()
                      .setFooter("Notifyer");

                      message.channel.send("Your Notification has been made...");
                      setTimeout(() => {
                        message.author.send(Embed);
                        }, Time * 1000 * 60);
                  })
                  .catch((collected) => {
                    message.channel.send(
                      `After 20 seconds nobody reacted, stopping...`
                    );
                  });
              });
          })
          .catch((collected) => {
            message.channel.send(
              `After 20 seconds nobody reacted, stopping...`
            );
          });
      });
  }
});

bot.login(token);
