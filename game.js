function createPlayer() {
    return {
        alive: true,

        //Position stuff
        pos: [doge('area').offsetWidth / 2 - doge('player').offsetWidth / 2,doge('area').offsetHeight / 2 - doge('player').offsetHeight / 2],
        centerPos: [0,0],
        rectPos: [0,0],
        vel: [0,0],

        dirVels: [],

        lastDustParticle: 0,
        restartProgress: 0,
        
        wave: 1,
        lastWaveDate: -676,
        wavesPaused: false,
        perfectWave: true,

        isCharging: false,
        chargeStartDate: 0,
        chargeDmgMult: 1,

        inPortal: false,
        immune: false,

        health: 100,
        power: 0,
        rerolls: 0,

        onFire: false,
        crispiness: 0,

        score: 0,
        combo: 1,
        comboStrength: 100,
        scoreMult: 1,

        money: 10,
        keys: 0,

        bankBreakChance: 0,

        weapon: 'gun',
        characterWeapon: weaponPresets.gun,

        lastHitDate: 0,

        consumables: [],
        powerItem: undefined,
        maxConsumables: 1,
        selectedConsumable: 0,

        statusEffects: [],

        lastMeleeDate: 0,
        lastGrazeDate: 0,

        canUsePowerItem: true,

        tutorial: {
            stage: -1,

            goal: 0,
            goalValue: 0,
        },

        bulletsShot: 0,
        bulletsHit: 0,

        gameOverStats: {
            enemiesKilled: 0,
            damageTaken: 0,
            damageGiven: 0,
            moneySpent: 0,
            rerolls: 0,
            items: 0,
            accuracy: 0,
        },

        shopWeights: [
            90, //Item
            5, //Power item
            5, //Elixir
        ],

        elixirIDs: [],
        elixirs: [],
        
        stats: {
            player: {
                immunityTime: 1, //How long (in ticks) the player becomes immune after being hit.
                speed: 5, //The max speed the player can move.
                speedStep: 2.5, //The amount the player velocity changes every tick to reach the target speed value.
                size: 36, //Player size. (in pixels)

                maxHealth: 100, //Max player health.
                pickupRange: 0, //How strong pickups are attracted towards the player.

                socksDamage: 0,
                thirdEye: 0,
                passiveAbilityMult: 1,
                powerGainMult: 1,
                
                grazeSize: 2, //How big (in player sizes) the graze hitbox is.
                grazeCooldown: 5, //How long (in ticks) between each graze tick.

                parryHeal: 0, //How much the player heals after performing a parry.
                parryPoisonDmg: 0, //How much damage (as a percent of the player damage) a poison field (from a parried bullet) deals every poison field tick.
                parryPoisonTicks: 0, //How many times a poison field (from a parried bullet) attempts to damage an enemy before destroying.
                parryPoisonSize: 0, //How big (in pixels) the parried poison fields are.

                contactDamage: 0, //How much damage the player deals to colliding enemies every tick.

                explosiveHitChance: 0, //The chance of creating an explosion when the player is hit. (1 = 1% chance)
                explosiveHitDamage: 0, //How much damage the explosion created from getting hit by an enemy deals. (as a percent of player damage) (1 = 100% of player damage)

                explosiveHeal: 0, //How much HP the player heals when getting hit by an explosion.

                weaponContactDamage: 0, //How much damage every tick the players weapon deals to enemies that are colliding with it.
            },

            shop: {
                upgrades: 3, //How many upgrades appear in the shop.
                elixirs: 3, //How many elixirs appear in the shop.
                luck: 0, //Increases the chance of higher quality items appearing in the shop.
                rerolls: 1, //How many times the player can reroll the shop.
            },

            bullet: {
                speed: 10, //How much (in pixels) the bullet travels every tick.
                damage: 5, //How much damage a bullet deals when colliding with an enemy. This also influences other player attacks.
                damageMult: 1, //Multiplies damage stat.
                size: 8, //How large (in pixels) bullets are.
                shotCooldown: 75, //The minimum amount of time (in ticks) between being availble to fire a projectile. 
                lastShotDate: 0, //Ignore this
                range: 100, //The amount of ticks a bullet is alive before being destroyed.
                
                critChance: 0, //The percent chance of a bullet dealing critical damage. (1 = 1% chance)
                critDamageMult: 1.25, //The amount that the bullet damage is multiplied by when it is considered a crit.

                split: 0, //The amount of projectiles projectiles split into.
                splits: 1, //The amount of times that a bullet can split.

                bounces: 0, //The amount of times a bullet can bounce off of a wall before destroying.
                
                drillTicks: 1, //The amount of times a bullet can hit an enemy before being destroyed.
                
                explosionSize: 0, //The size (in pixels) of the explosion a bullet creates when being destroyed.

                heal: 0, //The amount of HP a bullet heals the player when hitting an enemy.

                electricChainLength: 0, //The amount of enemies electicity can chain between.
                electricChainReach: 0, //The distance that electricity can reach.

                knockback: 1, //The amount (in pixels) an enemy gets knocked back when getting hit by a bullet.

                multishot: 1, //The amount of bullets shot at once when pressing left click.

                tameChance: 0,
                tameCredits: 0,

                poisonFieldChance: 0, //The chance of a bullet creating a poison field when destroyed. (1 = 1% chance)
                poisonFieldSize: 0, //The size of the poison field created by a bullet.
                poisonFieldDmgPercent: 0, //The percent of player damage the poison field deals to enemies.
                poisonFieldTicks: 0, //How many times the poison field (from bullet) attempts to damage an enemy before destroying.
                poisonFieldColor: [255,0,0], //The color of the poison field created by a bullet.

                recoil: 0, //The amount (in pixels) that the player gets knocked back when firing their weapon.
                accuracy: 10, //How much the bullet target can deviate from the crosshair. (Higher = lower accuracy)

                magnetStrength: 0, //How much bullets gravitate towards the nearest enemy. (Higher = stronger) (Magnetic ammo increases by 0.2)

                randDmgMult: 1, //How much a bullets damage is multiplied by between 1 and this value.

                grow: 0, //How much a bullets size and damage is multiplied by every tick. (This value is added by 1, 0.25 grow = 1.25x)

                thornDamage: 0, //How much damage the player takes when firing a bullet.

                spin: 0, //How many degrees bullets rotate every tick.

                slow: 0,
            },
            melee: {
                damage: 20, //How much damage is dealt to enemies within the players melee hitbox.
                damageMult: 1, //Multiplies damage stat.
                cooldown: 75, //How long (in ticks) it takes to recharge the cooldown.
                size: 50, //How large (in pixels) the melee hitbox is.

                explosionPower: 0, //How big and powerful the explosion created by meleeing an enemy is.
                heal: 0, //How much the player heals when meleeing an enemy.
            },
            ammo: {
                current: 10, //Ignore this
                max: 10, //The max ammount of ammo the player can hold.
                
                reloadSpeed: 750, //How long (in milliseconds) it takes to reload the weapon.
                reloadDate: 0, //Ignore this
                isReloading: false, //Ignore this

                autoFire: false, //Determines whether or not bullet automatically fire when holding left-click.
                stationaryFire: false, //Determines if the player has to be stationary to fire projectiles.

                garandReload: false, //Determines if the player can only reload when at 0 ammo.

                chargeShot: false, //Determines if the player can hold left click to fire stronger projectiles.
                chargeTime: 0, //How long (in ticks) it takes to deal maximum damage with a charge shot.
                chargeMultCap: 0, //The max amount the bullet damage is multiplied by when firing a max charge shot.

                penetratingRounds: false, //Determines whether or not extra damage from a bullet hitting an enemy prevents it from destroying.

                stillSpeedIncrease: 0,
            },
            enemy: {
                levelIncrease: 0, //How many levels enemies are offset by.
                speedMult: 1, //How much enemy speed is multiplied by. This also effects shot and melee cooldowns.
                moneyMult: 1, //How much the amount of money an enemy drops is multiplied by.
            },
            misc: {
                areaSize: 500,
                waveInterval: 15000, //How long (in milliseconds) between each wave spawning.
                waveMoneyMult: 1,
            }
        },
        
        elem: doge('player'),

        //Functions

        createBullet: (pos, angle, extraData = {}) => {
            const bullet = bulletBase.cloneNode()
            bullet.angle = angle
            bullet.pos = [...pos]
            bullet.ticks = 0
            bullet.speed = player.stats.bullet.speed
            bullet.size = player.stats.bullet.size
            bullet.damage = extraData.damage ?? player.stats.bullet.damage
            bullet.bounces = player.stats.bullet.bounces
            bullet.onFire = false

            bullet.spin = 0

            bullet.hasHitEnemy = false

            //Apply damage multiplier
            bullet.damage *= player.stats.bullet.damageMult

            //Additional crit mults for crit chance above 100%
            for(let i = 0; i < Math.floor(player.stats.bullet.critChance / 100); i++) {
                bullet.damage *= player.stats.bullet.critDamageMult
                bullet.isCrit = true
            }

            if(DeBread.randomNum(0,100,5) <= player.stats.bullet.critChance % 100) {
                bullet.damage *= player.stats.bullet.critDamageMult
                bullet.isCrit = true
            }

            bullet.damage *= DeBread.randomNum(1, player.stats.bullet.randDmgMult,10) * player.chargeDmgMult

            if(player.stats.ammo.chargeShot) {
                bullet.size *= 1 + (player.chargeDmgMult / player.stats.ammo.chargeMultCap)
            }

            bullet.splits = extraData.splits ?? 0
            bullet.drillTicks = extraData.drillTicks ?? 1
            bullet.classList.add('bullet')
            bullet.style.transition = `left linear ${e.gameUpdateInterval}ms, top linear ${e.gameUpdateInterval}ms`
            addStyles(bullet, {
                left: bullet.pos[0] + 'px',
                top: bullet.pos[1] + 'px',
                width: bullet.size + 'px',
                height: bullet.size + 'px',
                rotate: bullet.angle + 'rad',
                backgroundImage: 'url(graphics/bullet.png)',
                backgroundSize: 'cover'
            })

            if(characters[saveData.selectedCharacter].weapon.bulletTexture) {
                bullet.style.backgroundImage = `url(graphics/weapons/${characters[saveData.selectedCharacter].weapon.name.replaceAll(' ','_').toLowerCase()}_bullet.png)`
            }

            if(characters[saveData.selectedCharacter].weapon.animatedBulletTexture) {
                bullet.style.backgroundImage = `url(graphics/weapons/${characters[saveData.selectedCharacter].weapon.name.replaceAll(' ','_').toLowerCase()}_bullet.gif)`
            }

            for(const key in extraData) {
                bullet[key] = extraData[key]
            }

            bullet.destroy = offset => {
                if(!bullet.splits) {
                    let particleOffset = [0,0]
                    if(offset) {
                        particleOffset = [
                            Math.cos(bullet.angle) * player.stats.bullet.speed,
                            Math.sin(bullet.angle) * player.stats.bullet.speed
                        ]
                    }

                    createParticles(
                        [bullet.pos[0]-particleOffset[0],bullet.pos[1]-particleOffset[1]],
                        5,
                        bullet.size,
                        [10,25],
                        250,
                        'ease-out',
                        {backgroundColor: 'white'}
                    )
                }

                if(player.stats.bullet.explosionSize > 0) {
                    createExplosion(bullet.pos, player.stats.bullet.explosionSize, player.stats.bullet.damage, player.stats.bullet.knockback * 10, false)
                }

                if(DeBread.randomNum(1,100) <= player.stats.bullet.poisonFieldChance) {
                    createPoisonField(bullet.pos, player.stats.bullet.poisonFieldSize, player.stats.bullet.damage * player.stats.bullet.poisonFieldDmgPercent / 100, player.stats.bullet.poisonFieldTicks, 20, false, player.stats.bullet.poisonFieldColor)
                }

                if(player.stats.bullet.split > 0 && bullet.splits < player.stats.bullet.splits) {
                    for(let i = 0; i < player.stats.bullet.split; i++) {
                        player.createBullet(
                            [bullet.pos[0],bullet.pos[1]],
                            (2*Math.PI / player.stats.bullet.split) * i + bullet.angle + Math.PI / 2,
                            {
                                splits: bullet.splits + 1,
                                damage: bullet.damage / 2
                            }
                        )
                    }
                }

                if(bullet.hasHitEnemy) {
                    player.bulletsHit++
                }

                bullet.remove()
            }

            bullet.updatePosition = enemies => {
                bullet.pos[0] += -Math.cos(bullet.angle) * bullet.speed
                bullet.pos[1] += -Math.sin(bullet.angle) * bullet.speed
                bullet.spin += player.stats.bullet.spin

                if(player.stats.bullet.spin > 0) {
                    bullet.style.rotate = bullet.spin + 'deg'
                }

                if(
                    bullet.pos[0] + -Math.cos(bullet.angle) * bullet.speed < 0 ||
                    bullet.pos[0] + -Math.cos(bullet.angle) * bullet.speed > doge('area').offsetWidth ||
                    bullet.pos[1] + -Math.sin(bullet.angle) * bullet.speed < 0 ||
                    bullet.pos[1] + -Math.sin(bullet.angle) * bullet.speed > doge('area').offsetHeight
                ) { 
                    if(bullet.bounces > 0) {
                        if( //X axis
                            bullet.pos[0] + -Math.cos(bullet.angle) * bullet.speed < 0 ||
                            bullet.pos[0] + -Math.cos(bullet.angle) * bullet.speed > doge('area').offsetWidth
                        ) {
                            bullet.angle = Math.PI - bullet.angle
                        }

                        if( //Y axis
                            bullet.pos[1] + -Math.sin(bullet.angle) * bullet.speed < 0 ||
                            bullet.pos[1] + -Math.sin(bullet.angle) * bullet.speed > doge('area').offsetHeight
                        ) {
                            bullet.angle = -bullet.angle
                        }

                        if(player.stats.bullet.spin > 0) {
                            bullet.style.rotate = player.stats.bullet.spin + 'deg'
                        } else {
                            bullet.style.rotate = bullet.angle + 'rad'
                        }

                        createParticles(
                            bullet.pos,
                            3,
                            10,
                            [10,25],
                            250,
                            'ease-out',
                            {backgroundColor: 'white'}
                        )

                        if(doge('area').children.length < 500) {
                            const bounceEffect = explosionEffectBase.cloneNode()
                            bounceEffect.style.setProperty('--explosionEffectScale','2')
                            addStyles(bounceEffect, {
                                left: bullet.pos[0]+'px',
                                top: bullet.pos[1]+'px',
                                width: '25px',
                                translate: '-50% -50%'
                            })
                            doge('area').append(bounceEffect)
    
                            setTimeout(() => {
                                bounceEffect.remove()
                            }, 500);
                        }

                        bullet.bounces--
                        bullet.damage *= 1.2
                    } else {
                        bullet.destroy(true) 
                    }
                }

                //Grow
                if(player.stats.bullet.grow !== 0) {
                    bullet.damage *= 1 + 0.01 * player.stats.bullet.grow
                    bullet.size *= 1 + 0.01 * player.stats.bullet.grow
                }

                bullet.style.left = bullet.pos[0]+'px'
                bullet.style.top = bullet.pos[1]+'px'
                bullet.style.width = bullet.size+'px'
                bullet.style.height = bullet.size+'px'

                let closestEnemy = {elem: undefined, dist: Infinity}
                enemies.forEach(enemy => {

                    if(player.stats.bullet.magnetStrength > 0 && enemies.length > 0) {
                        const enemyDist = Math.sqrt(
                            Math.pow(bullet.pos[0] - enemy.centerPos[0],2),
                            Math.pow(bullet.pos[1] - enemy.centerPos[1],2)
                        )

                        if(enemyDist < closestEnemy.dist) {
                            closestEnemy.elem = enemy
                            closestEnemy.dist = enemyDist
                        }
                    }

                    if(isColliding(bullet, enemy) && enemy.active && !enemy.friendly) {
                        player.damage(-player.stats.bullet.heal)
                        bullet.drillTicks++
                        bullet.hasHitEnemy = true

                        if(DeBread.round(bullet.damage) > 0) {
                            const popup = createPopupText(DeBread.round(bullet.damage), [bullet.pos[0],bullet.pos[1]])
                            if(bullet.isCrit) {
                                popup.style.color = 'yellow'
                                popup.innerText += '!'
                            } else {
                                popup.style.color = 'white'
                            }
                            popup.style.fontSize = Math.min(Math.max(bullet.damage / 5, 15), 50) + 'px'
                            doge('area').append(popup)
                        }
                        
                        enemy.dirVels.push({angle: bullet.angle - Math.PI, speed: player.stats.bullet.knockback, div: 1.1})
                        if(player.stats.bullet.slow) {
                            enemy.speedMult *= (0.75 / (1 + player.stats.bullet.slow / 10))
                            enemy.statusEffects.push({
                                duration: 50 + (10*player.stats.bullet.slow),
                                end: () => {
                                    enemy.speedMult /= (0.75 / (1 + player.stats.bullet.slow / 10))
                                }
                            })
                        }
                        
                        if(bullet.damage > enemy.health && player.stats.ammo.penetratingRounds) {
                            bullet.drillTicks--
                            bullet.damage -= enemy.health
                        }

                        if(bullet.drillTicks > player.stats.bullet.drillTicks) {
                            bullet.destroy()
                        }

                        enemy.damage(bullet.damage)
                        if(bullet.isCrit) {
                            getStyle(styles.crit)
                        }
                        
                        if(bullet.damage > enemy.maxHealth) {
                            getStyle(styles.overkill)
                        }

                        for(let i = 0; i < player.stats.bullet.bounces - bullet.bounces; i++) {
                            getStyle(styles.ricochet)
                        }

                        if(player.stats.bullet.electricChainLength > 0) {
                            let enemiesHit = [enemy]
                            let currentEnemy = enemy
                            
                            for(let i = 0; i < player.stats.bullet.electricChainLength; i++) {
                                let shortestEnemy = {enemy: undefined, distance: Infinity, d: []}
                                enemies.forEach(otherEnemy => {
                                    if(currentEnemy !== otherEnemy && !enemiesHit.includes(otherEnemy) && otherEnemy.active) {
                                        const dx = currentEnemy.pos[0] - otherEnemy.pos[0]
                                        const dy = currentEnemy.pos[1] - otherEnemy.pos[1]
        
                                        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
                                        if(distance < shortestEnemy.distance && distance <= player.stats.bullet.electricChainReach + 100) {
                                            shortestEnemy.enemy = otherEnemy
                                            shortestEnemy.distance = distance
                                            shortestEnemy.d = [dx, dy]
                                        }
                                    }
                                })

                                if(shortestEnemy.enemy === undefined) break
                                
                                currentEnemy = shortestEnemy.enemy

                                const enemyAngle = Math.atan2(shortestEnemy.d[1], shortestEnemy.d[0])

                                const damage = player.stats.bullet.damage / (i + 1)
                                shortestEnemy.enemy.damage(damage)
    
                                const popup = createPopupText(DeBread.round(damage), [shortestEnemy.enemy.pos[0],shortestEnemy.enemy.pos[1]])
                                popup.style.color = 'aqua'
                                popup.style.fontSize = Math.min(Math.max(damage / 5, 15), 50) + 'px'
                                doge('area').append(popup)
                                
                                for(let p = 0; p < 5; p++) {
                                    createParticles(
                                        [
                                            shortestEnemy.enemy.pos[0] + shortestEnemy.enemy.offsetWidth / 2 + Math.cos(enemyAngle) * (shortestEnemy.distance / 5) * p,
                                            shortestEnemy.enemy.pos[1] + shortestEnemy.enemy.offsetHeight / 2 + Math.sin(enemyAngle) * (shortestEnemy.distance / 5) * p
                                        ], 1, 10, [0,10], 500, 'ease-out', 
                                        {
                                            backgroundColor: `hsl(${DeBread.randomNum(170,190)} 100% 50%)`, 
                                            borderRadius: '0',
                                            rotate: enemyAngle + 'rad',
                                        }
                                    )
                                }

                                enemiesHit.push(shortestEnemy.enemy)
                            }
                        }
                    }
                })

                //Magnet stuff
                if(closestEnemy.elem) {
                    const enemyMagAngle = Math.atan2(
                        bullet.pos[1] - closestEnemy.elem.centerPos[1],
                        bullet.pos[0] - closestEnemy.elem.centerPos[0]
                    )

                    let delta = enemyMagAngle - bullet.angle

                    delta = Math.atan2(Math.sin(delta), Math.cos(delta))

                    bullet.angle += delta * 0.1 * player.stats.bullet.magnetStrength
                    if(player.stats.bullet.spin > 0) {
                        bullet.style.rotate = bullet.spin + 'deg'
                    } else {
                        bullet.style.rotate = bullet.angle + 'rad'
                    }
                }

                bullet.ticks++

                if(bullet.ticks >= player.stats.bullet.range) bullet.destroy()
            }

            doge('area').append(bullet)
        },

        damage: (amount, light) => {
            let idolAlive = false
            for(const enemy of elems.enemies) {
                if(enemy.data.name === 'Idol' && enemy.active) {
                    idolAlive = true
                    break
                }
            }
            const startAmount = player.health
            if(player.health - amount < 1 && player.health > 1) {
                player.health = 1
            } else {
                if(amount > 0) {
                    player.health -= amount
                } else if(!idolAlive) {
                    player.health -= amount
                }
            }
            if(player.health <= 0) player.health = 0
            if(player.health >= player.stats.player.maxHealth) player.health = player.stats.player.maxHealth
            
            if(amount > 0 && !player.immune && e.gameUpdates - player.lastHitDate >= player.stats.player.immunityTime) {
                player.gameOverStats.damageTaken += -(player.health - startAmount)
                player.lastHitDate = e.gameUpdates
                DeBread.playSound('audio/hit.mp3', 0.25)

                player.elem.style.animation = 'none'
                setTimeout(() => {
                    player.elem.style.animation = 'playerHit 250ms ease-out 1 forwards'
                }, e.gameUpdateInterval)

                if(!light) {
                    player.getPower(-(Math.min(amount, 25)))
                }

                //Explosive Damage
                if(DeBread.randomNum(1,100) < player.stats.player.explosiveHitChance) {
                    createExplosion([...player.centerPos],player.stats.player.size * 2, player.stats.bullet.damage * player.stats.player.explosiveHitDamage, 100, true)
                }

                player.combo = Math.round(player.combo / 2)
                player.comboStrength /= 2
            }

            doge('healthBar').style.width = player.health / player.stats.player.maxHealth * 100 + '%'       

            //Health bar num
            doge('healthBarNum').innerHTML = ''
            const healthNum = document.createElement('div')
            for(let i = 0; i < formatNumber(Math.ceil(player.health)).length; i++) {
                const num = healthNum.cloneNode()
                num.innerText = formatNumber(Math.ceil(player.health))[i]
                doge('healthBarNum').append(num)
                
                DeBread.easeShake(num, 10, Math.min(amount / 3, 25), 0.5)
            }
            DeBread.easeShake(doge('healthBarContainer'), 10, Math.min(amount / 6, 25), 0.5)

            player.perfectWave = false

            if(amount < 0) {
                if(!idolAlive) {
                    const popup = createPopupText('+'+DeBread.round(Math.abs(amount), 1), player.centerPos)
                    popup.style.color = 'lime'
                    popup.style.fontSize = '15px'
                    doge('area').append(popup)
    
                    if(amount <= -25) {
                        createParticles(player.centerPos, 10, 10, [25, 50], 500, 'ease-out', {backgroundColor: 'lime',zIndex: '5'})
                    }
                }
            }

            if(player.health <= 0) player.kill()

            updateArea()
        },

        kill: () => {
            if(player.alive && saveData.gameSettings.gamemode < 2) {
                player.elem.style.opacity = '0'
                doge('weapon').style.opacity = '0'
                createParticles(player.centerPos, 10, 25, [25,50], 2500, 'ease-out', {backgroundColor: 'red'})
                DeBread.easeShake(doge('area'), 25, 2, 0.05)
        
                for(let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        e.gameUpdateInterval += 25
                        doge('area').querySelectorAll('.enemy, .enemyProjectile').forEach(elem => {
                            elem.style.transition = `left linear ${e.gameUpdateInterval}ms, top linear ${e.gameUpdateInterval}ms`
                        })
        
                        if(i === 49) {
                            e.gameActive = false
                            e.gameUpdateInterval = 20

                            player.gameOverStats.accuracy = DeBread.round(player.bulletsHit / player.bulletsShot * 100, 2) + '%'
                            player.gameOverStats.damageGiven = DeBread.round(player.gameOverStats.damageGiven)
                            player.gameOverStats.damageTaken = DeBread.round(player.gameOverStats.damageTaken)

                            doge('gameOverContainer').style.display = 'flex'

                            for(const key in player.gameOverStats) {
                                doge(`go-${key}`).innerText = player.gameOverStats[key]
                            }

                            let displayedScore = 0
                            let displayedWave = 0
                            for(let i = 0; i < 100; i++) {
                                setTimeout(() => {
                                    const scoreDifference = player.score - displayedScore
                                    displayedScore += scoreDifference * 0.1

                                    doge('go-score').innerText = DeBread.round(displayedScore).toString().padStart(10,0)

                                    const waveDifference = player.wave - 1 - displayedWave
                                    displayedWave += waveDifference * 0.1

                                    doge('go-wave').innerText = DeBread.round(displayedWave).toString()

                                    if(i === 99) {
                                        doge('go-score').innerText = DeBread.round(player.score).toString().padStart(10,0)
                                        doge('go-wave').innerText = DeBread.round(player.wave - 1).toString()
                                    }
                                }, 25 * i);
                            }
                        }
                    }, i * 100);
                }
                player.alive = false
            }
        },

        melee: () => {
            if(e.gameUpdates - player.lastMeleeDate >= player.stats.melee.cooldown) {
                doge('meleeHitbox').style.animation = 'meleeHitboxHit 500ms ease-out 1 forwards'
                elems.enemies.forEach(enemy => {
                    if(isColliding(doge('meleeHitbox'), enemy) && enemy.active) {
                        enemy.damage(player.stats.melee.damage * player.stats.melee.damageMult)
                        player.damage(-player.stats.melee.heal)

                        getStyle(styles.punch)

                        if(player.stats.melee.explosionPower) {
                            createExplosion([...doge('meleeHitbox').pos], 50 + player.stats.melee.explosionPower, player.stats.melee.damage, 10, true)
                        }

                        if(player.tutorial.stage === 6) {
                            player.tutorial.goalValue++
                            updateTutorialGoal()
                        }
                    }
                })

                let projectileHit = false
                doge('area').querySelectorAll('.enemyProjectile').forEach(projectile => {
                    if(isColliding(doge('meleeHitbox'), projectile)) {
                        player.damage(-player.stats.player.parryHeal)
                        player.getPower(5)

                        if(projectile.parried) {
                            getStyle(styles.counterParry)
                        } else {
                            getStyle(styles.parry)
                        }
                        getCombo()

                        projectile.angle = Math.atan2(projectile.pos[1] - e.relCursorPos[1], projectile.pos[0] - e.relCursorPos[0])
                        projectile.speed *= 3
                        projectile.explosive = true
                        projectile.explosionSize = 100
                        projectile.canHitEnemy = true
                        projectile.parried = true

                        projectileHit = true

                        const parryEffect = document.createElement('div')
                        addStyles(parryEffect, {
                            position: 'absolute',
                            left: projectile.pos[0]+'px',
                            top: projectile.pos[1]+'px',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(255,255,255,0.5)',
                            width: '10px',
                            height: '10px',
                            translate: '-50% -50%',
                            zIndex: '0',
                            animation: 'parryEffect 250ms ease-out 1 forwards',
                        })

                        doge('area').append(parryEffect)
                        DeBread.playSound('audio/newParry.mp3', 0.1)

                        setTimeout(() => {
                            parryEffect.remove()
                        }, 250);

                        if(player.tutorial.stage === 7) {
                            player.tutorial.goalValue++
                            updateTutorialGoal()
                        }
                    }
                })
                doge('area').querySelectorAll('.supermagnet').forEach(magnet => {
                    if(isColliding(doge('meleeHitbox'), magnet)) {
                        magnet.destroy()
                    }
                })
                if(projectileHit) {
                    DeBread.pauseInterval(1)
                    DeBread.shake(doge('area'), 10, 5, 5, 250)
                    setTimeout(() => {
                        DeBread.pauseInterval(1)
                    }, 250);
                }

                player.lastMeleeDate = e.gameUpdates
            }
        },

        getPower: (amount, ignoreAnimation) => {
            const prevAmount = player.power
            let multiplier = 1
            if(amount > 0 && !isNaN(player.stats.player.powerGainMult)) multiplier = player.stats.player.powerGainMult
            player.power = Math.max(Math.min(player.power + amount * multiplier, 100), 0)

            doge('powerBarNum').innerHTML = DeBread.round(player.power)
            doge('powerBar').style.width = player.power+'%'

            if(player.powerItem) {
                if(player.power >= player.powerItem.charge) {
                    doge('powerItem').style.filter = 'grayscale(0)'
                } else {
                    doge('powerItem').style.filter = 'grayscale(1)'
                }
    
                if(!ignoreAnimation) {
                    if(prevAmount >= player.powerItem.charge && player.power < player.powerItem.charge) {
                        DeBread.shake(doge('powerItem'), 10, 5, 5, 100)
                        doge('powerItem').style.animation = 'none'
                    }
        
                    if(prevAmount < player.powerItem.charge && player.power >= player.powerItem.charge) {
                        doge('powerItem').style.animation = 'powerItemPulse 500ms ease-out 1 forwards'
                    }
                } else {
                    doge('powerItem').style.animation = 'none'
                }
            }
        },

        usePowerItem: () => {
            if(player.powerItem && player.canUsePowerItem) {
                let requirementPassed = true
                if(player.powerItem.requirement) {
                    if(!player.powerItem.requirement()) {
                        requirementPassed = false
                    }
                }
                if(player.power >= player.powerItem.charge && requirementPassed || saveData.gameSettings.gamemode === 2) {
                    player.powerItem.use()
                    player.getPower(-player.powerItem.charge, true)

                    doge('powerItem').style.animation = ''
                    requestAnimationFrame(() => {
                        doge('powerItem').style.animation = 'powerItemPulse 500ms ease-out 1 forwards'
                    })

                    if(player.tutorial.stage === 26) {
                        player.tutorial.goalValue++
                        updateTutorialGoal()
                    }
                }
            }
        },

        getMoney: (amount) => {
            player.money += amount

            doge('gameMoneyCount').innerText = '$'+formatNumber(Math.floor(player.money))
            doge('gameMoneyCount').style.setProperty('--moneyRot',DeBread.randomNum(-5,5)+'deg')
            doge('gameMoneyCount').style.setProperty('--moneyScale', 1 + Math.max(Math.min(amount / 50, 1), -0.1))
            doge('gameMoneyCount').style.animation = ''
            requestAnimationFrame(() => {
                doge('gameMoneyCount').style.animation = 'moneyPulse 500ms ease-out 1 forwards'
            })
        },

        updatePosition: () => {
            if(player.alive) {
                const elem = player.elem
        
                //Lock in-bounds
                if(player.pos[0] < 0) {
                    player.pos[0] = 0
                    player.vel[0] = 0
                    // player.dirVels = []
                }

                if(player.pos[1] < 0) {
                    player.pos[1] = 0
                    player.vel[1] = 1
                    // player.dirVels = []
                }

                if(player.pos[0] > doge('area').offsetWidth - player.elem.offsetWidth) {
                    player.pos[0] = doge('area').offsetWidth - player.elem.offsetWidth
                    player.vel[0] = 0
                    // player.dirVels = []
                }
                if(player.pos[1] > doge('area').offsetHeight - player.elem.offsetHeight) {
                    player.pos[1] = doge('area').offsetHeight - player.elem.offsetHeight
                    player.vel[1] = 0
                    // player.dirVels = []
                }

                //dirVels
                for(let i = 0; i < player.dirVels.length; i++) {
                    const dirVel = player.dirVels[i]
                    player.pos[0] += Math.cos(dirVel.angle) * dirVel.speed
                    player.pos[1] += Math.sin(dirVel.angle) * dirVel.speed

                    dirVel.speed /= dirVel.div
                    if(Math.abs(dirVel.speed) <= 0.1) {
                        player.dirVels.splice(i, 1)
                    }
                }

                addStyles(elem, {
                    left: DeBread.round(player.pos[0])+'px',
                    top: DeBread.round(player.pos[1])+'px',
                    width: player.stats.player.size+'px',
                    height: player.stats.player.size+'px',
                })

                doge('playerTexture').style.height = 74 * (player.stats.player.size / 36) + 'px'

                //Weapon position
        
                const angle = Math.atan2(e.cursorPos[1] - player.rectPos[1] - player.elem.offsetHeight / 2, e.cursorPos[0] - player.rectPos[0] - player.elem.offsetWidth / 2)
                const weapon = weapons[player.weapon]
                const cursorDisance = Math.sqrt(
                    Math.pow(player.rectPos[0] + player.elem.offsetWidth / 2 - e.cursorPos[0], 2)+
                    Math.pow(player.rectPos[1] + player.elem.offsetHeight / 2 - e.cursorPos[1], 2)
                ) + (weapon.textureSize[0] + weapon.textureSize[1])/2
        
        
                doge('weapon').pos = [
                    Math.max(Math.min(player.centerPos[0] + Math.cos(angle) * Math.min(cursorDisance / 2, 50), doge('area').offsetWidth), 0),
                    Math.max(Math.min(player.centerPos[1] + Math.sin(angle) * Math.min(cursorDisance / 2, 50), doge('area').offsetHeight), 0)
                ]

                addStyles(doge('weapon'), {
                    left: doge('weapon').pos[0]+'px',
                    top: doge('weapon').pos[1]+'px'
                })

                doge('meleeHitbox').pos = [...doge('weapon').pos]
                doge('meleeHitbox').style.left = doge('meleeHitbox').pos[0]+'px'
                doge('meleeHitbox').style.top = doge('meleeHitbox').pos[1]+'px'

                if(player.pos[0] + player.elem.offsetWidth / 2 > doge('weapon').pos[0]) {
                    doge('weapon').style.transform = 'scale(1, -1)'
                    doge('weapon').style.rotate = angle + 'rad'
                } else {
                    doge('weapon').style.transform = 'scale(1, 1)'
                    doge('weapon').style.rotate = angle + 'rad'
                }

                //Melee hitbox
                addStyles(doge('meleeHitbox'), {
                    width: player.stats.melee.size+'px',
                    height: player.stats.melee.size+'px'
                })

                //Graze Hitbox

                addStyles(doge('grazeHitbox'), {
                    left: player.centerPos[0]+'px',
                    top: player.centerPos[1]+'px',
                    width: player.stats.player.size * player.stats.player.grazeSize + 'px',
                    height: player.stats.player.size * player.stats.player.grazeSize + 'px'
                })

                if(player.stats.player.contactDamage) {
                    elems.enemies.forEach(enemy => {
                        if(isColliding(player.elem, enemy)) {
                            enemy.damage(player.stats.player.contactDamage)
                            if(!enemy.alive) {
                                getStyle(styles.trampled)
                            }
                        }
                    })
                }
            }
        }

    }
}
let player = createPlayer()

const elems = {
    enemies: [],
    pickups: [],
}

function startGame() {
    doge('gameOverContainer').style.display = 'none'

    e.gameActive = true
    e.gameUpdates = 0
    player.pos[0] = doge('area').offsetWidth / 2 - player.elem.offsetWidth / 2
    player.pos[1] = doge('area').offsetHeight / 2 - player.elem.offsetWidth / 2

    player = createPlayer()
    player.elem.style.opacity = '1'
    doge('weapon').style.opacity = '1'
    player.characterWeapon = characters[saveData.selectedCharacter].weapon
    doge('gameWeaponName').innerText = characters[saveData.selectedCharacter].weapon.name

    doge('area').querySelectorAll('.enemy').forEach(enemy => {enemy.remove()})
    elems.enemies = []
    doge('area').querySelectorAll('.pickup').forEach(pickup => {pickup.remove()})
    elems.pickups = []
    doge('area').querySelectorAll('.bullet').forEach(bullet => {bullet.remove()})
    doge('area').querySelectorAll('.enemyProjectile').forEach(bullet => {bullet.remove()})
    doge('area').querySelectorAll('.portal').forEach(portal => {portal.remove()})
    
    doge('gameWaveCounter').innerText = '0'
    doge('gameStyleContainer').innerHTML = ''

    doge('gameShopUpgradesButtons').style.opacity = '1'
    doge('gameShopUpgradesButtons').style.pointerEvents = 'unset'

    renderStats()
    updateArea()
    updateShopTab()
    if(saveData.gameSettings.gamemode === 3) {
        modifyStat(['melee','size'], '=0')
        modifyStat(['melee','damage'],'=0')
        modifyStat(['ammo','garandReload'], '=true')
    } else {
        characters[saveData.selectedCharacter].weapon.apply()
        if(characters[saveData.selectedCharacter].applyStats) {
            characters[saveData.selectedCharacter].applyStats()
        }
    }

    challenges[saveData.selectedChallenge].apply()

    let playerSrc = saveData.selectedCharacter
    if(saveData.selectedSkin > -1) {
        playerSrc = characters[saveData.selectedCharacter].skins[saveData.selectedSkin].src
    }

    doge('playerTexture').src = `graphics/characters/${playerSrc}.png`
    
    addStyles(doge('weaponTexture'), {
        width: characters[saveData.selectedCharacter].weapon.textureSize[0]*2+'px',
        height: characters[saveData.selectedCharacter].weapon.textureSize[1]*2+'px'
    })

    if(saveData.gameSettings.gamemode === 2) {
        doge('gameSandboxContainer').style.display = 'flex'
        doge('gameRunInfo').style.display = 'none'
    } else {
        doge('gameSandboxContainer').style.display = 'none'
        doge('gameRunInfo').style.display = 'flex'
    }

    doge('weaponTexture').src = `graphics/weapons/${characters[saveData.selectedCharacter].weapon.name.toLowerCase().replaceAll(' ','_')}.png`
    doge('gameMoneyCount')

    if(saveData.selectedChallenge === 'abstract') {
        area.createNotice('Things are getting weird!')
    }

    if(saveData.gameSettings.gamemode === 3) {
        doge('tutorialist').style.display = 'unset'
        doge('tutorialistDialogueContainer').style.display = 'flex'
        progressTutorial()

        player.canUsePowerItem = false
        tutorialistInterval = setInterval(() => {
            const shadow = document.createElement('div')
            shadow.style.setProperty('--shadowX',DeBread.randomNum(-25,25)+'px')
            shadow.style.setProperty('--shadowY',DeBread.randomNum(-25,25)+'px')
            shadow.classList.add('tutorialistShadow')
            addStyles(shadow, {
                width: doge('tutorialist').offsetWidth+'px',
                height: doge('tutorialist').offsetHeight+'px',
            })

            doge('tutorialist').append(shadow)

            setTimeout(() => {
                shadow.remove()
            }, 1000);
        }, 100);
    } else {
        doge('tutorialist').style.display = 'none'
        doge('tutorialistDialogueContainer').style.display = 'none'
        clearInterval(tutorialistInterval)
    }

    updateUI()
}

const bulletBase = document.createElement('div')
bulletBase.classList.add('bullet')

const materBase = document.createElement('img')
materBase.src = 'graphics/mater.gif'

const weapons = {
    gun: {
        name: 'Gun',
        desc: 'Medium ranged projectile weapon of unknown origin. <br> Left Click: Fire',
        textureSize: [11,7],

        leftClick: () => {
            const cursorDist = Math.sqrt(Math.pow(player.centerPos[0] - e.relCursorPos[0],2) + Math.pow(player.centerPos[1] - e.relCursorPos[1],2)) / 100
            if(
                player.stats.ammo.current > 0 && 
                !player.stats.ammo.isReloading && 
                (e.gameUpdates - player.stats.bullet.lastShotDate) * e.gameUpdateInterval > player.stats.bullet.shotCooldown
            ) {
                const weaponPos = [ //I have to use meleeHitbox instead of weapon.pos because idk
                    doge('meleeHitbox').getBoundingClientRect().left + doge('meleeHitbox').offsetWidth / 2 - doge('area').getBoundingClientRect().left, 
                    doge('meleeHitbox').getBoundingClientRect().top + doge('meleeHitbox').offsetHeight / 2 - doge('area').getBoundingClientRect().top
                ]
                const bulletAngle = Math.atan2(
                    weaponPos[1] - DeBread.randomNum(
                        e.relCursorPos[1] - player.stats.bullet.accuracy / 2 * cursorDist, 
                        e.relCursorPos[1] + player.stats.bullet.accuracy / 2 * cursorDist
                    ), 
                    weaponPos[0] - DeBread.randomNum(
                        e.relCursorPos[0] - player.stats.bullet.accuracy / 2 * cursorDist, 
                        e.relCursorPos[0] + player.stats.bullet.accuracy / 2 * cursorDist
                    )
                )
                
                DeBread.playSound('audio/shoot.mp3', 0.25, DeBread.randomNum(0.95,1.05,5), false)

                if(player.tutorial.stage === 1) {
                    player.tutorial.goalValue++
                    updateTutorialGoal()
                }
                
                for(let i = 0; i < player.stats.bullet.multishot; i++) {
                    if(player.stats.ammo.current > 0) {
                        player.dirVels.push({angle: bulletAngle, speed: player.stats.bullet.recoil, div: 1.25})
                        const bulletPos = [...weaponPos]
                        player.stats.ammo.current--
    
                        const t = (i - (DeBread.round(player.stats.bullet.multishot) - 1) / 2)
                        const offset = (t / DeBread.round(player.stats.bullet.multishot)) * Math.PI / 12
                        
                        player.createBullet(bulletPos, bulletAngle + offset)

                        
                        if(player.health > 1) {
                            player.damage(player.stats.bullet.thornDamage, true)
                        }
                        
                        player.bulletsShot++
                    } else break
                }

                for(let i = 0; i < player.stats.bullet.multishot; i++) {
                    document.querySelectorAll('.wisp').forEach(wisp => {
                        const angle = Math.atan2(
                            wisp.pos[1] - DeBread.randomNum(
                                e.relCursorPos[1] - player.stats.bullet.accuracy / 2 * cursorDist, 
                                e.relCursorPos[1] + player.stats.bullet.accuracy / 2 * cursorDist
                            ), 
                            wisp.pos[0] + doge('weapon').offsetWidth / 2 - DeBread.randomNum(
                                e.relCursorPos[0] - player.stats.bullet.accuracy / 2 * cursorDist, 
                                e.relCursorPos[0] + player.stats.bullet.accuracy / 2 * cursorDist
                            ) 
                        )
                        player.createBullet([...wisp.pos], angle, {damage: player.stats.bullet.damage / 2})
                    })
                    updateUI()
                    player.stats.bullet.lastShotDate = e.gameUpdates
                }
            } else {
                DeBread.playSound('audio/noAmmo.mp3', 0.5)
            }
        },

        r: () => {
            function reload() {

                player.stats.ammo.isReloading = true
                player.stats.ammo.reloadDate = e.gameUpdates
                
                if(player.stats.ammo.reloadSpeed <= 1000) {
                    DeBread.playSound('audio/reload-full.mp3', 0.1, 1000 / player.stats.ammo.reloadSpeed, false)
                } else {
                    DeBread.playSound('audio/reload-full.mp3', 0.1)
                }
            }
            if(!player.stats.ammo.isReloading && player.stats.ammo.current < player.stats.ammo.max) {
                if(player.stats.ammo.garandReload) {
                    if(player.stats.ammo.current === 0) {
                        reload()
                    } else {
                        DeBread.playSound('audio/noAmmo.mp3', 0.5)
                    }
                } else {
                    reload()
                }
            }
        }
    },
    //Weapons below are unused.
    wand: {
        name: 'Wand',
        desc: 'Stolen from some wierd cat guy... <br> Left Click: Summon Explosion',
        textureSize: [11,7],
        ammoChar: '💥',

        leftClick: () => {
            if(
                player.stats.ammo.current > 0 &&
                !player.stats.ammo.isReloading && 
                (e.gameUpdates - player.stats.bullet.lastShotDate) * e.gameUpdateInterval > player.stats.bullet.shotCooldown
            ) {
                createExplosion(e.relCursorPos, player.stats.bullet.size, player.stats.bullet.damage, player.stats.bullet.knockback)

                player.stats.bullet.lastShotDate = e.gameUpdates
                player.stats.ammo.current--
                updateUI()
            }
        },

        r: () => {
            if(!player.stats.ammo.isReloading && player.stats.ammo.current < player.stats.ammo.max) {
                player.stats.ammo.isReloading = true
                player.stats.ammo.reloadDate = e.gameUpdates
                
                if(player.stats.ammo.reloadSpeed <= 1000) {
                    DeBread.playSound('audio/reload-full.mp3', 0.1, 1000 / player.stats.ammo.reloadSpeed, false)
                } else {
                    DeBread.playSound('audio/reload-full.mp3', 0.1)
                }
            }
        }
    },
    mater: {
        name: 'Mater',
        desc: 'Splat',
        textureSize: [11,7],
        ammoChar: '🍅',

        leftClick: () => {
            if(player.stats.ammo.current > 0 && !player.stats.ammo.isReloading) {
                const mater = materBase.cloneNode()
                mater.src = `graphics/mater.gif?t=${performance.now()}`
                mater.pos = [e.relCursorPos[0],e.relCursorPos[1]]
                addStyles(mater, {
                    left: e.cursorPos[0] - 50 + 'px',
                    top: e.cursorPos[1] - 60 + 'px',
                    width: '100px',
                    position: 'absolute',
                    zIndex: '5',
                    pointerEvents: 'none',
                })
    
                document.body.append(mater)
    
                setTimeout(() => {
                    mater.remove()
                    
                    createPoisonField(mater.pos, 50, 25, 25, 10, false, [255,50,50])
                    createParticles(mater.pos, 10, 10, [0,50],500,'ease-out',{backgroundColor: 'red'})
    
                    DeBread.playSound('audio/splat.mp3', 0.1)
                }, 4000);

                player.stats.ammo.current--
                updateUI()
            }
        },

        r: () => {
            if(!player.stats.ammo.isReloading && player.stats.ammo.current < player.stats.ammo.max) {
                player.stats.ammo.isReloading = true
                player.stats.ammo.reloadDate = e.gameUpdates
                
                if(player.stats.ammo.reloadSpeed <= 1000) {
                    DeBread.playSound('audio/reload-full.mp3', 0.1, 1000 / player.stats.ammo.reloadSpeed, false)
                } else {
                    DeBread.playSound('audio/reload-full.mp3', 0.1)
                }
            }
        }
    }
}

const area = {
    createNotice: content => {
        const notice = document.createElement('div')
        notice.classList.add('areaNotice')
        notice.innerHTML = content

        doge('noticeContainer').append(notice)

        setTimeout(() => {
            notice.style.animation = 'none'
            setTimeout(() => {
                notice.style.animation = 'noticeOut 500ms ease-in 1 forwards'
                setTimeout(() => {
                    notice.remove()
                }, 500);
            }, 2000);
        }, 500);
    }
}

let lastConsumables = []
function updateUI() {
    if(player.health <= 0) player.health = 0
    if(player.health >= player.stats.player.maxHealth) player.health = player.stats.player.maxHealth

    doge('healthBar').style.width = player.health / player.stats.player.maxHealth * 100 + '%'
    doge('healthBarNum').innerHTML = formatNumber(Math.ceil(player.health))

    if(player.powerItem) {
        doge('lowerPowerBar').style.width = player.powerItem.charge + '%'
        doge('powerItem').src = `graphics/powerItems/${player.powerItem.name.toLowerCase().replaceAll(' ','_')}.png`
        doge('powerItem').style.opacity = '1'
        doge('powerItemContainer').style.width = 'unset'
        doge('gameTopLeft').style.gap = '25px'
    } else {
        doge('lowerPowerBar').style.width = '0%'
        doge('powerItem').src = `graphics/placeholder.png`
        doge('powerItem').style.opacity = '0'
        doge('powerItemContainer').style.width = '0px'
        doge('gameTopLeft').style.gap = '0px'
    }
    doge('powerBarNum').innerText = DeBread.round(player.power)

    //Ammo
    if(!player.stats.ammo.isReloading) {
        doge('gameInnerAmmoBar').style.width = player.stats.ammo.current / player.stats.ammo.max * 100 + '%'
        doge('gameAmmoCount').innerText = player.stats.ammo.current.toString().padStart(2,'0')


        doge('gameAmmoLinesCurrent').innerText = player.characterWeapon.ammoChar.repeat(Math.min(player.stats.ammo.current, 100))
        doge('gameAmmoLinesMax').innerText = player.characterWeapon.ammoChar.repeat(Math.min(player.stats.ammo.max, 100) - Math.min(player.stats.ammo.current, 100))
    }

    //Consumables
    if(lastConsumables !== player.consumables) {
        doge('consumablesContainer').innerHTML = ''
        for(const key in player.consumables) {
            const img = document.createElement('img')
            img.src = `../graphics/consumables/${player.consumables[key]}.png`
            img.use = consumables[player.consumables[key]].use
            img.classList.add('gameConsumable')
            doge('consumablesContainer').append(img)
        }
        lastConsumables = player.consumables
    }
        
} updateUI()

function updateArea() {
    doge('area').style.width = player.stats.misc.areaSize + 'px'
    doge('area').style.height = player.stats.misc.areaSize + 'px'

    if(player.health / player.stats.player.maxHealth <= 0.25) {
        doge('area').style.boxShadow = 'inset 0px 0px 25px red'
    } else {
        doge('area').style.boxShadow = 'inset 0px 0px 0px red'
    }
}

let lastTickDate = 0
const updateInterval = DeBread.createInterval(() => {    
    //Player movement
    if(e.gameActive) {
        if(e.keysDown.includes('w') || e.keysDown.includes('arrowup')) {
            if(Math.abs(player.vel[1] - player.stats.player.speedStep) < player.stats.player.speed) {
                player.vel[1] -= player.stats.player.speedStep
            } else {
                player.vel[1] = -player.stats.player.speed
            }
        } else if(e.keysDown.includes('s') || e.keysDown.includes('arrowdown')) {
            if(Math.abs(player.vel[1] + player.stats.player.speedStep) < player.stats.player.speed) {
                player.vel[1] += player.stats.player.speedStep
            } else {
                player.vel[1] = player.stats.player.speed
            }
        } else {
            if(player.vel[1] !== 0) {
                const sign = Math.sign(player.vel[1])
                player.vel[1] -= player.stats.player.speedStep * sign
                
                if(Math.sign(player.vel[1]) !== sign) {
                    player.vel[1] = 0
                }
            }
        }

        if(e.keysDown.includes('a') || e.keysDown.includes('arrowleft')) {
            if(Math.abs(player.vel[0] - player.stats.player.speedStep) < player.stats.player.speed) {
                player.vel[0] -= player.stats.player.speedStep
            } else {
                player.vel[0] = -player.stats.player.speed
            }
        } else if(e.keysDown.includes('d') || e.keysDown.includes('arrowright')) {
            if(Math.abs(player.vel[0] + player.stats.player.speedStep) < player.stats.player.speed) {
                player.vel[0] += player.stats.player.speedStep
            } else {
                player.vel[0] = player.stats.player.speed
            }
        } else {
            if(player.vel[0] !== 0) {
                const sign = Math.sign(player.vel[0])
                player.vel[0] -= player.stats.player.speedStep * sign
                
                if(Math.sign(player.vel[0]) !== sign) {
                    player.vel[0] = 0
                }
            }
        }

        player.pos[0] += player.vel[0]
        player.pos[1] += player.vel[1]
    
        if(Math.abs(player.vel[0]) > 0 || Math.abs(player.vel[1]) > 0) {
            if(e.gameUpdates - player.lastDustParticle > 2) {
                createParticles([DeBread.randomNum(player.pos[0], player.pos[0] + player.elem.offsetWidth),DeBread.randomNum(player.pos[1], player.pos[1] + player.elem.offsetHeight)], 1, 10, [0,10],750,'ease-out',{backgroundColor: 'rgb(100,100,100,0.25)'})
                player.lastDustParticle = e.gameUpdates
            }
        } else {
            if(player.stats.ammo.isReloading) {
                player.stats.ammo.reloadDate -= player.stats.ammo.stillSpeedIncrease
            }
        }
        
        player.updatePosition()
        player.centerPos = [player.pos[0] + player.elem.offsetWidth / 2, player.pos[1] + player.elem.offsetHeight / 2]
        player.rectPos = [player.elem.getBoundingClientRect().left,player.elem.getBoundingClientRect().top]

        //Player looking directions
        if (e.cursorPos[1] < player.rectPos[1] && e.cursorPos[0] < player.rectPos[0]) {
            doge('playerTexture').style.translate =`${152 * (player.stats.player.size / 36)}px 0px`
        } else if (e.cursorPos[1] < player.rectPos[1] && e.cursorPos[0] > player.rectPos[0] + player.elem.offsetWidth) {
            doge('playerTexture').style.translate = `${76 * (player.stats.player.size / 36)}px 0px`
        } else if (e.cursorPos[1] > player.rectPos[1] + player.elem.offsetHeight && e.cursorPos[0] < player.rectPos[0]) {
            doge('playerTexture').style.translate = `${-76 * (player.stats.player.size / 36)}px 0px`
        } else if (e.cursorPos[1] > player.rectPos[1] + player.elem.offsetHeight && e.cursorPos[0] > player.rectPos[0] + player.elem.offsetWidth) {
            doge('playerTexture').style.translate = `${-152 * (player.stats.player.size / 36)}px 0px`
        } else if (e.cursorPos[1] < player.rectPos[1]) {
            doge('playerTexture').style.translate = `${114 * (player.stats.player.size / 36)}px 0px`
        } else if (e.cursorPos[0] < player.rectPos[0]) {
            doge('playerTexture').style.translate = `${38 * (player.stats.player.size / 36)}px 0px`
        } else if (e.cursorPos[0] > player.rectPos[0] + player.elem.offsetWidth) {
            doge('playerTexture').style.translate = `${-38 * (player.stats.player.size / 36)}px 0px`
        } else if (e.cursorPos[1] > player.rectPos[1] + player.elem.offsetWidth) {
            doge('playerTexture').style.translate = `${-114 * (player.stats.player.size / 36)}px 0px`
        } else {
            doge('playerTexture').style.translate = `${0 * (player.stats.player.size / 36)}px 0px`
        }

        //304
        //266
        //228
        //190
        //152
        //114
        //76
        //38
        //0
    
        //Reload
        if(player.stats.ammo.isReloading) {
            doge('gameInnerAmmoBar').style.transition = `width linear ${e.gameUpdateInterval}ms`
            doge('gameAmmoCount').innerText = 'RELOADING...'
            doge('gameAmmoLinesCurrent').innerText = ''
            doge('gameAmmoLinesMax').innerText = ''
            let reloadProgress = ((e.gameUpdates - player.stats.ammo.reloadDate) * e.gameUpdateInterval) / player.stats.ammo.reloadSpeed
            if(reloadProgress > 1) {
                player.stats.ammo.isReloading = false
                player.stats.ammo.current = player.stats.ammo.max
                DeBread.shake(doge('gameAmmo'), e.gameUpdateInterval, 6.7, 0, 100,)
                DeBread.playSound('audio/reload-long-end.mp3',0.25)
                
                if(player.tutorial.stage === 2) {
                    player.tutorial.goalValue++
                    updateTutorialGoal()
                }
                
                updateUI()
            }
            doge('gameInnerAmmoBar').style.width = reloadProgress * 100 + '%'
            doge('cursorAmmoBar').style.width = reloadProgress * 100 + '%'
        } else {
            doge('gameInnerAmmoBar').style.transition = `none`
        }

        //Melee Recharge
        if((e.gameUpdates - player.lastMeleeDate) / player.stats.melee.cooldown < 1) {
            doge('innerMeleeHitbox').style.scale = (e.gameUpdates - player.lastMeleeDate) / player.stats.melee.cooldown
            doge('innerMeleeHitbox').style.opacity = '1'
            doge('meleeHitbox').style.outline = '0px solid rgb(255,255,255,0)'
        } else {
            doge('innerMeleeHitbox').style.opacity = '0'
            doge('meleeHitbox').style.outline = '1px solid rgb(255,255,255,0.25)'
            doge('meleeHitbox').style.animation = 'none'
        }

        //Update bullet positions
        doge('area').querySelectorAll('.bullet').forEach(bullet => {bullet.updatePosition(elems.enemies)})

        //Autofire
        if(
            player.stats.ammo.autoFire && 
            e.mouseDown[0] &&
            player.stats.ammo.current > 0 && 
            !player.stats.ammo.isReloading && 
            (e.gameUpdates - player.stats.bullet.lastShotDate) * e.gameUpdateInterval > player.stats.bullet.shotCooldown &&
            !isHoveringOnSandbox &&
            !sandBoxEnemy
        ) {
            if(player.stats.ammo.stationaryFire) {
                if(player.vel[0] === 0 && player.vel[1] === 0) {
                    weapons[player.weapon].leftClick()
                }
            } else {
                weapons[player.weapon].leftClick()
            }
        }

        if(player.stats.ammo.stationaryFire && (player.vel[0] !== 0 || player.vel[1] !== 0)) {
            doge('gameAmmoContainer').style.color = 'grey'
        } else {
            doge('gameAmmoContainer').style.color = 'white'
        }

        //Update enemies and thier projectiles
        elems.enemies.forEach(enemy => {
            if((e.gameUpdates - enemy.spawnDate) * e.gameUpdateInterval > enemy.spawnTime && !enemy.active) {
                enemy.init()
            }

            if(enemy.active) {
                if(enemy.move) enemy.move()

                if(enemy.hasProjectiles) {
                    if((e.gameUpdates - enemy.lastShotDate) * e.gameUpdateInterval >= enemy.shotCooldown / player.stats.enemy.speedMult) {
                        enemy.shoot()
                    }
                }
            }

            if(isColliding(enemy, doge('weapon')) && player.stats.player.weaponContactDamage > 0) {
                enemy.damage(player.stats.player.weaponContactDamage)
            }

            if(doge('area').querySelectorAll('.tennisBall').length > 0) {
                doge('area').querySelectorAll('.tennisBall').forEach(ball => {
                    if(isColliding(enemy, ball) && enemy.active) {
                        enemy.damage(10)
                    }
                })
            }
        })

        doge('area').querySelectorAll('.enemyProjectile').forEach(projectile => {
            projectile.pos[0] -= Math.cos(projectile.angle) * projectile.speed * player.stats.enemy.speedMult
            projectile.pos[1] -= Math.sin(projectile.angle) * projectile.speed * player.stats.enemy.speedMult

            if(projectile.explosive && e.gameUpdates % 5 === 0) {
                createParticles(
                    [projectile.pos[0],projectile.pos[1]],
                    2,
                    10,
                    [10,25],
                    250,
                    'ease-out',
                    {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`}
                )
            }

            if(projectile.canHitEnemy) {
                elems.enemies.forEach(enemy => {
                    if(isColliding(enemy, projectile) && enemy.active) {
                        enemy.damage(projectile.damage)
                        projectile.destroy()
                    }
                })
            }

            if(
                projectile.pos[0] >= doge('area').offsetWidth ||
                projectile.pos[1] >= doge('area').offsetHeight ||
                projectile.pos[0] <= 0 ||
                projectile.pos[1] <= 0 || 
                isColliding(projectile, projectile.target.elem)
            ) {
                projectile.destroy()
            }

            if(isColliding(doge('grazeHitbox'), projectile) && e.gameUpdates - player.lastGrazeDate >= player.stats.player.grazeCooldown && player.power < 100) {
                player.getPower(1)
                getStyle(styles.grazed)
                doge('grazeHitbox').style.animation = 'none'
                requestAnimationFrame(() => {
                    doge('grazeHitbox').style.animation = 'grazeHitboxFlash 250ms ease-out 1 forwards'
                })

                if(player.tutorial.stage === 24 && player.tutorial.goalValue < 15) {
                    player.tutorial.goalValue++
                    updateTutorialGoal()
                }

                player.lastGrazeDate = e.gameUpdates
                DeBread.playSound('audio/graze.wav',0.1,1 + Math.max(player.power / 200, 0))
            }

            if(isColliding(doge('meleeHitbox'), projectile) && e.gameUpdates - player.lastMeleeDate >= player.stats.melee.cooldown) {
                projectile.style.outline = '2px solid white'
            } else {
                projectile.style.outline = '2px solid black'
            }

            addStyles(projectile, {
                left: projectile.pos[0]+'px',
                top: projectile.pos[1]+'px'
            })

            if(projectile.parried) {
                createParticles(projectile.pos, 1, projectile.size, [0,5], 1000, 'ease-out', {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`})
            }

            if(document.querySelectorAll('.supermagnet').length > 0) {
                doge('area').querySelectorAll('.supermagnet').forEach(magnet => {
                    const angle = Math.atan2(
                        projectile.pos[1] - magnet.pos[1],
                        projectile.pos[0] - magnet.pos[0]
                    )
    
                    let delta = angle - projectile.angle
    
                    delta = Math.atan2(Math.sin(delta), Math.cos(delta))
    
                    projectile.angle += delta * 0.05

                    const dis = Math.sqrt(
                        Math.pow(projectile.pos[0] - magnet.pos[0],2) + 
                        Math.pow(projectile.pos[1] - magnet.pos[1],2)
                    )

                    if(dis <= 100) {
                        projectile.speed /= 1.01
                    }
                })
            }
        })

        //Waves
        if((e.gameUpdates - player.lastWaveDate) * e.gameUpdateInterval >= player.stats.misc.waveInterval && !player.wavesPaused && saveData.gameSettings.gamemode < 2 && player.alive) {
            spawnWave(player.wave)
            doge('gameWaveCounter').innerText = player.wave

            doge('gameWaveCounter').style.animation = 'none'
            requestAnimationFrame(() => {
                doge('gameWaveCounter').style.animation = 'wavePulse 1s ease-out 1 forwards'
            })

            doge('gameWaveShopCounter').innerText = `${4 - player.wave % 5} waves until shop`
            player.lastWaveDate = e.gameUpdates
            player.wave++

            if(player.wave % 5 === 0) {
                player.wavesPaused = true
            }
        }
        doge('gameInnerWaveBar').style.width = (e.gameUpdates - player.lastWaveDate) * e.gameUpdateInterval / player.stats.misc.waveInterval * 100 + '%'

        //Pickups
        const pickups = [...doge('area').querySelectorAll('.pickup')];
        pickups.forEach(pickup => {
            const distance = Math.sqrt(
                Math.pow(pickup.pos[0] - player.centerPos[0], 2) + 
                Math.pow(pickup.pos[1] - player.centerPos[1], 2)
            )

            const angle = Math.atan2(
                pickup.pos[1] - player.centerPos[1],
                pickup.pos[0] - player.centerPos[0]
            )

            pickup.pos[0] -= Math.cos(angle) / (distance / 100) * player.stats.player.pickupRange
            pickup.pos[1] -= Math.sin(angle) / (distance / 100) * player.stats.player.pickupRange

            if(isColliding(player.elem, pickup)) {
                if(pickup.live) {
                    pickup.action(pickup.value)
                    pickup.destroy()
                    DeBread.playSound(`audio/money${DeBread.randomNum(0,3)}.mp3`,0.5, DeBread.randomNum(0.9,1.1,3), false)
                }
            }

            pickup.move()
        })
    }

    //Cursor
    addStyles(doge('crosshair'), {
        left: e.cursorPos[0]+'px',
        top: e.cursorPos[1]+'px'
    })
    
    const cursorDist = Math.sqrt(Math.pow(player.centerPos[0] - e.relCursorPos[0],2) + Math.pow(player.centerPos[1] - e.relCursorPos[1],2))

    addStyles(doge('innerCrosshair'), {
        width: player.stats.bullet.accuracy * cursorDist / 100+'px',
        height: player.stats.bullet.accuracy * cursorDist / 100+'px'
    })

    addStyles(doge('cursorBars'), {
        left: e.cursorPos[0] - doge('cursorBars').offsetWidth / 2 +'px',
        top: e.cursorPos[1] - 25 +'px',
        transition: `left linear ${e.gameUpdateInterval}ms, top linear ${e.gameUpdateInterval}ms`
    })

    if(!player.stats.ammo.isReloading) {
        doge('cursorAmmoBar').style.width = player.stats.ammo.current / player.stats.ammo.max * 100 + '%'
    }

    if(player.stats.ammo.chargeShot) {
        if(player.isCharging) {
            doge('cursorCooldownBar').style.width = (e.gameUpdates - player.chargeStartDate) / player.stats.ammo.chargeTime * 100 + '%'
        } else {
            doge('cursorCooldownBar').style.width = '0'
        }
        if((e.gameUpdates - player.chargeStartDate) / player.stats.ammo.chargeTime >= 1) {
            doge('cursorCooldownBar').style.backgroundColor = 'yellow'
        } else {
            doge('cursorCooldownBar').style.backgroundColor = 'white'
        }
    } else {
        doge('cursorCooldownBar').style.width = ((e.gameUpdates - player.stats.bullet.lastShotDate) * e.gameUpdateInterval / player.stats.bullet.shotCooldown) * 100 + '%'
    }

    //Poison fields
    doge('area').querySelectorAll('.poisonField').forEach(field => {
        if(e.gameUpdates - field.lastTick >= field.tickRate) {            
            if(field.circular) {
                // const distance = Math.sqrt(Math.pow(player.centerPos[0] - field.pos[0],2)+Math.pow(player.centerPos[0] - field.pos[0],2))
                // if(distance <= field.size / 2 && e.gameUpdates - field.lastTick >= field.tickRate) {
                //     player.damage(field.damage)
    
                //     field.lastTick = e.gameUpdates
                // }
    
                // doge('area').querySelectorAll('.enemy').forEach(enemy => {
                //     const EnemyDistance = Math.sqrt(Math.pow((enemy.pos[0] + enemy.size / 2) - field.pos[0],2)+Math.pow((enemy.pos[1] + enemy.size / 2) - field.pos[0],2))
    
                //     if(EnemyDistance <= field.size / 2 && e.gameUpdates - field.lastTick >= field.tickRate) {
                //         enemy.damage(field.damage)
    
                //         field.lastTick = e.gameUpdates
                //     }
                // })
            } else {
                if(isColliding(player.elem, field) && e.gameUpdates - field.lastTick >= field.tickRate) {
                    player.damage(field.damage)
    
                    field.lastTick = e.gameUpdates
                }
    
                elems.enemies.forEach(enemy => {
                    let enemyHit = false
                    if(isColliding(enemy, field) && e.gameUpdates - field.lastTick >= field.tickRate && enemy.active) {
                        enemy.damage(field.damage)
                        if(!enemy.alive) {
                            getStyle(styles.poisoned)
                        }

                        const popup = createPopupText(DeBread.round(field.damage), [enemy.pos[0] + enemy.size / 2, enemy.pos[1] + enemy.size / 2])
                        addStyles(popup, {
                            color: 'red'
                        })
                        doge('area').append(popup)
    
                        enemyHit = true
                    }
                })
            }
            field.lastTick = e.gameUpdates
            field.ticks++

            if(field.ticks >= field.maxTicks) {
                field.remove()
            }
        }
    })

    //Status Effects
    doge('statusEffectContainer').innerHTML = ''
    for(const key in player.statusEffects) {
        const statusEffect = player.statusEffects[key]
        statusEffect.duration--

        if(statusEffect.duration <= 0) {
            statusEffect.end()
            player.statusEffects.splice(key, 1)
        }

        const statusEffectIcon = document.createElement('div')
        statusEffectIcon.classList.add('statusEffect')
        statusEffectIcon.innerHTML = `
            <div class="statsEffectOverlay" style="height:${100 - statusEffect.duration / statusEffect.maxDuration * 100}%"></div>
            <img src="graphics/statusEffects/${statusEffect.class}.png">
        `

        doge('statusEffectContainer').append(statusEffectIcon)
    }

    //Fire
    document.querySelectorAll('.fire').forEach(fire => {
        if(isColliding(fire, player.elem)) {
            for(const statusEffect of player.statusEffects) {
                if(statusEffect.class === 'fire') {
                    statusEffect.duration = statusEffect.maxDuration
                }
            }
            if(!player.onFire) {                
                player.statusEffects.push({
                    duration: 100,
                    maxDuration: 100,
                    class: 'fire',
                    
                    end: () => {
                        player.onFire = false;
                    }
                })
                player.onFire = true
            }
        }
    })

    if(player.onFire) {
        player.damage(0.1)
        createParticles(
            [...player.centerPos],
            2,
            10,
            [25,50],
            250,
            'ease-out',
            {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`, opacity: '0.5'}
        )

        player.crispiness++
        
        doge('playerFire').style.opacity = '0.75'
    } else {
        doge('playerFire').style.opacity = '0'
        player.crispiness = 0        
    }

    //Special enemies
    let leechAlive = false
    for(const enemy of elems.enemies) {
        if(enemy.data.name === 'Leech' && enemy.active) {
            leechAlive = true
            break
        }
    }

    let idolAlive = false
    for(const enemy of elems.enemies) {
        if(enemy.data.name === 'Idol' && enemy.active) {
            idolAlive = true
            break
        }
    }

    if(idolAlive) {
        doge('healthBarContainer').style.filter = 'grayscale(1)'
    } else {
        doge('healthBarContainer').style.filter = ''
    }

    if(leechAlive && e.gameUpdates % 5 === 0 && player.health > 10) {
        player.damage(1, true)
    }

    //Portal
    document.querySelectorAll('.portal').forEach(portal => {
        createParticles(
            [
                DeBread.randomNum(portal.pos[0] - portal.offsetWidth / 2, portal.pos[0] + portal.offsetHeight / 2),
                DeBread.randomNum(portal.pos[1] - portal.offsetWidth / 2, portal.pos[1] + portal.offsetHeight / 2)
            ]
            , 1, 10, [25, 100], 1000, 'ease-in', 
            {
                backgroundColor: 'white',
                opacity: '0.1'
            }
        )

        if(isColliding(player.elem, portal) && !player.inPortal) {
            portal.style.width = window.innerWidth + 'px'
            portal.style.height = window.innerHeight + 'px'
            portal.style.border = '1px solid black'
            player.elem.style.scale = '0'
            doge('weapon').style.scale = '0'

            player.inPortal = true

            setTimeout(() => {
                if(saveData.gameSettings.gamemode === 3) {
                    openShop([
                        {
                            id: 'rock',
                            rarity: 0,
                            type: 0,
                            cost: 2,
                            data: upgrades[0].rock
                        },
                        {
                            id: 'apple',
                            rarity: 0,
                            type: 1,
                            cost: 6,
                            data: powerItems[0].apple
                        },
                        {
                            id: 'strength',
                            rarity: 0,
                            type: 2,
                            cost: 10,
                            data: elixirs[0].strength
                        }
                    ])
                } else {
                    openShop()
                }

                if(player.tutorial.stage === 11) {
                    player.tutorial.goalValue++
                    updateTutorialGoal()
                }
            }, 1000);
        }
    })

    //Passive items
    if(e.gameUpdates % Math.max(DeBread.round((100 / player.stats.player.passiveAbilityMult)), 1) === 0 && player.stats.player.socksDamage > 0 && elems.enemies.length > 0) {
        const targetEnemy = elems.enemies[DeBread.randomNum(0,elems.enemies.length-1)]
        if(targetEnemy.active) {
            createPoisonField([targetEnemy.centerPos[0], targetEnemy.centerPos[1]], 100, player.stats.bullet.damage * player.stats.player.socksDamage, 1, 10, false, [0,100,255])
        }
    }
    
    if(e.gameUpdates % Math.max(DeBread.round((50 / player.stats.player.passiveAbilityMult)), 1) === 0 && elems.enemies.length > 0) {
        for(let i = 0; i < player.stats.player.thirdEye; i++) {
            let closestEnemy = {elem: undefined, dist: Infinity}
    
            elems.enemies.forEach(enemy => {
                const enemyDist = Math.sqrt(Math.pow(player.centerPos[0] - enemy.centerPos[0],2) + Math.pow(player.centerPos[1] - enemy.centerPos[1],2))
                if(enemyDist < closestEnemy.dist) {
                    closestEnemy.elem = enemy
                    closestEnemy.dist = enemyDist
                }
            })
            const enemyAngle = Math.atan2(player.centerPos[1] - closestEnemy.elem.centerPos[1], player.centerPos[0] - closestEnemy.elem.centerPos[0])

            const t = (i - (player.stats.player.thirdEye - 1) / 2)
            const offset = (t / player.stats.player.thirdEye) * Math.PI / 12
            const bulletPos = player.centerPos

            player.createBullet(bulletPos, enemyAngle + offset)
        }
    }

    if(player.comboStrength > 0) {
        if(elems.enemies.length > 0) {
            player.comboStrength -= 0.5 + (player.combo / 100)
        }
    } else {
        if(player.combo > 1) {
            player.combo = Math.round(player.combo / 2)
            player.comboStrength = 100
            doge('streakCount').innerText = 'x' + player.combo
            DeBread.shake(doge('streakCount'), 10, 5, 5, 200)
        }
    }

    if(player.comboStrength > 100) {
        player.comboStrength = 100
    }

    doge('innerStreakBar').style.width = player.comboStrength + '%'
    if(player.comboStrength < 20 && player.comboStrength > 0) {
        doge('streakContainer').style.animation = 'streakBarScared 100ms cubic-bezier(.5, 0.05, 1, .5) infinite alternate'
    } else {
        doge('streakContainer').style.animation = ''
    }

    //Sandbox Enemy
        
    if(sandBoxEnemy) {
        doge('sandboxEnemy').style.opacity = '0.25'
        doge('sandboxEnemy').style.left = e.relCursorPos[0]+'px'
        doge('sandboxEnemy').style.top = e.relCursorPos[1]+'px'
        doge('sandboxEnemy').style.width = sandBoxEnemy.size + 'px'
        doge('sandboxEnemy').style.backgroundColor = sandBoxEnemy.color
    } else {
        doge('sandboxEnemy').style.opacity = '0'
    }
    
    //Tick stuff
    document.querySelectorAll('.thrownCoin, .thrownBottle, .tennisBall, .wisp, .supermagnet, .fire').forEach(elem => {
        elem.move(elems.enemies)
    })

    //Restart
    const lastRestartProgress = player.restartProgress
    if(e.keysDown.includes('r') && e.keysDown.includes('shift') && e.gameUpdates >= 20) {
        player.restartProgress++
        doge('gameInnerRestartBar').style.width = player.restartProgress / 50 * 100 + '%'

        if(player.restartProgress >= 50) {
            startGame()
        }
    } else {
        player.restartProgress = 0
    }

    if(player.restartProgress > lastRestartProgress) {
        doge('gameRestartContainer').style.translate = '0px 0px'
    } else if(player.restartProgress < lastRestartProgress) {
        doge('gameRestartContainer').style.translate = '0px 100px'
    }
    
    //Debug stuff
    doge('dbPos').innerText = `
    Pos: [${DeBread.round(player.pos[0],2)},${DeBread.round(player.pos[1],2)}],
    CPos: [${DeBread.round(player.centerPos[0],2)},${DeBread.round(player.centerPos[1],2)}]
    RPos: [${DeBread.round(player.rectPos[0],2)},${DeBread.round(player.rectPos[1],2)}]
    `
    doge('dbTPS').innerText = `${DeBread.round(1000 / DeBread.round(performance.now()-lastTickDate),2)}TPS`
    doge('dbE').innerText = `${doge('area').children.length}E`
    doge('dbVel').innerText = `Vel: [${DeBread.round(player.vel[0],2)},${DeBread.round(player.vel[1],2)}]`
    doge('dbKeys').innerText = `Keys: [${e.keysDown}]`
    doge('dbCursor').innerText = `
    CursorPos: [${e.cursorPos[0]},${e.cursorPos[1]}]
    RelCursorPos: [${DeBread.round(e.relCursorPos[0],2)},${DeBread.round(e.relCursorPos[1],2)}]
    `
    doge('dbUpdates').innerText = `Updates: ${e.gameUpdates}`
    doge('dbTickInterval').innerText = `Tick Interval: ${e.gameUpdateInterval}ms/${DeBread.round(performance.now()-lastTickDate)}ms`
    doge('dbStatus').innerText = `Status Effects: ${JSON.stringify(player.statusEffects)}`
    doge('dbElems').innerText = `Elems: Enemies: ${elems.enemies.length} Pickups: ${(elems.pickups.length)}`
    
    e.gameUpdates++
    lastTickDate = performance.now()
}, 'e.gameUpdateInterval')

document.addEventListener('mousedown', ev => {
    if(e.gameActive && !e.gamePaused) {
        const weapon = weapons[player.weapon]
        if(weapon.leftClick && ev.button === 0 && !isHoveringOnSandbox) {
            if(sandBoxEnemy) {
                spawnEnemy([e.relCursorPos[0] - sandBoxEnemy.size / 2, e.relCursorPos[1] - sandBoxEnemy.size / 2], sandBoxEnemy, 0, 1000)
                if(!e.keysDown.includes('shift')) {
                    sandBoxEnemy = undefined
                }
            } else if(player.stats.ammo.chargeShot) {
                player.isCharging = true
                player.chargeStartDate = e.gameUpdates
            } else if(!player.stats.ammo.autoFire) {
                weapon.leftClick()
            }
            e.mouseDown[0] = true
        }
        if(weapon.rightClick && ev.button === 2) {
            weapon.rightClick()
            e.mouseDown[1] = true
        }

        if(ev.button === 2) {
            sandBoxEnemy = undefined
        }
    }
})

document.addEventListener('mouseup', ev => {
    if(ev.button === 0) {
        e.mouseDown[0] = false

        if(e.gameActive && !e.gamePaused) {
            if(player.stats.ammo.chargeShot && !isHoveringOnSandbox) {
                let chargeProgress = Math.min((e.gameUpdates - player.chargeStartDate) / player.stats.ammo.chargeTime, 1)
                player.chargeDmgMult = 1 + chargeProgress * player.stats.ammo.chargeMultCap
                
                weapons[player.weapon].leftClick()
    
                player.isCharging = false
            }
        }
    }
    if(ev.button === 1) {
        e.mouseDown[1] = false
    }
})

document.addEventListener('keydown', ev => {
    const key = ev.key.toLowerCase()
    if(e.gameActive) {
        const weapon = weapons[player.weapon]
        if(weapon.r && key === 'r') {
            weapon.r()
        }

        if(parseInt(key) && doge('consumablesContainer').children[parseInt(key)-1]) {
            doge('consumablesContainer').children[parseInt(key)-1].use()
        }

        if(key === 'f') {
            player.melee()
        }
        
        if(player.powerItem) {
            if(key === 'q' && !player.powerItem.canUseInShop) {
                player.usePowerItem()
            }
        }
    }

    if(player.powerItem) {
        if(player.powerItem.canUseInShop && key === 'q') {
            player.usePowerItem()
        }
    }

    if(key === ' ' && !player.tutorial.goal) {
        progressTutorial()
    }
})

function getClosest(from, cls) {
    let closest = {elem: undefined, distance: Infinity}
    document.querySelectorAll(cls).forEach(to => {
        const fromBoundingRect = from.getBoundingClientRect()
        const toBoundingRect = to.getBoundingClientRect()
        
        const distance = Math.sqrt(
            Math.pow(fromBoundingRect.left+(from.offsetWidth/2)-toBoundingRect.left+(to.offsetWidth/2),2) + 
            Math.pow(fromBoundingRect.top+(from.offsetHeight/2)-toBoundingRect.top+(to.offsetHeight/2),2)
        )

        if(distance < closest.distance) {
            closest.elem = to
            closest.distance = distance
        }
    })

    return closest
}

function createFire(pos, ticks, ignorePlayer) {
    const fire = document.createElement('div')
    fire.classList.add('fire')
    addStyles(fire, {
        position: 'absolute',
        left: pos[0]+'px',
        top: pos[1]+'px',
        translate: '-50% -50%',
        width: '64px',
        height: '64px',
        backgroundImage: 'url(graphics/fireLarge.gif)',
        backgroundSize: '64px 64px',
        opacity: '0.75',
        zIndex: '4',
        filter: 'blur(1px) drop-shadow(0px 0px 5px red)',
    })

    fire.ticksActive = 0
    fire.move = () => {
        fire.ticksActive++

        if(fire.ticksActive > ticks) {
            fire.destroy()
        }
    }

    fire.destroy = () => {
        fire.remove()
        createParticles([...pos], 10, 10, [0,50], 500, 'ease-out', {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`,filter:'blur(10px)'})
    }

    doge('area').append(fire)
    return fire
}

const explosionBase = document.createElement('div')
addStyles(explosionBase, {
    aspectRatio: '1 / 1',
    position: 'absolute',
    borderRadius: '50%',
    animation: 'explosion 500ms ease-out 1 forwards'
})

const explosionEffectBase = document.createElement('div')
addStyles(explosionEffectBase, {
    aspectRatio: '1 / 1',
    position: 'absolute',
    borderRadius: '50%',
    boxShadow: 'inset 0px 0px 5px white',
    animation: 'explosionEffect 500ms ease-out 1 forwards'
})

function createExplosion(pos, size, dmg, kb, ignorePlayer, col = [[255,255],[0,255],[0,0]]) {
    const explosion = explosionBase.cloneNode()
    const randomColor = `rgb(${DeBread.randomNum(col[0][0],col[0][1])},${DeBread.randomNum(col[1][0],col[1][1])},${DeBread.randomNum(col[2][0],col[2][1])})`
    addStyles(explosion, {
        left: pos[0] - size / 2 + 'px',
        top: pos[1] - size / 2 + 'px',
        width: size + 'px',
        backgroundColor: randomColor
    })

    const explosionEffect = explosionEffectBase.cloneNode()
    explosionEffect.style.setProperty('--explosionEffectScale', '2')
    addStyles(explosionEffect, {
        left: pos[0] - size / 2 + 'px',
        top: pos[1] - size / 2 + 'px',
        width: size + 'px',
    })

    const largeExplosionEffect = explosionEffectBase.cloneNode()
    largeExplosionEffect.style.setProperty('--explosionEffectScale', '5')
    addStyles(largeExplosionEffect, {
        left: pos[0] - size / 2 + 'px',
        top: pos[1] - size / 2 + 'px',
        width: size + 'px',
        opacity: '0.5'
    })

    createParticles(pos, 10, size / 2, [size, size * 2], 500, 'ease-out', {backgroundColor: randomColor})

    DeBread.easeShake(doge('area'), e.gameUpdateInterval, Math.min(5, dmg), dmg / 25)
    doge('area').append(explosion)
    doge('area').append(explosionEffect)
    doge('area').append(largeExplosionEffect)

    setTimeout(() => {
        explosion.remove()
        explosionEffect.remove()
        largeExplosionEffect.remove()
    }, 500);

    elems.enemies.forEach(enemy => {
        const distance = Math.sqrt(
            Math.pow((pos[0]) - (enemy.pos[0] + enemy.size / 2),2) +
            Math.pow((pos[1]) - (enemy.pos[1] + enemy.size / 2),2)
        ) / 1.1 //Grace
        const distanceEffect = 1 - distance / size

        if(distance < size && enemy.active) {
            enemy.damage(dmg * distanceEffect)
            if(dmg * distanceEffect > 0) {
                const popup = createPopupText(DeBread.round(dmg * distanceEffect), [(enemy.pos[0]),(enemy.pos[1])])
                popup.style.color = 'red'
                popup.style.fontSize = Math.min(Math.max(dmg * distanceEffect / 5, 15), 50) + 'px'
                doge('area').append(popup)
            }

            if(!enemy.alive) {
                getStyle(styles.exploded)
            }
        }

        if(distance / 2 < size && distanceEffect > 0) {
            const kbAngle = Math.atan2(
                pos[1] - enemy.pos[1] - enemy.size / 2,
                pos[0] - enemy.pos[0] - enemy.size / 2
            )

            if(enemy.speed > 0 && enemy.active) {
                enemy.dirVels.push({angle: kbAngle - Math.PI, speed: kb / 2, div: 1.2})
            }
        }
    })

    elems.pickups.forEach(pickup => {
        const distance = Math.sqrt(
            Math.pow(pos[0] - pickup.pos[0],2) +
            Math.pow(pos[1] - pickup.pos[1],2)
        )
        const distanceEffect = 1 - distance / size
        
        if(distance / 2 < size && distanceEffect > 0) {
            const kbAngle = Math.atan2(
                pos[1] - pickup.pos[1],
                pos[0] - pickup.pos[0]
            )

            pickup.dirVels.push({angle: kbAngle - Math.PI, speed: kb / 2, div: 1.2})
        }
    })

    doge('area').querySelectorAll('.physObj').forEach(obj => {
        const distance = Math.sqrt(
            Math.pow((pos[0]) - obj.pos[0],2) +
            Math.pow((pos[1]) - obj.pos[1],2)
        )
        const distanceEffect = 1 - distance / size

        if(distance / 2 < size && distanceEffect > 0) {
            const kbAngle = Math.atan2(
                pos[1] - obj.pos[1],
                pos[0] - obj.pos[0]
            )

            obj.dirVels.push({angle: kbAngle - Math.PI, speed: kb / 2, div: obj.traction})
        }
    })

    doge('area').querySelectorAll('.enemyProjectile').forEach(projectile => {
        const distance = Math.sqrt(
            Math.pow(pos[0] - projectile.pos[0],2) +
            Math.pow(pos[1] - projectile.pos[1],2)
        )

        if(distance < size) { 
            projectile.angle = Math.atan2(pos[1] - projectile.pos[1], pos[0] - projectile.pos[0])
            projectile.parried = true
            projectile.canHitEnemy = true
            projectile.speed *= 2
        }
    })

    if(!ignorePlayer) {
        const distance = Math.sqrt(
            Math.pow((pos[0]) - (player.centerPos[0]),2) +
            Math.pow((pos[1]) - (player.centerPos[1]),2)
        ) / 1.1 //Grace
        const distanceEffect = 1 - distance / size

        if(distance < size) {
            if(player.stats.player.explosiveHeal > 0) {
                player.damage(-player.stats.player.explosiveHeal * distanceEffect)
            } else {
                player.damage(dmg * distanceEffect)
            }

            const kbAngle = Math.atan2(
                pos[1] - player.centerPos[1],
                pos[0] - player.centerPos[0]
            )
            player.dirVels.push({angle: kbAngle - Math.PI, speed: kb / 2, div: 1.2})
        }
    }
}

function createPoisonField(pos, size, dmg, ticks, tickRate, circular = false, color = [255,255,255]) {
    const field = document.createElement('div')
    field.pos = pos
    field.damage = dmg
    field.circular = circular
    field.size = size
    field.tickRate = tickRate
    
    field.ticks = 0
    field.maxTicks = ticks

    field.lastTick = e.gameUpdates
    field.classList.add('poisonField')
    addStyles(field, {
        left: pos[0]+'px',
        top: pos[1]+'px',
        width: size+'px',
        height: size+'px',
        zIndex: '5',
        backgroundColor: `rgb(${color[0]},${color[1]},${color[2]}, 0.1)`,
        outline: `1px solid rgb(${color[0]},${color[1]},${color[2]})`
    })

    if(circular) {
        field.style.borderRadius = '50%'
    }

    doge('area').append(field)
}

const pickupBase = document.createElement('img')
addStyles(pickupBase, {
    position: 'absolute',
    width: '32px',
    height: '16px',
    left: '32px',
    translate: '-50% -50%',
    scale: '1',
    transition: 'left linear 100ms, top linear 100ms'
})

function createPickup(pos, speed, texture, col, action, value) {
    const pickup = pickupBase.cloneNode()
    pickup.color = col
    pickup.pos = [DeBread.randomNum(pos[0]-1,pos[0]+1,10),DeBread.randomNum(pos[1]-1,pos[1]+1,10)]
    pickup.speed = speed
    pickup.action = action
    pickup.value = value
    pickup.dateSpawned = e.gameUpdates
    pickup.scale = 1
    pickup.live = true
    pickup.dirVels = []

    pickup.angle = DeBread.randomNum(0,Math.PI*2,5)

    elems.pickups.push(pickup)

    pickup.classList.add('pickup')

    addStyles(pickup, {
        left: pickup.pos[0]+'px',
        top: pickup.pos[1]+'px'
    })
    pickup.src = `graphics/${texture}.gif`

    pickup.move = () => {
        pickup.pos[0] += Math.cos(pickup.angle) * pickup.speed
        pickup.pos[1] += Math.sin(pickup.angle) * pickup.speed

        if(pickup.pos[0] < 0) pickup.pos[0] = 0
        if(pickup.pos[1] < 0) pickup.pos[1] = 0
        if(pickup.pos[0] > doge('area').offsetWidth) pickup.pos[0] = doge('area').offsetWidth
        if(pickup.pos[1] > doge('area').offsetHeight) pickup.pos[1] = doge('area').offsetHeight


        addStyles(pickup, {
            left: pickup.pos[0]+'px',
            top: pickup.pos[1]+'px',
            scale: pickup.scale
        })

        pickup.speed /= 1.1

        for(let i = 0; i < pickup.dirVels.length; i++) {
            const dirVel = pickup.dirVels[i]
            pickup.pos[0] += Math.cos(dirVel.angle) * dirVel.speed
            pickup.pos[1] += Math.sin(dirVel.angle) * dirVel.speed

            dirVel.speed /= dirVel.div
            if(dirVel.speed <= 0.1) {
                pickup.dirVels.splice(i, 1)
            }
        }

        elems.pickups.forEach(other => {
            if (pickup === other) return

            const dx = other.pos[0] - pickup.pos[0]
            const dy = other.pos[1] - pickup.pos[1]

            const distance = Math.sqrt(
                Math.pow(dx,2)+
                Math.pow(dy,2)
            )

            const r1 = pickup.offsetWidth / 2
            const r2 = other.offsetWidth / 2

            const minDist = r1 + r2

            if(distance < minDist && distance > 0) {
                const overlap = minDist - distance

                const nx = dx / distance
                const ny = dy / distance

                const push = overlap / 2

                pickup.pos[0] -= nx * push
                pickup.pos[1] -= ny * push

                other.pos[0] += nx * push
                other.pos[1] += ny * push
            }
        })
    }

    pickup.destroy = () => {
        pickup.live = false
        pickup.style.animation = 'pickupOut 100ms ease-out 1 forwards'
        createParticles([...pickup.pos], 3, 8, [5,10], 250, 'ease-out', {backgroundColor: 'white'})
        setTimeout(() => {
            pickup.remove()
            elems.pickups.splice(pickups[elems.pickups.indexOf(pickup)], 1)
        }, 100);
    }

    doge('area').append(pickup)
}

const coinValues = [1, 5, 10, 25, 100]
const pickups = {
    coin: (type, pos, speed, amount) => {
        createPickup(pos, speed, `coin${type}`, 'grey', (amount) => {player.getMoney(amount * coinValues[type])}, amount)
    },
    
}

const styles = {
    kill: {
        text: 'Kill',
        baseAmnt: 100,
        comboBoost: 25,
    },
    parry: {
        text: 'Parry',
        baseAmnt: 500,
        comboBoost: 75,
    },
    counterParry: {
        text: 'Counter Parry',
        baseAmnt: 2500,
        comboBoost: 100,
    },
    punch: {
        text: 'Punched',
        baseAmnt: 50,
        comboBoost: 5,
    },
    exploded: {
        text: 'Exploded',
        baseAmnt: 75,
        comboBoost: 5,
    },
    crit: {
        text: 'Crit',
        baseAmnt: 5,
        comboBoost: 1,
    },
    ricochet: {
        text: 'Ricochet',
        baseAmnt: 125,
        comboBoost: 1,
    },
    overkill: {
        text: 'Overkill',
        baseAmnt: 750,
        comboBoost: 5,
    },
    poisoned: {
        text: 'Poisoned',
        baseAmnt: 250,
        comboBoost: 5,
    },
    trampled: {
        text: 'Trampled',
        baseAmnt: 300,
        comboBoost: 5,
    },
    grazed: {
        text: 'Grazed',
        baseAmnt: 15,
        comboBoost: 5,
    },
    ricoshot: {
        text: 'Ricoshot',
        baseAmnt: 1000,
        comboBoost: 10,
    },
    fragmented: {
        text: 'Fragmented',
        baseAmnt: 5,
        comboBoost: 1,
    }
}

function getStyle(style) {
    let lastStyle = doge('gameStyleContainer').children[doge('gameStyleContainer').children.length-1] ?? ''
    if(lastStyle.styleType === style) {
        lastStyle.querySelector('#gameStyleCombo').innerHTML = parseInt(lastStyle.querySelector('#gameStyleCombo').innerHTML.replace('x','')) + 1
        lastStyle.querySelector('#gameStylePoints').innerHTML = parseInt(lastStyle.querySelector('#gameStylePoints').innerHTML) + style.baseAmnt * player.combo * player.scoreMult
    } else {
        const div = document.createElement('div')
        div.classList.add('gameStyle')
        div.innerHTML = `
            <div>
                <span style="font-weight: 700;">+${style.text}</span>
                <span>x</span>
                <span id="gameStyleCombo">1</span>
            </div>
            <div class="coolLine"></div>
            <span id="gameStylePoints">${style.baseAmnt * player.combo * player.scoreMult}</span>
        `
        div.styleType = style
    
        doge('gameStyleContainer').append(div)
    }

    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            player.score += (style.baseAmnt * player.combo * player.scoreMult) / 10

            if(style.comboBoost) {
                player.comboStrength += style.comboBoost / 10
            }

            doge('gameScore').innerText = DeBread.round(player.score).toString().padStart(10,0)
        }, 25 * i);
    }
}

function getCombo() {
    player.combo++
    doge('streakCount').style.animation = ''
    doge('streakCount').innerText = 'x' + player.combo
    requestAnimationFrame(() => {
        doge('streakCount').style.animation = 'streakCountPulse 500ms ease-out 1 forwards'
    })
}

function pauseGame(state) {
    DeBread.pauseInterval(1)
    const isPaused = DeBread.getInterval(1).paused
    e.gamePaused = isPaused

    if(isPaused || state) { //open
        addStyles(doge('gamePauseContainer'), {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgb(0,0,0,0.25)',
            pointerEvents: 'unset'
        })
    
        addStyles(doge('area'), {
            scale: '1.25'
        })
    
        addStyles(doge('gamePause'), {
            height: '200px',
            padding: '5px 5px',
            borderTop: '2px solid white'
        })

        openPauseMenu('main')
    } else { //close
        addStyles(doge('gamePauseContainer'), {
            backdropFilter: 'blur(0px)',
            backgroundColor: 'rgb(0,0,0,0)',
            pointerEvents: 'none'
        })
    
        addStyles(doge('area'), {
            scale: '1'
        })
    
        addStyles(doge('gamePause'), {
            height: '0px',
            padding: '0px 5px',
            borderTop: '0px solid white'
        })

        openPauseMenu('blank')
    }
}

let menuTimeout
function openPauseMenu(id) {
    clearTimeout(menuTimeout)
    doge('gamePause').querySelectorAll('.gamePauseMenu').forEach(menu => {
        doge('gamePauseTitle').querySelectorAll('div').forEach(char => {
            char.style.animation += `, scaleOut 0.25s ease-in-out 0ms 1 forwards`
        })
        if(menu.id === `pauseMenu-${id}`) {
            menuTimeout = setTimeout(() => {                
                addStyles(menu, {
                    opacity: '1',
                    pointerEvents: 'unset'
                })

                doge('gamePause').style.height = doge(`pauseMenu-${id}`).getAttribute('menuHeight') + 'px'
                doge('gamePauseTitle').style.bottom = parseInt(doge(`pauseMenu-${id}`).getAttribute('menuHeight')) + 50 + 'px'

                if(id === 'main') {
                    if(saveData.gameSettings.gamemode < 2) {
                        doge('gamePauseTitle').innerText = `PAUSED - WAVE ${player.wave-1}`
                    } else if(saveData.gameSettings.gamemode === 2) {
                        doge('gamePauseTitle').innerText = `PAUSED - SANDBOX`
                    }
                } else {
                    doge('gamePauseTitle').innerText = id.toUpperCase()
                }
                applyFlowText(doge('gamePauseTitle'))
            }, 250);
        } else {
            addStyles(menu, {
                opacity: '0',
                pointerEvents: 'none'
            })
        }
    })
} openPauseMenu('')

//Sandbox stuff
let isHoveringOnSandbox = false
doge('gameSandbox').onmouseenter = () => {isHoveringOnSandbox = true}
doge('gameSandbox').onmouseleave = () => {isHoveringOnSandbox = false}

let sandBoxEnemy = undefined
function openSandboxMenu(menu) {
    const sandboxMenus = doge('gameInnerSandbox').children
    for(let i = 0; i < sandboxMenus.length; i++) {
        sandboxMenus[i].style.display = 'none'
    }

    doge('sandboxMenu-'+menu).style.display = 'flex'

    if(menu === 'enemies') {
        doge('sandboxMenu-enemies').innerHTML = ''
        for(const key in enemies) {
            const enemy = enemies[key]
            const button = document.createElement('div')
            button.innerHTML = '<div></div>'

            addStyles(button.querySelector('div'), {
                width: '50px',
                height: '50px',
                backgroundColor: enemy.color
            })

            button.onclick = () => {
                sandBoxEnemy = enemy
            }

            button.onmouseenter = () => {
                const upgradeRect = button.getBoundingClientRect()
                tooltip(
                    [upgradeRect.left + button.offsetWidth / 2, upgradeRect.top + button.offsetHeight + 12], 
                    enemy.name, 
                    [{text: 'ENEMY', col: '#7f293a'}], 
                    enemy.desc + `<br><em>${enemy.credits} Credits</em>`, 
                )
            }

            button.onmouseleave = () => {doge('tooltip').style.opacity = '0'}

            doge('sandboxMenu-enemies').append(button)
        }
    }

    if(menu === 'upgrades') {
        doge('sandboxMenu-upgrades').innerHTML = ''

        const searchBar = document.createElement('input')
        searchBar.placeholder = 'Search...'
        addStyles(searchBar, {
            width: '100%',
            outline: 'none',
            border: '2px solid white',
            position: 'sticky',
            top: '5px',
            backgroundColor: 'rgb(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: '2'
        })

        searchBar.onchange = updateSearch
        searchBar.onkeyup = updateSearch
        searchBar.onkeydown = updateSearch
        
        function updateSearch() {
            doge('sandboxMenu-upgrades').querySelectorAll('.sandboxUpgrade').forEach(button => {
                if(button.key !== 'error') {
                    if(!button.data.name.toLowerCase().includes(searchBar.value.toLowerCase())) {
                        button.style.display = 'none'
                    } else {
                        button.style.display = 'flex'
                    }
                }
            })
        }

        doge('sandboxMenu-upgrades').append(searchBar)

        for(let i = 0; i < upgrades.length; i++) {
            for(const key in upgrades[i]) {
                const upgrade = upgrades[i][key]
                const rarity = i
                const sandboxUpgrade = document.createElement('div')
                sandboxUpgrade.classList.add('sandboxUpgrade')

                let extension = 'png'
                if(upgrade.animatedTexture) {
                    extension = 'gif'
                }

                sandboxUpgrade.innerHTML = `
                    <img src="graphics/upgrades/${key}.${extension}">
                `

                sandboxUpgrade.querySelector('img').onerror = ev => {
                    createNotification('Whoops!',`An upgrade texture failed to load: ${ev}`)
                    sandboxUpgrade.querySelector('img').src = 'graphics/placeholder.png'
                }

                sandboxUpgrade.data = upgrade
                sandboxUpgrade.key = key
                
                doge('sandboxMenu-upgrades').append(sandboxUpgrade)

                sandboxUpgrade.onclick = () => {
                    upgrade.apply()
                    updateUI()
                }

                sandboxUpgrade.onmouseenter = () => {
                    const upgradeRect = sandboxUpgrade.getBoundingClientRect()

                    //literally just for the error item

                    let itemName = upgrade.name
                    if(typeof upgrade.name === 'function') {
                        itemName = upgrade.name()
                    }

                    let itemDesc = upgrade.desc
                    if(typeof upgrade.desc === 'function') {
                        itemDesc = upgrade.desc()
                    }

                    tooltip(
                        [upgradeRect.left + sandboxUpgrade.offsetWidth / 2, upgradeRect.top + sandboxUpgrade.offsetHeight + 12], 
                        itemName, 
                        [{text: rarities[rarity].name, col: rarities[rarity].color}], 
                        itemDesc
                    )
                }

                sandboxUpgrade.onmouseleave = () => {doge('tooltip').style.opacity = '0'}

                if(rarity === 4) {
                    sandboxUpgrade.style.animation = 'mythicBorder 5s linear infinite forwards'
                    sandboxUpgrade.querySelector('img').style.animation = 'mythicGlow 5s linear infinite forwards'
                } else {
                    sandboxUpgrade.querySelector('img').style.filter = `drop-shadow(0px 0px 5px ${rarities[rarity].color})`
                    sandboxUpgrade.style.boxShadow = `inset 0px 0px 0px 4px ${rarities[rarity].color}`
                }
            }
        }
    }

    
    if(menu === 'stats') {
        doge('sandboxMenu-stats').innerHTML = ''
        const baseStats = createPlayer().stats
        for(const statSection in player.stats) {
            const section = document.createElement('div')
            section.collapsed = true
            section.classList.add('sandboxStatsSection')
            section.innerHTML = `
                <div class="sandboxStatsSectionHeader">
                    <span>></span>
                    <span>${statSection.toUpperCase()}</span>
                    <div class="coolLine"></div>
                </div>
            `

            addStyles(section, {
                height: '18px',
                minHeight: '18px',
                overflow: 'hidden'
            })

            section.querySelector('.sandboxStatsSectionHeader').onclick = () => {
                section.collapsed = !section.collapsed

                if(section.collapsed) {
                    addStyles(section, {
                        height: '18px',
                        minHeight: '18px',
                        overflow: 'hidden'
                    })

                    section.querySelector('span').style.rotate = '0deg'
                } else {
                    addStyles(section, {
                        height: 'unset',
                        minHeight: 'unset',
                        overflow: 'unset'
                    })
                    
                    section.querySelector('span').style.rotate = '90deg'
                }
            }

            for(const key in player.stats[statSection]) {
                const stat = player.stats[statSection][key]
                const div = document.createElement('div')
                div.classList.add('sandboxStatContainer')
                div.innerHTML = `
                    <span>${key}</span>
                    <hr>
                    <input placeholder="${baseStats[statSection][key]}">
                `

                if(typeof stat === 'number') {
                    div.querySelector('input').type = 'number'
                } else if(typeof stat === 'boolean') {
                    div.querySelector('input').type = 'checkbox'
                }

                section.append(div)

                
                div.querySelector('input').value = player.stats[statSection][key]
                div.querySelector('input').onchange = updateStat
                div.querySelector('input').onkeyup = updateStat
                
                function updateStat() {
                    let value
                    if(typeof stat === 'number') {
                        value = parseFloat(div.querySelector('input').value)
                    } else if(typeof stat === 'boolean') {
                        value = div.querySelector('input').checked
                    }
                    modifyStat([statSection, key], `=${value}`)

                    updateUI()
                    updateArea()
                }
            }

            doge('sandboxMenu-stats').append(section)
        }


        const resetButton = document.createElement('button')
        resetButton.innerText = 'Reset player'
        resetButton.onclick = () => {
            player = createPlayer()
            updateUI()
        }
        doge('sandboxMenu-stats').append(resetButton)
    }

    if(menu === 'powerItems') {
        doge('sandboxMenu-powerItems').innerHTML = ''
        for(let i = 0; i < powerItems.length; i++) {
            for(const key in powerItems[i]) {
                const item = powerItems[i][key]
                const button = document.createElement('div')
                button.classList.add('sandboxUpgrade')
                button.innerHTML = `
                    <img src="graphics/powerItems/${key}.png">
                `
                
                doge('sandboxMenu-powerItems').append(button)

                button.onclick = () => {
                    player.powerItem = item
                    updateUI()
                }

                button.onmouseenter = () => {
                    const buttonRect = button.getBoundingClientRect()
                    tooltip(
                        [buttonRect.left + button.offsetWidth / 2, buttonRect.top + button.offsetHeight + 12], 
                        item.name, 
                        [
                            {text: 'POWER ITEM', col: '#5b5a1b'},
                            {text: rarities[i].name, col: rarities[i].color}
                        ], 
                        item.desc
                    )
                }

                button.onmouseleave = () => {doge('tooltip').style.opacity = '0'}

                if(i === 4) {
                    button.style.animation = 'mythicBorder 5s linear infinite forwards'
                    button.querySelector('img').style.animation = 'mythicGlow 5s linear infinite forwards'
                } else {
                    button.querySelector('img').style.filter = `drop-shadow(0px 0px 5px ${rarities[i].color})`
                    button.style.boxShadow = `inset 0px 0px 0px 4px ${rarities[i].color}`
                }
            }
        }
    }

    if(menu === 'elixirs') {
        doge('sandboxMenu-elixirs').innerHTML = ''
        for(const key in elixirs[0]) {
            const elixir = elixirs[0][key]
            const button = document.createElement('div')
            button.classList.add('sandboxUpgrade')
            button.innerHTML = `
                <img src="graphics/elixirs/${key}.png" width=32>
            `
            
            doge('sandboxMenu-elixirs').append(button)

            button.onclick = () => {
                elixir.apply()
                updateUI()
            }

            let desc = elixir.desc
            if(elixir.buyLimit < Infinity) {
                desc += `<br><br>Maxes out at tier <cs>${roman(elixir.buyLimit)}</cs>`
            }

            button.onmouseenter = () => {
                const buttonRect = button.getBoundingClientRect()
                tooltip(
                    [buttonRect.left + button.offsetWidth / 2, buttonRect.top + button.offsetHeight + 12], 
                    elixir.name, 
                    [
                        {text: 'ELIXIR', col: '#391b5b'},
                        {text: rarities[0].name, col: rarities[0].color}
                    ], 
                    desc
                )
            }

            button.onmouseleave = () => {doge('tooltip').style.opacity = '0'}
        }
    }
} openSandboxMenu('tools')

function spawnPortal() {
    if(document.querySelectorAll('.portal').length < 1) {
        const portal = document.createElement('div')
        portal.classList.add('portal')
        portal.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
        `
        addStyles(portal, {
            left: doge('area').offsetWidth / 2 + 'px',
            top: doge('area').offsetHeight / 2 + 'px'
        })

        doge('area').append(portal)

        portal.pos = [
            doge('area').offsetWidth / 2,
            doge('area').offsetHeight / 2
        ]

        const portalEffect = document.createElement('div')
        portalEffect.classList.add('portalEffect')
        addStyles(portalEffect, {
            left: doge('area').offsetWidth / 2 + 'px',
            top: doge('area').offsetHeight / 2 + 'px'
        })

        doge('area').append(portalEffect)

        setTimeout(() => {
            portalEffect.remove()
        }, 1000);
    }
}

//Special shop stuff
const chests = {
    wooden: {
        name: 'Wooden Chest',
        weight: 50,
        requirement: () => {return true},

        loot: [
            {
                name: 'Pocket change',
                desc: '<cp>+$10</cp>',
                weight: 20,

                run: () => {
                    player.getMoney(10)
                }
            },
            {
                name: 'Key',
                desc: 'Used to unlock special chests',
                weight: 10,

                run: () => {
                    player.keys++
                }
            },
        ]
    },
    silver: {
        name: 'Silver Chest',
        weight: 20,
        requirement: () => {return true},

        loot: [
            {
                name: 'Wallet',
                desc: '<cp>+$30</cp>',
                weight: 20,

                run: () => {
                    player.getMoney(30)
                }
            },
            {
                name: 'Key',
                desc: 'Used to unlock special chests',
                weight: 20,

                run: () => {
                    player.keys++
                }
            },
        ]
    }
}

function getChest() {
    let weightTotal = 0
    for(const key in chests) {
        weightTotal += chests[key].weight
    }
}

const tutorialEnemies = {
    dummy0: {
        color: 'rgba(255, 218, 169, 1)',
        credits: 0,
        size: 50,
        health: 80,
        speed: 0,
        hideLevel: true,
    },
    dummy1: {
        color: 'rgba(255, 218, 169, 1)',
        credits: 0,
        size: 50,
        health: Infinity,
        speed: 0,
    },
    dummy2: {
        color: 'rgba(255, 218, 169, 1)',
        credits: 0,
        size: 50,
        health: Infinity,
        speed: 0,

        projectile: {
            cooldown: 2500,
            size: 10,
            dmg: 0,
            speed: 4,
        },
    },
    dummy3: {
        color: 'rgba(255, 218, 169, 1)',
        credits: 0,
        size: 50,
        health: Infinity,
        speed: 0,

        projectile: {
            cooldown: 1000,
            size: 10,
            dmg: 0,
            speed: 5,
        },
    }
}

const tutorial = [
    {
        text: 'Welcome to Goober Shooter 2! If you want to last long here, you\'ll need to understand the basic controls and fundamentals.',
        pos: [150,150],
        run: () => {
            DeBread.pauseInterval(1, true)
        }
    },
    {
        text: 'First of all, you need to know how to shoot your weapon. <strong>Left Click</strong> to fire a projectile at the dummy.',
        pos: [150,400],
        goalTarget: 10,
        goal: 'Fire projectiles',
        run: () => {
            player.stats.ammo.current = 10
            updateUI()
            spawnEnemy([400, doge('area').offsetHeight / 2 - 25], tutorialEnemies.dummy0, 0, 1000)
            DeBread.pauseInterval(1, false)
        }
    },
    {
        text: 'Looks like you ran out of ammo. Press <strong>R</strong> to reload.',
        goalTarget: 1,
        goal: 'Reload using R',
    },
    {
        text: 'Great! Now that you have enough ammo, finish killing the dummy.',
        goalTarget: 1,
        goal: 'Kill the dummy',
        run: () => {
            modifyStat(['ammo','garandReload'], '=false')
        }
    },
    {
        text: 'Alright, see the box around your weapon? That\'s your <strong>Melee Hitbox</strong>.',
        run: () => {
            modifyStat(['melee','size'], '=50')
            modifyStat(['melee','damage'], '=20')
            modifyStat(['melee','cooldown'],'=25')
        }
    },
    {
        text: 'If enemies are within this box and you press <strong>F</strong>, you deal melee damage.',
    },
    {
        text: 'Try performing some melees on this dummy using the <strong>F</strong> key. <br><br><em style="color: grey">(And btw, you can move using WASD, if you haven\'t figured it out already...)</em>',
        goal: 'Perform melees',
        goalTarget: 3,
        run: () => {
            spawnEnemy([400, doge('area').offsetHeight / 2 - 25], tutorialEnemies.dummy1, 0, 1000)
        }
    },
    {
        text: 'Performing a melee on an enemy projectile deflects it towards your crosshair, dealing increased damage and becoming explosive. This is called a <strong>parry</strong>. Try it out!',
        goal: 'Perform parries',
        goalTarget: 3,
        run: () => {
            elems.enemies.forEach(enemy => {enemy.kill()})
            spawnEnemy([400, doge('area').offsetHeight / 2 - 25], tutorialEnemies.dummy2, 0, 1000)
        }
    },
    {
        text: 'Okay, let\'s move away from gameplay and focus on the <strong>Shop</strong>.',
        run: () => {
            elems.enemies.forEach(enemy => {enemy.kill()})
            modifyStat(['melee','cooldown'],'=75')
        }
    },
    {
        text: 'Enemies spawn in waves, increasing in difficulty every wave.',
    },
    {
        text: 'Every five waves a <strong>Portal</strong> spawns, allowing you to visit the <strong>Shop</strong>.',
    },
    {
        text: 'Move into the portal to visit the <strong>Shop</strong>.',
        goal: 'Go into the portal',
        pos: [150,150],
        goalTarget: 1,
        run: () => {
            spawnPortal()

            //Hide shop buttons
            addStyles(doge('continueButton'), {
                opacity: '0',
                pointerEvents: 'none'
            })

            addStyles(doge('gameShopUpgradesButtons'), {
                opacity: '0',
                pointerEvents: 'none'
            })

            doge('gameShopContainer').style.pointerEvents = 'none'
        }
    },
    {
        text: 'This is the <strong>Shop</strong>. Waves drop coins based on how difficult they are. You can use these coins to buy different things.'
    },
    {
        text: '<strong>Items</strong> are permanent upgrades that modify your player stats.',
        run: () => {
            doge('gameShopUpgrades').children[0].style.outline = '2px solid white'
        }
    },
    {
        text: '<strong>Power items</strong> are multi-use items that can take <strong>POWER</strong> to use.',

        run: () => {
            doge('gameShopUpgrades').children[0].style.outline = '0px solid white'
            doge('gameShopUpgrades').children[1].style.outline = '2px solid white'
        }
    },
    {
        text: 'You can gain POWER by killing enemies, parrying enemy projectiles, or narrowly dodging enemy projectiles within your <strong>Graze Hitbox</strong>.'
    },
    {
        text: 'But watch out though! You loose half your current <strong>POWER</strong> when getting hit by an enemy!'
    },
    {
        text: '<strong>Elixirs</strong> are like items, but can be bought multiple times to increase its player stat changes.',
        run: () => {
            doge('gameShopUpgrades').children[1].style.outline = '0px solid white'
            doge('gameShopUpgrades').children[2].style.outline = '2px solid white'
        }
    },
    {
        text: 'You can only have up to <strong>3</strong> different elixirs in a run.',
    },
    {
        text: 'Here\'s some money, try buying some items from the shop!',
        goal: 'By items',
        goalTarget: 3,
        
        run: () => {
            player.getMoney(150)
            doge('gameShopContainer').style.pointerEvents = 'unset'
            doge('gameShopUpgrades').children[2].style.outline = '0px solid white'
        }
    },
    {
        text: 'When you\'re done shopping, you can click the <strong>Continue</strong> button to start the next set of waves.',
        goal: 'Leave the shop',
        goalTarget: 1,

        run: () => {
            addStyles(doge('continueButton'), {
                opacity: '1',
                pointerEvents: 'unset'
            })
        }
    },
    {
        text: 'Let\'s try to use your power item.'
    },
    {
        text: 'Power items use POWER to use. You can see how much power you have by the bar underneath your health bar.'
    },
    {
        text: 'As said before, you can gain POWER by parrying bullets, killing enemies, or narrowly dodging enemy projectiles within your <strong>Graze Hitbox</strong>.'
    },
    {
        text: 'Try gaining power by dodging projectiles within your <strong>Graze Hitbox</strong>',
        
        goal: 'Graze enemy projectiles',
        goalTarget: 15,

        run: () => {
            spawnEnemy([400, doge('area').offsetHeight / 2 - 25], tutorialEnemies.dummy3, 0, 1000)
            player.getPower(15)
        }
    },
    {
        text: 'Nice! Now you have enough POWER to use your power item.',

        run: () => {
            elems.enemies.forEach(enemy => {enemy.kill()})
        }
    },
    {
        text: 'Use your power item by pressing <strong>Q</strong>',
        goal: 'Use your power item',
        goalTarget: 1,

        run: () => {
            player.canUsePowerItem = true
            
            if(player.power < 30) {
                player.getPower(-9999)
                player.getPower(30)
            }
        }
    },
    {
        text: 'Thats about it for the basics! You\'ll learn more advanced things as you play through the game.'
    },
    {
        text: 'Byeeee!!!!!',
        run: () => {
            player.alive = false
            e.gameActive = false
            openMenu('main')
        }
    }
]

let tutorialistInterval
function tutorialistTalk(text, pos, useRight) {
    doge('tutorialistDialogue').innerHTML = text

    if(pos) {
        addStyles(doge('tutorialist'), {
            left: pos[0]+'px',
            top: pos[1]+'px'
        })
        
        if(useRight) {
            addStyles(doge('tutorialistDialogueContainer'), {
                left: pos[0] - doge('tutorialistDialogueContainer').offsetWidth+'px',
                top: pos[1]+'px'
            })
        } else {
            addStyles(doge('tutorialistDialogueContainer'), {
                left: pos[0] + doge('tutorialist').offsetWidth + 10 +'px',
                top: pos[1]+'px'
            })
        }
    }
}

function updateTutorialGoal() {
    doge('tutorialGoalProgress').style.width = player.tutorial.goalValue / player.tutorial.goal * 100 + '%'
    doge('tutorialGoalCount').innerText = `${player.tutorial.goalValue}/${player.tutorial.goal}`

    if(player.tutorial.goalValue >= player.tutorial.goal) {
        setTimeout(() => {        
            progressTutorial()
        }, 1000);
    }
}

function progressTutorial() {
    if(saveData.gameSettings.gamemode === 3) {
        player.tutorial.stage++
        const stage = tutorial[player.tutorial.stage]
    
        if(stage.run) stage.run()
    
        if(stage.goalTarget) {
            player.tutorial.goal = stage.goalTarget
            player.tutorial.goalValue = 0
            doge('tutorialGoal').style.display = 'flex'
            doge('tutorialGoalProgress').style.width = player.tutorial.goalValue / player.tutorial.goal * 100 + '%'
            doge('tutorialGoalCount').innerText = `${player.tutorial.goalValue}/${player.tutorial.goal}`
            doge('tutorialGoalText').innerText = stage.goal
    
            doge('tutorialSpace').style.display = 'none'
        } else {
            doge('tutorialSpace').style.display = 'unset'
            doge('tutorialGoal').style.display = 'none'
            player.tutorial.goal = undefined
        }
    
        tutorialistTalk(stage.text, stage.pos)
    }
}