const Command = require('../../structs/command.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = class FMLCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'fml',
            aliases: ['kms'],
            description: 'Fu*k my life.',
            category: 'APIs',
            usage: ''
        });
    }

    async run(message) {
        try {
            message.channel.startTyping();
            const fml = await fetch('https://api.alexflipnote.dev/fml').then(response => response.json())
            const embed = new Discord.MessageEmbed()
                .setTitle(fml.text)
            message.channel.send(embed);
            message.channel.stopTyping();
        } catch (err) {
            console.log(err).then(() => message.reply('Error occurred! I have automatically sent this my developers, so no need to worry!'))
        }
    }
}