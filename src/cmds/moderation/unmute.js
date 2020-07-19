const Command = require('../../structs/command.js');

module.exports = class UnmuteCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'unmute',
            aliases: ['unm', 'unmutemember'],
            description: 'Unmutes users.',
            category: 'Moderation'
        });
    }

    async run(message, args) {
        const muteRole = message.guild.roles.cache.find(muteRole => muteRole.name === 'Muted');
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        if (!member) return message.reply('who am I going to mute, huh?')
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("uh, I don't have the permission to manage roles, so how am I going to mute that user?").then(msg => msg.delete({ timeout: 5000 })).catch(console.error);
        if (!member.roles.cache.some(role => role.name === 'Muted')) return message.reply('that user isn\'t even muted, bro.').catch(console.error)

        if (message.member.hasPermission(['MANAGE_MESSAGES', 'MANAGE_ROLES'])) {
            member.roles.remove(muteRole).then(msg => {
                message.channel.send(`Successfuly unmuted ${member}!`).catch(console.error)
            });
        } else {
            return message.reply('bro, you do not have the perms to do this.').catch(console.error)
        }
    }
}