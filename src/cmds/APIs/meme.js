const Command = require('../../structs/command.js');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const subReddit = 'dankmemes';

module.exports = class MemeCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'meme',
            aliases: ['memes', 'mem'],
            description: 'Sends a meme from Reddit!',
            category: 'APIs',
            usage: ''
        });
    }

    async run(message) {
        //makes bot start typing to let the user know that the bot is alive (api request is slow)
        message.channel.startTyping();
        //pull data from api and format to JSON
        const meme = await fetch(`https://meme-api.herokuapp.com/gimme/${subReddit}`).then(response => response.json());
        //make embed with data provided by api
        const embed = new Discord.MessageEmbed()
            .setTitle(meme.title)
            .setURL(meme.postLink)
            .setImage(meme.url)
        //send embed then stop typing.
        message.channel.send(embed).then(() => {
            message.channel.stopTyping();
        }).catch(err => console.log(err))
    }
}