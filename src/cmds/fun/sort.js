const Command = require('../../structs/command.js');
const Discord = require('discord.js');
const houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
const house = houses[Math.floor(Math.random() * houses.length)];

module.exports = class SortCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'sort',
            aliases: ['hpsort'],
            description: 'Sorts user into a Hogwarts House.',
            category: 'Fun'
        });
    }

    async run(message) {

        let attachment;
        if (house === 'Gryffindor') {
            attachment = 'https://media3.giphy.com/media/26gsp5CyITdSmgKL6/200.gif';
        } else if (house === 'Slytherin') {
            attachment = 'https://i.imgur.com/ASnzENM.gif'
        } else if (house === 'Hufflepuff') {
            attachment = 'https://thumbs.gfycat.com/BrilliantUnhappyAfricanharrierhawk-small.gif'
        } else if (house === 'Ravenclaw') {
            attachment = 'https://i.gifer.com/7bhs.gif'
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`You were sorted in ${house}!`)
            .setImage(attachment)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()

        if (house === 'Gryffindor') embed.setColor('#740001')
        if (house === 'Slytherin') embed.setColor('#2a623d')
        if (house === 'Hufflepuff') embed.setColor('#ecb939')
        if (house === 'Ravenclaw') embed.setColor('#222f5b')

        message.channel.send(embed).catch(err => console.log(err))
    }
}