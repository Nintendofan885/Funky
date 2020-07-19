const Command = require('../../structs/command.js');
const Discord = require('discord.js');

module.exports = class HTTPCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'http',
            aliases: ['error'],
            description: 'Pictures of all HTTP errors, with cats!',
            category: 'APIs',
            usage: '<status code>'
        });
    }

    async run(message, args) {
        //if no args are provided, return and remind user.
        if (!args.length) return message.channel.send(`Invalid arguments. Please refer to \`${this.client.commands.get('http').usage}\` for how to use this command.`);
        //list of all valid status codes
        const validCodes = [100, 101, 102, 103, 200, 202, 203, 204, 205, 206, 207, 300, 301, 302, 303, 304, 305, 306, 307, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 422, 423, 424, 425, 426, 449, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510]

        //check if user-provided args are valid status codes. if they are, send embed with img. if not, return and notify user.
        if (validCodes.includes(parseInt(args))) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`HTTP Error ${args}`)
                .setImage(`https://http.cat/${args}.jpg`)
            message.channel.send(embed).catch(console.error);
        }
        else {
            return message.reply(`404: Status code \`${args}\` not found.`).catch(console.error);
        }
    }
}