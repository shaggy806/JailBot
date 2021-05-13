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
    '712787148272566372', //Shaggy
    '593477982761517085', //Beako
    '471875491951935490', //Apg
    '392866251149410305', //Mqnic
    '301847661181665280', //Reddid
    '659487529896116225', //Gazen
    '548760440444944386'  //rii



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
    'https://cdn.discordapp.com/attachments/811318948620009533/835231836987719771/unknown.png',
    'https://cdn.discordapp.com/attachments/818324491574575106/837114237834756167/image0.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/837036392936243260/Screenshot_20210427-1801582.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/837039638039363616/Screenshot_2021-04-28_115614.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/838625175158915132/Screenshot_20210427-1801582.png',
    'https://cdn.discordapp.com/attachments/811318948620009533/838625227318886450/image0.png',
    'https://media.discordapp.net/attachments/811318948620009533/842067874684207124/unknown.png'
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
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'Go to Brazil!',
    '<:sealhmm:811394376047001621>',
    'Tell Reddid to add that feature to catbot.'
];

var tipSplashes = [
    'Always write a will. Your will should at least include your actions so other town members will have an easier time catching the wolf.',
    'As a Jailor, do not small talk to the jailed, this will give away your personal identity.',
    'Vigilante and Veteran are easy fake claims, you should always leave a death note when you shoot someone so you can confirm yourself.',
    'TI should claim first thing in the morning, you will be more believable if you claim faster.',
    'Always fill in your role list when you see someone claim.',
    'If you see majority is reached in few seconds, you should be aware of the wolf in the vote.',
    'Never trust KC',
    'Kill Mqnic n1 as a werewolf',
    'Do not soft claim unless it\'s necessary, peoples are always suspicious of soft claims.',
    'If you think something is fishy, double check the role list, you might find something in there.',
    'Do not overthink as a werewolves or town player, the situation might be very simple.',
    'Try and only use facts to confirm other facts',
    'Don\'t sheep',
    'Remember you can preset your vote to someone else\'s in voting chat, such as "My vote is for whoever Shaggy votes for."',
    'Don\'t trust Apg'
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
            name: "Developed by Shaggy, HiHi, and Apg",  // The message shown
            //name: "Happy birthday Mafira!!!",
            type: "WATCHING" // PLAYING, WATCHING, LISTENING, STREAMING,
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
            roleInfo(message, args.join(' ').toLowerCase());
            break;
        case 'help':
            message.channel.send('```Jailbot command list\nprefix is w!\n\neveryone can access:\nw!nuke - nuke the server\nw!meme - shows a meme about werewolf\nw!roleinfo - shows the information of a role, the current role document in the bot is Fandom V2 Doc.\n\ngame host only:\nw!jail <ID> - jail a person\nw!jailor <ID> - set a person to jailor\nw!cleanjail - kick the jailed person\nw!cleanjailor - demote the jailor\nw!setjail <ID> - set a jailor chat\nw!setcell <ID> - set a jailed chat\n\nif you need additional help feel free to join our server or DM Beako```')
            break;
        default:
            break;
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
        default:
            break;
    }
});

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
    if (!jailed) return;
    cell.send(jailed.tag + ' is no longer jailed.');
    jailorChat.send(jailed.tag + ' is no longer jailed.');
    // cell.updateOverwrite(jailed, {
    //     VIEW_CHANNEL: false
    // });
    jailed = null;
}

function cleanJailor() {
    if (!jailor) return;
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

    //Town Killing

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

    //Town Protective

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
    
    //Town Investigative

    roleName['investigator'] = '**Investigator (Investigative)**';
    roleDescription['investigator'] = 'A detective who specializes in tracking activity during nighttime.';
    roleFaction['investigator'] = 'town';
    roleNight['investigator'] = '__[Investigate]__ - \nInvestigate a target (not yourself).\n • You are notified that your target is either Killing, Protective, Investigative, or Supportive.\n__[Interrogate]__ - \nInterrogate a target (not yourself).\n • You are notified that your target is either Not Suspicious (Town members, Alphawolves, and Neutral roles), or Suspicious (Werewolf members and Neutral Killing roles).';

    roleName['psychic'] = '**Psychic (Investigative)**';
    roleDescription['psychic'] = 'A trained mediator who uses their future vision to foresee possible threats.';
    roleFaction['psychic'] = 'town';
    rolePassive['psychic'] = '__[Corruption]__ - \nRevealed Mayors cannot appear in your visions.\n__[Disruption]__ - \nYou will not receive a vision if you are roleblocked, jailed, or fortified.\n__[Future Vision]__ - \nEvery odd-numbered night (1, 3, 5...), you will receive 3 possible evildoers.\n • At least one is a Werewolf member or a Neutral Killing role.\n__[Fortune Telling]__ - \nEvery even-numbered night (2, 4, 6...), you will receive 2 possible Town members.\n • At least one is a Town member. ';

    roleName['lookout'] = '**Lookout (Investigative)**';
    roleDescription['lookout'] = 'A camper who lurks to check night activities.';
    roleFaction['lookout'] = 'town';
    roleNight['lookout'] = '__[Observe]__ - \nObserve a target (not yourself). \n • You will know everyone who visits your target tonight. \n__[Track]__ - \nTrack a target (not yourself). \n • You will know everyone who is visited by your target tonight.';

    roleName['spy'] = '**Spy (Investigative)**';
    roleDescription['spy'] = 'A stealth agent who specializes in detecting Werewolf activity.';
    roleFaction['spy'] = 'town';
    rolePassive['spy'] = '__[Activity Detector]__ - \nAt the end of every night, you are notified of who was visited by Werewolf members. \n • You will not see these visits if you are roleblocked, jailed, or fortified.';
    roleNight['spy'] = '__[Little Bug]__ - \nBug a target (not yourself). \n • Tonight, you will know if the target was Attacked, Attacked but Healed, Attacked but Protected, Redirected, Redirected but Immune, Roleblocked, Roleblocked but Immune, Muted, or Muted but Immune.';

    roleName['cupid'] = '**Cupid (Investigative)**';
    roleDescription['cupid'] = 'A love-a-holic who matches two people to test their compatibility.';
    roleFaction['cupid'] = 'town';
    roleNight['cupid'] = '_[Matchmaking]__ - \nMatch a target (not yourself or a revealed Mayor). \n • You do a compatibility test with that target and a predetermined player. \n • For your first test, your predetermined player is randomized and given to you when you receive your role. \n • All subsequent tests will use the last successful target as the predetermined player. \n • You will only visit your targets.\nThe compatibility list is as follows (higher rows take priority): \n ° Pirate: Incompatible with everyone. \n ° Potion Master, Amnesiac, and Guardian Angel: Compatible with everyone. \n ° Headhunter: Compatible with everyone except for their target. \n ° Inquisitor: Compatible with everyone except Heathens. \n ° Fool, Witch, and Medusa: Compatible with non-Town members. \n ° Neutral Killing roles: Compatible with non-Town and non-Werewolf members. \n ° Town members and Werewolf members: Compatible with everyone in their faction.';
    
    //Town Supportive

    roleName['mayor'] = '**Mayor (Supportive) [Unique]**';
    roleDescription['mayor'] = 'The leader of the Town.';
    roleFaction['mayor'] = 'town';
    roleDay['mayor'] = '__[Reveal]__ - \nReveal yourself to the Town. \n • The host confirms your reveal. \n • Once revealed, your votes will be worth twice as much. \n__[Force Lynch]__ - \nForce lynch a target (not yourself). \n • You can only use this ability once.';

    roleName['medium'] = '**Medium (Supportive) [Unique]**';
    roleDescription['medium'] = 'A maniac claiming to be able to communicate with the dead.';
    roleFaction['medium'] = 'town';
    rolePassive['medium'] = '__[Determined]__ - \nYou are redirect immune and roleblock immune. \n__[Communicate]__ - \nYou have access to #graveyard-chat.\n__[Seance]__ - \nSeance a living player. \n • This is a dead ability \n • Today, they may speak in #graveyard-chat. \n • You can only use this ability once.';

    roleName['retributionist'] = '**Retributionist (Supportive) [Unique]**';
    roleDescription['retributionist'] = 'A ritualist who reanimates dead Town members.';
    roleFaction['retributionist'] = 'town';
    rolePassive['retributionist'] = '__[Sharp Mind]__ - \nYou are redirect immune.';
    roleNight['retributionist'] = '__[Reanimate]__ - \nReanimate a dead Town member. \n • You are able to use your target’s night ability if they have one. \n • If your target ran out of charges for their ability before or on their death, your reanimation will fail. \n • You do not visit your reanimated Town member, but your reanimated Town member will visit your other target (if applicable). \n • Once you reanimate a dead Town member once, their corpse rots and you can no longer reanimate it. \n • You cannot reanimate cleaned people, Town members who are shown as not town, Jailors, Veterans, Builders, Mayors, Mediums, or Vigilantes who committed suicide.';

    roleName['drunk'] = '**Drunk (Supportive)**';
    roleDescription['drunk'] = 'A person who has fun by messing with people with alcohol.';
    roleFaction['drunk'] = 'town';
    rolePassive['drunk'] = '__[I am the Liquor]__ - \nYou are redirect immune and roleblock immune.';
    roleNight['drunk'] = '__[Debauchery]__ - \nRedirect a target (not yourself) to another target. \n • They know they were redirected and who they were redirected to. \n • If you redirect a target to yourself, you gain night attack immunity against your target. \n • You visit your target, but not the person you redirect your target to.';

    roleName['escort'] = '**Escort (Supportive)**';
    roleDescription['escort'] = 'A beauty who distracts people.';
    roleFaction['escort'] = 'town';
    rolePassive['escort'] = '__[The Real Beauty]__ - \nYou are redirect immune and roleblock immune.';
    roleNight['escort'] = '__[Distraction]__ - \nRoleblock a target (not yourself).';

    roleName['chronomancer'] = '**Chronomancer (Supportive)**';
    roleDescription['chronomancer'] = 'A skilled magician who is capable of delaying someone’s death.';
    roleFaction['chronomancer'] = 'town';
    roleNight['chronomancer'] = '__[Time Warp]__ - \nWarp a target (not yourself). \n • If that person would have died tonight, their death is delayed by 2 nights. \n • If you delay someone’s death on night 1, they will die night 3. \n • You and your target are notified if you successfully delay their death. \n • Delayed deaths can be healed by Doctors. \n • You cannot delay unpreventable deaths. \n__[Distorted Reality]__ - \nTarget someone. \n • Your target will receive the effects of the earliest delayed death.';
    roleDay['chronomancer'] = '__[Pocket Dimension]__ - \nIf you were supposed to die tonight, your death will be delayed by 2 nights. \n • You can only use this ability once.';

    //Template

    roleName[''] = '';
    roleDescription[''] = '';
    roleFaction[''] = '';
    rolePassive[''] = '';
    roleNight[''] = '';
    roleDay[''] = '';
    roleWinCondition[''] = '';
    

    //WOLVES

    //Wolf Killing

    roleName['alphawolf'] = '**Alphawolf (Killing) [Unique]**';
    roleDescription['alphawolf'] = 'The leader of the Werewolf members.';
    roleFaction['alphawolf'] = 'wolf';
    rolePassive['alphawolf'] = '';
    roleNight['alphawolf'] = '';
    roleDay['alphawolf'] = '';

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

    roleName['consigliere wolf'] = '**Consigliere Wolf (Investigative)**';
    roleDescription['consigliere wolf'] = 'A Werewolf who specializes in learning the roles of people.';
    roleFaction['consigliere wolf'] = 'wolf';
    roleNight['consigliere wolf'] = '__[Analyze]__ - \nTarget two people (not Werewolf members). \n • If they are compatible via Cupid compatibility rules, you learn their roles. \n • This ability does not count as a visit.\n__[Forgery]__ - \nTarget someone (not a Werewolf). \n • If your target dies tonight, you forge your target’s last will. \n • You can only use this ability twice.';

    roleName['blackmailer wolf'] = '**Blackmailer Wolf (Investigative)**';
    roleDescription['blackmailer wolf'] = 'A Werewolf who specializes in threatening people with secrets.';
    roleFaction['blackmailer wolf'] = 'wolf';
    rolePassive['blackmailer wolf'] = '__[Quiet Feet]__ - \nYour abilities do not count as visits.';
    roleNight['blackmailer wolf'] = '__[Blackmail]__ - \nBlackmail a target (not a Werewolf). \n • Your target is muted for the next day. \n__[Gossip]__ - \nLearn your target’s ability feedback.';
    roleDay['blackmailer wolf'] = '__[Strange Disappearance]__ - \nWhen the night begins, the Jailor’s prisoner is revealed to you. \n • You can only use this ability 3 times.';

    roleName['wolf mystic'] = '**Wolf Mystic (Investigative) [Unique]**';
    roleDescription['wolf mystic'] = 'A wolf who utilizes psychic powers to help the Werewolf members.';
    roleFaction['wolf mystic'] = 'wolf';
    rolePassive['wolf mystic'] = '__[Tunnel Vision]__ - \nAt the start of each night, you see 3 existing roles in the game. \n • These roles cannot be Jailor or Werewolf members. \n • Role results cannot overlap.\n__[Stealth]__ - \nYour actions cannot be detected by Spies. \n__[Determination]__ - \nDead Werewolf members can still communicate. \n • This ability is removed upon your death.';
    roleNight['wolf mystic'] = '__[Misguided]__ - \nMisguide on a target (not yourself). \n • If that target is lynched the next day, their role is revealed as a role with a last will of your choice. \n • You are informed of their real role. \n • You can only use this ability twice.';

    roleName['janitor wolf'] = '**Janitor Wolf (Supportive) [Unique]**';
    roleDescription['janitor wolf'] = 'A Werewolf who specializes in erasing targets’ traces.';
    roleFaction['janitor wolf'] = 'wolf';
    rolePassive['janitor wolf'] = '__[Forewarn]__ - \nIf there is a Medium or a Retributionist in the game, you are notified about it.';
    roleNight['janitor wolf'] = '__[Clean]__ - \nThe Werewolf kill target(s)are cleaned tonight. \n • Their role(s) and last will(s) are revealed to the Werewolf members. \n • This ability does not count as a visit. \n • You can only use this ability 3 times.';

    roleName['alcoholic wolf'] = '**Alcoholic Wolf (Supportive)**';
    roleDescription['alcoholic wolf'] = 'A Werewolf who specializes in making people drunk.';
    roleFaction['alcoholic wolf'] = 'wolf';
    rolePassive['alcoholic wolf'] = '__[I am the liquor]__ - \nYou are redirect immune and roleblock immune.';
    roleNight['alcoholic wolf'] = '__[Debauchery]__ - \nRedirect a target (not a Werewolf) to another target. \n •They know they were redirected and who they were redirected to. \n • If you redirect a target to yourself, you gain night attack immunity against your target. \n • You visit your target, but not the person you redirected your target to. \n__[Drunken]__ - \nRedirect your target(not a Werewolf) into themselves. \n • The target\'s night attack immunity is removed for this night. \n • This ability bypasses redirection immunity. \n • You can only use this ability twice.';

    roleName['butler wolf'] = '**Butler Wolf (Supportive)**';
    roleDescription['butler wolf'] = 'A Werewolf who specializes in distracting people.';
    roleFaction['butler wolf'] = 'wolf';
    rolePassive['butler wolf'] = '__[Deitiful]__ - \nYou are redirect immune and roleblock immune.';
    roleNight['butler wolf'] = '__[Serve Wine]__ - \nRoleblock a target (not a Werewolf). \n__[Happy Hour]__ - \nRoleblock a target (not a Werewolf). \n • The target\'s night attack immunity is removed for tonight. \n • This ability bypasses roleblock immunity. \n • You can only use this ability twice.';

    roleName['necromancer wolf'] = '**Necromancer Wolf (Supportive) [Unique]**';
    roleDescription['necromancer wolf'] = 'A wolf who specializes in messing with dead people.';
    roleFaction['necromancer wolf'] = 'wolf';
    rolePassive['necromancer wolf'] = '__[Sharpmind]__ - \nYou are redirect immune. \n__[Stealth]__ - \nYour actions cannot be detected by a Spy.';
    roleNight['necromancer wolf'] = '__[Reanimate]__ - \nReanimate a dead player. \n • You are able to use your target’s night ability if they have one. \n • If your target ran out of charges for their ability before or on their death, your reanimation will fail. \n • You do not visit your reanimated player, but your reanimated player will visit your other target (if applicable). \n • Once you reanimate a dead player member once, their corpse rots and you can no longer reanimate it. \n • You cannot reanimate cleaned people, Jailors, Veterans, Builders, Mayors, Mediums, Vigilantes who committed suicide, Alphawolves, Wolf Apprentices, Wolfcubs, Guardian Angels, Headhunters, Fools, Amnesiacs, or Pirates. \n__[Defile]__ - \nDefile a target (not a Werewolf). \nIf that target dies tonight, their role is shown as your chosen role. \n • You learn the target’s real role. \n • You remove the target’s last will. \n • You can only use this ability twice.';

    roleName['wolf knight'] = '**Wolf Knight (Protective) [Unique]**';
    roleDescription['wolf knight'] = 'A wolf who specializes in making sure the targets of wolves die.';
    roleFaction['wolf knight'] = 'wolf';
    roleNight['wolf knight'] = '__[Frenzy]__ - \nThe attacking Werewolf is guaranteed to kill their targets tonight. \n • You can only use this ability twice. \n__[Protection]__ - \nRoleblock everyone who visits Werewolf members tonight. \n • You can only use this ability twice.';

    roleName['stalker wolf'] = '**Stalker Wolf (Investigative) [Unique]**';
    roleDescription['stalker wolf'] = 'A wolf who specializes in sneaking around the town at night.';
    roleFaction['stalker wolf'] = 'wolf';
    roleNight['stalker wolf'] = '__[Quiet Night]__ - \nTonight, Werewolf members do not visit. \n • Werewolf attacks also bypass night attack immunity. \n • You can only use this ability twice.\n__[Stalk]__ - \nTarget someone (not a Werewolf). \n • You will know everyone who visits your target tonight. \n • You will know everyone who is visited by your target tonight.';


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
    roleNight['potion master'] = '__[Potion of Healing]__ - \nHeal a target (not yourself). \n__[Potion of Wisdom]__  - \nCheck a target (not yourself)\n • If you target a Guardian Angel or a Headhunter, you also learn their target.\n • You can only use this ability twice.\n__[Potion of Aggression]__ -\nAttack a target (not yourself).\n • You can only use this ability twice.\n__[Potion of Disruption]__ - \nRoleblock a target (not yourself).\n • You can only use this ability twice.';
    roleDay['potion master'] = '__ [Potion of Survival] __ - \nBecome night attack immune tonight.\n • You can only use this ability 3 times.';
    roleWinCondition['potion master'] = '`Win Condition: See yourself survive until the game ends.`';

    roleName['headhunter'] = '**Headhunter/Executioner (Investigative)**';
    roleDescription['headhunter'] = 'A vengeful person which has a strong grudge against a certain Town member.';
    roleFaction['headhunter'] = 'neutral';
    rolePassive['headhunter'] = '__[Grudge] __ - \nYou are randomly assigned a Town member at the start of the game.\n • You will know your target’s role.\n • Your target cannot be a Jailor, Veteran, Builder, Mayor, or Medium.\n • If your target dies by any means other than lynching, you will become a Fool without __[Jack-in-a-box]__  and __[Frame]__.\n__ [Resolve]__  - \nYou are night attack immune.';
    roleWinCondition['headhunter'] = '`Win Condition: See your target lynched.`';

    roleName['inquisitor'] = '**Inquisitor (Investigative) [Unique]**';
    roleDescription['inquisitor'] = 'A ruthless hunter on the quest to see the heathens killed.';
    roleFaction['inquisitor'] = 'neutral';
    rolePassive['inquisitor'] = '__[Heathen Hunting]__ - \n3 people are randomly assigned as Heathens at the start of the game.\n • Jailor, Mayor, Medium, Veteran, Alphawolf and Neutral roles cannot be Heathens. \n • At least one Werewolf member is a Heathen.\n • Heathens will be notified that they are Heathens. \n • You will be notified about the starting roles of Heathens.\n • If a Heathen dies, you will be notified that they died.\n • Once you win the game, your abilities will be disabled.';
    roleNight['inquisitor'] = '__[Track]__ - \nTarget someone. You will learn your target’s role.\n • If the target is a Heathen, you will be notified as well.\n__[Ruthless Efficiency]__ - \nAttack your target. This attack ignores night attack immunity, protection and healing.\n • You can only use this ability 3 times.';
    roleWinCondition['inquisitor'] = '`Win Condition: See all Heathens killed while you are alive.`';

    roleName['vampire'] = '**Vampire (Supportive)**';
    roleDescription['vampire'] = 'A mysterious entity who endlessly thirsts for blood.';
    roleFaction['vampire'] = 'neutral';
    rolePassive['vampire'] = '__[Nocturnal Instinct]__ - \nYou have access to #vampire-chat.';
    roleNight['vampire'] = '__[Bite]__ - \nBite a target (not a Vampire).\nThis ability can only be performed by the youngest Vampire.\nOn night one, the youngest Vampire is randomized.\n • If your target is a Town member, they are converted to a Vampire.\n• If four Vampires are alive, this ability attacks them.\n• If your target is a convert immune Town member, they are attacked.\n • If your target is a Neutral role, they are attacked.\n • This ability can be healed and protected against.\n• You can only use this ability every other night.\n • If your target is a Town member who dies tonight, this timer is null.\n• If your target is a Neutral role or you are roleblocked, this timer applies.';
    roleWinCondition['vampire'] = '`Win condition: See the Town members and Neutral Killing eliminated.`';

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

    //custom roles


    roleName['shaggy'] = '**Shaggy (Unique)**';
    roleDescription['shaggy'] = 'The madman who programmed this bot.';
    roleFaction['shaggy'] = 'town';
    rolePassive['shaggy'] = '__[Lord of the Sealhmms]__ - \n<:sealhmm:811394376047001621>'
   
    roleName['hihi'] = '**HiHi/Beatrice (Unique)**';
    roleDescription['hihi'] = 'She\'s the owner of this server.';
    roleFaction['hihi'] = 'neutral';
    roleDay['hihi'] = '__[Nuke]__ - \nNuke the server.\n - You can only nuke a server once.'
    roleWinCondition['hihi'] = 'Nuke the server';
   
    roleName['gazen'] = '**Gazen (Neutral Killing)**';
    roleDescription['gazen'] = 'Milk';
    roleFaction['gazen'] = 'neutral killing';
    roleNight['gazen'] = '__[Milk Explosion]__ - \nKill a player\n • This is an unpreventable death\n__[Milk Abuse]__ - \nBlast every player that visits you\n__[Milk Gore]__ - \nIf two players visit you make them go on a rampage, killing two other players.';
    roleWinCondition['gazen'] = 'Be in the last 4 players.';
   
    roleName['mafira'] = '**Mafira1071 [Unique]**';
    roleDescription['mafira'] = 'A troller who is great at imagining fake scenarios.';
    roleFaction['mafira'] = 'neutral killing';
    roleDay['mafira'] = '__[Troll]__ - \nMake fun of someone\'s stupid comment.\n • This counts as an attack';
    roleWinCondition['mafira'] = 'Troll at least 3 people';
   
}


function roleInfo(message, n) {
 if (n == 'vampire hunter') {
        message.channel.send('https://media.discordapp.net/attachments/798464321775861760/838564330341007447/unknown.png');
        return;
    }
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
            embed.setThumbnail('https://media.discordapp.net/attachments/811318948620009533/842248711660371968/felixangry.png');
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
        console.log(roleName[n])
        message.channel.send('Either that role doesn\'t exist, or it hasn\'t been added to the bot yet');
    }
}

client.login(config.token);
