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

client.on('presenceUpdate', (oldMember, newMember) => {

  if(newMember.activities.length === 0) return; 

  console.log(newMember);

  var game = newMember.activities[0].name;
  game = game.toLowerCase();

  if(game.includes('bloons')) {
    setInterval(() => {
      game = newMember.activities[0].name;
      game = game.toLowerCase();
      if(game.includes('bloons')) {
        var user = client.users.cache.get(newMember.userId);
        var guild = newMember.guild;
        var channel = guild.channels.cache.find(ch => ch.name === 'bot-testing');
        channel.send(`${user} has been playing Bloons for over an hour! Touch some grass! :RIPBOZO: :pepeLaughPoint: `)
      } else {
        return;
      }
    }, 3600000);
  }

});



client.login(process.env.TOKEN);