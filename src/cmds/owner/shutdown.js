const Command = require('../../structs/command.js');

module.exports = class ShutdownCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'shutdown',
            aliases: ['sd'],
            description: 'Kills the bot.',
            category: 'Owner',
            usage: ''
        });
    }

    async run(message) {
        if (!message.author.id === this.client.owners) return message.reply('you do not have permission to do this.')
        const newMessage = await message.channel.send("Are you sure you want shutdown the **entire** bot?");
        newMessage.react('👍').then(() => newMessage.react('👎'));

        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        newMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(async collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '👍') {
                    await message.reply("bot is shutting down.");
                    process.exit();
                } else {
                    message.channel.send("let's pretend that didn't happen.").then(m => {
                        m.delete({ timeout: 3000 })
                    });
                }
            })
            .catch(collected => {
                message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
            });
    }
}