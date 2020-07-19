const Command = require('../../structs/command.js');
const Discord = require('discord.js');
const fetch = require('node-fetch')

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
            message.channel.startTyping();
            const houseID = '5a05e2b252f721a3cf2ea33f'
            const houseApi = await fetch(`https://www.potterapi.com/v1/houses/${houseID}?key=$2a$10$ZEsnB19Cqqbm/7eUSpukYOpLdn8VH5tGE.LqFB2QQghnzOj7mTmiC`).then(response => response.json())
            const data = JSON.stringify(houseApi)
            const obj = JSON.parse(data)
            const embed = new Discord.MessageEmbed()
                .setTitle('Gryffindor\'s Info')
                .setThumbnail('https://vignette.wikia.nocookie.net/harrypotter/images/b/b1/Gryffindor_ClearBG.png')
                .setColor('#740001')
                .addFields(
                    { name: 'Mascot', value: this.client.utils.capitalise(obj[0].mascot) },
                    { name: 'Head of House', value: obj[0].headOfHouse },
                    { name: 'House Ghost', value: obj[0].houseGhost },
                    { name: 'Founder', value: obj[0].founder },
                    { name: 'Values', value: obj[0].values },
                    { name: 'Colours', value: obj[0].colors }
                )
                .setTimestamp()
            message.channel.send(embed).then(() => message.channel.stopTyping());

        } else if (query === this.client.utils.capitalise('slytherin')) {
            message.channel.startTyping();
            const houseID = '5a05dc8cd45bd0a11bd5e071'
            const houseApi = await fetch(`https://www.potterapi.com/v1/houses/${houseID}?key=$2a$10$ZEsnB19Cqqbm/7eUSpukYOpLdn8VH5tGE.LqFB2QQghnzOj7mTmiC`).then(response => response.json())
            const data = JSON.stringify(houseApi)
            const obj = JSON.parse(data)
            const embed = new Discord.MessageEmbed()
                .setTitle('Slytherin\'s Info')
                .setThumbnail('https://vignette.wikia.nocookie.net/harrypotter/images/0/00/Slytherin_ClearBG.png')
                .setColor('#2a623d')
                .addFields(
                    { name: 'Mascot', value: this.client.utils.capitalise(obj[0].mascot) },
                    { name: 'Head of House', value: obj[0].headOfHouse },
                    { name: 'House Ghost', value: obj[0].houseGhost },
                    { name: 'Founder', value: obj[0].founder },
                    { name: 'Values', value: obj[0].values },
                    { name: 'Colours', value: obj[0].colors }
                )
                .setTimestamp().then(() => message.channel.stopTyping());
            message.channel.send(embed)
        } else if (query === this.client.utils.capitalise('ravenclaw')) {
            message.channel.startTyping();
            const houseID = '5a05da69d45bd0a11bd5e06f'
            const houseApi = await fetch(`https://www.potterapi.com/v1/houses/${houseID}?key=$2a$10$ZEsnB19Cqqbm/7eUSpukYOpLdn8VH5tGE.LqFB2QQghnzOj7mTmiC`).then(response => response.json())
            const data = JSON.stringify(houseApi)
            const obj = JSON.parse(data)
            const embed = new Discord.MessageEmbed()
                .setTitle('Ravenclaw\'s Info')
                .setThumbnail('https://vignette.wikia.nocookie.net/harrypotter/images/4/4e/RavenclawCrest.png')
                .setColor('#222f5b')
                .addFields(
                    { name: 'Mascot', value: this.client.utils.capitalise(obj[0].mascot) },
                    { name: 'Head of House', value: obj[0].headOfHouse },
                    { name: 'House Ghost', value: obj[0].houseGhost },
                    { name: 'Founder', value: obj[0].founder },
                    { name: 'Values', value: obj[0].values },
                    { name: 'Colours', value: obj[0].colors }
                )
                .setTimestamp()
            message.channel.send(embed).then(() => message.channel.stopTyping());
        } else if (query === this.client.utils.capitalise('hufflepuff')) {
            message.channel.startTyping();
            const houseID = '5a05dc58d45bd0a11bd5e070'
            const houseApi = await fetch(`https://www.potterapi.com/v1/houses/${houseID}?key=$2a$10$ZEsnB19Cqqbm/7eUSpukYOpLdn8VH5tGE.LqFB2QQghnzOj7mTmiC`).then(response => response.json())
            const data = JSON.stringify(houseApi)
            const obj = JSON.parse(data)
            const embed = new Discord.MessageEmbed()
                .setTitle('Hufflepuff\'s Info')
                .setThumbnail('https://vignette.wikia.nocookie.net/harrypotter/images/0/06/Hufflepuff_ClearBG.png')
                .setColor('#ecb939')
                .addFields(
                    { name: 'Mascot', value: this.client.utils.capitalise(obj[0].mascot) },
                    { name: 'Head of House', value: obj[0].headOfHouse },
                    { name: 'House Ghost', value: obj[0].houseGhost },
                    { name: 'Founder', value: obj[0].founder },
                    { name: 'Values', value: obj[0].values },
                    { name: 'Colours', value: obj[0].colors }
                )
                .setTimestamp()
            message.channel.send(embed).then(() => message.channel.stopTyping());
        } else {
            if (!query) query = 'Harry Potter'
            if (query === 'Ron Weasley') query = 'Ronald Weasley'
            if (query === 'Voldemort') query = 'Tom Riddle'
            message.channel.startTyping();
            const character = await fetch(`https://www.potterapi.com/v1/characters?name=${encodeURIComponent(query)}&key=$2a$10$ZEsnB19Cqqbm/7eUSpukYOpLdn8VH5tGE.LqFB2QQghnzOj7mTmiC`).then(response => response.json());
            if (!character.length) return message.channel.send('no results were found :(\nthis is case-sensitive, so **check your spelling!**').then(() => message.channel.stopTyping());

            const data = JSON.stringify(character)
            const obj = JSON.parse(data)

            const embed = new Discord.MessageEmbed()
                .setTitle(`${obj[0].name}'s Info`)
                .setColor('RANDOM')
                .setTimestamp()

            if (obj[0].alias) embed.addField('Alias', obj[0].alias)
            if (obj[0].house) embed.addField('House', obj[0].house)
            if (obj[0].school) embed.addField('School', obj[0].school)
            if (obj[0].bloodStatus) embed.addField('Blood status', this.client.utils.capitalise(obj[0].bloodStatus))
            if (obj[0].patronus) embed.addField('Patronus', this.client.utils.capitalise(obj[0].patronus))
            if (obj[0].wand) embed.addField('Wand', obj[0].wand)

            message.channel.send(embed).then(() => message.channel.stopTyping());
        }
    }
}