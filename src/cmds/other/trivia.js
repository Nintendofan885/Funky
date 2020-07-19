const Command = require('../../structs/command.js');
const Discord = require("discord.js");
const fetch = require('node-fetch')

module.exports = class TriviaCommand extends Command {

    constructor(...args) {
        super(...args, {
            name: 'trivia',
            aliases: ['quiz'],
            description: 'Test out your knowledge with trivia!',
            category: 'Other'
        });
    }

    async run(message) {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean')
            const data = await response.json();
            const question = data.results[0].question;
            const correctAnswer = this.client.utils.capitalise(data.results[0].correct_answer);

            const embed = new Discord.MessageEmbed()
                .setTitle('True or False?')
                .setDescription(question)
                .setFooter('you\'ve got 15 seconds!')

            message.channel.send(embed);

            const filter = m => m.author.id === message.author.id;
            const c = message.channel.createMessageCollector(filter, { time: 15000 });

            c.on('collect', m => {
                if (m.content === correctAnswer) message.channel.send(`Correct answer!`);
                else if (m.content === (`${this.client.prefix}trivia` || `${this.client.prefix}quiz`)) return;
                else message.channel.send(`Incorrect answer.`);
            })

            c.on('end', m => { })
        } catch (err) {
            console.log(err)
        }
    }
}