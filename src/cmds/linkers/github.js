const Command = require('../../structs/command.js');

module.exports = class GitHubCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'github',
            aliases: ['gh'],
            description: 'Links to a GitHub profile.',
            category: 'Linkers',
            usage: '<search query> [noembed]'
        });
    }

    async run(message, args) {
        const query = args.join(' ')
        if (!args.length) return message.reply('uh, which github page/profile do you wish for me to link to?').then(m => m.delete({ timeout: 3000 }))
        let link = `https://github.com/${query}`
        if (query.startsWith('<') && query.endsWith('>') || query.includes('noembed')) link = `<https://github.com/${query.replace(/(<|>|(_|)noembed)?/g, '')}>`
        message.channel.send(link)
    }
}