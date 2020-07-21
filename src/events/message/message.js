const Event = require('../../structs/event.js')

module.exports = class extends Event {

    run(message) {
        const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);
        const mentionRegex = RegExp(`^<@!?${this.client.user.id}>( |)$`)

        if (!message.guild || message.author.bot) return;

        if (message.content.match(mentionRegex))
            message.reply(`hello! My prefix for ${message.guild.name} is: \`${this.client.prefix}\`! For a list of all my commands, please run the \`${this.client.prefix}help\` command!`);

        const prefix = message.content.match(mentionRegexPrefix) ?
            message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

        if (!message.content.startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {
            command.run(message, args);
        }
    }
}