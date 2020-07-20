const Command = require('../../structs/command.js');
const moment = require('moment-timezone');
const Discord = require('discord.js');

module.exports = class TimeCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'time',
            aliases: ['timezone', 'timein'],
            description: 'Converts time to specified timezones.',
            category: 'Other',
            usage: '<timezone>'
        });
    }

    async run(message, args) {
        if (!args[0]) {
            await message.channel.send(`Invalid arguments. Please refer to ${this.client.commands.get('time').usage} for how to use this command.`);
        } else {
            const zone = moment.tz.zone(args[0]);
            if (!zone) {
                await message.channel.send(`Hmmm.... the \`${args.join(' ')}\` timezone doesn't seem to exist. Check your spelling!`);
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(`It's currently **${moment().tz(args[0]).format("HH:mm")}** in the **${args[0]}** timezone. ⏰`)
                    .setTimestamp()
                await message.channel.send(embed);
            }
        }
    }
}