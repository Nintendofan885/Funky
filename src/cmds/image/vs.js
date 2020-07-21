const Command = require('../../structs/command.js')
const { imgen_api } = require('../../../config.json')
const ameClient = require('amethyste-api')
const ameApi = new ameClient(imgen_api)
const Discord = require('discord.js')

module.exports = class VSCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'vs',
            aliases: ['verses'],
            description: '1 v 1.',
            category: 'Image',
            usage: '<user1> <user2>'
        });
    }

    async run(message, args) {
        try {
            const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
            const member2 = await message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(" ") || x.user.username === args[1]);
            if (!member2) return message.reply(`who is ${member.user.username} gonna verse?`)
            if (!member && member2) return message.reply(`I could not find that first member, but that second member exists!`)
            if (member && !member2) return message.reply(`I could not find that second member, but that first member exists!`)
            if (!args.length) return message.reply(`missing arguments. Proper usage of this command is \`${this.client.commands.get('vs').usage}\``)
            const msg = await message.channel.send('please wait...');
            const genImg = await ameApi.generate('vs', { url: member.user.displayAvatarURL({ format: 'png', size: 1024 }), avatar: member2.user.displayAvatarURL({ format: 'png', size: 1024 }), type: 3 })
            const attachment = new Discord.MessageAttachment(genImg, 'vs.png');
            message.channel.send(attachment).then(() => msg.delete());
        } catch (err) {
            console.log(err)
        }
    }
}