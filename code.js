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

const version = "1.3.3";
const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Version: ${version}`);
});


client.on('presenceUpdate', (oldMember, newMember) => {

  if (newMember.activities.length === 0) return;

  catchGame('League of Legends', newMember);
  catchGame('VRChat', newMember);

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
    }, 5000);

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

async function mathDungeon(args, user, msg) {
  var difficulty = args[1];
  var ans = false;
  const embed = new MessageEmbed();

  if (!difficulty) {
    msg.channel.send(`${user} missing arguments, please use !hitme <1-5>`);
    return;
  }
  if (isNaN(difficulty)) {
    msg.channel.send(`${user} difficulty must be a number`);
    return;
  }

  if (difficulty > 5 || difficulty < 1) {
    msg.channel.send(`${user} difficulty must be between 1 and 5`);
    return;
  }

  switch (difficulty) {
    case '1':
      var roll = Math.floor(Math.random() * 5) + 1;
      switch (roll) {
        case 1:
          embed.setColor('#0099ff')
            .setTitle('Math Dungeon')
            .setDescription(`What is the sum of 1 + 1?
            \n 🔴 2
            \n 🔵 3
            \n 🟡 4
            \n 🟢 5`)
            .setTimestamp();

            ans = await embedHelper(embed, msg, user, '🔴');
          break;
          case '2':
            embed.setColor('#0099ff')
              .setTitle('Math Dungeon')
              .setDescription(`What is the sum of 57 * 3?
              \n 🔴 57
              \n 🔵 171
              \n 🟡 164
              \n 🟢 284`)
              .setTimestamp();

              ans = await embedHelper(embed, msg, user, '🔵');
          break;
          case '3':
            embed.setColor('#0099ff')
              .setTitle('Math Dungeon')
              .setDescription(`What is the sum of 5 + 5?
              \n 🔴 10
              \n 🔵 6
              \n 🟡 11
              \n 🟢 15`)
              .setTimestamp();

              ans = await embedHelper(embed, msg, user, '🔴');
          break;
          case '4':
            embed.setColor('#0099ff')
              .setTitle('Math Dungeon')
              .setDescription(`What is the sum of 16 * 4?
              \n 🔴 54
              \n 🔵 64
              \n 🟡 68
              \n 🟢 80`)
              .setTimestamp();

              ans = await embedHelper(embed, msg, user, '🔵');
          break;
          case '5':
            embed.setColor('#0099ff')
              .setTitle('Math Dungeon')
              .setDescription(`What is the sum of 7 + 7?
              \n 🔴 14
              \n 🔵 15
              \n 🟡 31
              \n 🟢 42`)
              .setTimestamp();

              ans = await embedHelper(embed, msg, user, '🔴');
          break;
      }
      break;
    case '2':
      var roll = Math.floor(Math.random() * 5) + 1;
      switch (roll) {
        case 1:
          embed.setColor('#0099ff')
            .setTitle('Math Dungeon')
            .setDescription(`What is the sum of 9 * 32 / 6 / 3?
            \n 🔴 12
            \n 🔵 8
            \n 🟡 4
            \n 🟢 16`)
            .setTimestamp();

            ans = await embedHelper(embed, msg, user, '🟢');
          break;
        case '2':
          embed.setColor('#0099ff')
            .setTitle('Math Dungeon')
            .setDescription(`What is the sum of 9 * 32 / 6 / 3?
            \n 🔴 12
            \n 🔵 8
            \n 🟡 4
            \n 🟢 16`)
            .setTimestamp();

            ans = await embedHelper(embed, msg, user, '🟢');
        break;
      }
    case '3':
      break;
    case '4':
      //var roll = Math.floor(Math.random() * 5) + 1;'
      var roll = 1;
      switch (roll) {
        case 1:
          embed.setColor('#0099ff')
            .setTitle('Math Dungeon')
            .setDescription(`Find the maximum and minimum value of the function f(x,y)=x^2+y^2-3^y on the closed disk x^2+y^2 ≤ 4.
            \n 🔴 1
            \n 🔵 -1.5
            \n 🟡 -2.25
            \n 🟢 -2.5`)
            .setTimestamp();

            ans = embedHelper(embed, msg, user, '🟡');
          break;
      }
      break;
    case '5':
      break;
  }

  if (!ans) {
    setTimeout(() => {
      msg.member.kick(`Better luck next time, ${user}`);
    }, 5000);
  }
  return
}

async function embedHelper(embed, msg, user, ans) {

  const embedMsg = await msg.channel.send({ embeds: [embed] });
            
  embedMsg.react('🔴');
  embedMsg.react('🔵');
  embedMsg.react('🟡');
  embedMsg.react('🟢');

  const filter = (reaction, user) => {
    return ['🔴', '🔵', '🟡', '🟢'].includes(reaction.emoji.name) && user.id === msg.author.id;
  }

  embedMsg.awaitReactions({ filter, max: 1, time: 3600000, errors: ['time'] })
  .then(collected => {
    const reaction = collected.first();
    if (reaction.emoji.name === ans) {
      msg.channel.send(`${user} got it right!`);
      return true;
    } else {
      msg.channel.send(`${user} got it wrong!`);
      msg.channel.send(`https://media.tenor.co/videos/6303c6987119019caaf39b7f0b33028a/mp4`);
      return false;
    }
  }).catch(() => {
    msg.channel.send(`${user} took too long to answer!`);
    msg.channel.send(`https://media.tenor.co/videos/6303c6987119019caaf39b7f0b33028a/mp4`);
    return false;
  });

}


client.login(process.env.TOKEN);