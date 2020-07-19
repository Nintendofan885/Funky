const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');
const Command = require('../../structs/command.js');
const { utc } = require('moment');

module.exports = class BotInfoCommand extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['binfo'],
            description: 'Displays information about the bot.',
            category: 'Information',
            usage: ''
        });
    }

    run(message) {
        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTitle('Bot Info')
            .setColor(message.guild.me.displayHexColor || 'BLUE')
            .addField('General', [
                `**❯ Client:** ${this.client.user.tag} (${this.client.user.id})`,
                `**❯ Commands:** ${this.client.commands.size}`,
                `**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()} `,
                `**❯ Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
                `**❯ Creation Date:** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                `**❯ Version:** v${version}`,
                `**❯ Discord.js:** v${djsversion}`,
                `**❯ Operator:** <@!${this.client.owners}>`,
            ])
            .setTimestamp();

        message.channel.send(embed).catch(console.error);
    }

};