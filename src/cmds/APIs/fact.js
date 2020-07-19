const Command = require('../../structs/command.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = class FactCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'fact',
            aliases: ['facts'],
            description: 'Random fact!',
            category: 'APIs',
            usage: ''
        });
    }

    async run(message) {
        try {
            const fact = await fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(response => response.json())
            const embed = new Discord.MessageEmbed()
                .setTitle('Random fact!')
                .setURL(fact.permalink)
                .setDescription(fact.text)
                .setTimestamp()
            message.channel.send(embed)
        } catch (err) {
            console.log(err).then(() => message.reply('Error occurred! I have automatically sent this my developers, so no need to worry!'))
        }
    }
}