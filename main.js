const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'w!';

const fs = require('fs');

var jailor;
var jailed;
var jailorChat;
var cell;

var admins = [
    '712787148272566372',
    '593477982761517085',
    '471875491951935490',
    '392866251149410305',
    '301847661181665280'
];

var memes = [
    'https://media.discordapp.net/attachments/811318948620009533/834241774431895552/Screenshot_2021-04-20_165558.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834256981429714944/Screenshot_2021-04-20_163622.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834256983838294016/Screenshot_2021-04-20_174920.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834257406300913674/IMG_20210420_193704.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834257476101603358/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834257558507225128/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834257685477720104/unknown.png',
    'https://media.discordapp.net/attachments/819985696387235911/819994592501170196/pov-jailor.gif',
    'https://cdn.discordapp.com/attachments/811318948620009533/834258138600570900/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834258282515529778/Screenshot_20210209-2248562.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834258718056513546/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834258975217942578/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834259225751846921/20210410_115922.jpg',
    'https://cdn.discordapp.com/attachments/811318948620009533/834271651377840158/Screenshot_2021-04-20_203729.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834474771319488542/Screenshot_20210116-2357492.png',
    'https://media.discordapp.net/attachments/811318948620009533/834475399923630110/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834475492216012870/unknown.png',
    'https://media.discordapp.net/attachments/811318948620009533/834475989038792754/skribbl______rii.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834476129607090236/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834476448655343616/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834476790939385856/g4bSE3Y.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834584655750758440/Screenshot_2021-04-21_172120.png',
    'https://cdn.discordapp.com/attachments/826147014025674772/834872098849292348/Screenshot_2021-04-22_112155.png',
    'https://cdn.discordapp.com/attachments/803465423848603649/803688169283387452/unknown.png'
]

client.once('ready', () => {
    console.log('Online!');
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        status: 'available',  // You can show online, idle... Do not disturb is dnd
        activity: {
            //name: "Developed by Shaggy, HiHi, and Apg",  // The message shown
            name: "Happy birthday Namk!!!",
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
    jailorChat = client.channels.cache.get('833824563967950860');
    cell = client.channels.cache.get('833824574109384724');

});

client.on('message', message => {
    if (message.author == jailed || message.author == jailor) {
        jailTransfer(message);
    }

    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == 'meme') {
        meme(message);
    }

    if (!admins.includes(message.author.id)) return;

    switch (command) {
        case 'jail':
            //mm = message.guild.members.cache.get(args[0]);
            mm = client.users.fetch(args[0]);
            mm = client.users.cache.get(args[0]);
            //mm = message.mentions.users.first();
            if (!mm) {
                message.channel.send('That user doesn\'t exist.');
                console.log(args[0])
                return;
            }
            jail(mm);
            break;
        case 'cleanjail':
            cleanJail();
            break;
        case 'jailor':
            mm = client.users.fetch(args[0]);
            mm = client.users.cache.get(args[0]);
            if (!mm) {
                message.channel.send('That user doesn\'t exist.');
                return;
            }
            jailored(mm);
            break;
        case 'cleanjailor':
            cleanJailor();
            break;
        case 'roleinfo':
            roleInfo(message, args);
            break;
        case 'collect':
            collect(message, args[0]);
            break;
        default:
            break;
    }
});


function collect(mass, amount) {
    /*
    mass.channel.messages.fetch({ limit: amount })
        .then(async messages => {
            console.log(`Received ${messages.size} messages`)
            console.log(`${messages.size} procuradas.`);

            let finalArray = [];

            const putInArray = async (data) => finalArray.push(data);

            for (const message of messages.array().reverse()) await message.delete()putInArray(message.content);

            console.log(finalArray);
            console.log(finalArray.length);

        })
        .catch(console.error)
            */
    }

function jail(target) {

    jailed = target;

    cell.updateOverwrite(jailed, {
        VIEW_CHANNEL: true
    });
    cell.send(jailed.tag + ' has been jailed.');
    jailorChat.send(jailed.tag + ' has been jailed.');
}

function jailored(jailorIsMe) {
    jailor = jailorIsMe;
    jailorChat.updateOverwrite(jailor, {
        VIEW_CHANNEL: true
    });
    jailorChat.send(jailor.tag + ' is the new jailor.');
}

function cleanJail() {
    cell.send(jailed.tag + ' is no longer jailed.');
    jailorChat.send(jailed.tag + ' is no longer jailed.');
    cell.updateOverwrite(jailed, {
        VIEW_CHANNEL: false
    });
    jailed = null;
}


function cleanJailor() {
    jailorChat.send(jailor.tag + ' is no longer jailor.');
    jailorChat.updateOverwrite(jailor, {
        VIEW_CHANNEL: false
    });
    jailor = null;
}

function jailTransfer(message) {
    if (message.channel == cell && message.author == jailed) {
        jailorChat.send(jailed.tag + ': ' + message.content);
    } else if (message.channel == jailorChat && message.author == jailor != message.content.startsWith(',')) {
        cell.send('Jailor: ' + message.content);
    }
}

function meme(message) {
    message.channel.send(memes[Math.floor(Math.random() * memes.length)]);
    //message.channel.send(memes[15]);
}

function roleInfo(message, args){
    const embed = new Discord.MessageEmbed()
        .setColor('#c92222')
        .setTitle('**Alphawolf (Killing) [Unique]**')
        .setDescription('The leader of the Werewolves.')
        .setThumbnail('https://cdn.discordapp.com/attachments/811318948620009533/834935143067680778/wolf.png')
        .addField('**Ability (Passive):**', '__[Can\'t Touch This]__ - \nYou are night attack immune.');

    message.channel.send(embed);
}

client.login('pain');