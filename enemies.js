const enemies = {
    guy: {
        name: 'Guy',
        desc: 'A small enemy that does little contact damage.',
        color: 'rgb(255,100,100)',
        size: 40,
        health: 25,
        speed: 2,
        meleeDamage: 5,

        credits: 1,
    },
    scout: {
        name: 'Scout',
        desc: 'A medium-sized enemy that does contact damage.',
        color: 'rgba(255, 82, 148, 1)',
        size: 50,
        health: 50,
        speed: 3,
        meleeDamage: 10,

        credits: 2,
    },
    goon: {
        desc: 'A slow moving enemy that shoots medium-damage projectiles.',
        name: 'Goon',
        color: 'rgba(255, 243, 82, 1)',
        size: 50,
        health: 75,
        speed: 1,
        meleeDamage: 3,

        projectile: {
            cooldown: 1000,
            size: 10,
            dmg: 20,
            speed: 5,
        },

        credits: 3,
    },
    machinist: {
        desc: 'A slow moving enemy that radpidly shoots low-damage projectiles.',
        name: 'Machinist',
        color: 'rgb(255, 82, 238)',
        size: 50,
        health: 75,
        speed: 1,
        meleeDamage: 3,

        projectile: {
            cooldown: 250,
            size: 7,
            dmg: 5,
            speed: 5,
        },

        credits: 5,
    },
    brute: {
        name: 'Brute',
        color: 'rgb(200,200,200)',
        size: 60,
        health: 125,
        speed: 0.5,
        meleeDamage: 25,

        projectile: {
            cooldown: 2500,
            size: 15,
            dmg: 50,
            speed: 2,
        },

        credits: 8,
    },
    mutant: {
        name: 'Mutant',
        color: 'rgb(125, 255, 125)',
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
        color: 'rgba(86, 49, 34, 1)',
        size: 50,
        health: 175,
        speed: 0.25,
        meleeDamage: 50,

        projectile: {
            cooldown: 2500,
            size: 15,
            dmg: 50,
            speed: 2,

            explosive: true,
            explosionSize: 100,
        },

        credits: 10,
    },
    monstrosity: {
        name: 'Monstrosity',
        color: 'rgba(51, 116, 51, 1)',
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
            cooldown: 2500,
            size: 15,
            dmg: 50,
            speed: 2,

            poisonField: {
                size: 75,
                damage: 10,
                rate: 10,
            }
        },

        credits: 20,
    },
    bomber: {
        name: 'Bomber',
        desc: 'Very quick enemy that explodes on impact.',
        color: 'red',
        size: 40,
        health: 10,
        speed: 10,
        credits: 10,

        explosive: {
            size: 100,
            damage: 75,
            impact: true,
        }
    },
    explosive: {
        name: 'Explosive',
        desc: 'Creates an explosion when damaged.',
        color: 'rgb(100,0,0)',
        size: 40,
        health: 1,
        speed: 0.00000000001, //yeah okay
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
        color: 'rgb(54, 78, 111)',
        size: 35,
        health: 30,
        speed: 8,
        credits: 10,
        meleeDamage: 10,
    },
    slime: {
        name: 'Slime',
        color: 'lime',
        size: 50,
        heath: 50,
        speed: 2,
        health: 125,
        credits: 15,
        meleeDamage: 15,

        split: {
            times: 2,
            count: 2,
        }
    },
    cocoon: {
        name: 'Cocoon',
        color: 'rgb(194, 192, 172)',
        size: 50,
        health: 100,
        speed: 0.001,
        credits: 20,

        split: {
            times: 1,
            count: 5,

            into: 'spider'
        }
    },
    spider: {
        name: 'Spider',
        color: 'rgb(64, 68, 72)',
        size: 20,
        health: 20,
        speed: 5,
        credits: Infinity,

        coinOverride: 2,
        meleeDamage: 10,
    },
    titan: {
        name: 'Titan',
        color: 'rgb(88, 38, 98)',
        size: 75,
        health: 750,
        speed: 0.5,
        credits: 25,

        projectile: {
            cooldown: 2500,
            size: 25,
            dmg: 75,
            speed: 2,

            poisonField: {
                size: 50,
                damage: 10,
                rate: 10,
            }
        },
    },
    dummy: {
        name: 'Dummy',
        desc: '<em style="color: grey;">Sandbox only</em><br>Has infinite health and displays total damage taken.',
        color: 'rgba(255, 218, 169, 1)',
        credits: Infinity,
        size: 50,
        health: Infinity,
        speed: 0.0000000001,
        poor: true,
    },
    weakDummy: {
        name: 'Weak Dummy',
        desc: '<em style="color: grey;">Sandbox only</em><br>Has 10 health and displays total damage taken.',
        color: 'rgb(146, 94, 78)',
        credits: Infinity,
        size: 50,
        health: 10,
        speed: 0.0000000001,
        poor: true,
    },
    mountedDummy: {
        name: 'Mounted Dummy',
        desc: '<em style="color: grey;">Sandbox only</em><br>Same as the dummy, but does not have any collision.',
        color: 'rgb(160, 129, 88)',
        credits: Infinity,
        size: 50,
        health: Infinity,
        speed: 0,
        poor: true,
    },
    nerfSentry: {
        name: 'Nerf Sentry',
        desc: '<em style="color: grey;">Sandbox only</em><br>Same as the dummy, but fires projectiles that doesn\'t deal any damage.',
        color: 'rgb(160, 129, 88)',
        credits: Infinity,
        size: 50,
        health: Infinity,
        speed: 0,
        poor: true,

        projectile: {
            cooldown: 2500,
            size: 10,
            dmg: 0,
            speed: 2,
        },
    },
    mountedExplosive: {
        name: 'Mounted Explosive',
        desc: '<em style="color: grey;">Sandbox only</em><br>Creates an explosion when damaged.',
        color: 'rgb(75,0,0)',
        size: 40,
        health: 1,
        speed: 0,
        credits: Infinity,
        poor: true,

        explosive: {
            size: 150,
            damage: 75,
            impact: false,
        }
    },
}

const enemyBase = document.createElement('div')
enemyBase.innerHTML = `
    <div class="enemyHealthBarContainer">
        <div class="enemyLevel">1</div>
        <div class="enemyHealthBar">
            <div class="innerEnemyHealthBar"></div>
        </div>
    </div>
    <span style="position: absolute;"></span>
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

function spawnEnemy(pos, data, levelBase, spawnTime = 1000, extraData = {}) {
    const enemy = enemyBase.cloneNode(true)
    const healthBar = enemy.querySelector('.innerEnemyHealthBar')
    const level = Math.max(levelBase + player.stats.enemy.levelIncrease, 0)
    enemy.querySelector('.enemyLevel').innerText = level
    if(extraData.hideLevel || data.hideLevel) {
        enemy.querySelector('.enemyLevel').remove()
    }
    enemy.classList.add('enemy')

    addStyles(enemy, {
        position: 'absolute',
        left: pos[0]+'px',
        top: pos[1]+'px',
        width: (extraData.size ?? data.size) + 'px',
        height: (extraData.size ?? data.size) + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 0px 0px white',
        borderRadius: '5px',
        zIndex: '6',
        backgroundColor: data.color ?? 'rgb(200,200,200)',
        boxShadow: 'inset 0px 0px 0px 2px transparent',
        animation: 'enemyWait 1s ease-in-out infinite forwards, enemyIn 500ms cubic-bezier(0,1,.5,1) 1 forwards',
        transition: `left linear ${e.gameUpdateInterval}ms, top linear ${e.gameUpdateInterval}ms`
    })

    enemy.alive = true
    enemy.maxHealth = extraData.health ?? data.health * (1 +level / 2)
    enemy.health = extraData.health ?? data.health * (1 + level / 2)
    enemy.damageTaken = 0

    enemy.lastHitDate = e.gameUpdates + (spawnTime * (e.gameUpdateInterval / 1000))

    enemy.spawnTime = spawnTime
    enemy.spawnDate = e.gameUpdates
    enemy.active = false
    enemy.pos = pos
    enemy.dirVels = []
    enemy.centerPos = [pos[0]+data.size/2,pos[1]+data.size/2]
    enemy.speed = data.speed ?? 0
    enemy.level = level
    enemy.timesSplit = extraData.timesSplit ?? 0
    enemy.isBleeding = false

    enemy.target = player
    enemy.elem = enemy
    enemy.friendly = false

    enemy.damage = (amount, silent) => {
        if(enemy.active) {
            if(enemy.health < Infinity) {
                enemy.querySelector('.enemyHealthBarContainer').style.opacity = '1'
            }

            enemy.health -= amount
            healthBar.style.width = enemy.health / enemy.maxHealth * 100 + '%'

            if(!silent) {
                DeBread.playSound('audio/enemyHit.mp3', 1, DeBread.randomNum(0.9,1.1,5), false)
                
                healthBar.style.animation = 'none'
                enemy.style.animation = 'none'
                setTimeout(() => {
                    healthBar.style.animation = 'healthBarPulse 250ms ease-out 1 forwards'
                    enemy.style.animation = 'enemyHit 250ms ease-out 1 forwards'
                }, e.gameUpdateInterval)
            }
            
            
            if(enemy.health <= 0) {enemy.kill(amount)}

            enemy.damageTaken += amount

            if(enemy.health === Infinity) {
                enemy.querySelector('span').innerText = formatNumber(DeBread.round(enemy.damageTaken))
            }
        }
    }

    enemy.kill = (endingDamage) => {
        if(enemy.alive) {
            enemy.alive = false
            createParticles([enemy.pos[0] + enemy.size / 2, enemy.pos[1] + enemy.size / 2], 10, enemy.size / 2, [0,100], 500, 'ease-out',{backgroundColor: data.color})
            let coins = Math.round(data.credits * player.stats.enemy.moneyMult)
            if(data.credits === Infinity || data.poor) {
                coins = 0
            }
    
            if(data.coinOverride) {
                coins = data.coinOverride * player.stats.enemy.moneyMult
            }
    
            const differentCoins = [0,0,0,0,0]
            differentCoins[4] += Math.floor(coins / 100)
            coins -= differentCoins[4] * 100
            differentCoins[3] += Math.floor(coins / 25)
            coins -= differentCoins[3] * 25
            differentCoins[2] += Math.floor(coins / 10)
            coins -= differentCoins[2] * 25
            differentCoins[1] += Math.floor(coins / 5)
            coins -= differentCoins[1]
            differentCoins[0] += coins
            coins -= differentCoins[0]
    
    
            for(let t = 0; t < differentCoins.length; t++) {
                for(let i = 0; i < differentCoins[t]; i++) {                
                    pickups.coin(
                        t,
                        [
                            DeBread.randomNum(enemy.pos[0], enemy.pos[0] + enemy.offsetWidth),
                            DeBread.randomNum(enemy.pos[1], enemy.pos[1] + enemy.offsetHeight),
                        ], Math.min(endingDamage / 10, 25), 1,
                    )
                }
            }
    
            if(data.split && enemy.timesSplit < data.split.times) {
                for(let i = 0; i < data.split.count; i++) {
                    if(data.split.into) {
                        spawnEnemy(
                            [
                                DeBread.randomNum(enemy.pos[0]+1,enemy.pos[0]-1,10),
                                DeBread.randomNum(enemy.pos[1]+1,enemy.pos[1]-1,10)
                            ], 
                            enemies[data.split.into], 
                            enemy.level, 
                            0, 
                            {}
                        )
                    } else {
                        spawnEnemy(
                            [
                                DeBread.randomNum(enemy.pos[0]+1,enemy.pos[0]-1,10),
                                DeBread.randomNum(enemy.pos[1]+1,enemy.pos[1]-1,10)
                            ], 
                            data, 
                            enemy.level, 
                            0,
                            {
                                size: Math.max(enemy.size / 2, 10), 
                                health: enemy.maxHealth / 3,
                                timesSplit: enemy.timesSplit + 1,
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
                    [enemy.pos[0] + enemy.size / 2,enemy.pos[1] + enemy.size / 2],
                    data.explosive.size,
                    data.explosive.damage,
                    25,
                    false
                )
            }
    
    
            if(document.querySelectorAll('.enemy').length === 0 && ![2,3].includes(saveData.gameSettings.gamemode)) {
                area.createNotice(`Quick wave clear! - +$${player.wave}`)
                player.getMoney(player.wave)
                
                if(player.wavesPaused) {
                    setTimeout(() => {
                        spawnPortal()
    
                        player.stats.player.pickupRange += 10
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
        }
    }

    enemy.init = () => {
        enemy.active = true
        enemy.style.animation = 'enemyInit 500ms ease-out 1 forwards'
        enemy.style.opacity = '1'

        enemy.style.boxShadow = '0px 0px 0px 10px transparent'

        healthBar.style.width = '100%'
    }

    if(data.speed) {
        enemy.move = () => {
            if(enemy.friendly) {
                let closestEnemy
                let closestEnemyDis = Infinity

                doge('area').querySelectorAll('.enemy').forEach(otherEnemy => {
                    if(otherEnemy !== enemy && otherEnemy.active) {
                        const distance = Math.sqrt(
                            Math.pow(enemy.pos[0] - otherEnemy.pos[0],2) + 
                            Math.pow(enemy.pos[1] - otherEnemy.pos[1],2)
                        )

                        if(distance <= closestEnemyDis && !otherEnemy.friendly) {
                            closestEnemyDis = distance
                            closestEnemy = otherEnemy
                        }
                    }
                })

                enemy.target = closestEnemy
            }

            doge('area').querySelectorAll('.enemy').forEach(otherEnemy => {
                const angle = Math.atan2((otherEnemy.pos[1] + otherEnemy.size / 2) - (enemy.pos[1] + enemy.size / 2), (otherEnemy.pos[0] + otherEnemy.size / 2) - (enemy.pos[0] + enemy.size / 2))
                if (isColliding(enemy, otherEnemy) && enemy !== otherEnemy && otherEnemy.active) {
                    const distance = Math.sqrt(
                        Math.pow(enemy.pos[0] - otherEnemy.pos[0],2) + 
                        Math.pow(enemy.pos[1] - otherEnemy.pos[1],2)
                    )
                    
                    const overlap = (enemy.size - distance) / 10
                    enemy.pos[0] -= Math.cos(angle) * (enemy.speed * player.stats.enemy.speedMult + overlap)
                    enemy.pos[1] -= Math.sin(angle) * (enemy.speed * player.stats.enemy.speedMult + overlap)                    
                }
            })
            if(enemy.target && isColliding(enemy, enemy.target.elem)) {
                const angle = Math.atan2(enemy.target.centerPos[1] - (enemy.pos[1] + enemy.size / 2), enemy.target.centerPos[0] - (enemy.pos[0] + enemy.size / 2))
                const distance = Math.sqrt(
                    Math.pow(enemy.pos[0] - enemy.target.pos[0],2) + 
                    Math.pow(enemy.pos[1] - enemy.target.pos[1],2)
                )

                const overlap = (enemy.size - distance) / 10
                enemy.pos[0] -= Math.cos(angle) * (enemy.speed * player.stats.enemy.speedMult + overlap)
                enemy.pos[1] -= Math.sin(angle) * (enemy.speed * player.stats.enemy.speedMult + overlap)
                
                if(data.meleeDamage && e.gameUpdates - enemy.lastHitDate >= 25) {
                    enemy.target.damage(data.meleeDamage)
                    enemy.lastHitDate = e.gameUpdates
                }
            } else if(enemy.target) {
                const angle = Math.atan2(enemy.target.centerPos[1] - (enemy.pos[1] + enemy.size / 2), enemy.target.centerPos[0] - (enemy.pos[0] + enemy.size / 2))
                enemy.pos[0] += Math.cos(angle) * enemy.speed * player.stats.enemy.speedMult
                enemy.pos[1] += Math.sin(angle) * enemy.speed * player.stats.enemy.speedMult
            }

            if(enemy.pos[0] < 0) enemy.pos[0] = 0
            if(enemy.pos[1] < 0) enemy.pos[1] = 0
            if(enemy.pos[0] > doge('area').offsetWidth - enemy.size) enemy.pos[0] = doge('area').offsetWidth - enemy.size
            if(enemy.pos[1] > doge('area').offsetHeight - enemy.size) enemy.pos[1] = doge('area').offsetHeight - enemy.size

            for(let i = 0; i < enemy.dirVels.length; i++) {
                const dirVel = enemy.dirVels[i]
                enemy.pos[0] += Math.cos(dirVel.angle) * dirVel.speed
                enemy.pos[1] += Math.sin(dirVel.angle) * dirVel.speed

                dirVel.speed /= dirVel.div
                if(dirVel.speed <= 0.1) {
                    enemy.dirVels.splice(i, 1)
                }
            }

            addStyles(enemy, {
                left: enemy.pos[0]+'px',
                top: enemy.pos[1]+'px'
            })

            if(data.poisonField) {
                const dx = (enemy.pos[0] + enemy.size / 2) - player.centerPos[0]
                const dy = (enemy.pos[1] + enemy.size / 2) - player.centerPos[1]
                const distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))

                if(distance <= data.poisonField.size && e.gameUpdates % DeBread.round(data.poisonField.rate / player.stats.enemy.speedMult) === 0) {
                    player.damage(data.poisonField.damage, true)
                }
            }

            if(data.explosive) {
                if(data.speed > 1) {
                    createParticles(
                        [enemy.pos[0] + enemy.size / 2,enemy.pos[1] + enemy.size / 2],
                        2,
                        10,
                        [25,50],
                        250,
                        'ease-out',
                        {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`}
                    )
                } 

                if(data.explosive.impact) {
                    if(isColliding(player.elem, enemy)) enemy.kill()
                }
            }

            if(enemy.friendly) {
                createParticles(
                    [enemy.pos[0] + enemy.size / 2,enemy.pos[1] + enemy.size / 2],
                    2,
                    10,
                    [25,50],
                    250,
                    'ease-out',
                    {backgroundColor: `pink`}
                )
            }

            if(enemy.isBleeding) {
                enemy.damage(1, true)
            }

            enemy.centerPos = [enemy.pos[0]+enemy.offsetWidth/2,enemy.pos[1]+enemy.offsetHeight/2]
        }
    }

    if(data.projectile) {
        enemy.hasProjectiles = true
        enemy.lastShotDate = e.gameUpdates + (spawnTime * (e.gameUpdateInterval / 1000))
        enemy.shotCooldown = data.projectile.cooldown
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
            if(player.alive && enemy.target) {
                const projectile = projectileBase.cloneNode()
                projectile.target = enemy.target
                projectile.classList.add('enemyProjectile')
                projectile.pos = [enemy.pos[0] + enemy.size / 2, enemy.pos[1] + enemy.size / 2]
                addStyles(projectile, {
                    left: projectile.pos[0] +'px',
                    top: projectile.pos[1] +'px',
                    width: data.projectile.size + 'px'
                })
    
                projectile.angle = Math.atan2(
                    projectile.pos[1] - DeBread.randomNum(enemy.target.pos[1], enemy.target.pos[1] + enemy.target.elem.offsetHeight),
                    projectile.pos[0] - DeBread.randomNum(enemy.target.pos[0], enemy.target.pos[0] + enemy.target.elem.offsetWidth),
                )
                projectile.speed = data.projectile.speed
                projectile.damage = data.projectile.dmg * (1 + level / 2)
                projectile.poisonField = data.projectile.poisonField
                projectile.size = data.projectile.size
    
                projectile.explosive = data.projectile.explosive
                projectile.explosionSize = data.projectile.explosionSize
    
                doge('area').append(projectile)
                enemy.lastShotDate = e.gameUpdates

                projectile.destroy = () => {
                    createParticles(
                        [projectile.pos[0],projectile.pos[1]],
                        5,
                        10,
                        [10,25],
                        250,
                        'ease-out',
                        {backgroundColor: 'rgb(255,100,100)'}
                    )

                    if(isColliding(projectile, projectile.target.elem)) {
                        projectile.target.damage(projectile.damage)
                        
                    }

                    if(projectile.explosive) {
                        createExplosion(projectile.pos, projectile.explosionSize, projectile.damage, 25, false)
                    }
                    
                    if(projectile.poisonField) {
                        createPoisonField(projectile.pos, projectile.poisonField.size, projectile.poisonField.damage, 10, projectile.poisonField.rate, false, [100,0,255])
                    }

                    if(projectile.parried && player.stats.player.parryPoisonSize > 0) {
                        createPoisonField([...projectile.pos], player.stats.player.parryPoisonSize, player.stats.bullet.damage * (player.stats.player.parryPoisonDmg / 100), player.stats.player.parryPoisonTicks, 20, false, [0,255,0])
                    }

                    projectile.remove()
                }
            }
        }
    }

    enemy.tame = () => {
        enemy.friendly = true
        healthBar.style.backgroundColor = 'lime'
    }

    if(data.poisonField) {
        const poisonField = enemyPoisonFieldBase.cloneNode()
        addStyles(poisonField, {
            width: data.poisonField.size * 2 + 'px',
            height: data.poisonField.size * 2 + 'px'
        })
        enemy.appendChild(poisonField)
    }

    doge('area').append(enemy)
    enemy.size = enemy.offsetWidth

    // enemy.addEventListener('mousedown', ev => {
    //     if(e.keysDown.includes('f')) {
    //         enemy.tame()
    //     }
    // })
}

function spawnWave(wave) {
    let credits = wave
    player.perfectWave = true

    while(credits > 0) {
        let enemyLevel = Math.floor(wave / 10)
        if(DeBread.randomNum(wave % 10, 10) === 10) {
            enemyLevel++
        }

        let randomEnemy = DeBread.randomNum(0, Object.keys(enemies).length - 1)
        const key = Object.keys(enemies)[randomEnemy]
        if(enemies[key].credits <= credits) {
            credits -= enemies[key].credits
            spawnEnemy([DeBread.randomNum(0,doge('area').offsetWidth-enemies[key].size),DeBread.randomNum(0,doge('area').offsetWidth-enemies[key].size)],enemies[key],enemyLevel, DeBread.randomNum(1000, 2000))
        }
    }
}