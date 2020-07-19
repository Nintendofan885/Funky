const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
}

const Command = require('../../structs/command.js');
const Discord = require('discord.js')

module.exports = class UICommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'userinfo',
            aliases: ['ui', 'uinfo', 'whois'],
            description: 'Sends an embed with a user\'s basic info.',
            category: 'Information',
            usage: '[user]'
        });
    }

    async run(message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = member.user.flags.toArray();

        if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
        if (member.presence.status === 'online') member.presence.status = 'Online';
        if (member.presence.status === 'idle') member.presence.status = 'Idle';
        if (member.presence.status === 'offline') member.presence.status = 'Offline';
        const status = member.presence.status;

        const embed = new Discord.MessageEmbed()
            .setTitle(`${member.user.username}'s Info`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: `Roles (${roles.length})`, value: roles },
                { name: 'Status', value: status },
                { name: 'Avatar', value: `[Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})` },
                { name: 'Flags', value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : '*none*'}` }
            )
            .setColor(member.displayHexColor || '#FF0000')
        return message.channel.send(embed)
            .catch(console.error);
    }
}