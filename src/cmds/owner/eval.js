const Command = require('../../structs/command.js');
const { inspect } = require('util');

module.exports = class EvalCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'eval',
            aliases: [],
            description: 'Evaluates given JavaScript.',
            category: 'Owner',
            usage: '<code>'
        });
    }

    async run(message, args) {
        if (!message.author.id === this.client.owners) return message.reply('you do not have permission to use this command.')
        let toEval = args.join(' ');
        let evaluated = inspect(eval(toEval, { depth: 0 }))
        try {
            if (toEval) {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart)
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })

            } else {
                return message.channel.send("Error whilst evaluating: `cannot evaluate air`")
            }
        } catch (e) {
            return message.channel.send(`Error whilst evaluating: \`${e.message}\``)
        }
    }
}