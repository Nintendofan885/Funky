const Command = require('../../structs/command.js');

module.exports = class BanCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ban',
            aliases: ['banuser', 'banmember'],
            description: 'Bans naughty users.',
            category: 'Moderation'
        });
    }

    async run(message, args) {
        if (message.member.hasPermission('BAN_MEMBERS')) {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

            member.ban().then((member) => {
                message.channel.send(":wave: " + member.displayName + " has been banned!")

            }).catch(() => {
                if (!message.member.hasPermission('BAN_MEMBERS')) {
                    message.reply("You cannot ban members.");
                } else if (member.hasPermission(['BAN_MEMBERS'])) {
                    message.reply("You cannot ban this member.");
                }
            })
        }
    }
}