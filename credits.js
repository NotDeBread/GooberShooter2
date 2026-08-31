//DIALOGUE STUFF

let dialogueProgress = 0
let dialogueActive = false
const exmapleDialogue = [
    {
        name: 'FELLA',
        nameCol: [175,122,255],
        portrait: 'graphics/characters/fellaPortraitLarge.png',

        text: 'This is an example dialogue sequence.'
    },
    {
        text: 'It is really cool 🔥🔥'
    },
    {
        noPortrait: true,
        noName: true,
        text: 'This is some bland dialogue'
    },
    {
        name: 'BREAD',
        nameCol: [244, 175, 84],
        portrait: 'graphics/characters/debreadPortraitLarge.png',

        text: 'whats up guys its me bread'
    },
    {
        text: 'Today we are going to demonstrate how innerHTML can effect this dialogue system.'
    },
    {
        text: 'With the way it currently works, raw HTML can be injected into any part of the dialogue body or name.'
    },
    {
        text: 'Like check out this picture of buddy: <img src="graphics/placeholder.png" width="75";>'
    },
    {
        text: 'It kinda looks fucked up but whatever'
    },
    {
        text: 'Anyways this isn\'t just limited to the body text, this can also be applied to the character name, for some reason.'
    },
    {
        name: 'Buddy <img src="graphics/placeholder.png" width="25";>',
        nameCol: [74, 65, 58],
        text: 'Hi im buddy <img src="graphics/placeholder.png" width="50" style="transform: skewX(-50deg); margin-left: 50px;">',
        portrait: 'graphics/placeholder.png',
    }
]

const dialogues = {
    fellaDrawing: [
        {
            name: 'FELLA',
            nameCol: [175,122,255],
            portrait: 'graphics/credits/portraits/fellaSlouchedFocused.png',

            text: '...'
        },
        {
            portrait: 'graphics/credits/portraits/fellaSlouchedTalkFocused.png',
            text: 'Yo whats up',
        },
        {
            portrait: 'graphics/credits/portraits/fellaSlouched.png',
            noName: true,
            options: [
                {
                    text: 'Who are you bro',
                    onclick: () => {
                        progressFunction()
                        progressFunction()
                        startDialogueSequence(dialogues.fellaAbout)
                        saveData.hasTalkedToFella = true
                    }
                },
                {
                    text: 'Goober Shooter 2',
                    onclick: () => {
                        progressFunction()
                        progressFunction()
                        startDialogueSequence(dialogues.fellaGooberShooter)
                        saveData.hasTalkedToFella = true
                    }
                },
                {
                    text: 'SkillsUSA',
                    onclick: () => {
                        progressFunction()
                        progressFunction()
                        startDialogueSequence(dialogues.fellaSkills)
                        saveData.hasTalkedToFella = true
                    }
                },
                {
                    text: 'carpet',
                    onclick: () => {
                        progressFunction()
                        progressFunction()
                        startDialogueSequence([
                            {
                                name: 'FELLA',
                                nameCol: [175,122,255],
                                portrait: 'graphics/credits/portraits/fellaBothered.png',

                                text: 'Fuck off'
                            },
                            {
                                text: 'I know the carpet texture is messed up.',
                                portrait: 'graphics/credits/portraits/fellaFocused.png',
                            },
                            {
                                text: 'I don\'t really care enought to fix it.',
                                portrait: 'graphics/credits/portraits/fellaBothered.png',
                            }
                        ])
                        saveData.hasTalkedToFella = true
                    }
                },
            ]
        },
        {
            portrait: 'graphics/credits/portraits/fellaSlouchedTalkFocused.png',
            text: 'okay cya'
        },
    ],
    fellaAbout: [
        {
            name: 'FELLA',
            nameCol: [175,122,255],
            portrait: 'graphics/credits/portraits/fella.png',

            text: '...'
        },
        {
            portrait: 'graphics/credits/portraits/fellaBothered.png',
            text: '...okay'
        },
        {
            text: 'I\'m <strong style="color: rgb(175,122,255)">Fella</strong>',
            portrait: 'graphics/credits/portraits/fella.png',
        },
        {
            text: 'I\'m the one responsible for this mess of a game.',
            portrait: 'graphics/credits/portraits/fellaContent.png',
        },
        {
            text: 'And you\'re here early too. The game isn\'t even complete yet.',
            portrait: 'graphics/credits/portraits/fellaHappy.png',
        },
        {
            text: 'I hope it hasn\'t been shitty for you.<br>The state of the game right now is kinda odd...',
            portrait: 'graphics/credits/portraits/fellaBothered.png',
        },
        {
            text: 'Some features are over-polished and well complete, while some are just the bare minimum to get the game playable.'
        },
        {
            text: 'Anyways that\'s enough about Goober Shooter 2',
            portrait: 'graphics/credits/portraits/fella.png',
        },
        {
            text: 'I work on other stuff too, like umm...',
            portrait: 'graphics/credits/portraits/fellaAkward.png',
        },
        {
            text: 'Press the Button?',
            portrait: 'graphics/credits/portraits/fellaWorry.png',
        },
        {
            text: 'idk...',
            portrait: 'graphics/credits/portraits/fellaBothered.png',
        },
        {
            text: 'I\'ve made a couple of other games like <strong>Winnie Accumulator</strong> which was popular for a little bit.',
            portrait: 'graphics/credits/portraits/fellaBotheredTalk.png',
        },
        {
            text: 'Popular enough to get \'DeBread\' as a blocked keyword on my school\'s computers.',
            portrait: 'graphics/credits/portraits/fellaAkward.png',
        },
        {
            text: 'My teacher even played it (BOBBY UP ✊✊)',
            portrait: 'graphics/credits/portraits/fellaHappy.png',
        },
        {
            text: 'I don\'t really have much to talk about regarding me',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        },
        {
            text: 'I\'m just a chud who sits on the puter all day',
            portrait: 'graphics/credits/portraits/fellaBotheredTalk.png',
        },
    ],
    fellaGooberShooter: [
        {
            name: 'FELLA',
            nameCol: [175,122,255],
            portrait: 'graphics/credits/portraits/fella.png',
            
            text: 'Goober Shooter 2?'
        },
        {
            text: 'I\'ve been working in it consistently for about eight months now...',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        },
        {
            text: 'And it is definitely my largest project to date.',
            portrait: 'graphics/credits/portraits/fellaContent.png',
        },
        {
            text: 'I\'m really happy on how it\'s turning out so far!',
            portrait: 'graphics/credits/portraits/fellaHappy.png',
        },
        {
            text: 'This is a sequal to an older game I made, Goober Shooter',
            portrait: 'graphics/credits/portraits/fella.png',
        },
        {
            text: '(Who would\'ve guessed...)',
            portrait: 'graphics/credits/portraits/fellaBothered.png',
        },
        {
            text: 'This game was originally going to be a roguelike more similar to The Binding of Isaac called <strong>BREABS PURGATORY</strong>',
            portrait: 'graphics/credits/portraits/fella.png',
        },
        {
            text: 'Where you could explore special rooms, fight bosses, and collect items.',
            portrait: 'graphics/credits/portraits/fellaTalk.png',
        },
        {
            text: 'But that ended up being extremely difficult though since this <em>is</em> being ran in a web enviroment.',
            portrait: 'graphics/credits/portraits/fellaAkward.png',
        },
        {
            text: 'So I ended up just making it into a sequel of Goober Shooter.',
            portrait: 'graphics/credits/portraits/fellaWorry.png',
        },
        {
            text: 'Someday I might make Breab\'s Purgatory if I learn a actual game engine.',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        }
    ],
    fellaSkills: [
        {
            name: 'FELLA',
            nameCol: [175,122,255],
            portrait: 'graphics/credits/portraits/fella.png',
            
            text: '<strong>SkillsUSA</strong> is some kind of technical student orginization that hosts a variety of contests related to trade work.'
        },
        {
            text: 'There happened to be a \'Interactive Application and Video Game Development\' competition which my tech school teacher told me about. (BOBBY UP ✊✊)',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        },
        {
            text: 'I was already working on Goober Shooter 2 at the time so I decided it would be a good idea to sign up for it.',
            portrait: 'graphics/credits/portraits/fellaContent.png',
        },
        {
            text: 'I ended up making it to the state level because I was the only one who participated on the district level...',
            portrait: 'graphics/credits/portraits/fellaAkward.png',
        },
        {
            text: 'For state I had to make a display booth to showcase my game, which took a couple of days to make.',
            portrait: 'graphics/credits/portraits/fella.png',
        },
        {
            text: 'It turned out really good!',
            portrait: 'graphics/credits/portraits/fellaHappy.png',
        },
        {
            text: 'The day of the event finally came around, there were around 20 participants.',
            portrait: 'graphics/credits/portraits/fella.png',
        },
        {
            text: 'We all got our displays put up and had a couple of hours to play each others games.',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        },
        {
            text: 'Some of games were very impressive considering all of them were made by highschoolers.',
            portrait: 'graphics/credits/portraits/fellaTalk.png',
        },
        {
            text: 'But, not to be an egotistical guy,',
            portrait: 'graphics/credits/portraits/fellaTalkFocused.png',
        },
        {
            text: 'I felt Goober Shooter 2 was the most polished out of the bunch.',
            portrait: 'graphics/credits/portraits/fellaAkward.png',
        },
        {
            text: '(Even some of the other devs agreed.)',
            portrait: 'graphics/credits/portraits/fellaContent.png',
        },
        {
            text: 'After the two hours passed, we all waited outside of the classroom while the judging was done.',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        },
        {
            text: 'This process took FOREVER',
            portrait: 'graphics/credits/portraits/fella.png',
        },
        {
            text: 'After we went to lunch, I took a peek inside of the classroom to see how the judging is going.',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        },
        {
            text: 'I noticed on my laptop that the game was left on the GAME OVER screen.',
            portrait: 'graphics/credits/portraits/fellaWorry.png',
        },
        {
            text: 'Which showed that the judge lost on <strong>WAVE 3</strong>',
            portrait: 'graphics/credits/portraits/fellaBothered.png',
        },
        {
            text: 'Blud didn\'t even make it to the first shop and gave up.',
            portrait: 'graphics/credits/portraits/fellaSad.png',
        },
        {
            text: 'Anyways, after like four hours or something we finally got taken into the classroom for one-on-one conversations with the judge.',
            portrait: 'graphics/credits/portraits/fella.png',
        },
        {
            text: 'Once my turn rolled around, he said that the melee felt too weak (he didn\'t know how to parry) and I didn\'t have merch (???)',
            portrait: 'graphics/credits/portraits/fellaMad.png',
        },
        {
            text: 'All of the controls were listed ON THE TRIFOLD, and there was a TUTORIAL, which I\'m assuming he didn\'t play since he didn\'t know how to parry.',
            portrait: 'graphics/credits/portraits/fellaMadTalk.png',
        },
        {
            text: 'But to be honest, the tutorial button <em>is</em> kind of small so I guess it could be easy to miss.',
            portrait: 'graphics/credits/portraits/fellaBothered.png',
        },
        {
            text: 'Still, I think he could\'ve at least got to the first shop before saying it is too difficult.',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        },
        {
            text: 'The next day, the results were announced',
            portrait: 'graphics/credits/portraits/fella.png',
        },
        {
            text: 'My game didn\'t make 1st 2nd, OR EVEN 3rd.',
            portrait: 'graphics/credits/portraits/fellaBothered.png',
        },
        {
            text: 'My game ended up being in 4th place.',
            portrait: 'graphics/credits/portraits/fellaSad.png',
        },
        {
            text: 'At the time I was PISSED.',
            portrait: 'graphics/credits/portraits/fellaTalk.png',
        },
        {
            text: 'Months of work only to not even get a bronze medal.',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        },
        {
            text: 'Going to state <em>was</em> an awesome experience though,',
            portrait: 'graphics/credits/portraits/fellaTalk.png',
        },
        {
            text: 'I got to meet a lot of really cool people because of it!',
            portrait: 'graphics/credits/portraits/fellaHappy.png',
        },
        {
            text: 'Some of whose characters are in this game, (Ones with the SkillsUSA tag.)',
            portrait: 'graphics/credits/portraits/fellaContent.png',
        },
        {
            text: 'We all made a Discord server together to share our progress on our games since almost all of them were unfinished.',
        },
        {
            text: 'But yeah that about it for my rant.',
            portrait: 'graphics/credits/portraits/fellaFocused.png',
        }
    ],
    dottr: [
        {
            name: 'DOTTR',
            nameCol: [255,122,175],
            portrait: 'graphics/credits/portraits/dottr.png',

            text: '...'
        },
        {
            text: '(They have nothing to say...)',
            noName: true,
        },
        {
            text: '(Hopefully they will soon...)',
            noName: true,
        },
    ],
    plinkel: {
        intro: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
    
                text: 'Huh... Whuh?',
            },
            {
                text: 'What\'d I do? Am I in trouble?',
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                noName: true,
                options: [
                    {
                        text: 'Who are you?',
                        onclick: () => {
                            progressFunction()
                            startDialogueSequence(dialogues.plinkel.about)
                        }
                    },
                    {
                        text: 'What\'s with all your characters?',
                        onclick: () => {
                            progressFunction()
                            startDialogueSequence(dialogues.plinkel.characters)
                        }
                    },
                    {
                        text: 'Goober?',
                        onclick: () => {
                            progressFunction()
                            startDialogueSequence(dialogues.plinkel.goober)
                        }
                    },
                    {
                        text: 'No socials?',
                        onclick: () => {
                            progressFunction()
                            startDialogueSequence(dialogues.plinkel.socials)
                        }
                    },
                ]
            },
        ],
        about: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkelAway.png',
    
                text: 'Uhh..',
            },
            {
                text: 'I think <strong style="color: rgb(175,122,255)">Fella</strong> calls me Plonk, but you can call me whatever. I\'m one of his friends, and... I made a lot of the art you see in the game.',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'Mostly of my characters, but a few of the other ones.',
            },
            {
                text: 'Oh, and the guns.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'A LOT of the guns.',
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
            },
            {
                text: 'I\'m the reason he had to lift the size limitations on weapons, cause...',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'I\'m... Not, great, at drawing.',
                portrait: 'graphics/credits/portraits/plinkelSad.png',
            },
            {
                text: 'At all.',
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
            },
            {
                text: 'He prefers when I do it for my guys though, since, well, I guess I\'m the only one who can really draw them correctly.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'Not for a lack of other people trying!',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: '<strong style="color: rgb(175,122,255)">Fella</strong> tries all the time!'
            },
            {
                text: 'Even I mess it up super often,',
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
            },
            {
                text: 'like, with Mary,',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'her sprite in this game is a homunculus borne from me shitting out a sprite that was the wrong resolution and <strong style="color: rgb(175,122,255)">Fella</strong> squishing it.',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'Beyond that... I mean,'
            },
            {
                text: 'I just exist?',
                portrait: 'graphics/credits/portraits/plinkelIdk.png'
            },
            {
                text: 'Kind of?',
                portrait: 'graphics/credits/portraits/plinkelSadder.png'
            },
            {
                text: 'I don\'t want to say too much.',
                portrait: 'graphics/credits/portraits/plinkelAway.png'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                noName: true,
                options: [
                    {
                        text: 'Tell me more!',
                        onclick: () => {
                            progressFunction()
                            startDialogueSequence(saveData.hasTalkedToFella ? dialogues.plinkel.aboutPressured : [{text: 'Hey, leave me alone! Shouldn\'t you talk to the guy who made the game??'}])
                        }
                    }
                ]
            }
        ],
        aboutPressured: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
    
                text: 'Alright! Jeez, don\'t yell!',
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'I\'m a little older than Fella, though not by much, and... I\'ve been drawing for a little longer than him.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
                text: 'Not that I\'m any better than him... He\'s my superior in a lot of ways.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'While I come from a background of dabbling in Java and C++, Fella mastered JavaScript and webdev, letting this whole game happen!'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelPumped.png',
                text: 'I\'m really proud of how far he\'s come in the time I\'ve known him.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'He doesn\'t want to admit it, but he\'s a much better artist than I am, or, at the very least, improving a lot faster.'
            },
            {
                text: 'I\'ve been doodling since I was 13, and it took him a quarter of the time it took for me to get to the level he\'s at.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
                text: 'But, then again, we\'ve also met a few prodigies in our circles...'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
                text: 'Uhh... I also used to write. A lot. Much of it is deleted, but there\'s also a good breadth archived here and there. I doubt Fella\'s read any of it, though.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'I want to get back into it, but the person I used to bounce ideas off of vanished a good while ago.'
            },
            {
                text: 'To me, the fun part about writing stories was the collaboration, seeing what other people thought and how the both of you could improve the work through conversation.'
            },
            {
                text: 'Recently, it\'s been MODDING that\'s filling that hole for me. There\'s a lot more nerdy modders than writers, so I\'ve found other people to bounce ideas off of.'
            },
            {
                portrait:'graphics/credits/portraits/plinkelSadder.png',
                text: 'Only problem...'
            },
            {
                portrait:'graphics/credits/portraits/plinkelAway.png',
                text: 'Modding takes SOOOOO LOOOOONNNGGGG...'
            },
            {
                portrait:'graphics/credits/portraits/plinkel.png',
                text: 'You have to learn the tools for the game you\'re modding, design levels, make assets, code, all this other crap. It\'s nowhere near as accessible, but that\'s also what makes more people get together to make a mod happen.'
            },
            {
                portrait:'graphics/credits/portraits/plinkelIdk.png',
                text: 'A double-edged sword, if you must.'
            },
            {
                portrait:'graphics/credits/portraits/plinkel.png',
                text: 'The games I\'ve modded are mostly things on GoldSrc and Source, like Half-Life, Left 4 Dead, Gmod, Postal 3, etc., but I\'ve also dabbled in weirder stuff like NecroVision, PainKiller, Postal 2, S.T.A.L.K.E.R., and other stuff I\'ve probably forgotten about.'
            },
            {
                portrait:'graphics/credits/portraits/plinkelEmbarrassed.png',
                text: 'Like, uh, RPG Maker, if that counts... Mostly 2003 and VX Ace.'
            },
            {
                portrait:'graphics/credits/portraits/plinkel.png',
                text: 'None of my mods are extensive enough to publish... Yet.'
            },
            {
                portrait:'graphics/credits/portraits/plinkelPumped.png',
                text: 'One day, though!'
            },
            {
                portrait:'graphics/credits/portraits/plinkel.png',
                text: 'I also really like messing with hardware, kinda like Fella, but in different ways.'
            },
            {
                text: 'He works on computers and does I.T., I work on consoles, cars, HVAC and other crap. I mean, computers too, but they\'re like, too comfortable for me.'
            },
            {
                text: 'I like it when I\'m having to figure out some incomprehensible mess and slowly piece it together back into shape.'
            },
            {
                portrait:'graphics/credits/portraits/plinkelIdk.png',
                text: 'Must be why I mod GoldSrc.'
            },
            {
                portrait:'graphics/credits/portraits/plinkelSadder.png',
                text: 'Okay, is that enough for you? I- I\'m getting nauseous from all this attention...'
            },
        ],
        characters: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkel.png',
    
                text: 'That started with me drawing <strong style="color: #592c23;">Lorna</strong> in the style of Goober Shooter on a whim.',
            },
            {
                text: '<strong style="color: rgb(175,122,255)">Fella</strong> liked the idea, so I thought up of some game mechanics and edited it a little further so he could make a full character out of it.'
            },
            {
                text: 'Since then, I kind of just...',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'Well, I pester the living shit out of him to add what I think would be interesting.',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                name: 'FELLA',
                nameCol: [175,122,255],
                portrait: 'graphics/credits/portraits/fella.png',

                text: 'Bro your ideas are awesome what'
            },
            {   
                text: 'I don\'t ever get annoyed at people throwing ideas at me.',
                portrait: 'graphics/credits/portraits/fellaTalk.png'
            },
            {
                text: 'It\'s actually what I encourage from people playing the game!',
                portrait: 'graphics/credits/portraits/fellaContent.png'
            },
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkel.png',
    
                text: '...',
            },
            {
                text: '... He says that, but... A- anyway,',
                portrait: 'graphics/credits/portraits/plinkelSadder.png'
            },
            {
                text: '<strong style="color: #fa6a0a;">Luke</strong> & <strong style="color: #582A7A;">Mary</strong> were an idea I had for a long time,',
                portrait: 'graphics/credits/portraits/plinkel.png'
            },
            {
                text: 'but I was too shy to suggest it to him, since it seemed like a really daunting task.',
                portrait: 'graphics/credits/portraits/plinkelSad.png'
            },
            {
                text: 'Speaking of, I plan on helping with more than just art one day, but that\'s another conversation...',
                portrait: 'graphics/credits/portraits/plinkel.png'
            },
            {
                name: 'FELLA',
                nameCol: [175,122,255],
                portrait: 'graphics/credits/portraits/fellaEyes.png',

                text: '👀'
            },
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkelPumped.png',
    
                text: 'He seems to like all of them!',
            },
            {
                text: 'At least, I hope he does.',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'It would be really embarrassing if I\'ve been an ass to him about it this whole time.',
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
            },
            {
                text: 'OH! RIGHT!',
            },
            {
                text: 'THE SONAS!',
                portrait: 'graphics/credits/portraits/plinkelPumped.png'
            },
            {
                text: 'Uh- uh-',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: '<strong style="color: #5996a8;">Ashton</strong> and <strong style="color: #9397b6;">Tammy</strong> aren\'t characters!',
                portrait: 'graphics/credits/portraits/plinkel.png'
            },
            {
                text: 'Those are sonas!',
                portrait: 'graphics/credits/portraits/plinkelIdk.png'
            },
            {
                text: 'Like,',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'you know,',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'ME, but different looking!',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: '<strong style="color: #484848;">Plonk</strong> is also techincally a sona, but he\'s mostly here for legacy reasons.'
            },
            {
                text: 'He\'s kind of where all my shitpost-y gameplay ideas went once I started suggesting ACTUAL characters to the game.'
            },
            {
                text: 'There\'s also a LOT not in here that I\'d consider relevant.'
            },
            {
                text: 'My other two sonas, Grace, Lucas, Cheyenne...',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'B- but, uh,',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png'
            },
            {
                text: 'I\'m not gonna ask much more from <strong style="color: rgb(175,122,255)">Fella</strong>!',
                portrait: 'graphics/credits/portraits/plinkel.png'
            },
            {
                text: 'That\'d be ridiculous,',
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
            },
            {
                text: 'I think I make up like a 10th of the roster at this point!',
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
            },
            {
                noName: true,
                options: [
                    {
                        text: 'Sonas?',
                        onclick: () => {
                            progressFunction()
                            startDialogueSequence(dialogues.plinkel.sonas)
                        }
                    },
                    {
                        text: 'More characters?',
                        onclick: () => {
                            progressFunction()
                            startDialogueSequence(defaultSaveData.stats.unlocked.characters.includes('lorna') ? dialogues.plinkel.moreCharacters : {text:'Oh, you haven\'t even seen them yet, It doesn\'t matter...'})
                        }
                    },
                ]
            }
        ],
        sonas: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkelPumped.png',
    
                text: 'Yeah!',
            },
            {
                text: 'So,',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'uh,',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'I half-lied about <strong style="color: #592c23;">Lorna</strong> being the first.',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'I think it was <strong style="color: #9397b6;">Tammy</strong>, actually,',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'but that was back when I actively drew myself as that guy, so I was going into it thinking it\'d be a replacement for Plonk.',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'But, <strong style="color: rgb(175,122,255)">Fella</strong> wanted EVERYONE, so Plonk stayed,'
            },
            {
                text: 'and eventually I developed <strong style="color: #5996a8;">Ashton</strong> after a while,',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'and I think I asked about replacing <strong style="color: #9397b6;">Tammy</strong> with <strong style="color: #5996a8;">Ashton</strong>, but,'
            },
            {
                text: 'well, I got too many ideas and now they\'re entirely different player characters.',
            },
            {
                text: '...',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'Sorry, <strong style="color: rgb(175,122,255)">Fella</strong>.',
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
            },
            {
                text: 'Those other two I mentioned are Milly and Eli.',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'They probably won\'t be added since they\'d probably be clones of other characters.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'Maybe Eli as a skin for <strong style="color: #5996a8;">Ashton</strong>?',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'I wouldn\'t hold my breath, though.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                noName: true,
                options: [
                    {
                        text: 'Your sonas have lore?',
                        onclick: () => {
                            progressFunction()
                            startDialogueSequence(saveData.stats.unlocked.characters.includes('tammy') ? dialogues.plinkel.sonaLore : [{text:'Yeah, but, you wouldn\'t get it. Maybe later.'}])
                        }
                    }
                ]
            }
        ],
        sonaLore: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
    
                text: 'Uh- duh- whuh? You wanna know about that??',
            },
            {
                portrait: 'graphics/credits/portraits/plinkelPumped.png',
                text: 'I mean- yeah! Yeah, I\'d love to tell you about it!'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
                text: 'I\'ve already embarrassed myself enough in this one dialogue tree...'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
                text: 'Just a heads up, I do NOT blame you for skipping through this.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'But, Uhhhh...'
            },
            {
                text: 'I guess I\'ll start with Ashton? Since he\'s like, the de-facto guy as of now.'
            },
            {
                text: 'So, like, four sonas, four parts of an overall personality. That\'s how I see it.'
            },
            {
                text: 'Some parts are more exaggerated in one sona than the other. Kind of like a character, well, EXACTLY like a character, depending on who you ask, but a little more personal.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
                text: 'Ashton is my self-actualization.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'Unlike Eli, who\'s fully a mess in terms of self-esteem... Ashton\'s got some resolve to him. He hates himself as much as he hates the rest of the world, but still wants to make something of it.'
            },
            {
                text: 'He struggles really hard to get out of bed a lot of the time, and every day is wading through a pile of demons, but he doesn\'t let it get him down. There\'s something to fight for here, and he\'s just slow on the draw in finding it.'
            },
            {
                text: 'So... He\'s the one I choose to represent myself with, most of the time. I try to be honest with myself, and so does Ashton. He just happens to act on his choices a lot more often...'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
                text: 'For better or worse...'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'Tammy is probably the least interesting. She just hangs out. Has a good head on her shoulders, work at a construction site, what-have-you.'
            },
            {
                text: 'I imagine Tammy and Ashton as horribly dysfunctional roommates. Tammy has to take charge of basically maintaining Ashton all the time, since he\'s so self-destructive, but she can\'t deny that he has his moments.'
            },
            {
                text: 'Milly and Eli are kind of the outliers. They were both originally pure OCs until they got \"promoted\", kind of.'
            },
            {
                text: 'The former is a canonical schizoid. Doesn\'t like other people, not one bit. Stays on a boat all day catching fish and reading books.'
            },
            {
                text: 'Despite that, she\'s actually fairly introspective, usually trying to get into the headspace of the author of whatever she\'s reading that day.'
            },
            {
                text: 'Even if she can\'t stand talking to other people, she finds the way we communicate important and worth participating in.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelSad.png',
                text: 'Eli\'s...'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
                text: 'Eli\'s a fucking loser, man. He\'s stuck at 18, just graduated highschool with no idea what to do next. He\'s passionate, but with nobody to share that passion with, and it eats him alive as he struggles to find a reason to get up in the morning.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'Unlike Ashton, Eli has nobody to give him that drive. He wants nothing to do with a world that\'s rejected him at every point in his life, and yet, there\'s still a pile of naive passion hidden in there, wanting to be shared.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelAway.png',
                text: 'In the story he was originally part of, the only thing that broke his depressive spell was getting swept up by a spirit and taught the ways of the underworld.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
                text: 'With hindsight being 20/20, I think what I was really trying to say in his story is that an accepting figure who\'d listen and share their own eclectic interests is what every self-isolating weirdo needs. Or something.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'Yeah, I was originally a contemporary fantasy writer. Big whoop.'
            },
            {
                text: 'Either way, those are all gross oversimplifications. Just know they all represent me to some capacity, though some more than others.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelPumped.png',
                text: 'If you\'re wondering, Eli is my favorite.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: '...'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
                text: 'If you ever meet me in person or online, DO NOT bring this shit up. I will think you\'re weird. and creepy.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
                text: 'Creepyweird.'
            },
        ],
        moreCharacters: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkel.png',
    
                text: '...',
            },
            {
                text: 'When I was around 13 years old, long before I met Fella,'
            },
            {
                text: 'I was drawing a webccomic on ComicFury.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'It had a LARGE cast of characters,',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'and a lot of them I still draw nowadays, albeit in different forms.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'Tana is almost unrecognizable to her original appearance, for example.',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'Though, this game still uses her old design.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'Hah.',
            },
            {
                text: 'Trust me,',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'that\'s for good reason.'
            },
            {
                text: 'The new one\'s...',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'Christ,',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'I had to get a friend to draw it for how complicated it is.',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'Anyway,',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'that original webcomic is long-gone at this point.',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'I got too embarassed to continue it.',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: '...'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'So, like... It took place after a zombie apocalypse happened. Luke & Mary were the protagonists. Lorna was a supporting character, kind of a deuteragonist, if you know what that means.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
                text: 'Tana was the first real VILLAIN. Well, more of a rival, but like, adversarial prescence. Before that, it was just the zombies.'
            },
            {
                portrait: 'graphics/credits/portraits/plinkel.png',
                text: 'But that\'s ALL you\'re getting out of me in a public setting.'
            },
            {
                text: 'You can reach out for information if you\'re REALLY that curious.',
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
            }
        ],
        goober: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkel.png',
    
                text: 'Right.',
            },
            {
                text: 'Goobers was originally a mutual friend\'s idea.'
            },
            {
                text: 'He\'s not online anymore, but we\'d share drawings of us getting into situations.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'It was usually some goofy bullshit,',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'like, literally one drawing was EDP445 as a grey alien, or Flowey saying the F slur. Just nonsense.',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'From what I recall, Goober Shooter started as a game because <strong style="color: rgb(175,122,255)">Fella</strong> needed characters to fill out for his shooter game,',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'and us, the Goobers, were just right there.',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'We retired the name a long time ago,',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'only really referring to our stupid doodles as "little guys" when pressed.'
            },
            {
                text: 'The mutual is doing alright.',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'He has his moments, but he\'s not a bad dude.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                noName: true,
                options: [
                    {
                        text: 'Goober Shooter 2?',
                        onclick: () => {
                            progressFunction()
                            startDialogueSequence(dialogues.plinkel.gs2)
                        }
                    },
                ]
            }
        ],
        gs2: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkel.png',
    
                text: 'That\'s right!',
                portrait: 'graphics/credits/portraits/plinkelPumped.png',
            },
            {
                text: 'It\'d be a question for <strong style="color: rgb(175,122,255)">Fella</strong>,',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'but there was a verison of Goober Shooter before this one.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'It was...',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'An ACTUAL dumpster fire.',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'Not the "dumpster fire" this game is, like, ACTUALLY held together with glitter glue.',
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
            },
            {
                text: 'It was actually where I got started programming JS,',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: '<strong style="color: rgb(175,122,255)">Fella</strong> taught me a few things while working on it and I tried to mod it a few times.'
            },
            {
                text: 'Turns out, the codebase was so bad, someone with only beginner experience with JavaScript can\'t fix it over a summer break...',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'So, I\'m trying to push Fella to make documentation for GS2.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'That way, I should be able to eventually help out with programming and other stuff.',
                portrait: 'graphics/credits/portraits/plinkelPumped.png',
            },
            {
                text: 'Then I can stop being such a pestering loser to him and contribute to the project for REAL!'
            },
            {
                text: '...',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'Sorry, tangent.',
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
            }
        ],
        socials: [
            {
                name: 'PLINKEL',
                nameCol: [76, 119, 128],
                portrait: 'graphics/credits/portraits/plinkel.png',
    
                text: 'Yeah, uh,',
            },
            {
                text: 'I get yelled at a lot.',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            },
            {
                text: 'A LOT.',
                portrait: 'graphics/credits/portraits/plinkelSadder.png',
            },
            {
                text: 'I also tend to have crappy opinions and be unbearably annoying,',
                portrait: 'graphics/credits/portraits/plinkelIdk.png',
            },
            {
                text: 'so I try to reserve myself.',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: '<strong style="color: rgb(175,122,255)">Fella</strong> gets the brunt of it, along with all my other friends...',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'But, it\'s okay,',
                portrait: 'graphics/credits/portraits/plinkelAway.png',
            },
            {
                text: 'I\'m trying to get better about it!',
                portrait: 'graphics/credits/portraits/plinkelPumped.png',
            },
            {
                text: 'I just won\'t let myself step into a public spotlight until I\'m MUCH better.',
                portrait: 'graphics/credits/portraits/plinkel.png',
            },
            {
                text: 'If you really want to know me or what I\'ve made, reach out! Seriously, It\'s the best way to learn more about me and my stuff!',
                portrait: 'graphics/credits/portraits/plinkelPumped.png',
            },
            {
                text: 'I\'m sure I won\'t be too grouchy in <strong style="color: rgb(175,122,255)">Fella\'s</strong> Discord server.',
                portrait: 'graphics/credits/portraits/plinkelEmbarrassed.png',
            }
        ]
    },
    egg: [
        {
            noName: true,
            noPortrait: true,
            text: 'Well, there is a man here.'
        },
        {
            noName: true,
            noPortrait: true,
            text: 'You glance up at him. The leaves of the tree are covering his face.'
        },
        {
            noName: true,
            noPortrait: true,
            text: 'The man gently grabs your wrist and places something in your palm.'
        },
        {
            noName: true,
            noPortrait: true,
            text: 'You look down towards your hand.'
        },
        {
            noName: true,
            noPortrait: true,
            text: 'It\'s an egg.'
        },
        {
            noName: true,
            noPortrait: true,
            text: 'You look back up at the man.'
        },
        {
            noName: true,
            noPortrait: true,
            text: 'But there was nobody there.',
            onEnd: () => {
                saveData.stats.list.egg++
                getAchievement('The_Egg')
            }
        },
    ],
}

let progressFunction
function startDialogueSequence(data) {
    if(dialogueActive) return

    doge('dialogueContainer').style.display = 'flex'
    doge('achNotiContainer').style.top = doge('dialogueContainer').getBoundingClientRect().bottom+'px'
    dialogueActive = true

    progressFunction = function progress() {
        const dialogue = data[dialogueProgress]
        if(dialogueProgress > data.length-1) {
            document.removeEventListener('keydown', keydown)
            doge('dialogueContainer').style.display = 'none'
            doge('achNotiContainer').style.top = '10px'
            data[dialogueProgress-1]?.onEnd?.()
            dialogueProgress = 0
            dialogueActive = false
            
            return
        }

        if(dialogue.options) {
            doge('dialogueBody').innerHTML = ''

            const buttonContainer = document.createElement('div')
            addStyles(buttonContainer, {
                display: 'flex',
                justifyContent: 'center',
                gap: '5px',
                flexWrap: 'wrap'
            }) 
            doge('dialogueBody').append(buttonContainer)

            for(const option of dialogue.options) {
                const button = document.createElement('button')
                button.innerText = option.text
                button.onclick = option.onclick

                addStyles(button, {
                    pointerEvents: 'all',
                    width: '200px',
                })

                buttonContainer.append(button)

            }
            const div = document.createElement('div')
            addStyles(div, {
                textAlign: 'center',
                color: 'grey'
            })
            div.innerText = 'Press [SPACE] to leave.'
            doge('dialogueBody').append(div)
        } else {
            doge('dialogueBody').innerHTML = dialogue.text
        }

        if(dialogue.portrait) doge('dialogueImg').src = dialogue.portrait
        if(dialogue.noPortrait) {
            doge('dialogueImgContainer').style.display = 'none'
        } else {
            doge('dialogueImgContainer').style.display = 'flex'
        }
        
        if(dialogue.name) doge('dialogueName').innerHTML = dialogue.name
        if(dialogue.nameCol) doge('dialogueName').style.color = `rgb(${dialogue.nameCol})`
        if(dialogue.noName) {
            doge('dialogueName').style.display = 'none'
        } else {
            doge('dialogueName').style.display = 'flex'
        }

        if((dialogue.noName && dialogue.noPortrait)) {
            doge('dialogue').style.height = 'fit-content'
        } else {
            doge('dialogue').style.height = '129px'
        }

        doge('achNotiContainer').style.top = doge('dialogueContainer').getBoundingClientRect().bottom+'px'

        dialogue.run?.()
        
        dialogueProgress++
    } 
    progressFunction()

    function keydown(ev) {
        if(ev.key === ' ') progressFunction()
    } document.addEventListener('keydown', keydown)
}

//AREAS

const creditAreas = {
    main: {
        objects: [
            { //Door top
                texture: 'graphics/credits/artDoor.png',
                pos: [256,0],

                styles: {
                    width: '192px',
                    height: '64px',
                },
            },
            { //Door top collider
                pos: [256,0],

                styles: {
                    width: '32px',
                    height: '2px',
                },

                onCollide: () => {
                    if(DeBread.randomNum(1,5) === 1 && saveData.stats.list.egg === 0) {
                        player.pos = [256 - player.elem.offsetWidth / 2,512 - player.elem.offsetHeight*2]
                        renderCreditArea(creditAreas.egg)
                        player.inEggRoom = true
                    } else {
                        player.pos = [256 - player.elem.offsetWidth / 2,512 - player.elem.offsetHeight-1]
                        renderCreditArea(creditAreas.artRoom)
                    }
                }
            },
            { //Door bottom
                texture: 'graphics/credits/musickRoomDoor.png',
                pos: [256,512],

                styles: {
                    width: '192px',
                    height: '64px',
                },
            },
            { //Door bottom collider
                pos: [256,512],

                styles: {
                    width: '32px',
                    height: '2px',
                },

                onCollide: () => {
                    renderCreditArea(creditAreas.musickRoom)
                    player.pos = [256 - player.elem.offsetWidth / 2,1]
                    player.inMusicRoom = true
                    player.shitmusic = 0
                }
            },
            { //Plant
                texture: 'graphics/credits/plant0.png',
                pos: [400,400],

                styles: {
                    width: '32px',
                    height: '64px',
                },

                interactRange: 50,
                hideInteraction: true,
                interact: () => {
                    startDialogueSequence([
                        {
                            noName: true,
                            noPortrait: true,
                            fitHeight: true,
                            text: 'It\'s a... plant?.'
                        },
                        {
                            noName: true,
                            noPortrait: true,
                            fitHeight: true,
                            text: 'Idk man.'
                        }
                    ])
                }
            },
            { //Cone
                texture: 'graphics/credits/cone.png',
                pos: [400,256],

                styles: {
                    width: '64px',
                    height: '64px',
                },

                interactRange: 50,
                interact: () => {
                    startDialogueSequence([
                        {
                            noName: true,
                            noPortrait: true,
                            fitHeight: true,
                            text: 'It\'s a wet floor cone.'
                        },
                        {
                            noName: true,
                            noPortrait: true,
                            fitHeight: true,
                            text: 'It has a piece of paper taped to it.'
                        },
                        {
                            noName: true,
                            noPortrait: true,
                            fitHeight: true,
                            text: 'It reads: <cp>THIS AREA IS UNDER CONSTRUCTION- THINGS MAY BE BROKEN</cp>'
                        },
                        {
                            noName: true,
                            noPortrait: true,
                            fitHeight: true,
                            text: 'You look at it ignoringly'
                        },
                    ])
                }
            },
            { //Lectern
                texture: 'graphics/credits/lectern.png',
                pos: [256,200],

                styles: {
                    width: '64px',
                    height: '64px',
                },

                interactRange: 50,
                interact: () => {
                    openPrompt('Credits', creditsHTML, [{text: 'Close', onclick: () => {closePrompt()}}], [500,375])
                }
            },
            { //Buddy
                texture: 'graphics/credits/buddy.gif',
                pos: [100,100],
                styles: {
                    width: '64px',
                    height: '64px',
                },

                interactRange: 50,
                interact: () => {
                    startDialogueSequence([
                        {
                            name: 'Buddy <img src="graphics/placeholder.png" width="25";>',
                            nameCol: [74, 65, 58],
                            text: 'Hi im buddy <img src="graphics/placeholder.png" width="50" style="transform: skewX(-50deg); margin-left: 50px;">',
                            portrait: 'graphics/placeholder.png',
                        },
                        {
                            text: 'i am <br> dog'
                        },
                        {
                            text: '<strong style="color: rgb(175,122,255)">Fella</strong> s <br> dog'
                        },
                        {
                            text: '<br><br>wof'
                        }
                    ])
                }
            }
        ]
    },
    artRoom: {
        objects: [
            { //Door bottom
                texture: 'graphics/credits/doorBottom.png',
                pos: [256,512],

                styles: {
                    width: '128px',
                    height: '64px',
                },
            },
            { //Door bottom collider
                pos: [256,512],

                styles: {
                    width: '32px',
                    height: '2px',
                },

                onCollide: () => {
                    player.pos = [256 - player.elem.offsetWidth / 2,1]
                    renderCreditArea(creditAreas.main)
                }
            },
            { //Fella drawing
                texture: 'graphics/credits/fellaDrawing.gif',
                pos: [100,250],
                styles: {
                    width: '160px',
                    height: '96px',
                },

                interactRange: 100,
                interact: () => {
                    startDialogueSequence(dialogues.fellaDrawing)
                }
            },
            { //Dottr
                texture: 'graphics/credits/dottr.png',
                pos: [512-64,512-64],
                styles: {
                    width: '64px',
                    height: '64px',
                },

                interactRange: 100,
                interact: () => {
                    startDialogueSequence(dialogues.dottr)
                }
            },
            { //Plinkel
                texture: 'graphics/credits/plinkel.png',
                pos: [400,100],
                styles: {
                    width: '160px',
                    height: '96px',
                },

                interactRange: 100,
                interact: () => {
                    getAchievement('Found_Me')
                    startDialogueSequence(dialogues.plinkel.intro)
                }
            }
        ]
    },
    musickRoom: {
        objects: [
            { //Door top
                texture: 'graphics/credits/doorTop.png',
                pos: [256,0],

                styles: {
                    width: '192px',
                    height: '64px',
                },
            },
            { //Door top collider
                pos: [256,0],

                styles: {
                    width: '32px',
                    height: '2px',
                },

                onCollide: () => {
                    player.pos = [256 - player.elem.offsetWidth / 2,512 - player.elem.offsetHeight - 1]
                    renderCreditArea(creditAreas.main)
                    player.inMusicRoom = false
                }
            },
            { //Big ass button
                texture: 'graphics/credits/bigassbutton.png',
                pos: [256,256],

                styles: {
                    width: '160px',
                    height: '128px',
                },

                interactRange: 100,
                interactLabel: '[E] to <div style="scale: 1 2;">TURN THIS SHIT OFF</div>',
                interact: () => {
                    player.musicButtonPressed = (player.musicButtonPressed ?? 1) + 1

                    player.shitmusic++
                    if(player.shitmusic > 2) {
                        player.shitmusic = 0
                    }

                    const character = characters[saveData.selectedCharacter]
                    if(player.musicButtonPressed === 3) {
                        startDialogueSequence([{
                            name: character.name.toUpperCase(),
                            nameCol: character.color,
                            portrait: `graphics/characters/${saveData.selectedCharacter}PortraitLarge.png`,

                            text: 'fuck'
                        }])
                    }
                }
            }
        ]
    },
    egg: {
        noFloorTexture: true,
        objects: [
            { //Door bottom collider
                pos: [256,512],

                styles: {
                    width: '32px',
                    height: '2px',
                },

                onCollide: () => {
                    player.pos = [256 - player.elem.offsetWidth / 2,1]
                    player.inEggRoom = false
                    renderCreditArea(creditAreas.main)
                }
            },
            { //Tree0
                pos: [256, 150],
                texture: 'graphics/credits/treeSheet.png',
                styles: {
                    width: '256px',
                    height: '256px',
                },

                tick: (obj) => {
                    if(player.pos[1] < 228) {
                        obj.style.zIndex = '4'
                    } else {
                        obj.style.zIndex = '1'
                    }
                },
            },
            { //Tree1
                pos: [256, 150],
                texture: 'graphics/credits/treeSheet.png',
                styles: {
                    width: '256px',
                    height: '256px',
                    zIndex: '5',
                    animation: 'tree 8s ease-in-out -8s infinite forwards',
                    backgroundPosition: '-256px 0px'
                },
            },
            { //Tree2
                pos: [256, 150],
                texture: 'graphics/credits/treeSheet.png',
                styles: {
                    width: '256px',
                    height: '256px',
                    zIndex: '5',
                    animation: 'tree 5s ease-in-out -2s infinite forwards',
                    backgroundPosition: '-512px 0px'
                },
            },
            { //Tree3
                pos: [256, 150],
                texture: 'graphics/credits/treeSheet.png',
                styles: {
                    width: '256px',
                    height: '256px',
                    zIndex: '5',
                    animation: 'tree 7s ease-in-out -6s infinite forwards',
                    backgroundPosition: '-768px 0px'
                },
            },
            { //Tree4
                pos: [256, 150],
                texture: 'graphics/credits/treeSheet.png',
                styles: {
                    width: '256px',
                    height: '256px',
                    zIndex: '5',
                    animation: 'tree 9s ease-in-out -4s infinite forwards',
                    backgroundPosition: '-1024px 0px'
                },
            },
            { //Dialogue Collider
                pos: [256, 225],

                interactRange: 25,

                interact: () => {
                    if(saveData.stats.list.egg === 0) {
                        startDialogueSequence(dialogues.egg)
                    } else {
                        startDialogueSequence([
                            {
                                noName: true,
                                noPortrait: true,
                                text: 'It\'s a tree.'
                            },
                        ])
                    }
                }
            },
            { //Egg door
                texture: 'graphics/credits/doorEgg.png',
                pos: [256,512],

                styles: {
                    width: '128px',
                    height: '64px',
                },
            },
        ]
    }
}

let currentInteractable
let interactFunction
function renderCreditArea(data) {
    cleanArea()

    let floorTexture = 'graphics/credits/floorTile.png'
    if(data.floorTexture) floorTexture = data.floorTexture
    if(data.noFloorTexture) floorTexture = ""
    doge('area').style.backgroundImage = `url(${floorTexture})`

    for(const key in data.objects) {
        const obj = data.objects[key]
        
        const div = document.createElement('div')
        div.classList.add('entity')
        div.pos = [...obj.pos]
        addStyles(div, {
            position: 'absolute',
            left: div.pos[0]+'px',
            top: div.pos[1]+'px',
            translate: '-50% -50%',
        })

        if(obj.texture) {
            addStyles(div, {
                backgroundImage: `url(${obj.texture})`,
                backgroundSize: 'cover'
            })
        }

        addStyles(div, obj.styles)

        doge('area').append(div)

        if(obj.interact && !obj.hasInteracted) {
            div.tooltip = document.createElement('div')
            div.tooltip.innerHTML = obj.interactLabel ?? '[E] to interact'
            div.tooltip.classList.add('entity')

            addStyles(div.tooltip, {
                translate: '-50% -50%',
                fontWeight: '700',
                position: 'absolute',
                left: div.pos[0]+'px',
                top: div.pos[1] - 50+'px',
                display: 'none',
                whiteSpace: 'nowrap',
                zIndex: '10',
                animation: 'dialogueIn 250ms var(--bouncy) 1 forwards'
            })

            if(obj.hideInteraction) {
                div.tooltip.style.opacity = '0'
            }

            doge('area').append(div.tooltip)
        }

        function keyDown(ev) {
            if(ev.key.toLowerCase() === 'e') {
                if(obj.singleInteract) {
                    obj.hasInteracted = true
                }
                obj.interact()
            }

        }

        div.tick = () => {
            if(obj.interact) {
                const dis = Math.sqrt(
                    Math.pow(div.pos[0] - player.centerPos[0], 2) +
                    Math.pow(div.pos[1] - player.centerPos[1], 2)
                )
    
                if(dis <= obj.interactRange && !dialogueActive && !obj.hasInteracted) {
                    if(div.tooltip.style.display === 'none') {
                        interactFunction = keyDown
                        document.addEventListener('keydown', interactFunction)
                    }
    
                    div.tooltip.style.display = 'unset'
                } else {
                    if(div.tooltip.style.display === 'unset') {
                        document.removeEventListener('keydown', interactFunction)
                    }
    
                    div.tooltip.style.display = 'none'
                }
            }

            if(obj.tick) {
                obj.tick(div)
            }

            if(obj.onCollide && isColliding(div, player.elem)) {
                obj.onCollide()
            }
        }
    }
}