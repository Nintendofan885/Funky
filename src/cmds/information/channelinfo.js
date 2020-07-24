const Command = require('../../structs/command.js');
const Discord = require('discord.js')

module.exports = class ChannelInfoCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'channelinfo',
            aliases: ['cinfo', 'channel'],
            description: 'Sends an embed with information about a channel. Defaults to the channel the original message was sent in.',
            category: 'Information',
            usage: '[#channel]'
        });
    }

    async run(message) {
        //get channel
        const channel = message.mentions.channels.first() || message.channel;

        //define channel types
        const types = {
            dm: 'Direct Messages',
            text: 'Text Channel',
            voice: 'Voice Channel',
            category: 'Category',
            news: 'News Channel',
            store: 'GuildStore Channel',
            unknown: 'Unknown'
        };

        //create embed
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`Channels | ${channel.name}`, message.guild.iconURL())
            .addField('Name', `\`${channel.name}\``, true)
            .addField('ID', `\`${channel.id}\``, true)
            .addField('Type', `\`${types[channel.type]}\``, true)
            .addField('NSFW?', `${channel.nsfw ? '\`True\`' : '\`False\`'}`, true)
            .addField('Topic', `${channel.topic ? `\`${channel.topic}\`` : '\`none\`'}`, true)
            .addField('Created At', `\`${new Date(channel.createdAt).toLocaleString('en-GB', { dateStyle: 'full' })}\``, true)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())

        //send embed
        message.channel.send(embed)
    }
}