const Command = require('../../structs/command.js');
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = class FoxCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'fox',
            aliases: ['oww'],
            description: 'Foxes!',
            category: 'Animals',
            usage: ''
        });
    }

    async run(message) {
        try {
            message.channel.startTyping();
            const fox = await fetch('https://randomfox.ca/floof/').then(response => response.json());
            const embed = new Discord.MessageEmbed()
                .setTitle('Fox!')
                .setImage(fox.image)

            message.channel.send(embed).then(() => message.channel.stopTyping());
        } catch (err) {
            console.log(err)
        }
    }
}