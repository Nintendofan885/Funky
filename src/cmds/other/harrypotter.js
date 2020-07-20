const Command = require('../../structs/command.js');
const Discord = require('discord.js');
const fetch = require('node-fetch')
const { harrypotter_api } = require('../../../config.json')
let houseID;
const houseURL = 'https://www.potterapi.com/v1/houses/'

module.exports = class HPCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'harrypotter',
            aliases: ['hp', 'potter'],
            description: 'Sends info about a given Harry Potter character or house.',
            category: 'Other',
            usage: '<character> OR <house>'
        });
    }

    async run(message, args) {
        let query = this.client.utils.capitalise(args.join(' '));

        if (query === this.client.utils.capitalise('gryffindor')) {
            message.channel.startTyping()
            houseID = '5a05e2b252f721a3cf2ea33f'
            const houseApi = await fetch(`${houseURL}${houseID}?key=${harrypotter_api}`).then(response => response.json())

            const embed = new Discord.MessageEmbed()
                .setTitle('Gryffindor\'s Info')
                .setThumbnail('https://vignette.wikia.nocookie.net/harrypotter/images/b/b1/Gryffindor_ClearBG.png')
                .setColor('#740001')
                .addFields(
                    { name: 'Mascot', value: this.client.utils.capitalise(houseApi[0].mascot) },
                    { name: 'Head of House', value: houseApi[0].headOfHouse },
                    { name: 'House Ghost', value: houseApi[0].houseGhost },
                    { name: 'Founder', value: houseApi[0].founder },
                    { name: 'Values', value: houseApi[0].values },
                    { name: 'Colours', value: houseApi[0].colors }
                )
                .setTimestamp()
            message.channel.send(embed).then(() => message.channel.stopTyping());

        } else if (query === this.client.utils.capitalise('slytherin')) {
            message.channel.startTyping();
            houseID = '5a05dc8cd45bd0a11bd5e071'
            const houseApi = await fetch(`${houseURL}${houseID}?key=${harrypotter_api}`).then(response => response.json())

            const embed = new Discord.MessageEmbed()
                .setTitle('Slytherin\'s Info')
                .setThumbnail('https://vignette.wikia.nocookie.net/harrypotter/images/0/00/Slytherin_ClearBG.png')
                .setColor('#2a623d')
                .addFields(
                    { name: 'Mascot', value: this.client.utils.capitalise(houseApi[0].mascot) },
                    { name: 'Head of House', value: houseApi[0].headOfHouse },
                    { name: 'House Ghost', value: houseApi[0].houseGhost },
                    { name: 'Founder', value: houseApi[0].founder },
                    { name: 'Values', value: houseApi[0].values },
                    { name: 'Colours', value: houseApi[0].colors }
                )
                .setTimestamp().then(() => message.channel.stopTyping());
            message.channel.send(embed)
        } else if (query === this.client.utils.capitalise('ravenclaw')) {
            message.channel.startTyping();
            houseID = '5a05da69d45bd0a11bd5e06f'
            const houseApi = await fetch(`${houseURL}${houseID}?key=${harrypotter_api}`).then(response => response.json())

            const embed = new Discord.MessageEmbed()
                .setTitle('Ravenclaw\'s Info')
                .setThumbnail('https://vignette.wikia.nocookie.net/harrypotter/images/4/4e/RavenclawCrest.png')
                .setColor('#222f5b')
                .addFields(
                    { name: 'Mascot', value: this.client.utils.capitalise(houseApi[0].mascot) },
                    { name: 'Head of House', value: houseApi[0].headOfHouse },
                    { name: 'House Ghost', value: houseApi[0].houseGhost },
                    { name: 'Founder', value: houseApi[0].founder },
                    { name: 'Values', value: houseApi[0].values },
                    { name: 'Colours', value: houseApi[0].colors }
                )
                .setTimestamp()
            message.channel.send(embed).then(() => message.channel.stopTyping());
        } else if (query === this.client.utils.capitalise('hufflepuff')) {
            message.channel.startTyping();
            houseID = '5a05dc58d45bd0a11bd5e070'
            const houseApi = await fetch(`${houseURL}${houseID}?key=${harrypotter_api}`).then(response => response.json())
            const embed = new Discord.MessageEmbed()
                .setTitle('Hufflepuff\'s Info')
                .setThumbnail('https://vignette.wikia.nocookie.net/harrypotter/images/0/06/Hufflepuff_ClearBG.png')
                .setColor('#ecb939')
                .addFields(
                    { name: 'Mascot', value: this.client.utils.capitalise(houseApi[0].mascot) },
                    { name: 'Head of House', value: houseApi[0].headOfHouse },
                    { name: 'House Ghost', value: houseApi[0].houseGhost },
                    { name: 'Founder', value: houseApi[0].founder },
                    { name: 'Values', value: houseApi[0].values },
                    { name: 'Colours', value: houseApi[0].colors }
                )
                .setTimestamp()
            message.channel.send(embed).then(() => message.channel.stopTyping());
        } else {
            if (!query) query = 'Harry Potter'
            if (query === 'Ron Weasley') query = 'Ronald Weasley'
            if (query === 'Voldemort') query = 'Tom Riddle'
            message.channel.startTyping();
            const character = await fetch(`https://www.potterapi.com/v1/characters?name=${encodeURIComponent(query)}&key=${harrypotter_api}`).then(response => response.json());
            if (!character.length) return message.channel.send('no results were found :(\nthis search is case-sensitive, so **check your spelling!**').then(() => message.channel.stopTyping());

            const embed = new Discord.MessageEmbed()
                .setTitle(`${character[0].name}'s Info`)
                .setColor('RANDOM')
                .setTimestamp()

            if (character[0].alias) embed.addField('Alias', character[0].alias)
            if (character[0].house) embed.addField('House', character[0].house)
            if (character[0].school) embed.addField('School', character[0].school)
            if (character[0].bloodStatus) embed.addField('Blood status', this.client.utils.capitalise(character[0].bloodStatus))
            if (character[0].patronus) embed.addField('Patronus', this.client.utils.capitalise(character[0].patronus))
            if (character[0].wand) embed.addField('Wand', character[0].wand)

            message.channel.send(embed).then(() => message.channel.stopTyping());
        }
    }
}