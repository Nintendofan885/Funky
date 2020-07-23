const Command = require('../../structs/command.js');
const Discord = require('discord.js');

module.exports = class HexCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'hex',
            aliases: [],
            description: 'Sends an image of the color of a given hex code.',
            category: 'Image',
            usage: '<hex code>'
        });
    }

    async run(message, args) {
        try {
            if (!args[0]) return message.channel.send(`Invalid arguments. Please refer to \`${this.client.commands.get('hex').usage}\` for how to use this command.`)
            if (!args[0].match(/[0-9a-fA-F]+/)) return message.reply('hmmm, that doesn\'t look like a valid hex code. Try again.')

            const hex = args[0]
            const embed = new Discord.MessageEmbed()
                .setImage(`https://api.alexflipnote.dev/color/image/${hex.replace('#', '')}`)

            message.channel.send(embed);
        } catch (err) {
            console.error(err)
        }
    }
}
///[0-9a-fA-F]+/