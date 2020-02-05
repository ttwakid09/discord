const Discord = require('discord.js');
const { Token } = require('./lib/config.js'); 
const client = new Discord.Client ();
client.on('ready', () => {
	console.log(client.user.tag)
	console.log(client.user.id)
	console.log('I am ready!');
});

client.on('message', (message) => {
	if(message.author.bot) return;

	if (message.content.startsWith('!이번뷰메')) {
		message.channel.send("#뷰메봇")
	}
	if (message.content.startsWith('!도움말')) {
		message.channel.send("!이번뷰매")
        message.channel.send("!초대링크")
        message.channel.send("!say 할말")
        message.channel.send("!ann 할말")
        message.channel.send("!dm 할말")
        message.channel.send("!kick 멘션")
        message.channel.send("!ban 멘션")
        message.channel.send("!mute 멘션")
        message.channel.send("!unmute 멘션")
        message.channel.send("!purge 숫자(1~100)")
	}

	if (message.content.startsWith('!초대링크')) {
		message.channel.send("https://discord.gg/8rjEu86")
	}

	if (message.content.startsWith('!say')) {
		var id = message.author.id
		var sayMessage = message.content.substring(4)
			if (id == '669698014394318858') {
				message.delete()
				message.channel.send(sayMessage);
			} else {
				message.channel.send(`<@${message.author.id}>:\n` + sayMessage)
			}
	}

	if (message.content.startsWith('!ann')) {
		if (message.author.id == '669698014394318858') {
			const channel = client.channels.get("674246715548762136")
			const text = message.content.substring(5)
			channel.send(text)
		}
	}

	if(message.content.startsWith("!dm")) {
		if(message.author.id == '669698014394318858') {
			var text = message.content.substring(4);
			message.guild.members.filter(m => !m.user.bot).forEach(member => member.send(text))
			message.channel.send("모든 유저에게 `" + text + "` 메세지를 전송했습니다.")
		} else {
			return;
		}
	}

	if (message.content.startsWith('!kick')) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!kick [멘션]` 가 올바른 명령어입니다.")
		};
		var member = message.mentions.members.first();
		member.kick().then((member) => {
			message.channel.send(":wave: " + member.displayName + " 님이 서버에서 추방되었습니다. ");
		}).catch(() => {
			message.channel.send(member.displayName + " 의 권한이 봇보다 높아서 추방하는데 실패했습니다.");
		});
	}

	if (message.content.startsWith('!mute')) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!mute [멘션]` 가 올바른 명령어입니다.")
		};
		try {
			const role = message.guild.roles.find(role => role.name === 'Muted');
			args.addRole(role);
			message.channel.send(":mute: " + args + " 님을 채팅 금지 처리했습니다.")
		} catch (error) {
			message.channel.send("오류가 발생했습니다.\n혹시 대상이 이미 채팅금지 상태가 이거나 Muted 역할이 봇 권한보다 높이 있거나, `Muted` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}

	if (message.content.startsWith('!unmute')) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!unmute [멘션]` 가 올바른 명령어입니다.")
		};
		try {
			const role = message.guild.roles.find(role => role.name === 'Muted');
			args.removeRole(role);
			message.channel.send(":loud_sound: " + args + " 님의 채팅 금지를 해제했습니다.")
		} catch (error) {
			message.channel.send("오류가 발생했습니다.\n혹시 대상이 이미 채팅금지 상태가 아니거나 `Muted` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}

	if (message.content.startsWith('!ban')) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!ban [멘션]` 가 올바른 명령어입니다.")
		};
		var member = message.mentions.members.first();
		member.ban().then((member) => {
			message.channel.send(":wave: " + member.displayName + " 님이 서버에서 차단 되었습니다.");
		}).catch(() => {
			message.channel.send(member.displayName + " 의 권한이 봇보다 높아서 차단하는데 실패했습니다.")
		});
	}
  
		

	
	if (message.content.startsWith('!clear')) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var clear = message.content.substring(7)
			if (!clear) {
				return message.channel.send("숫자를 입력해주세요.")
			}
			if (clear > 100) {
				message.channel.send("1부터 100까지만 입력해주세요.")
				return;
			}
			if (clear < 1) {
				message.channel.send("1부터 100까지만 입력해주세요.")
				return;
			}
			if (isNaN(clear) == true) {
				message.channel.send("숫자만 입력해주세요.")
			} else {
				message.channel.bulkDelete(clear)
				.then(() => message.channel.send(`${clear}개의 메세지를 삭제했습니다.`))
				.catch(console.error)
			}
	}
});

client.on("messageDelete", async msg => {
	let logs = await msg.guild.fetchAuditLogs({type: 72});
  
	let embed = new Discord.RichEmbed()
	  .setTitle("**메세지 삭제 로그**")
	  .setColor("#fc3c3c")
	  .addField("작성자 태그", msg.author.tag, true)
	  .addField("채널", msg.channel, true)
	  .addField("Privite")
	  .setFooter(`메세지 아이디: ${msg.id} | 작성자 아이디: ${msg.author.id}`);
  
	let channel = msg.guild.channels.find(x => x.id === '674246757345132564');
	channel.send({embed});
  });

client.login(Token)