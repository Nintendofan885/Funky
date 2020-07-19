const Command = require('../../structs/command.js');

module.exports = class PurgeCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'purge',
            aliases: ['clear', 'nuke'],
            description: 'Purges number of messages in current channel.',
            category: 'Moderation'
        });
    }

    async run(message, args) {
        try {
            message.delete().then(() => {

                // Member doesn't have permissions
                if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                    return message.reply("you can't delete messages, so why make me?").then(msg => msg.delete({ timeout: 5000 })).catch(console.error);
                }

                // Check if args[0] is a number
                if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                    return message.reply("yeah.... That's not a number? I also can't delete 0 messages by the way.").then(msg => msg.delete({ timeout: 5000 })).catch(console.error);
                }

                // Maybe the bot can't delete messages
                if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                    return message.reply("sorry... I can't delete messages.").then(msg => msg.delete({ timeout: 5000 })).catch(console.error);
                }

                let deleteAmount;

                if (parseInt(args[0]) > 100) {
                    deleteAmount = 100;
                } else {
                    deleteAmount = parseInt(args[0]);
                }

                message.channel.bulkDelete(deleteAmount, true)
                    .then(deleted => message.channel.send(`Successfuly deleted \`${deleted.size}\` messages.`).then(msg => msg.delete({ timeout: 3000 }))).catch(console.error);
            });
        } catch (err) {
            console.log(err)
        }
    }
}