const Command = require('../../structs/command.js');
const moment = require('moment');
const Discord = require('discord.js');

module.exports = class YearCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'year',
            aliases: ['daysleft'],
            description: 'How much longer till next year?',
            category: 'Other',
            usage: ''
        });
    }

    async run(message) {
        const now = new Date();
        const next = new Date(now);
        next.setFullYear(now.getFullYear() + 1);
        next.setHours(0, 0, 0, 0);
        next.setMonth(0, 1);
        const duration = next - now;
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor((duration / 1000 / 60) % 60);
        const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));
        const embed = new Discord.MessageEmbed()
            .setTitle('Happy New Year!')
            .setDescription(`There are **${days} days**, **${hours} hours**, **${minutes} minutes** and **${seconds} seconds** until **${next.getFullYear()}**! 🎆`)
            .setFooter(`Or, in short, ${moment.duration(next - now).humanize()}.`)
        message.channel.send(embed)
    }
}