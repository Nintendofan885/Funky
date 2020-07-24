const Command = require('../../structs/command.js');
const fetch = require('node-fetch')
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
            message.channel.startTyping();
            if (!args[0]) return message.channel.send(`Invalid arguments. Please refer to \`${this.client.commands.get(this.name).usage}\` for how to use this command.`).then(() => message.channel.stopTyping());
            if (!args[0].match(/[0-9a-fA-F]+/)) return message.reply('hmmm, that doesn\'t look like a valid hex code. Try again.').then(() => message.channel.stopTyping());
            const hex = args[0].replace('#', '')

            const data = await fetch(`https://api.alexflipnote.dev/color/${hex}`).then(response => response.json()).catch(function (err) {
                return message.reply('not a valid hex code.')
            });

            //const data = await fetch(`https://api.alexflipnote.dev/color/${hex}`).then(response => response.json()).catch(err => message.reply(`error: ${err}`))

            const embed = new Discord.MessageEmbed()
                .setTitle(data.name)
                .setColor(data.hex)
                .setImage(data.image)
                .setFooter(`${data.rgb}`)

            if (data.name) message.channel.send(embed);
            message.channel.stopTyping();
        } catch (err) {
            console.error(err)
        }
    }
}
///[0-9a-fA-F]+/