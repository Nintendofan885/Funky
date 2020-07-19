const Command = require('../../structs/command.js');
const Discord = require('discord.js')

module.exports = class EmbedCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'wt',
            aliases: ['wtemb'],
            description: 'Command for the embeds in Wikitubia Discord.',
            category: 'Owner',
            usage: ''
        });
    }

    async run(message) {
        if (message.guild.id !== 390342113042366465) return message.reply('sorry, that command can only be used in limited servers.')
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.delete();
            const welcome = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Welcome to Wikitubia Discord!')
                .addFields(
                    { name: 'Here\'s all the basic rules and information for our server!', value: 'Wikitubia is an unofficial wiki run by fans collecting information about their favorite YouTubers.\nCheck our wiki out [here](https://youtube.fandom.com/wiki/YouTube_Wiki).' },
                    { name: 'Invite your friends (and family)!', value: '[https://discord.gg/FXmZKmw](https://discord.gg/FXmZKmw)' }
                )
                .setImage('https://vignette.wikia.nocookie.net/youtube/images/b/bc/Wiki.png');
            const faq = new Discord.MessageEmbed()
                .setTitle('FAQ')
                .setColor('#FF0000')
                .addFields(
                    { name: 'I\'m new here, what can I do?', value: 'Talk about YouTube and the wiki about it, Wikitubia! Keep in mind the rules before chatting in our channels.' },
                    { name: 'I\'m a YouTuber, how can I show that to everyone else here?', value: 'We have a role just for that! Leave a message asking for it in <#719355973440897035>, and **be patient**! Please note that you will need to [connect](https://support.discord.com/hc/en-us/articles/215162978-Youtube-Channel-Memberships-Integration-FAQ) your YouTube channel to your Discord account so we can verify that it is actually yours.' },
                    { name: 'Where can I get editing help for the wiki?', value: 'Right here! Please read the [editing tutorial](https://youtube.fandom.com/wiki/Wikitubia:Editing_tutorial) first, and if you aren\'t satisfied, drop a message in one of our support channels!' },
                    { name: 'I wanna promote my content here, where can I do that?', value: 'In our promotion channel, <#392100616824160257>. Note that excessive advertising will lead to a mute or ban.' }
                )
            const roles = new Discord.MessageEmbed()
                .setTitle('Roles')
                .setColor('#FF0000')
                .addFields(
                    { name: 'Wikitubia Friends', value: 'Wikitubia Friends is a role server staff can hand out to users who frequent the server and help other users when needed.' },
                    { name: 'Elite Wiki Frens', value: 'Elite Wiki Frens is a special role given to users who have been part of the Wikitubia community for an extended period time. You can often find these users helping others in support channels.' },
                    { name: 'Verified', value: 'Users who have verifed their wiki account using the \`!wiki verify\` command in <#722001239864246363>.' },
                    { name: 'Wiki Editor', value: 'Users who have garnered over a hundred edits on the wiki. This role is automatically given to you through <#722001239864246363>, if you meet the requirements.' }
                )
            const rules = new Discord.MessageEmbed()
                .setTitle('Rules')
                .setColor('#FF0000')
                .addFields(
                    { name: 'Rule 1 - No hate speech or trolling.', value: 'Harassment, hate speech, homophobia, racism, sexism, ableism, and trolling are not allowed here, including the use of racial or homophobic slurs. This server has a zero-tolerance policy for such messages, and you may be banned immediately without warning or recourse.' },
                    { name: 'Rule 2 - No NSFW or suggestive content.', value: 'Do not post anything that is NSFW or overly suggestive. This includes discussions about such topics. If you are unsure if it is considered NSFW or suggestive, you should refrain from posting it and seek clarification from staff if necessary.' },
                    { name: 'Rule 3 - No spamming.', value: 'This includes abusive use of bot commands, misuse of spoiler tags, rapidly switching voice channels or mentioning people who are not currently active in the chat.' },
                    { name: 'Rule 4 - No special character names or impersonation.', value: 'Your nick/username must comply with the rest of the rules and must be taggable without using an excess of special characters. Impersonating server and wiki staff, YouTube employees or significant community figures is also strictly forbidden.' },
                    { name: 'Rule 5 - Follow Discord\'s ToS.', value: 'Follow Discord\'s [Terms of Service](https://discord.com/new/terms) at all times. Users who are caught breaking these terms will be [reported](https://support.discord.com/hc/en-us/requests/new?ticket_form_id=360000029731) to Discord Staff.' },
                    { name: 'Rule 6 - Be mindful of channels and their purpose.', value: 'Failure to follow channel guidelines so may result in loss of permissions. Relevant information about the purpose of each channel can be found in the channel topic and pinned messages at the top.' },
                    { name: 'Rule 7 - Follow all staff instructions immediately and at all times.', value: 'If you require clarification about any warning or instruction, send a private message to one of our server staff. Staff will not discuss action taken against other users.' }
                )
                .setFooter('Use your own common sense. Not all our rules will be listed here, but if the actions you take seem to be harmful or hurtful, Staff will not hesitate to take action against you.')
                .setThumbnail('https://i.pinimg.com/originals/19/7b/36/197b365922d1ea3aa1a932ff9bbda4a6.png')
            const channel = this.client.channels.cache.get('719355973440897035');
            try {
                const webhooks = await channel.fetchWebhooks();
                if (!webhooks) return message.channel.send('you gotta create a webhook for this channel, first!')
                const webhook = webhooks.first();

                await webhook.send({
                    username: 'Wikitubia',
                    avatarURL: 'https://i.pinimg.com/originals/19/7b/36/197b365922d1ea3aa1a932ff9bbda4a6.png',
                    embeds: [welcome, faq, roles, rules],
                }).catch(console.error);

            } catch (error) {
                console.error('Error trying to send: ', error);
            }
        }
    }
}