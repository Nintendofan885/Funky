const Command = require('../../structs/command.js');
const Discord = require('discord.js')

module.exports = class SSCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'serverstats',
            aliases: ['stats', 'ss'],
            description: 'Sends an embed with stats for the current server.',
            category: 'Information',
            usage: ''
        });
    }

    async run(message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Stats for ${message.guild.name}`)
            .addFields(
                { name: 'Members', value: `${message.guild.members.cache.filter(member => !member.user.bot).size}` },
                { name: 'Bots', value: `${message.guild.members.cache.filter(member => member.user.bot).size}` },
                { name: 'Channels', value: `${message.guild.channels.cache.size}` },
                { name: 'Roles', value: `${message.guild.roles.cache.size}` },
                { name: 'Owner', value: `${message.guild.owner}` }
            )
            .setColor('#FF0000')
        message.channel.send(embed)
    }
}