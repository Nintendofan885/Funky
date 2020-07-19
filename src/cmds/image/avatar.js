const Command = require('../../structs/command.js')
const Discord = require('discord.js')

module.exports = class AvatarCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'avatar',
            aliases: ['av'],
            description: 'Sends a given user\'s avatar.',
            category: 'Image',
            usage: '[user]'
        });
    }

    async run(message, args) {
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
        const embed = new Discord.MessageEmbed()
            .setTitle(`${member.user.username}'s Avatar`)
            .setImage(`${member.user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        message.channel.send(embed)
    }
}