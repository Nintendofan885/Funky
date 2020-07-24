const Command = require('../../structs/command.js');
const Discord = require('discord.js');

module.exports = class DJSCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'spotify',
            aliases: ['spot'],
            description: 'Shows info on a user\'s current Spotify stream.',
            category: 'Other',
            usage: '[user]'
        });
    }

    async run(message, args) {
        try {
            const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

            const presence = member.presence.activities
            if (!presence) return message.reply('that user isn\'t listening to Spotify!')
            const spotify = member.presence.activities.find(spotify => spotify.name === "Spotify") || presence.find(spotify => spotify.type === "LISTENING")
            if (!spotify) return message.reply(`${member.user.username} isn\'t listening to Spotify!`)
            const trackIMG = spotify.assets.largeImageURL()
            const trackURL = `https://open.spotify.com/track/${spotify.syncID}`
            const trackName = spotify.details
            const trackAlbum = spotify.assets.largeText
            const trackAuthor = spotify.state

            const embed = new Discord.MessageEmbed()
                .setAuthor('Spotify Track Info', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png')
                .setTitle(`${trackName}`)
                .setColor('#1DB954')
                .setThumbnail(trackIMG)
                .addField('Author', trackAuthor)
                .addField('Album', trackAlbum)
                .addField('Link', `[Listen along](${trackURL})`)
                .setFooter(`${member.user.username} is listening to ${trackName}.`)

            message.channel.send(embed)
        } catch (err) {
            message.channel.send(`Error occurred while fetching information: ${err}`)
        }
    }
}