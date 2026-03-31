let gameStartTimeout
function startTitle() {
    tracks.menu.play()
    tracks.menu.volume = 0
    tracks.menu.preservesPitch = false
    tracks.menu.playbackRate = 0.8
    tracks.menu.loop = true

    const divs = doge('gameStartScreen').querySelectorAll('div')

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
                doge('gameStartScreen').querySelector('img').style.display = 'none'
                divs[0].innerText = 'With music by'
                applyFlowText(divs[0], 0.75)

                divs[1].innerText = 'BBDawgs'
                applyFlowText(divs[1], 0.75)

                gameStartTimeout = setTimeout(() => {
                    doge('gameStartScreen').querySelectorAll('.gameStartScreenText').forEach(text => {
                        text.querySelectorAll('div').forEach(char => {
                            char.style.animation += `, scaleOut 0.50s ease-in-out 0ms 1 forwards`
                        })
                    })
                    
                    gameStartTimeout = setTimeout(() => {                        
                        gameStartTimeout = setTimeout(() => {
                            doge('gameStartScreen').style.opacity = 0
                            doge('gameStartScreen').style.pointerEvents = 'none'
                    
                            openMenu('main')
                
                
                            if(navigator.userAgent.includes('Firefox') && saveData.firstLogin) {
                                openPrompt('You\'re running Firefox','Goober Shooter 2 runs on a tick-based system using the setInterval function. On Firefox browsers this function does not have drift correction, so the game may run slower then expected.',[{text: 'I understand',onclick: closePrompt}])
                            }
                        }, 1000);
                    }, 500);
                }, 2500);   
            }, 1000);
        }, 2500);
    }, 1000); //Peak engineering
}

doge('gameStartScreen').onclick = () => {
    if(!saveData.firstLogin) {
        doge('gameStartScreen').remove()
        clearTimeout(gameStartTimeout)
        openMenu('main')
    
        tracks.menu.currentTime = 10.2

        //Auto start game
        // saveData.gameSettings.gamemode = 2
        // openMenu('game')
        // startGame()
    }

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
        openGameSettingsMenu(currentGameSettingsMenu)
    }

    if(menu === 'characterSelect') renderCharacterSelect()
}

function renderCharacterSelect() {
    function updateSelectedCharacter() {
        doge('selectedCharacterName').innerText = characters[saveData.selectedCharacter].name
        doge('selectedCharacterDesc').innerText = characters[saveData.selectedCharacter].desc
        doge('selectedCharacterImg').src = `graphics/characters/${saveData.selectedCharacter}Portrait.png`

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

        const tag = document.createElement('div')
        tag.classList.add('selectedCharacterTag')
        tag.innerHTML = `${characters[saveData.selectedCharacter].taunts ?? '???'} taunts`
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
            if(!saveData.settings.presentationMode) {
                saveData.selectedCharacter = box.character
                saveData.selectedSkin = -1
    
                doge('characterSelectContainer').querySelectorAll('.characterSelectCharacterBox').forEach(button => {
                    button.style.outline = ''
                })
    
                box.style.outline = '2px solid white'
    
                updateSelectedCharacter(box.character)
                updateCharacterCustomization()
            } else {
                createNotification('Characters Unavailable!', 'Character changing is not allowed in presentation mode!')
            }
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
            tooltip([buttonRect.left + button.offsetWidth / 2, buttonRect.top + button.offsetHeight + 12], playerSkins[skin].name, [{text: 'SKIN', col: '#973a3a'}], 'desc')
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

const gamemodeNames = [
    'Survival',
    'Sprint',
    'Sandbox',
    'Tutorial'
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
    for(let i = 0; i <= 3; i++) {
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
    <span>Texture help: <a href="https://plinkel.neocities.org/">Plonk</a>(Ashton Character)</span><br>
    <span>Background Shader: From <a href="https://www.playbalatro.com/" target="_blank">Balatro</a>, rewritten by <a href="https://xemantic.github.io/shader-web-background/" target="_blank">xemantic</a></span><br>
    <span>Additional SFX: </span><a href="https://www.youtube.com/@redjive2/" target="_blank">Redjive2</a>
`

const settingsHTML = `
    <div id="settings">
        <div style="display: flex; gap: 5px; padding-bottom: 5px; border-bottom: 1px solid grey; height: 24px;">
            <button onclick="openSettingsMenu('general')">General</button>
            <button onclick="openSettingsMenu('audio')">Audio</button>
            <button onclick="openSettingsMenu('display')">Display</button>
        </div>
        <div class="settingsSection" id="settingsSection-general">
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-particles"></div>
                <div class="settingsCheckboxInfo">
                    <span>Particles</span>
                    <span>Enhances graphics using particles.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-showGameQuitWarning"></div>
                <div class="settingsCheckboxInfo">
                    <span>Show game quit/restart waning</span>
                    <span>Displays a popup before allowing you to quit/restart the game.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-showPowerItemWarning"></div>
                <div class="settingsCheckboxInfo">
                    <span>Show Power Item replacement waning</span>
                    <span>Displays a popup before allowing you to replace your current Power Item.</span>
                </div>
            </div>
            <div class="settingsCheckboxContainer">
                <div class="genericCheckbox" id="scb-presentationMode"></div>
                <div class="settingsCheckboxInfo">
                    <span>Presentation Mode</span>
                    <span>Enables local scoring and removes inappropriate language.</span>
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
        <div class="settingsSection" id="settingsSection-audio">
            <span>Audio settings 🔥</span>
        </div>
        <div class="settingsSection" id="settingsSection-display">
            <span>Display settings 🔥</span>
        </div>
    </div>
`

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
        }
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
        powerItems[0].blunt.name = 'Lolipop'
        characters.jake.desc = 'Stupid dawg'
        weaponPresets.piss.name = 'Super soaker'
        weaponPresets.piss.desc = ''
        characters.skywalkr.desc = 'This game is making me mad'
    } else {
        powerItems[0].blunt.name = 'Blunt'
        characters.jake.des = 'Good morning wag wag'
        weaponPresets.piss.name = 'Piss'
        weaponPresets.piss.desc = 'piss description'
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
} updateSettings()