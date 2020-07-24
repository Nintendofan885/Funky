const Command = require('../../structs/command.js');

module.exports = class MuteCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'mute',
            aliases: ['m', 'mutemember'],
            description: 'Mutes naughty users.',
            category: 'Moderation'
        });
    }

    async run(message, args) {
        const muteRole = message.guild.roles.cache.find(muteRole => muteRole.name === 'Muted');
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        try {
            if (muteRole.rawPosition > message.guild.me.roles.highest.rawPosition) return message.reply(`uh, the \`Muted\` role is above me in the role hierachy, move it below my role, then try again.`)
            if (!member) return message.reply('who am I going to mute, huh?')
            if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.reply("uh, I don't have the permission to manage roles, so how am I going to mute that user?").then(msg => msg.delete({ timeout: 5000 })).catch(console.error);
            if (member.roles.cache.some(role => role.name === 'Muted')) return message.reply('that user is already muted. how many more times are you trying to mute them?')

            if (message.member.hasPermission(['MANAGE_MESSAGES', 'MANAGE_ROLES'])) {
                member.roles.add(muteRole).then(msg => {
                    message.channel.send(`Successfuly muted ${member}!`)
                });
            } else {
                return message.reply('bro, you do not have the perms to do this.')
            }
        } catch (err) {
            console.log(err)
        }
    }
}