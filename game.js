function createPlayer() {
    return {
        alive: true,
        active: true,
        fightingBoss: false,

        //Position stuff
        pos: [doge('area').offsetWidth / 2 - doge('player').offsetWidth / 2,doge('area').offsetHeight / 2 - doge('player').offsetHeight / 2],
        centerPos: [0,0],
        rectPos: [0,0],
        vel: [0,0],

        dirVels: [],

        lastDustParticle: 0,
        restartProgress: 0,
        
        wave: 0,
        lastWaveDate: 0,
        autoWavesPaused: false,
        perfectWave: true,
        lastKillDate: 0,
        timesHit: 0,

        isCharging: false,
        chargeStartDate: 0,
        chargeDmgMult: 1,

        inPortal: false,
        immune: 0,

        health: 100,
        hardDamage: 0,
        power: 0,
        rerolls: 0,

        onFire: false,
        crispiness: 0,

        score: 0,
        combo: 0,
        scoreMult: 1,

        money: 25,
        keys: 0,
        perfectSet: true,

        hideUI: false,

        bankBreakChance: 0,

        weapon: 'gun',
        characterWeapon: weaponPresets.gun,

        lastHitDate: 0,

        consumables: [],
        powerItem: undefined,
        secondaryPowerItem: powerItems[5].empty,
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
        },

        shopWeights: [
            90, //Item
            5, //Power item
            5, //Elixir
        ],

        elixirIDs: [],
        elixirs: [],

        itemsBought: [],

        moneyBonusQueue: [],
        
        onShoot: () => {},

        visibleStats: [
            'player-speed',
            'bullet-damage',
            'bullet-critChance',
            'bullet-speed',
            'bullet-range',
            'ammo-reloadSpeed',
            'melee-damage',
            'melee-cooldown',
            'shop-luck',
            'shop-rerollPrice'
        ],

        stats: {
            player: {
                immunityTime: 5, //How long (in ticks) the player becomes immune after being hit.
                speed: 5, //The max speed the player can move.
                speedStep: 2.5, //The amount the player velocity changes every tick to reach the target speed value.
                size: 36, //Player size. (in pixels)

                maxHealth: 100, //Max player health.
                healthRegen: 0,
                armor: 0,
                pickupRange: 0, //How strong pickups are attracted towards the player.

                socksDamage: 0,
                thirdEye: 0,
                passiveAbilityMult: 1,

                powerGainMult: 1,
                maxPower: 100,
                powerRegen: 0,
                powerItemRepeatChance: 0,
                powerItemRepeats: 0,
                
                grazeSize: 2, //How big (in player sizes) the graze hitbox is.
                grazeCooldown: 5, //How long (in ticks) between each graze tick.

                parryHeal: 5, //How much the player heals after performing a parry.
                parryPoisonDmg: 0, //How much damage (as a percent of the player damage) a poison field (from a parried bullet) deals every poison field tick.
                parryPoisonTicks: 0, //How many times a poison field (from a parried bullet) attempts to damage an enemy before destroying.
                parryPoisonSize: 0, //How big (in pixels) the parried poison fields are.
                parryShrapnel: 0,
                parryHoming: 0,

                contactDamage: 0, //How much damage the player deals to colliding enemies every tick.

                explosiveHitChance: 0, //The chance of creating an explosion when the player is hit. (1 = 1% chance)
                explosiveHitDamage: 0, //How much damage the explosion created from getting hit by an enemy deals. (as a percent of player damage) (1 = 100% of player damage)

                explosiveHeal: 0, //How much HP the player heals when getting hit by an explosion.

                weaponContactDamage: 0, //How much damage every tick the players weapon deals to enemies that are colliding with it.
                maxWeaponDistance: 50,
                
                fireTouch: false,

                interestCap: 25,
                couponBonus: 0,

                droolSize: 0,

                canCarrySecondaryPowerItem: false,
            },

            shop: {
                upgrades: 3, //How many upgrades appear in the shop.
                elixirs: 3, //How many elixirs appear in the shop.
                luck: 0, //Increases the chance of higher quality items appearing in the shop.
                rerolls: 0, //How many times the player can reroll the shop.
                rerollPrice: 25,
                priceMult: 1,

                pepsifyChance: 0,
            },

            bullet: {
                damage: 5, //How much damage a bullet deals when colliding with an enemy. This also influences other player attacks.
                damageMult: 1, //Multiplies damage stat.
                speed: 10, //How much (in pixels) the bullet travels every tick.
                size: 8, //How large (in pixels) bullets are.
                shotCooldown: 3, //The minimum amount of time (in ticks) between being availble to fire a projectile. 
                lastShotDate: 0, //Ignore this
                lastShotID: 0, //Ignore this too
                range: 100, //The amount of ticks a bullet is alive before being destroyed.
                speedDiv: 1,

                critChance: 0, //The percent chance of a bullet dealing critical damage. (1 = 1% chance)
                critDamageMult: 1.25, //The amount that the bullet damage is multiplied by when it is considered a crit.
                
                split: 0, //The amount of projectiles projectiles split into.
                splits: 0, //The amount of times that a bullet can split.
                
                bounces: 0, //The amount of times a bullet can bounce off of a wall before destroying.
                
                drillChance: 0,
                drillTicks: 0, //The amount of times a bullet can hit an enemy before being destroyed.
                damageInterval: 0,
                
                explosionSize: 0, //The size (in pixels) of the explosion a bullet creates when being destroyed.
                fireyAmmo: false,

                heal: 0, //The amount of HP a bullet heals the player when hitting an enemy.
                
                electricChainLength: 0, //The amount of enemies electicity can chain between.
                electricChainReach: 0, //The distance that electricity can reach.
                
                knockback: 1, //The amount (in pixels) an enemy gets knocked back when getting hit by a bullet.
                
                multishot: 1, //The amount of bullets shot at once when pressing left click.
                
                // tameChance: 0,
                // tameCredits: 0,
                sharpChance: 0,

                poisonFieldChance: 0, //The chance of a bullet creating a poison field when destroyed. (1 = 1% chance)
                poisonFieldSize: 0, //The size of the poison field created by a bullet.
                poisonFieldDmgPercent: 0, //The percent of player damage the poison field deals to enemies.
                poisonFieldTicks: 0, //How many times the poison field (from bullet) attempts to damage an enemy before destroying.
                poisonFieldColor: [255,0,0], //The color of the poison field created by a bullet.

                recoil: 0, //The amount (in pixels) that the player gets knocked back when firing their weapon.
                physRecoil: 5,
                accuracy: 10, //How much the bullet target can deviate from the crosshair. (Higher = lower accuracy)

                magnetStrength: 0, //How much bullets gravitate towards the nearest enemy. (Higher = stronger) (Magnetic ammo increases by 0.2)

                randDmgMult: 1, //How much a bullets damage is multiplied by between 1 and this value.

                grow: 0, //How much a bullets size and damage is multiplied by every tick. (This value is added by 1, 0.25 grow = 1.25x)
                hitDamageMult: 1,

                thornDamage: 0, //How much damage the player takes when firing a bullet.

                spin: 0, //How many degrees bullets rotate every tick.

                slow: 0,

                coinChance: 0, //The percent chance of the bullet spawning a coin when hitting en enemy

                radiationSize: 0,

                style: 0, //0: Player bullet, 1: Enemy projectile
                shotParticleColor: [255,255,255],
                lockRot: false,
                silentShot: false,
            },
            melee: {
                damage: 25, //How much damage is dealt to enemies within the players melee hitbox.
                damageMult: 1, //Multiplies damage stat.
                cooldown: 75, //How long (in ticks) it takes to recharge the cooldown.
                size: 25, //How large (in pixels) the melee hitbox is.
                knockback: 5,

                explosionPower: 0, //How big and powerful the explosion created by meleeing an enemy is.
                heal: 0, //How much the player heals when meleeing an enemy.
            },
            ammo: {
                current: 10, //Ignore this
                max: 10, //The max ammount of ammo the player can hold.
                
                reloadSpeed: 60, //How long (in ticks) it takes to reload the weapon.
                reloadDate: 0, //Ignore this
                isReloading: false, //Ignore this

                autoFire: false, //Determines whether or not bullet automatically fire when holding left-click.
                stationaryFire: false, //Determines if the player has to be stationary to fire projectiles.

                garandReload: false, //Determines if the player can only reload when at 0 ammo.

                chargeShot: false, //Determines if the player can hold left click to fire stronger projectiles.
                chargeTime: 0, //How long (in ticks) it takes to deal maximum damage with a charge shot.
                chargeMultCap: 0, //The max amount the bullet damage is multiplied by when firing a max charge shot.

                stillSpeedIncrease: 0,

                burst: 1,
            },
            enemy: {
                levelIncrease: 0, //How many levels enemies are offset by.
                speedMult: 1, //How much enemy speed is multiplied by. This also effects shot and melee cooldowns.
                moneyMult: 1, //How much the amount of money an enemy drops is multiplied by.
            },
            misc: {
                areaSize: 500,
                waveInterval: 1000, //How long (in ticks) between each wave spawning.
                waveMoneyMult: 1,
                horseWeapon: false,
                horseIncrease: 1,
                pepsiPower: 1,
            },
            cheats: {
                invincible: false,
            }
        },
        
        elem: doge('player'),

        //Functions
        damage: (baseAmount, light, origin, hardDamage = 0, ignoreImmunity) => {
            if(!player.alive) return
            let idolAlive = false
            for(const enemy of elems.enemies) {
                if(enemy.data.data.name === 'Idol' && enemy.data.active) {
                    idolAlive = true
                    break
                }
            }

            const amount = baseAmount / (1 + (player.stats.player.armor ?? 0))

            const startAmount = player.health
            if(!player.immune && e.gameUpdates - (player.lastHitDate >= player.stats.player.immunityTime || ignoreImmunity) && !player.stats.cheats.invincible) {
                if(player.health - amount < 1 && player.health > 1) {
                    player.health = 1
                } else {
                    if(amount > 0) {
                        player.health -= amount
                    } else if(!idolAlive) {
                        player.health -= amount
                    }
                }
            }

            player.hardDamage += hardDamage
            player.hardDamage = Math.max(Math.min(player.hardDamage, player.stats.player.maxHealth / 2),0)

            player.health = Math.max(Math.min(player.health, player.stats.player.maxHealth - player.hardDamage),0)
            
            if(amount > 0 && !player.immune && e.gameUpdates - player.lastHitDate >= player.stats.player.immunityTime && !player.stats.cheats.invincible) {          
                player.gameOverStats.damageTaken += -(player.health - startAmount)
                
                player.elem.style.animation = 'none'
                setTimeout(() => {
                    player.elem.style.animation = 'playerHit 250ms ease-out 1 forwards'
                }, e.gameUpdateInterval)
                
                if(!light) {
                    player.getPower(-(Math.min(amount / 2, 15)))
                    DeBread.playSound('audio/hit.mp3')
                    
                    player.combo = Math.round(player.combo / 2)

                    doge('streakCount').innerText = 'x'+Math.floor(player.combo/100)
                    DeBread.easeShake(doge('streakCount'),10,5,0.25)

                    player.perfectWave = false
                    player.lastHitDate = e.gameUpdates

                    //Explosive Damage
                    if(DeBread.randomNum(1,100) < player.stats.player.explosiveHitChance) {
                        createExplosion([...player.centerPos],player.stats.player.size * 3, player.stats.bullet.damage * player.stats.player.explosiveHitDamage, 50, true)
                    }

                    player.perfectSet = false
                    
                    if(saveData.selectedChallenge === 'perfect' && doge('perfect') && player.timesHit === 0) {
                        DeBread.playSound('audio/perfectFail.mp3')
                        DeBread.easeShake(doge('perfect'),10,10,0.25)
                    }
                    player.timesHit++
                }

            }

            doge('healthBar').style.width = player.health / player.stats.player.maxHealth * 100 + '%'   
            doge('hardDamageBar').style.width = player.hardDamage / player.stats.player.maxHealth * 100 + '%'    

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

            if(amount < 0 && Math.abs(DeBread.round(amount, 1)) !== 0) {
                if(!idolAlive && !light) {
                    const popup = createPopupText('+'+DeBread.round(Math.abs(amount), 1), player.centerPos)
                    popup.style.color = 'lime'
                    popup.style.fontSize = '15px'
                    doge('area').append(popup)
    
                    if(amount <= -25) {
                        createParticles(player.centerPos, 10, 10, [25, 50], 500, 'ease-out', {backgroundColor: 'lime',zIndex: '5'})
                    }

                    player.isBleeding = false
                }
            }

            if(player.health <= 0) player.kill()

            if(player.health <= player.stats.player.maxHealth * 0.25) {
                doge('healthBarContainer').style.animation = 'healthBarAnim 1s ease-out infinite forwards'
            } else {
                doge('healthBarContainer').style.animation = 'none'
            }

            updateArea()
            return amount
        },

        kill: () => {
            if(player.alive && saveData.gameSettings.gamemode < 2) {
                player.elem.style.opacity = '0'
                doge('weapon').style.opacity = '0'

                for(let i = 0; i < 10; i++) {
                    createParticle(
                        0,
                        [...player.centerPos],
                        DeBread.randomNum(0,10),
                        1.1,
                        DeBread.randomNum(0,Math.PI*2,10),
                        player.stats.player.size / 2,
                        1.1,
                        50,
                        {
                            color: `rgb(${characters[saveData.selectedCharacter].color})`
                        }
                    )
                }

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

                                        if(saveData.stats.list.Times_Died === 1) {
                                            openPrompt(
                                                'Thanks for playtesting!',
                                                'If you would like to stay up to date with Goober Shooter 2 news, join my Discord Server!<br>If you encountered any bugs, make sure to fill out the Bug Report form.',
                                                [
                                                    {
                                                        text: 'Join Discord Server',
                                                        onclick: () => {
                                                            window.open('https://discord.gg/ecCBTRD2hN','_blank')
                                                        }
                                                    },
                                                    {
                                                        text: 'Report a bug',
                                                        onclick: () => {
                                                            window.open('https://forms.gle/JDaQUZ1wR6GhAscZ8','_blank')
                                                        }
                                                    },
                                                    {
                                                        text: 'Support me!',
                                                        onclick: () => {
                                                            window.open('https://buymeacoffee.com/debread','_blank')
                                                        }
                                                    },
                                                    {
                                                        text: 'Shut up',
                                                        onclick: closePrompt
                                                    }
                                                ],
                                                [450,225]
                                            )
                                        }
                                    }
                                }, 25 * i);
                            }
                        }
                    }, i * 100);
                }
                player.alive = false
                saveData.stats.list.Times_Died++
            }
        },

        melee: () => {
            if(e.gameUpdates - player.lastMeleeDate >= player.stats.melee.cooldown) {
                doge('meleeHitbox').style.animation = 'meleeHitboxHit 500ms ease-out 1 forwards'
                elems.enemies.forEach(enemy => {
                    if(isColliding(doge('meleeHitbox'), enemy) && enemy.data.active) {
                        const popup = createPopupText(DeBread.round(enemy.data.damage(player.stats.melee.damage * player.stats.melee.damageMult)), [...enemy.data.centerPos])
                        popup.style.color = 'white'
                        popup.style.fontSize = Math.min(Math.max(player.stats.melee.damage / 5, 15), 50) + 'px'
                        doge('area').append(popup)

                        if(!enemy.data.alive) {
                            getAchievement('Knuckle_Sandwich')
                        }


                        player.damage(-player.stats.melee.heal)

                        getStyle(styles.punch)

                        if(player.stats.melee.explosionPower) {
                            createExplosion([...doge('meleeHitbox').pos], 50 + player.stats.melee.explosionPower, player.stats.melee.damage, 10, true)
                        }

                        if(player.stats.melee.knockback > 0) {
                            enemy.data.dirVels.push({
                                angle: Math.atan2(enemy.data.centerPos[1] - player.centerPos[1], enemy.data.centerPos[0] - player.centerPos[0]),
                                speed: player.stats.melee.knockback,
                                div: 1.25,
                            })
                        }

                        if(player.tutorial.stage === 6) {
                            player.tutorial.goalValue++
                            updateTutorialGoal()
                        }
                    }
                })

                //Parry
                let projectileHit = false
                doge('area').querySelectorAll('.projectile').forEach(projectile => {
                    if(isColliding(doge('meleeHitbox'), projectile) && !projectile.cannotBeParried) {
                        if(projectile.origin === player) {
                            if(elems.enemies.length > 0) {
                                player.getPower(1)
                                player.damage(-1)
                            }
                        } else {
                            player.damage(-player.stats.player.parryHeal)
                            player.getPower(5)
                        }

                        if(projectile.isParried) {
                            getStyle(styles.counterParry)
                        } else if(projectile.origin === player) {
                            getStyle(styles.projectileBoost)
                        } else {
                            getStyle(styles.parry)
                        }

                        projectile.angle = Math.atan2(projectile.pos[1] - e.relCursorPos[1], projectile.pos[0] - e.relCursorPos[0])
                        projectile.speed += 10
                        projectile.data.explosionSize = 100
                        projectile.damage *= 1.5
                        projectile.targetList = elems.enemies
                        projectile.isParried = true

                        if(player.stats.player.parryHoming) {
                            if(projectile.data.magnetStrength) {
                                projectile.data.magnetStrength += player.stats.player.parryHoming
                            } else {
                                projectile.data.magnetStrength = player.stats.player.parryHoming
                            }
                        }

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
                        DeBread.playSound('audio/parry.mp3')

                        setTimeout(() => {
                            parryEffect.remove()
                        }, 250);

                        if(player.tutorial.stage === 7) {
                            player.tutorial.goalValue++
                            updateTutorialGoal()
                        }

                        if(saveData.selectedChallenge === 'skillsUSA') {
                            const compliments = [
                                'Good job!',
                                'Nice one!',
                                'Good timing!',
                                'Wow!',
                                'I\'m proud of you!',
                                'Look at you go!',
                                'Oh my!',
                                'Your\'re awesome!'
                            ]
                            area.createNotice(compliments[DeBread.randomNum(0,compliments.length-1)])
                        }

                        getAchievement('Stylish')

                        if(projectile.origin === player) {
                            getAchievement('Intentional_Game_Design')
                        }
                    }
                })
                doge('area').querySelectorAll('.superMagnet').forEach(magnet => {
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
            player.power = Math.max(Math.min(player.power + amount * multiplier, player.stats.player.maxPower), 0)

            updateUI()

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

            if(player.power === player.stats.player.maxPower) {
                doge('powerContainer').style.animation = 'powerBarAnim 1s ease-out infinite forwards'
            } else {
                doge('powerContainer').style.animation = 'none'
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
                    let repeats = player.stats.player.powerItemRepeats+1
                    repeats += Math.floor(player.stats.player.powerItemRepeatChance / 100)

                    if(DeBread.randomNum(1,100) < player.stats.player.powerItemRepeatChance % 100) {
                        repeats++
                    }

                    for(let i = 0; i < repeats; i++) {
                        createTimeout(() => {
                            player.powerItem.use()
                        }, (10 / repeats) * i)
                    }
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

                if(player.power < player.powerItem.charge && saveData.gameSettings.gamemode !== 2) {
                    DeBread.shake(doge('powerContainer'),10,10,0,250)
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

            if(player.money >= 1000) {
                getAchievement('Greed')
            }
        },

        updatePosition: () => {
            if(player.alive) {
                const elem = player.elem
        
                //Lock in-bounds
                if(player.pos[0] < 0) {
                    player.pos[0] = 0
                    player.vel[0] = 0
                }

                if(player.pos[1] < 0) {
                    player.pos[1] = 0
                    player.vel[1] = 1
                }

                if(player.pos[0] > doge('area').offsetWidth - player.elem.offsetWidth) {
                    player.pos[0] = doge('area').offsetWidth - player.elem.offsetWidth
                    player.vel[0] = 0
                }
                if(player.pos[1] > doge('area').offsetHeight - player.elem.offsetHeight) {
                    player.pos[1] = doge('area').offsetHeight - player.elem.offsetHeight
                    player.vel[1] = 0
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
                    Math.max(Math.min(player.centerPos[0] + Math.cos(angle) * Math.min(cursorDisance / 2, player.stats.player.maxWeaponDistance), doge('area').offsetWidth), 0),
                    Math.max(Math.min(player.centerPos[1] + Math.sin(angle) * Math.min(cursorDisance / 2, player.stats.player.maxWeaponDistance), doge('area').offsetHeight), 0)
                ]

                for(let i = 0; i < weaponDirVels.length; i++) {
                    const dirVel = weaponDirVels[i]
                    doge('weapon').pos[0] += Math.cos(dirVel.angle) * dirVel.speed
                    doge('weapon').pos[1] += Math.sin(dirVel.angle) * dirVel.speed
        
                    dirVel.speed /= dirVel.div
                    if(Math.abs(dirVel.speed) <= 0.1) {
                        weaponDirVels.splice(i, 1)
                    }
                }

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

                if(player.stats.player.weaponContactDamage && e.gameUpdates % 5 === 0) {
                    createParticle(
                        1,
                        [
                            doge('weapon').getBoundingClientRect().left + doge('weapon').offsetWidth / 2 - doge('area').getBoundingClientRect().left,
                            doge('weapon').getBoundingClientRect().top + doge('weapon').offsetHeight / 2 - doge('area').getBoundingClientRect().top
                        ],
                        DeBread.randomNum(3,7,10),
                        1.25,
                        DeBread.randomNum(0,Math.PI*2,10),
                        5,
                        1.1,
                        25,
                        {color: `rgb(255, ${DeBread.randomNum(0, 255)}, 0, 0.25)`}
                    )
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

                if(player.stats.player.contactDamage || player.stats.player.fireTouch) {
                    elems.enemies.forEach(enemy => {
                        if(isColliding(player.elem, enemy)) {
                            enemy.data.damage(player.stats.player.contactDamage, true)
                            if(!enemy.data.alive) {
                                getStyle(styles.trampled)
                            }

                            if(player.stats.player.fireTouch) {
                                enemy.data.onFire = true
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

const weaponDirVels = []

function startGame() {
    doge('gameOverContainer').style.display = 'none'

    e.gameActive = true
    e.gameUpdates = 0
    e.gameUpdateInterval = 20
    player.pos[0] = doge('area').offsetWidth / 2 - player.elem.offsetWidth / 2
    player.pos[1] = doge('area').offsetHeight / 2 - player.elem.offsetWidth / 2
    
    player = createPlayer()
    player.elem.data = player
    player.elem.style.opacity = '1'
    doge('weapon').style.opacity = '1'
    player.characterWeapon = characters[saveData.selectedCharacter].weapon
    doge('gameWeaponName').innerText = characters[saveData.selectedCharacter].weapon.name

    cleanArea()
    
    doge('gameWaveCounter').innerText = '0'
    doge('gameStyleContainer').innerHTML = ''

    doge('gameShopUpgradesButtons').style.opacity = '1'
    doge('gameShopUpgradesButtons').style.pointerEvents = 'unset'

    doge('gameBossbarContainer').innerHTML = ''

    updateShopTab()
    doge('gameShopContainer').style.display = 'none'
    player.elem.style.scale = '1'
    doge('weapon').style.scale = '1'
    
    addStyles(doge('continueButton'), {
        opacity: '1',
        pointerEvents: 'unset'
    })

    addStyles(doge('gameShopUpgradesButtons'), {
        opacity: '1',
        pointerEvents: 'unset'
    })

    doge('gameShopContainer').style.pointerEvents = 'unset'

    addStyles(doge('area'), {
        backgroundImage: 'unset',
        backgroundSize: 'unset',
        scale: '1'
    })
    
    doge('gameUIContainer').style.opacity = '1'
    if(saveData.gameSettings.gamemode === 4) {
        doge('pageTitle').innerText = 'Goober Shooter 2 - Credits'
        weaponPresets.none.apply()
        modifyStat(['melee','size'],'=0')
        modifyStat(['misc','areaSize'],'=512')
        renderCreditArea(creditAreas.main)

        addStyles(doge('area'), {
            backgroundImage: 'url(graphics/credits/floorTile.png)',
            backgroundSize: '128px',
            scale: '1.5'
        })

        doge('gameUIContainer').style.opacity = '0'
        saveData.selectedChallenge = 'none'
    } else if(saveData.gameSettings.gamemode === 3) {
        modifyStat(['melee','size'], '=0')
        modifyStat(['melee','damage'],'=0')
        modifyStat(['ammo','garandReload'], '=true')
        doge('pageTitle').innerText = 'Goober Shooter 2 - Tutorial'
        saveData.selectedChallenge = 'none'
    } else {
        characters[saveData.selectedCharacter].weapon.apply()
        if(characters[saveData.selectedCharacter].applyStats) {
            characters[saveData.selectedCharacter].applyStats()
        }
        challenges[saveData.selectedChallenge].apply()
        doge('pageTitle').innerText = 'Goober Shooter 2 - Wave 0'
    }

    player.stats.ammo.current = player.stats.ammo.max

    if(saveData.gameSettings.gamemode === 2) {
        doge('pageTitle').innerText = 'Goober Shooter 2 - Sandbox'
    }

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
    doge('gameMoneyCount').innerText = `$${player.money}`


    //CHALLENGE STUFF
    if(saveData.selectedChallenge === 'abstract') {
        area.createNotice('Things are getting weird!')
    }

    if(saveData.selectedChallenge === 'perfect') {
        const perfect = document.createElement('div')
        perfect.classList.add('entity')
        perfect.setAttribute('id','perfect')
        perfect.ticksActive = 0
        addStyles(perfect, {
            width: '64px',
            height: '64px',
            backgroundImage: 'url(graphics/perfect.png)',
            backgroundSize: '448px 64px',
            position: 'absolute',
            left: '-24px',
            top: '-64px'
        })

        perfect.tick = () => {
            if(player.timesHit > 0) {
                perfect.style.backgroundPosition = `-${64 * (Math.min(Math.floor(perfect.ticksActive / 2), 4)) + 128}px 0px`

                if(perfect.ticksActive > 10) {
                    perfect.style.opacity = Math.floor(perfect.ticksActive/3) % 2
                }

                if(perfect.ticksActive > 25) perfect.remove()

                perfect.ticksActive++

                if(doge('perfectText')) doge('perfectText').remove()
            }
        }

        const perfectOverlay = document.createElement('div')
        addStyles(perfectOverlay, {
            width: '64px',
            height: '64px',
            backgroundImage: 'url(graphics/perfect.png)',
            backgroundSize: '448px 64px',
            backgroundPosition: '-64px 0px',
            opacity: '0'
        })

        perfect.append(perfectOverlay)

        doge('area').append(perfect)

        const perfectText = document.createElement('span')
        perfectText.classList.add('entity')
        perfectText.setAttribute('id','perfectText')
        perfectText.ticksActive = 0
        perfectText.innerText = 'Go for a perfect!'
        addStyles(perfectText, {
            position: 'absolute',
            left: '36px',
            top: '-50px',
            width: '200px',
            fontWeight: '700'
        })

        perfectText.tick = () => {
            perfectText.ticksActive++
            perfectText.style.opacity = Math.floor(perfectText.ticksActive/25) % 2
        }

        doge('area').append(perfectText)
    }

    if(saveData.selectedChallenge === 'uncanny') {
        const uncanny = document.createElement('div')
        uncanny.classList.add('entity')
        uncanny.pos = [0,0]
        uncanny.angle = 0
        addStyles(uncanny, {
            width: '36px',
            height: '36px',
            backgroundColor: 'red',
            position: 'absolute',
            translate: '-50% -50%',
            backgroundImage: 'url(graphics/uncanny.png)',
            backgroundSize: 'cover'
        })

        uncanny.tick = () => {
            if(player.inPortal) return 0

            const targetAngle = Math.atan2(
                uncanny.pos[1] - player.centerPos[1],
                uncanny.pos[0] - player.centerPos[0]
            )
    
            let delta = targetAngle - uncanny.angle
            delta = Math.atan2(Math.sin(delta), Math.cos(delta))
            uncanny.angle += delta * 0.1

            addStyles(uncanny, {
                left: uncanny.pos[0]+'px',
                top: uncanny.pos[1]+'px'
            })

            uncanny.pos[0] -= Math.cos(uncanny.angle)
            uncanny.pos[1] -= Math.sin(uncanny.angle)

            if(isColliding(uncanny, player.elem) && player.alive) {
                player.damage(Infinity, false, uncanny, Infinity, true)
                player.damage(Infinity, false, uncanny, Infinity, true)

                const jumpscare = document.createElement('img')
                jumpscare.src = 'graphics/uncanny.png'
                addStyles(jumpscare, {
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    width: '100dvw',
                    height: '100dvh',
                    zIndex: '9999999999999999999999999',
                    opacity: '0',
                    animation: 'perfectOverlayPulse 1s ease-out 1 forwards'
                })

                setTimeout(() => {
                    jumpscare.remove()
                }, 1000);

                document.body.append(jumpscare)

                DeBread.playSound('audio/uncannyScream.mp3')
            }
        }

        doge('area').append(uncanny)
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

    //Debug stuff
    // spawnEnemy([100,100],enemies.mountedDummy,0,0)
    // player.stats.bullet.coinChance = 1000

    timeouts = []
    renderStats()
    fixStats()
    updateUI()
    updateArea()

    createTimeout(() => {
        progressWave()
    }, 25)
}

function cleanArea() {
    doge('area').querySelectorAll('.enemy').forEach(enemy => {enemy.remove()})
    elems.enemies = []
    doge('area').querySelectorAll('.pickup').forEach(pickup => {pickup.remove()})
    elems.pickups = []
    doge('area').querySelectorAll('.bullet').forEach(bullet => {bullet.remove()})
    doge('area').querySelectorAll('.enemyProjectile').forEach(bullet => {bullet.remove()})
    doge('area').querySelectorAll('.portal').forEach(portal => {portal.remove()})
    doge('area').querySelectorAll('.poisonField').forEach(field => {field.remove()})
    doge('area').querySelectorAll('.entity').forEach(entity => {entity.remove()})
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
            for(let b = 0; b < player.stats.ammo.burst; b++) {
                timeouts.push({
                    duration: b,
                    run: () => {
                        const cursorDist = Math.sqrt(Math.pow(player.centerPos[0] - e.relCursorPos[0],2) + Math.pow(player.centerPos[1] - e.relCursorPos[1],2)) / 100
                        if(
                            player.stats.ammo.current > 0 && 
                            !player.stats.ammo.isReloading && 
                            ((e.gameUpdates - player.stats.bullet.lastShotDate) > player.stats.bullet.shotCooldown || b > 0)
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
                            
                            if(!player.stats.bullet.silentShot) {
                                DeBread.playSound('audio/shoot.mp3', DeBread.randomNum(0.95,1.05,5), false)
                            }
            
                            if(player.tutorial.stage === 1) {
                                player.tutorial.goalValue++
                                updateTutorialGoal()
                            }
                            
                            for(let i = 0; i < player.stats.bullet.multishot; i++) {
                                if(player.stats.ammo.current > 0) {
                                    player.dirVels.push({angle: bulletAngle, speed: player.stats.bullet.recoil, div: 1.25})
                                    weaponDirVels.push({angle: bulletAngle, speed: player.stats.bullet.physRecoil, div: 1.25})
            
                                    const bulletPos = [...weaponPos]
                                    player.stats.ammo.current--
                
                                    const t = (i - (DeBread.round(player.stats.bullet.multishot) - 1) / 2)
                                    const offset = (t / DeBread.round(player.stats.bullet.multishot)) * Math.PI / 12
                                    
                                    // createBullet(bulletPos, bulletAngle + offset)
                                    const proj = createProjectile(player.stats.bullet.style, bulletPos, bulletAngle + offset, player.stats.bullet, elems.enemies, player)
            
                                    player.onShoot(proj)
                                    
                                    if(player.health > 1) {
                                        player.damage(player.stats.bullet.thornDamage, true)
                                    }
                                    
                                    player.bulletsShot++

                                    for(let i = 0; i < 5; i++) { //looking back at this now, i is defined twice but still works?!?!?!????
                                        createParticle(
                                            1, //layer
                                            [...bulletPos], //position 
                                            player.stats.bullet.speed * DeBread.randomNum(0.5,1.5,10), //speed 
                                            1.1, //speed div
                                            bulletAngle + offset - Math.PI + DeBread.randomNum(-0.25,0.25,10), //angle 
                                            player.stats.bullet.size / 2, //size
                                            1.25, //size div
                                            25, //duration
                                            {
                                                color: `rgb(${player.stats.bullet.shotParticleColor})`
                                            }
                                        )
                                    }

                                    doge('weapon').style.animation = ''
                                    requestAnimationFrame(() => {
                                        doge('weapon').style.animation = 'weaponSquish 100ms ease-out 1 forwards'
                                    })
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
                                    createProjectile(player.stats.bullet.style, [...wisp.pos], angle, player.stats.bullet, elems.enemies, player, {damage: player.stats.bullet.damage / 2})
                                })
                                updateUI()
                                player.stats.bullet.lastShotDate = e.gameUpdates
                            }
                        } else {
                            if(player.stats.ammo.current <= 0 && saveData.gameSettings.gamemode !== 3 && saveData.settings.autoReload) {
                                const weapon = weapons[player.weapon]
                                weapon.r()
                            }
                            if(player.stats.ammo.max > 0) {
                                DeBread.playSound('audio/noAmmo.mp3')
                            }
                        }
            
                        document.querySelectorAll('.walfling').forEach(walfling => {
                            const angle = Math.atan2(
                                walfling.pos[1] - DeBread.randomNum(
                                    e.relCursorPos[1] - player.stats.bullet.accuracy / 2 * cursorDist, 
                                    e.relCursorPos[1] + player.stats.bullet.accuracy / 2 * cursorDist
                                ), 
                                walfling.pos[0] + doge('weapon').offsetWidth / 2 - DeBread.randomNum(
                                    e.relCursorPos[0] - player.stats.bullet.accuracy / 2 * cursorDist, 
                                    e.relCursorPos[0] + player.stats.bullet.accuracy / 2 * cursorDist
                                ) 
                            )
                            createProjectile(0, [...walfling.pos], angle, player.stats.bullet, elems.enemies, player)
                            player.damage(player.stats.bullet.thornDamage, true)
                        })
                    }
                })
            }
        },

        r: () => {
            function reload() {

                player.stats.ammo.isReloading = true
                player.stats.ammo.reloadDate = e.gameUpdates
                
                if(player.stats.ammo.reloadSpeed <= 50) {
                    DeBread.playSound('audio/reload-full.mp3', 50 / player.stats.ammo.reloadSpeed, false)
                } else {
                    DeBread.playSound('audio/reload-full.mp3')
                }
            }
            if(!player.stats.ammo.isReloading && player.stats.ammo.current < player.stats.ammo.max) {
                if(player.stats.ammo.garandReload) {
                    if(player.stats.ammo.current === 0) {
                        reload()
                    } else {
                        DeBread.playSound('audio/noAmmo.mp3')
                    }
                } else {
                    reload()
                }
            }
        }
    }
}

const projectileBase = document.createElement('div')
projectileBase.classList.add('projectile')
function createProjectile(style, pos, angle, data, targetList, origin, extraData = {}) {
    const proj = projectileBase.cloneNode(true)
    proj.classList.add('entity')
    proj.pos = [...pos]
    proj.size = extraData.size ?? data.size
    proj.angle = angle
    proj.dateSpawned = e.gameUpdates
    proj.origin = origin
    proj.kills = 0
    proj.lastDamageDate = 0
    
    proj.data = {...data}
    const pData = proj.data

    proj.targetList = extraData.targetList ?? targetList
    proj.damage = extraData.damage ?? data.damage
    //Apply damage multiplier
    proj.damage *= data.damageMult ?? 1
    
    //Additional crit mults for crit chance above 100%
    for(let i = 0; i < Math.floor(data.critChance / 100); i++) {
        proj.damage *= data.critDamageMult ?? 1
        proj.isCrit = true
    }
    
    //Apply crit mult
    if(DeBread.randomNum(0,100,5) <= data.critChance % 100) {
        proj.damage *= data.critDamageMult ?? 1 
        proj.isCrit = true
    }
    
    //Rigged dice mult
    if(origin === player) {
        proj.damage *= DeBread.randomNum(1, data.randDmgMult ?? 1,10) * player.chargeDmgMult
    } else {
        proj.damage *= DeBread.randomNum(1, data.randDmgMult ?? 1,10)
    }
    
    //Charging rounds size increase
    if(player.stats.ammo.chargeShot && origin === player) {
        proj.size *= 1 + (player.chargeDmgMult / player.stats.ammo.chargeMultCap)
    }

    proj.speed = data.speed
    
    proj.bounces = data.bounces ?? 0
    proj.splits = extraData.splits ?? 0
    proj.drillTicks = data.drillTicks ?? 0
    proj.isParried = false

    //Add additional chance drill ticks
    for(let i = 0; i < Math.floor(data.drillChance / 100); i++) {
        proj.drillTicks++
    }
    
    if(DeBread.randomNum(0,100,5) <= data.drillChance % 100) {
        proj.drillTicks++
    }
    
    addStyles(proj, {
        left: proj.pos[0]+'px',
        top: proj.pos[1]+'px',
        width: data.size + 'px',
        height: data.size + 'px',
    })

    if(!player.stats.bullet.lockRot && style !== 2) {
        proj.style.rotate = proj.angle+'rad'
    }

    const overlayBase = document.createElement('img')
    addStyles(overlayBase, {
        position: 'absolute',
        width: '200%',
        height: '200%',
        pointerEvents: 'none',
        rotate: `-${proj.angle}rad`,
    })

    //Add bullet overlays
    if(data.electricChainLength > 0) {
        const overlay = overlayBase.cloneNode()
        overlay.src = 'graphics/electricBullet.gif'
        proj.append(overlay)
    }

    if(data.magnetStrength > 0) {
        const overlay = overlayBase.cloneNode()
        overlay.src = 'graphics/magneticBullet.png'
        proj.append(overlay)
    }

    if(data.explosionSize > 0) {
        const overlay = document.createElement('div')
        addStyles(overlay, {
            position: 'absolute',
            borderRadius: '50%',
            width: data.explosionSize+'px',
            height: data.explosionSize+'px',
            outline: '2px solid rgb(255,0,0,0.25)'
        })
        proj.append(overlay)
    }

    if(data.fireyAmmo) {
        const overlay = overlayBase.cloneNode()
        overlay.src = 'graphics/fireLargeCentered.gif'
        addStyles(overlay, {
            scale: '4',
            opacity: '0.5',
        })
        proj.append(overlay)    
    }

    if(data.radiationSize > 0) {
        const overlay = document.createElement('div')
        addStyles(overlay, {
            position: 'absolute',
            borderRadius: '50%',
            width: data.radiationSize*2+'px',
            height: data.radiationSize*2+'px',
            outline: '2px solid rgb(0,255,0,0.25)'
        })
        proj.append(overlay)
    }
    
    if(style === 0) {
        proj.color = 'white'
        addStyles(proj, {
            backgroundImage: 'url(graphics/bullet.png)',
            backgroundSize: 'cover'
        })
        
        if(characters[saveData.selectedCharacter].weapon.bulletTexture) {
            proj.style.backgroundImage = `url(graphics/weapons/${characters[saveData.selectedCharacter].weapon.name.replaceAll(' ','_').toLowerCase()}_bullet.png)`
        } else if(characters[saveData.selectedCharacter].weapon.animatedBulletTexture) {
            proj.style.backgroundImage = `url(graphics/weapons/${characters[saveData.selectedCharacter].weapon.name.replaceAll(' ','_').toLowerCase()}_bullet.gif)`
        }
    } else if(style === 2) {
        proj.color = 'white'
        addStyles(proj, {
            borderRadius: '0',
            backgroundColor: `rgba(${characters[saveData.selectedCharacter].color},0.1)`,
            outline: `1px solid rgb(${characters[saveData.selectedCharacter].color})`,
            animation: 'projectileIn 250ms ease-out 1 forwards'
        })
    } else {
        proj.color = 'rgb(255,100,100)'
        addStyles(proj, {
            backgroundColor: 'rgb(255,100,100)',
            outline: '2px solid black',
            borderRadius: '50%',
            zIndex: '7',
            animation: 'projectileIn 250ms ease-out 1 forwards'
        })
    }

    proj.tick = () => {
        proj.beforePos = [...proj.pos]
        proj.pos[0] += -Math.cos(proj.angle) * proj.speed
        proj.pos[1] += -Math.sin(proj.angle) * proj.speed
        
        if(
            proj.pos[0] + -Math.cos(proj.angle) * proj.speed < 0 ||
            proj.pos[0] + -Math.cos(proj.angle) * proj.speed > doge('area').offsetWidth ||
            proj.pos[1] + -Math.sin(proj.angle) * proj.speed < 0 ||
            proj.pos[1] + -Math.sin(proj.angle) * proj.speed > doge('area').offsetHeight
        ) {
            if(proj.bounces > 0) {
                if( //X axis
                    proj.pos[0] + -Math.cos(proj.angle) * proj.speed < 0 ||
                    proj.pos[0] + -Math.cos(proj.angle) * proj.speed > doge('area').offsetWidth
                ) {
                    proj.angle = Math.PI - proj.angle
                }

                if( //Y axis
                    proj.pos[1] + -Math.sin(proj.angle) * proj.speed < 0 ||
                    proj.pos[1] + -Math.sin(proj.angle) * proj.speed > doge('area').offsetHeight
                ) {
                    proj.angle = -proj.angle
                }
                
                if(style !== 2) {
                    if(pData.spin > 0) {
                        proj.style.rotate = pData.spin + 'deg'
                    } else {
                        proj.style.rotate = proj.angle + 'rad'
                    }
                }
                
                createParticles(
                    proj.pos,
                    3,
                    10,
                    [10,25],
                    250,
                    'ease-out',
                    {backgroundColor: proj.color}
                )
                
                if(doge('area').children.length < 500) {
                    const bounceEffect = explosionEffectBase.cloneNode()
                    bounceEffect.style.setProperty('--explosionEffectScale','2')
                    addStyles(bounceEffect, {
                        left: proj.pos[0]+'px',
                        top: proj.pos[1]+'px',
                        width: '25px',
                        translate: '-50% -50%'
                    })
                    doge('area').append(bounceEffect)
                    
                    setTimeout(() => {
                        bounceEffect.remove()
                    }, 500);
                }

                proj.bounces--
                proj.damage *= 1.2
            } else {
                proj.destroy() 
            }
        }

        //Grow
        if(data.grow !== 0) {
            proj.damage *= 1 + 0.01 * (data.grow ?? 0)
            proj.size *= 1 + 0.01 * (data.grow ?? 0)
        }
        if(style !== 2) {
            proj.size = Math.max(Math.min(proj.size, 50),5)
        }
        
        //Speed div
        proj.speed /= data.speedDiv ?? 1

        //Range
        if(e.gameUpdates - proj.dateSpawned >= data.range) {
            proj.destroy()
        }
        
        //Projectile particles
        if(style !== 2) {
            //Parry particles
            if(proj.isParried) {
                createParticle(
                    0,
                    [...proj.pos],
                    0,
                    1,
                    0,
                    proj.size,
                    1.1,
                    50,
                    {
                        color: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`
                    }
                )
                // createParticles(
                //     [...proj.pos], 
                //     1, 
                //     proj.size, 
                //     [0,5], 
                //     1000, 
                //     'ease-out', 
                //     {
                //         backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`
                //     }
                // )
            }
    
            //Split particles
            if(extraData.splits !== data.splits && data.splits > 0) {
                createParticle(
                    0, 
                    [...proj.pos],
                    2,
                    1.1,
                    DeBread.randomNum(0, Math.PI * 2, 5),
                    proj.size,
                    1.1,
                    25,
                    {color: proj.color}
                )
                // createParticles(
                //     [...proj.beforePos],
                //     1,
                //     10,
                //     [0,0],
                //     250,
                //     'ease-out',
                //     {backgroundColor: proj.color}
                // )
            }
    
            //Seeking particles
            if(data.magnetStrength > 0 && e.gameUpdates % 2 === 0) {
                createParticle(
                    0, 
                    [...proj.pos],
                    1,
                    1.1,
                    DeBread.randomNum(0, Math.PI * 2, 5),
                    proj.size / 2,
                    1.1,
                    25,
                    {color: '#b830ff'}
                )
            }
    
            //Firey particles
            if(data.fireyAmmo > 0 && e.gameUpdates % 3 === 0) {
                createParticle(
                    0, 
                    [...proj.pos],
                    3,
                    1.1,
                    DeBread.randomNum(0, Math.PI * 2, 5),
                    proj.size / 2,
                    1.1,
                    25,
                    {color: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`}
                )
            }
    
            //Golden particles
            if(pData.coinChance > 0 && e.gameUpdates % 3 === 0) {
                createParticle(
                    0, 
                    [...proj.pos],
                    5,
                    1.5,
                    DeBread.randomNum(0, Math.PI * 2, 5),
                    proj.size,
                    1.5,
                    10,
                    {color: `rgb(255, 255, ${DeBread.randomNum(100, 200)})`}
                )
            }
        }

        addStyles(proj, {
            left: proj.pos[0]+'px',
            top: proj.pos[1]+'px',
            width: proj.size+'px',
            height: proj.size+'px',
        })

        proj.querySelectorAll('img').forEach(overlay => {
            overlay.style.rotate = `${proj.angle*-1}rad`
        })

        let closestTarget = {elem: undefined, dist: Infinity}
        proj.targetList.forEach(target => {
            //Get closest enemy for magnetic ammo 
            if(proj.data.magnetStrength > 0 && proj.targetList.length > 0) {
                const targetDist = Math.sqrt(
                    Math.pow(proj.pos[0] - target.data.centerPos[0],2),
                    Math.pow(proj.pos[1] - target.data.centerPos[1],2)
                )

                if(targetDist < closestTarget.dist) {
                    closestTarget.elem = target
                    closestTarget.dist = targetDist
                }
            }

            //Target collision check
            if(isColliding(proj, target)) {
                if(target.data.active && e.gameUpdates - proj.lastDamageDate > (data.damageInterval ?? -1)) {
                    proj.lastDamageDate = e.gameUpdates
                    let isSharp = data.sharpChance >= DeBread.randomNum(1,100)
                    if(isSharp) {
                        proj.damage *= 1.5
                    }
                    const damage = target.data.damage(proj.damage, false, proj)

                    const popup = createPopupText(formatNumber(DeBread.round(damage)), [...proj.pos])
                    if(proj.isCrit) {
                        popup.style.color = 'yellow'
                        popup.innerText += '!'
                    } else {
                        popup.style.color = 'white'
                    }
    
                    if(origin !== player) {
                        popup.style.color = '#ff6464'
                    }
                    popup.style.fontSize = Math.min(Math.max(proj.damage / 5, 15), 25) + 'px'
                    doge('area').append(popup)
    
                    //Hit damage mult
                    if(pData.hitDamageMult) {
                        proj.damage *= pData.hitDamageMult
                    }

                    //Drill ticks
                    if(proj.drillTicks <= 0) {
                        proj.destroy()
                    }
                    proj.drillTicks--

                    //Heal
                    if(data.heal) {
                        origin.damage(-data.heal)

                        if(origin !== player) {
                            const popup = createPopupText('+'+formatNumber(data.heal), [...origin.centerPos])
                            popup.style.color = 'lime'
                            popup.style.fontSize = '10px'
                            doge('area').append(popup)
                        }
                    }
    
                    //Knockback
                    target.data.dirVels.push({angle: proj.angle - Math.PI, speed: (data.knockback ?? 0) / (target.data.weight ?? 1), div: 1.1})
    
                    //Sharp rounds
                    if(isSharp) {
                        for(let i = 0; i < 5; i++) {
                            createParticle(
                                0,
                                [...proj.pos],
                                10,
                                1.25,
                                DeBread.randomNum(0,Math.PI*2),
                                5,
                                1.25,
                                50,
                                {
                                    color: 'red'
                                }
                            )
                        }

                        target.data.isBleeding = true
                    }

                    //Apply fire
                    if(data.fireyAmmo) {
                        if(target === player.elem) {
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
                        } else {
                            target.data.onFire = true
                        }
                    }

                    //Coins
                    if(pData.coinChance > 0) {
                        function getCoin() {
                            if(elems.pickups.length > 100) {
                                player.getMoney([1,5,10,25,100][getWeightedChance([100,50,20,5,1])])
                            } else {
                                pickups.coin(getWeightedChance([100,50,20,5,1]),[...proj.pos],5,1)
                            }
                        }
    
                        //Spawn additional coins for a coinChance above 100%
                        for(let i = 0; i < Math.floor(pData.coinChance / 100); i++) {
                            getCoin()
                        }
                        if(DeBread.randomNum(1,100) <= pData.coinChance - Math.floor(pData.coinChance / 100) * 100) {
                            getCoin()
                        }
                    }
    
                    //Electric chains
                    if(data.electricChainLength > 0) {
                        let targetsHit = [target]
                        let currentTarget = target
                        
                        for(let i = 0; i < data.electricChainLength; i++) {
                            let shortestTarget = {target: undefined, distance: Infinity, d: []}
                            proj.targetList.forEach(otherTarget => {
                                if(currentTarget !== otherTarget && !targetsHit.includes(otherTarget) && otherTarget.data.active) {
                                    const dx = currentTarget.data.pos[0] - otherTarget.data.pos[0]
                                    const dy = currentTarget.data.pos[1] - otherTarget.data.pos[1]
                                    
                                    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
                                    if(distance < shortestTarget.distance && distance <= data.electricChainReach + 100) {
                                        shortestTarget.target = otherTarget
                                        shortestTarget.distance = distance
                                        shortestTarget.d = [dx, dy]
                                    }
                                }
                            })
                            
                            if(shortestTarget.target === undefined) break
                            
                            const fromTarget = currentTarget
                            currentTarget = shortestTarget.target
                            const toTarget = currentTarget
    
                            const damage = data.damage / (i + 1)
                            shortestTarget.target.data.damage(damage, false, proj)
    
                            const popup = createPopupText(formatNumber(DeBread.round(damage)), [shortestTarget.target.data.centerPos[0],shortestTarget.target.data.centerPos[1]])
                            popup.style.color = 'aqua'
                            popup.style.fontSize = Math.min(Math.max(damage / 5, 15), 50) + 'px'
                            doge('area').append(popup)
    
                            if(origin === player) {
                                getStyle(styles.shocked)
                            }
                            
                            const targetsAngle = Math.atan2(fromTarget.data.centerPos[1] - toTarget.data.centerPos[1], fromTarget.data.centerPos[0] - toTarget.data.centerPos[0])
                            const targetsDist = Math.sqrt(
                                Math.pow(fromTarget.data.centerPos[0] - toTarget.data.centerPos[0],2) + 
                                Math.pow(fromTarget.data.centerPos[1] - toTarget.data.centerPos[1],2)
                            )
    
                            const chain = document.createElement('div')
                            addStyles(chain, {
                                width: targetsDist+'px',
                                height: '10px',
                                translate: '-50% -50%',
                                position: 'absolute',
                                left: (fromTarget.data.centerPos[0]+toTarget.data.centerPos[0])/2+'px',
                                top: (fromTarget.data.centerPos[1]+toTarget.data.centerPos[1])/2+'px',
                                rotate: targetsAngle+'rad',
                                backgroundImage: 'url(graphics/electricityChain.gif)',
                                backgroundSize: 'contain',
                                filter: 'drop-shadow(0px 0px 5px rgba(0,255,255,0.5))',
                                animation: 'electricityChain 250ms ease-out 1 forwards',
                                zIndex: 5,
                            })
                            setTimeout(() => {
                                chain.remove()
                            }, 250);
                            doge('area').append(chain)
    
                            targetsHit.push(shortestTarget.target)
                        }
                    }

                    if(proj.isParried) {
                        const shrapnelData = {...player.stats.bullet}
                        shrapnelData.damage *= 0.5
                        for(let i = 0; i < player.stats.player.parryShrapnel; i++) {
                            createProjectile(0, [...proj.pos], ((Math.PI * 2) / player.stats.player.parryShrapnel) * i, shrapnelData, elems.enemies, player)
                        }
                    }

                    if(proj.damage >= 100 && origin === player) {
                        getAchievement('Cooked')
                    }
                }
            }
        })

        //Magnet stuff
        if(closestTarget.elem) {
            if(style === 2 && proj.data.magnetStrength > 0) {
                proj.speed = Math.min(proj.speed + 0.1, 5)
            }
            const targetMagAngle = Math.atan2(
                proj.pos[1] - closestTarget.elem.data.centerPos[1],
                proj.pos[0] - closestTarget.elem.data.centerPos[0]
            )

            let delta = targetMagAngle - proj.angle

            delta = Math.atan2(Math.sin(delta), Math.cos(delta))

            proj.angle += delta * 0.1 * proj.data.magnetStrength
            if(style !== 2) {
                if(data.spin > 0) {
                    proj.style.rotate = proj.spin + 'deg'
                } else {
                    proj.style.rotate = proj.angle + 'rad'
                }
            }
        }

        //Supermagnet stuff
        if(document.querySelectorAll('.superMagnet').length > 0 && origin !== player) {
            doge('area').querySelectorAll('.superMagnet').forEach(magnet => {
                const angle = Math.atan2(
                    proj.pos[1] - magnet.pos[1],
                    proj.pos[0] - magnet.pos[0]
                )

                let delta = angle - proj.angle
                delta = Math.atan2(Math.sin(delta), Math.cos(delta))

                proj.angle += delta * 0.05

                const dis = Math.sqrt(
                    Math.pow(proj.pos[0] - magnet.pos[0],2) + 
                    Math.pow(proj.pos[1] - magnet.pos[1],2)
                )

                if(dis <= 100) {
                    proj.speed /= 1.01
                }
            })
        }

        //Radiation stuff
        if(data.radiationSize) {
            targetList.forEach(target => {
                if(target.data.active) {
                    const dis = Math.sqrt(
                        Math.pow(proj.pos[0] - target.data.centerPos[0],2) +
                        Math.pow(proj.pos[1] - target.data.centerPos[1],2)
                    )
    
                    const percent = Math.max(1 - dis / data.radiationSize, 0)
                    
                    if(percent > 0 && e.gameUpdates % 3 === 0) {
                        target.data.damage(proj.damage * percent, false, proj)
    
                        const popup = createPopupText(formatNumber(DeBread.round(proj.damage * percent + 0.5)), [...target.data.centerPos])
                        popup.style.color = 'lime'
                        popup.style.fontSize = Math.min(Math.max((proj.damage * percent + 0.5) / 5, 15), 50) + 'px'
                        doge('area').append(popup)
                    }
                }
            })
        }
    }

    proj.destroy = () => {
        proj.remove()
    
        if(data.split > 0 && proj.splits < data.splits) {
            for(let i = 0; i < data.split; i++) {
                createProjectile(
                    style,
                    [proj.pos[0],proj.pos[1]],
                    (2*Math.PI / data.split) * i + proj.angle + Math.PI / 2,
                    data,
                    proj.targetList,
                    player,
                    {
                        splits: proj.splits + 1,
                        damage: proj.damage / 2,
                    }
                )
            }
        }
    
        //Explosion
        if(proj.data.explosionSize > 0) {
            createExplosion(proj.pos, proj.data.explosionSize, proj.damage, (data.knockback ?? 2) * 10, false)
        }
    
        //Poison field
        if(DeBread.randomNum(1,100) <= data.poisonFieldChance) {
            createPoisonField([...proj.pos], data.poisonFieldSize, data.damage * data.poisonFieldDmgPercent / 100, data.poisonFieldTicks, 20, proj.targetList, data.poisonFieldColor)
        }
    
        //Parry poison field
        if(player.stats.player.parryPoisonSize > 0 && proj.isParried) {
            createPoisonField([...proj.pos], player.stats.player.parryPoisonSize, player.stats.player.parryPoisonDmg, player.stats.player.parryPoisonTicks, 20, proj.targetList, [255, 130, 226])
        }
    
        let breakColor = proj.color
        if(origin === player) breakColor = `rgb(${player.stats.bullet.shotParticleColor})`
        if(style === 2) return
        createParticles(
            [...proj.pos],
            5,
            proj.size,
            [10,25],
            250,
            'ease-out',
            {backgroundColor: breakColor}
        )
    }

    doge('area').append(proj)
    return proj
}

function createFloorItem(pos, itemKey, itemData) {
    // const entity = document.createElement('div')
    // entity.classList.add('entity')
    // entity.ticksActive = 0
    // addStyles(entity, {
    //     width: '32px',
    //     height: '32px',
    //     position: 'absolute',
    //     left: pos[0]+'px',
    //     top: pos[1]+'px',
    //     backgroundImage: `url(graphics/upgrades/${itemKey}.png)`,
    //     backgroundSize: 'cover'
    // })

    // entity.tick = () => {
    //     if(isColliding(entity,player.elem) && entity.ticksActive > 25) {
    //         entity.remove()
    //     }

    //     entity.ticksActive++
    // }

    createPickup(pos, {
        size: [36,36],
        texture: `upgrades/${itemKey}`,
        textureExtension: 'png',
        despawnTime: 250,

        onTouch: () => {
            itemData.apply()
        }
    })
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
    doge('hardDamageBar').style.width = player.hardDamage / player.stats.player.maxHealth * 100 + '%'    

    doge('powerBarNum').innerHTML = DeBread.round(player.power)
    doge('powerBar').style.width = player.power / player.stats.player.maxPower * 100+'%'

    if(player.powerItem) {
        doge('lowerPowerBar').style.width = player.powerItem.charge / player.stats.player.maxPower * 100 + '%'
        doge('powerItem').style.opacity = '1'
        doge('powerItem').src = `graphics/powerItems/${player.powerItem.id ?? player.powerItem.name.toLowerCase().replaceAll(' ','_')}.png`
        doge('powerItemContainer').style.width = 'unset'
        doge('gameTopLeft').style.gap = '25px'
    } else {
        doge('lowerPowerBar').style.width = '0%'
        doge('powerItem').src = `graphics/placeholder.png`
        doge('powerItem').style.opacity = '0'
        doge('powerItemContainer').style.width = '0px'
        doge('gameTopLeft').style.gap = '0px'
    }

    if(player.stats.player.canCarrySecondaryPowerItem) {
        doge('secondaryPowerItem').style.opacity = '1'
        doge('secondaryPowerItem').src = `graphics/powerItems/${player.secondaryPowerItem.id ?? player.secondaryPowerItem.name.toLowerCase().replaceAll(' ','_')}.png`
    } else {
        doge('secondaryPowerItem').style.opacity = '0'
    }
    doge('powerBarNum').innerText = DeBread.round(player.power)

    //Ammo
    if(!player.stats.ammo.isReloading) {
        doge('gameInnerAmmoBar').style.width = player.stats.ammo.current / player.stats.ammo.max * 100 + '%'
        doge('gameAmmoCount').innerText = player.stats.ammo.current.toString().padStart(2,'0')

        if(player.stats.ammo.max === Infinity) {
            doge('gameAmmoLinesCurrent').innerText = player.characterWeapon.ammoChar
            doge('gameAmmoLinesMax').innerText = ''
        } else {
            doge('gameAmmoLinesCurrent').innerText = player.characterWeapon.ammoChar.repeat(Math.min(player.stats.ammo.current, 50))
            doge('gameAmmoLinesMax').innerText = player.characterWeapon.ammoChar.repeat(Math.min(player.stats.ammo.max, 50) - Math.min(player.stats.ammo.current, 50))
        }
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
let timeoutID = 0
let timeouts = []

function createTimeout(callback, duration) {
    const timeout = {
        duration: duration,
        run: callback,
        finished: false,
    }
    
    timeouts.push(timeout)
    return timeouts.indexOf(timeout) 
}

const canvasCtxs = [doge('areaCanvasTop').getContext('2d'),doge('areaCanvasBottom').getContext('2d')]
const updateInterval = DeBread.createInterval(() => {
    if(currentMenu === 'game') {
        //Player movement
        if(e.gameActive && !dialogueActive) {
            if(e.keysDown.includes(saveData.keybinds.moveUp)) {
                if(Math.abs(player.vel[1] - player.stats.player.speedStep) < player.stats.player.speed) {
                    player.vel[1] -= player.stats.player.speedStep
                } else {
                    player.vel[1] = -player.stats.player.speed
                }
            } else if(e.keysDown.includes(saveData.keybinds.moveDown)) {
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
    
            if(e.keysDown.includes(saveData.keybinds.moveLeft)) {
                if(Math.abs(player.vel[0] - player.stats.player.speedStep) < player.stats.player.speed) {
                    player.vel[0] -= player.stats.player.speedStep
                } else {
                    player.vel[0] = -player.stats.player.speed
                }
            } else if(e.keysDown.includes(saveData.keybinds.moveRight)) {
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
        
            //Player move events
            if(Math.abs(player.vel[0]) > 0 || Math.abs(player.vel[1]) > 0) {
                if(e.gameUpdates - player.lastDustParticle > 2) {
                    if(player.stats.player.fireTouch) {
                        createParticles([DeBread.randomNum(player.pos[0], player.pos[0] + player.elem.offsetWidth),DeBread.randomNum(player.pos[1], player.pos[1] + player.elem.offsetHeight)], 1, 10, [0,10],750,'ease-out',{backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0, 0.5)`})
                    } else {
                        createParticles([DeBread.randomNum(player.pos[0], player.pos[0] + player.elem.offsetWidth),DeBread.randomNum(player.pos[1], player.pos[1] + player.elem.offsetHeight)], 1, 10, [0,10],750,'ease-out',{backgroundColor: 'rgb(100,100,100,0.25)'})
                    }
                    player.lastDustParticle = e.gameUpdates
                }

                //Player creep
                if(player.stats.player.droolSize > 0 && e.gameUpdates % 5 === 0) {
                    const data = {...player.stats.bullet}
                    data.size = player.stats.player.droolSize
                    data.speed = 0
                    data.knockback = 0
                    data.damageInterval = 10
                    data.drillTicks = Infinity

                    let angle = 0
                    if(elems.enemies.length > 0) {
                        let closestEnemy = {elem: undefined, dist: Infinity}
            
                        elems.enemies.forEach(enemy => {
                            const enemyDist = Math.sqrt(Math.pow(player.centerPos[0] - enemy.data.centerPos[0],2) + Math.pow(player.centerPos[1] - enemy.data.centerPos[1],2))
                            if(enemyDist < closestEnemy.dist) {
                                closestEnemy.elem = enemy
                                closestEnemy.dist = enemyDist
                            }
                        })
                        angle = Math.atan2(player.centerPos[1] - closestEnemy.elem.data.centerPos[1], player.centerPos[0] - closestEnemy.elem.data.centerPos[0])
                    }


                    const proj = createProjectile(2,[...player.centerPos],angle,data,elems.enemies,player)
                    proj.cannotBeParried = true
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
                doge('gameAmmoCount').innerText = 'RELOADING...'
                doge('gameAmmoLinesCurrent').innerText = ''
                doge('gameAmmoLinesMax').innerText = ''
                let reloadProgress = (e.gameUpdates - player.stats.ammo.reloadDate) / player.stats.ammo.reloadSpeed
                if(reloadProgress > 1) {
                    player.stats.ammo.isReloading = false
                    player.stats.ammo.current = player.stats.ammo.max
                    DeBread.shake(doge('gameAmmo'), e.gameUpdateInterval, 6.7, 0, 100,)
                    DeBread.playSound('audio/reload-long-end.mp3')
                    
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
            // doge('area').querySelectorAll('.bullet').forEach(bullet => {bullet.updatePosition(elems.enemies)})
    
            //Autofire
            if(
                player.stats.ammo.autoFire && 
                e.mouseDown[0] &&
                player.stats.ammo.current > 0 && 
                !player.stats.ammo.isReloading && 
                (e.gameUpdates - player.stats.bullet.lastShotDate) > player.stats.bullet.shotCooldown &&
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
    
                if(isColliding(enemy, doge('weapon')) && player.stats.player.weaponContactDamage > 0) {
                    enemy.data.damage(player.stats.player.weaponContactDamage)
                }
    
                if(doge('area').querySelectorAll('.tennisBall').length > 0) {
                    doge('area').querySelectorAll('.tennisBall').forEach(ball => {
                        if(isColliding(enemy, ball) && enemy.active) {
                            enemy.data.damage(10)
                        }
                    })
                }
            })
    
            doge('area').querySelectorAll('.projectile').forEach(projectile => {
                if(isColliding(doge('grazeHitbox'), projectile) && e.gameUpdates - player.lastGrazeDate >= player.stats.player.grazeCooldown && player.power < player.stats.player.maxPower && projectile.origin !== player) {
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
                    DeBread.playSound('audio/graze.mp3',1 + Math.max(player.power / 200, 0))
                }
    
                if(projectile.origin !== player) {
                    if(isColliding(doge('meleeHitbox'), projectile) && e.gameUpdates - player.lastMeleeDate >= player.stats.melee.cooldown) {
                        projectile.style.outline = '2px solid white'
                    } else {
                        projectile.style.outline = '2px solid black'
                    }
                }
            })
    
            //Waves
            if(
                (e.gameUpdates - player.lastWaveDate) >= player.stats.misc.waveInterval && 
                saveData.gameSettings.gamemode < 2 && 
                player.alive && 
                !player.autoWavesPaused && 
                !player.fightingBoss
            ) {
                progressWave(player.inPortal)
            }

            doge('gameInnerWaveBar').style.width = (e.gameUpdates - player.lastWaveDate) / player.stats.misc.waveInterval * 100 + '%'
    
            //Pickups
            const pickups = elems.pickups
            pickups.forEach(pickup => {
                pickup.tick()
                if(isColliding(player.elem, pickup)) {
                    if(pickup.data.requirement() && e.gameUpdates - pickup.data.dateSpawned > 20 && pickup.data.live) {
                        pickup.destroy()
                    }
                }
            })
        } //END OF PLAYER ALIVE TICKS

        //Timeouts
        for(const key in timeouts) {
            timeouts[key].duration--

            if(timeouts[key].duration <= 0 && !timeouts[key].finished) {
                timeouts[key].run()
                timeouts[key].finished = true

                //This is sadly going to cause more lag over time but im too lazy to improve it rn
                //wait what
            }
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
            doge('cursorCooldownBar').style.width = ((e.gameUpdates - player.stats.bullet.lastShotDate) / player.stats.bullet.shotCooldown) * 100 + '%'
        }
    
        //Remove hard damage and apply regen
        if(e.gameUpdates - player.lastHitDate >= 250) {
            if(player.hardDamage > 0) {
                player.hardDamage -= 0.25
                updateUI()
            }
    
            if(player.health < player.stats.player.maxHealth) {
                player.damage(-player.stats.player.healthRegen,true)
            }
        }
    
        //Canvas updating
        const topCtx = canvasCtxs[0]
        const bottomCtx = canvasCtxs[1]
    
        topCtx.clearRect(0, 0, doge('areaCanvasTop').width, doge('areaCanvasTop').height);
        bottomCtx.clearRect(0, 0, doge('areaCanvasBottom').width, doge('areaCanvasBottom').height);
    
        elems.enemies.forEach(enemy => {
            if(enemy.data.data.beamWidth && enemy.data.active) {
                bottomCtx.beginPath()
                bottomCtx.lineWidth = enemy.data.data.beamWidth
                bottomCtx.moveTo(enemy.data.centerPos[0],enemy.data.centerPos[1])
                bottomCtx.lineTo(player.centerPos[0],player.centerPos[1])
                bottomCtx.strokeStyle = `rgba(${enemy.data.data.color},0.5)`
                bottomCtx.stroke()
            }
        })
    
        for(const particle of particles) {
            const ctx = canvasCtxs[particle.layer]
            ctx.beginPath() //not doing this completely bricked my firefox
    
            ctx.strokeStyle = 'transparent'
            ctx.fillStyle = particle.styles.color
    
            // const size = particle.startingSize - (particle.startingSize / particle.maxDuration * (particle.maxDuration - particle.duration))
            if(Math.round(particle.size,1) !== 0) {
                particle.size /= particle.sizeDiv
            } else {
                particle.size = 0
            }
    
            // ctx.fillRect(particle.pos[0], particle.pos[1], particle.size, particle.size)
            ctx.arc(particle.pos[0], particle.pos[1], particle.size, 0, Math.PI * 2, true)
            ctx.fill()
            
            ctx.stroke()
        }
        updateParticles()
    
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
            player.damage(0.1, true)
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

        //Bleeding damage
        if(player.isBleeding) {
            player.damage(0.05, true, undefined, 0, true)

            if(e.gameUpdates % 4 === 0)
            createParticle(
                0,
                [DeBread.randomNum(player.pos[0], player.pos[0] + player.stats.player.size),DeBread.randomNum(player.pos[1], player.pos[1] + player.stats.player.size)],
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
    
        //Special enemies
        let leechAlive = false
        for(const enemy of elems.enemies) {
            if(['Leech'].includes(enemy.data.data.name) && enemy.data.active) {
                leechAlive = true
                break
            }
        }
    
        let idolAlive = false
        for(const enemy of elems.enemies) {
            if(['Idol'].includes(enemy.data.data.name) && enemy.data.active) {
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
            player.damage(1, true, undefined, 1)
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
                player.autoWavesPaused = true
    
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
            if(targetEnemy.data.active) {
                createPoisonField([targetEnemy.data.centerPos[0], targetEnemy.data.centerPos[1]], 100, player.stats.bullet.damage * player.stats.player.socksDamage, 1, 10, elems.enemies, [0,100,255])
            }
        }
        
        if(e.gameUpdates % Math.max(DeBread.round((50 / player.stats.player.passiveAbilityMult)), 1) === 0 && elems.enemies.length > 0) {
            for(let i = 0; i < player.stats.player.thirdEye; i++) {
                let closestEnemy = {elem: undefined, dist: Infinity}
        
                elems.enemies.forEach(enemy => {
                    const enemyDist = Math.sqrt(Math.pow(player.centerPos[0] - enemy.data.centerPos[0],2) + Math.pow(player.centerPos[1] - enemy.data.centerPos[1],2))
                    if(enemyDist < closestEnemy.dist) {
                        closestEnemy.elem = enemy
                        closestEnemy.dist = enemyDist
                    }
                })
                const enemyAngle = Math.atan2(player.centerPos[1] - closestEnemy.elem.data.centerPos[1], player.centerPos[0] - closestEnemy.elem.data.centerPos[0])
    
                const t = (i - (player.stats.player.thirdEye - 1) / 2)
                const offset = (t / player.stats.player.thirdEye) * Math.PI / 12
                const bulletPos = [...player.centerPos]
    
                createProjectile(0, bulletPos, enemyAngle + offset, player.stats.bullet, elems.enemies, player)
            }
        }
    
        //Combo stuff

        const beforeCombo = Math.floor(player.combo / 100)

        if(elems.enemies.length > 0) {
            if(player.combo > 100) {
                player.combo -= 0.25
            } else {
                player.combo = 100
            }
        }

        const afterCombo = Math.floor(player.combo / 100)
    
        if(beforeCombo !== afterCombo) {
            doge('streakCount').innerText = 'x'+afterCombo
            if(beforeCombo > afterCombo) {
                DeBread.easeShake(doge('streakCount'),10,5,0.25)
            }
        }

        doge('innerStreakBar').style.width = player.combo % 100 + '%'
        if(player.combo % 100 <= 20 && player.combo > 100) {
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
            doge('sandboxEnemy').style.backgroundColor = `rgb(${sandBoxEnemy.color})`
        } else {
            doge('sandboxEnemy').style.opacity = '0'
        }
        
        //Tick stuff
        document.querySelectorAll('.fire, .entity').forEach(elem => {
            if(elem.tick) {
                elem.tick(elems.enemies)
            }
        })
    

        //Music stuff
        if(player.alive) {
            if(player.fightingBoss) {
                changeTrack('gameBoss', true)
            } else if(elems.enemies.length > 0) {
                changeTrack('gameCombat', true)
            }
    
            if(elems.enemies.length === 0 && currentTrack === 'gameCombat' && e.gameUpdates - player.lastKillDate > 25) {
                changeTrack('gameClean', true)
            }
        } else if(currentTrack !== 'gameClean') {
            changeTrack('gameClean', true)
        }

        // tracks.gameClean.playbackRate = 20 / e.gameUpdateInterval
        // tracks.gameCombat.playbackRate = 20 / e.gameUpdateInterval

        //Random stuff
        if(e.gameUpdates % 500 === 0 && saveData.selectedChallenge === 'skillsUSA') {
            createNotification('Tip!','You can parry by pressing <strong>F</strong>! Give it a try!', undefined, 5000)
        }
    
        if(player.stats.player.powerRegen) {
            player.getPower(player.stats.player.powerRegen)
        }
    
        for(let i = elems.enemies.length - 1; i >= 0; i--) {
            if(!elems.enemies[i].data.alive) {
                elems.enemies.splice(elems.enemies.indexOf(elems.enemies[i]),1)
            }
        }
    
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
        doge('dbParticles').innerText = `Particles: ${formatNumber(particles.length)}/${saveData.settings.particleLimit}`
        doge('dbUpdates').innerText = `Updates: ${e.gameUpdates}`
        doge('dbTickInterval').innerText = `Tick Interval: ${e.gameUpdateInterval}ms/${DeBread.round(performance.now()-lastTickDate)}ms`
        doge('dbStatus').innerText = `Status Effects: ${JSON.stringify(player.statusEffects)}`
        doge('dbElems').innerText = `Elems: Enemies: ${elems.enemies.length} Pickups: ${(elems.pickups.length)}`
        
        //Hopefully try to fix the screen being partially stuck offscreen
        //Wow it actually works!!
        window.scrollTo(0,0)

        e.gameUpdates++
        lastTickDate = performance.now()
    }
}, 'e.gameUpdateInterval')

document.addEventListener('mousedown', ev => {
    if(e.gameActive && !e.gamePaused) {
        const weapon = weapons[player.weapon]
        if(weapon.leftClick && ev.button === 0 && !isHoveringOnSandbox) {
            if(sandBoxEnemy) {
                if(e.keysDown.includes('control') && sandBoxEnemy.boss) {
                    const enemy = sandBoxEnemy
                    const cursorPos = [e.relCursorPos[0] - enemy.size / 2, e.relCursorPos[1] - enemy.size / 2]
                    if(sandBoxEnemy.miniboss) {
                        startBossSequence(
                            {
                                name: characters[saveData.selectedCharacter].name,
                                imgSrc: `graphics/characters/${saveData.selectedCharacter}PortraitLarge.png`
                            },
                            {
                                name: sandBoxEnemy.name,
                                imgSrc: `graphics/enemies/${sandBoxEnemy.name.toLowerCase()}PortraitLarge.png`
                            }
                        )
                        createTimeout(() => {
                            spawnEnemy(cursorPos, enemy, 0)
                        }, 100)
                    } else {
                        startLargeBossSequence(
                            {
                                name: characters[saveData.selectedCharacter].name,
                                imgSrc: `graphics/characters/${saveData.selectedCharacter}PortraitLarge.png`
                            },
                            {
                                name: sandBoxEnemy.name,
                                imgSrc: `graphics/enemies/${sandBoxEnemy.name.toLowerCase()}PortraitLarge.png`
                            }
                        )
                        createTimeout(() => {
                            spawnEnemy(cursorPos, enemy, 0)
                        }, 500)
                    }
                } else {
                    spawnEnemy([e.relCursorPos[0] - sandBoxEnemy.size / 2, e.relCursorPos[1] - sandBoxEnemy.size / 2], sandBoxEnemy, 0)
                }
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
        if(weapon.r && key === saveData.keybinds.reload) {
            weapon.r()
        }

        if(parseInt(key) && doge('consumablesContainer').children[parseInt(key)-1]) {
            doge('consumablesContainer').children[parseInt(key)-1].use()
        }

        if(key === saveData.keybinds.melee) {
            player.melee()
        }
        
        if(player.powerItem) {
            if(key === saveData.keybinds.powerItem && !player.powerItem.canUseInShop) {
                player.usePowerItem()
            }
        }
    }

    if(player.powerItem) {
        if(player.powerItem.canUseInShop && key === saveData.keybinds.powerItem) {
            player.usePowerItem()
        }
    }

    if(key === ' ' && !player.tutorial.goal) {
        progressTutorial()
    }

    if(key === 'h' && saveData.gameSettings.gamemode === 2 && document.activeElement !== doge('sandboxItemsSearchbar')) {
        if(doge('gameSandboxContainer').style.display === 'flex') {
            doge('gameSandboxContainer').style.display = 'none'
        } else {
            doge('gameSandboxContainer').style.display = 'flex'
        }
    }

    if(key === 'e' && player.stats.player.canCarrySecondaryPowerItem) {
        const powerItems = [player.powerItem, player.secondaryPowerItem]
        player.powerItem = powerItems[1]
        player.secondaryPowerItem = powerItems[0]

        if(powerItemAnimTimeout) clearInterval(powerItemAnimTimeout)
        var powerItemAnimTimeout
        doge('powerItem').style.animation = 'none'
        doge('secondaryPowerItem').style.animation = 'none'
        requestAnimationFrame(() => {
            doge('powerItem').style.animation = 'powerItemOut 250ms ease-in-out 1 forwards'
            doge('secondaryPowerItem').style.animation = 'powerItemIn 250ms ease-in-out 1 forwards'
        })

        powerItemAnimTimeout = setTimeout(() => {
            doge('powerItem').style.animation = 'none'
            doge('secondaryPowerItem').style.animation = 'none'
            updateUI()
        }, 250);

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
    fire.pos = [...pos]
    fire.dirVels = []
    addStyles(fire, {
        position: 'absolute',
        left: fire.pos[0]+'px',
        top: fire.pos[1]+'px',
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
    fire.tick = () => {
        fire.ticksActive++

        if(fire.ticksActive > ticks) {
            fire.destroy()
        }

        for(let i = 0; i < fire.dirVels.length; i++) {
            const dirVel = fire.dirVels[i]
            fire.pos[0] += Math.cos(dirVel.angle) * dirVel.speed
            fire.pos[1] += Math.sin(dirVel.angle) * dirVel.speed

            dirVel.speed /= dirVel.div
            if(dirVel.speed <= 0.1) {
                fire.dirVels.splice(i, 1)
            }
        }

        addStyles(fire, {
            left: fire.pos[0]+'px',
            top: fire.pos[1]+'px'
        })
    }

    fire.destroy = () => {
        fire.remove()
        createParticles([...fire.pos], 10, 10, [0,50], 500, 'ease-out', {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`,filter:'blur(10px)'})
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

function createExplosion(pos, size, dmg, kb, ignorePlayer, col = [[255,255],[0,255],[0,0]], silent = false) {
    const explosion = explosionBase.cloneNode()
    const randomColor = `rgb(${DeBread.randomNum(col[0][0],col[0][1])},${DeBread.randomNum(col[1][0],col[1][1])},${DeBread.randomNum(col[2][0],col[2][1])},${col[3] ?? 1})`
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

    // DeBread.easeShake(doge('area'), e.gameUpdateInterval, Math.min(5, dmg), dmg / 25)
    doge('area').append(explosion)
    doge('area').append(explosionEffect)
    doge('area').append(largeExplosionEffect)

    if(!silent) DeBread.playSound('audio/explosion.mp3')

    setTimeout(() => {
        explosion.remove()
        explosionEffect.remove()
        largeExplosionEffect.remove()
    }, 500);

    elems.enemies.forEach(enemy => {
        const distance = Math.sqrt(
            Math.pow((pos[0]) - (enemy.data.pos[0] + enemy.data.size / 2),2) +
            Math.pow((pos[1]) - (enemy.data.pos[1] + enemy.data.size / 2),2)
        ) / 1.1 //Grace
        const distanceEffect = 1 - distance / size

        if(distance < size && enemy.data.active && !enemy.data.explosionImmunity) {
            enemy.data.damage(dmg * distanceEffect)
            if(dmg * distanceEffect > 0) {
                const popup = createPopupText(DeBread.round(dmg * distanceEffect), [...enemy.data.centerPos])
                popup.style.color = 'red'
                popup.style.fontSize = Math.min(Math.max(dmg * distanceEffect / 5, 15), 50) + 'px'
                doge('area').append(popup)
            }

            if(!enemy.data.alive) {
                getStyle(styles.exploded)
            }
        }

        if(distance / 2 < size && distanceEffect > 0) {
            const kbAngle = Math.atan2(
                pos[1] - enemy.data.pos[1] - enemy.data.size / 2,
                pos[0] - enemy.data.pos[0] - enemy.data.size / 2
            )

            if(enemy.data.speed > 0 && enemy.data.active) {
                enemy.data.dirVels.push({angle: kbAngle - Math.PI, speed: kb / 2, div: 1.2})
            }
        }
    })

    elems.pickups.forEach(pickup => {
        const distance = Math.sqrt(
            Math.pow(pos[0] - pickup.data.pos[0],2) +
            Math.pow(pos[1] - pickup.data.pos[1],2)
        )
        const distanceEffect = 1 - distance / size
        
        if(distance / 2 < size && distanceEffect > 0) {
            const kbAngle = Math.atan2(
                pos[1] - pickup.data.pos[1],
                pos[0] - pickup.data.pos[0]
            )

            pickup.data.dirVels.push({angle: kbAngle - Math.PI, speed: kb / 2, div: 1.2})
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

// function createPoisonField(pos, size, dmg, ticks, tickRate, circular = false, color = [255,255,255], ignoreEnemies = false) {
//     const field = document.createElement('div')
//     field.pos = pos
//     field.damage = dmg
//     field.circular = circular
//     field.size = size
//     field.tickRate = tickRate
//     field.ignoreEnemies = ignoreEnemies
    
//     field.ticks = 0
//     field.maxTicks = ticks

//     field.lastTick = e.gameUpdates
//     field.classList.add('poisonField')
//     field.classList.add('entity')
//     addStyles(field, {
//         left: pos[0]+'px',
//         top: pos[1]+'px',
//         width: size+'px',
//         height: size+'px',
//         zIndex: '5',
//         backgroundColor: `rgb(${color[0]},${color[1]},${color[2]}, 0.1)`,
//         outline: `1px solid rgb(${color[0]},${color[1]},${color[2]})`
//     })

//     if(circular) {
//         field.style.borderRadius = '50%'
//     }


//     field.tick = () => {
//         console.log('wo!')
//     }

//     doge('area').append(field)
// }

function createPoisonField(pos, size, dmg, ticks, tickRate, targets, color = [255,255,255]) {
    const field = document.createElement('div')
    field.classList.add('poisonField')
    field.classList.add('entity')

    field.active = true
    field.lastTick = e.gameUpdates
    field.ticks = ticks

    addStyles(field, {
        left: pos[0]+'px',
        top: pos[1]+'px',
        width: size+'px',
        height: size+'px',
        zIndex: '5',
        backgroundColor: `rgb(${color[0]},${color[1]},${color[2]}, 0.1)`,
        outline: `1px solid rgb(${color[0]},${color[1]},${color[2]})`
    })

    field.tick = () => {
        if(field.active) {
            if(e.gameUpdates - field.lastTick > tickRate) {
                targets.forEach(target => {
                    if(isColliding(field,target.data.elem) && target.data.active) {
                        const damage = target.data.damage(dmg)

                        const popup = createPopupText(DeBread.round(damage), [...target.data.centerPos])
                        popup.style.color = `rgb(${color[0]},${color[1]},${color[2]})`
                        popup.style.fontSize = Math.min(Math.max(damage / 5, 15), 50) + 'px'
                        doge('area').append(popup)
                    }
                })

                for(let i = 0; i < Math.min(size/10,10); i++) {
                    createParticle(
                        1,
                        [
                            DeBread.randomNum(pos[0] - size / 2, pos[0] + size / 2),
                            DeBread.randomNum(pos[1] - size / 2, pos[1] + size / 2)
                        ],
                        DeBread.randomNum(1,3,10),
                        1.1,
                        DeBread.randomNum(0,Math.PI*2,10),
                        5,
                        1.1,
                        50,
                        {
                            color: `rgb(${color[0]},${color[1]},${color[2]},0.25)`
                        }
                    )
                }

                field.lastTick = e.gameUpdates
                field.ticks--
            }
    
            if(field.ticks <= 0) {
                field.destroy()
            }
        }
    }

    field.destroy = () => {
        field.active = false
        field.style.animation = ''
        requestAnimationFrame(() => {
            field.style.animation = 'poisonFieldOut 500ms ease-in 1 forwards'
        })
        setTimeout(() => {
            field.remove()
        }, 500);
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
    zIndex: '7',
    transition: 'left linear 100ms, top linear 100ms'
})

function examplePickup() {
    createPickup(
        [100+DeBread.randomNum(-1,1,10),100+DeBread.randomNum(-1,1,10)],
        {
            size: [32,16],
            texture: 'coin0',
            onTouch: () => {
                player.getMoney(999)
            }
        }
    )
}

function createPickup(pos, data) {
    const pickup = pickupBase.cloneNode()
    pickup.classList.add('pickup')
    pickup.data = {
        data: data,
        color: data.col ?? 'white',
        pos: [DeBread.randomNum(pos[0]-1,pos[0]+1,10),DeBread.randomNum(pos[1]-1,pos[1]+1,10)],
        size: data.size ?? [32,32],
        speed: data.speed ?? 0,
        angle: data.angle ?? DeBread.randomNum(0,Math.PI*2,5),
        requirement: data.requirement ?? (() => {return true}),
        onTouch: data.onTouch,
        texture: data.texture,
        textureExtension: data.textureExtension ?? 'gif',
        sfx: data.sfx ?? `money${DeBread.randomNum(0,3)}.mp3`,
        despawnTime: data.despawnTime ?? Infinity,

        dateSpawned: e.gameUpdates,
        live: true,
        ticksActive: 0,
        dirVels: []
    }

    with(pickup.data) {
        addStyles(pickup, {
            left: pos[0]+'px',
            top: pos[1]+'px',
            width: size[0]+'px',
            height: size[1]+'px'
        })
        pickup.src = `graphics/${texture}.${textureExtension}`
    
    
        pickup.tick = () => {
            pos[0] += Math.cos(angle) * speed
            pos[1] += Math.sin(angle) * speed
    
            if(pos[0] < 0) pos[0] = 0
            if(pos[1] < 0) pos[1] = 0
            if(pos[0] > doge('area').offsetWidth) pos[0] = doge('area').offsetWidth
            if(pos[1] > doge('area').offsetHeight) pos[1] = doge('area').offsetHeight
    
    
            addStyles(pickup, {
                left: pos[0]+'px',
                top: pos[1]+'px',
            })
    
            speed /= 1.1
    
            for(let i = 0; i < dirVels.length; i++) {
                const dirVel = dirVels[i]
                pos[0] += Math.cos(dirVel.angle) * dirVel.speed
                pos[1] += Math.sin(dirVel.angle) * dirVel.speed
    
                dirVel.speed /= dirVel.div
                if(dirVel.speed <= 0.1) {
                    dirVels.splice(i, 1)
                }
            }
    
            elems.pickups.forEach(other => {
                if (pickup === other) return
    
                const dx = other.data.pos[0] - pos[0]
                const dy = other.data.pos[1] - pos[1]
    
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
    
                    pos[0] -= nx * push
                    pos[1] -= ny * push
    
                    other.data.pos[0] += nx * push
                    other.data.pos[1] += ny * push
                }
            })
    
            if(ticksActive > despawnTime - 50) {
                pickup.style.opacity = ticksActive % 2
            }

            if(ticksActive >= despawnTime) {
                pickup.destroy(true)
            }

            ticksActive++   
        }
    }

    pickup.destroy = (ignorePickup) => {
        if(pickup.data.live) {
            pickup.data.live = false
            pickup.style.animation = 'pickupOut 100ms ease-out 1 forwards'
            
            if(!ignorePickup) {
                DeBread.playSound(`audio/${pickup.data.sfx}`, DeBread.randomNum(0.95,1.05,10))
                pickup.data.onTouch()
                createParticles([...pickup.data.pos], 3, 8, [5,10], 250, 'ease-out', {backgroundColor: 'white'})
            }
    
            setTimeout(() => {
                const pickupIndex = elems.pickups.indexOf(pickup)
                if(pickupIndex !== -1) {
                    elems.pickups.splice(pickupIndex, 1)
                }
                pickup.remove()
            }, 100);
        }
    }

    // pickup.classList.add('entity')

    elems.pickups.push(pickup)
    doge('area').append(pickup)
}

// function createPickup(pos, size, speed, texture, col, action, value, requirement, data) {
//     const pickup = pickupBase.cloneNode()
//     pickup.color = col
//     pickup.pos = [DeBread.randomNum(pos[0]-1,pos[0]+1,10),DeBread.randomNum(pos[1]-1,pos[1]+1,10)]
//     pickup.speed = speed
//     pickup.action = action
//     pickup.value = value
//     pickup.dateSpawned = e.gameUpdates
//     pickup.scale = 1
//     pickup.live = true
//     pickup.dirVels = []
//     pickup.ticksActive = 0
//     pickup.requirement = requirement ?? function() {return true}

//     pickup.angle = DeBread.randomNum(0,Math.PI*2,5)

//     elems.pickups.push(pickup)

//     pickup.classList.add('pickup')

//     addStyles(pickup, {
//         left: pickup.pos[0]+'px',
//         top: pickup.pos[1]+'px',
//         width: size[0]+'px',
//         height: size[1]+'px'
//     })
//     pickup.src = `graphics/${texture}.gif`

//     pickup.move = () => {
//         pickup.pos[0] += Math.cos(pickup.angle) * pickup.speed
//         pickup.pos[1] += Math.sin(pickup.angle) * pickup.speed

//         if(pickup.pos[0] < 0) pickup.pos[0] = 0
//         if(pickup.pos[1] < 0) pickup.pos[1] = 0
//         if(pickup.pos[0] > doge('area').offsetWidth) pickup.pos[0] = doge('area').offsetWidth
//         if(pickup.pos[1] > doge('area').offsetHeight) pickup.pos[1] = doge('area').offsetHeight


//         addStyles(pickup, {
//             left: pickup.pos[0]+'px',
//             top: pickup.pos[1]+'px',
//             scale: pickup.scale
//         })

//         pickup.speed /= 1.1

//         for(let i = 0; i < pickup.dirVels.length; i++) {
//             const dirVel = pickup.dirVels[i]
//             pickup.pos[0] += Math.cos(dirVel.angle) * dirVel.speed
//             pickup.pos[1] += Math.sin(dirVel.angle) * dirVel.speed

//             dirVel.speed /= dirVel.div
//             if(dirVel.speed <= 0.1) {
//                 pickup.dirVels.splice(i, 1)
//             }
//         }

//         elems.pickups.forEach(other => {
//             if (pickup === other) return

//             const dx = other.pos[0] - pickup.pos[0]
//             const dy = other.pos[1] - pickup.pos[1]

//             const distance = Math.sqrt(
//                 Math.pow(dx,2)+
//                 Math.pow(dy,2)
//             )

//             const r1 = pickup.offsetWidth / 2
//             const r2 = other.offsetWidth / 2

//             const minDist = r1 + r2

//             if(distance < minDist && distance > 0) {
//                 const overlap = minDist - distance

//                 const nx = dx / distance
//                 const ny = dy / distance

//                 const push = overlap / 2

//                 pickup.pos[0] -= nx * push
//                 pickup.pos[1] -= ny * push

//                 other.pos[0] += nx * push
//                 other.pos[1] += ny * push
//             }
//         })

//         pickup.ticksActive++
//     }

//     pickup.destroy = () => {
//         pickup.live = false
//         pickup.style.animation = 'pickupOut 100ms ease-out 1 forwards'
//         createParticles([...pickup.pos], 3, 8, [5,10], 250, 'ease-out', {backgroundColor: 'white'})
//         setTimeout(() => {
//             pickup.remove()
//             elems.pickups.splice(pickups[elems.pickups.indexOf(pickup)], 1)
//         }, 100);
//     }

//     doge('area').append(pickup)
// }

    // createPickup(
    //     [100+DeBread.randomNum(-1,1,10),100+DeBread.randomNum(-1,1,10)],
    //     {
    //         size: [32,16],
    //         texture: 'coin0',
    //         onTouch: () => {
    //             player.getMoney(999)
    //         }
    //     }
    // )

const coinValues = [1, 5, 10, 25, 100]
const pickups = {
    coin: (type, pos, speed, amount) => {
        createPickup(
            [...pos],
            {
                size: [32,16],
                texture: `coin${type}`,
                speed: speed,
                onTouch: () => {
                    player.getMoney(amount * coinValues[type])
                }
            }
        )
        // createPickup(pos, [32, 16], speed, `coin${type}`, 'grey', (amount) => {player.getMoney(amount * coinValues[type])}, amount, undefined)
    },
    battery: (pos, speed) => {
        createPickup(
            [...pos],
            {
                size: [32,32],
                texture: `battery`,
                onTouch: () => {
                    player.getPower(25)
                },
                requirement: () => {
                    return player.power < player.stats.player.maxPower
                }
            }
        )
        // createPickup(pos, [32,32], speed, 'battery', 'grey', () => {player.getPower(20)}, undefined, () => {return player.power < player.stats.player.maxPower})
    }    
}

// for(let i = 0; i < 100; i++) {
//     setTimeout(() => {
//         pickups.battery([100,100],5)
//     }, 10 * i);
// }

const styles = {
    kill: {
        text: 'Kill',
        baseAmnt: 100,
        comboBoost: 25,
    },
    double_kill: {
        text: 'Double Kill',
        baseAmnt: 500,
        comboBoost: 50,
    },
    triple_kill: {
        text: 'Triple Kill',
        baseAmnt: 1000,
        comboBoost: 100,
    },
    multi_kill: {
        text: 'Multi Kill',
        baseAmnt: 2500,
        comboBoost: 125,
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
    projectileBoost: {
        text: 'Projectile Boost',
        baseAmnt: 250,
        comboBoost: 25,
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
    },
    shocked: {
        text: 'Shocked',
        baseAmnt: 10,
        comboBoost: 1,
    },
    ascent: {
        text: 'Ascent',
        baseAmnt: 1,
        comboBoost: 2,
    }
}

function getStyle(style) {
    if(elems.enemies.length > 0) {
        const streak = Math.floor(player.combo / 100)
        let lastStyle = doge('gameStyleContainer').children[doge('gameStyleContainer').children.length-1] ?? ''
        if(lastStyle.styleType === style) {
            lastStyle.querySelector('#gameStyleCombo').innerHTML = parseInt(lastStyle.querySelector('#gameStyleCombo').innerHTML.replace('x','')) + 1
            lastStyle.querySelector('#gameStylePoints').innerHTML = DeBread.round(parseInt(lastStyle.querySelector('#gameStylePoints').innerHTML) + style.baseAmnt * streak * player.scoreMult)
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
                <span id="gameStylePoints">${DeBread.round(style.baseAmnt * streak * player.scoreMult)}</span>
            `
            div.styleType = style
        
            doge('gameStyleContainer').append(div)
    
            if(doge('gameStyleContainer').children[50]) {
                doge('gameStyleContainer').children[1].remove()
            }
        }
    
        const beforeCombo = Math.floor(player.combo / 100)
        if(style.comboBoost) {
            player.combo += style.comboBoost
        }
        const afterCombo = Math.floor(player.combo / 100)

        if(afterCombo > beforeCombo) {
            doge('streakCount').innerText = 'x'+afterCombo
            doge('streakCount').style.animation = ''
            requestAnimationFrame(() => {
                doge('streakCount').style.animation = 'streakCountPulse 500ms ease-out 1 forwards'
            })
        }

        for(let i = 0; i < 10; i++) {
            setTimeout(() => {
                player.score += (style.baseAmnt * streak * player.scoreMult) / 10
        
                doge('gameScore').innerText = DeBread.round(player.score).toString().padStart(10,0)
            }, 25 * i);
        }
    }
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

function openPauseStats() {
    const promptBody = document.createElement('div')
    // <div style="display: flex; gap: 5px;">
    //     <button>This run</button>
    //     <button>All time</button>
    // </div>
    promptBody.innerHTML = `
        <div id="gameStatsItems">
            <div id="innerGameStatsItems">

            </div>
        </div>
    `

    const statsContainer = document.createElement('div')
    for(const key in player.gameOverStats) {
        const stat = document.createElement('div')
        addStyles(stat, {
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap'
        })
        stat.innerHTML = `
            <span>${key}</span>
            <div class="coolLine"></div>
            <span>${DeBread.round(player.gameOverStats[key])}</span>
        `
        statsContainer.append(stat)
    }

    promptBody.append(statsContainer)

    openPrompt(
        'Stats',
        promptBody.innerHTML,
        [
            {
                text: 'Close',
                onclick: () => {closePrompt()}
            }
        ],
        [300,400]
    )

    for(item of player.itemsBought) {
        let alreadyBought = false
        doge('innerGameStatsItems').querySelectorAll('div').forEach(img => {
            if(img.id === item.id) {
                img.querySelector('span').innerText++
                alreadyBought = true
            }
        })
        if(!alreadyBought) {
            const img = document.createElement('div')
            img.innerHTML = '<span>1</span>'
            img.id = item.id
            addStyles(img, {
                backgroundImage: `url(graphics/upgrades/${item.id}.png)`,
                backgroundSize: '32px 32px',
                width: '32px',
                height: '32px',
                position: 'relative'
            })

            addStyles(img.querySelector('span'), {
                fontWeight: '700',
                filter: 'drop-shadow(0px 0px 5px black)',
                textShadow: '-1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black'
            })

            doge('innerGameStatsItems').append(img)
        }
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
                    } else if(saveData.gameSettings.gamemode === 3) {
                        doge('gamePauseTitle').innerText = `PAUSED - TUTORIAL`
                    } else if(saveData.gameSettings.gamemode === 4) {
                        doge('gamePauseTitle').innerText = `PAUSED - CREDITS`
                    }
                } else {
                    doge('gamePauseTitle').innerText = id.toUpperCase().replaceAll('_',' ')
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

    if(id === 'run_stats') {
        for(item of player.itemsBought) {
            let alreadyBought = false
            doge('innerGameStatsItems').querySelectorAll('div').forEach(img => {
                if(img.id === item.id) {
                    img.querySelector('span').innerText++
                    alreadyBought = true
                }
            })
            if(!alreadyBought) {
                const img = document.createElement('div')
                img.innerHTML = '<span>1</span>'
                img.id = item.id
                addStyles(img, {
                    backgroundImage: `url(graphics/upgrades/${item.id}.png)`,
                    backgroundSize: '32px 32px',
                    width: '32px',
                    height: '32px',
                    position: 'relative'
                })

                addStyles(img.querySelector('span'), {
                    fontWeight: '700',
                    filter: 'drop-shadow(0px 0px 5px black)',
                    textShadow: '-1px -1px 0px black, 0px -1px 0px black, 1px -1px 0px black, -1px 0px 0px black, 1px 0px 0px black, -1px 1px 0px black, 0px 1px 0px black, 1px 1px 0px black'
                })

                doge('innerGameStatsItems').append(img)
            }
        }
    }
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

        let allEnemies = {...enemies, ...minibosses, ...bosses}

        for(const key in allEnemies) {
            const enemy = allEnemies[key]
            const button = document.createElement('div')
            button.innerHTML = '<div></div>'

            addStyles(button, {
                width: '64px',
                height: '64px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid grey',
                overflow: 'hidden'
            })

            
            addStyles(button.querySelector('div'), {
                width: `${enemy.size}px`,
                height: `${enemy.size}px`,
                backgroundColor: `rgb(${enemy.color})`
            })

            if(enemy.texture) {
                addStyles(button.querySelector('div'), {
                    backgroundColor: 'transparent',
                    backgroundImage: `url(graphics/enemies/${enemy.texture})`,
                    backgroundSize: 'cover',
                })
            }

            button.onclick = () => {
                sandBoxEnemy = enemy
            }

            let tag = {text: 'ENEMY', col: '#7f293a'}
            let desc = enemy.desc ?? ''
            if(enemy.miniboss) {
                tag = {text: 'MINIBOSS', col: '#34297f'}
            } else if(enemy.boss) {
                tag = {text: 'BOSS', col: '#5b297f'}
            }  else {
                if(enemy.credits !== Infinity) {
                    desc += `<br><em>${enemy.credits} Credits</em>`
                }
            }

            button.onmouseenter = () => {
                const upgradeRect = button.getBoundingClientRect()
                tooltip(
                    [upgradeRect.left + button.offsetWidth / 2, upgradeRect.top + button.offsetHeight + 12], 
                    enemy.name, 
                    [tag], 
                    desc, 
                )
            }

            button.onmouseleave = () => {doge('tooltip').style.opacity = '0'}

            doge('sandboxMenu-enemies').append(button)
        }

        const infoText = document.createElement('div')
        addStyles(infoText, {
            width: '100%',
            border: '1px solid grey',
            padding: '5px'
        })
        infoText.innerHTML = `
        Left-Click to place enemy<br>
        Right-Click to deselect<br>
        Hold SHIFT to place multiple enemies<br>
        Hold CTRL to start boss intro sequence
        `
        doge('sandboxMenu-enemies').append(infoText)
    }

    if(menu === 'upgrades') {
        doge('sandboxMenu-upgrades').innerHTML = ''

        const searchBar = document.createElement('input')
        searchBar.id = 'sandboxItemsSearchbar'
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
                    createNotification('Whoops!',`An upgrade texture failed to load: ${ev}`,undefined,5000,
                        () => {createNotification('',`upgrades/${key}.${extension}`)}
                    )
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

    if(menu === 'characters') {
        doge('sandboxMenu-characters').innerHTML = ''
        for(const key in characters) {
            const button = document.createElement('div')
            addStyles(button, {
                display: 'flex',
                justifyContent: 'space-between',
                border: '2px solid grey',
                userSelect: 'none',
                cursor: 'pointer'
            })
            button.innerHTML = `
            <div style="padding: 5px;">
                <div style="display: flex; align-items: center; gap: 5px;">
                    <img src="graphics/characters/${key}Portrait.png" width54 height=54>
                    <div>
                        <span style="font-weight: 700;">${characters[key].name}</span>
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <span>${characters[key].weapon.name}</span>
                            <img src="graphics/weapons/${characters[key].weapon.name.toLowerCase().replaceAll(' ','_')}.png" style="height: 16px;">
                        </div>
                    </div>
                </div>
                
            </div>
            <img src="graphics/characters/${key}PortraitLarge.png" width=96 height=96>
            `

            button.onclick = () => {
                player = createPlayer()
                player.elem.data = player

                saveData.selectedCharacter = key
                player.characterWeapon = characters[saveData.selectedCharacter].weapon
                doge('gameWeaponName').innerText = characters[saveData.selectedCharacter].weapon.name
                renderStats()

                characters[saveData.selectedCharacter].weapon.apply()
                if(characters[saveData.selectedCharacter].applyStats) {
                    characters[saveData.selectedCharacter].applyStats()
                }

                let playerSrc = saveData.selectedCharacter
                if(saveData.selectedSkin > -1) {
                    playerSrc = characters[saveData.selectedCharacter].skins[saveData.selectedSkin].src
                }

                doge('playerTexture').src = `graphics/characters/${playerSrc}.png`
                doge('weaponTexture').src = `graphics/weapons/${characters[saveData.selectedCharacter].weapon.name.toLowerCase().replaceAll(' ','_')}.png`
                addStyles(doge('weaponTexture'), {
                    width: characters[saveData.selectedCharacter].weapon.textureSize[0]*2+'px',
                    height: characters[saveData.selectedCharacter].weapon.textureSize[1]*2+'px'
                })

                renderStats()
                updateArea()
                updateUI()
                save()
            }

            doge('sandboxMenu-characters').append(button)
        }
    }

    if(menu === 'tools') {
        doge('tickSpeedSlider').value = e.gameUpdateInterval

        //Is there any better way to do this or what
        doge('tickSpeedSlider').onchange = updateGameSpeed
        doge('tickSpeedSlider').onmousemove = updateGameSpeed
        doge('tickSpeedSlider').onmousedown = updateGameSpeed
        doge('tickSpeedSlider').onmouseup = updateGameSpeed

        function updateGameSpeed() {
            if(saveData.gameSettings.gamemode === 2) {
                e.gameUpdateInterval = doge('tickSpeedSlider').value
    
                if(e.gameUpdateInterval > 0) {
                    doge('tickSpeedSliderValue').innerText = `${e.gameUpdateInterval}ms`
                } else {
                    doge('tickSpeedSliderValue').innerText = `Fastest`
                }
            }
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

        createExplosion([...portal.pos],100,0,25,false,[[0,0],[0,0],[0,0],0],true)

        if(player.health === player.stats.player.maxHealth) {
            player.moneyBonusQueue.push({
                text: 'Max health bonus',
                value: 25,
            })
        }

        if(player.stats.player.couponBonus > 0) {
            player.moneyBonusQueue.push({
                text: 'Store credit',
                value: player.stats.player.couponBonus,
            })
        }

        if(player.perfectSet) {
            player.moneyBonusQueue.push({
                text: 'Flawless',
                value: 50 + player.wave
            })
        }

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
        color: [255, 218, 169],
        credits: 0,
        size: 50,
        health: 100,
        speed: 0,
        mounted: true,
        hideLevel: true,
    },
    dummy1: {
        color: [255, 218, 169],
        credits: 0,
        size: 50,
        health: Infinity,
        speed: 0,
        mounted: true,
    },
    dummy2: {
        color: [255, 218, 169],
        credits: 0,
        size: 50,
        health: Infinity,
        speed: 0,
        mounted: true,

        projectile: {
            cooldown: 75,
            size: 10,
            damage: 0,
            speed: 4,
        },
    },
    dummy3: {
        color: [255, 218, 169],
        credits: 0,
        size: 50,
        health: Infinity,
        speed: 0,
        mounted: true,

        projectile: {
            cooldown: 40,
            size: 10,
            damage: 0,
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
            spawnEnemy([400, doge('area').offsetHeight / 2 - 25], tutorialEnemies.dummy0, 0, 25)
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
            spawnEnemy([400, doge('area').offsetHeight / 2 - 25], tutorialEnemies.dummy1, 0, 25)
        }
    },
    {
        text: 'Performing a melee on an enemy projectile deflects it towards your crosshair, dealing increased damage and becoming explosive. This is called a <strong>parry</strong>. Try it out!',
        goal: 'Perform parries',
        goalTarget: 3,
        run: () => {
            elems.enemies.forEach(enemy => {enemy.data.kill()})
            spawnEnemy([400, doge('area').offsetHeight / 2 - 25], tutorialEnemies.dummy2, 0, 25)
        }
    },
    {
        text: 'Okay, let\'s move away from gameplay and focus on the <strong>Shop</strong>.',
        run: () => {
            elems.enemies.forEach(enemy => {enemy.data.kill()})
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
        text: 'This is the <strong>Shop</strong>. Waves drop coins based on how difficult they are. You can use these coins to buy different things:'
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
        text: 'But watch out though! You lose some <strong>POWER</strong> when getting hit by an enemy!'
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
        text: 'Power items take POWER to use. You can see how much power you have by the bar underneath your health bar.'
    },
    {
        text: 'As said before, you can gain POWER by parrying bullets, killing enemies, or narrowly dodging enemy projectiles within your <strong>Graze Hitbox</strong>.'
    },
    {
        text: 'Try gaining power by dodging projectiles within your <strong>Graze Hitbox</strong>',
        
        goal: 'Graze enemy projectiles',
        goalTarget: 15,

        run: () => {
            spawnEnemy([400, doge('area').offsetHeight / 2 - 25], tutorialEnemies.dummy3, 0, 25)
            player.getPower(15)
        }
    },
    {
        text: 'Nice! Now you have enough POWER to use your power item.',

        run: () => {
            elems.enemies.forEach(enemy => {enemy.data.kill()})
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
        text: 'Have fun!',
    },
    {
        text: 'Byeeee!!!!!',
        run: () => {
            player.alive = false
            e.gameActive = false
            saveData.gameSettings.gamemode = 0
            openMenu('main')
            save()

            if(e.gameUpdates <= 1500) {
                getAchievement('Knowledgeable')
            }
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