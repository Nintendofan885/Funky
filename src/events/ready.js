const Event = require('../structs/event.js');
const activities_list = [
    `cocomelon`,
    `morgz`,
    `t-series`,
    `jake paul`
]

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true
        });
    }

    run() {
        console.log(`Logged in as ${this.client.user.tag}.`);

        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list.
            this.client.user.setPresence({
                activity: {
                    name: `${activities_list[index]} | ${this.client.prefix}help`,
                    type: 'WATCHING',
                }
            });
        }, 3000);
    }
}