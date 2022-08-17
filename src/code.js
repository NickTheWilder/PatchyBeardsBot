const dotenv = require("dotenv");
dotenv.config();

const { Client, Intents, Message, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
    ],
});

const version = "1.5.0";
const prefix = "!";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Version: ${version}`);
});

client.on("presenceUpdate", (oldMember, newMember) => {
    if (newMember.activities.length === 0) return;

    catchGame("League of Legends", newMember);
    catchGame("VRChat", newMember);

    function catchGame(gameName, newMember) {
        var game = newMember.activities[0].name;
        game = game.toLowerCase();

        if (game.includes(gameName)) {
            var user = client.users.cache.get(newMember.userId);
            console.warn(`${user} is playing ${gameName}`);

            setInterval(() => {
                if (game.includes(gameName.toLowerCase())) {
                    var guild = newMember.guild;
                    var channel = guild.channels.cache.find(
                        (ch) => ch.name === "general"
                    );
                    channel.send(
                        `${user} has been playing ${gameName} for over an hour!`
                    );

                    user.kick(
                        `Quit playing ${gameName}! \n You can rejoin this server at this link once you have made better choices: ${process.env.INV_LINK}`
                    );
                } else {
                    return;
                }
            }, 3600000);
        }
    }
});

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].toLowerCase().slice(prefix.length);

    var user = client.users.cache.get(msg.author.id);
    var userName = user.username;

    console.log(`${userName} used the command ${cmd}`);

    switch (cmd) {
        case "ping":
            msg.channel.send(`${user} Pong!`);
            break;
        case "roulette":
            rouletteFun(msg);
            break;
        case "version":
            msg.channel.send(`${user} version ${version}`);
            break;
        case "hitme":
            mathDungeon(args, user, msg);
            break;
    }
});

// BEGINNING THE SPECIAL COMMANDS

function rouletteFun(msg) {
    var roll = Math.floor(Math.random() * 5) + 1;
    if (roll == 1) {
        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Roulette loser")
            .setDescription(
                `You stand up against the wall, you take one final deep breath. BANG! The bullet strikes you in the back, you fall to the ground. Your vision blurs and your consciousness fades.`
            )
            .setImage("https://i.imgur.com/YSjRdAt.gif")
            .setTimestamp();

        msg.channel.send({ embeds: [embed] });

        setTimeout(() => {
            msg.member.kick(
                `Luck was (not) on your side today. \n You can rejoin this server at this link: ${process.env.INV_LINK}`
            );
        }, 5000);
    } else {
        const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Roulette winner")
            .setDescription(
                `You stand up against the wall, you take one final deep breath. THUD! The bullet strikes to your right. You live to see another day.`
            )
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
        case "1":
            var roll = Math.floor(Math.random() * 5) + 1;
            switch (roll) {
                case 1:
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `What is the sum of 1 + 1?
						\n 🔴 2
						\n 🔵 3
						\n 🟡 4
						\n 🟢 5`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🔴");
                    break;
                case 2:
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `What is the sum of 57 * 3?
						\n 🔴 57
						\n 🔵 171
						\n 🟡 164
						\n 🟢 284`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🔵");
                    break;
                case 3:
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `What is the sum of 5 + 5?
						\n 🔴 10
						\n 🔵 6
						\n 🟡 11
						\n 🟢 15`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🔴");
                    break;
                case 4:
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `What is the sum of 16 * 4?
						\n 🔴 54
						\n 🔵 64
						\n 🟡 68
						\n 🟢 80`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🔵");
                    break;
                case 5:
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `What is the sum of 7 + 7?
						\n 🔴 14
						\n 🔵 15
						\n 🟡 31
						\n 🟢 42`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🔴");
                    break;
            }
            break;
        case "2":
            var roll = Math.floor(Math.random() * 5) + 1;
            switch (roll) {
                case 1:
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `What is the sum of 9 * 32 / 6 / 3?
						\n 🔴 12
						\n 🔵 8
						\n 🟡 4
						\n 🟢 16`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🟢");
                    break;
                case "2":
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `What is the sum of 9 * 32 / 6 / 3?
						\n 🔴 12
						\n 🔵 8
						\n 🟡 4
						\n 🟢 16`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🟢");
                    break;
            }
        case "3":
            //var roll = Math.floor(Math.random() * 5) + 1;
            var roll = 1;
            switch (roll) {
                case 1:
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `A circle has a radius of 13ft. Find the radian measure of the central angle theta that intercepts an arc of length 12ft.
						\n 🔴 theta = 0.75 radians
						\n 🔵 theta = 0.5 radians
						\n 🟡 theta = 0.7 radians
						\n 🟢 theta = 0.9 radians`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🟢");
                    break;
            }
            break;
        case "4":
            //var roll = Math.floor(Math.random() * 5) + 1;'
            var roll = 1;
            switch (roll) {
                case 1:
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `Find the maximum and minimum value of the function f(x,y)=x^2+y^2-3^y on the closed disk x^2+y^2 ≤ 4.
						\n 🔴 1
						\n 🔵 -1.5
						\n 🟡 -2.25
						\n 🟢 -2.5`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🟡");
                    break;
            }
            break;
        case "5":
            //var roll = Math.floor(Math.random() * 5) + 1;
            var roll = 1;
            switch (roll) {
                case 1:
                    embed
                        .setColor("#0099ff")
                        .setTitle("Math Dungeon")
                        .setDescription(
                            `When A is similar to B = (M^(-1))AM, prove this statement: \n
						If A^k -> 0 when k -> infinity, then also B^k -> 0.\n
						\n 🔴 A and B have the same eigenvalues. If A^k -> 0 then all |lambda| < 1. Therefore B^k -> 0.
						\n 🔵 A and B are equivalent. If A^k -> 0 then all |lambda| > 1. Therefore B^k -> infinity.
						\n 🟡 A and B are scalar multiples of the matrix AB. If A^k -> infinity then all |lambda| > 1. Therefore B^k -> -infinity.
						\n 🟢 Just end me.`
                        )
                        .setTimestamp();

                    await embedHelper(embed, msg, user, "🔴");
                    break;
            }
            break;
    }
}

async function embedHelper(embed, msg, user, ans) {
    let role = msg.member.roles.cache.has("859960127490359327");

    const embedMsg = await msg.channel.send({ embeds: [embed] });

    embedMsg.react("🔴");
    embedMsg.react("🔵");
    embedMsg.react("🟡");
    embedMsg.react("🟢");

    const filter = (reaction, user) => {
        return (
            ["🔴", "🔵", "🟡", "🟢"].includes(reaction.emoji.name) &&
            user.id === msg.author.id
        );
    };

    embedMsg
        .awaitReactions({ filter, max: 1, time: 3600000, errors: ["time"] })
        .then((collected) => {
            const reaction = collected.first();
            if (reaction.emoji.name === ans) {
                msg.channel.send(`${user} got it right!`);
                return;
            } else {
                msg.channel.send(`${user} got it wrong!`);
                msg.channel.send(
                    `https://tenor.com/view/cry-sad-toy-story-woody-so-long-partner-gif-9797730`
                );
                if (!role) {
                    setTimeout(() => {
                        msg.member.kick(
                            `Better luck next time, ${user} \n You can rejoin this server at this link: ${process.env.INV_LINK}`
                        );
                    }, 5000);
                }
            }
        })
        .catch(() => {
            msg.channel.send(`${user} took too long to answer!`);
            msg.channel.send(
                `https://tenor.com/view/cry-sad-toy-story-woody-so-long-partner-gif-97977304`
            );
            if (!role) {
                setTimeout(() => {
                    msg.member.kick(
                        `Better luck next time, ${user} \n You can rejoin this server at this link: ${process.env.INV_LINK}`
                    );
                }, 5000);
            }
        });
}

client.login(process.env.TOKEN);
