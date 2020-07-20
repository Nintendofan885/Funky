const Command = require('../../structs/command.js');
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = class DogCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'dog',
            aliases: ['woof', 'dogs'],
            description: 'Dogs!',
            category: 'Animals',
            usage: ''
        });
    }

    async run(message) {
        try {
            message.channel.startTyping();
            const dogData = await fetch('https://api.thedogapi.com/v1/images/search').then(response => response.json());
            const dogImage = dogData[0].url

            const embed = new Discord.MessageEmbed()
                .setTitle('Woof!')
                .setImage(dogImage)

            message.channel.send(embed).then(() => {
                message.channel.stopTyping();
            });
        } catch (err) {
            console.log(err)
        }
    }
}