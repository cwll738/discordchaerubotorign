const Discord = require('discord.js');
const client = new Discord.Client();

const token = process.env.token;

const { readdirSync } = require('fs');
const { join } = require('path');


client.commands = new Discord.Collection();

const prefix = '+' //자신의 프리픽스

const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));

for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("error", console.error);

client.on('ready', () => {
  console.log(`${client.user.id}로 로그인 성공!`);
  client.user.setActivity('저는 봇입니다 By Chaeru') //상태메시지
});

client.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

client.on('message', (message) => {
    if(message.content === '+이학건') {
        message.reply('학건이은/는 누구일까요..입니다.')
    }else{
        if(message.content === '+정진원') {
            message.reply('Wls원 정진원.')
    }else{
        if(message.content === '+별난닭') {
            message.reply('별난닭은 최민혁 입니다!.')
    }
}}});



client.login(token);