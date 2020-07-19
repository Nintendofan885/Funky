const Command = require('../../structs/command.js');
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = class JokeCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'joke',
            aliases: ['dadjoke'],
            description: 'Pulls a hilarious dadjoke from an API.',
            category: 'APIs',
            usage: ''
        });
    }

    async run(message) {
        //makes bot start typing to let the user know that the bot is alive (api request is slow)
        message.channel.startTyping();
        //pulls data from api and format to JSON
        const joke = await fetch('http://official-joke-api.appspot.com/random_joke').then(response => response.json());
        //make embed with data provided by api
        const embed = new Discord.MessageEmbed()
            .addFields(
                { name: joke.setup, value: joke.punchline }
            )
        //send embed then stop typing.
        message.channel.send(embed).then(() => {
            message.channel.stopTyping();
        });
    }
}