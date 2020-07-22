const Command = require('../../structs/command.js');

module.exports = class StackCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'stack',
            aliases: ['so'],
            description: 'Searches StackOverflow.',
            category: 'Linkers',
            usage: '<search query> [noembed]'
        });
    }

    async run(message, args) {
        const query = args.join('_')
        if (!args.length) return message.reply('uh, what do you want to make me search StackOverflow for?').then(m => m.delete({ timeout: 3000 }))
        let link = `https://stackoverflow.com/search?q=${query}`
        if (query.startsWith('<') && query.endsWith('>') || query.includes('noembed')) link = `<https://stackoverflow.com/search?q=${query.replace(/(<|>|(_|)noembed)?/g, '')}>`
        message.channel.send(link)
    }
}