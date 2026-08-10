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
            text: 'Yo whats up'
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
                    }
                },
                {
                    text: 'Goober Shooter 2',
                    onclick: () => {
                        progressFunction()
                        progressFunction()
                        startDialogueSequence(dialogues.fellaGooberShooter)
                    }
                },
                {
                    text: 'SkillsUSA',
                    onclick: () => {
                        progressFunction()
                        progressFunction()
                        startDialogueSequence(dialogues.fellaSkills)
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

                                onEnd: () => {
                                    getAchievement('Useless_Knowledge_IV')
                                }
                            }
                        ])
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
            onEnd: () => {
                getAchievement('Useless_Knowledge_I')
            }
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
            onEnd: () => {
                getAchievement('Useless_Knowledge_II')
            }
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
            onEnd: () => {
                getAchievement('Useless_Knowledge_III')
            }
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
        }
    ],
    plinkel: [
        {
            name: 'PLINKEL',
            nameCol: [76, 119, 128],
            portrait: 'graphics/credits/portraits/plinkel.png',

            text: 'augh',
        }
    ],
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
    dialogueActive = true

    progressFunction = function progress() {
        const dialogue = data[dialogueProgress]
        if(dialogueProgress > data.length-1) {
            document.removeEventListener('keydown', keydown)
            doge('dialogueContainer').style.display = 'none'
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
                    height: '25px'
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
                        player.pos = [256 - player.elem.offsetWidth / 2,512 - player.elem.offsetHeight]
                        renderCreditArea(creditAreas.artRoom)
                    }
                }
            },
            { //Door bottom
                texture: 'graphics/credits/musickDoor.png',
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
                    player.pos = [256 - player.elem.offsetWidth / 2,0]
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
                    player.pos = [256 - player.elem.offsetWidth / 2,512 - player.elem.offsetHeight]
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