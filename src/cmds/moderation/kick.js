const Command = require('../../structs/command.js');

module.exports = class KickCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'kick',
            aliases: ['kickuser', 'kickmember'],
            description: 'Kicks naughty users.',
            category: 'Moderation'
        });
    }

    async run(message, args) {
        if (message.member.hasPermission('KICK_MEMBERS')) {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
            if (!message.mentions.users.size) {
                return message.reply('silly goose! You need to mention a user in order to kick them!');
            }

            member.kick().then((member) => {
                message.channel.send(`:wave: ${member.displayName} has been kicked!`)

            }).catch(() => {
                if (!message.member.hasPermission('KICK_MEMBERS')) {
                    return message.reply("you cannot kick members.");
                } else if (member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])) {
                    return message.reply("you cannot kick this member.");
                }
            }).catch(err => console.log(err))
        }
    }
}