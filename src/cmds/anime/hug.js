const Command = require('../../structs/command.js');
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = class HugCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'hug',
            aliases: ['cuddle'],
            description: 'Hug another user.',
            category: 'Anime',
            usage: '<@user>'
        });
    }

    async run(message, args) {
        if (!args[0]) return message.reply(`who you gonna slap? refer to \`${this.client.commands.get(this.name).usage}\` for how to use this command.`)
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]);
        if (!member) return message.channel.send(`that user does not seem to exist..?`)
        if (member.id === message.author.id) return message.reply('can\'t hug yourself!')
        //makes bot start typing to let the user know that the bot is alive (api request is slow)
        message.channel.startTyping();
        //pulls data from api and format to JSON
        const hug = await fetch('https://nekos.life/api/v2/img/hug').then(response => response.json());
        //make embed with data provided by api
        const embed = new Discord.MessageEmbed()
            .setTitle(`${member.user.username}, you got hugged!`)
            .setImage(hug.url)
        //send embed then stop typing.
        message.channel.send(embed)
        message.channel.stopTyping();
    }
}