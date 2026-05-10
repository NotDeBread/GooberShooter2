const startSequence = [
    {
        text: [
            'A game by',
            'DeBread'
        ],
        images: [
            'graphics/characters/fellaPortrait.png',
        ]
    },
    {
        text: [
            'With music by',
            'B Dawgs'
        ],
    },
    {
        text: [
            'And extra art from',
            'Plinkel'
        ],
        images: [
            'graphics/characters/ashtonPortrait.png',
        ]
    },
]

const startScreenTimeouts = []
function startTitle() {
    for(let i = 0; i < startSequence.length + 1; i++) {
        if(i < startSequence.length) {
            let data = startSequence[i]
            startScreenTimeouts.push(setTimeout(() => {
                for(let x = 0; x < data.text.length; x++) {
                    const textElem = doge('gameStartScreen').querySelectorAll('.gameStartScreenText')[x]
    
                    textElem.style.opacity = '1'
                    textElem.innerText = data.text[x]
                    applyFlowText(textElem, 0.75)
    
                    startScreenTimeouts.push(setTimeout(() => {
                        textElem.querySelectorAll('div').forEach(char => {
                            char.style.animation += `, scaleOut 0.50s ease-in-out 0ms 1 forwards`
                        })
                        doge('gameStartScreen').querySelectorAll('img').forEach(img => {
                            img.style.opacity = '0'
                        })
                    }, 3500))
                }
                if(data.images) {
                    doge('gameStartScreen').querySelectorAll('img').forEach(img => {
                        addStyles(img, {
                            opacity: '0',
                            height: '0',
                            display: 'none'
                        })
                    })
    
                    for(let x = 0; x < data.images.length; x++) {
                        const imgElem = doge('gameStartScreen').querySelectorAll('img')[x]
                        addStyles(imgElem, {
                            opacity: '1',
                            height: '72px',
                            display: 'unset'
                        })
                        imgElem.src = data.images[x]
                    }
                } else {
                    doge('gameStartScreen').querySelectorAll('img').forEach(img => {
                        addStyles(img, {
                            opacity: '0',
                            height: '0',
                        })
                    })
                }
            }, 4000 * i))
        } else {
            startScreenTimeouts.push(setTimeout(() => {
                doge('gameStartScreen').style.opacity = 0
                doge('gameStartScreen').style.pointerEvents = 'none'
                startMainMenu(false)
            }, 4000 * i))
        }
    }
}

function startMainMenu(removeStartScreen = true) {
    if(!saveData.firstLogin) {
        if(removeStartScreen) doge('gameStartScreen').remove()
        openMenu('main')
    
        tracks.menu.currentTime = 10.2
    
        //Auto start game
        if(e.keysDown.includes('shift')) {
            saveData.gameSettings.gamemode = 2
            openMenu('game')
            startGame()
        } 
    }

    for(let i = 0; i < startScreenTimeouts.length; i++) {
        clearTimeout(startScreenTimeouts[i])
    }
    
    if(!navigator.userAgent.includes('Firefox')) {
        openPrompt('Browser warning','Goober Shooter 2 was made for Firefox browsers. Some issues may occur. If you notice your weapon trailing behind, you can disable <strong>Weapon easing</strong> in settings', [{text: 'I understand',onclick: closePrompt}])
    }
    
    if(navigator.userAgent.includes('Firefox') && saveData.firstLogin) {
        openPrompt('You\'re running Firefox','Goober Shooter 2 runs on a tick-based system using the setInterval function. On Firefox browsers this function does not have drift correction, so the game may run slower then expected.',[{text: 'I understand',onclick: closePrompt}])
    }
}

doge('gameStartScreen').onclick = startMainMenu

function createMenuCharacter() {
    const character = document.createElement('div')
    character.classList.add('menuCharacter')

    character.innerHTML = `
        <div class="characterTextureContainer">
            <img src="graphics/characters/${characterArray[DeBread.randomNum(0,characterArray.length-1)]}.png" id="playerTexture">
        </div>
    `
    
    character.pos = [DeBread.randomNum(0,window.innerWidth - 72),DeBread.randomNum(-72, -72 - window.innerHeight)]
    character.grav = 0
    character.lastMove = 0
    character.vel = [0,0]

    addStyles(character, {
        position: 'absolute',
        left: character.pos[0]+'px',
        top: character.pos[1]+'px',
        width: '72px',
        height: '72px',
        pointerEvents: 'none',
        transition: 'left linear 20ms, top linear 20ms',
    })

    if(DeBread.randomNum(1,500) === 1) {
        character.style.scale = '1 -1'
    }

    character.update = () => {
        character.grav++
        character.pos[1] += Math.min(character.grav, 30)

        character.pos[0] += character.vel[0]
        character.pos[1] += character.vel[1]

        character.vel[0] /= 1.1
        character.vel[1] /= 1.1

        if(DeBread.round(character.vel[0]) > 0.5) {
            character.querySelector('.characterTextureContainer').querySelector('img').style.translate = '-380px 0px'
        } else if(DeBread.round(character.vel[0] < -0.5)) {
            character.querySelector('.characterTextureContainer').querySelector('img').style.translate = '-228px 0px'
        } else {
            character.querySelector('.characterTextureContainer').querySelector('img').style.translate = '-304px 0px'
        }

        
        addStyles(character, {
            left: character.pos[0]+'px',
            top: character.pos[1]+'px'
        })

        if(character.pos[1] + character.grav > window.innerHeight - 72) {
            character.pos[1] = window.innerHeight - 72
            character.grav = 0
        }

        if(performance.now() - character.lastMove > DeBread.randomNum(1000,7500)) {
            character.move()
            character.lastMove = performance.now()
        }

        if(character.pos[0] <= -72 || character.pos[0] > window.innerWidth) {
            character.remove()
            createMenuCharacter()
        }
    }

    character.move = () => {
        if(DeBread.randomNum(0,1) === 0) {
            const randomSpeed = DeBread.randomNum(-5,5,5)
            const interval = setInterval(() => {
                character.vel[0] = randomSpeed
            }, 20)
    
            // if(randomSpeed > 0) {
            //     character.querySelector('.characterTextureContainer').querySelector('img').style.translate = '-190px 0px'
            // } else {
            //     character.querySelector('.characterTextureContainer').querySelector('img').style.translate = '-114px 0px'
            // }
            
            setTimeout(() => {
                clearInterval(interval)
            }, 1000);
        } else if(character.grav === 0) {
            character.grav = -10
            character.vel[0] = DeBread.randomNum(-10,10)
        }
    }

    doge('menu-main').append(character)
}

setInterval(() => {
    doge('menu-main').querySelectorAll('.menuCharacter').forEach(character => {character.update()})
}, 20)

function tryPlay() {
    if(!saveData.tutorialBeat) {
        openPrompt(
            'Watch out!',
            'Looks like you haven\'t played the tutorial yet, would you like to play it?',
            [
                {
                    text: 'Yea please', 
                    onclick: () => {
                        saveData.gameSettings.gamemode = 3
                        openMenu('game')
                        startGame()
                        closePrompt()
                    }
                },
                {
                    text: 'Nah i know what im doing',
                    onclick: () => {
                        openMenu('gameSettings') 
                        openGameSettingsMenu(0)
                        closePrompt()
                    }
                }
            ]
        )
    } else {
        openMenu('characterSelect') 
        closePrompt()
    }
}

function topper(buttons) {
    if(buttons === undefined) {
        addStyles(doge('topper'), {
            pointerEvents: 'none',
        })
        doge('topperButton0').style.translate = '-202px'
        doge('topperButton1').style.translate = '202px'
        return
    } else {
        addStyles(doge('topper'), {
            pointerEvents: 'unset',
        })
    }

    if(buttons[0]) {
        doge('topperButton0').style.translate = '-2px'
        doge('topperButton0').querySelector('span').innerText = buttons[0].text
        doge('topperButton0').onclick = buttons[0].onclick
    } else [
        doge('topperButton0').style.translate = '-202px'
    ]

    if(buttons[1]) {
        doge('topperButton1').style.translate = '2px'
        doge('topperButton1').querySelector('span').innerText = buttons[1].text
        doge('topperButton1').onclick = buttons[1].onclick
    } else {
        doge('topperButton1').style.translate = '202px'
    }
}

let mainMenuEventQueue = []
let currentMenu = 'main'
function openMenu(menu) {
    doge(`menu-${currentMenu}`).style.display = 'none'
    doge(`menu-${menu}`).style.display = 'flex'

    const submenuTitle = doge(`menu-${menu}`).querySelector('.submenuTitle')
    if(submenuTitle) {
        if(submenuTitle.text) {
            submenuTitle.innerText = submenuTitle.text
        }
        submenuTitle.text = submenuTitle.innerText
        applyFlowText(submenuTitle)
    }

    currentMenu = menu

    if(menu === 'main') {
        e.gameActive = false
        doge('menuTitle1').innerText = 'Goober'
        doge('menuTitle2').innerText = 'Shooter'
        
        if(DeBread.randomNum(1,500) === 1) {
            doge('menuTitle1').innerText = 'Googer'
        }
        
        applyFlowText(doge('menuTitle1'), 0.75)
        applyFlowText(doge('menuTitle2'), 0.75)
        if(DeBread.randomNum(1,100) === 1) {
            const tumbleweed = document.createElement('img')
            tumbleweed.pos = [-128, window.innerHeight - 128]
            tumbleweed.grav = 0
            tumbleweed.rot = 0
            tumbleweed.src = 'graphics/tumbleweed.png'
            addStyles(tumbleweed, {
                width: '128px',
                height: '128px',
                position: 'absolute',
                left: tumbleweed.pos+'px',
                bottom: '0'
            })

            doge('menu-main').append(tumbleweed)

            tumbleweed.interval = setInterval(() => {
                tumbleweed.pos[0] += 5
                tumbleweed.rot += 3

                tumbleweed.pos[1] += tumbleweed.grav

                tumbleweed.grav++

                if(tumbleweed.pos[1] > window.innerHeight - 128) {
                    tumbleweed.grav = -10
                    tumbleweed.pos[1] = window.innerHeight - 128
                }

                tumbleweed.style.left = tumbleweed.pos[0]+'px'
                tumbleweed.style.top = tumbleweed.pos[1]+'px'
                tumbleweed.style.rotate = tumbleweed.rot+'deg'

                if(tumbleweed.pos[0] > window.innerWidth) {
                    tumbleweed.remove()
                }
            }, 20)
        } else {
            for(let i = 0; i < 4; i++) {createMenuCharacter()}
        }

        for(let i = 0; i < mainMenuEventQueue.length; i++) {
            const queuedFunction = mainMenuEventQueue[i]
            console.log(250 * i)
            setTimeout(() => {
                queuedFunction()
            }, 250 * (i+1));
        }

        mainMenuEventQueue = []

        topper()
    } else {
        doge('menu-main').querySelectorAll('.menuCharacter').forEach(char => {char.remove()})
    }

    if(menu === 'gameSettings') {
        renderChallenges()
        openGameSettingsMenu(0)

        topper([
            {
                text: 'Character select',
                onclick: () => {openMenu('characterSelect')}
            },
        ])
    }

    if(menu === 'characterSelect') {
        renderCharacterSelect()
        topper([
            {
                text: 'Main menu',
                onclick: () => {openMenu('main')}
            },
            {
                text: 'Game settings',
                onclick: () => {openMenu('gameSettings')}
            }
        ])

        if(e.keysDown.includes('shift')) {
            openMenu('gameSettings')
        }
    }

    if(menu === 'game') {
        topper() 
    }

    if(menu === 'achievements') {
        renderAchievementList()
        topper([
            {
                text: 'Main menu',
                onclick: () => {openMenu('main')}
            },
        ])
    }

    if(menu === 'collection') {
        renderCollectionPage('items')
        topper([
            {
                text: 'Main menu',
                onclick: () => {openMenu('main')}
            },
        ])
    }
}

function renderCharacterSelect() {
    function updateSelectedCharacter() {
        doge('selectedCharacterName').innerText = characters[saveData.selectedCharacter].name
        doge('selectedCharacterDesc').innerText = characters[saveData.selectedCharacter].desc
        doge('selectedCharacterImg').src = `graphics/characters/${saveData.selectedCharacter}PortraitLarge.png`
        doge('selectedCharacterImgSmall').src = `graphics/characters/${saveData.selectedCharacter}Portrait.png`

        doge('selectedCharacterTags').innerHTML = ''

        const tag2 = document.createElement('div')
        tag2.classList.add('selectedCharacterTag')
        tag2.innerHTML = characters[saveData.selectedCharacter].tag
        tag2.style.backgroundColor = characters[saveData.selectedCharacter].tagCol
        doge('selectedCharacterTags').append(tag2)

        for(const key in characters[saveData.selectedCharacter].tagList) {
            const tag = document.createElement('div')
            tag.classList.add('selectedCharacterTag')
            tag.innerHTML = characters[saveData.selectedCharacter].tagList[key].text
            tag.style.background = characters[saveData.selectedCharacter].tagList[key].col

            doge('selectedCharacterTags').append(tag)
        }

        // const tag = document.createElement('div')
        // tag.classList.add('selectedCharacterTag')
        // tag.innerHTML = `${characters[saveData.selectedCharacter].taunts ?? '???'} taunts`
        // doge('selectedCharacterTags').append(tag)
    } updateSelectedCharacter()
    

    doge('characterSelectContainer').innerHTML = ''
    for(const key in characters) {
        const character = characters[key]
        const box = document.createElement('div')
        box.classList.add('characterSelectCharacterBox')
        box.innerHTML = `
            <img src="graphics/characters/${key}Portrait.png">
        `

        box.character = key
        box.id = key + 'Button'

        box.onmouseenter = () => {
            updateCharacterSelectStats(character, box)
        }

        box.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }

        box.onclick = () => {
            saveData.selectedCharacter = box.character
            saveData.selectedSkin = -1

            doge('characterSelectContainer').querySelectorAll('.characterSelectCharacterBox').forEach(button => {
                button.style.outline = ''
            })

            box.style.outline = '2px solid white'

            updateSelectedCharacter(box.character)
            updateCharacterCustomization()
        }

        doge('characterSelectContainer').append(box)
    }

    updateCharacterCustomization()
}

let currentCosmeticLayer = 0
function updateCharacterCustomization() {
    doge('ccCosmetics').innerHTML = ''
    doge('ccSkins').innerHTML = ''

    const playerCosmetics = [{
        name: 'None',
        desc: 'boorrringg',
        src: 'none'
    }]

    for(const cosmetic in cosmetics) {
        playerCosmetics.push(cosmetics[cosmetic])
    }

    for(const cosmetic in playerCosmetics) {
        const button = document.createElement('div')
        button.classList.add('ccCosmetic')
        button.id = 'ccCosmetic'+playerCosmetics[cosmetic].src
        button.innerHTML = `
            <img src="graphics/cosmetics/${playerCosmetics[cosmetic].src}Icon.png">
        `

        button.onmouseenter = () => {
            const buttonRect = button.getBoundingClientRect()
            tooltip([buttonRect.left + button.offsetWidth / 2, buttonRect.top + button.offsetHeight + 12], playerCosmetics[cosmetic].name, [{text: 'COSMETIC', col: '#5b5bbd'}], playerCosmetics[cosmetic].desc)
        }

        button.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }

        button.onclick = () => {
            saveData.cosmetics[currentCosmeticLayer].id = playerCosmetics[cosmetic].src

            if(playerCosmetics[cosmetic].src === 'none') {
                doge(`ccCosmetic${currentCosmeticLayer}Outline`).querySelector('img').style.opacity = '0'
                doge(`ccCosmetic${currentCosmeticLayer}`).querySelector('img').style.opacity = '0'
            } else {
                doge(`ccCosmetic${currentCosmeticLayer}Outline`).querySelector('img').style.opacity = '1'
                doge(`ccCosmetic${currentCosmeticLayer}`).querySelector('img').style.opacity = '1'
            }

            doge(`ccCosmetic${currentCosmeticLayer}Outline`).querySelector('img').src = `graphics/cosmetics/${playerCosmetics[cosmetic].src}Outline.png`
            doge(`ccCosmetic${currentCosmeticLayer}`).querySelector('img').src = `graphics/cosmetics/${playerCosmetics[cosmetic].src}.png`

            doge('ccCosmetics').querySelectorAll('div').forEach(button => {
                button.style.backgroundColor = 'transparent'    
                button.style.outline = '1px solid grey'
            })
            doge('ccCosmetic'+saveData.cosmetics[currentCosmeticLayer].id).style.backgroundColor = 'rgb(255,255,255,0.1)'
            doge('ccCosmetic'+saveData.cosmetics[currentCosmeticLayer].id).style.outline = '2px solid white'
        }

        doge('ccCosmetics').append(button)
    }

    const playerSkins = [{
        name: 'Default',
        src: `${saveData.selectedCharacter}`,
        taunts: characters[saveData.selectedCharacter].taunts
    }]

    for(const skin in characters[saveData.selectedCharacter].skins) {
        playerSkins.push(characters[saveData.selectedCharacter].skins[skin])
    }

    for(const skin in playerSkins) {
        const button = document.createElement('div')
        button.classList.add('ccSkin')
        button.innerHTML = `
        <img src="graphics/characters/${playerSkins[skin].src}Portrait.png">
        `
        doge('ccSkins').append(button)
        
        const buttonRect = button.getBoundingClientRect()
        button.onmouseenter = () => {
            tooltip([buttonRect.left + button.offsetWidth / 2, buttonRect.top + button.offsetHeight + 12], playerSkins[skin].name, [{text: 'SKIN', col: '#973a3a'}], '')
        }

        button.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }

        button.onclick = () => {
            saveData.selectedSkin = skin - 1
            updateCharacterCustomizationCharacter()
        }
    }

    for(const x of ['ccRangeXOffset','ccRangeYOffset','ccRangeRot']) {
        doge(x).onchange = updateRanges
        doge(x).onmousemove = updateRanges
    }
    
    function updateRanges() {
        const posValues = [doge('ccRangeXOffset').value, doge('ccRangeYOffset').value]
        const rotValue = [doge('ccRangeRot').value]

        saveData.cosmetics[currentCosmeticLayer].xOffset = posValues[0]
        saveData.cosmetics[currentCosmeticLayer].yOffset = posValues[1]
        saveData.cosmetics[currentCosmeticLayer].rot = rotValue

        doge(`ccCosmetic${currentCosmeticLayer}`).style.translate = `${posValues[0]*4}px ${posValues[1]*4}px`
        doge(`ccCosmetic${currentCosmeticLayer}`).style.rotate = `${rotValue}deg`
        doge(`ccCosmetic${currentCosmeticLayer}Outline`).style.translate = `${posValues[0]*4}px ${posValues[1]*4}px`
        doge(`ccCosmetic${currentCosmeticLayer}Outline`).style.rotate = `${rotValue}deg`
    }

    updateCharacterCustomizationCharacter()
}

function changeCCCosmeticLayer(layer) {
    currentCosmeticLayer = layer

    doge('ccRangeXOffset').value = saveData.cosmetics[currentCosmeticLayer].xOffset
    doge('ccRangeYOffset').value = saveData.cosmetics[currentCosmeticLayer].yOffset
    doge('ccRangeRot').value = saveData.cosmetics[currentCosmeticLayer].rot

    doge('ccCosmetics').querySelectorAll('div').forEach(button => {
        button.style.backgroundColor = 'transparent'    
        button.style.outline = '1px solid grey'
    })
    doge('ccCosmetic'+saveData.cosmetics[currentCosmeticLayer].id).style.backgroundColor = 'rgb(255,255,255,0.1)'
    doge('ccCosmetic'+saveData.cosmetics[currentCosmeticLayer].id).style.outline = '2px solid white'
}

function updateCharacterCustomizationCharacter() {
    let playerSrc = saveData.selectedCharacter
    if(saveData.selectedSkin > -1) {
        playerSrc = characters[saveData.selectedCharacter].skins[saveData.selectedSkin].src
    }

    doge('ccCharacter').src = `graphics/characters/${playerSrc}Portrait.png`
}

function renderAchievementList() {
    doge('innerAchList').innerHTML = ''
    let achievementStatus = [0,0]
    for(const key in achievements) {
        const achievement = achievements[key]

        const div = document.createElement('div')
        div.classList.add('ach')
        div.innerHTML = `
        <img src="graphics/achievements/${key}.png">
        <div class="achText">
            <strong>${achievement.name}</strong>
            <span>${achievement.desc}</span>
        </div>
        `

        let unlocked = false
        if(!saveData.achievements.includes(key)) {
            div.style.border = '2px solid rgb(50,50,50)'
            div.style.color = 'grey'
            div.querySelector('img').style.filter = 'grayscale() brightness(50%)'

            achievementStatus[1]++
        } else {
            achievementStatus[0]++
            unlocked = true
        }

        doge('innerAchList').append(div)

        div.onmouseenter = () => {
            let tag = []
            let desc = achievement.desc
            if(achievement.unlock) {
                desc += `<br><br>
                <div>Unlocks<br>
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 5px;">
                        <strong style="white-space: nowrap;">${achievement.unlock.name}</strong>
                        <div class="coolLine"></div>
                        <div style="width: 32px; display: flex; justify-content: center; align-items: center;">
                            <img src="${achievement.unlock.src}" style="width: 32px !important;">
                        </div>
                    </div>
                </div>
                ${achievement.unlock.data.desc}`
            }

            if(unlocked) {
                tag = [
                    {
                        text: ['COMPLETED'],
                        col: '#37683a'
                    }
                ]
            }

            const divRect = div.getBoundingClientRect()
            tooltip(
                [divRect.left + div.offsetWidth / 2, divRect.bottom + 10], 
                achievement.name, 
                tag, 
                desc
            )
        }

        div.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }
    }

    const percent = achievementStatus[0] / (achievementStatus[0]+achievementStatus[1])
    doge('achBarText').innerText = `${achievementStatus[0]}/${Object.keys(achievements).length} (${DeBread.round(percent*100,1)}%)`
    doge('innerAchBar').style.width = percent*100+'%'
}

function renderCollectionPage(page) {
    doge('collectionList').innerHTML = ''
    if(page === 'items') {
        let itemProgress = [0,0]
        for(const rarity in upgrades) {
            for(const key in upgrades[rarity]) {
                const item = document.createElement('div')
                addStyles(item, {
                    border: '2px solid grey',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50px',
                    height: '50px'
                })

                let textureExtension = 'png'
                if(upgrades[rarity][key].animatedTexture) textureExtension = 'gif'

                item.innerHTML = `<img src="graphics/upgrades/${key}.${textureExtension}" style="width: 32px;">`

                if(rarity === '4') {
                    item.style.animation += 'mythicBorder 5s linear infinite forwards'
                    item.querySelector('img').style.animation = 'mythicGlow 5s linear infinite forwards'
                } else {
                    item.querySelector('img').style.filter = `drop-shadow(0px 0px 5px ${rarities[rarity].color})`
                    item.style.boxShadow = `inset 0px 0px 0px 3px ${rarities[rarity].color}`
                }

                if(rarity !== '5') { //Exclude sandbox upgrades
                    doge('collectionList').append(item)
                }
                
                const data = upgrades[rarity][key]
                let isUnlocked = true
                if(data.unlockable && !saveData.items.includes(key)) {
                    isUnlocked = false
                }

                let isCollected = saveData.itemsCollected.includes(key)

                if(isCollected || saveData.settings.devMode) {
                    item.onmouseenter = () => {
    
                        doge('collectionImg').src = `graphics/upgrades/${key}.${textureExtension}`
    
                        if(typeof data.name === 'function') {
                            doge('collectionItemName').innerText = data.name()
                        } else {
                            doge('collectionItemName').innerText = data.name
                        }
    
                        if(typeof data.desc === 'function') {
                            doge('collectionItemDesc').innerHTML = data.desc()
                        } else {
                            doge('collectionItemDesc').innerHTML = data.desc
                        }
    
                        const tags = [
                            {text: rarities[rarity].name, col: rarities[rarity].color},
                            {text: 'ITEM',col: 'rgb(50,50,50)'}
                        ]
    
                        doge('collectionItemTags').innerHTML = ''
                        for(const tag of tags) {
                            const div = document.createElement('div')
                            div.classList.add('tooltipTag')
                            div.innerHTML = tag.text
                            div.style.background = tag.col
    
                            doge('collectionItemTags').append(div)
                        }
                    }

                    itemProgress[0]++
                } else {
                    if(!isUnlocked) {
                        item.querySelector('img').src = 'graphics/icons/lock.png'
    
                        item.onmouseenter = () => {
                            doge('collectionImg').src = 'graphics/icons/lock.png'
        
                            doge('collectionItemName').innerText = 'Locked'
                            doge('collectionItemDesc').innerHTML = 'Play more to unlock this item!'
                            doge('collectionItemTags').innerHTML = ''

                            console.log(data)
                        }
                    } else if(!isCollected) {
                        item.querySelector('img').src = 'graphics/icons/unknown.png'
    
                        item.onmouseenter = () => {
                            doge('collectionImg').src = 'graphics/icons/unknown.png'
        
                            doge('collectionItemName').innerText = 'Not collected'
                            doge('collectionItemDesc').innerHTML = 'Buy this item from the shop to add it to the collection page!'
                            doge('collectionItemTags').innerHTML = ''

                            console.log(data)
                        }
                    }
                }

                itemProgress[1]++
            }
        }

        doge('collectionProgressBarText').innerText = `${itemProgress[0]}/${itemProgress[1]} (${DeBread.round(itemProgress[0]/itemProgress[1]*100,1)}%)`
        doge('innerCollectionProgressBar').style.width = itemProgress[0]/itemProgress[1]*100 + '%'
    }

    doge('collectionProgressTitle').innerText = page.toUpperCase()
}

const gamemodeNames = [
    'Survival',
    'Sprint',
    'Sandbox',
]

let currentGameSettingsMenu = 0
function openGameSettingsMenu(id) {
    renderChallenges()
    currentGameSettingsMenu = Math.min(Math.max(id,0),doge('gameSettingsTabs').children.length-1)
    for(let i = 0; i < doge('gameSettingsTabs').children.length; i++) {
        if(i === currentGameSettingsMenu) {
            doge(`gameSettingsMenu-${i}`).style.display = 'unset'
            doge(`gameSettingsTab${i}`).style.backgroundColor = 'white'
            doge(`gameSettingsTab${i}`).style.color = 'black'
        } else {
            doge(`gameSettingsMenu-${i}`).style.display = 'none'
            doge(`gameSettingsTab${i}`).style.backgroundColor = 'transparent'
            doge(`gameSettingsTab${i}`).style.color = 'white'
        }
    }

    if(id === 0) {
        doge('gameSettingsBack').style.display = 'none'
    } else {
        doge('gameSettingsBack').style.display = 'unset'
    }

    if(id === doge('gameSettingsTabs').children.length-1) {
        doge('gameSettingsNext').innerText = 'PLAY'
        doge('gameSettingsNext').style.width = '100px'
        doge('gameSettingsNext').onclick = () => {
            openMenu('game') 
            startGame()
        }
    } else {
        doge('gameSettingsNext').innerText = 'Next'
        doge('gameSettingsNext').style.width = '75px'
        doge('gameSettingsNext').onclick = () => {
            openGameSettingsMenu(currentGameSettingsMenu+1)
        }

    }

    if(currentGameSettingsMenu === 2) {
        const character = characters[saveData.selectedCharacter]
        doge('gameSettingsSelectedGamemode').innerText = gamemodeNames[saveData.gameSettings.gamemode]
        doge('gameSettingsSelectedCharacter').innerText = characters[saveData.selectedCharacter].name
        doge('gameSettingsSelectedWeapon').innerText = characters[saveData.selectedCharacter].weapon.name
        doge('gameSettingsSelectedCharacterImg').src = `graphics/characters/${saveData.selectedCharacter}Portrait.png`

        doge('gameSettingsSelectedChallenge').innerText = challenges[saveData.selectedChallenge].name

        doge('gameSettingsSelectedChallenge').onmouseenter = () => {
            const buttonRect = doge('gameSettingsSelectedChallenge').getBoundingClientRect()
            tooltip([buttonRect.left + doge('gameSettingsSelectedChallenge').offsetWidth / 2, buttonRect.top + doge('gameSettingsSelectedChallenge').offsetHeight + 12], challenges[saveData.selectedChallenge].name, [{text: 'CHALLENGE', col: '#661b2f'}], challenges[saveData.selectedChallenge].desc, undefined)
        }

        doge('gameSettingsSelectedChallenge').onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }

        //janky as hell
        const rect = doge('gameSettingsCharacterContainer').getBoundingClientRect()
        let tooltipWidth = '300px'
        if(character.pros || character.cons || character.info) {
            tooltipWidth = '500px'
        }

        doge('gameSettingsCharacterContainer').onmouseenter = () => {
            tooltip([rect.left + doge('gameSettingsCharacterContainer').offsetWidth / 2,rect.bottom + 25],characters[saveData.selectedCharacter].name, [{text: characters[saveData.selectedCharacter].tag, col: characters[saveData.selectedCharacter].tagCol}], 
                `
                <div style="width: ${tooltipWidth}; margin-top: 5px;">
                    ${characters[saveData.selectedCharacter].desc}
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

        doge('gameSettingsCharacterContainer').onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }
    }
} openGameSettingsMenu(currentGameSettingsMenu)

function selectGamemode(gm) {
    for(let i = 0; i <= gamemodeNames.length-1; i++) {
        if(i !== gm) {
            doge(`gameSettingsGM${i}`).setAttribute('selected','false')
        } else {
            doge(`gameSettingsGM${i}`).setAttribute('selected','true')
        }
    }
    saveData.gameSettings.gamemode = gm
}

function renderChallenges() {
    if(saveData.gameSettings.gamemode === 3) {
        saveData.selectedChallenge = 'none'
    }

    doge('gameSettingsChallenges').innerHTML = ''

    for(const key in challenges) {
        const button = document.createElement('div')
        button.innerHTML = `<img src="graphics/challenges/${key}.png">`
        button.classList.add('gameSettingsChallenge')

        doge('gameSettingsChallenges').append(button)

        if(saveData.selectedChallenge === key) {
            button.style.backgroundColor = 'white'
            button.querySelector('img').style.filter = 'invert()'
        }

        button.onmouseenter = () => {
            const buttonRect = button.getBoundingClientRect()
            tooltip([buttonRect.left + button.offsetWidth / 2, buttonRect.top + button.offsetHeight + 12], challenges[key].name, [{text: 'CHALLENGE', col: '#661b2f'}], challenges[key].desc, undefined)
        }

        button.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }

        button.onclick = () => {
            if(saveData.gameSettings.gamemode === 3) {
                createNotification('Whoops!','Challenges are not availble in the tutorial!')
            } else if(saveData.settings.presentationMode) {
                createNotification('Whoops!','Challenges are not availble in presentation mode!')
            } else {
                saveData.selectedChallenge = key
    
                doge('gameSettingsChallenges').querySelectorAll('div').forEach(div => {
                    if(div === button) {
                        div.style.backgroundColor = 'white'
                        div.querySelector('img').style.filter = 'invert()'
                    } else {
                        div.style.backgroundColor = 'transparent'
                        div.querySelector('img').style.filter = 'unset'
                    }
                })
            }
        }
    }
}

const creditsHTML = `
    <div style="display: flex; align-items: center; flex-direction: column;">
        <img src="graphics/logo.png" width=175>
        <span>By <a href="https://debread.space/" target="_blank">DeBread</a></span>
    </div>
    <span>Idea help: <a href="https://yeen.town/@Chalkllate" target="blank">Jake</a>, <a href="https://www.youtube.com/@redjive2/" target="_blank">Redjive2</a></span><br>
    <span>Background Shader: From <a href="https://www.playbalatro.com/" target="_blank">Balatro</a>, rewritten by <a href="https://xemantic.github.io/shader-web-background/" target="_blank">xemantic</a></span><br>
    <span>Addditional Textures: <a href="https://plinkel.neocities.org/" target="_blank">Plinkel</a></span><br>
    <span>Additional SFX: </span><a href="https://www.youtube.com/@redjive2/" target="_blank">Redjive2</a><br>
    <span>Playtesters: Nova, TrueSkywalkr, Dottr, <a href="https://plinkel.neocities.org/" target="_blank">Plinkel</a></span><br>
    <span>Save filler: </span><a href="https://www.youtube.com/@redjive2/" target="_blank">Redjive2</a><br>
    <br>
    <span>Supporters 💖: xX_DeBread_H8ER_Xx</span>
`

const settingsHTML = `
    <div id="settings">
        <div style="display: flex; gap: 5px; padding-bottom: 5px; border-bottom: 1px solid grey; height: 24px;">
            <button onclick="openSettingsMenu('general')">General</button>
            <button onclick="openSettingsMenu('performance')">Performance</button>
            <button onclick="openSettingsMenu('sound')">Sound</button>
            <button onclick="openSettingsMenu('fun')">Fun</button>
            <button onclick="openSettingsMenu('account')">Account</button>
        </div>
        <div class="settingsSection" id="settingsSection-general">
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-showGameQuitWarning"></div>
                <div class="settingsCheckboxInfo">
                    <span>Show game quit/restart warning</span>
                    <span>Displays a popup before allowing you to quit/restart the game.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-showPowerItemWarning"></div>
                <div class="settingsCheckboxInfo">
                    <span>Show Power Item replacement warning</span>
                    <span>Displays a popup before allowing you to replace your current Power Item.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-presentationMode"></div>
                <div class="settingsCheckboxInfo">
                    <span>Presentation Mode</span>
                    <span>Removes inappropriate language.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-showGameOverflow"></div>
                <div class="settingsCheckboxInfo">
                    <span>Show area overflow</span>
                    <span>Displays area objects located outside of the game bounds.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-skunkMode"></div>
                <div class="settingsCheckboxInfo">
                    <span>Skunk Mode</span>
                    <span>"Fixes" keybinds.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-debug"></div>
                <div class="settingsCheckboxInfo">
                    <span>Debug Mode</span>
                    <span>Shows debugging information in-game.</span>
                </div>
            </div>
        </div>
        <div class="settingsSection" id="settingsSection-performance">
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-weaponEasing"></div>
                <div class="settingsCheckboxInfo">
                    <span>Weapon easing</span>
                    <span>Makes the weapon smoothly move between postions. Disable if weapon position seems jittery or lags behind.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-enemyEasing"></div>
                <div class="settingsCheckboxInfo">
                    <span>Enemy easing</span>
                    <span>Makes enemies smoothly move between postions. Disable if enemies seem jittery.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-particles"></div>
                <div class="settingsCheckboxInfo">
                    <span>Particles</span>
                    <span>Enhances graphics using particles.</span>
                </div>
            </div>
        </div>
        <div class="settingsSection" id="settingsSection-sound">
        </div>
        <div class="settingsSection" id="settingsSection-fun">
            <span>Enemy voice lines:</span>
            <select id="sdd-enemyVoiceLines">
                <option>
                    <span>none</span>
                </option>
                <option>
                    <span>Skywalkr</span>
                </option>
                <option>
                    <span>Dottr</span>
                </option>
            </select>
            <br>
            <span>Consumable voice lines:</span>
            <select id="sdd-enemyVoiceLines">
                <option>
                    <span>none</span>
                </option>
                <option>
                    <span>Dottr</span>
                </option>
            </select>
        </div>
        <div class="settingsSection" id="settingsSection-account">
            <button onclick="tryDeleteSave()">Delete Save</button>
        </div>
    </div>
`

function tryDeleteSave() {
    openPrompt('Woah!','Are you sure you want to delete your save????',[{text: 'NO PLEASE DONT', onclick: () => {openSettings()}}, {text: 'Yeah :(', onclick: () => {deleteSave()}}])
}

function openSettings() {
    openPrompt('Settings', settingsHTML, [{text: "Close", onclick: () => {closePrompt()}}], [500, 400])
    openSettingsMenu('general')

    doge('prompt').querySelectorAll('.genericCheckbox').forEach(checkbox => {
        const setting = checkbox.id.replace('scb-','')
        //Set to current values
        checkbox.checked = saveData.settings[setting]
        checkbox.setAttribute('checked', checkbox.checked) //idk either //edit after two years; i actually do know now but im too lazy to fix it, most of this is ripped straight from Goober Shooter 1

        //On click stuff
        checkbox.onclick = () => {
            checkbox.checked = !checkbox.checked
            checkbox.setAttribute('checked', checkbox.checked)
            saveData.settings[setting] = checkbox.checked

            if(checkbox.checked) {
                DeBread.playSound('audio/checkboxCheck.mp3')
            } else {
                DeBread.playSound('audio/checkboxUncheck.mp3')
            }

            updateSettings()
            save()
        }
    })

    doge('prompt').querySelectorAll('select').forEach(dropdown => {
        const setting = dropdown.id.replace('sdd-','')
        dropdown.value = saveData.settings[setting]

        dropdown.onchange = () => {
            saveData.settings[setting] = dropdown.value
        }
        save()
    })
}

function openSettingsMenu(menu) {
    if(doge('settings')) {
        doge('settings').querySelectorAll('.settingsSection').forEach(section => {
            section.style.display = 'none'
        })

        doge(`settingsSection-${menu}`).style.display = 'unset'
    }
}

function updateSettings() {
    if(saveData.settings.presentationMode) {
        powerItems[0].blunt.name = 'Lollipop'
        characters.jake.desc = 'Stupid dawg'
        weaponPresets.piss.name = 'Super soaker'
        weaponPresets.piss.desc = ''
        characters.skywalkr.desc = 'This game is making me mad'
    } else {
        powerItems[0].blunt.name = 'Blunt'
        characters.jake.des = 'Good morning wag wag'
        weaponPresets.piss.name = 'Piss'
        weaponPresets.piss.desc = 'PISSES EVERYWHERE.'
        characters.skywalkr.desc = 'This game is pissing me off'
    }

    if(saveData.settings.debug) {
        doge('gameDebug').style.display = 'unset'
        doge('gameStatsContainer').style.display = 'flex'
        doge('performanceDebug').style.display = 'unset'
    } else {
        doge('gameDebug').style.display = 'none'
        doge('gameStatsContainer').style.display = 'none'
        doge('performanceDebug').style.display = 'none'
    }

    if(saveData.settings.weaponEasing) {
        doge('weapon').style.transition = 'left linear 100ms, top linear 100ms, scale ease-in-out 500ms'
        doge('meleeHitbox').style.transition = 'left linear 100ms, top linear 100ms, scale ease-in-out 500ms'
    } else {
        doge('weapon').style.transition = 'scale ease-in-out 500ms'
        doge('meleeHitbox').style.transition = 'scale ease-in-out 500ms'
    }

    if(saveData.settings.showGameOverflow) {
        doge('area').style.overflow = 'visible'
    } else {
        doge('area').style.overflow = 'hidden'
    }

    if(saveData.settings.skunkMode) {
        saveData.keybinds.melee = ' '
    } else {
        saveData.keybinds.melee = 'f'
    }
} updateSettings()