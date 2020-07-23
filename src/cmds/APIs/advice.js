const Command = require('../../structs/command.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = class AdviceCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'advice',
            aliases: ['adv'],
            description: 'Advice, just for you.',
            category: 'APIs',
            usage: ''
        });
    }

    async run(message) {
        try {
            message.channel.startTyping();
            const advice = await fetch('https://api.adviceslip.com/advice').then(response => response.json())
            const embed = new Discord.MessageEmbed()
                .setTitle(advice.slip.advice)
            message.channel.send(embed);
            message.channel.stopTyping();
        } catch (err) {
            console.log(err).then(() => message.reply('Error occurred! I have automatically sent this my developers, so no need to worry!'))
        }
    }
}