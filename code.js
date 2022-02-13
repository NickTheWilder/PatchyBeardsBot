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

const version = "1.2.1";
const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Version: ${version}`);
});


client.on('presenceUpdate', (oldMember, newMember) => {

  if (newMember.activities.length === 0) return;

  catchGame('League of Legends', newMember);
  catchGame('VR Chat', newMember);

  function catchGame(gameName, newMember) {
    var game = newMember.activities[0].name;
    game = game.toLowerCase();

    if (game.includes(gameName)) {
      var user = client.users.cache.get(newMember.userId);
      console.warn(`${user} is playing ${gameName}`);

      setInterval(() => {
        if (game.includes(gameName.toLowerCase())) {
          var guild = newMember.guild;
          var channel = guild.channels.cache.find(ch => ch.name === 'general');
          channel.send(`${user} has been playing ${gameName} for over an hour! Touch some grass! :joy: :joy: :joy:`);
        } else {
          return;
        }
      }, 3600000);
    }
  }

});

client.on('messageCreate', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.trim().split(/ +/g);
  const cmd = args[0].toLowerCase().slice(prefix.length);

  var user = client.users.cache.get(msg.author.id);
  var userName = user.username;

  console.log(`${userName} used the command ${cmd}`);

  switch (cmd) {
    case 'ping':
      msg.channel.send(`${user} Pong!`);
      break;
    case 'roulette':
      rouletteFun(msg);
      break;
    case 'version':
      msg.channel.send(`${user} version ${version}`);
      break;
    case 'hitme':
      mathDungeon(args, user, msg);
      break;
  }
});

//BEGINNING THE SPECIAL COMMANDS

function rouletteFun(msg) {
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
  return;
}

function mathDungeon(args, user, msg) {
  var difficulty = args[1];
  if (!difficulty) {
    msg.channel.send(`${user} missing arguments, please use !hitme <1-5>`);
    return;
  }
  if (difficulty > 5 || difficulty < 1) {
    msg.channel.send(`${user} difficulty must be between 1 and 5`);
    return;
  }

  var ans = false;

  msg.channel.send(`${user} has entered the math dungeon! You have 10 seconds to answer the following question:`);

  switch (difficulty) {
    case '1':

      var roll = Math.floor(Math.random() * 10) + 1;
      switch (roll) {
        case 1:
          const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Math Dungeon')
            .setDescription(`What is the sum of 1 + 1?
            \n :a: 2
            \n :b: 3
            \n :c: 4
            \n :d: 5`)
            .setTimestamp();

          msg.channel.send({ embeds: [embed] });
          msg.react(':a:');
          msg.react(':b:');
          msg.react(':c:');
          msg.react(':d:');

          msg.awaitReactions({ filter, max: 1, time: 1000, errors: ['time'] })
            .then(collected => {
              const reaction = collected.first();
              if (reaction.emoji.name === ':a:') {
                msg.channel.send(`${user} got it right!`);
                ans = true;
              } else {
                msg.channel.send(`${user} got it wrong!`);
                ans = false;
              }
            })
            .catch(collected => {
              msg.channel.send(`${user} took too long to answer!`);
              ans = false;
            });

          if (ans = false) {
            msg.channel.send(`${user} has failed the math dungeon!`);
          }
          break;
      }
      break;
    case '2':
      break;
    case '3':
      break;
    case '4':
      break;
    case '5':
      break;
  }
}


client.login(process.env.TOKEN);