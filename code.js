const dotenv = require('dotenv')
dotenv.config()

const { Client, Intents, Message } = require('discord.js');
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

  var game = newMember.activities[0].name;
  game = game.toLowerCase();

  if(game.includes('league of legends')) {
    setInterval(() => {
      game = newMember.activities[0].name;
      game = game.toLowerCase();
      if(game.includes('league of legends')) {
        var user = client.users.cache.get(newMember.userId);
        var guild = newMember.guild;
        var channel = guild.channels.cache.find(ch => ch.name === 'general');
        channel.send(`${user} has been playing League of Legends for over an hour! Touch some grass! :joy: :joy: :joy:`)
      } else {
        return;
      }
    }, 3600000);
  }

});






client.on('messageCreate', msg => {
  var msgStr = msg.content.toLowerCase();
  var user = client.users.cache.get(msg.author.id);

  switch(msgStr) {
    case '!ping':
      msg.channel.send(`${user} Pong!`);
      break;
    case '!roulette':
      var roll = Math.floor(Math.random() * 5) + 1;
      setTimeout(() => {
        msg.channel.send(`${user} you stand up against the wall, you take one final deep breath...`);
      }, 4000);
      setTimeout(() => {
        msg.channel.send(`Nick chambers his round into his gun. Mutters under his breath, "I never thought I'd be so lucky."`);
      }, 2000);
      
      //User wins a free kick
      if(roll === 1) {
        setTimeout(() => {
          msg.channel.send(`BANG! The shot strikes you in the back. You fall to the ground, get out of this server`);
        }, 3000);

        msg.guild.fetchMember(msg.author.id).then(member => {
          member.kick('Luck was not on your side today. https://discord.gg/jcX5hwFJbk').then(m => {
            msg.channel.send(`${user} soul has been offered to the god's.`);
          });
        });
      } else {
      //User loses
        setTimeout(() => {
          msg.channel.send(`THUD! The shot strikes to the right of you. You live to see another day.`);
        }, 3000);
      }
      break;
  }
  

});


client.login(process.env.TOKEN);