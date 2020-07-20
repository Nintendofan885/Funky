const Command = require('../../structs/command.js');
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = class ChuckCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'chuck',
            aliases: ['chucknorris'],
            description: 'Sends a hilarious Chuck Norris joke.',
            category: 'APIs',
            usage: ''
        });
    }

    async run(message) {
        try {
            const chuck = await fetch('https://api.chucknorris.io/jokes/random').then(response => response.json());
            const embed = new Discord.MessageEmbed()
                .setTitle('Chuck Norris Joke!')
                .setThumbnail(chuck.icon_url)
                .setURL(chuck.url)
                .setDescription(chuck.value)

            message.channel.send(embed)
        } catch (err) {
            console.log(err)
        }
    }
}