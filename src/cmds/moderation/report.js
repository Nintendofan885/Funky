const Command = require('../../structs/command.js');
const Discord = require('discord.js')

module.exports = class ReportCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'report',
            aliases: ['r'],
            description: 'Reports naughty users.',
            category: 'Moderation'
        });
    }

    async run(message, args) {
        message.delete();
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        const reason = args.slice(1).join(' ');
        const reports = message.guild.channels.cache.find(channel => channel.name === 'server-reports');

        if (!target) return message.reply('please specify a member to report!');
        if (!reason) return message.reply('please specify a reason for this report!');
        if (!reports) return message.reply(`please create a channel called \`#server-reports\` to log the reports!`);

        let embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(target.user.avatarURL)
            .setTitle('User report')
            .addField('Reported member', `${target.user} with an ID: ${target.user.id}`)
            .addField('Reported by', `${message.author} with an ID: ${message.author.id}`)
            .addField('Reported time', message.createdAt)
            .addField('Reported in', `${message.channel}`)
            .addField('Report reason', reason)
            .setFooter('Reported user information', target.user.displayAvatarURL);

        message.channel.send(`Report successful. Please be patient while a moderator reviews it.`).then(msg => msg.delete({ timeout: 2000 }));
        reports.send(embed).then(msg => {
            msg.react('✅')
            msg.react('❌')
        }).catch(console.error);
    }
}