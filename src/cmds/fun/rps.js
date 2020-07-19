const Command = require('../../structs/command.js');
const Discord = require('discord.js')
const chooseArr = ["🗻", "📰", "✂"];

module.exports = class RPSCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'rps',
            aliases: ['spr'],
            description: 'Play Rock, Paper, Scissor with the bot!',
            category: 'Fun',
            usage: ''
        });
    }

    async run(message) {
        try {
            const embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.member.displayName, message.author.displayAvatarURL())
                .setFooter(message.guild.me.displayName, this.client.user.displayAvatarURL())
                .setDescription('Play a game of RPS with me! Select a reaction to play.')
                .setTimestamp();

            const m = await message.channel.send(embed);
            const reacted = await this.client.utils.promptMessage(m, message.author, 30, chooseArr);

            const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

            const result = await getResult(reacted, botChoice);
            await m.reactions.removeAll();

            embed
                .setDescription("")
                .addField(`**${result}**`, `You chose: ${reacted}\nI chose: ${botChoice}`);

            m.edit(embed);

        } catch {
            return message.channel.send('**Missing Permissions - [MANAGE_MESSAGES]!**')
        }
        function getResult(me, botChosen) {
            if ((me === "🗻" && botChosen === "✂") ||
                (me === "📰" && botChosen === "🗻") ||
                (me === "✂" && botChosen === "📰")) {
                return "You won!";
            } else if (me === botChosen) {
                return "It's a tie!";
            } else {
                return "You lost!";
            }

        }
    }
}