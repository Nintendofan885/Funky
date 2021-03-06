const Command = require('../../structs/command.js')
const { imgen_api } = require('../../../config.json')
const ameClient = require('amethyste-api')
const ameApi = new ameClient(imgen_api)
const Discord = require('discord.js')

module.exports = class JailCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: 'jail',
            aliases: ['prison'],
            description: 'Sends image of a given user in jail.',
            category: 'Image',
            usage: '[user]'
        });
    }

    async run(message, args) {
        try {
            const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
            const msg = await message.channel.send('please wait...');
            const genImage = await ameApi.generate("jail", { url: member.user.displayAvatarURL({ format: "png", size: 1024 }) });
            const attachment = new Discord.MessageAttachment(genImage, "jail.png");
            message.channel.send(attachment).then(() => msg.delete());
        } catch (err) {
            console.log(err)
        }
    }
}