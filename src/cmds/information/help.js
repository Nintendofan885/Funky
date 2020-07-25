const { MessageEmbed } = require('discord.js');
const Command = require('../../structs/command.js');

module.exports = class HelpCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'help',
            aliases: ['halp', 'h'],
            description: 'Displays all the commands in the bot',
            category: 'Information',
            usage: '[command]'
        });
    }

    async run(message, [command]) {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(this.client.user.displayAvatarURL())
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        if (command) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

            if (!cmd) return message.channel.send(`Invalid command named. \`${command}\``);

            embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL());
            embed.setDescription([
                `**➤ Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : '*no aliases*'}`,
                `**➤ Description:** ${cmd.description}`,
                `**➤ Category:** ${cmd.category}`,
                `**➤ Usage:** \`${cmd.usage}\``
            ]);

            return message.channel.send(embed).catch(console.error);
        } else {
            embed.setDescription([
                `These are the available commands for ${message.guild.name}`,
                `The bot's prefix is: \`${this.client.prefix}\``,
                `Command parameters: \`<>\` is strict & \`[]\` is optional.`,
                `Feel free to invite the bot to your other servers using [this link](https://discord.com/oauth2/authorize?client_id=711115573697708042&scope=bot&permissions=2013654134).`
            ]);

            let categories;
            if (!this.client.owners.includes(message.author.id)) {
                categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
            } else {
                categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
            }

            for (const category of categories) {
                embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
                    cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
            }
            return message.channel.send(embed).catch(console.error);
        }
    }

};
