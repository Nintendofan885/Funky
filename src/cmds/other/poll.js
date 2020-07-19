const Command = require('../../structs/command.js');
const Discord = require("discord.js");

module.exports = class PollCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'poll',
            aliases: ['p'],
            description: 'Command for polling.',
            category: 'Other',
            usage: '<query>'
        });
    }

    async run(message, args) {
        if (!args) return message.reply('please enter a query!')
        message.delete();

        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Poll!')
            .setDescription(args.join(' '))
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
        const sentEmbed = await message.channel.send(embed);
        sentEmbed.react('👍').then(() => sentEmbed.react('👎'));
    }
}