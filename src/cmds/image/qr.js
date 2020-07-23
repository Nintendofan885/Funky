const Command = require('../../structs/command.js')
const Discord = require('discord.js')

module.exports = class RipCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'qr',
            aliases: ['qrcode'],
            description: 'Generates a QR code from a specified link.',
            category: 'Image',
            usage: '<link>'
        });
    }

    async run(message, args) {
        const link = args.join('_')
        if (!link) return message.channel.send(`Invalid arguments. Please refer to \`${this.client.commands.get('qr').usage}\` for how to use this command.`)

        const embed = new Discord.MessageEmbed()
            .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link.replace(/(<|>)?/, '')}`)

        message.channel.send(embed)
    }
}