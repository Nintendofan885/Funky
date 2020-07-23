const Command = require('../../structs/command.js');
const wiki = require('wikijs').default();
const Discord = require("discord.js");

module.exports = class WikiCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'wiki',
            aliases: ['wikipedia'],
            description: 'Searches Wikipedia!',
            category: 'Other',
            usage: '<search query>'
        });
    }

    async run(message, args) {
        try {
            const notifyMsg = await message.channel.send('searching wikipedia...');
            let result;
            if (!args) {
                const random = await wiki.random(1);
                result = await wiki.page(random[0]);
            } else {
                const search = await wiki.search(args.join('_'), 1);
                if (!search.results.length) {
                    return message.channel.send({
                        embed: {
                            color: '#FF0000',
                            title: "What was that again? 📚🤓",
                            description: "Even Wikipedia doesn't seem to know what you're talking about.",
                            footer: {
                                text: "Check for typos or try searching for something else!",
                            },
                        },
                    }).then(() => notifyMsg.delete());
                }
                result = await wiki.page(search.results[0]);
            }
            let description = await result.summary();
            if (description.length < 100) {
                // 100 is a bit short so load the full description in that case
                description = await result.content();
            }
            if (description.length > 750) {
                description = `${description.substring(0, 750)}...\n\nClick [**here**](${result.raw.fullurl}) to read more!`;
            }
            // Sometimes wikijs crashes when attempting to grab a main image. If it works, great. If not, too bad.
            const mainImage = await result.mainImage().catch(() => null);
            const embed = new Discord.MessageEmbed()
                .setTitle(result.raw.title)
                .setURL(result.raw.fullurl)
                .setDescription(description)
                .setImage(mainImage)

            message.channel.send(embed).then(() => notifyMsg.delete())
        } catch (err) {
            console.log(err)
        }
    }
}