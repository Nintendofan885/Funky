const Command = require('../../structs/command.js');
const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = class InstaCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'insta',
            aliases: ['ig', 'instagram'],
            description: 'Pulls data for a specified Instagram account.',
            category: 'APIs',
            usage: '<user>'
        });
    }

    async run(message, args) {
        //makes bot start typing to let the user know that the bot is alive (api request is slow)
        message.channel.startTyping();

        //define user
        const user = args.join('_')

        //pulls data from api and format to JSON
        const acc = await fetch(`https://apis.duncte123.me/insta/${user}`).then(response => response.json());
        if (!args[0]) return message.channel.send(`Invalid arguments. Please refer to \`${this.client.commands.get('insta').usage}\` for how to use this command.`)
        if (acc.success === false) return message.channel.send('error occurred while fetching data for that username, check your spelling!')
        //make embed with data provided by api
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${acc.user.username}'s Instagram Account Info`, acc.user.profile_pic_url)
            .setThumbnail(acc.user.profile_pic_url)
            .setDescription(`**Username**: \`${acc.user.username}\`
        **Link**: [Click here](https://instagram.com/${user})
        **Name**: ${acc.user.full_name || 'none'}
        **Private Account?**: ${acc.user.is_private ? '\`True\`' : '\`False\`'}
        **Verified?**: ${acc.user.is_verified ? '\`True\`' : '\`False\`'}
        **Bio**: ${acc.user.biography || 'none'}
        **Followers**: \`${acc.user.followers.count || 0}\`
        **Folllowing**: \`${acc.user.following.count || 0}\`
        **Posts**: \`${acc.user.uploads.count}\`
        `)
            .setTimestamp()
        //send embed then stop typing.
        message.channel.send(embed)
        message.channel.stopTyping();
    }
}