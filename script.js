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

    selectedChallenges: [],

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

        musicVolume: 0,
        sfxVolume: 0.1,
        enemyVoiceLines: 'none',
        announceCharacter: false,
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
            Times_Rerolled: 0,
            egg: 0,
        },
        collection: {
            items: [],
            powerItems: [],
            elixirs: []
        },
        unlocked: {
            items: [],
            powerItems: [],
            elixirs: [],
            characters: []
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
        } else if(e.gameActive) {
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
    if(typeof body === 'string') {
        doge('promptBody').innerHTML = body
    } else {
        doge('promptBody').innerHTML = ''
        doge('promptBody').append(body)
    }
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

function updateCharacterSelectStats(character, box) {
    const rect = box.getBoundingClientRect()

    let tooltipWidth = '300px'
    if(character.pros || character.cons || character.info) {
        tooltipWidth = '500px'
    }

    tooltip([rect.left + box.offsetWidth / 2,rect.bottom + 25],character.name, [{text: character.tagList[0].text, col: character.tagList[0].col}], 
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
                <img src="graphics/ui/arrowup.png">
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
                <img src="graphics/ui/arrowdown.png">
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
            <img src="graphics/ui/arrowup.png">
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
            <img src="graphics/ui/arrowdown.png">
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
            Waves no longer drop money.<br>
            Enemies no longer increase level<br>
            <cp>+$250</cp>
        `,

        apply: () => {
            player.getMoney(250)
            modifyStat(['enemy','levelIncrease'], '=-500')
            modifyStat(['misc','waveMoneyMult'], '=0')
        }
    },
    itemless: {
        name: 'Itemless',
        desc: `
            Items no longer appear in the shop.
        `,

        apply: () => {
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
    },
    hidden: {
        name: 'Hidden',
        desc: `
            Enemies become invisible after spawning
        `,
    },
    wheelchair: {
        name: 'Wheelchair',
        desc: `
            <cg>+50</cg> ammo<br>
            <cb>+10</cb> Recoil<br> 
            <cb>0</cb> Speed
        `,
        
        apply: () => {
            modifyStat(['ammo','max'],'+=50')
            modifyStat(['bullet','recoil'], '+=10')
            modifyStat(['player','speed'], '=0')
        }
    },
    skillsUSA: {
        name: 'SkillsUSA Judge Mode',
        desc: `
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
            Waves have <cb>0</cb> cooldown
        `,
        
        apply: () => {
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
            After the player takes damage for the first time, the shop no longer appears.
        `,
    },
    uncanny: {
        name: 'Uncanny',
        desc: `
            An uncanny cat slowly follows the player.<br>
            If the uncanny cat touches the player, they die instantly.<br>
            <br>
            <em style="color: grey;">Try out Uncanny Cat Golf!</em>
        `,
    },
    boss_rush: {
        name: 'Boss Rush',
        desc: `
            A boss spawns every wave instead of enemies.
        `,
    },
    museum: {
        name: 'Museum',
        desc: `
            Only <div class="tooltipTag" style="background: linear-gradient(to left, rgba(64, 155, 158, 1), rgba(134, 68, 172, 1)); display: inline;">MYTHIC</div> items can appear in the shop.
        `,

        apply: () => {
            player.shopWeightMults = [0,0,0,0,1]
        }
    },
    classic: {
        name: 'Classic',
        desc: `
            +Enemies no longer increase level
            +Everything in the shop becomes <cg>free</cg><br>
            +Buying an item closes the shop
        `,

        apply: () => {
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
    Speed_Demon: {
        name: 'Speed Demon',
        desc: 'Reach maximum speed.',
        difficulty: 0,

        unlock: {
            type: 'Character',
            name: 'Sasha',
            src: 'graphics/characters/sashaPortrait.png',
            data: characters.sasha
        },

        run: () => {
            saveData.stats.unlocked.characters.push('sasha')
        }
    },
    Knuckle_Sandwich: {
        name: 'Knuckle Sandwich',
        desc: 'Kill an enemy with a melee.',
        difficulty: 0,

        unlock: {
            type: 'Item',
            name: 'Boxing Gloves',
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

        unlock: {
            type: 'Power Item',
            name: 'The D100',
            src: 'graphics/powerItems/The_D100.png',
            data: powerItems[3].the_d100
        },

        run: () => {
            saveData.stats.unlocked.powerItems.push('the_d100')
        }
    },
    Whoops: {
        name: 'Whoops',
        desc: 'Kill yourself using an explosion.',

        unlock: {
            type: 'Character',
            name: 'Peep',
            src: 'graphics/characters/peepPortrait.png',
            data: characters.tutorialist
        },

        run: () => {
            saveData.stats.unlocked.characters.push('peep')
        }
    },
    Optimization: {
        name: 'Optimization at it\'s finest',
        desc: 'Have less than 10FPS',

        unlock: {
            type: 'Character',
            name: 'The Horse',
            src: 'graphics/characters/the_horsePortrait.png',
            data: characters.the_horse
        },

        run: () => {
            saveData.stats.unlocked.characters.push('the_horse')
        }
    },
    Reroll_Addict: {
        name: 'Reroll Addict',
        desc: 'Reroll the shop 500 times.',

        unlock: {
            type: 'Character',
            name: 'Isaac',
            src: 'graphics/characters/isaacPortrait.png',
            data: characters.isaac
        },

        run: () => {
            saveData.stats.unlocked.characters.push('isaac')
        }
    },
    Knowledgeable: {
        name: 'Knowledgeable',
        desc: 'Complete the tutorial quickly.',
        difficulty: 0,
    },
    Useless_Knowledge_I: {
        name: 'Useless Knowledge I',
        desc: 'Talk to Fella about himself.',
        difficulty: 0,
    },
    Useless_Knowledge_II: {
        name: 'Useless Knowledge II',
        desc: 'Talk to Fella about Goober Shooter 2.',
        difficulty: 0,
    },
    Useless_Knowledge_III: {
        name: 'Useless Knowledge III',
        desc: 'Talk to Fella about SkillsUSA.',
        difficulty: 0,
    },
    Useless_Knowledge_IV: {
        name: 'Useless Knowledge IV',
        desc: 'Talk to Fella about the rug.',
        difficulty: 0,
    },
    The_Egg: {
        name: 'The Egg',
        desc: 'Obtain the egg from the man behind the tree.',
        difficulty: 0,

        unlock: {
            type: 'Character',
            name: 'FRIEND',
            src: 'graphics/characters/friendPortrait.png',
            data: characters.friend
        },

        run: () => {
            saveData.stats.unlocked.characters.push('friend')
        }
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
    The_End: {
        name: 'The End',
        desc: 'Defeat the Tutorialist.',
        difficulty: 0,

        unlock: {
            type: 'Character',
            name: 'The Tutorialist',
            src: 'graphics/characters/tutorialistPortrait.png',
            data: characters.tutorialist
        },

        run: () => {
            saveData.stats.unlocked.characters.push('tutorialist')
        }
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
        unlockable: true,

        unlock: {
            type: 'Item',
            name: 'Dagger',
            src: 'graphics/upgrades/dagger.png',
            data: upgrades[1].dagger
        },

        run: () => {
            saveData.stats.unlocked.items.push('dagger')
        }
    },
    peep_Perfection: {
        name: 'Peep Perfection',
        desc: 'Reach wave 100 using Peep.',
        difficulty: 0,
        unlockable: true,

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
    if(!saveData.achievements.includes(key) && Object.keys(achievements).includes(key) && (![2,3].includes(saveData.gameSettings.gamemode) || achievement.ignoreGamemode) && saveData.selectedChallenges.length === 0) {
        saveData.achievements.push(key)

        createAchNoti(achievement, key)

        if(achievement.unlock) {
            mainMenuEventQueue.push(() => {
                let unlockString = `<strong>${achievement.unlock.name}</strong> can now appear in the shop.`
                if(achievement.unlock.type === 'Character') {
                    unlockString = `You can now play as <strong>${achievement.unlock.name}</strong>`
                }
                createNotification(`${achievement.unlock.type} Unlocked!`,unlockString,achievement.unlock.src)
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
    menu: new Audio(`audio/music/menu.mp3`),
    gameClean: new Audio(`audio/music/gameClean.mp3`),
    gameCleanPaused: new Audio(`audio/music/gameCleanPaused.mp3`),
    gameCombat: new Audio(`audio/music/gameCombat.mp3`),
    gameCombatPaused: new Audio(`audio/music/gameCombatPaused.mp3`),
    gameBoss: new Audio(`audio/music/gameBoss.mp3`),
    gameBossPaused: new Audio(`audio/music/gameBossPaused.mp3`),

    sandbox: new Audio(`audio/music/sandbox.mp3`),
    sandboxPaused: new Audio(`audio/music/sandboxPaused.mp3`),

    tutorialist: new Audio(`audio/music/tutorialist.mp3`),
    tutorialistPaused: new Audio(`audio/music/tutorialistPaused.mp3`),
    tutorialistDeath: new Audio(`audio/music/tutorialistDeath.mp3`),

    gameover: new Audio(`audio/music/gameover.mp3`),

    unknown: new Audio(`audio/music/unknown.mp3`),
    poopshit: new Audio(`audio/music/poopshitBeat.mp3`),
    charlie: new Audio(`audio/music/charlie.mp3`),
    bigmouth: new Audio(`audio/music/bigmouth.mp3`),
}

const totalTracks = Object.keys(tracks).length
let loadedTracks = 0
let currentTrack = ''

for(const key in tracks) {
    const track = tracks[key]
    track.loop = true
    track.play()
    track.preservesPitch = false
    track.volume = 0
    track.onloadeddata = () => {
        loadedTracks++
        console.log(`${loadedTracks}/${totalTracks} Tracks loaded!`)

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

//Track specific stuff
tracks.tutorialistDeath.loop = false

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
        tracks[trackKey].play()
        tracks[trackKey].currentTime = 0

        if(currentTrack) {
            tracks[currentTrack].volume = 0
        }
        tracks[trackKey].volume = saveData.settings.musicVolume

    }
    currentTrack = trackKey
}

function updateTrack(fade = true) {
    //PAUED MUSIC
    let gamePauseString = ''
    if(e.gamePaused) {
        gamePauseString = 'Paused'
    }

    if(!e.gameActive) {
        changeTrack('menu')
        return
    }

    let tutorialist = false
    let tutorialistDeath = false
    elems.enemies.forEach(enemy => {
        if(enemy.data.data.name === 'THE TUTORIALIST') {
            tutorialist = true
        }

        if(enemy.data.data.name === 'Tutorialist Death') {
            tutorialistDeath = true
            player.lastTutorialistDeathTick = e.gameUpdates
        }
    })
    
    if(tutorialistDeath || e.gameUpdates - player.lastTutorialistDeathTick < 150) {
        changeTrack(`tutorialistDeath`,false)
        return
    } else if(tutorialist) {
        changeTrack(`tutorialist${gamePauseString}`,false)
        return
    }


    //SANDBOX AND TUTORIAL
    if(player.inMusicRoom && !player.shitTurnedOff) {
        changeTrack([`poopshit`,`charlie`,`bigmouth`][player.shitmusic],false)
    } else if(player.inEggRoom) {
        changeTrack(`unknown`,false)
    } else if([2,3,4].includes(saveData.gameSettings.gamemode)) {
        changeTrack(`sandbox${gamePauseString}`, fade)
    } else {
        if(player.alive) {
            if(player.fightingBoss) {
                changeTrack(`gameBoss${gamePauseString}`, fade)
            } else if(elems.enemies.length > 0) {
                changeTrack(`gameCombat${gamePauseString}`, fade)
            }
    
            if(elems.enemies.length === 0 && e.gameUpdates - player.lastKillDate > 25) {
                changeTrack(`gameClean${gamePauseString}`, fade)
            }
        } else if(currentTrack !== 'gameClean') {
            changeTrack(`gameover`, fade)
        }
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