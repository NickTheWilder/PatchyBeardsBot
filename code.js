const dotenv = require('dotenv')
dotenv.config()

const { Client, Intents, Message, MessageEmbed } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
  ]
});

const version = "1.0.0";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('presenceUpdate', (oldMember, newMember) => {

  if (newMember.activities.length === 0) return;

  var game = newMember.activities[0].name;
  game = game.toLowerCase();

  if (game.includes('league of legends')) {
    setInterval(() => {
      game = newMember.activities[0].name;
      game = game.toLowerCase();
      if (game.includes('league of legends')) {
        var user = client.users.cache.get(newMember.userId);
        var guild = newMember.guild;
        var channel = guild.channels.cache.find(ch => ch.name === 'general');
        channel.send(`${user} has been playing League of Legends for over an hour! Touch some grass! :joy: :joy: :joy:`)
      } else {
        return;
      }
    }, 3600000);
  }

  if (game.includes('vr chat')) {
    setInterval(() => {
      game = newMember.activities[0].name;
      game = game.toLowerCase();
      if (game.includes('league of legends')) {
        var user = client.users.cache.get(newMember.userId);
        var guild = newMember.guild;
        var channel = guild.channels.cache.find(ch => ch.name === 'general');
        channel.send(`${user} has been playing VR Chat for over an hour! Touch some grass! :joy: :joy: :joy:`)
      } else {
        return;
      }
    }, 3600000);
  }

});


client.on('messageCreate', msg => {
  var msgStr = msg.content.toLowerCase();
  var user = client.users.cache.get(msg.author.id);

  switch (msgStr) {
    case '!ping':
      msg.channel.send(`${user} Pong!`);
      break;
    case '!roulette':
      var roll = Math.floor(Math.random() * 5) + 1;
      if (roll == 1) {
        const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Roulette loser')
          .setDescription(`You stand up against the wall, you take one final deep breath. BANG! The bullet strikes you in the back, you fall to the ground. Your vision blurs and your consciousness fades.`)
          .setImage('https://i.imgur.com/YSjRdAt.gif')
          .setTimestamp();


        msg.channel.send({ embeds: [embed] });

        setTimeout(() => {
          const kickEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Winner winner chicken dinner.')
            .setDescription(`Luck was (not) on your side today. \n You can rejoin this server at this link: https://discord.gg/jcX5hwFJbk`)
            .setTimestamp();

          msg.member.kick(kickEmbed);
        }, 4000);

      } else {
        const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Roulette winner')
          .setDescription(`You stand up against the wall, you take one final deep breath. THUD! The bullet strikes to your right. You live to see another day.`)
          .setTimestamp();

        msg.channel.send({ embeds: [embed] });
      }
      break;
    case '!version':
      msg.channel.send(`${user} version ${version}`);
      break;
  }


});


client.login(process.env.TOKEN);