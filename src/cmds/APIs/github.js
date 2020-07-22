const Command = require('../../structs/command.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = class GitHubChannelInfoCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'github',
            aliases: ['git'],
            description: 'Pulls data for a specified account on GitHub.',
            category: 'APIs',
            usage: '<user>'
        });
    }

    async run(message, args) {
        if (!args.join('-')) return message.channel.send('Please provide a valid user');

        fetch(`https://api.github.com/users/${args.join('-')}`)
            .then(res => res.json()).then(body => {
                if (body.message) return message.channel.send(`The user: \`${args.join(' ')}\` wasn't found.`);
                let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

                const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(`${login}'s GitHub Account Info`, avatar_url)
                    .setThumbnail(avatar_url)
                    .setDescription(`**Name**: \`${name || 'Unknown'}\`
        **ID**: ${id || 'Unknown'}
        **Link**: **[Click here](${html_url})**
        **Repositories**: \`${public_repos || 0}\`
        **Followers**: \`${followers || 0}\`
        **Folllowing**: \`${following || 0}\`
        **Location**: \`${location || 'In the dark'}\`
        **Created At**: \`${new Date(created_at).toLocaleString('en-GB', { dateStyle: 'full' }) || 'Unknown'}\`
        **Bio**: ${bio || 'A github user making great things.'}`)
                message.channel.send(embed);
            });
    }
}

