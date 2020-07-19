const Command = require('../../structs/command.js');

module.exports = class PingCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ping',
            aliases: ['pong'],
            description: 'Pings the bot.',
            category: 'Fun',
            usage: ''
        });
    }

    async run(message) {
        const msg = await message.channel.send(`:ping_pong: Pinging...`);
        msg.edit(`:ping_pong: Pong!\nTook ${msg.createdAt - message.createdAt}ms.`);
    }
}