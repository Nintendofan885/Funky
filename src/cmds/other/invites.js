const Command = require('../../structs/command.js');
const Discord = require('discord.js');

module.exports = class InvitesCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'invites',
            aliases: [],
            description: 'Stats on how many members a given user has invited.',
            category: 'Other',
            usage: '[user]'
        });
    }

    async run(message, args) {
        try {
            const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

            const invites = await message.guild.fetchInvites()

            const memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);

            if (memberInvites.size <= 0) {
                return message.channel.send(`${member.displayName} hasn't invited anyone to this server.`, (member === message.member ? null : member));
            }

            let inviteCodes = memberInvites.map(i => i.code).join("\n");
            let index = 0;
            memberInvites.forEach(invite => index += invite.uses);

            const embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setFooter(message.guild.name, message.guild.iconURL())
                .setAuthor(`Invite Tracker for ${message.guild.name}`)
                .setDescription(`Information on invites of ${member}.`)
                .addField("**No. of Invited Persons**", index)
            if (message.member.hasPermission('CREATE_INSTANT_INVITE')) embed.addField("Invitation Codes\n\n", inviteCodes);
            message.channel.send(embed);
        } catch (e) {
            return message.channel.send(e.message)
        }
    }
}