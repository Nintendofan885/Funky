const Command = require('../../structs/command.js');
const Discord = require('discord.js');

module.exports = class DYMCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'didyoumean',
            aliases: ['dym'],
            description: 'Famous \'Did you Mean?\' meme from Google search results.',
            category: 'APIs',
            usage: ''
        });
    }

    async run(message, args) {
        if (!args[0]) return message.channel.send(`Invalid arguments. Please refer to \`${this.client.commands.get(this.name).usage}\` for how to use this command.`)
        const topText = args[0];
        const bottomText = args[1];
        try {
            //const fml = await fetch(`https://api.alexflipnote.dev/didyoumean?top=${topText}&bottom=${bottomText}`)
            const attachment = new Discord.MessageAttachment(`https://api.alexflipnote.dev/didyoumean?top=${topText}&bottom=${bottomText}`)
            message.channel.send(attachment);
        } catch (err) {
            console.log(err).then(() => message.reply('Error occurred! I have automatically sent this my developers, so no need to worry!'))
        }
    }
}