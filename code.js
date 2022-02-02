const dotenv = require('dotenv')
dotenv.config()

const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (msg) => {
  if (msg.content === '!ping') {
    msg.reply('pong');
  }
});


client.on('presenceUpdate', (oldMember, newMember) => {
  console.dir(oldMember)
  if(newMember){
    var game = newMember.activities[0].name;
  
    console.dir(newMember);
  
    if(game.includes('Spotify')) { 
      var user = newMember.username;
      var guild = newMember.guild;
      var channel = guild.channels.cache.find(ch => ch.name === 'bot-testing');
      channel.send(`${user} is listening to ${game}`);
    } 
  }
});



client.login(process.env.TOKEN);