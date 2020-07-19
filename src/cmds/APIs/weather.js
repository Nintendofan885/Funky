const Command = require('../../structs/command.js');
const weather = require('weather-js');
const Discord = require('discord.js')

module.exports = class WeatherCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'weather',
            aliases: [],
            description: 'Weather of a provided city.',
            category: 'APIs',
            usage: '<city>'
        });
    }

    async run(message, args) {
        if (!args) return message.reply('please enter a city name!')

        weather.find({ search: args.join(' '), degreeType: 'C' }, function (err, result) {

            if (err) message.channel.send(err.message);

            if (result.length === 0) {
                message.reply('**please enter a valid location\'s name')
                return undefined;
            }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor('RANDOM')
                .addField('**Timezone**', `UTC ${location.timezone}`, true)
                .addField('**Degree Type**', `${location.degreetype}`, true)
                .addField('**Temperature**', `${current.temperature} Degrees`, true)
                .addField('**Feels Like**', `${current.feelslike} Degrees`, true)
                .addField('**Winds**', `${current.winddisplay}`, true)
                .addField('**Humidity**', `${current.humidity}%`, true)
                .addField('**Date**', `${current.date}`, true)
                .addField('**Day**', `${current.day}`, true)
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            message.channel.send(embed)
        });
    }
}