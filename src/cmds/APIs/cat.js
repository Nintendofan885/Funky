const Command = require('../../structs/command.js');
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = class CatCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'cat',
            aliases: ['meow', 'cats', 'meoww'],
            description: 'Cats!',
            category: 'APIs',
            usage: ''
        });
    }

    async run(message) {
        try {
            message.channel.startTyping();
            const catData = await fetch('https://api.thecatapi.com/v1/images/search').then(response => response.json());
            const catImage = catData[0].url

            const embed = new Discord.MessageEmbed()
                .setTitle('Meow!')
                .setImage(catImage)

            message.channel.send(embed).then(() => {
                message.channel.stopTyping();
            });
        } catch (err) {
            console.log(err)
        }
    }
}