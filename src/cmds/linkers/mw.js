const Command = require('../../structs/command.js');

module.exports = class MWCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'mw',
            aliases: ['mediawiki'],
            description: 'Links a page stored at MediaWiki.org.',
            category: 'Linkers',
            usage: '<page name> [noembed]'
        });
    }

    async run(message, args) {
        const query = args.join('_')
        if (!args.length) return message.reply('uh, which MediaWiki.org page do you wish to link to?').then(m => m.delete({ timeout: 3000 }))
        let link = `https://mediawiki.org/wiki/${query}`
        if (query.startsWith('<') && query.endsWith('>') || query.includes('noembed')) link = `<https://mediawiki.org/wiki/${query.replace(/(<|>|(_|)noembed)?/g, '')}>`
        message.channel.send(link)
    }
}