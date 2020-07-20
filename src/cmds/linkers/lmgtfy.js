const Command = require('../../structs/command.js');
const moment = require('moment');
const Discord = require('discord.js');

module.exports = class YearCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'lmgtfy',
            aliases: ['google'],
            description: 'Let Me Google That For You.',
            category: 'Linkers',
            usage: '<search query>'
        });
    }

    async run(message, args) {
        message.delete();
        const query = args.join(' ')
        if (!args.length) return message.reply('uh, what are you making me search google for?').then(m => m.delete({ timeout: 3000 }))
        let link = `https://lmgtfy.com/?q=${encodeURIComponent(query)}`
        if (query.includes('noembed')) link = `<https://lmgtfy.com/?q=${encodeURIComponent(query).replace(/( |)noembed/, '')}>`
        message.channel.send(link)
    }
}