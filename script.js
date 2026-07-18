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

const defaultSaveData = {
    selectedCharacter: 'debread',
    selectedSkin: -1,
    firstLogin: false,
    tutorialBeat: true,

    selectedChallenge: 'none',

    settings: {
        weaponEasing: true,
        enemyEasing: true,
        particles: true,
        hidePopupTexts: false,
        presentationMode: false,
        showGameQuitWarning: true,
        showPowerItemWarning: true,
        showGameOverflow: true,
        skunkMode: false,
        debug: false,
        devMode: false,
        autoReload: false,
        particleLimit: 5000,

        musicTracks: 'Goober Shooter 2',
        musicVolume: 0,
        sfxVolume: 0.1,
        enemyVoiceLines: 'none'
    },

    gameSettings: {
        gamemode: 0,
    },

    keybinds: {
        moveUp: 'w',
        moveLeft: 'a',
        moveRight: 'd',
        moveDown: 's',
        reload: 'r',
        powerItem: 'q',
        melee: 'f',
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
    ],

    stats: {
        list: {
            Enemies_Killed: 0,
            Times_Died: 0,
        },
        collection: {
            items: [],
            powerItems: [],
            elixirs: []
        },
        unlocked: {
            items: [],
            powerItems: [],
            elixirs: []
        }
    },
    achievements: [],
    items: []
}

//Save updater, by RedJive2
function fillInto(a, b) {    
    if (typeof a !== 'object' || typeof b !== 'object') {
        throw new Error("a and b must be object, but got " + String(a) + " and " + String(b) + " (merge)")
    }
 
    for (const k in b) {
        if (typeof b[k] === 'object' && k in a) {
            fillInto(a[k], b[k])
        } else if (!(k in a)) {
            a[k] = b[k]
        }
    }
} 
const saveData = JSON.parse(localStorage.getItem("GooberShooter2Save")) ?? defaultSaveData
fillInto(saveData, defaultSaveData)

function save() {
    localStorage.setItem("GooberShooter2Save", JSON.stringify(saveData))
    console.log(`Game saved.`)
}

function deleteSave() {
    localStorage.removeItem("GooberShooter2Save", JSON.stringify(saveData))
    window.location.reload()
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
    translate: '-50% -50%',
    textAlign: 'center',
    lineHeight: '1',
    zIndex: 10,
})

function createPopupText(text, pos) {
    const popup = popupTextBase.cloneNode()
    popup.classList.add('popup')
    
    popup.style.setProperty('--popupX', `${DeBread.randomNum(-25,25)}px`)
    popup.style.setProperty('--popupY', `${DeBread.randomNum(-25,25)}px`)
    popup.style.setProperty('--popupRot', `${DeBread.randomNum(-25,25)}deg`)
    
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

    if(saveData.settings.hidePopupTexts) {
        popup.style.display = 'none'
    }

    return popup
}

const particleBase = document.createElement('div')
particleBase.classList.add('particle')
let particleCount = 0

function createParticles(pos, count, size, dis, duration, timingFunction, styles) {
    if(particleCount <= 100 && saveData.settings.particles) {
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
        DeBread.pauseInterval(1, true)
        hitstopActive = true

        setTimeout(() => {
            hitstopActive = false  
            DeBread.pauseInterval(1, false)
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
    none: {
        name: 'None',
        desc: 'No weapon',
        ammoChar: '❌',
        textureSize: [0,0],

        pros: [],
        cons: [],

        apply: () => {
            modifyStat(['ammo','max'],'=0')
        }
    },
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

            modifyStat(['ammo','reloadSpeed'], '=75')
            modifyStat(['bullet','range'], '=7')
            modifyStat(['bullet','shotCooldown'], '=25')
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

            modifyStat(['ammo','reloadSpeed'], '=100')
            modifyStat(['bullet','range'], '=7')
            modifyStat(['bullet','shotCooldown'], '=30')
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
            modifyStat(['bullet','shotCooldown'], '=1')

            modifyStat(['ammo','reloadSpeed'], '=100')
            modifyStat(['ammo','max'], '=8')

            modifyStat(['ammo','garandReload'], '=true')
            modifyStat(['player','maxWeaponDistance'],'=60')
        }
    },
    sniper: {
        name: 'Sniper',
        desc: 'Long range weapon with increased damage and ammunition that has a chance to apply bleeding to enemies.',
        ammoChar: '|',
        textureSize: [20,9],
        pros: [
            'Damage',
            'Bullet speed',
            'Sharp rounds'
        ],
        cons: [
            'Reload Speed',
            'Shot cooldown',
            'Max ammo'
        ],

        apply: () => {
            modifyStat(['bullet','damage'], '=25')
            modifyStat(['bullet','speed'], '=15')
            modifyStat(['bullet','sharpChance'], '=15')

            modifyStat(['ammo','max'], '=3')
            modifyStat(['ammo','reloadSpeed'], '=80')
            modifyStat(['bullet','shotCooldown'], '=15')

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
            modifyStat(['bullet','shotCooldown'], '=1')
            modifyStat(['ammo','max'], '=50')
            modifyStat(['ammo','current'], '=50')
            modifyStat(['bullet','poisonFieldChance'], '=100')
            modifyStat(['bullet','poisonFieldSize'], '=25')
            modifyStat(['bullet','poisonFieldTicks'], '=3')
            modifyStat(['bullet','poisonFieldDmgPercent'], '=25')
            modifyStat(['bullet','poisonFieldColor'], '=[186, 161, 39]')
            modifyStat(['bullet','knockback'], '=0.1')
            
            modifyStat(['ammo','reloadSpeed'], '=125')
            modifyStat(['bullet','damage'], '=2.5')
            modifyStat(['ammo','autoFire'], '=true')

            modifyStat(['bullet','shotParticleColor'], '=[186, 161, 39]')
        }
    },
    bite: {
        name: 'Bite',
        desc: 'Releases a short-range wave of energy, passing through multiple enemies.',
        ammoChar: '|',
        textureSize: [0,0],
        bulletTexture: true,

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
            modifyStat(['ammo','reloadSpeed'], '=10')
            modifyStat(['bullet','size'], '=50')
            
            modifyStat(['bullet','range'], '=8')
            modifyStat(['bullet','shotCooldown'], '=20')
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
            modifyStat(['ammo','reloadSpeed'], '=100')
            modifyStat(['bullet','shotCooldown'], '=30')

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
            modifyStat(['bullet','shotCooldown'], '=1')
            modifyStat(['ammo','max'], '=50')
            modifyStat(['ammo','current'], '=50')
            
            modifyStat(['ammo','reloadSpeed'], '=100')
            modifyStat(['bullet','damage'], '=5')
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
            modifyStat(['bullet','shotCooldown'], '=10')
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
            modifyStat(['bullet','shotCooldown'], '=10')
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
    },
    baretta_93r: {
        name: 'Baretta 93r',
        desc: '',
        textureSize: [16,11],
        ammoChar: '|',

        pros: [
            'Max ammo',
            'Burst'
        ],
        cons: [
        ],

        apply: () => {
            modifyStat(['ammo','max'], '=15')
            modifyStat(['ammo','burst'], '=3')
        }
    },
    fire_paws: {
        name: 'Fire Paws',
        desc: 'Hot firey paws, living grill and barbecue',
        ammoChar: '🔥',
        textureSize: [0,0],
        bulletTexture: true,

        pros: [
            'Firey ammo',
            'Explosive ammo',
            'Damage'
        ],
        cons: [
            'Speed loss',
            'Weapon reach'
        ],

        apply: () => {
            modifyStat(['bullet','damage'],'=10')
            modifyStat(['bullet','speedDiv'],'=1.1')
            modifyStat(['bullet','range'],'=50')
            modifyStat(['bullet','explosionSize'],'=75')
            modifyStat(['player','maxWeaponDistance'],'=25')
            modifyStat(['player','explosiveHeal'], '=0.00001')
            modifyStat(['bullet','fireyAmmo'],'=true')
        }
    },
    horse_weapon: {
        name: 'horse weapon',
        desc: 'horse weapon description',
        ammoChar: '🐎',
        textureSize: [32,16],
        bulletTexture: true,

        pros: [
            'Stat up per wave'
        ],
        cons: [],

        apply: () => {
            modifyStat(['bullet','spin'],'=10')
            modifyStat(['misc','horseWeapon'],'=true')
        }
    },
    quiver_of_malice: {
        name: 'Quiver of Malice',
        desc: 'horse weapon description',
        ammoChar: '🏹',
        textureSize: [0,0],
        bulletTexture: true,

        pros: [],
        cons: [],

        apply: () => {
            modifyStat(['ammo','burst'],'=Infinity')
        }
    },
    tears: {
        name: 'Tears',
        desc: '',
        ammoChar: '💧',
        textureSize: [0,0],
        bulletTexture: true,

        pros: [
            'Infinite ammo',
            'Projectile size',
            'Autofire'
        ],
        cons: [
            'Shot cooldown',
        ],

        apply: () => {
            modifyStat(['ammo','max'],'=Infinity')
            modifyStat(['bullet','size'],'=20')
            modifyStat(['ammo','autoFire'],'=true')
            modifyStat(['bullet','shotCooldown'],'=20')
        }
    },
    guitar: {
        name: 'Guitar',
        desc: '',
        textureSize: [12,20],
        ammoChar: '🎵',
        bulletTexture: true,

        pros: [
        ],
        cons: [
        ],

        apply: () => {
            modifyStat(['player','maxWeaponDistance'],'=25')
            modifyStat(['bullet','size'],'=14')
            modifyStat(['bullet','lockRot'], '=true')
            modifyStat(['bullet','silentShot'], '=true')

            player.onShoot = proj => {
                DeBread.playSound('audio/ahh.mp3',DeBread.randomNum(0.9,1.1,10), false)
            }
        }
    },
}

const characters = {
    debread: {
        name: 'Bread',
        desc: 'Some guy',
        taunts: 7,
        tag: 'Fox',
        tagCol: '#e0a24a',
        color: [244, 175, 84],

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
        color: [84, 84, 84],

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
        color: [127, 127, 127],

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
        desc: 'bro thinks hes james sunderland',
        tag: 'Arctic Fox',
        tagCol: 'rgb(89, 150, 168)',
        color: [105, 51, 78],
        taunts: 1,

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],

        weapon: weaponPresets.shotgun
    },
    tammy: {
        name: 'Tammy',
        desc: 'Some other other guy',
        tag: 'Dire Wolf',
        tagCol: 'rgb(147, 151, 182)',
        color: [76, 81, 128],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],
        
        weapon: weaponPresets.garand
    },
    lorna: {
        name: 'Lorna Walker',
        desc: 'ACAB? Even her?',
        tag: 'Black Wolf',
        tagCol: '#592c23',
        color: [45, 27, 30],
        taunts: 1,

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],

        weapon: weaponPresets.riot_shotgun
    },
    tana: {
        name: 'Tana',
        desc: '',
        tag: 'Dhole',
        tagCol: 'rgb(92, 189, 230)',
        color: [255,255,255],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],
        
        weapon: weaponPresets.baretta_93r
    },
    nyan: {
        name: 'Nyan',
        desc: 'The world famous magic cat man',
        tag: 'Cat thing??',
        tagCol: 'rgb(230, 92, 92)',
        color: [219, 219, 219],

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],
        
        weapon: weaponPresets.gun
    },
    jaden: {
        name: 'Jaden',
        desc: 'my wife left me',
        taunts: 2,
        tag: 'Vampire',
        tagCol: 'rgb(100,0,10)',
        color: [248, 226, 213],

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
        color: [255, 255, 255],

        info: `Starts with the 'Demon Core' Power Item <br>${powerItems[3].demon_core.desc}`,

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.cannon,

        applyStats: () => {
            player.powerItem = powerItems[3].demon_core
        }
    },
    slip: {
        name: 'Slip',
        desc: '',
        tag: 'Raccoon',
        tagCol: '#514d47',
        color: [128, 127, 123],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun //odst pistol
    },
    // poppy: {
    //     name: 'Poppy',
    //     desc: 'Infinite energy',
    //     taunts: 1,
    //     tag: 'Pomeranian',
    //     tagCol: '#616161',
    //     color: [97,97,97],

    //     pros: ['Speed'],

    //     tagList: [
    //         {text: 'GS2',col: '#775db9'}
    //     ],

    //     weapon: weaponPresets.gun,
        
    //     applyStats: () => {
    //         modifyStat(['player','speed'],'+=1')
    //     }     
    // },
    sasha: {
        name: 'Sasha',
        desc: 'the chomnpner',
        taunts: 1,
        tag: 'German, Shepherd',
        tagCol: '#53463a',
        color: [98, 82, 63],

        info: `Starts with the 'Tennis Ball' Power Item <br>${powerItems[1].tennis_ball.desc}`,

        pros: ['Speed'],

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.bite,
        
        applyStats: () => {
            player.powerItem = powerItems[1].tennis_ball
            modifyStat(['player','speed'],'+=1')
        }
    },
    // olive: {
    //     name: 'Olive',
    //     desc: '',
    //     taunts: 1,
    //     tag: 'Cat',
    //     tagCol: '#9c8670',

    //     tagList: [
    //         {text: 'GS1',col: '#e0a24a'}
    //     ],

    //     weapon: weaponPresets.gun,

    //     skins: [
    //         {
    //             name: 'Mold Olive',
    //             src: 'mold_olive',
    //             taunts: 1,
    //         },
    //         {
    //             name: 'Pixel Olive',
    //             src: 'pixel_olive',
    //             taunts: 1,
    //         },
    //     ]
    // },
    the_horse: {
        name: 'The Horse',
        desc: 'run',
        taunts: 1,
        tag: 'The Horse',
        tagCol: '#6b563c',
        color: [153, 110, 75],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: '🏇🐴🐴🐎🐎🏇🐴🐎🐴🐴',col: '#282422'}
        ],

        weapon: weaponPresets.horse_weapon,

        pros: [
            'So a horse walks into a bar',
            'It asks the bartender, what can I have in Goober Shooter',
            'The bartender says, Idk youre a horse',
            'The horse says give me stat ups',
            'The bartender says, I dont have any stat ups',
            'The horse says, fuck you, I\'ll go to the next bar',
        ],

        applyStats: () => {
            player.visibleStats.push('misc-horseIncrease')
        }
    },
    car: {
        name: 'car',
        desc: 'my name is car',
        taunts: 3,
        tag: 'Car',
        tagCol: '#403b39',
        color: [129, 113, 106],

        tagList: [
            {text: 'GS1',col: '#e0a24a'},
            {text: 'Garn47',col: '#57473d'}
        ],

        weapon: weaponPresets.gun,
    },
    isaac: {
        name: 'Isaac',
        desc: '',
        tag: 'The Binding of Isaac',
        tagCol: '#a9c3ce',
        color: [129, 113, 106],

        tagList: [
            {text: 'GS2',col: '#775db9'},
        ],

        info: `Starts with \'The D6\' Power Item.<br>${powerItems[3].the_d6.desc}`,

        weapon: weaponPresets.tears,

        applyStats: () => {
            player.powerItem = powerItems[3].the_d6
        },
    },
    erix: {
        name: 'erix',
        desc: 'use this one if you wanna be really swag',
        tag: 'Cat',
        tagCol: 'hotpink',
        color: [95, 86, 85],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.guitar
    },
    walf: {
        name: 'Walf',
        desc: '',
        taunts: 1,
        tag: 'Walf',
        tagCol: 'gray',
        color: [158, 158, 158],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        pros: ['POWER regen'],

        cons: [
            'Power items cannot appear in the shop'
        ],

        info: `
            Cannot fire thier own projectiles.<br>
            <br>
            Starts with the \'Walfling\' Power Item.<br>${powerItems[5].walfling.desc}
        `,

        weapon: weaponPresets.none,

        applyStats: () => {
            player.shopWeights[1] = 0
            modifyStat(['player','powerRegen'],'=0.1')
            player.powerItem = powerItems[5].walfling
        },
    },
    jake: {
        name: 'Jake',
        desc: 'good morning wag wag',
        taunts: 2,
        info: `Starts with the \'Pepper\' Power Item.<br>${powerItems[1].pepper.desc}`,
        tag: 'Dog',
        tagCol: '#ab886d',
        color: [231, 219, 205],

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
        color: [41, 41, 41],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.meatCleaver
    },
    krazy: {
        name: 'Krazy',
        desc: 'I know how orange cats are crazy',
        taunts: 1,
        tag: 'Cat',
        tagCol: '#a57f4b',
        color: [176, 126, 64],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    bean: {
        name: 'Bean',
        desc: '',
        tag: 'Bean',
        tagCol: 'rgb(113, 82, 45)',
        color: [178, 101, 29],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        skins: [
            {
                name: 'Stew',
                src: 'stew',
                taunts: 1,
            },
            {
                name: 'Noodle',
                src: 'noodle',
                taunts: 1,
            },
            // {
            //     name: 'Spud', //beetle guy
            //     src: 'Spud',
            //     taunts: 1,
            // },
            // {
            //     name: 'Yogurt', //blue dragon
            //     src: 'yogurt',
            //     taunts: 1,
            // },
            // {
            //     name: 'Curry', //red dragon
            //     src: 'curry',
            //     taunts: 1,
            // },
            // {
            //     name: 'Nickel', //brown wolf (?) (pumpernickel)
            //     src: 'nickel',
            //     taunt: 1,
            // },
            // {
            //     name: 'Spaghetti', //yellow worm
            //     src: 'spaghetti',
            //     taunt: 1,
            // },
            {
                name: 'Soup', //cat
                src: 'soup',
                taunt: 1,
            },
            // {
            //     name: 'Lemon', //bee
            //     src: 'lemon',
            //     taunt: 1,
            // },
            // {
            //     name: 'Marshmellow', //bee
            //     src: 'marshmellow',
            //     taunt: 1,
            // },
        ],

        weapon: weaponPresets.gun
    },
    phoenix: {
        name: 'Phoenix',
        desc: '',
        taunts: 1,
        tag: 'Fox🔥',
        tagCol: '#FF5500',
        color: [248, 135, 0],

        info: `
            Colliding with enemies sets them on fire.<br>
            Has a <cg>50%</cg> to create an explosion dealing <cg>100%</cg> of your damage when hit.
        `,

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        pros: [
            'Explosion immunity',
            'Melee damage'
        ],

        cons: [
            'Speed'
        ],

        applyStats: () => {
            modifyStat(['player','fireTouch'],'=true')
            modifyStat(['player','speed'],'*=0.8')
            modifyStat(['player','explosiveHitChance'],'=50')
            modifyStat(['player','explosiveHitDamage'],'=1')  

            modifyStat(['melee','damage'], '=40')

            player.visibleStats.push('bullet-speedDiv')
        },

        weapon: weaponPresets.fire_paws
    },
    allx: {
        name: 'Quantum',
        desc: '',
        taunts: 1,
        tag: 'Protogen',
        tagCol: '#f67c20',
        color: [40, 32, 12],

        info: `Starts with the \'Tesla Coil\' Power Item.<br>${powerItems[4].tesla_coil.desc}`,

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun,

        pros: [
            'Electrified ammo',
        ],

        applyStats: () => {
            player.powerItem = powerItems[4].tesla_coil

            modifyStat(['bullet','electricChainReach'], '=100')
            modifyStat(['bullet','electricChainLength'], '=3')
        }
    },
    dottr: {
        name: 'Dottr',
        desc: 'taco bel 🤤',
        taunts: 1,
        tag: 'Raccoon',
        tagCol: '#a16e97',
        color: [167, 166, 167],
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
        color: [79, 79, 79],

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
        color: [0, 255, 0],

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

            modifyStat(['bullet','speedDiv'],'=1')
        },

        weapon: weaponPresets.gun
    },
    snorp: {
        name: 'Douglas',
        desc: '',
        taunts: 5,
        tag: 'Cat ?',
        tagCol: '#5268da',
        color: [237, 237, 237],

        info: `
            Starts with the \'Diet Pepsi\' Power Item.<br>${powerItems[5].diet_pepsi.desc}
        `,
        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        cons: [
            'Power items cannot appear in the shop'
        ],

        applyStats: () => {
            player.powerItem = powerItems[5].diet_pepsi
            player.shopWeights[1] = 0
            player.visibleStats.push('shop-pepsifyChance')
        },

        weapon: weaponPresets.gun
    },
    wasp: {
        name: 'Wasp',
        desc: '',
        taunts: 1,
        tag: 'Fox',
        tagCol: '#9c4321',
        color: [240, 142, 66],

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
    wolff: {
        name: 'Wolff',
        desc: 'BRITISH PEOPLE 🤮🤮🤮🤮',
        tag: 'Wolf',
        tagCol: '#420d28',
        color: [112, 86, 78],

        tagList: [
            {text: 'GS1',col: '#e0a24a'},
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    chip: {
        name: 'Chip',
        desc: 'AUSTRALIAN PEOPLE 🤮🤮🤮🤮',
        tag: 'Australian Shepherd',
        tagCol: 'rgb(247, 146, 148)',
        color: [247, 230, 217],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        info: `
            Starts with the \'Egg\' Power Item.<br>${powerItems[5].egg.desc}
        `,

        applyStats: () => {
            player.powerItem = powerItems[5].egg
        },

        weapon: weaponPresets.gun
    },
    // belle: {
    //     name: 'Belle',
    //     desc: '',
    //     tag: 'Porcupinefish',
    //     tagCol: 'rgb(232, 213, 157)',
    //     color: [232, 213, 157],

    //     tagList: [
    //         {text: 'GS2',col: '#775db9'}
    //     ],

    //     weapon: weaponPresets.gun
    // },
    skywalkr: {
        name: 'Skywalkr',
        desc: 'this game is pissing me off',
        tag: 'the&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsporiginal',
        tagCol: 'rgb(107, 106, 52)',
        color: [247, 230, 217],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.mounted_machine_gun
    },
    meringue: {
        name: 'Meringue',
        desc: '',
        taunts: 1,
        tag: 'Lynx',
        tagCol: '#3f3c4e',
        color: [175, 184, 204],

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
    glorp: {
        name: 'Glorp',
        desc: '',
        taunts: 1,
        tag: 'Alien',
        tagCol: '#185225',
        color: [43, 255, 68],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Wizlians',col:'#185225'},
            {text: 'SUSA 2026', col: '#59a7ff'}
        ],

        weapon: weaponPresets.gun
    },
    tico: {
        name: 'Tico',
        desc: '',
        taunts: 1,
        tag: 'Dragon',
        tagCol: '#7c2f96',
        color: [141, 58, 183],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Hot Springs',col:'#7c2f96'},
            {text: 'SUSA 2026', col: '#59a7ff'}
        ],

        weapon: weaponPresets.gun
    },
    tutorialist: {
        name: 'The Tutorialist',
        desc: '',
        taunts: 1,
        tag: '???',
        tagCol: '#050634',
        color: [255,255,255],

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
            modifyStat(['misc','waveMoneyMult'], '=0')
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
            Enemies spawn with random widths and heights.<br>
            Only the <strong>error</strong> item can appear in the shop.<br>
            <br>
            <em style="color: grey;">April Fools 2026</em>
        `,
        
        apply: () => {}
    },
    hidden: {
        name: 'Hidden',
        desc: `
            <cs>1.5x</cs> Score multiplier<br>
            Enemies spawn invisible
        `,
        
        apply: () => {
            player.scoreMult = 1.25
        }
    },
    wheelchair: {
        name: 'Wheelchair',
        desc: `
            <cs>1.25x</cs> Score multiplier<br>
            <cg>+50</cg> ammo<br>
            <cb>+10</cb> Recoil<br> 
            <cb>0</cb> Speed
        `,
        
        apply: () => {
            player.scoreMult = 1.25
            modifyStat(['ammo','max'],'+=50')
            modifyStat(['bullet','recoil'], '+=10')
            modifyStat(['player','speed'], '=0')
        }
    },
    skillsUSA: {
        name: 'SkillsUSA Judge Mode',
        desc: `
            <cs>0.01x</cs> Score multiplier<br>
            <cg>+Infinity</cg> Max Ammo<br>
            <cg>+100</cg> Max HP<br>
            <cg>+100</cg> Melee Damage<br>
            <cg>-90%</cg> Melee Cooldown<br>
            <cg>+100</cg> Luck<br>
            <cg>+900</cg> Max POWER<br>
            <cg>+5</cg> POWER gain multiplier<br>
            <cg>+2</cg> Shop slots<br>
            <cg>+Infinity</cg> Shop rerolls<br>
            <cp>+$Infinity</cp><br>
            <br>
            +Enemies no longer increase level<br>
            +Regular reminders appear telling how to parry<br>
            +Get complimented when successfully performing a parry<br>
        `,
        
        apply: () => {
            player.scoreMult = 0.01
            modifyStat(['player','maxHealth'],'+=100')
            modifyStat(['melee','damage'],'+=100')
            modifyStat(['melee','cooldown'],'*=0.1')
            modifyStat(['ammo','max'],'=Infinity')
            modifyStat(['player','powerGainMult'], '+=5')
            modifyStat(['player','maxPower'], '+=900')
            modifyStat(['shop','luck'],'+=100')
            modifyStat(['shop','upgrades'],'+=2')
            modifyStat(['shop','rerolls'],'=Infinity')

            modifyStat(['enemy','levelIncrease'],'=-Infinity')
            player.getMoney(Infinity)
        }
    },
    spontaneous: {
        name: 'Spontaneous',
        desc: `
            <cs>2.5x</cs> Score multiplier<br>
            Waves have <cb>0</cb> cooldown
        `,
        
        apply: () => {
            player.scoreMult = 2.5
            modifyStat(['misc','waveInterval'],'=10')
        }
    },
    greed: {
        name: 'Greed',
        desc: `
            Hitting an enemy with a bullet has a <cg>25%</cg> chance to spawn 1 random coin<br>
            Waves no longer spawn money
        `,
        
        apply: () => {
            modifyStat(['bullet','coinChance'],'=25')
            modifyStat(['misc','waveMoneyMult'],'=0')
        }
    },
    perfect: {
        name: 'Go for a perfect!',
        desc: `
            <cs>5x</cs> Score multiplier<br>
            After the player takes damage for the first time, the shop no longer appears.
        `,

        apply: () => {
            player.scoreMult = 5
        }
    },
    uncanny: {
        name: 'Uncanny',
        desc: `
            <cs>2.5x</cs> Score multiplier<br>
            An uncanny cat slowly follows the player.<br>
            If the uncanny cat touches the player, they die instantly.<br>
            <br>
            <em style="color: grey;">Try out Uncanny Cat Golf!</em>
            `,

        apply: () => {
            player.scoreMult = 2.5
        }
    },
    classic: {
        name: 'Classic',
        desc: `
            <cs>0.25x</cs> Score multiplier<br>
            +Enemies no longer increase level
            +Everything in the shop becomes <cg>free</cg><br>
            +Buying an item closes the shop
        `,

        apply: () => {
            player.scoreMult = 0.25
            modifyStat(['enemy','levelIncrease'],'=-Infinity')
        }
    },
}

//Achievement Difficulties
//0: All information shown
//1: Achievement is visible, description is replaced with '???'
//2: Achievement is not visible until it is unlocked.

const achievements = {
    First_Blood: {
        name: 'First Blood',
        desc: 'Kill an enemy.',
        difficulty: 0,
    },
    Murderer: {
        name: 'Murderer',
        desc: 'Kill 25 enemies.',
        difficulty: 0,
    },
    Blood_Thirsty: {
        name: 'Blood Thirsty',
        desc: 'Kill 100 enemies.',
        difficulty: 0,
    },
    Serial_Killer: {
        name: 'Serial Killer',
        desc: 'Kill 1,000 enemies.',
        difficulty: 0,
    },
    Anarchist: {
        name: 'Anarchist',
        desc: 'Kill 5,000 enemies.',
        difficulty: 0,
    },
    Paint_the_World_Red: {
        name: 'Paint the World Red',
        desc: 'Kill 10,000 enemies.',
        difficulty: 0,
    },
    Cooked: {
        name: 'Cooked',
        desc: 'Deal over 100 damage at once with a single bullet',
        difficulty: 0,
        unlockType: 'Item',

        unlock: {
            type: 'Item',
            name: 'Red Mushroom',
            src: 'graphics/upgrades/red_mushroom.png',
            data: upgrades[2].red_mushroom
        },

        run: () => {
            saveData.stats.unlocked.items.push('red_mushroom')
        }
    },
    Stylish: {
        name: 'Stylish',
        desc: 'Parry a projectile.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Feedbacker',
            src: 'graphics/upgrades/feedbacker.png',
            data: upgrades[1].feedbacker
        },

        run: () => {
            saveData.stats.unlocked.items.push('feedbacker')
        }
    },
    Intentional_Game_Design: {
        name: 'Intentional Game Design',
        desc: 'Parry a player projectile.<br><em style="color: grey; font-size: 0.75em;">may be an ULTRAKILL reference...</em>',
        difficulty: 1,

        unlock: {
            type: 'Item',
            name: 'Knuckleblaster',
            src: 'graphics/upgrades/knuckleblaster.png',
            data: upgrades[2].knuckleblaster
        },

        run: () => {
            saveData.stats.unlocked.items.push('knuckleblaster')
        }
    },
    Greed: {
        name: 'Greed',
        desc: 'Have $1,000 in a run.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Golden Ammo',
            src: 'graphics/upgrades/golden_ammo.png',
            data: upgrades[3].golden_ammo
        },

        run: () => {
            saveData.stats.unlocked.items.push('golden_ammo')
        }
    },
    Knuckle_Sandwich: {
        name: 'Knuckle Sandwich',
        desc: 'Kill an enemy with a melee.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Boxing Glovess',
            src: 'graphics/upgrades/boxing_gloves.png',
            data: upgrades[1].boxing_gloves
        },

        run: () => {
            saveData.stats.unlocked.items.push('boxing_gloves')
        }
    },
    Item_Abuse: {
        name: 'Item Abuse',
        desc: 'Reroll a mythic item using The D6.',
        difficulty: 0,
    },
    Knowledgeable: {
        name: 'Knowledgeable',
        desc: 'Complete the tutorial quickly.',
        difficulty: 0,
    },
    Survivor: {
        name: 'Survivor',
        desc: 'Reach wave 10.',
        difficulty: 0,
    },
    Trooper: {
        name: 'Trooper',
        desc: 'Reach wave 50.',
        difficulty: 0,
    },
    Conqueror: {
        name: 'Conqueror',
        desc: 'Reach wave 100.',
        difficulty: 0,
    },
    Champion: {
        name: 'Champion',
        desc: 'Reach wave 200.',
        difficulty: 0,
    },
    debread_Perfection: {
        name: 'DeBread Perfection',
        desc: 'Reach wave 100 using DeBread.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'The Tophat',
            src: 'graphics/upgrades/the_tophat.png',
            data: upgrades[4].the_tophat
        },

        run: () => {
            saveData.stats.unlocked.items.push('the_tophat')
        }
    },
    fella_Perfection: {
        name: 'Fella Perfection',
        desc: 'Reach wave 100 using Fella.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Raccoon Tail',
            src: 'graphics/upgrades/raccoon_tail.png',
            data: upgrades[4].raccoon_tail
        },

        run: () => {
            saveData.stats.unlocked.items.push('raccoon_tail')
        }
    },
    plonk_Perfection: {
        name: 'Plonk Perfection',
        desc: 'Reach wave 100 using Plonk.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Used Needle',
            src: 'graphics/upgrades/used_needle.png',
            data: upgrades[4].used_needle
        },

        run: () => {
            saveData.stats.unlocked.items.push('used_needle')
        }
    },
    ashton_Perfection: {
        name: 'Ashton Perfection',
        desc: 'Reach wave 100 using Ashton.',
        difficulty: 0,
    },
    lorna_Perfection: {
        name: 'Lorna Perfection',
        desc: 'Reach wave 100 using Lorna.',
        difficulty: 0,
    },
    tammy_Perfection: {
        name: 'Tammy Perfection',
        desc: 'Reach wave 100 using Tammy.',
        difficulty: 0,
    },
    tana_Perfection: {
        name: 'Tana Perfection',
        desc: 'Reach wave 100 using Tana.',
        difficulty: 0,
    },
    nyan_Perfection: {
        name: 'Nyan Perfection',
        desc: 'Reach wave 100 using Nyan.',
        difficulty: 0,
    },
    jaden_Perfection: {
        name: 'Jaden Perfection',
        desc: 'Reach wave 100 using Jaden.',
        difficulty: 0,
    },
    peep_Perfection: {
        name: 'Peep Perfection',
        desc: 'Reach wave 100 using Peep.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Beret',
            src: 'graphics/upgrades/beret.png',
            data: upgrades[4].beret
        },

        run: () => {
            saveData.stats.unlocked.items.push('beret')
        }
    },
    slip_Perfection: {
        name: 'Slip Perfection',
        desc: 'Reach wave 100 using Slip.',
        difficulty: 0,
    },
    sasha_Perfection: {
        name: 'Sasha Perfection',
        desc: 'Reach wave 100 using Sasha.',
        difficulty: 0,
    },
    the_horse_Perfection: {
        name: 'The Horse Perfection',
        desc: 'Reach wave 100 using The Horse.',
        difficulty: 0,
    },
    car_Perfection: {
        name: 'car Perfection',
        desc: 'Reach wave 100 using car.',
        difficulty: 0,
    },
    isaac_Perfection: {
        name: 'Isaac Perfection',
        desc: 'Reach wave 100 using Isaac.',
        difficulty: 0,

        unlock: {
            type: 'Power Item',
            name: 'The D6',
            src: 'graphics/powerItems/the_d6.png',
            data: powerItems[3].the_d6
        },

        run: () => {
            saveData.stats.unlocked.powerItems.push('the_d6')
        }
    },
    erix_Perfection: {
        name: 'erix Perfection',
        desc: 'Reach wave 100 using erix.',
        difficulty: 0,
    },
    walf_Perfection: {
        name: 'Walf Perfection',
        desc: 'Reach wave 100 using Walf.',
        difficulty: 0,

        unlock: {
            type: 'Power Item',
            name: 'Wisp',
            src: 'graphics/powerItems/wisp.png',
            data: powerItems[4].wisp
        },

        run: () => {
            saveData.stats.unlocked.powerItems.push('wisp')
        }
    },
    jake_Perfection: {
        name: 'Jake Perfection',
        desc: 'Reach wave 100 using Jake.',
        difficulty: 0,
    },
    crow_Perfection: {
        name: 'Crow Perfection',
        desc: 'Reach wave 100 using Crow.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Black Feather',
            src: 'graphics/upgrades/black_feather.png',
            data: upgrades[4].black_feather
        },

        run: () => {
            saveData.stats.unlocked.items.push('black_feather')
        }
    },
    krazy_Perfection: {
        name: 'Krazy Perfection',
        desc: 'Reach wave 100 using Krazy.',
        difficulty: 0,
    },
    bean_Perfection: {
        name: 'Bean Perfection',
        desc: 'Reach wave 100 using Bean.',
        difficulty: 0,
    },
    phoenix_Perfection: {
        name: 'Phoenix Perfection',
        desc: 'Reach wave 100 using Phoenix.',
        difficulty: 0,
    },
    allx_Perfection: {
        name: 'Quantum Perfection',
        desc: 'Reach wave 100 using Quantum.',
        difficulty: 0,

        unlock: {
            type: 'Power Item',
            name: 'Tesla Coil',
            src: 'graphics/powerItems/tesla_coil.png',
            data: powerItems[4].tesla_coil
        },

        run: () => {
            saveData.stats.unlocked.powerItems.push('tesla_coil')
        }
    },
    dottr_Perfection: {
        name: 'Dottr Perfection',
        desc: 'Reach wave 100 using Dottr.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Soap',
            src: 'graphics/upgrades/soap.png',
            data: upgrades[4].soap
        },

        run: () => {
            saveData.stats.unlocked.items.push('soap')
        }
    },
    skunk_Perfection: {
        name: 'Skunk Perfection',
        desc: 'Reach wave 100 using Skunk.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Pepto Bismol',
            src: 'graphics/upgrades/pepto_bismol.png',
            data: upgrades[1].pepto_bismol
        },

        run: () => {
            saveData.stats.unlocked.items.push('pepto_bismol')
        }
    },
    udev_Perfection: {
        name: 'udev Perfection',
        desc: 'Reach wave 100 using udev',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Old Laptop',
            src: 'graphics/upgrades/old_laptop.png',
            data: upgrades[4].old_laptop
        },

        run: () => {
            saveData.stats.unlocked.items.push('old_laptop')
        }
    },
    snorp_Perfection: {
        name: 'Douglas Perfection',
        desc: 'Reach wave 100 using Douglas.',
        difficulty: 0,
    },
    wasp_Perfection: {
        name: 'Wasp Perfection',
        desc: 'Reach wave 100 using Wasp.',
        difficulty: 0,
    },
    wolff_Perfection: {
        name: 'Wolff Perfection',
        desc: 'Reach wave 100 using Wolff.',
        difficulty: 0,
    },
    chip_Perfection: {
        name: 'Chip Perfection',
        desc: 'Reach wave 100 using Chip.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Drool',
            src: 'graphics/upgrades/drool.png',
            data: upgrades[4].drool
        },

        run: () => {
            saveData.stats.unlocked.items.push('drool')
        }
    },
    skywalkr_Perfection: {
        name: 'Skywalkr Perfection',
        desc: 'Reach wave 100 using Skywalkr.',
        difficulty: 0,
    },
    meringue_Perfection: {
        name: 'Meringue Perfection',
        desc: 'Reach wave 100 using Meringue.',
        difficulty: 0,
    },
    glorp_Perfection: {
        name: 'Glorp Perfection',
        desc: 'Reach wave 100 using Glorp.',
        difficulty: 0,
    },
    tico_Perfection: {
        name: 'Tico Perfection',
        desc: 'Reach wave 100 using Tico.',
        difficulty: 0,
    },
    tutorialist_Perfection: {
        name: 'Tutorialist Perfection',
        desc: 'Reach wave 100 using The Tutorialist.',
        difficulty: 0,
    },
    Character_Perfectionist: {
        name: 'Character Perfectionist',
        desc: 'Reach wave 100 on every character. [not working yet]',
        difficulty: 0,
    }
}

function getAchievement(key) {
    const achievement = achievements[key]
    if(!saveData.achievements.includes(key) && Object.keys(achievements).includes(key) && (![2,3].includes(saveData.gameSettings.gamemode) || achievement.ignoreGamemode) && saveData.selectedChallenge === 'none') {
        saveData.achievements.push(key)

        createAchNoti(achievement, key)

        if(achievement.unlock) {
            mainMenuEventQueue.push(() => {
                createNotification(`${achievement.unlock.type} Unlocked!`,`<strong>${achievement.unlock.name}</strong> can now appear in the shop.`,achievement.unlock.src)
            })
        }

        if(achievement.run) achievement.run()
        save()
    }
}

function getAllAchievements() {
    for(key in achievements) {
        getAchievement(key)
    }
}

//Ripped from Goober Shooter 1
function createAchNoti(ach, key) {
    const noti = document.createElement('div')
    noti.classList.add('achNoti')

    noti.classList.add('achNotiAnim')
    setTimeout(() => {
        noti.classList.remove('achNotiAnim')
    }, 500);

    const notiSection1 = document.createElement('span')
    notiSection1.style.transition = 'opacity ease-in-out 500ms'
    notiSection1.innerText = 'Achievement Unlocked!'
    notiSection1.style.fontWeight = '700'
    noti.append(notiSection1)

    const notiImg = document.createElement('img')
    notiImg.style.display = 'none'
    notiImg.style.opacity = 0
    notiImg.style.transition = 'opacity ease-in-out 250ms'
    notiImg.src = `graphics/achievements/${key}.png`
    noti.append(notiImg)

    const notiSection2 = document.createElement('div')
    notiSection2.classList.add('achNotiText')
    notiSection2.style.display = 'none'
    notiSection2.style.opacity = 0
    notiSection2.style.transition = 'opacity ease-in-out 250ms'
    notiSection2.innerHTML = `
    <span>${ach.name}</span><br>
    <span>${ach.desc}</span>
    `
    noti.append(notiSection2)

    doge('achNotiContainer').append(noti)

    noti.style.transition = 'width cubic-bezier(.5,-0.5,.25,1) 500ms, height cubic-bezier(.5,-0.5,.25,1) 500ms, opacity ease-in-out 1s, border-radius cubic-bezier(.5,-0.5,.25,1) 500ms'
    setTimeout(() => {
        if(noti) {
            noti.style.width = '350px'
            noti.style.height = '50px'
            noti.style.borderRadius = '0px'
            notiSection1.style.opacity = 0
            setTimeout(() => {
                if(noti) {
                    notiSection1.style.display = 'none'
                    notiImg.style.display = 'unset'
                    notiSection2.style.display = 'unset'
                    requestAnimationFrame(() => {
                        notiImg.style.opacity = 1
                        notiSection2.style.opacity = 1
                    })
        
                    setTimeout(() => {
                        if(noti) {
                            noti.style.opacity = 0
                            setTimeout(() => {
                                noti.remove()
                            }, 1000);
                        }
                    }, 3000);
                }
            }, 250);
        }
    }, 1500);

    noti.onclick = () => {
        noti.remove()
    }
}

//Music stuff

const tracks = {
    menu: new Audio(`audio/music/${saveData.settings.musicTracks.replaceAll(' ','_')}/menu.mp3`),
    gameClean: new Audio(`audio/music/${saveData.settings.musicTracks.replaceAll(' ','_')}/gameClean.mp3`),
    gameCombat: new Audio(`audio/music/${saveData.settings.musicTracks.replaceAll(' ','_')}/gameCombat.mp3`),
    gameBoss: new Audio(`audio/music/${saveData.settings.musicTracks.replaceAll(' ','_')}/gameBoss.mp3`)
} 
const totalTracks = Object.keys(tracks).length
let loadedTracks = 0
let currentTrack = ''

for(const key in tracks) {
    const track = tracks[key]
    track.loop = true
    track.play()
    track.preservesPitch = false
    track.onloadeddata = () => {
        loadedTracks++
        console.log(`${loadedTracks}/${totalTracks} Tracks loaded!`)
        track.volume = 0

        if(loadedTracks === totalTracks) {
            startScreenTimeouts.push(setTimeout(() => {
                startTitle()
            }, 500));
        }
    }

    track.onerror = () => {
        loadedTracks++
        
        if(loadedTracks === totalTracks) {
            startScreenTimeouts.push(setTimeout(() => {
                startTitle()
            }, 500));
        }
        throw Error(`Track ${key} failed to load! Proceeding anyways...`)
    }
}

function changeTrack(trackKey, carryTime) {
    if(trackKey === currentTrack) return

    if(carryTime) {
        const oldTrack = tracks[currentTrack]
        const newTrack = tracks[trackKey]

        newTrack.currentTime = oldTrack.currentTime

        //Crossfade
        const steps = 20
        const duration = 500
        for(let i = 0; i <= steps; i++) {
            setTimeout(() => {
                newTrack.volume = (i / steps) * saveData.settings.musicVolume
                oldTrack.volume = (1 - (i / steps)) * saveData.settings.musicVolume


                if(i === steps) {
                    newTrack.volume = saveData.settings.musicVolume
                    oldTrack.volume = 0
                }
            }, (duration / steps) * i);
        }
    } else {
        tracks[trackKey].currentTime = 0

        if(currentTrack) {
            tracks[currentTrack].volume = 0
        }
        tracks[trackKey].volume = saveData.settings.musicVolume

    }
    currentTrack = trackKey
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

        onclick?.()
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