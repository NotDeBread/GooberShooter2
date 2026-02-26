let gameStartTimeout
gameStartTimeout = setTimeout(() => {
    doge('gameStartScreen').querySelectorAll('.gameStartScreenText').forEach(div => {
        div.style.opacity = '1'
        applyFlowText(div, 0.75)
    })
    doge('gameStartScreen').querySelector('img').style.opacity = '1'
    
    gameStartTimeout = setTimeout(() => {
        doge('gameStartScreen').querySelectorAll('.gameStartScreenText').forEach(text => {
            text.querySelectorAll('div').forEach(char => {
                char.style.animation += `, scaleOut 0.50s ease-in-out 0ms 1 forwards`
            })
        })
        doge('gameStartScreen').querySelector('img').style.opacity = '0'
    
        gameStartTimeout = setTimeout(() => {
            doge('gameStartScreen').style.opacity = 0
            doge('gameStartScreen').style.pointerEvents = 'none'
    
            openMenu('main')


            if(navigator.userAgent.includes('Firefox') && saveData.firstLogin) {
                openPrompt('You\'re running Firefox','Goober Shooter 2 runs on a tick-based system using the setInterval function. On Firefox browsers this function does not have drift correction, so the game may run slower then expected.',[{text: 'I understand',onclick: closePrompt}])
            }
        }, 1000);
    }, 2500);
}, 1000);

doge('gameStartScreen').onclick = () => {
    doge('gameStartScreen').remove()
    clearTimeout(gameStartTimeout)
    openMenu('game')
    startGame()

    
    if(navigator.userAgent.includes('Firefox') && saveData.firstLogin) {
        openPrompt('You\'re running Firefox','Goober Shooter 2 runs on a tick-based system using the setInterval function. On Firefox browsers this function does not have drift correction, so the game may run slower then expected.',[{text: 'I understand',onclick: closePrompt}])
    }
}

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

let currentMenu = 'main'
function openMenu(menu) {
    doge(`menu-${currentMenu}`).style.display = 'none'
    doge(`menu-${menu}`).style.display = 'flex'

    currentMenu = menu

    if(menu === 'main') {
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
            for(let i = 0; i < 5; i++) {createMenuCharacter()}
        }
    } else {
        doge('menu-main').querySelectorAll('.menuCharacter').forEach(char => {char.remove()})
    }

    if(menu === 'gameSettings') {
        renderChallenges()
    }

    if(menu === 'characterSelect') renderCharacterSelect()
}

function renderCharacterSelect() {
    function updateSelectedCharacter(character) {
        doge('selectedCharacterName').innerText = characters[saveData.selectedCharacter].name
        doge('selectedCharacterDesc').innerText = characters[saveData.selectedCharacter].desc
        doge('selectedCharacterImg').src = `graphics/characters/${saveData.selectedCharacter}Portrait.png`

        doge('selectedCharacterTags').innerHTML = ''

        const tag2 = document.createElement('div')
        tag2.classList.add('selectedCharacterTag')
        tag2.innerText = characters[saveData.selectedCharacter].tag
        tag2.style.backgroundColor = characters[saveData.selectedCharacter].tagCol
        doge('selectedCharacterTags').append(tag2)

        for(const key in characters[saveData.selectedCharacter].tagList) {
            const tag = document.createElement('div')
            tag.classList.add('selectedCharacterTag')
            tag.innerHTML = characters[saveData.selectedCharacter].tagList[key].text
            tag.style.background = characters[saveData.selectedCharacter].tagList[key].col

            doge('selectedCharacterTags').append(tag)
        }

        const tag = document.createElement('div')
        tag.classList.add('selectedCharacterTag')
        tag.innerText = `${characters[saveData.selectedCharacter].taunts ?? '???'} taunts`
        doge('selectedCharacterTags').append(tag)
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

function toggleCharacterCustomization() {

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
            tooltip([buttonRect.left + button.offsetWidth / 2, buttonRect.top + button.offsetHeight + 12], playerCosmetics[cosmetic].name, 'COSMETIC', playerCosmetics[cosmetic].desc)
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
            tooltip([buttonRect.left + button.offsetWidth / 2, buttonRect.top + button.offsetHeight + 12], playerSkins[skin].name, 'SKIN', 'desc')
        }

        button.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }

        button.onclick = () => {
            saveData.selectedSkin = skin - 1
            updateCharacterCustomizationCharacter()
        }
    }

    doge('ccRangeXOffset').onchange = updateRanges
    doge('ccRangeXOffset').onmousemove = updateRanges
    doge('ccRangeYOffset').onchange = updateRanges
    doge('ccRangeYOffset').onmousemove = updateRanges
    doge('ccRangeRot').onchange = updateRanges
    doge('ccRangeRot').onmousemove = updateRanges
    
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

function selectGamemode(gm) {
    for(let i = 0; i <= 3; i++) {
        if(i !== gm) {
            doge(`gameSettingsGM${i}`).style.opacity = '0.25'
        } else {
            doge(`gameSettingsGM${i}`).style.opacity = '1'
        }
    }
    saveData.gameSettings.gamemode = gm
}

function renderChallenges() {
    doge('gameSettingsChallenges').innerHTML = ''

    for(const key in challenges) {
        const button = document.createElement('div')
        button.innerHTML = `<img src="graphics/challenges/${key}.png">`
        button.classList.add('gameSettingsChallenge')

        doge('gameSettingsChallenges').append(button)

        button.onmouseenter = () => {
            const buttonRect = button.getBoundingClientRect()
            tooltip([buttonRect.left + button.offsetWidth / 2, buttonRect.top + button.offsetHeight + 12], challenges[key].name, 'CHALLENGE', challenges[key].desc, undefined, '#661b2f')
        }

        button.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }

        button.onclick = () => {
            saveData.selectedChallenge = key
        }
    }
}

const creditsHTML = `
    <div style="display: flex; align-items: center; flex-direction: column;">
        <img src="graphics/logo.png" width=175>
        <span>By <a href="https://debread.space/" target="_blank">DeBread</a></span>
    </div>
    <span>Idea help: <a href="https://yeen.town/@Chalkllate" target="blank">Jake</a>, <a>Redjive2</a></span><br>
    <span>Texture help: <a>Plonk</a>(Ashton Character)</span>
`