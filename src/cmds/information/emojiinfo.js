const Command = require('../../structs/command.js');
const Discord = require('discord.js');

module.exports = class EmojiInfoCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'emojinfo',
            aliases: ['einfo'],
            description: 'Sends information for a specified emoji.',
            category: 'Information',
            usage: 'Information'
        });
    }

    async run(message, args) {

        if (!args[0]) return message.reply('uh, which emoji are you finding information for?')
        let emoji = message.guild.emojis.cache.get(args[0]) || Discord.Util.parseEmoji(args[0])
        emoji = message.guild.emojis.cache.get(emoji.id)
        if (!emoji) return message.reply('soz, this command only works for custom emojis, in this server.')

        const embed = new Discord.MessageEmbed()
            .setAuthor('Emoji Information', this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setThumbnail(emoji.url)
            .addField('Name', `\`${emoji.name}\``)
            .addField('ID', `\`${emoji.id}\``)
            .addField('Created at', `${new Date(emoji.createdAt).toLocaleString('en-GB', { dateStyle: 'full' })}`)
            .addField('Animated?', `${emoji.animated ? 'True' : 'False'}`)
            .addField('Raw', `\`${emoji}\``)
            .addField("Download", `[Link](${emoji.url})`)

        message.channel.send(embed)
    }
}