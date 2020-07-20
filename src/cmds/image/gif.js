const Command = require('../../structs/command.js');
const Discord = require('discord.js');
const giphy_key = require('../../../config.json');
const giphy = require('giphy-api')(giphy_key);

module.exports = class GifCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'gif',
            aliases: ['giphy'],
            description: 'Sends a random gif from GIPHY.',
            category: 'Image',
            usage: '<search query>'
        });
    }

    async run(message, args) {
        try {
            if (!args[0]) return message.channel.send(`Invalid arguments. Please refer to \`${this.client.commands.get('gif').usage}\` for how to use this command.`)
            giphy.search(args.join(' ')).then(function (res) {
                const id = res.data[0].id;
                const url = `https://media.giphy.com/media/${id}/giphy.gif`;
                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setImage(url)
                    .setTimestamp()
                message.channel.send(embed);
            });
        } catch {
            return message.channel.send('not found.')
        }
    }
}