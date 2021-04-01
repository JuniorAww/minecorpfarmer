const readline = require("readline"); 
const config = require('./config');

console.clear();
console.log("\x1b[36m", '> MineCorp Creative Farmer')
console.log("\x1b[37m", '                      v0.2')

function end(count) {
 if(count >= 2 && count <= 4) return 'а';
 return '';
}; // Окончание в слове 'раз'

async function main() {
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const { promisify } = require('util');
r1.question[promisify.custom] = (question) => {
  return new Promise((resolve) => {
    r1.question(question, resolve);
  });
};

console.log('');

if(!config.nickname) {
	config.nickname = await promisify(r1.question)('Укажите свой никнейм: ');
	require('fs').writeFileSync('./config.json', JSON.stringify(config, null, '\t'));
} else console.log(`! Никнейм взят из конфига`);

//let times = await promisify(r1.question)('> Укажите число игр, которые сыграют боты: ');

let farm_started = false;
let times = 3;

console.log(`* Установки:
  Никнейм: ${config.nickname} (изменить: "nick JuniorFrr")
  Боты играют: ${times} раз${end(times)} (изменить: "times 1")`);
console.log('');

async function command() {
 let cmd = (await promisify(r1.question)('> ')).split(' ');
 
 let caps = cmd[0];
 if(caps.toUpperCase() === caps) {
 console.log(`! НЕ КАПСИ НА МЕНЯ ДЕБИЛ`);
 return command();
 };
 
 
 
 if(cmd[0] === 'start') {
  if(farm_started) {
  console.log(`(!) Фармилка уже запущена`);
  return command(); 
  };
  require('./utils/quake_farmer.js')(times, farm_started);
  console.log(`Фармилка запущена`);
  return command();
 };
 
 if(cmd[0] === 'times' && Number(cmd[1])) {
  if(Number(cmd[1]) < 1 || Number(cmd[1]) > 30 || Number(cmd[1]).toFixed() != Number(cmd[1])) {
   console.log(`Укажите число в районе от 1 до 30`);
   return command();
  };
  times = Number(cmd[1]);
  console.log(`Теперь боты сыграют /quake: ${times} раз${end(times)}`);
  return command();
 };
 
 if(cmd[0] === 'nick' && cmd[1]) {
  config.nickname = cmd[1];
  console.log(`Ваш никнейм изменен на ${cmd[1]}`);
  return command();
 };
 
 if(cmd[0] === 'unreg' && cmd[1]) {
  require("./utils/unreg.js")(cmd.join(' ').replace('unreg ',''));
  return command();
 };
 
 if(cmd[0] === 'meow') {
  console.log(`Мяу-мяу.`);
  return command();
 };
 
 if(cmd[0] === 'фыр') {
  console.log(`Уру-ру.`);
  return command();
 };
 
 if(cmd[0] === 'иди' && cmd[1] === 'нахуй') {
  console.log(`ок`);
  return command();
 };
 
 
 console.log(cmd)
 if(cmd[0] === '') return command();
 console.log(`Команда не опознана (${cmd.join(' ')})`);
 command();
};
command();

r1.on("close", function() {
    console.log("\n> Пока!");
    process.exit(0);
});

}; // Консоль
main();

