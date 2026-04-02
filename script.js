const e = {
    keysDown: [],
    cursorPos: [0,0],
    relCursorPos: [0,0],
    gameActive: false,
    gameUpdates: 0,
    gameUpdateInterval: 20,
    gamePaused: false,

    mouseDown: [false,false]
}

const saveData = {
    selectedCharacter: 'debread',
    selectedSkin: -1,
    firstLogin: false,

    selectedChallenge: 'none',

    settings: {
        weaponEasing: true,
        enemyEasing: true,
        particles: true,
        presentationMode: false,
        showGameQuitWarning: true,
        showPowerItemWarning: true,
        debug: false,
    },

    gameSettings: {
        gamemode: 0,
    },

    bankMoney: 0,

    cosmetics: [
        {
            id: 'none',
            xOffset: 0,
            yOffset: 0,
            rot: 0,
        },
        {
            id: 'none',
            xOffset: 0,
            yOffset: 0,
            rot: 0,
        },
        {
            id: 'none',
            xOffset: 0,
            yOffset: 0,
            rot: 0,
        },
        {
            id: 'none',
            xOffset: 0,
            yOffset: 0,
            rot: 0,
        },
        {
            id: 'none',
            xOffset: 0,
            yOffset: 0,
            rot: 0,
        },
    ]
}

document.addEventListener('keydown', ev => {
    const key = ev.key.toLowerCase()
    if(!e.keysDown.includes(key)) {
        e.keysDown.push(key)
    }

    if(key === 'escape') {
        if(doge('promptContainer').style.display === 'flex') {
            closePrompt()
        } else {
            pauseGame()
        }
    }

    if(key === 'tab') {
        ev.preventDefault()
    }
})

document.addEventListener('keyup', ev => {
    const key = ev.key.toLowerCase()
    if(e.keysDown.includes(key)) {
        e.keysDown.splice(e.keysDown.indexOf(key),1)
    }
})

document.addEventListener('mousemove', ev => {
    e.cursorPos[0] = ev.x
    e.cursorPos[1] = ev.y

    e.relCursorPos[0] = ev.x - doge('area').getBoundingClientRect().left
    e.relCursorPos[1] = ev.y - doge('area').getBoundingClientRect().top
})

//Disable context menu
document.addEventListener('contextmenu', ev => {ev.preventDefault()})

const popupTextBase = document.createElement('span')
addStyles(popupTextBase, {
    position: 'absolute',
    fontWeight: '700',
    filter: 'drop-shadow(0px 0px 5px black)',
    animation: 'popupMove 2s ease-out 1 forwards',
    color: 'transparent',
    zIndex: 10,
})
function createPopupText(text, pos) {
    const popup = popupTextBase.cloneNode()
    popup.classList.add('popup')
    
    popup.style.setProperty('--popupX', `${DeBread.randomNum(-10,10)}px`)
    popup.style.setProperty('--popupY', `${DeBread.randomNum(-10,10)}px`)
    
    popup.innerText = text

    addStyles(popup, {
        left: pos[0] - popup.offsetWidth / 2+'px',
        top: pos[1] - popup.offsetHeight / 2+'px',
    })

    setTimeout(() => {
        popup.remove()
    },  2000);

    if(doge('area').querySelectorAll('.popup').length > 50) {
        doge('area').querySelectorAll('.popup')[0].remove()
    }

    return popup
}

const particleBase = document.createElement('div')
particleBase.classList.add('particle')
let particleCount = 0

function createParticles(pos, count, size, dis, duration, timingFunction, styles) {
    if(particleCount <= 50 && saveData.settings.particles) {
        for(let i = 0; i < count; i++) {
            const particle = particleBase.cloneNode()
            particle.style.setProperty('--particleDuration',duration + 'ms')
            const randomAngle = DeBread.randomNum(0,2*Math.PI,3)
            particle.style.setProperty('--particleX', Math.cos(randomAngle)*DeBread.randomNum(dis[0],dis[1])+'px')
            particle.style.setProperty('--particleY', Math.sin(randomAngle)*DeBread.randomNum(dis[0],dis[1])+'px')
            particle.style.setProperty('--particleTimingFunction', timingFunction)
            
            addStyles(particle, {
                left: pos[0] + 'px',
                top: pos[1] + 'px',
                width: size+'px',
                height: size+'px'
            })
            addStyles(particle, styles)
    
            doge('area').append(particle)
            particleCount++
    
            setTimeout(() => {
                particle.remove()
                particleCount--
            }, duration);
        }
    }
}

let hitstopActive = false
function hitstop(length) { //Completely broken for some reason
    if(!hitstopActive) {
        console.log('stop!')
        DeBread.easeShake(doge('area'), e.gameUpdateInterval, 5, 1)
        DeBread.pauseInterval(1)
        hitstopActive = true

        setTimeout(() => {
            hitstopActive = false  
            DeBread.pauseInterval(1)
        }, length);
    }
}

function tooltip(pos, title, tags, desc, price) {
    doge('tooltip').style.opacity = '1'

    doge('tooltipTitle').innerText = title
    doge('tooltipBody').innerHTML = desc
    doge('tooltipBody').style.maxWidth = '300px'

    doge('tooltipTags').innerHTML = ''
    for(const tag of tags) {
        const div = document.createElement('div')
        div.classList.add('tooltipTag')
        div.innerHTML = tag.text
        div.style.background = tag.col

        doge('tooltipTags').append(div)
    }

    if(price) {
        doge('tooltipPrice').innerText = '$' + price
    } else {
        doge('tooltipPrice').innerText = ''
    }

    addStyles(doge('tooltip'), {
        left: pos[0] - doge('tooltip').offsetWidth / 2 +'px',
        top: pos[1]+'px'
    })

    function fixPos() {
        if(doge('tooltip').getBoundingClientRect().right > window.innerWidth) {
            doge('tooltip').style.left = window.innerWidth - doge('tooltip').offsetWidth + 'px'
        }

        if(doge('tooltip').getBoundingClientRect().left < 0) {
            doge('tooltip').style.left = '0px'
        }
    
        if(doge('tooltip').getBoundingClientRect().bottom > window.innerHeight) {
            doge('tooltip').style.top = window.innerHeight - doge('tooltip').offsetHeight + 'px'
        }
    } fixPos()
    requestAnimationFrame(fixPos)
}

function openPrompt(title, body, buttons, size) {
    doge('promptContainer').style.display = 'flex'
    doge('promptTitle').innerText = title
    doge('promptBody').innerHTML = body
    doge('promptButtons').innerHTML = ''

    if(size) {
        doge('prompt').style.width = size[0] + 'px'
        doge('prompt').style.height = size[1] + 'px'
    } else {
        doge('prompt').style.width = '300px'
        doge('prompt').style.height = '200px'
    }

    for(const key in buttons) {
        const button = document.createElement('button')
        button.innerText = buttons[key].text
        button.onclick = () => {buttons[key].onclick()}

        doge('promptButtons').append(button)
    }
}

function closePrompt() {
    doge('promptContainer').style.display = 'none'
}

document.querySelectorAll('help').forEach(elem => {
    elem.onmouseenter = () => {
        const rect = elem.getBoundingClientRect()
        tooltip([rect.left,rect.bottom],elem.getAttribute('header'),[],elem.getAttribute('content'))
    }

    elem.onmouseleave = () => {
        doge('tooltip').style.opacity = '0'
    }
})

const weaponPresets = {
    gun: {
        name: 'Gun',
        desc: 'Standard gun',
        ammoChar: '|',
        textureSize: [11,7],
        pros: [],
        cons: [],

        apply: () => {}
    },
    shotgun: {
        name: 'Shotgun',
        desc: 'Shoots multiple short range bullets.',
        ammoChar: '|',
        textureSize: [18,9],

        pros: [
            'Multi-shot',
            'Bullet speed',
            'Damage',
        ],
        cons: [
            'Range',
            'Reload speed',
            'Shot cooldown',
            'Shrinking bullets',
            'Recoil'
        ],

        apply: () => {
            modifyStat(['bullet','damage'],'=10')
            modifyStat(['bullet','speed'], '=20')
            modifyStat(['bullet','multishot'], '=5')
            modifyStat(['bullet','grow'], '=-10')

            modifyStat(['ammo','reloadSpeed'], '=1000')
            modifyStat(['bullet','range'], '=7')
            modifyStat(['bullet','shotCooldown'], '=500')
            modifyStat(['bullet','recoil'], '=3')
        }
    },
    riot_shotgun: {
        name: 'Riot Shotgun',
        desc: 'Loaded with rock salt. Less than lethal, but painful.',
        ammoChar: '|',
        textureSize: [26,10],

        pros: [
            'Multi-shot',
            'Bullet speed',
            'Slowing ammo',
            'Damage',
        ],
        cons: [
            'Range',
            'Reload speed',
            'Shot cooldown',
            'Shrinking bullets',
            'Recoil'
        ],

        apply: () => {
            modifyStat(['bullet','damage'],'=5')
            modifyStat(['bullet','speed'], '=20')
            modifyStat(['bullet','multishot'], '=10')
            modifyStat(['bullet','grow'], '=-7')
            modifyStat(['ammo','max'], '=20')
            modifyStat(['bullet','slow'], '=0.25')

            modifyStat(['ammo','reloadSpeed'], '=1250')
            modifyStat(['bullet','range'], '=7')
            modifyStat(['bullet','shotCooldown'], '=600')
            modifyStat(['bullet','recoil'], '=2')
        }
    },
    garand: {
        name: 'Garand',
        desc: 'Shoots high speed and damage bullets, but can only be reload when ammo is at 0.',
        ammoChar: '|',
        textureSize: [41,9],

        pros: [
            'Damage',
            'Bullet speed',
            'Shot cooldown'
        ],
        cons: [
            'Reload speed',
            'Max ammo'
        ],

        apply: () => {
            modifyStat(['bullet','damage'], '=5')
            modifyStat(['bullet','speed'], '=20')
            modifyStat(['bullet','shotCooldown'], '=0')

            modifyStat(['ammo','reloadSpeed'], '=1000')
            modifyStat(['ammo','max'], '=8')

            modifyStat(['ammo','garandReload'], '=true')
        }
    },
    sniper: {
        name: 'Sniper',
        desc: 'Long range weapon with increased damage.',
        ammoChar: '|',
        textureSize: [20,9],
        pros: [
            'Damage',
            'Penetrating rounds',
            'Bullet speed',
        ],
        cons: [
            'Reload Speed',
            'Shot cooldown',
            'Max ammo'
        ],

        apply: () => {
            modifyStat(['bullet','damage'], '=25')
            modifyStat(['bullet','speed'], '=15')

            modifyStat(['ammo','max'], '=5')
            modifyStat(['ammo','reloadSpeed'], '=1500')
            modifyStat(['ammo','penetratingRounds'], '=true')
            modifyStat(['bullet','shotCooldown'], '=500')

            updateUI()
        }
    },
    piss: {
        name: 'Piss',
        desc: 'PISSES EVERYWHERE.',
        ammoChar: '|',
        textureSize: [16,12],
        bulletTexture: true,

        pros: [
            'Max Ammo',
            'Shot cooldown',
            'Poisonous Bullets'
        ],
        cons: [
            'Bullet size',
            'Knockback'
        ],

        apply: () => {
            modifyStat(['bullet','shotCooldown'], '=0')
            modifyStat(['ammo','max'], '=50')
            modifyStat(['ammo','current'], '=50')
            modifyStat(['bullet','poisonFieldChance'], '=100')
            modifyStat(['bullet','poisonFieldSize'], '=25')
            modifyStat(['bullet','poisonFieldTicks'], '=3')
            modifyStat(['bullet','poisonFieldDmgPercent'], '=25')
            modifyStat(['bullet','poisonFieldColor'], '=[186, 161, 39]')
            modifyStat(['bullet','knockback'], '=0.1')
            
            modifyStat(['ammo','reloadSpeed'], '=2500')
            modifyStat(['bullet','damage'], '=2.5')
            modifyStat(['ammo','autoFire'], '=true')
        }
    },
    bite: {
        name: 'Bite',
        desc: 'Releases a short-range wave of energy, passing through multiple enemies.',
        ammoChar: '|',
        textureSize: [0,0],

        pros: [
            'Damage',
            'Drill ticks',
            'Bullet size',
            'Reload speed',
        ],
        cons: [
            'Range',
            'Shot cooldown',
            'Bullet speed',
            'Max ammo'
        ],

        apply: () => {
            modifyStat(['bullet','drillTicks'], '=8')
            modifyStat(['bullet', 'damage'], '=15')
            modifyStat(['ammo','reloadSpeed'], '=100')
            modifyStat(['bullet','size'], '=50')
            
            modifyStat(['bullet','range'], '=8')
            modifyStat(['bullet','shotCooldown'], '=100')
            modifyStat(['bullet','speed'], '=1')
            modifyStat(['ammo','max'], '=1')
        }
    },
    cannon: {
        name: 'Cannon',
        desc: 'Creates a very large and slow explosive.',
        ammoChar: '⏺',
        textureSize: [21,9],

        pros: [
            'Damage',
            'Explosive',
            'Bullet size',
        ],

        cons: [
            'Shot cooldown',
            'Reload Speed',
            'Recoil'
        ],
        
        apply: () => {
            modifyStat(['bullet','damage'], '=50')
            modifyStat(['bullet','explosionSize'], '=100')
            modifyStat(['bullet','size'], '=25')

            modifyStat(['bullet','speed'], '=5')
            modifyStat(['ammo','reloadSpeed'], '=2000')
            modifyStat(['bullet','shotCooldown'], '=500')

            modifyStat(['bullet','recoil'], '=15')
        }
    },
    mounted_machine_gun: {
        name: 'Mounted Machine Gun',
        desc: 'A high fire-rate machine gun that can only be shot when standing still.',
        textureSize: [40,14],
        ammoChar: '|',

        pros: [
            'Shot cooldown',
            'Max ammo'
        ],

        cons: [
            'Reload speed',
            'Damage',
            'Stationary fire'
        ],
        
        apply: () => {
            modifyStat(['bullet','shotCooldown'], '=0')
            modifyStat(['ammo','max'], '=50')
            modifyStat(['ammo','current'], '=50')
            
            modifyStat(['ammo','reloadSpeed'], '=3000')
            modifyStat(['bullet','damage'], '=2.5')
            modifyStat(['ammo','autoFire'], '=true')
            modifyStat(['ammo','stationaryFire'], '=true')
        }
    },
    spicy_gun: {
        name: 'Spicy Gun',
        desc: 'A low firerate pepper that fires other peppers, spawning poison fields.',
        textureSize: [12,8],
        bulletTexture: true,
        ammoChar: '🌶️',

        pros: [
            'Poison field chance',
            'Poisonous parries',
            'Damage Multiplier'
        ],

        cons: [
            'Accuracy',
            'Shot cooldown'
        ],
        
        apply: () => {
            modifyStat(['bullet','poisonFieldChance'], '=100')
            modifyStat(['bullet','poisonFieldSize'], '=100')
            modifyStat(['bullet','poisonFieldTicks'], '=2')
            modifyStat(['bullet','poisonFieldDmgPercent'], '=40')
            modifyStat(['bullet','size'], '=40')
            modifyStat(['bullet','accuracy'], '=40')
            modifyStat(['bullet','shotCooldown'], '=200')
            modifyStat(['bullet','damageMult'], '=1.5')
            
            modifyStat(['player','parryPoisonDmg'], '=20')
            modifyStat(['player','parryPoisonSize'], '=50')
        }
    },
    flintlock: {
        name: 'Flintlock',
        desc: 'A single shot pistol that has extreme damage and recoil.',
        textureSize: [16,9],
        ammoChar: '|',

        pros: [
            'Damage',
            'Bullet Speed'
        ],

        cons: [
            'Max Ammo',
            'Recoil'
        ],
        
        apply: () => {
            modifyStat(['bullet','damage'], '=30')
            modifyStat(['bullet','speed'], '=15')
            
            modifyStat(['ammo','max'], '=1')
            modifyStat(['bullet','recoil'], '=10')
        }
    },
    bubble_blower: {
        name: 'Bubble Blower',
        desc: 'A regular weapon which can be charged to fire projectiles for 5x Damage. Hold Left Click to fire stronger projectiles.',
        textureSize: [5,8],
        ammoChar: '🫧',
        bulletTexture: true,

        pros: [
            'Charge projectiles',
            'Damage'
        ],
        cons: ['Bullet speed'],

        apply: () => {
            modifyStat(['bullet','speed'], '=5')
            modifyStat(['bullet','damage'], '=6.1')

            modifyStat(['ammo','chargeShot'], '=true')
            modifyStat(['ammo','chargeTime'], '=100')
            modifyStat(['ammo','chargeMultCap'], '=10')
        }
    },
    staff: {
        name: 'Staff',
        desc: 'Summons an orb of electricity the moves through enemies dealing electric damage.',
        textureSize: [25,5],
        ammoChar: '|',
        animatedBulletTexture: true,

        pros: [
            'Drill ticks',
            'Electric chain length',
            'Electric chain reach',
            'Bullet size'
        ],
        cons: [
            'Damage',
            'Bullet speed'
        ],

        apply: () => {
            modifyStat(['bullet','drillTicks'], '=25')
            modifyStat(['bullet','electricChainLength'], '=3')
            modifyStat(['bullet','electricChainReach'], '=100')
            modifyStat(['bullet','size'], '=20')

            modifyStat(['bullet','damage'], '=2')
            modifyStat(['bullet','speed'], '=2')
        }
    },
    meatCleaver: {
        name: 'Meat Cleaver',
        desc: 'youch.',
        textureSize: [8,16],
        ammoChar: '🔪',
        bulletTexture: true,

        pros: [
            'Drill Ticks',
            'Damage',
            'Bullet size'
        ],
        cons: [
            'Damage multiplier',
            'Shot cooldown',
        ],

        apply: () => {
            modifyStat(['bullet','drillTicks'], '=25')
            modifyStat(['bullet','damageMult'], '=0.2')
            modifyStat(['bullet','shotCooldown'], '=100')
            modifyStat(['bullet','size'], '=32')
            modifyStat(['bullet','spin'], '=20')
        }
    },
    omnirifle: {
        name: 'Omnirifle',
        desc: 'Projectiles shot by this weapon get a weak version of every bullet effect.',
        textureSize: [34,16],
        ammoChar: '|',

        pros: [
            'Splits',
            'Bouncy ammo',
            'Drill ticks',
            'Explosive ammo',
            'Parasite ammo',
            'Electric ammo',
            'Knockback',
            'Multishot',
            'Poison field ammo',
            'Magnetic ammo',
            'Fluctuating damage',
            'Growing ammo',

        ],
        cons: [
            'Prickly ammo',
        ],

        apply: () => {
            modifyStat(['bullet','split'], '=2')
            modifyStat(['bullet','bounces'], '=1')
            modifyStat(['bullet','drillTicks'], '=2')
            modifyStat(['bullet','explosionSize'], '=50')
            modifyStat(['bullet','heal'], '=0.1')
            modifyStat(['bullet','electricChainLength'], '=1')
            modifyStat(['bullet','electricChainReach'], '=10')
            modifyStat(['bullet','knockback'], '=2')
            modifyStat(['bullet','multishot'], '=2')
            modifyStat(['bullet','poisonFieldChance'],'=1')
            modifyStat(['bullet','poisonFieldSize'],'=50')
            modifyStat(['bullet','poisonFieldTicks'], '=1')
            modifyStat(['bullet','poisonFieldDmgPercent'],'=50'),
            modifyStat(['bullet','magnetStrength'], '=0.1')
            modifyStat(['bullet','randDmgMult'],'=1.5')
            modifyStat(['bullet','grow'],'=0.1')

            modifyStat(['bullet','thornDamage'],'=0.25')
        }
    }
}

const characters = {
    debread: {
        name: 'DeBread',
        desc: 'Some guy',
        taunts: 7,
        tag: 'Fox',
        tagCol: '#e0a24a',

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.gun,

        skins: [
            {
                name: 'Arctic DeBread',
                src: 'arctic_debread',

            },
            {
                name: 'DeBread Old',
                src: 'debread_old',
                taunts: 1,
            },
            {
                name: 'Arctic DeBread Old',
                src: 'arctic_debread_old',
                taunts: 4,
            }
        ]
    },
    fella: {
        name: 'Fella',
        desc: 'Some guy but real',
        taunts: 1,
        info: `Starts with the \'Poker Chip\' Power Item.<br>${powerItems[1].poker_chip.desc}`,
        tag: 'Raccoon',
        tagCol: '#775db9',

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.sniper,

        applyStats: () => {
            player.powerItem = powerItems[1].poker_chip
        }
    },
    plonk: {
        name: 'Plonk',
        desc: 'Some other guy',
        taunts: 9,
        tag: 'Cat',
        tagCol: 'rgb(72, 72, 72)',
        // info: `
        //     Starts with the \'Heroin\' consumable.<br>
        //     <em style="color:grey;">For 5 seconds:</em><br>
        //     <cg>x10</cg> Damage<br>
        //     <cg>x2</cg> Speed<br>
        //     After the 5 seconds, take <cb>75</cb> damage.
        //     `,

        tagList: [
            {text: 'GS1',col: '#e0a24a'},
        ],

        weapon: weaponPresets.piss,


        applyStats: () => {
            // player.consumables = ['heroin']
        }
    },
    ashton: {
        name: 'Ashton',
        desc: 'Some other other guy',
        tag: 'Arctic Fox',
        tagCol: 'rgb(89, 150, 168)',
        taunts: 1,

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Drawn by Plinkel', col: 'grey'},
        ],

        weapon: weaponPresets.shotgun
    },
    lorna: {
        name: 'Lorna Walker',
        desc: 'ACAB? Even her?',
        tag: 'Black Wolf',
        tagCol: '#592c23',
        taunts: 1,

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Drawn by Plinkel', col: 'grey'},
        ],

        weapon: weaponPresets.riot_shotgun
    },
    // tammy: {
    //     name: 'Tammy',
    //     desc: 'Some other other guy',

    //     weapon: weaponPresets.garand
    // },
    jaden: {
        name: 'Jaden',
        desc: 'my wife left me',
        taunts: 2,
        tag: 'Vampire',
        tagCol: 'rgb(100,0,10)',

        pros: [
            'Healing melees',
            'Parasite ammo',
        ],

        cons: [
            'Max health'
        ],

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        applyStats: () => {
            modifyStat(['bullet','heal'], '=0.1')
            modifyStat(['melee','heal'], '=10')
            modifyStat(['player','maxHealth'], '=50')
        },

        weapon: weaponPresets.flintlock
    },
    peep: {
        name: 'Peep',
        desc: '',
        taunts: 2,
        tag: 'Fox',
        tagCol: '#6072ad',

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.cannon
    },
    sasha: {
        name: 'Sasha',
        desc: 'the chomnpner',
        taunts: 1,
        tag: 'German, Shepherd',
        tagCol: '#53463a',

        info: `Starts with the 'Tennis Ball' Power Item <br>${powerItems[1].tennis_ball.desc}`,

        pros: ['Speed'],

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.bite,
        
        applyStats: () => {
            player.powerItem = powerItems[1].tennis_ball
        }
    },
    car: {
        name: 'car',
        desc: 'my name is car',
        taunts: 3,
        tag: 'Car',
        tagCol: '#403b39',

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.gun
    },
    // erix: {
    //     name: 'erix',
    //     desc: 'use this one if you wanna be really swag',
    //     tag: 'Cat',
    //     tagCol: 'hotpink',

    //     weapon: weaponPresets.gun
    // },
    walf: {
        name: 'Walf',
        desc: '',
        taunts: 1,
        tag: 'Walf',
        tagCol: 'gray',

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    jake: {
        name: 'Jake',
        desc: 'good morning wag wag',
        taunts: 2,
        info: `Starts with the \'Pepper\' Power Item.<br>${powerItems[1].pepper.desc}`,
        tag: 'Dog',
        tagCol: '#ab886d',

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: '<img src="graphics/homosexual.gif" height=20>', col: 'linear-gradient(to right,rgb(255,100,100) 17%,rgb(255, 200, 100) 34%,rgb(255, 255, 100) 51%,rgb(100, 255, 100) 68%,rgb(100, 100, 255) 84%,rgb(255, 100, 255) 100%)'}
        ],

        applyStats: () => {
            player.powerItem = powerItems[1].pepper
        },

        weapon: weaponPresets.spicy_gun
    },
    // marcy: {
    //     name: 'Marcy',
    //     desc: '',
    //     tag: 'Fox',

    //     weapon: weaponPresets.gun
    // },
    crow: {
        name: 'Crow',
        desc: '',
        tag: 'Crow',
        tagCol: '#0c0026',

        weapon: weaponPresets.meatCleaver
    },
    krazy: {
        name: 'Krazy',
        desc: 'I know how orange cats are crazy',
        taunts: 1,
        tag: 'Cat',
        tagCol: '#a57f4b',

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    dottr: {
        name: 'Dottr',
        desc: 'taco bel 🤤',
        taunts: 1,
        tag: 'Raccoon',
        tagCol: '#a16e97',
        info: `Starts with the \'Blunt\' Power Item.<br>${powerItems[0].blunt.desc}`,

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        skins: [
            {
                name: 'Hair',
                src: 'dottr_hair',

            },
        ],

        applyStats: () => {
            player.powerItem = powerItems[0].blunt
            modifyStat(['ammo','chargeShot'], '=true')
            modifyStat(['ammo','chargeTime'], '=75')
            modifyStat(['ammo','chargeMultCap'], '=10')

            updateUI()
        },

        weapon: weaponPresets.bubble_blower
    },
    // hugo: {
    //     name: 'Hugo',
    //     desc: 'stupid homo froge',
    //     tag: 'Frog',

    //     weapon: weaponPresets.gun
    // },
    skunk: {
        name: 'John',
        desc: 'yucky',
        taunts: 1,
        tag: 'Skunk',
        tagCol: 'rgb(50,50,50)',

        info: `Starts with the \'Beer Bottle\' Power Item.<br>${powerItems[2].beer_bottle.desc}`,
        pros: ['Poisonous parries'],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        applyStats: () => {
            modifyStat(['player','parryPoisonDmg'],'=50')
            modifyStat(['player','parryPoisonTicks'],'=10')
            modifyStat(['player','parryPoisonSize'],'=75')

            player.powerItem = powerItems[2].beer_bottle
        },

        weapon: weaponPresets.gun
    },
    // nova: {
    //     name: 'Nova',
    //     desc: '',

    //     weapon: weaponPresets.gun
    // },
    // zeko: {
    //     name: 'Zeko',
    //     desc: '',
    //     tag: 'Arctic Fox',
    //     tagCol: 'rgb(89, 150, 168)',
    //     weapon: weaponPresets.gun
    // },
    udev: {
        name: 'udev',
        desc: '',
        taunts: 1,
        info: 'All stats are randomly multiplied between 0.1x and 10x at run start.',
        tag: 'Guy',
        tagCol: 'rgb(0,150,0)',

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        applyStats: () => {
            for(const statCat in player.stats) {
                for(const key in player.stats[statCat]) {
                    if(typeof player.stats[statCat][key] === 'number') {
                        player.stats[statCat][key] *= Math.pow(10,DeBread.randomNum(-1,1,5))
                        modifyStat([statCat,key],`=${player.stats[statCat][key]}`)
                    }
                }
            }
            DeBread.round(player.stats.bullet.multishot)
        },

        weapon: weaponPresets.gun
    },
    snorp: {
        name: 'Snorp',
        desc: '',
        taunts: 5,
        tag: 'Cat ?',
        tagCol: '#5268da',

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.gun
    },
    wasp: {
        name: 'Wasp',
        desc: '',
        taunts: 1,
        tag: 'Fox',
        tagCol: '#9c4321',

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.staff
    },
    // tox: {
    //     name: 'Tox',
    //     desc: '',
    //     tag: 'Fox',
    //     tagCol: 'hotpink',

    //     weapon: weaponPresets.gun
    // },
    // henry: {
    //     name: 'Henry',
    //     desc: '',
    //     tag: 'Wolf',

    //     weapon: weaponPresets.gun
    // },
    // bean: {
    //     name: 'Bean',
    //     desc: '',
    //     tag: 'Bean',
    //     tagCol: 'rgb(113, 82, 45)',

    //     weapon: weaponPresets.gun
    // },
    skywalkr: {
        name: 'Skywalkr',
        desc: 'this game is pissing me off',
        tag: 'the&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsporiginal',
        tagCol: 'rgb(107, 106, 52)',

        weapon: weaponPresets.mounted_machine_gun
    },
    meringue: {
        name: 'Meringue',
        desc: '',
        taunts: 1,
        tag: 'Lynx',
        tagCol: '#3f3c4e',

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    // jag: {
    //     name: 'JAG',
    //     desc: '',
    //     tag: 'Bloing',

    //     weapon: weaponPresets.gun
    // },
    // zima: {
    //     name: 'Zima',
    //     desc: '',
    //     tag: 'Yeen',

    //     weapon: weaponPresets.gun
    // },
    // slip: {
    //     name: 'Slip',
    //     desc: '',
    //     tag: 'Raccoon',

    //     weapon: weaponPresets.gun
    // },
    // henry: {
    //     name: 'Henry',
    //     desc: '',
    //     taunts: 1,
    //     tag: 'Wolf',
    //     tagCol: 'rgb(25,25,25)',

    //     tagList: [
    //         {text: 'GS1',col: '#e0a24a'},
    //         {text: 'GS2',col: '#775db9'}
    //     ],

    //     weapon: weaponPresets.gun
    // },
    // cindy: {
    //     name: 'Cindy',
    //     desc: 'Autistic as fuck',
    //     taunts: 1,
    //     tag: 'Cat',
    //     tagCol: '#64afff',

    //     tagList: [
    //         {text: 'GS2',col: '#775db9'}
    //     ],

    //     weapon: weaponPresets.gun
    // },
    tutorialist: {
        name: 'The Tutorialist',
        desc: '',
        taunts: 1,
        tag: '???',
        tagCol: '#050634',

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.omnirifle
    }
}

const cosmetics = {
    tophat: {
        name: 'Top Hat',
        desc: 'Stylish!',
        src: 'tophat'
    },
    sunglasses: {
        name: 'Sunglasses',
        desc: 'Is it too bright?',
        src: 'sunglasses'
    },
    cigarette: {
        name: 'Cigarette',
        desc: 'Take a smoke break.',
        src: 'cigarette'
    }
}

function updateCharacterSelectStats(character, box) {
    const rect = box.getBoundingClientRect()

    let tooltipWidth = '300px'
    if(character.pros || character.cons || character.info) {
        tooltipWidth = '500px'
    }

    tooltip([rect.left + box.offsetWidth / 2,rect.bottom + 25],character.name, [{text: character.tag, col: character.tagCol}], 
        `
        <div style="width: ${tooltipWidth}; margin-top: 5px;">
            ${character.desc}
            <div style="display: flex; gap: 5px; width: 100%;">
                <div id="characterStatsCharacterContainer" style="height: 100%; width: 100%;">
                    <em style="color: grey; font-size: 0.75em;">CHARACTER</em>
                    <div id="characterStatsCharacterStats"></div>
                </div>
                <div id="characterStatsWeaponContainer" style="height: 100%; width: 100%;">
                    <em style="color: grey; font-size: 0.75em;">WEAPON</em>
                    <div id="characterStatsWeaponTitleContainer">
                        <img src="graphics/weapons/sniper.png" id="characterStatsWeaponImg">
                        <span id="characterStatsWeaponName">Sniper</span>
                    </div>
                    <div id="characterStatsWeaponDescContainer">
                        <em id="characterStatsWeaponDesc">Long range doodad bla bla more text</em>
                    </div>
                    <div id="characterStatsWeaponStats"></div>
                </div>
            </div>
        </div>
        `
    , undefined)
    
    doge('tooltipBody').style.maxWidth = tooltipWidth

    doge('characterStatsWeaponName').innerText = character.weapon.name
    doge('characterStatsWeaponDesc').innerText = character.weapon.desc
    doge('characterStatsWeaponImg').src = `graphics/weapons/${character.weapon.name.toLowerCase().replaceAll(' ','_')}.png`

    doge('characterStatsWeaponStats').innerHTML = ''
    doge('characterStatsCharacterStats').innerHTML = ''
    let statAnimDelay = 0

    if(!character.info && !character.pros) {
        doge('characterStatsCharacterContainer').style.display = 'none'
    } else {
        doge('characterStatsCharacterContainer').style.display = ''
        
        if(character.pros) {
            for(let i = 0; i < character.pros.length; i++) {
                const stat = document.createElement('div')
                stat.classList.add('characterStatsStat')
                stat.style.animation = `statIn 500ms ease-out ${statAnimDelay}ms 1 forwards`
                stat.innerHTML = `
                <img src="graphics/arrowup.png">
                <span>${character.pros[i]}</span>
                `
                
                doge('characterStatsCharacterStats').append(stat)
                
                statAnimDelay += 50
            }
        }

        if(character.cons) {
            for(let i = 0; i < character.cons.length; i++) {
                const stat = document.createElement('div')
                stat.classList.add('characterStatsStat')
                stat.style.animation = `statIn 500ms ease-out ${statAnimDelay}ms 1 forwards`
                stat.innerHTML = `
                <img src="graphics/arrowdown.png">
                <span>${character.cons[i]}</span>
                `
                
                doge('characterStatsCharacterStats').append(stat)
                
                statAnimDelay += 50
            }
        }

        if(character.info) {
            const span = document.createElement('span')
            span.innerHTML = character.info
    
            doge('characterStatsCharacterStats').append(span)
        }
    }
    for(let i = 0; i < character.weapon.pros.length; i++) {
        const stat = document.createElement('div')
        stat.classList.add('characterStatsStat')
        stat.style.animation = `statIn 500ms ease-out ${statAnimDelay}ms 1 forwards`
        stat.innerHTML = `
            <img src="graphics/arrowup.png">
            <span>${character.weapon.pros[i]}</span>
        `

        doge('characterStatsWeaponStats').append(stat)

        statAnimDelay += 50
    }
    for(let i = 0; i < character.weapon.cons.length; i++) {
        const stat = document.createElement('div')
        stat.classList.add('characterStatsStat')
        stat.style.animation = `statIn 500ms ease-out ${statAnimDelay}ms 1 forwards`
        stat.innerHTML = `
            <img src="graphics/arrowdown.png">
            <span>${character.weapon.cons[i]}</span>
        `

        doge('characterStatsWeaponStats').append(stat)

        statAnimDelay += 50
    }
}

let characterArray = []
for(const key in characters) {
    characterArray.push(key)
}

const challenges = {
    none: {
        name: 'None',
        desc: '',

        apply: () => {}
    },
    high_stakes: {
        name: 'High Stakes',
        desc: `
            <cg>+50</cg> Luck<br>
            <cg>+1</cg> Shop slot<br>
            <cg>+2</cg> Shop rerolls<br>
            <cp>+$1,000</cp><br>
            Shop opens immediately<br>
            <cb>+50</cb> Enemy level
        `,

        apply: () => {
            modifyStat(['shop','luck'], '+=50')
            modifyStat(['shop','upgrades'], '+=1'),
            modifyStat(['shop','rerolls'], '+=2'),
            player.getMoney(1000)
            modifyStat(['enemy','levelIncrease'], '+=50')
            openShop()
        }
    },
    poverty: {
        name: 'Poverty',
        desc: `
            <cs>1.25x</cs> Score multiplier<br>
            Waves no longer drop money.<br>
            Enemies no longer increase level<br>
            <cp>+$250</cp>
        `,

        apply: () => {
            player.scoreMult = 1.25
            player.getMoney(250)
            modifyStat(['enemy','levelIncrease'], '=-500')
            modifyStat(['enemy','moneyMult'], '=0')
        }
    },
    itemless: {
        name: 'Itemless',
        desc: `
            <cs>5x</cs> Score multiplier<br>
            Items no longer appear in the shop.
        `,

        apply: () => {
            player.scoreMult = 5
            modifyStat(['shop','upgrades'], '=0')
        }
    },
    weapon_plus: {
        name: 'Weapon+',
        desc: `
            <cg>+25</cg> Damage<br>
            <cb>0</cb> Melee size<br>
            <cb>0</cb> Melee damage<br>
            Parrying a bullet deals <cb>25</cb> damage
        `,

        apply: () => {
            modifyStat(['bullet','damage'], '+=25')
            modifyStat(['melee','size'], '=0')
            modifyStat(['melee','damage'], '=0')
            modifyStat(['player','parryHeal'], '=-25')
        }
    },
    melee_plus: {
        name: 'Melee+',
        desc: `
            <cg>+25</cg> Melee damage<br>
            <cg>+15</cg> Melee size<br>
            <cb>0</cb> Max ammo<br>
            <cb>-25</cb> Damage<br>
            Hitting an enemy with a projectile heals <cb>25</cb>HP to the enemy
        `,
        
        apply: () => {
            modifyStat(['melee','damage'], '+=25')
            modifyStat(['melee','size'], '+=15')
            modifyStat(['ammo','max'], '=0')
            modifyStat(['bullet','damage'], '=-25')
        }
    },
    abstract: {
        name: 'Abstract',
        desc: `
            Enemys spawn with random widths and heights.<br>
            Only the <strong>erorr</strong> item can appear in the shop.<br>
            <br>
            <em style="color: grey;">April Fools 2026</em>
        `,
        
        apply: () => {}
    }
}

//Music stuff

const tracks = {
    menu: new Audio('audio/music/menu.mp3'),
    // game: new Audio('audio/music/game.ogg'),
    // gameCombat: new Audio('audio/music/gameCombat.ogg')
}
const totalTracks = Object.keys(tracks).length
let loadedTracks = 0

for(const key in tracks) {
    const track = tracks[key]
    track.onloadeddata = () => {
        loadedTracks++
        console.log(`${loadedTracks}/${totalTracks} Tracks loaded!`)

        if(loadedTracks === totalTracks) {
            startTitle()
        }
    }

    track.onerror = () => {
        loadedTracks++
        
        if(loadedTracks === totalTracks) {
            startTitle()
        }
        throw Error(`Track ${key} failed to load! Proceeding anyways...`)
    }
}

function createNotification(title, desc, img, timeout = 5000, onclick) {
    const div = document.createElement('div')
    div.classList.add('notification')
    div.innerHTML = `
        <img src="graphics/placeholder.png">
        <div>
            <span style="font-weight: 700;">${title}</span><br>
            <span>${desc}</span>
        </div>
    `

    if(img) {
        div.querySelector('img').src = img
    } else {
        div.querySelector('img').remove()
    }

    doge('notificationContainer').append(div)

    div.timeout = setTimeout(() => {
        div.style.opacity = '0'
        div.style.pointerEvents = 'none'
        setTimeout(() => {
            div.remove()
        }, 1000);
    }, timeout);

    div.onclick = () => {
        div.remove()
        clearTimeout(div.timeout)

        if(onclick) {
            onclick()
        }
    }
}

window.onerror = ev => {
    createNotification(
        'Whoops!',
        'An unexpected error occured. Click this notification to copy error to clipboard...', 
        undefined, 
        20000, 
        () => {
            navigator.clipboard.writeText(ev)
            createNotification('Error copied to clipboard!',ev,undefined,2500)
        }
    )
}