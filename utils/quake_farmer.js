// Фармилка звёзд MineCorp Creative
//
// quake_farmer.js

module.exports = async function(tries, farm_started) {
const mf = require('mineflayer'); // Коренной модуль к MineCraft
const ProxyAgent = require('proxy-agent'); // Модуль для прокси
const fs = require('fs');

const config = require('../config'); // Конфиг

let nicks, proxy;
fs.readFile("./something/nicks.txt", 'utf8', function(e,d) { 
 if(e) throw e; nicks = d.replace(/\r/g,'').split('\n');
 }); // Список используемых никнеймов

if(config.proxy) {
fs.readFile("./something/proxy.txt", 'utf8', function(e,d) { 
 if(e) return fs.writeFileSync('./something/proxy.json', []);
 proxy = d.replace(/\r/g,'').split('\n');
 for(let ip of proxy) { ip = ip.split(':'); ip[1] = Number(ip[1]) };
 });
}; // Список прокси





async function main() {
 await sleep(200);
 
 if(config.unregister.length) {
 for(let worker of config.unregister) {
 let bot = mf.createBot({
  username: worker,
  host: 'creative.minecorp.ru', port: 25541,
  version: '1.12.2'
 });
 
 console.log(`! Unregistering ${worker}...`)
 bot.on('message', (msg) => { console.log(msg.toAnsi()) });
 
 bot.once('login', async() => {
  bot.chat(`/l Lalala`);
  await sleep(20);
  bot.setControlState('back', true);
  await sleep(1500);
  bot.chat(`/unreg Lalala`);
  await sleep(100);
  bot.quit(); bot.end();
  console.log(`! ${worker} unregistered`)
 });
 bot.once('kicked', async(reason) => { console.log(reason) });
 
 await sleep(3000);
 };
 await sleep(2000);
 config.unregister = [];
 };
 
 let workers = [{},{},{}]; let i = 0;
 while(i < 3) {
  let worker = nicks[utils.random(0,nicks.length-1)];
  if(config.shuff_digits) {
  worker = worker.split(''); worker[utils.random(0,worker.length-1)] = '' + utils.random(0,9) + '';
  console.log(worker.join(''))
  worker = worker.join('');
  };
  if(workers.find(x=> x.nick === worker)) continue;
  workers[i] = { nick: worker, login: false };
  i += 1; config.unregister.push(worker);
 };
 
 require('fs').writeFileSync('./config.json', JSON.stringify(config, null, '\t'));
 await sleep(100);
 
 for await(let worker of workers) {
 let bot = mf.createBot({
  username: worker.nick,
  host: 'minecorp.ru', port: 25541,
  version: '1.12.2'
 });
 let err;
 worker.bot = bot;
 
 bot.once('login', async() => {
  await sleep(200);
  bot.chat(`/reg Lalala Lalala`); bot.chat(`/l Lalala`);
  config.unregister.push(worker.nick);
  await sleep(50);
  bot.setControlState('back', true);
 });
 
 bot.on('message', (msg) => {
	console.log(`[${worker.nick}] ` + msg.toAnsi());
	if(msg.toString() === 'Вы успешно вошли!') worker.login = true;
 });
 
 bot.once('end', () => { worker.login = false; });
 bot.once('kicked', (reason) => { console.log(reason) });
 
 await sleep(3000);
 if(!worker.login) {
  console.log(`! ${worker.nick} не удалось войти`);
  bot = null; break;
 };
 bot.clearControlStates();
 };
 
 if(workers.find(x=> !x.login)) {
	 end(workers);
	 console.log(`! Не всем ботам удалось войти`);
	 return;
 };
 //console.log(workers)
 var works = 0;
 
 workers[1].bot.on('message', async function(msg) {
 let part, winner;
 part = msg.toString().split(' ');
 if(part[1] === 'победил' && part[3] === '/quake') {
	winner = workers.find(x=> x.nick === part[0]);
	if(winner) {
		worker_win = true;
		workers[0].bot.setControlState('back', true);
		await sleep(1000);
		winner.bot.chat(`/pay ${config.nickname} 0.3`);
		
		//workers[0].bot.chat(`/server creative`);
 
       await sleep(3000);
	   workers[0].bot.clearControlStates();
       works += 1; work(workers);
		
	}
 };
 });
 
 
 async function work(workers) {
 if(works >= tries) {
 //workers[0].bot.chat(`/pay ${nickname} ${tries*0.3}`);
 await sleep(100);
 
 end(workers);
 console.log("! Всё! :)")
 return;
 };
 
 for await(let worker of workers) {
  worker.bot.chat(`/quake`); await sleep(100);
 };
 
 await sleep(26000);
 await sleep(14000);
 workers[1].bot.chat(`/server creative`);
 workers[2].bot.chat(`/server creative`);
 
 let anyone = [];
 
 console.log(workers[0].bot.scoreboard)
 console.log('ALL SC ^^^^')
 console.log(workers[0].bot.scoreboard[1])
 console.log(workers[0].bot.scoreboard[1].itemsMap)
 console.log(workers[0].bot.scoreboard[1][0])
 
 
 for(let player of Object.keys(workers[0].bot.scoreboard[1].itemsMap)) {
 if(workers.find(x=> x.nick === player.replace(/[^\w_а-я]/gi,''))) continue;
 anyone.push(player);
 };
 await sleep(200);
 if(anyone.length) {
  workers[0].bot.chat(`Упс, пока.`);
  await sleep(100);
  workers[0].bot.chat(`/server creative`);
  await sleep(100);
  end(workers);
  console.log(`! Похоже, что ботам помешали (${anyone.join(', ')})`);
 };
 };
 
 work(workers);
};

async function end(workers) {
 for await(let worker of workers) {
   if(worker.bot) worker.bot.chat(`/unregister Lalala`);
   await sleep(100);
   if(worker.bot) { worker.bot.quit(); worker.bot.end() };
  };
 config.unregister = [];
 require('fs').writeFileSync('./config.json', JSON.stringify(config, null, '\t'));
 await sleep(200);
 console.log(`! Фармилка /quake остановлена`);
 console.log('> ');
};


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const utils = {
	random: (x, y) => {
	return Math.floor(x + Math.random() * (y + 1 - x));
    }
};


main();
};