const Command = require('../../structs/command.js');

module.exports = class SayCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'say',
            aliases: ['echo'],
            description: 'Echo\'s users\' arguments',
            category: 'Fun',
            usage: '<text>'
        });
    }

    async run(message, args) {
        message.delete();
        let mChannel = message.mentions.channels.first()
        let response;

        if (mChannel) {
            response = args.slice(1).join(' ');
            mChannel.send(response)
        } else {
            response = args.join(' ');
            message.channel.send(response)
        }
    }
}