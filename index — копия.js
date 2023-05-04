const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});
// Команда для создания тикета
client.on('message', message => {
  if (message.content === '!createTicket') { //команда
    const user = message.author;
    const channelName = `ticket-${user.username}-${user.discriminator}`;  //названия тикетов
    message.guild.channels.create(channelName, {
      type: 'text',
      parent: '1234567890' // ID категории, в которую будут помещаться каналы тикетов
    })
      .then(channel => {
        const categoryId = channel.parentID;
        channel.setParent(categoryId);
        channel.createOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
        channel.createOverwrite(user, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true
        });
        channel.send(`<@${user.id}>`, new Discord.MessageEmbed()
          .setTitle(`Привет ${user.username}!`)
          .setDescription('Добро пожаловать в ваш тикет. Мы ответим на ваш запрос как можно скорее.')
          .setColor('#0099ff')
        );
      })
      .catch(console.error);
  }
});


client.login('TOKEN');