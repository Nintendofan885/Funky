const WT = require('./structs/funky.js');
const config = require('../config.json');

const client = new WT(config);
client.start();