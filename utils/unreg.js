// Анрегистрация ботов (ручная)

module.exports = async function(string) {
const mf = require('mineflayer');
let unreg = string.split(',');
console.log(unreg)

const config = require('../config.json');

for(let player of unreg) {
player = player.replace(/[^\wа-я_]/gi,'');
console.log(`> Unregistering ${player}`);
if(config.unregister.find(x=> x === player)) config.unregister.splice(config.unregister.indexOf(player), 1);

let bot = mf.createBot({
 username: player,
 host: 'hub.minecorp.ru',
 version: '1.12.2'
});

bot.on('login', function() {
 setTimeout(() => { bot.chat(`/login Lalala`) }, 500);
 setTimeout(() => { bot.chat(`/unregister Lalala`) }, 1000);
 setTimeout(() => { bot.end() }, 1500);
});

bot.on('message', function(msg) {
 console.log(`[${player}] ` + msg.toAnsi());
});
};

console.log('Meow')
console.log(process.argv)
//console.log(bot)
};