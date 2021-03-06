const mf = require('mineflayer'); // Коренной модуль к MineCraft
const ProxyAgent = require('proxy-agent'); // Модуль для прокси
const fs = require('fs');

const config = require('./config'); // Конфиг

let nicks, proxy;
fs.readFile("./something/nick.txt", 'utf8', function(e,d) { 
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
 await sleep(100);
 let workers = [{},{},{}]; let i = 0;
 while(i < 3) {
  let worker = nicks[utils.random(0,nicks.length-1)];
  worker = worker.split(''); worker[utils.random(0,worker.length-1)] = '' + utils.random(0,9) + '';
  console.log(worker.join(''))
  workers[i] = { nick: worker.join(''), login: false };
  i += 1;
 };
 
 await sleep(100);
 
 
 for await(let worker of workers) {
 let bot = mf.createBot({
  username: worker.nick,
  host: 'minecorp.ru', port: 25541,
  version: '1.12.2'
 });
 let err;
 
 bot.on('login', async() => {
  await sleep(200);
  bot.chat(`/reg Lalala Lalala`); bot.chat(`/l Lalala`);
  await sleep(50);
  bot.setControlState('back', true);
  await sleep(utils.random(300,500));
  worker.login = true; worker.bot = bot;
 });
 
 bot.on('message', (msg) => {
	console.log(`[${worker.nick}] ` + msg.toAnsi()); 
 });
 
 await sleep(2400);
 if(!worker.login) {
  console.log(`${worker.nick} не удалось войти`);
  bot = null; break;
 };
 bot.clearControlStates();
 };
 
 if(workers.find(x=> !x.login)) return console.log(`(!) Не всем ботам удалось войти`);
 //console.log(workers)
 var works = 0;
 
 workers[1].bot.on('message', async function(msg) {
 let part, winner;
 part = msg.toString().split(' ');
 if(part[1] === 'победил' && part[3] === '/quake') {
	winner = workers.find(x=> x.nick === part[0]);
	if(winner) {
		worker_win = true;
		await sleep(3000);
		winner.bot.chat(`/pay ${nickname} 0.3`);
		
		//workers[0].bot.chat(`/server creative`);
 
       await sleep(5000);
       works += 1; work(workers);
		
	}
 };
 });
 
 
 async function work(workers) {
 worker_win = false;
 if(works >= tries) {
 //workers[0].bot.chat(`/pay ${nickname} ${tries*0.3}`);
 await sleep(100);
 
 end(workers);
 console.log("Всё! :)")
 return;
 };
 
 for await(let worker of workers) {
  worker.bot.chat(`/quake`); await sleep(100);
 };
 await sleep(26000);
 await sleep(14000);
 workers[1].bot.chat(`/server creative`);
 workers[2].bot.chat(`/server creative`);
 await sleep(20000);
 if(!worker_win) {
  workers[0].bot.chat(`/server creative`);
  await sleep(100);
  end(workers);
  console.log(`(!) Похоже, что ботам помешали`);
 };
 };
 
 work(workers);
};

async function end(workers) {
 for await(let worker of workers) {
   worker.bot.chat(`/unregister Lalala`);
   await sleep(100);
   worker.bot.quit(); worker.bot.end();
  };
 console.log(`> Остановлено`);
};


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const utils = {
	random: (x, y) => {
	return Math.floor(x + Math.random() * (y + 1 - x));
    }
};


main();
// Фармилка звёзд MineCorp Creative (☆)