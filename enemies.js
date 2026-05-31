const enemies = {
    guy: {
        name: 'Guy',
        desc: 'A small enemy that does little contact damage.',
        color: [255,100,100],
        size: 40,
        health: 25,
        speed: 2,
        meleeDamage: 5,

        credits: 1,
    },
    scout: {
        name: 'Scout',
        desc: 'A medium-sized enemy that does contact damage.',
        color: [255,82,148],
        size: 50,
        health: 50,
        speed: 3,
        meleeDamage: 10,

        credits: 2,
    },
    goon: {
        desc: 'A slow moving enemy that shoots medium-damage projectiles.',
        name: 'Goon',
        color: [255,243,82],
        size: 50,
        health: 75,
        speed: 1,
        meleeDamage: 3,

        projectile: {
            cooldown: 75,
            size: 10,
            damage: 20,
            speed: 5,
        },

        credits: 3,
    },
    machinist: {
        desc: 'A slow moving enemy that radpidly shoots low-damage projectiles.',
        name: 'Machinist',
        color: [255,82,238],
        size: 50,
        health: 75,
        speed: 1,
        meleeDamage: 3,

        projectile: {
            cooldown: 20,
            size: 7,
            damage: 5,
            speed: 5,
        },

        credits: 5,
    },
    brute: {
        name: 'Brute',
        color: [200,200,200],
        size: 60,
        health: 125,
        speed: 0.5,
        meleeDamage: 25,

        projectile: {
            cooldown: 100,
            size: 15,
            damage: 50,
            speed: 2,
        },

        credits: 8,
    },
    mutant: {
        name: 'Mutant',
        color: [125,255,125],
        size: 35,
        health: 60,
        speed: 0.000001,
        meleeDamage: 50,

        poisonDamage: 5,

        poisonField: {
            size: 100,
            damage: 10,
            rate: 10,
        },

        credits: 5,
    },
    pyro: {
        name: 'Pyro',
        color: [86,49,34],
        size: 50,
        health: 175,
        speed: 0.25,
        meleeDamage: 50,

        projectile: {
            cooldown: 100,
            size: 15,
            damage: 20,
            speed: 2,

            explosionSize: 100,
        },

        credits: 10,
    },
    monstrosity: {
        name: 'Monstrosity',
        color: [51,116,51],
        size: 50,
        health: 100,
        speed: 0.5,
        meleeDamage: 50,

        poisonDamage: 5,

        poisonField: {
            size: 125,
            damage: 25,
            rate: 10,
        },

        projectile: {
            cooldown: 75,
            size: 15,
            damage: 50,
            speed: 3,

            // poisonField: {
            //     size: 75,
            //     damage: 10,
            //     rate: 10,
            // }
        },

        credits: 20,
    },
    bomber: {
        name: 'Bomber',
        desc: 'Very quick enemy that explodes on impact.',
        color: [255,0,0],
        size: 40,
        health: 10,
        speed: 6,
        credits: 10,

        explosive: {
            size: 100,
            damage: 50,
            impact: true,
        }
    },
    explosive: {
        name: 'Explosive',
        desc: 'Creates an explosion when damaged.',
        color: [100,0,0],
        size: 40,
        health: 1,
        speed: 0,
        credits: 10,
        poor: true,

        explosive: {
            size: 150,
            damage: 75,
            impact: false,
        }
    },
    sprinter: {
        name: 'Sprinter',
        color: [54,78,111],
        size: 35,
        health: 30,
        speed: 6,
        credits: 10,
        meleeDamage: 5,
    },
    slime: {
        name: 'Slime',
        desc: 'A slow moving enemy that splits into smaller, less power versions of itself when killed.',
        color: [25,255,25],
        size: 50,
        heath: 35,
        speed: 2,
        health: 125,
        credits: 15,
        meleeDamage: 15,

        creep: {
            damage: 5,
            ticks: 20,
            tickRate: 10,
        },

        split: {
            times: 2,
            count: 2,
        }
    },
    cocoon: {
        name: 'Cocoon',
        desc: 'A stationary enemy that loses heath over time. Once killed, it spawns 5 spiders.',
        color: [194,192,172],
        size: 50,
        health: 200,
        speed: 0.0000001,
        credits: 20,
        regen: -0.5,

        split: {
            times: 1,
            count: 5,

            into: 'spider'
        }
    },
    spider: {
        name: 'Spider',
        desc: 'A small, quick-moving enemy that does little melee damage.',
        color: [64,68,72],
        size: 20,
        health: 20,
        speed: 5,
        credits: Infinity,

        coinOverride: 2,
        meleeDamage: 10,
    },
    leech: {
        name: 'Leech',
        desc: 'A small, immobile enemy that deals constant damage to the player while alive. Creates an implosion one killed.',
        color: [37,18,37],
        size: 25,
        health: 25,
        speed: 0,
        mounted: true,
        credits: 20,

        beamWidth: 15,

        onDeath: enemy => {
            createExplosion([...enemy.data.centerPos],100,0,-50,false,[[131,104],[43,29],[65,87]])
        }
    },
    idol: {
        name: 'Idol',
        desc: 'A small, immobile enemy that prevents the player from healing while alive. Creates an explosion once killed.',
        color: [183,244,255],
        size: 25,
        health: 25,
        speed: 0,
        mounted: true,
        credits: 20,

        beamWidth: 15,

        onDeath: enemy => {
            createExplosion([...enemy.data.centerPos],100,0,50,false,[[161,119],[255,205],[255,255]])
        }
    },
    replicator: {
        name: 'Replicator',
        desc: 'Slow-moving enemy that fires splitting projectiles.',
        color: [184, 110, 160],
        size: 50,
        health: 150,
        speed: 1,
        credits: 15,

        projectile: {
            cooldown: 120,
            size: 10,
            damage: 25,
            speed: 7,

            splits: 1,
            split: 3,
            bounces: 1,
            range: 25,
            speedDiv: 1.05,
        },
    },
    sorcerer: {
        name: 'Sorcerer',
        desc: 'Slow-moving enemy that fires seeking projectiles.',
        color: [144, 102, 179],
        size: 50,
        health: 150,
        speed: 1,
        credits: 15,

        projectile: {
            cooldown: 120,
            size: 10,
            damage: 25,
            speed: 5,

            magnetStrength: 1,
            range: 200,
        },
    },
    titan: {
        name: 'Titan',
        desc: 'A large, slow-moving enemy that fires huge projectiles that spawn poison fields.',
        color: [88,38,98],
        size: 75,
        health: 750,
        speed: 0.5,
        credits: 25,

        projectile: {
            cooldown: 120,
            size: 25,
            damage: 75,
            speed: 2,

            poisonField: {
                size: 50,
                damage: 10,
                rate: 10,
            }
        },
    },
    pyromaniac: {
        name: 'Pyromaniac',
        desc: 'A large, slow-moving enemy that fires large, explosive, splitting projectiles.',
        color: [135, 78, 59],
        size: 75,
        health: 750,
        speed: 0.5,
        credits: 30,
        explosionImmunity: true,

        projectile: {
            cooldown: 120,
            size: 25,
            damage: 75,
            speed: 15,
            range: 50,
            explosionSize: 100,
            bounces: 1,

            splits: 1,
            split: 3,
            speedDiv: 1.1,
        },
    },
    turret: {
        name: 'Turret',
        desc: 'A small, stationary enemy that rapidly fires low damage projectiles.',
        color: [79, 87, 110],
        size: 40,
        health: 250,
        speed: 0,
        credits: 20,
        mounted: true,
        
        projectile: {
            cooldown: 10,
            size: 10,
            damage: 10,
            speed: 5,
        },

        onDeath: enemy => {
            createExplosion([...enemy.data.centerPos],100,50,50,false,[[161,119],[255,205],[255,255]])
        }
    },
    nucliest: {
        name: 'Nucliest',
        desc: 'A stationary enemy that fires radioactive bouncy ammo.',
        color: [151, 240, 91],
        size: 50,
        health: 500,
        speed: 0,
        credits: 40,
        mounted: true,
        regen: -0.5,
        
        projectile: {
            cooldown: 20,
            size: 10,
            damage: 10,
            speed: 6,
            radiationSize: 50,
            range: 100,
            bounces: 1,

            poisonFieldChance: 75,
            poisonFieldSize: 50,
            poisonFieldDmgPercent: 50,
            poisonFieldTicks: 10,
            poisonFieldColor: [151,240,91]
        },

        poisonField: {
            size: 50,
            damage: 25,
            rate: 10,
        },

        onDeath: enemy => {
            createPoisonField([...enemy.data.centerPos],100,10,10,10,[player.elem],[151,240,91])
        }
    },
    erraticist: {
        name: 'Erraticist',
        desc: 'A fast moving enemy that fires splitting projectiles.',
        color: [255, 43, 153],
        size: 50,
        health: 500,
        speed: 2,
        credits: 50,
        
        projectile: {
            cooldown: 75,
            size: 10,
            damage: 10,
            speed: 6,
            range: 50,
            bounces: 1,
            speedDiv: 1.05,

            split: 3,
            splits: 2,
        },
    },
    dummy: {
        name: 'Dummy',
        desc: '<em style="color: grey;">Sandbox only</em><br>Has infinite health and displays total damage taken.',
        color: [255,218,169],
        credits: Infinity,
        size: 50,
        health: Infinity,
        speed: 0.0000000001,
        poor: true,
    },
    weakDummy: {
        name: 'Weak Dummy',
        desc: '<em style="color: grey;">Sandbox only</em><br>Has 10 health and displays total damage taken.',
        color: [146,94,78],
        credits: Infinity,
        size: 50,
        health: 10,
        speed: 0.0000000001,
        poor: true,
    },
    mountedDummy: {
        name: 'Mounted Dummy',
        desc: '<em style="color: grey;">Sandbox only</em><br>Same as the dummy, but does not have any collision.',
        color: [160,129,88],
        credits: Infinity,
        size: 50,
        health: Infinity,
        speed: 0,
        mounted: true,
        poor: true,
    },
    movingDummy: {
        name: 'Moving dummy',
        desc: '<em style="color: grey;">Sandbox only</em><br>Has infinite health and moves.',
        color: [211,187,156],
        credits: Infinity,
        size: 50,
        health: Infinity,
        speed: 2,
        poor: true,
    },
    nerfSentry: {
        name: 'Nerf Sentry',
        desc: '<em style="color: grey;">Sandbox only</em><br>Same as the dummy, but fires projectiles that doesn\'t deal any damage.',
        color: [160,129,88],
        credits: Infinity,
        size: 50,
        health: Infinity,
        speed: 0,
        poor: true,

        projectile: {
            cooldown: 100,
            size: 10,
            damage: 0,
            speed: 2,
        },
    },
    mountedExplosive: {
        name: 'Mounted Explosive',
        desc: '<em style="color: grey;">Sandbox only</em><br>Creates an explosion when damaged.',
        color: [75,0,0],
        size: 40,
        health: 1,
        speed: 0,
        mounted: true,
        credits: Infinity,
        poor: true,

        explosive: {
            size: 150,
            damage: 75,
            impact: false,
        }
    },
    debreadCube: {
        name: 'DeBread Cube',
        desc: '<em style="color: grey;">Sandbox only</em><br>Run',
        color: [244, 175, 84],
        size: 75,
        health: 7777,
        speed: 3,
        credits: Infinity,
        poor: true,
        useBossBar: true,

        projectile: {
            cooldown: 25,
            size: 15,
            damage: 50,
            speed: 10,

            magnetStrength: 1,
            splits: 2,
            split: 5,

            explosionSize: 100,

            poisonField: {
                size: 50,
                damage: 10,
                rate: 10,
            }
        },

        poisonField: {
            size: 125,
            damage: 25,
            rate: 10,
        },
    },
}

const voicelines = {
    Dottr: {
        ambient: 11,
        hurt: 8,
        death: 2,
    }
}

const enemyBase = document.createElement('div')
enemyBase.classList.add('entity')
enemyBase.classList.add('enemy')
enemyBase.innerHTML = `
    <div class="enemyHealthBarContainer">
        <div class="enemyLevel">1</div>
        <div class="enemyHealthBar">
            <div class="innerEnemyHealthBar"></div>
        </div>
    </div>
    <img id="enemyFire" style="scale: 2; translate: 0px -10px; opacity: 0; filter: blur(1px) drop-shadow(0px 0px 5px red); position: absolute; pointer-events: none;">
    <span style="position: absolute; color: white; -webkit-text-stroke: 1px black; font-weight: 900; text-align: center;"></span>
`
addStyles(enemyBase, {
    opacity: 0.25,
})

const enemyPoisonFieldBase = document.createElement('div')
addStyles(enemyPoisonFieldBase, {
    borderRadius: '50%',
    outline: '2px solid rgb(0,255,0,0.25)',
    aspectRatio: '1 / 1'
})

function spawnEnemy(pos, data, levelBase, spawnTime = 30, extraData = {}) {
    const enemy = enemyBase.cloneNode(true)
    const healthBar = enemy.querySelector('.innerEnemyHealthBar')
    let level = Math.max(levelBase + player.stats.enemy.levelIncrease, 0)
    enemy.querySelector('.enemyLevel').innerText = level

    let sizeMult = [1,1]
    if(saveData.selectedChallenge === 'abstract') {
        sizeMult = [Math.pow(10,DeBread.randomNum(-1,1,5)),Math.pow(10,DeBread.randomNum(-1,1,5))]
    }

    enemy.data = {
        alive: true,
        active: false,

        maxHealth: extraData.health ?? data.health * (1 + level / 2),
        health: extraData.health ?? data.health * (1 + level / 2),
        lastHitDate: e.gameUpdates + 30,
        spawnDate: e.gameUpdates,
        
        pos: [...pos],
        centerPos: [
            pos[0]+(data.size * sizeMult[0])/2,
            pos[1]+(data.size * sizeMult[1])/2
        ],
        size: extraData.size ?? data.size,

        dirVels: [],
        speed: data.speed ?? 0,
        speedMult: 1,
        level: level,
        timesSplit: extraData.timesSplit ?? 0,
        isBleeding: false,
        onFire: false,
        target: player,
        friendly: false,
        data: data,
        damageTaken: 0,
        explosionImmunity: data.explosionImmunity ?? false,
        isRadiated: false,

        elem: enemy,

        lastSfxDate: 0,
        ticks: 0,
    }
    const enemyData = enemy.data

    //Styles
    addStyles(enemy, {
        position: 'absolute',
        left: pos[0]+'px',
        top: pos[1]+'px',
        width: (extraData.size ?? data.size) * sizeMult[0] + 'px',
        height: (extraData.size ?? data.size) * sizeMult[1] + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 0px 0px white',
        borderRadius: '5px',
        zIndex: '6',
        backgroundColor: `rgb(${data.color})`,
        boxShadow: 'inset 0px 0px 0px 2px transparent',
        animation: 'enemyWait 1s ease-in-out infinite forwards, enemyIn 500ms cubic-bezier(0,1,.5,1) 1 forwards',
        transition: `left linear ${e.gameUpdateInterval}ms, top linear ${e.gameUpdateInterval}ms, background-color ease-in-out 1s`
    })

    if(!saveData.settings.enemyEasing) {
        enemy.style.transition = 'background-color ease-in-out 1s'
    }

    //Change fire texture for different enemy sizes
    if(data.size > 25) {
        enemy.querySelector('#enemyFire').src = 'graphics/fireLarge.gif'
    } else {
        enemy.querySelector('#enemyFire').src = 'graphics/fireSmall.gif'
    }

    //Bossbar
    if(data.useBossBar) {
        enemyData.bossBar = document.createElement('div')
        enemyData.bossBar.classList.add('gameBossbar')
        enemyData.bossBar.innerHTML = `
            <span>${data.name.toUpperCase()}</span>
            <div style="width: 0%; background-color: rgb(${data.color});"></div>
        `
        doge('gameBossbarContainer').append(enemyData.bossBar)
    }

    if(data.poisonField) {
        const poisonField = enemyPoisonFieldBase.cloneNode()
        addStyles(poisonField, {
            width: data.poisonField.size * 2 + 'px',
            height: data.poisonField.size * 2 + 'px',
            outline: `2px solid rgb(${data.color})`,
            backgroundColor: `rgba(${data.color}, 0.25)`
        })
        enemy.appendChild(poisonField)
    }

    enemy.tick = () => {
        if(!e.gameActive) return
        if(e.gameUpdates - enemyData.spawnDate >= spawnTime && !enemyData.active) {
            enemy.init()
        }

        if(!data.mounted && enemyData.active) {
            elems.enemies.forEach(otherEnemy => {
                const otherEnemyData = otherEnemy.data
                const angle = Math.atan2(otherEnemyData.centerPos[1] - enemyData.centerPos[1], otherEnemyData.centerPos[0] - enemyData.centerPos[0])
                if (isColliding(enemy, otherEnemy) && enemy !== otherEnemy && otherEnemyData.active) {
                    const distance = Math.sqrt(
                        Math.pow(enemyData.pos[0] - otherEnemyData.pos[0],2) + 
                        Math.pow(enemyData.pos[1] - otherEnemyData.pos[1],2)
                    )
                    
                    const overlap = (enemyData.size - distance) / 10
                    enemyData.pos[0] -= Math.cos(angle) * (enemyData.speed * player.stats.enemy.speedMult * enemyData.speedMult + overlap)
                    enemyData.pos[1] -= Math.sin(angle) * (enemyData.speed * player.stats.enemy.speedMult * enemyData.speedMult + overlap)                    
                }
            })
    
            if(enemyData.target && isColliding(enemy, enemyData.target.elem)) {
                const angle = Math.atan2(enemyData.target.centerPos[1] - enemyData.centerPos[1], enemyData.target.centerPos[0] - enemyData.centerPos[0])
                const distance = Math.sqrt(
                    Math.pow(enemyData.pos[0] - enemyData.target.pos[0],2) + 
                    Math.pow(enemyData.pos[1] - enemyData.target.pos[1],2)
                )
    
                const overlap = (enemyData.size - distance) / 10
                enemyData.pos[0] -= Math.cos(angle) * (enemyData.speed * player.stats.enemy.speedMult * enemyData.speedMult + overlap)
                enemyData.pos[1] -= Math.sin(angle) * (enemyData.speed * player.stats.enemy.speedMult * enemyData.speedMult + overlap)
                
                if(data.meleeDamage && e.gameUpdates - enemyData.lastHitDate >= 25) {
                    enemyData.target.damage(data.meleeDamage * (1 + level / 2))
                    enemyData.lastHitDate = e.gameUpdates

                    if(enemyData.explosive) {
                        if(enemyData.explosive.impact) {
                            enemy.data.kill()
                        }
                    }
                }
            } else if(enemyData.target) {
                const angle = Math.atan2(enemyData.target.centerPos[1] - enemyData.centerPos[1], enemyData.target.centerPos[0] - enemyData.centerPos[0])
                enemyData.pos[0] += Math.cos(angle) * enemyData.speed * player.stats.enemy.speedMult * enemyData.speedMult
                enemyData.pos[1] += Math.sin(angle) * enemyData.speed * player.stats.enemy.speedMult * enemyData.speedMult
            }

            for(let i = 0; i < enemyData.dirVels.length; i++) {
                const dirVel = enemyData.dirVels[i]
                enemyData.pos[0] += Math.cos(dirVel.angle) * dirVel.speed
                enemyData.pos[1] += Math.sin(dirVel.angle) * dirVel.speed
    
                dirVel.speed /= dirVel.div
                if(Math.abs(dirVel.speed) <= 0.1) {
                    enemyData.dirVels.splice(i, 1)
                }
            }
        }

        if(enemyData.pos[0] < 0) enemyData.pos[0] = 0
        if(enemyData.pos[1] < 0) enemyData.pos[1] = 0
        if(enemyData.pos[0] > doge('area').offsetWidth - enemyData.size) enemyData.pos[0] = doge('area').offsetWidth - enemyData.size
        if(enemyData.pos[1] > doge('area').offsetHeight - enemyData.size) enemyData.pos[1] = doge('area').offsetHeight - enemyData.size

        //Poison fields
        if(data.poisonField && enemyData.active) {
            const dx = enemyData.centerPos[0] - player.centerPos[0]
            const dy = enemyData.centerPos[1] - player.centerPos[1]
            const distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))

            if(distance <= data.poisonField.size && e.gameUpdates % DeBread.round(data.poisonField.rate / player.stats.enemy.speedMult / enemyData.speedMult) === 0) {
                player.damage(data.poisonField.damage)
            }
        }

        //Fire projectiles
        if(
            data.projectile && 
            enemyData.active &&
            e.gameUpdates - enemyData.lastShotDate > data.projectile.cooldown / player.stats.enemy.speedMult / enemyData.speedMult
        ) {
            enemy.shoot()
        }

        //Regen
        if(data.regen) {
            enemy.data.damage(-data.regen, true)
        }

        //Explosive stuff
        if(data.explosive && enemyData.active) {
            if(data.speed > 1) {
                createParticles(
                    [...enemyData.centerPos],
                    2,
                    10,
                    [25,50],
                    250,
                    'ease-out',
                    {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`}
                )
            } 

            if(data.explosive.impact) {
                if(isColliding(enemyData.target.elem, enemy)) enemy.data.kill()
            }
        }

        //Creep
        if(enemyData.active && data.creep && e.gameUpdates % 10 === 0) {
            createPoisonField([...enemy.data.centerPos],enemy.data.size,data.creep.damage,data.creep.ticks,data.creep.tickRate, [player.elem], data.color, true)
        }

        //Fire
        doge('area').querySelectorAll('.fire').forEach(fire => {
            if(isColliding(enemy, fire) && enemy.data.active) {
                if(!enemyData.onFire) {
                    enemyData.onFire = true
                }

                if(e.gameUpdates % 15 === 0) {
                    enemyData.damage(20)
                }
            }
        })

        if(enemy.data.onFire) {
            createParticles(
                [...enemy.data.centerPos],
                2,
                10,
                [25,50],
                250,
                'ease-out',
                {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`}
            )

            enemy.data.damage(1, true)

            enemy.querySelector('#enemyFire').style.opacity = '0.75'
        }

        addStyles(enemy, {
            left: enemyData.pos[0]+'px',
            top: enemyData.pos[1]+'px'
        })
        enemyData.centerPos = [enemyData.pos[0]+enemy.offsetWidth/2,enemyData.pos[1]+enemy.offsetHeight/2]

        if(e.gameUpdates - enemyData.lastSfxDate > 200 && DeBread.randomNum(1,100) === 1) {
            if(saveData.settings.enemyVoiceLines !== 'none') {
                enemyData.lastSfxDate = e.gameUpdates
                const volumeSpeedMult = 50 / enemyData.size
                DeBread.playSound(
                    `audio/voicelines/${saveData.settings.enemyVoiceLines}/ambient${DeBread.randomNum(0,voicelines[saveData.settings.enemyVoiceLines].ambient)}.mp3`,
                    0.1,
                    volumeSpeedMult,
                    false
                )
            }   
        }

        if(enemyData.isBleeding && enemyData.ticks % 5 === 0) {
            createParticle(
                0,
                [DeBread.randomNum(enemyData.pos[0], enemyData.pos[0] + enemyData.size),DeBread.randomNum(enemyData.pos[1], enemyData.pos[1] + enemyData.size)],
                1,
                0.95,
                Math.PI / 2,
                5,
                1.1,
                25,
                {
                    color: 'red'
                }
            )
        }

        enemyData.ticks++
    }

    if(data.projectile) {
        enemyData.hasProjectiles = true
        enemyData.lastShotDate = e.gameUpdates + spawnTime
        enemyData.shotCooldown = data.projectile.cooldown
        const projectileBase = document.createElement('div')
        addStyles(projectileBase, {
            position: 'absolute',
            translate: '-50% -50%',
            backgroundColor: 'rgb(255,100,100)',
            outline: '2px solid black',
            borderRadius: '50%',
            aspectRatio: '1 / 1',
            zIndex: '7',
            animation: 'projectileIn 250ms ease-out 1 forwards'
        })

        enemy.shoot = () => {
            if(player.alive && enemyData.target && enemyData.active) {
                const projPos = [enemyData.pos[0] + (enemyData.size * sizeMult[0])/2, enemyData.pos[1] + (enemyData.size * sizeMult[1])/2]
                const projAngle = Math.atan2(
                    projPos[1] - DeBread.randomNum(enemyData.target.pos[1], enemyData.target.pos[1] + enemyData.target.elem.offsetHeight),
                    projPos[0] - DeBread.randomNum(enemyData.target.pos[0], enemyData.target.pos[0] + enemyData.target.elem.offsetWidth),
                )

                const projData = {...data.projectile}
                projData.damage *= (1 + level / 2)
                projData.speed *= player.stats.enemy.speedMult
                projData.speed *= enemyData.speedMult

                createProjectile(1, [...projPos], projAngle, projData, [player.elem], enemy.data)
                enemyData.dirVels.push({angle: projAngle, speed: data.projectile.recoil ?? 0, div: 1.25})

                enemyData.lastShotDate = e.gameUpdates

                DeBread.playSound(`audio/enemyShoot${DeBread.randomNum(0,2)}.mp3`,0.5,DeBread.randomNum(0.95,1.05,10),false)
            }
        }
    }

    enemy.init = () => {
        enemyData.active = true
        enemy.style.animation = 'enemyInit 500ms ease-out 1 forwards'
        enemy.style.opacity = '1'

        enemy.style.boxShadow = '0px 0px 0px 10px transparent'

        healthBar.style.width = '100%'

        if(saveData.selectedChallenge === 'hidden') {
            enemy.style.backgroundColor = 'transparent'
        }

        if(data.useBossBar) {
            enemyData.bossBar.querySelector('div').style.width = enemyData.health / enemyData.maxHealth * 100 + '%'
        }
    }

    enemy.data.damage = (amountBase, silent) => {
        if(enemyData.active) {
            let amount = amountBase
            if(enemyData.isBleeding) {
                amount *= 1.5
            }

            if(enemyData.health < Infinity) {
                enemy.querySelector('.enemyHealthBarContainer').style.opacity = '1'
            }

            enemyData.health -= amount
            enemyData.health = Math.min(enemyData.health, enemyData.maxHealth)

            healthBar.style.width = enemyData.health / enemyData.maxHealth * 100 + '%'

            if(!silent) {
                DeBread.playSound('audio/enemyHit.mp3', 1, DeBread.randomNum(0.9,1.1,5), false)
                
                healthBar.style.animation = 'none'
                enemy.style.animation = 'none'
                setTimeout(() => {
                    healthBar.style.animation = 'healthBarPulse 250ms ease-out 1 forwards'
                    enemy.style.animation = 'enemyHit 250ms ease-out 1 forwards'
                }, e.gameUpdateInterval)
            }
            
            if(enemyData.health <= 0) {enemy.data.kill()}

            enemyData.damageTaken += amount
            player.gameOverStats.damageGiven += amount

            if(enemyData.health === Infinity) {
                enemy.querySelector('span').innerText = formatNumber(DeBread.round(enemyData.damageTaken))
            }

            if(amount > 0) {
                player.comboStrength++

                if(data.useBossBar) {
                    addStyles(enemyData.bossBar.querySelector('div'), {
                        width: enemyData.health / enemyData.maxHealth * 100 + '%',
                        animation: 'none'
                    })
                    requestAnimationFrame(() => {
                        enemyData.bossBar.querySelector('div').style.animation = 'bossbarPulse 250ms ease-out 1 forwards'
                    })
                }

                if(saveData.settings.enemyVoiceLines !== 'none' && DeBread.randomNum(1,7) === 1) {
                    const volumeSpeedMult = 50 / enemyData.size
                    DeBread.playSound(
                        `audio/voicelines/${saveData.settings.enemyVoiceLines}/hurt${DeBread.randomNum(0,voicelines[saveData.settings.enemyVoiceLines].hurt)}.mp3`,
                        0.1,
                        volumeSpeedMult,
                        false
                    )
                }
            }

            return amount
        }  
    }
    
    enemy.data.kill = () => {
        if(enemyData.alive) {
            enemyData.alive = false
            player.gameOverStats.enemiesKilled++

            for(let i = 0; i < 10; i++) {
                createParticle(
                    0,
                    [...enemyData.centerPos],
                    DeBread.randomNum(0,10),
                    1.1,
                    DeBread.randomNum(0,Math.PI*2,10),
                    enemyData.size / 2,
                    1.1,
                    50,
                    {
                        color: `rgb(${data.color})`
                    }
                )
            }

            // createParticles(
            //     [...enemyData.centerPos], 
            //     10, 
            //     enemyData.size / 2, 
            //     [0,100], 
            //     500, 
            //     'ease-out',
            //     {
            //         backgroundColor: `rgb(${data.color})`
            //     }
            // )

            if(data.useBossBar) {
                enemyData.bossBar.remove()
            }

            if(data.onDeath) {
                data.onDeath(enemy)
            }
    
            if(data.split && enemyData.timesSplit < data.split.times) {
                for(let i = 0; i < data.split.count; i++) {
                    if(data.split.into) {
                        spawnEnemy(
                            [
                                DeBread.randomNum(enemyData.pos[0]+1,enemyData.pos[0]-1,10),
                                DeBread.randomNum(enemyData.pos[1]+1,enemyData.pos[1]-1,10)
                            ], 
                            enemies[data.split.into], 
                            enemyData.level, 
                            0, 
                            {}
                        )
                    } else {
                        spawnEnemy(
                            [
                                DeBread.randomNum(enemyData.pos[0]+1,enemyData.pos[0]-1,10),
                                DeBread.randomNum(enemyData.pos[1]+1,enemyData.pos[1]-1,10)
                            ], 
                            data, 
                            enemyData.level, 
                            0,
                            {
                                size: Math.max(enemyData.size / 2, 10), 
                                health: enemyData.maxHealth / 3,
                                timesSplit: enemyData.timesSplit + 1,
                                hideLevel: true,
                            }
                        )
                    }
                }
            }
    
            enemy.remove()
            player.getPower(1)
    
            if(data.explosive) {
                createExplosion(
                    [...enemyData.centerPos],
                    data.explosive.size,
                    data.explosive.damage,
                    25,
                    false
                )
            }
    
            if(doge('area').querySelectorAll('.enemy').length === 0 && ![2,3].includes(saveData.gameSettings.gamemode)) {
                // area.createNotice(`Quick wave clear! - +$${player.wave}`)
                // player.getMoney(player.wave)
                
                if(player.wavesPaused) {
                    setTimeout(() => {
                        spawnPortal()
                        }, 1000);
                } else {
                    spawnWave(player.wave)
                    doge('gameWaveCounter').innerText = player.wave
                    doge('pageTitle').innerText = `Goober Shooter - Wave ${player.wave}`
                    doge('gameWaveShopCounter').innerText = `${4 - player.wave % 5} waves until shop`
                    player.wave++
                    player.lastWaveDate = e.gameUpdates
    
                    if(player.wave % 5 === 0) {
                        player.wavesPaused = true
                    }
                }
            }
    
            if(player.tutorial.stage === 3) {
                player.tutorial.goalValue++
                updateTutorialGoal()
            }

            getCombo()
            getStyle(styles.kill)

            if(saveData.gameSettings.gamemode !== 2) {
                saveData.stats.list.Enemies_Killed++

                const enemiesKilled = saveData.stats.list.Enemies_Killed
                if(enemiesKilled >= 10000) {
                    getAchievement('Paint_the_World_Red')
                } else if(enemiesKilled >= 5000) {
                    getAchievement('Anarchist')
                } if(enemiesKilled >= 1000) {
                    getAchievement('Serial_Killer')
                } else if(enemiesKilled >= 100) {
                    getAchievement('Blood_Thirsty')
                } else if(enemiesKilled >= 25) {
                    getAchievement('Murderer')
                } else if(enemiesKilled >= 1) {
                    getAchievement('First_Blood')
                }
            }

            if(saveData.settings.enemyVoiceLines !== 'none') {
                const volumeSpeedMult = 50 / enemyData.size
                DeBread.playSound(
                    `audio/voicelines/${saveData.settings.enemyVoiceLines}/death${DeBread.randomNum(0,voicelines[saveData.settings.enemyVoiceLines].death)}.mp3`,
                    0.1,
                    volumeSpeedMult,
                    false
                )
            }
        }
    }

    enemy.data.radiate = () => {
        enemyData.isRadiated = true

        enemy.querySelector('.enemyLevel').style.animation = 'rainbowGlow 1s linear infinite forwards'
        enemy.querySelector('.enemyLevel').innerText++
        enemyData.maxHealth *= 1.1
        enemyData.speedMult *= 1.1
        enemyData.health = enemyData.maxHealth

        for(let i = 0; i < 10; i++) {
            createParticle(
                0,
                [...enemyData.centerPos],
                DeBread.randomNum(0,10,10),
                1.1,
                DeBread.randomNum(0,Math.PI*2,10),
                25,
                1.1,
                50,
                {
                    color: `rgb(${DeBread.randomNum(0,255)},${DeBread.randomNum(0,255)},${DeBread.randomNum(0,255)})`
                }
            )
        }

        level++
    }

    elems.enemies.push(enemy)
    doge('area').append(enemy)
}

function spawnWave(wave, poor) {
    let credits = wave

    player.perfectWave = true

    let tries = 0
    while(credits > 0) {
        let enemyLevel = Math.floor(wave / 10)
        if(DeBread.randomNum(wave % 10, 10) === 10) {
            enemyLevel++
        }

        let randomEnemy = DeBread.randomNum(0, Object.keys(enemies).length - 1)
        const key = Object.keys(enemies)[randomEnemy]
        if(DeBread.randomNum(1,5) === 1 && wave >= 100 && tries > 0 && credits >= 3) {
            credits -= 3
            createTimeout(() => {
                elems.enemies[DeBread.randomNum(0,elems.enemies.length-1)].data.radiate()
            }, DeBread.randomNum(20,30))
        } else {
            if(enemies[key].credits <= credits) {
                credits -= enemies[key].credits
                createTimeout(() => {
                    spawnEnemy([DeBread.randomNum(0,doge('area').offsetWidth-enemies[key].size),DeBread.randomNum(0,doge('area').offsetWidth-enemies[key].size)],enemies[key],enemyLevel, DeBread.randomNum(50, 75))
                }, DeBread.randomNum(5,20))
            }
        }
        
        tries++
    }

    player.comboStrength += 25

    if(!poor) {
        let coins = wave * player.stats.misc.waveMoneyMult
        const differentCoins = [0,0,0,0,0]
        differentCoins[4] += Math.floor(coins / 100)
        coins -= differentCoins[4] * 100
        differentCoins[3] += Math.floor(coins / 25)
        coins -= differentCoins[3] * 25
        differentCoins[2] += Math.floor(coins / 10)
        coins -= differentCoins[2] * 10
        differentCoins[1] += Math.floor(coins / 5)
        coins -= differentCoins[1] * 5
        differentCoins[0] += coins
        coins -= differentCoins[0]
        
        for(let t = 0; t < differentCoins.length; t++) {
            for(let i = 0; i < differentCoins[t]; i++) {                
                pickups.coin(
                    t,
                    [
                        doge('area').offsetWidth / 2,
                        doge('area').offsetHeight / 2,
                    ], 2, 1,
                )
            }
        }
    }

    if(player.stats.misc.horseWeapon) {
        const randomStats = [
            ['player','speed','+=0.1'],
            ['player','maxHealth','+=10'],
            ['player','maxPower','+=1'],
            ['player','grazeSize','+=0.1'],
            ['player','grazeCooldown','*=0.95'],
            ['player','parryHeal','+=1'],
            ['shop','luck','+=0.5'],
            ['shop','rerolls','+=1'],
            ['bullet','damage','+=1'],
            ['bullet','size','+=1'],
            ['bullet','shotCooldown','*=0.95'],
            ['bullet','range','+=5'],
            ['bullet','critChance','+=5'],
            ['bullet','critDamageMult','+=0.1'],
            ['bullet','drillTicks','+=1'],
            ['bullet','bounces','+=1'],
            ['melee','damage','+=2'],
            ['melee','cooldown','*=0.95'],
            ['melee','knockback','+=1'],
            ['melee','heal','+=1'],
            ['ammo','max','+=1'],
            ['ammo','reloadSpeed','*=0.95'],
            ['misc','horseIncrease','+=1'],
        ]

        for(let i = 0; i < player.stats.misc.horseIncrease; i++) {
            const randomStat = randomStats[DeBread.randomNum(0,randomStats.length-1)]
            modifyStat([randomStat[0],randomStat[1]], randomStat[2])
            createNotification('Stat up!',`${randomStat[0]}.${randomStat[1]}`)
        }
    }

    if(saveData.gameSettings.gamemode !== 3) {
        doge('pageTitle').innerText = `Goober Shooter 2 - Wave ${player.wave}`

        if(wave === 200) {
            getAchievement('Champion')
        } else if(wave === 100) {
            getAchievement(`${saveData.selectedCharacter}_Perfection`)
            getAchievement('Conqueror')
        } else if(wave === 50) {
            getAchievement('Trooper')
        } else if(wave === 10) {
            getAchievement('Survivor')
        }
    }
}

const bosses = {
    beast: {
        name: 'Beast',
        health: 5000,
        size: 100,
        color: '#6b2340',

        moves: {
            dash: {
                duration: 50,
                do: boss => {
                    const playerAngle = Math.atan2(
                        boss.centerPos[1] + player.centerPos[1],
                        boss.centerPos[0] + player.centerPos[0]
                    )

                    boss.dirVels.push({
                        angle: playerAngle,
                        div: 1.1
                    })
                }
            }
        }
    }
}

function startBossSequence(opponentData = {}) {
    doge('bossPopupOpponentName').innerText = opponentData.name ?? '???'
    if(opponentData.modifier) {
        doge('bossPopupOpponentModifier').innerText = opponentData.modifier
        doge('bossPopupOpponentModifier').style.display = 'unset'
    } else {
        doge('bossPopupOpponentModifier').style.display = 'none'
    }

    let imgNum = 0
    doge('gameBossPopup').querySelectorAll('img').forEach(img => {
        img.style.animation = `slide${imgNum} 2s ease-out 1 forwards`
        imgNum++
    })

    doge('gameBossPopup').style.height = '150px'
    doge('gameBossPopupContainer').style.opacity = '1'
    
    createTimeout(() => {
        doge('gameBossPopup').style.height = '0px'
        doge('gameBossPopupContainer').style.opacity = '0'
        setTimeout(() => {
            doge('gameBossPopup').querySelectorAll('img').forEach(img => {
                img.style.animation = `none`
            })
        }, 250);
    }, 100)
}

function spawnBoss(pos, data, spawnTime = 20) {
    const boss = enemyBase.cloneNode()
    boss.classList.add('entity')
    elems.enemies.push(boss)
    addStyles(boss, {
        backgroundColor: 'white',
        position: 'absolute',
        width: data.size + 'px',
        height: data.size + 'px',
        backgroundColor: data.color //Dont worry bosses will have textures
    })
    
    boss.data = data
    boss.pos = [...pos]
    boss.centerPos = [boss.pos[0] + data.size / 2, boss.pos[1] + data.size / 2]
    boss.active = false
    boss.dateSpawned = e.gameUpdates
    boss.health = data.health
    boss.maxHealth = data.health
    boss.dirVels = []

    boss.healthBar = document.createElement('div')
    boss.healthBar.classList.add('gameBossbar')
    boss.healthBar.innerHTML = `
        <span>${data.name.toUpperCase()}</span>
        <div style="width: 0%; background-color: ${data.color};"></div>
    `
    doge('gameBossbarContainer').append(boss.healthBar)

    boss.init = () => {
        boss.active = true
        boss.style.animation = 'enemyInit 500ms ease-out 1 forwards'
        boss.style.opacity = '1'

        boss.style.boxShadow = '0px 0px 0px 10px transparent'

        boss.healthBar.querySelector('div').style.width = '100%'

        if(saveData.selectedChallenge === 'hidden') {
            boss.style.backgroundColor = 'transparent'
        }
    }

    boss.tick = () => {
        if(e.gameUpdates - boss.dateSpawned >= spawnTime && !boss.active) {
            boss.init()
        }

        boss.centerPos = [boss.pos[0] + data.size / 2, boss.pos[1] + data.size / 2]
    }

    boss.damage = damage => {
        boss.health -= damage
        
        addStyles(boss.healthBar.querySelector('div'), {
            width: boss.health / boss.maxHealth * 100 + '%',
            animation: 'none'
        })
        requestAnimationFrame(() => {
            boss.healthBar.querySelector('div').style.animation = 'bossbarPulse 250ms ease-out 1 forwards'
        })

        if(boss.health <= 0) boss.kill()
    }

    boss.kill = () => {
        elems.enemies.splice(elems.enemies.indexOf(boss),1)
        createParticles([...boss.centerPos], 25, data.size, [0,data.size*1.5],500,'ease-out',{backgroundColor: 'red'})
        boss.healthBar.remove()

        boss.remove()
    }

    doge('area').append(boss)
}