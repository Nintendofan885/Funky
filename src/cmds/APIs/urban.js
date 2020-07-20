const Command = require('../../structs/command.js');
const queryString = require('querystring')
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = class UrbanCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'urban',
            aliases: ['ud'],
            description: 'Searches Urban Dictionary.',
            category: 'APIs',
            usage: '<query>'
        });
    }

    async run(message, args) {
        //if no args are provided (so just $urban), return and notify user.
        if (!args.length) return message.channel.send('You need to supply a search term!');

        //make args url-friendly
        const query = queryString.stringify({ term: args.join(' ') });

        //pull answers from urban dictionary api
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

        //if no answers were found, return and notify user.
        if (!list.length) return message.channel.send(`No results found for **${args.join(' ')}**.`);

        //trim content to meet embed character size requirements
        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        //we only want one answer
        const [answer] = list;

        //make embed with data pulled from api
        const embed = new Discord.MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `:thumbsup: ${answer.thumbs_up} thumbs up.\n\n:thumbsdown: ${answer.thumbs_down} thumbs down.` }
            );

        //send embed.
        message.channel.send(embed).catch(console.error);
    }
}