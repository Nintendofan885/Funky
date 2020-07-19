const Command = require('../../structs/command.js');
const fetch = require('node-fetch');

module.exports = class DJSCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'djs',
            aliases: ['docs'],
            description: 'Sends results from Discord.js docs.',
            category: 'Other',
            usage: '<search query>'
        });
    }

    async run(message, args) {
        // Define what the search query is, most likely, that would be args.join(' ')
        const query = args.join(' ');
        // You can construct a url from that, using this REST API
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;
        //So the user doesn't think the bot isn't working
        message.channel.startTyping();
        // We need to fetch that url
        fetch(url)
            // Get the JSON response
            .then(res => res.json())
            .then(embed => {
                // The request was make successfull, now let's see if there was a result found
                if (embed && !embed.error) {
                    // Yes there was, let's send it!
                    message.channel.send({ embed }).then(() => message.channel.stopTyping());
                } else {
                    // Nope, no results found, let's let the user know
                    return message.reply(`I don't know mate, but "${query}" doesn't make any sense!`).then(() => message.channel.stopTyping());
                }
            })
            .catch(e => {
                // Whoops, some error occured, let's log it and notify the user
                console.error(e);
                return message.reply('Darn it! I failed!').then(() => message.channel.stopTyping());
            })
    }
}