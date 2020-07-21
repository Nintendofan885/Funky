const Command = require('../../structs/command.js');

module.exports = class LMGTFYCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'lmgtfy',
            aliases: ['google'],
            description: 'Let Me Google That For You. Comes with an option to remove the (rather offensive) embed by wrapping your search query in \`<>\`.',
            category: 'Linkers',
            usage: '<search query> [noembed]'
        });
    }

    async run(message, args) {
        message.delete();
        const query = args.join(' ')
        if (!args.length) return message.reply('uh, what are you making me search google for?').then(m => m.delete({ timeout: 3000 }))
        let link = `https://lmgtfy.com/?q=${query}`
        if (query.startsWith('<') && query.endsWith('>') || query.includes('noembed')) link = `<https://lmgtfy.com/?q=${query.replace(/(<|>|(_|)noembed)?/g, '')}>`
        message.channel.send(link)
    }
}