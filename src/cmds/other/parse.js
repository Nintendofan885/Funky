const Command = require('../../structs/command.js');
const { parse, HTMLElement } = require('node-html-parser')
const got = require('got')

module.exports = class ParseCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'parse',
            aliases: [],
            description: 'Parses wikitext into HTML.',
            category: 'Other'
        });
    }

    async run(message, args) {
        const content = args.join(' ');
        const url = 'https://youtube.fandom.com';
        const result = await got(`${url}/api.php`, {
            searchParams: {
                action: 'parse',
                prop: 'text',
                text: content,
                disablepp: true,
                format: 'json'
            }
        }).json();
        const text = result.parse.text['*'];
        const tree = parse(text);

        let html = text;

        if (tree instanceof HTMLElement) {
            if (tree.tagName === null && tree.childNodes.length === 1) {
                const firstChild = tree.childNodes[0];

                if (firstChild.tagName === 'p') {
                    html = firstChild.innerHTML;
                }
            }
        }

        message.channel.send(`\`\`\`html\n${html}\`\`\``);
    }
}