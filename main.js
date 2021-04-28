const Discord = require('discord.js');

const config = require('./config.json');

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
    'https://cdn.discordapp.com/attachments/803465423848603649/803688169283387452/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/834975194539622460/unknown.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/835231836987719771/unknown.png'
];

var nukeSplashes = [
    'do that again and I will nuke your mom',
    'tell <@!795278309780226049> to do it for me',
    'go touch some grass <:Emismh:830318127191556117>',
    '<:gwa:812462890186702888> the fat cat stares',
    'obese',
    'No, cry about it',
    'You want to go to throwville with payp?',
    'if you really want to get nuked tell rii to force lynch you',
    'have you considered nuking yourself?',
    'Before I nuke, I\'d like to thank our sponsor scooby VPN',
    'Give HiHi owner and I will consider',
    'Give Shaggy owner and I will consider',
    'In your dreams',
    'The chances of me nuking the server are equal to the chances of you successfully asking your crush out',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
];

var tipSplashes = [
    'Always write a will. Your will should at least include your actions so other town members will have an easier time catching the wolf.',
    'As a Jailor, do not small talk to the jailed, this will give away your personal identity.',
    'Vigilante is easy fake claim, you should always leave a death note when you shoot someone so you can confirm yourself.',
    'TI should claim first thing in the morning, you will be more believable if you claim faster.',
    'Always fill in your role list when you see someone claim.',
    'If you see majority is reached in few seconds, you should be aware of the wolf in the vote.',
    'Never trust KC',
    'Kill Mqnic n1 as a werewolf',
    'Do not soft claim unless it\'s necessary, peoples are always suspicious of soft claims.',
    'If you think something is fishy, double check the role list, you might find something in there.',
    'Do not overthink as a werewolves or town player, the situation might be very simple.',
    'Try and only use facts to confirm other facts',
    'Don\'t sheep'
];

var memeCooldown = {};

var roleName = {};
var roleDescription = {};
var roleFaction = {};
var rolePassive = {};
var roleNight = {};
var roleDay = {};
var roleWinCondition = {};

client.once('ready', () => {
    console.log('Online!');
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        status: 'available',  // You can show online, idle... Do not disturb is dnd
        activity: {
            //name: "Developed by Shaggy, HiHi, and Apg",  // The message shown
            name: "Happy birthday Mafira!!!",
            type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
    setupRoleInfo();
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

    switch (command) {
        case 'meme':
            //d = new Date();
            //if (memeCooldown[message.author.tag] == undefined) {
            // meme(message);
            // memeCooldown[message.author.tag] = (d.getMinutes() * 60) + d.getSeconds();
            //} else if (memeCooldown[message.author.tag] - (d.getMinutes() * 60) + d.getSeconds()) {
            meme(message);
            //}
            break;
        case 'nuke':
            message.channel.send(nukeSplashes[Math.floor(Math.random() * nukeSplashes.length)]);
            break;
        case 'tips':
            message.channel.send(tipSplashes[Math.floor(Math.random() * tipSplashes.length)]);
            break;
        case 'roleinfo':
            roleInfo(message, args.join(' '));
            break
        default:
            break
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
        case 'setjail':
            setJail(message, args);
            break;
        case 'setcell':
            setCell(message, args);
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

    // cell.updateOverwrite(jailed, {
    //     VIEW_CHANNEL: true
    // });
    cell.send(jailed.tag + ' has been jailed.');
    jailorChat.send(jailed.tag + ' has been jailed.');
}

function jailored(jailorIsMe) {
    jailor = jailorIsMe;
    // jailorChat.updateOverwrite(jailor, {
    //     VIEW_CHANNEL: true
    // });
    jailorChat.send(jailor.tag + ' is the new jailor.');
}

function cleanJail() {
    cell.send(jailed.tag + ' is no longer jailed.');
    jailorChat.send(jailed.tag + ' is no longer jailed.');
    // cell.updateOverwrite(jailed, {
    //     VIEW_CHANNEL: false
    // });
    jailed = null;
}

function cleanJailor() {
    jailorChat.send(jailor.tag + ' is no longer jailor.');
    // jailorChat.updateOverwrite(jailor, {
    //     VIEW_CHANNEL: false
    //});
    jailor = null;
}

function jailTransfer(message) {
    if (message.channel == cell && message.author == jailed) {
        jailorChat.send(jailed.tag + ': ' + message.content);
    } else if (message.channel == jailorChat && message.author == jailor != message.content.startsWith(',')) {
        cell.send('Jailor: ' + message.content);
    }
}

function setJail(message, args) {
    temp = client.channels.cache.get(args[0]);
    if (temp) {
        jailorChat = temp;
        message.channel.send('Jailor Chat has been set.');
    } else {
        message.channel.send('Either the bot doesn\'t have access to that channel or it doesn\'t exist.');
    }
}

function setCell(message, args) {
    temp = client.channels.cache.get(args[0]);
    if (temp) {
        cell = temp;
        message.channel.send('Jail cell has been set.');
    } else {
        message.channel.send('Either the bot doesn\'t have access to that channel or it doesn\'t exist.');
    }
}

function meme(message) {
    message.channel.send(memes[Math.floor(Math.random() * memes.length)]);
    //message.channel.send(memes[15]);
}

function setupRoleInfo() {
    //TOWN


    roleName['jailor'] = '**Jailor (Killing) [Unique]**';
    roleDescription['jailor'] = 'A warden officer who detains suspicious people.';
    roleFaction['jailor'] = 'town';
    rolePassive['jailor'] = '__[Unstoppable]__ - \nYou are roleblock immune and redirect immune. \n • Any attempt to bypass these immunities will fail.';
    roleNight['jailor'] = '__[Execute]__ - \nExecute your jailed target. \n • This is an unpreventable death. \n • You cannot use this ability until night 2. \n • You can only use this ability 3 times. \n • If you execute a Town member this way, then you will lose all of your remaining executions.';
    roleDay['jailor'] = '__[Imprison]__ - \nJail a target (not yourself).  \n • Jailed targets cannot perform night actions. \n • Any ability targeting jailed people will fail and the user will be informed that their target is jailed. \n • Jailed targets cannot be visited by anyone, except if their visiting ability bypasses jailing. \n • If a jailed target is the target of any of these effects, then they will be notified:\n - Attacking\n - Roleblocking\n - Redirecting\n - Blackmailing';

    roleName['veteran'] = '**Veteran (Killing) [Unique]**';
    roleDescription['veteran'] = 'A paranoid war soldier.';
    roleFaction['veteran'] = 'town';
    rolePassive['veteran'] = '__[War Veteran]__ - \nYou are redirect immune and roleblock immune.';
    roleNight['veteran'] = '__[Alert]__ - \nAttack everyone who visits you. \n • This attack ignores night attack immunity, healing, and protection. \n • You become night attack immune.\n • You are informed of how many visitors you shot.\n • You can only use this ability 3 times.\n__[Snipe]__ - \nSnipe a target (not yourself). If your target attacks tonight, you roleblock and attack them.\n • This attack ignores night attack immunity, healing, and protection. \n • This roleblock bypasses roleblock immunity. \n • You cannot use [Alert] the next night.\n • You can only use this ability twice.';

    roleName['doctor'] = '**Doctor (Protective)**';
    roleDescription['doctor'] = 'A student who graduated from medical school. ';
    roleFaction['doctor'] = 'town';
    roleNight['doctor'] = '__[Heal]__ - \nHeal a target (not yourself).';
    roleDay['doctor'] = '__[Self Care]__ - \nHeal yourself tonight.\n • You can only use this ability twice.';

    roleName['bodyguard'] = '**Bodyguard (Protective)**';
    roleDescription['bodyguard'] = 'A royal officer who protects people with their life.';
    roleFaction['bodyguard'] = 'town';
    rolePassive['bodyguard'] = '__[Body Vest]__ - \nYou have one-time night attack immunity.\n • You use this ability once you get attacked or successfully protect someone.';
    roleNight['bodyguard'] = '__[Protect]__ - \nProtect a target (not yourself).\n • If your target is attacked, you attack one of their attackers.\n • This attack ignores night attack immunity.\n • Your sacrifice can be healed.\n • Your target does not die from their attacker tonight.\n • You and your target will be notified if you successfully protected them from an attack.';

    roleName['builder'] = '**Builder (Protective) [Unique]**';
    roleDescription['builder'] = 'An individual who enjoys building.';
    roleFaction['builder'] = 'town';
    roleDay['builder'] = '__[Fortify]__ - \nFortify a target.\n • Your target is notified that they were fortified.\n • This ability cannot be used on day 0.\n • You can only use this ability 3 times.';

    roleName['trapper'] = '**Trapper (Protective)**';
    roleDescription['trapper'] = 'A hunter mastered in the elimination of killers.';
    roleFaction['trapper'] = 'town';
    rolePassive['trapper'] = '__[Catching Fire]__ - \nYou are redirect immune and roleblock immune.\n__[Build]__ - \nIf there are less than two active traps, build one trap tonight.\n • Traps protect your targets from attacks, attacking anyone who tries to attack them.\n - Trap attacks ignore night attack immunity, healing, and protection.\n • There can be only two active traps at any time.\n • Once a trap is triggered, you and your trapped target are notified and the trap is destroyed.\n • If a trapped target dies and their trap is not triggered, it is destroyed.\n__[Imbued Sadness]__ - \nUpon your death, your traps disappear.';
    roleNight['trapper'] = '__[Trap Switch]__ - \nMove a placed trap to someone else.\n__[Sacrificial Woodworking]__ - \nDestroy an active trap and give yourself night attack immunity for tonight.';
    roleDay['trapper'] = '__[Place Trap]__ - \nTrap a target (not yourself).';

    roleName['investigator'] = '**Investigator (Investigative)**';
    roleDescription['investigator'] = 'A detective who specializes in tracking activity during nighttime.';
    roleFaction['investigator'] = 'town';
    roleNight['investigator'] = '__[Investigate]__ - \nInvestigate a target (not yourself).\n • You are notified that your target is either Killing, Protective, Investigative, or Supportive.\n__[Interrogate]__ - \nInterrogate a target (not yourself).\n • You are notified that your target is either Not Suspicious (Town members, Alphawolves, and Neutral roles), or Suspicious (Werewolf members and Neutral Killing roles).';

    roleName['psychic'] = '**Psychic (Investigative)**';
    roleDescription['psychic'] = 'A trained mediator who uses their future vision to foresee possible threats.';
    roleFaction['psychic'] = 'town';
    rolePassive['psychic'] = '__[Corruption]__ - \nRevealed Mayors cannot appear in your visions.\n__[Disruption]__ - \nYou will not receive a vision if you are roleblocked, jailed, or fortified.\n__[Future Vision]__ - \nEvery odd-numbered night (1, 3, 5...), you will receive 3 possible evildoers.\n • At least one is a Werewolf member or a Neutral Killing role.\n__[Fortune Telling]__ - \nEvery even-numbered night (2, 4, 6...), you will receive 2 possible Town members.\n • At least one is a Town member. ';

    roleName[''] = '';
    roleDescription[''] = '';
    roleFaction[''] = '';
    rolePassive[''] = '';
    roleNight[''] = '';

    roleDay[''] = '';
    roleWinCondition[''] = '';


    //WOLVES


    roleName['wolf apprentice'] = '**Wolf Apprentice (Killing) [Unique]**';
    roleDescription['wolf apprentice'] = 'The Alphawolf’s servile subordinate.';
    roleFaction['wolf apprentice'] = 'wolf';
    rolePassive['wolf apprentice'] = '__[Following Orders]__ - \nYou always follow the Alphawolf’s attack orders. \n__[Royalty]__ - \nYou are the first Werewolf promoted to be an Alphawolf. \n • If both the original Alphawolf and you die, a random Werewolf is promoted to be an Alphawolf.\n • No Werewolf is ever promoted to be a Wolf Apprentice.';
    roleNight['wolf apprentice'] = '__[Night Hunt]__ - \nAttack a target (not yourself). \n • You can only use this ability if the Alphawolf is jailed or fortified. \n__[2-for-1]__ - \nAttack two targets (not yourself). \n • If you are redirected, only your first target is redirected. \n • You can only use this ability if the Alphawolf is jailed or fortified. \n • This ability can only be used once per game.';


    roleName['wolfcub'] = '**Wolfcub (Killing) [Unique]**';
    roleDescription['wolfcub'] = 'The wolfchild who seeks out kills.';
    roleFaction['wolfcub'] = 'wolf';
    rolePassive['wolfcub'] = '__[Vengeful Spirit]__ - \nUpon your death, you drag someone down with you. \n • This is an unpreventable death. \n • This ability is disabled if you die while using __[Berserker Call]__.';
    roleNight['wolfcub'] = '__[Berserker Call]__ - \nTarget someone (not a Werewolf). \n • You redirect your target to yourself. \n • If your target kills you, you drag your target down with you. \n • This is an unpreventable death. \n • This ability bypasses redirect immunity. \n • You can only use this ability twice.';

    roleName[''] = '';
    roleDescription[''] = '';
    roleFaction[''] = '';
    rolePassive[''] = '';
    roleNight[''] = '';
    roleDay[''] = '';
    roleWinCondition[''] = '';


    //NEUTRAL


    roleName['guardian angel'] = '**Guardian Angel (Protective) [Unique]**';
    roleDescription['guardian angel'] = 'A heavenly protector with a vow to keep the blessed alive.';
    roleFaction['guardian angel'] = 'neutral';
    rolePassive['guardian angel'] = '__[Guidance]__ - \nYou are randomly assigned a target at the start of the game.\n • You will know your target’s role.\n • Your target cannot be a Vigilante, a Bodyguard, a Fool, or a Headhunter.\n • If your target dies, you will transform into a Potion Master with 1 __[Potion of Survival]__, and will not be able to use night activities.\n • If your target is killed at night by a non-Neutral role except by the Jailor’s __[Execution]__, then the attacker will die when the next day ends. This is an unpreventable death.\n • Your target will be notified from the beginning of the game that they have a Guardian Angel and your identity.\n__[Heavenly Shield]__ - \nYou are immune to every negative status.\n • Any ability that attempts to bypass these immunities will fail.\n__[Blessings]__ - \nYou can use your abilities even after death.';
    roleNight['guardian angel'] = '__[Angel’s Heart]__ - \nPrevent your target’s death. This ability fails if the death is unpreventable.\n• This ability does not count as a visit.\n• This ability fails if your target is jailed or fortified, but you will not lose any charges.\n• The next day, your target cannot be voted or lynched. The Town will be notified of this.\n• Mutes against your target will fail.\n• You can only use this ability twice.';
    roleWinCondition['guardian angel'] = '`Win condition: See your target survive.`';

    roleName['potion master'] = '**Potion Master (Protective)**';
    roleDescription['potion master'] = 'An individual mastered in potions.';
    roleFaction['potion master'] = 'neutral';
    rolePassive['potion master'] = '__[Coagulate] __ - \nYou are redirect immune and roleblock immune.';
    roleNight['potion master'] = '__[Potion of Healing]__ - \nHeal a target (not yourself). \n __[Potion of Wisdom]__  - \nCheck a target (not yourself)\n • If you target a Guardian Angel or a Headhunter, you also learn their target.\n • You can only use this ability twice.\n __[Potion of Aggression]__ -\nAttack a target (not yourself).\n • You can only use this ability twice.\n __[Potion of Disruption]__ - \nRoleblock a target (not yourself).\n • You can only use this ability twice.';
    roleDay['potion master'] = '__ [Potion of Survival] __ - \nBecome night attack immune tonight.\n • You can only use this ability 3 times.';
    roleWinCondition['potion master'] = '`Win Condition: See yourself survive until the game ends.`';

    roleName[''] = '';
    roleDescription[''] = '';
    roleFaction[''] = '';
    rolePassive[''] = '';
    roleNight[''] = '';
    roleDay[''] = '';
    roleWinCondition[''] = '';

    //NEUTRAL KILLING


    roleName['serial killer'] = '**Serial Killer (Killing) [Unique]**';
    roleDescription['serial killer'] = 'A psychopathic killer who seeks only the blood of their victims.';
    roleFaction['serial killer'] = 'neutral killing';
    rolePassive['serial killer'] = '__[Deep Instinct]__ - \nYou are night attack immune and redirect immune.\n__[Thirst]__ - \nIf someone tries to roleblock you, you attack and clean their body.\n • This ability does not work if you are roleblocked by Veteran’s __[Snipe]__.\n__[Jailbreak]__ - \nIf the Jailor jails you and does not use __[Execute]__, you attack and clean their body.\n__[Overwhelm]__ - \nYou win if you are one of the last four living players.';
    roleNight['serial killer'] = '__[Stab]__ - \nAttack a target (not yourself).\n__[Berserk]__ - \nAttack two targets (not yourself).\n • Your attacks tonight will be unpreventable deaths.\n • You can only use this ability once.';
    roleDay['serial killer'] = '__[No Trace]__ - \nIf you attack tonight, you clean everyone you kill.\n • You will know the role and last will of your target(s).\n • You can only use this ability twice.';
    roleWinCondition['serial killer'] = '`Win condition: Kill all Town and Werewolf roles, or be one of the last four players.`';

    roleName['reaper'] = '**Reaper (Killing) [Unique]**';
    roleDescription['reaper'] = 'A silent killer who claims souls for their collection.';
    roleFaction['reaper'] = 'neutral killing';
    rolePassive['reaper'] = '__[Dead Inside]__ - \nYou are redirect immune and roleblock immune.\n__[Consume Souls]__ - \nYou start with 2 souls. If you would have died one night, you lose 2 souls instead.\n • Unpreventable death abilities do not kill you. You will only lose 2 souls.\n • This does not include Jailor’s [Execution].\n • If a Chronomancer uses [Time Warp] on you the night you would have“died”, you still lose 2 souls that night.\n • If you have less than 2 souls when attacked, you will die.\n__[Overwhelm]__ - \nYou win if you are one of the last 4 living players.';
    roleNight['reaper'] = '__[Reap]__ - \nReap a target (not yourself) and earn 2 souls.\n__[Circle of Death]__ - \nUse 2 souls to attack a target and all of the target’s visitors.\n• This attack is guaranteed to kill the target(s).\n• If you target yourself, you do not attack yourself.\n • You can only use this ability twice.';
    roleDay['reaper'] = '__[Icy Touch]__ - \nUse 1 soul and touch a target (not yourself). The target is muted and unable to vote for the rest of the day.\n • You can only use this ability 3 times.\n__[Fake Body]__ -\nUse 1 soul and touch a target (not yourself). If you kill or successfully reap your target tonight, your target will appear with your chosen role and last will.\n • You will know the original role and last will of the victim.\n • You can only use this ability twice.\n__[Gather Darkness]__ - \nUse 2 souls and make __[Reap]__ be an unpreventable death tonight.\n • You can only use this ability twice.';
    roleWinCondition['reaper'] = '`Win condition: Kill all Town and Werewolf roles, or be one of the last four players.`';

    roleName['enchantress'] = '**Enchantress (Killing) [Unique]**';
    roleDescription['enchantress'] = 'A mad sorcerer who kills people for fun.';
    roleFaction['enchantress'] = 'neutral killing';
    rolePassive['enchantress'] = '__[Dark Aura]__ - \nYou are night attack immune, redirect immune, and roleblock immune.\n__[Sorcery]__ - \nYour abilities do not count as visits.\n__[Deceit]__  - \nYou cannot be detected by an Investigator\'s __[Interrogate]__ or a Psychic’s __[Future Vision]__.\n__[Overwhelm]__ - \nYou win if you are one of the last four living players.';
    roleNight['enchantress'] = '__[Magic Missile]__ - \n Attack a target (not yourself). This attack cannot be healed or protected against.\n__[Curse Bomb]__ - \n Attack everyone who is cursed.\n • This attack causes unpreventable deaths.';
    roleDay['enchantress'] = '__[Curse]__ - \nCurse a target (not yourself). \n__[Curse Transfer]__ - \nMove a curse from a cursed player to an uncursed player.\n__[Puppet Magic]__ - \nForce someone to vote for someone else.\n • Both players are unable to vote for the rest of the day.\n • You can only use this ability twice.';
    roleWinCondition['enchantress'] = '`Win condition: Kill all Town and Werewolf roles, or be one of the last four players.`';

    roleName[''] = '';
    roleDescription[''] = '';
    roleFaction[''] = '';
    rolePassive[''] = '';
    roleNight[''] = '';
    roleDay[''] = '';
    roleWinCondition[''] = '';

}


function roleInfo(message, n) {
    if (roleName[n]) {
        const embed = new Discord.MessageEmbed()
            .setTitle(roleName[n])
            .setDescription(roleDescription[n]);
        if (rolePassive[n]) {
            embed.addField('**Ability (Passive):**', rolePassive[n]);
        }
        if (roleDay[n]) {
            embed.addField('**Ability (Day):**', roleDay[n]);
        }
        if (roleNight[n]) {
            embed.addField('**Ability (Night):**', roleNight[n]);
        }
        if (roleFaction[n] == 'wolf') {
            embed.setThumbnail('https://cdn.discordapp.com/attachments/811318948620009533/834935143067680778/wolf.png');
            embed.setColor('#c92222');
        } else if (roleFaction[n] == 'town') {
            embed.setThumbnail('https://cdn.discordapp.com/attachments/811318948620009533/836465882804781086/811428617946791936.png');
            embed.setColor('#1ba124');
        } else if (roleFaction[n] == 'neutral') {
            embed.setThumbnail('https://cdn.discordapp.com/attachments/811318948620009533/836466120739127306/754280937927213077.png');
            embed.setColor('#34a1eb');
            embed.addField('**Win Condition:**', roleWinCondition[n]);
        } else {
            embed.setThumbnail('https://cdn.discordapp.com/attachments/811318948620009533/836465942652518420/KellyKill.png');
            embed.setColor('#6b00d6');
            embed.addField('**Win Condition:**', roleWinCondition[n]);
        }


        message.channel.send(embed);
    } else {
        message.channel.send('Either that role doesn\'t exist, or it hasn\'t been added to the bot yet');
    }
}

client.login(config.token);
