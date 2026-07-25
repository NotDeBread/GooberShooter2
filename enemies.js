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

            poisonFieldChance: 100,
            poisonFieldSize: 75,
            poisonFieldDmgPercent: 20,
            poisonFieldTicks: 10,
            poisonFieldColor: [51,116,51],
            poisonFieldTarget: [player.elem]
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
        hideLevel: true,

        coinOverride: 2,
        meleeDamage: 10,
    },
    leech: {
        name: 'Leech',
        desc: 'A small, immobile enemy that deals constant damage to the player while alive. Creates an implosion one killed.',
        color: [37,18,37],
        size: 25,
        health: 20,
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
        health: 20,
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
        health: 500,
        speed: 0.5,
        credits: 30,
        explosionImmunity: true,

        projectile: {
            cooldown: 120,
            size: 25,
            damage: 30,
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
            poisonFieldColor: [151,240,91],
            poisonFieldTarget: [player.elem]
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
    behemoth: {
        name: 'Behemoth',
        desc: 'A very large, slow moving enemy that deals massive melee damage.',
        color: [84, 117, 83],
        size: 125,
        health: 2500,
        speed: 1,
        credits: 75,
        meleeDamage: 100,
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
    mountedWeakDummy: {
        name: 'Mounted Weak Dummy',
        desc: '<em style="color: grey;">Sandbox only</em><br>Same as the dummy, but does not have any collision and has 10 HP.',
        color: [160,129,88],
        credits: Infinity,
        size: 50,
        health: 10,
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
        texture: 'debreadCube.gif',
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
    walfling: {
        name: 'Walfling',
        desc: '<em style="color: grey;">Sandbox only</em>',
        texture: 'walfling.png',
        color: [156, 156, 156],
        size: 32,
        health: 50,
        regen: -0.25,
        credits: Infinity,

        projectile: {
            cooldown: 50,
            size: 10,
            speed: 7,
            damage: 10,
        },

        onDeath: enemy => {
            createExplosion([...enemy.data.centerPos], 100, 100, 25, false, [[156,156],[156,156],[156,156]])
        }
    },
    bird: {
        name: 'Chud Chip',
        desc: '<em style="color: grey;">Sandbox only</em>',
        texture: 'chudbird.gif',
        color: [252, 243, 193],
        size: 34,
        health: 25,
        credits: Infinity,
        meleeDamage: 15,

        tick: enemy => {
            const dx = player.centerPos[0] - enemy.data.centerPos[0]
            const dy = player.centerPos[1] - enemy.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            enemy.data.dirVels.push({
                speed: 0.75,
                angle: angle,
                div: 1.025
            })
        }
    },
    tutorialistServant: {
        name: 'Tutorialist Servant',
        desc: '<em style="color: grey;">Sandbox only</em>',
        texture: 'tutorialist/tutorialistServant0Portrait.png',
        textureSheet: 'tutorialist/tutorialistServant0.png',
        color: [0,0,0],
        size: 36,
        health: 75,
        regen: -0.25,
        credits: Infinity,
        noDeathParticles: true,

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            boss.data.dirVels.push({
                speed: 0.75,
                angle: angle,
                div: 1.05
            })
        },

        onDeath: enemy => {
            const explodingData = enemies.explodingTutorialistServant
            explodingData.texture = `tutorialist/tutorialistServant${enemy.data.servantType ?? 0}Explode.png`

            spawnEnemy([...enemy.data.pos], enemies.explodingTutorialistServant,0,0)
        }
    },
    tammyDeath: {
        name: 'Tammy Death',
        desc: '<em style="color: grey;">Sandbox only</em>',
        texture: 'tammyDie.png',
        size: 36,
        health: Infinity,
        weight: Infinity,
        credits: Infinity,
        color: [76, 81, 128],
        finishBossWave: true,
        noKillBonus: true,

        onSpawn: enemy => {
            enemy.data.ticksActive = 0
        },

        tick: enemy => {
            if(enemy.data.ticksActive <= 50) {
                if(enemy.data.ticksActive !== 50) {
                    enemy.style.translate = `${DeBread.randomNum(-5,5)}px 0`
                } else {
                   enemy.style.translate = `0 0` 
                }

                if(enemy.data.ticksActive % 3 === 0) {
                    createParticle(
                        1,
                        [...enemy.data.centerPos],
                        5,
                        1.1,
                        DeBread.randomNum(0,Math.PI*2,10),
                        10,
                        1.25,
                        50,
                        {
                            color: 'red'
                        }
                    )
                }
            } else if(enemy.data.ticksActive === 75) {
                enemy.data.kill()
            }

            enemy.data.ticksActive++
        }
    },
    explodingTutorialistServant: {
        name: 'Tutorialist Servant (exploding)',
        desc: '<em style="color: grey;">Sandbox only</em>',
        texture: 'tutorialist/tutorialistServant0Explode.png',
        size: 36,
        health: 5000000,
        regen: -100000,
        weight: 0.25,
        credits: Infinity,
        color: [255,255,255],

        onDeath: enemy => {
            createExplosion([...enemy.data.centerPos],100,50,50,false,[[255,255],[255,255],[255,255]])
            for(let i = 0; i < 10; i++) {
                const projData = {
                    damage: 25,
                    size: 10,
                    speed: 10,
                }
                createProjectile(1,[...enemy.data.centerPos],(Math.PI * 2 / 10) * i, projData, [player.elem], enemy.data)
            }
        },

        onSpawn: enemy => {
            DeBread.easeShake(enemy, 20, 0, -0.1)
        }
    },
    tutorialistDeath: {
        name: 'Tutorialist Death',
        desc: '<em style="color: grey;">Sandbox only</em>',
        texture: 'tutorialist/prepare.png',
        size: 36,
        health: 2147483647,
        mounted: true,
        credits: Infinity,
        color: [255,255,255],
        finishBossWave: true,
        noKillBonus: true,

        onSpawn: enemy => {
            enemy.ticksActive = 0

            enemy.implosion = document.createElement('div')
            enemy.implosion.classList.add('entity')
            addStyles(enemy.implosion, {
                position: 'absolute',
                borderRadius: '50%',
                boxShadow: '0px 0px 10px white',
                translate: '-50% -50%',
                width: '500px',
                height: '500px',
                left: enemy.data.centerPos[0]+'px',
                top: enemy.data.centerPos[1]+'px'
            })
            doge('area').append(enemy.implosion)
        },
        
        tick: enemy => {
            enemy.ticksActive++

            if(enemy.ticksActive < 140) {
                const shakeAmount = enemy.ticksActive / 25
                enemy.style.translate = `${DeBread.randomNum(-shakeAmount,shakeAmount,10)}px ${DeBread.randomNum(-shakeAmount,shakeAmount,10)}px`
    
                const randomParticleAngle = DeBread.randomNum(0,Math.PI*2,10)
                const particleDistance = 250

                player.combo += 0.25
    
                // createParticle(
                //     1,
                //     [
                //         Math.cos(randomParticleAngle) * particleDistance + enemy.data.centerPos[0],
                //         Math.sin(randomParticleAngle) * particleDistance + enemy.data.centerPos[1]
                //     ],
                //     1,
                //     0.99,
                //     randomParticleAngle + Math.PI,
                //     1,
                //     0.99,
                //     125,
                //     {
                //         color: 'white'
                //     }
                // )
    
                addStyles(enemy.implosion, {
                    width: 500 - Math.pow(enemy.ticksActive,1.25)+'px',
                    height: 500 - Math.pow(enemy.ticksActive,1.25)+'px',
                    opacity: enemy.ticksActive / 100
                })
            }

            if(enemy.ticksActive === 140) {
                enemy.style.translate = `0 0`
                enemy.implosion.remove()
            }

            if(enemy.ticksActive === 175) {
                enemy.style.backgroundImage = 'url(graphics/enemies/tutorialist/explode.png)'
                createExplosion([...enemy.data.centerPos], 250, 0, 100, false, [[0,0],[0,0],[0,0],0])

                enemy.beamContainer = document.createElement('div')
                enemy.beamContainer.classList.add('entity')
                addStyles(enemy.beamContainer, {
                    position: 'absolute',
                    translate: '-50% 0',
                    height: '1024px',
                    width: '256px',
                    left: enemy.data.centerPos[0]+'px',
                    top: enemy.data.centerPos[1]-1024+'px',
                    zIndex: '10',
                    backgroundImage: 'url(graphics/enemies/tutorialist/beam.png)',
                    backgroundSize: 'cover'
                })

                doge('area').append(enemy.beamContainer)
            }

            if(enemy.ticksActive >= 175) {
                if(enemy.ticksActive % 20 === 0) {
                    const projData = {
                        damage: 10,
                        size: 20,
                        speed: 8 * player.stats.enemy.speedMult,
                    }

                    let randomOffset = DeBread.randomNum(0,Math.PI*2,10)
                    for(let i = 0; i < 10; i++) {
                        createProjectile(1,[...enemy.data.centerPos],(Math.PI * 2 / 10) * i + randomOffset, projData, [player.elem], enemy.data)
                    }
                }  

                for(let i = 0; i < 5; i++) {
                    createParticle(
                        1,
                        [...enemy.data.centerPos],
                        DeBread.randomNum(20,30,10),
                        1.1,
                        DeBread.randomNum(0,Math.PI*2,10),
                        5,
                        1.1,
                        100,
                        {
                            color: 'white'
                        }
                    )
                }

                const shakeAmount = 2
                enemy.style.translate = `${DeBread.randomNum(-shakeAmount,shakeAmount,10)}px ${DeBread.randomNum(-shakeAmount,shakeAmount,10)}px`
                enemy.beamContainer.style.scale = `${DeBread.randomNum(0.9,1.1,10)} 1`
                
                enemy.beamContainer.style.filter = `drop-shadow(0px 0px ${(enemy.ticksActive - 175) / 25}px white)`
                enemy.style.filter = `brightness(${(enemy.ticksActive - 175) / 25 + 1}) drop-shadow(0px 0px ${(enemy.ticksActive - 175) / 25}px white)`

                getStyle(styles.ascent)
            }
            
            if(enemy.ticksActive >= 500) {
                enemy.data.damage(10e67)
                createExplosion([...enemy.data.centerPos], 250, 0, 100, false, [[255,255],[255,255],[255,255],255])

                getStyle({
                    text: 'God Kill',
                    baseAmnt: 77777,
                    comboBoost: 7777,
                })
            }
        },

        onDeath: enemy => {
            enemy.implosion?.remove()
            enemy.beamContainer?.remove()
        }
    }
}

const minibosses = {
    testBoss: {
        name: 'Test Boss',
        desc: 'Boss used for testing!',
        health: 1000,
        size: 100,
        color: [100, 100, 100],
        boss: true,
        miniboss: true,
        weight: 5,
        texture: 'testBossNormal.png',

        moves: [
            { //Dash
                duration: 25,
                do: boss => {
                    boss.style.backgroundImage = 'url(graphics/enemies/testBossDash.png)'

                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 15 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.1
                    })
                }
            },
            { //Fire
                duration: 25,
                do: boss => {
                    boss.style.backgroundImage = 'url(graphics/enemies/testBossNormal.png)'
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        damage: 50,
                        size: 25,
                        speed: 7 * player.stats.enemy.speedMult,
                    }

                    createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)
                }
            },
            { //Burst
                duration: 125,
                do: boss => {
                    boss.style.backgroundImage = 'url(graphics/enemies/testBossBurstCharge.png)'

                    createTimeout(() => {
                        const projData = {
                            damage: 50,
                            size: 20,
                            speed: 10 * player.stats.enemy.speedMult,
                        }

                        for(let i = 0; i < 10; i++) {
                            createProjectile(1,[...boss.data.centerPos],(Math.PI * 2 / 10) * i, projData, [player.elem], boss.data)
                        }

                        boss.style.backgroundImage = 'url(graphics/enemies/testBossBurst.png)'
                    }, 75)
                }
            }
        ]
    },
    sasha: {
        name: 'SASHA',
        desc: 'Run.',
        health: 750,
        size: 36,
        color: [91, 73, 57],
        boss: true,
        miniboss: true,
        weight: 0.1,
        speed: 0,
        texture: 'sashaPortrait.png',
        textureSheet: 'sasha.png',
        phases: 2,

        generalMoveRequirement: boss => {
            return !boss.isAnimating
        },

        onSpawn: boss => {
            boss.isAnimating = false
        },

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            if(!boss.isAnimating) {
                boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`
            }

            if(!boss.isAnimating) {
                boss.data.dirVels.push({
                    speed: 0.75 * player.stats.enemy.speedMult,
                    angle: angle,
                    div: 1.05
                })
            }

            if(boss.data.phase === 2) {
                createParticle(
                    1,
                    [...boss.data.centerPos],
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
        },

        onDamage: (boss, silent) => {
            if(boss.data.health > 0) {
                const beforePhase = boss.data.phase
                let currentPhase = 2 - Math.floor(2 * (boss.data.health / boss.data.maxHealth))
                boss.data.phase = currentPhase

                if(beforePhase !== currentPhase) {
                    if(currentPhase === 2) {
                        boss.isAnimating = true

                        const texture = boss.querySelector('.enemyTextureContainer').querySelector('img')
                        texture.src = 'graphics/enemies/sashaPrepare.png'
                        addStyles(texture, {
                            width: '36px',
                            height: '36px',
                            translate: '0 0'
                        })

                        boss.data.timeouts.push(createTimeout(() => {
                            boss.isAnimating = false

                            texture.src = 'graphics/enemies/sasha.png'
                            addStyles(texture, {
                                width: '340px',
                                height: '74px',
                            }) 
                        }, 100))
                    }
                }
            }
            
        },

        moves: [
            [ //Phase 1
                { //Dash
                    duration: 50,
                    do: boss => {
                        const playerAngle = Math.atan2(
                            player.centerPos[1] - boss.data.centerPos[1],
                            player.centerPos[0] - boss.data.centerPos[0]
                        )
    
                        boss.data.dirVels.push({
                            speed: 25 * player.stats.enemy.speedMult,
                            angle: playerAngle,
                            div: 1.1
                        })
                    }
                },
                { //Fire
                    duration: 25,
                    do: boss => {
                        const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                        const projAngle = Math.atan2(
                            projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                            projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                        )
    
                        const projData = {
                            damage: 50,
                            size: 25,
                            speed: 10 * player.stats.enemy.speedMult,
                        }
    
                        createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)
                    }
                },
                { //Burst
                    duration: 125,
                    do: boss => {
                        const projData = {
                            damage: 50,
                            size: 20,
                            speed: 8 * player.stats.enemy.speedMult,
                        }
    
                        createExplosion([...boss.data.centerPos], 250, 0, 100, false, [[0,0],[0,0],[0,0],0])
                        for(let i = 0; i < 10; i++) {
                            createProjectile(1,[...boss.data.centerPos],(Math.PI * 2 / 10) * i, projData, [player.elem], boss.data)
                        }
                    }
                }
            ],
            [ //Phase 2
                { //Dash
                    duration: 75,
                    do: boss => {
                        for(let i = 0; i < 3; i++) {
                            boss.data.timeouts.push(createTimeout(() => {
                                const playerAngle = Math.atan2(
                                    player.centerPos[1] - boss.data.centerPos[1],
                                    player.centerPos[0] - boss.data.centerPos[0]
                                )
            
                                boss.data.dirVels.push({
                                    speed: 25 * player.stats.enemy.speedMult,
                                    angle: playerAngle,
                                    div: 1.1
                                })
                            }, 25 * i))
                        }
                    }
                },
                { //Burst
                    duration: 125,
                    do: boss => {
                        const playerAngle = Math.atan2(
                            player.centerPos[1] - boss.data.centerPos[1],
                            player.centerPos[0] - boss.data.centerPos[0]
                        )
    
                        boss.data.dirVels.push({
                            speed: 50 * player.stats.enemy.speedMult,
                            angle: playerAngle + Math.PI,
                            div: 1.1
                        })

                        boss.data.timeouts.push(createTimeout(() => {
                            for(let i = 0; i < 3; i++) {
                                boss.data.timeouts.push(createTimeout(() => {
                                    const randomAngleOffset = DeBread.randomNum(0,Math.PI*2,10)
                                    const projData = {
                                        damage: 50,
                                        size: 20,
                                        speed: 4 * player.stats.enemy.speedMult,
                                    }
    
                                    for(let i = 0; i < 10; i++) {
                                        createProjectile(1,[...boss.data.centerPos],(Math.PI * 2 / 10) * i + randomAngleOffset, projData, [player.elem], boss.data)
                                    }
                                }, 25 * i))
                            }
                        }, 25))
                    }
                }
            ]
        ]
    },
    // skywalkr: {
    //     name: 'SKYWALKR',
    //     desc: 'Run.',
    //     health: 1000,
    //     size: 36,
    //     color: [221, 136, 240],
    //     boss: true,
    //     miniboss: true,
    //     weight: 999,
    //     speed: 0,
    //     texture: 'skywalkrPortrait.png',
    //     textureSheet: 'skywalkr.png',

    //     tick: boss => {
    //         const frames = {
    //             "-3": 0,
    //             "-2": 1,
    //             "-1": 2,
    //             "0": 5,
    //             "1": 8,
    //             "2": 7,
    //             "3": 6,
    //             "4": 3,
    //             "-4": 3
    //         }

    //         const dx = player.centerPos[0] - boss.data.centerPos[0]
    //         const dy = player.centerPos[1] - boss.data.centerPos[1]

    //         const angle = Math.atan2(dy, dx)

    //         const dir = Math.round(angle / (Math.PI / 4))
    //         boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

    //         const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
    //         const projAngle = Math.atan2(
    //             projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
    //             projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
    //         )

    //         const projData = {
    //             damage: 50,
    //             size: 25,
    //             speed: 10,
    //         }

    //         createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)

    //         for(let i = 0; i < 10; i++) {
    //             createProjectile(1,[...boss.data.centerPos],(Math.PI * 2 / 10) * i + DeBread.randomNum(0,Math.PI*2,100), projData, [player.elem], boss.data)
    //         }
    //     },

    //     moves: [
    //         { //Burst
    //             duration: 125,
    //             do: boss => {
    //                 const projData = {
    //                     damage: 50,
    //                     size: 20,
    //                     speed: 10,
    //                 }

    //                 createExplosion([...boss.data.centerPos], 250, 0, 100, false, [[0,0],[0,0],[0,0],0])
    //                 for(let i = 0; i < 10; i++) {
    //                     createProjectile(1,[...boss.data.centerPos],(Math.PI * 2 / 10) * i, projData, [player.elem], boss.data)
    //                 }
    //             }
    //         }
    //     ]
    // },
    jake: {
        name: 'JAKE',
        desc: 'Lover of peppers.',
        health: 1000,
        size: 36,
        color: [231, 219, 205],
        boss: true,
        miniboss: true,
        speed: 0,
        texture: 'jakePortrait.png',
        textureSheet: 'jake.png',

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`
        },

        moves: [
            { //Dash
                duration: 50,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.1
                    })
                }
            },
            { //Fire
                duration: 25,
                do: boss => {
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        damage: 50,
                        size: 25,
                        speed: 10 * player.stats.enemy.speedMult,
                        poisonFieldChance: 100,
                        poisonFieldSize: 100,
                        poisonFieldTicks: 5,
                        poisonFieldDmgPercent: 40,
                        poisonFieldColor: [255,0,0],
                    }

                    createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)
                }
            },
            { //Burst
                duration: 125,
                do: boss => {
                    const projData = {
                        damage: 50,
                        size: 20,
                        speed: 10 * player.stats.enemy.speedMult,
                        speedDiv: 1.01,
                        range: 50,
                        poisonFieldChance: 100,
                        poisonFieldSize: 100,
                        poisonFieldTicks: 5,
                        poisonFieldDmgPercent: 40,
                        poisonFieldColor: [255,0,0],
                        bounces: 2,
                        magnetStrength: 0.5,
                    }

                    createExplosion([...boss.data.centerPos], 250, 0, 100, false, [[0,0],[0,0],[0,0],0])
                    for(let i = 0; i < 6; i++) {
                        createProjectile(1,[...boss.data.centerPos],(Math.PI * 2 / 6) * i, projData, [player.elem], boss.data)
                    }
                }
            },
            { //Mitosis
                duration: 125,
                do: boss => {
                    const jakeling = {...minibosses.jake}
                    jakeling.name = 'Jakeling'
                    jakeling.boss = false

                    spawnEnemy([...boss.data.pos],jakeling,0,0,{health: 25, regen: -0.1})
                }
            }
        ]
    },
    plonk: {
        name: 'PLONK',
        desc: 'PisS! ‼️',
        health: 1000,
        size: 36,
        color: [97, 104, 58],
        boss: true,
        miniboss: true,
        speed: 0,
        weight: 0.25,
        texture: 'plonkPortrait.png',
        textureSheet: 'plonk.png',

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            boss.data.dirVels.push({
                speed: 0.25 * player.stats.enemy.speedMult,
                angle: angle,
                div: 1.05
            })
        },

        moves: [
            { //Dash
                duration: 25,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 15 * player.stats.enemy.speedMult,
                        angle: playerAngle + (Math.PI * [-1,1][DeBread.randomNum(0,1)]) / 2,
                        div: 1.1
                    })
                }
            },
            { //Spray
                duration: 50,
                do: boss => {
                    for(let i = 0; i < 10; i++) {
                        boss.data.timeouts.push(createTimeout(() => {
                            const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                            const projAngle = Math.atan2(
                                projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                                projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                            )

                            const projData = {
                                damage: 10,
                                size: 10,
                                speed: 7 * player.stats.enemy.speedMult,
                                poisonFieldChance: 100,
                                poisonFieldSize: 25,
                                poisonFieldTicks: 3,
                                poisonFieldDmgPercent: 25,
                                poisonFieldColor: [186, 161, 39],
                            }

                            createProjectile(1, [...projPos], projAngle + DeBread.randomNum(-1,1,10), projData, [player.elem], boss.data)
                        }, i*2))
                    }
                }
            },
            { //Fire
                duration: 25,
                do: boss => {
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        damage: 75,
                        size: 50,
                        speed: 5 * player.stats.enemy.speedMult,
                    }

                    createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)

                    boss.data.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: projAngle,
                        div: 1.1
                    })
                }
            },
        ]
    },
    ashton: {
        name: 'ASHTON',
        desc: 'Stay away',
        health: 1000,
        size: 36,
        color: [76, 119, 128],
        boss: true,
        miniboss: true,
        speed: 0,
        weight: 0.25,
        texture: 'ashtonPortrait.png',
        textureSheet: 'ashton.png',
        noTargetCollision: true,

        onSpawn: boss => {
            boss.data.isHoldingPlayer = false
            boss.data.holdPlayerDate = 0
            boss.data.randomTargetPos = [0,0]
        },

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            if(isColliding(boss, player.elem) && !boss.data.isHoldingPlayer && e.gameUpdates - boss.data.holdPlayerDate > 50) {
                boss.data.isHoldingPlayer = true
                boss.data.holdPlayerDate = e.gameUpdates

                boss.data.randomTargetPos = [DeBread.randomNum(0,doge('area').offsetHeight),DeBread.randomNum(0,doge('area').offsetWidth)]

                player.elem.style.zIndex = '9999'
            }

            if(boss.data.isHoldingPlayer) {
                player.pos = [boss.data.pos[0], boss.data.pos[1] - 25]
                const angle = Math.atan2(
                    boss.data.randomTargetPos[1] - boss.data.centerPos[1],
                    boss.data.randomTargetPos[0] - boss.data.centerPos[0]
                )

                boss.data.dirVels.push({
                    speed: 1 * player.stats.enemy.speedMult,
                    angle: angle,
                    div: 1.1
                })

                if(e.gameUpdates - boss.data.holdPlayerDate > 50) {
                    boss.data.isHoldingPlayer = false
                    boss.data.holdPlayerDate = e.gameUpdates
                    player.elem.style.zIndex = '3'

                    const randomAngle = DeBread.randomNum(0,Math.PI*2,10)

                    player.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: randomAngle,
                        div: 1.1
                    })

                    boss.data.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: randomAngle + Math.PI,
                        div: 1.1
                    })
                }
            } else {
                boss.data.dirVels.push({
                    speed: 0.5 * player.stats.enemy.speedMult,
                    angle: angle,
                    div: 1.05
                })
            }
        },

        onDeath: boss => {
            player.elem.style.zIndex = '3'
        },

        generalMoveRequirement: boss => {
            return !boss.data.isHoldingPlayer && boss.data.holdPlayerDate > 50
        },

        moves: [
            { //Dash
                duration: 50,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.1
                    })
                }
            },
            { //Shotgun shot
                duration: 25,
                do: boss => {
                    const playerAngle = Math.atan2(
                        boss.data.centerPos[1] - player.centerPos[1],
                        boss.data.centerPos[0] - player.centerPos[0]
                    )
                    const projData = {
                        damage: 20,
                        size: 10,
                        speed: 15 * player.stats.enemy.speedMult,
                        range: 15,
                        grow: -10,
                    }
                    
                    for(let i = 0; i < 5; i++) {
                        const t = (i - (5 - 1) / 2)
                        const offset = (t / 5) * Math.PI / 12
    
                        createProjectile(1, [...boss.data.centerPos], playerAngle + offset, projData, [player.elem], boss.data)
                    }
                }
            }
        ]
    },
    tammy: {
        name: 'TAMMY',
        desc: '',
        health: 1000,
        size: 36,
        color: [76, 81, 128],
        boss: true,
        miniboss: true,
        speed: 0,
        weight: 2,
        texture: 'tammyPortrait.png',
        textureSheet: 'tammy.png',
        dontFinishBossWave: true,
        noDeathParticles: true,

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            if(Math.sqrt(dx*dx+dy*dy) > 250) {
                boss.data.dirVels.push({
                    speed: 0.5 * player.stats.enemy.speedMult,
                    angle: angle,
                    div: 1.10
                })
            } else {
                boss.data.dirVels.push({
                    speed: 0.5 * player.stats.enemy.speedMult,
                    angle: angle+((Math.PI/2)*boss.data.movementDir),
                    div: 1.10
                })
            }
        },

        onSpawn: boss => {
            boss.data.movementDir = [-1,1][DeBread.randomNum(0,1)]
        },

        onDeath: boss => {
            spawnEnemy([...boss.data.pos],enemies.tammyDeath,0,0)
        },

        moves: [
            { //Change movement direction
                duration: 25,
                do: boss => {
                    boss.data.movementDir = -boss.data.movementDir
                }
            },
            // { //Dash
            //     duration: 25,
            //     do: boss => {
            //         const playerAngle = Math.atan2(
            //             player.centerPos[1] - boss.data.centerPos[1],
            //             player.centerPos[0] - boss.data.centerPos[0]
            //         )

            //         boss.data.dirVels.push({
            //             speed: 15 * player.stats.enemy.speedMult,
            //             angle: playerAngle + (Math.PI * [-1,1][DeBread.randomNum(0,1)]) / 2,
            //             div: 1.1
            //         })
            //     }
            // },
            { //Fire
                duration: 25,
                do: boss => {
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        damage: 15,
                        size: 10,
                        speed: 10 * player.stats.enemy.speedMult,
                    }

                    createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)

                    boss.data.dirVels.push({
                        speed: 5 * player.stats.enemy.speedMult,
                        angle: projAngle,
                        div: 1.1
                    })
                }
            },
            { //Triple fire
                duration: 50,
                do: boss => {
                    for(let i = 0; i < 3; i++) {
                        boss.data.timeouts.push(createTimeout(() => {
                            const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                            const projAngle = Math.atan2(
                                projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight + DeBread.randomNum(-75,75)),
                                projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth + DeBread.randomNum(-75,75)),
                            )
        
                            const projData = {
                                damage: 15,
                                size: 10,
                                speed: 10 * player.stats.enemy.speedMult,
                            }
        
                            createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)
        
                            boss.data.dirVels.push({
                                speed: 5 * player.stats.enemy.speedMult,
                                angle: projAngle,
                                div: 1.1
                            })
                        }, 10 * i))
                    }
                }
            },
        ]
    },
    tana: {
        name: 'TANA',
        desc: '',
        health: 800,
        size: 36,
        color: [66, 191, 232],
        boss: true,
        miniboss: true,
        speed: 0,
        weight: 0.5,
        texture: 'tanaPortrait.png',
        textureSheet: 'tana.png',

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            if(boss.data.isKiting) {
                const kiteAngle = Math.atan2(
                    (player.centerPos[1] + boss.data.kitingRef[1]) - boss.data.centerPos[1],
                    (player.centerPos[0] + boss.data.kitingRef[0]) - boss.data.centerPos[0],
                )

                boss.data.dirVels.push({
                    speed: 1 * player.stats.enemy.speedMult,
                    angle: kiteAngle,
                    div: 1.25
                })

                if(e.gameUpdates % 1 === 0) {
                    for(let i = 0; i < 5; i++) {
                        createParticle(
                            1,
                            [...boss.data.centerPos],
                            DeBread.randomNum(3,5,10),
                            1.1,
                            Math.PI * DeBread.randomNum(0,1) + DeBread.randomNum(-0.1,0.1,10),
                            5,
                            1.1,
                            25,
                            {
                                color: 'rgba(255,255,255,0.25)'
                            }
                        )
                    }
                }
            } else {
                if(Math.sqrt(dx*dx+dy*dy) > 250) {
                    boss.data.dirVels.push({
                        speed: 0.5 * player.stats.enemy.speedMult,
                        angle: angle,
                        div: 1.10
                    })
                } else {
                    boss.data.dirVels.push({
                        speed: 0.5 * player.stats.enemy.speedMult,
                        angle: angle+((Math.PI/2)*boss.data.movementDir),
                        div: 1.10
                    })
                }
            }
        },

        onSpawn: boss => {
            boss.data.movementDir = [-1,1][DeBread.randomNum(0,1)]
            boss.data.isKiting = false
            boss.data.kitingRef = [0,0]
            boss.data.kiteToggleDate = 0
        },

        moves: [
            { //Change movement direction
                duration: 0,
                do: boss => {
                    boss.data.movementDir = -boss.data.movementDir
                }
            },
            { //Toggle kiting
                duration: 25,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.1
                    })

                    boss.data.timeouts.push(createTimeout(() => {
                        boss.data.isKiting = !boss.data.isKiting
                        boss.data.kiteToggleDate = e.gameUpdates

                        if(boss.data.isKiting) {
                            boss.data.kitingRef = [
                                boss.data.centerPos[0] - player.centerPos[0],
                                boss.data.centerPos[1] - player.centerPos[1]
                            ]
                        }
                    }, 20))
                },

                requirement: boss => {
                    return e.gameUpdates - boss.data.kiteToggleDate > 150
                }
            },
            { //Dash
                duration: 25,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 15 * player.stats.enemy.speedMult,
                        angle: playerAngle + (Math.PI * [-1,1][DeBread.randomNum(0,1)]) / 2,
                        div: 1.1
                    })
                },

                requirement: boss => {
                    return boss.data.isKiting === false
                }
            },
            { //Fire
                duration: 25,
                do: boss => {
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        damage: 15,
                        size: 10,
                        speed: 10 * player.stats.enemy.speedMult,
                    }

                    createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)

                    if(!boss.data.isKiting) {
                        boss.data.dirVels.push({
                            speed: 5 * player.stats.enemy.speedMult,
                            angle: projAngle,
                            div: 1.1
                        })
                    }
                }
            },
            { //Triple fire
                duration: 50,
                do: boss => {
                    for(let i = 0; i < 3; i++) {
                        boss.data.timeouts.push(createTimeout(() => {
                            const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                            const projAngle = Math.atan2(
                                projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight + DeBread.randomNum(-75,75)),
                                projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth + DeBread.randomNum(-75,75)),
                            )
        
                            const projData = {
                                damage: 15,
                                size: 10,
                                speed: 10 * player.stats.enemy.speedMult,
                            }
        
                            createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)
        
                            if(!boss.data.isKiting) {
                                boss.data.dirVels.push({
                                    speed: 5 * player.stats.enemy.speedMult,
                                    angle: projAngle,
                                    div: 1.1
                                })
                            }
                        }, 10 * i))
                    }
                }
            },
        ]
    },
    walf: {
        name: 'WALF',
        desc: 'Don\'t let him step on the lego.',
        health: 1000,
        size: 36,
        color: [156, 156, 156],
        boss: true,
        miniboss: true,
        speed: 0,
        weight: 0.25,
        texture: 'walfPortrait.png',
        textureSheet: 'walf.png',

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            boss.data.dirVels.push({
                speed: 0.25 * player.stats.enemy.speedMult,
                angle: angle+((Math.PI/2)*boss.data.movementDir),
                div: 1.05
            })

            doge('area').querySelectorAll('.lego').forEach(lego => {
                if(isColliding(lego, boss) && lego.ticksActive > 10) {
                    const projData = {
                        damage: 50,
                        size: 20,
                        speed: 10 * player.stats.enemy.speedMult,
                    }

                    for(let i = 0; i < 10; i++) {
                        createProjectile(1,[...boss.data.centerPos],(Math.PI * 2 / 10) * i, projData, [player.elem], boss.data)
                    }

                    lego.destroy()
                }
            })
        },

        onSpawn: boss => {
            boss.data.movementDir = [-1,1][DeBread.randomNum(0,1)]
        },

        onDeath: boss => {
            doge('area').querySelectorAll('.lego').forEach(lego => {lego.destroy()})
        },

        moves: [
            { //Change movement direction
                duration: 0,
                do: boss => {
                    boss.data.movementDir = -boss.data.movementDir
                }
            },
            { //Walfling
                duration: 50,
                do: boss => {
                    spawnEnemy([...boss.data.pos],enemies.walfling,0,0)
                }
            },
            { //Fire
                duration: 25,
                do: boss => {
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        damage: 50,
                        size: 25,
                        speed: 10 * player.stats.enemy.speedMult,
                    }

                    createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)
                }
            },
            { //Dash
                duration: 50,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.1
                    })
                }
            },
            { //Lego
                duration: 25,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    const lego = document.createElement('div')
                    lego.classList.add('entity')
                    lego.classList.add('lego')
                    lego.ticksActive = 0
                    lego.pos = [...boss.data.centerPos]
                    lego.dirVels = [{
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.1
                    }]

                    addStyles(lego, {
                        width: '16px',
                        height: '8px',
                        backgroundImage: `url(graphics/enemies/lego${DeBread.randomNum(0,2)}.png)`,
                        backgroundSize: 'cover',
                        translate: '-50% -50%',
                        position: 'absolute',
                        left: lego.pos[0]+'px',
                        top: lego.pos[1]+'px'
                    })

                    lego.tick = () => {
                        for(let i = 0; i < lego.dirVels.length; i++) {
                            const dirVel = lego.dirVels[i]
                            lego.pos[0] += Math.cos(dirVel.angle) * dirVel.speed
                            lego.pos[1] += Math.sin(dirVel.angle) * dirVel.speed
                
                            dirVel.speed /= dirVel.div
                            if(Math.abs(dirVel.speed) <= 0.1) {
                                lego.dirVels.splice(i, 1)
                            }
                        }

                        addStyles(lego, {
                            left: lego.pos[0]+'px',
                            top: lego.pos[1]+'px'
                        })

                        lego.ticksActive++

                        if(
                            lego.pos[0] > doge('area').offsetWidth ||
                            lego.pos[0] < 0 ||
                            lego.pos[1] > doge('area').offsetHeight ||
                            lego.pos[1] < 0 
                        ) {
                            lego.destroy()
                        }
                    }

                    lego.destroy = () => {
                        for(let i = 0; i < 10; i++) {
                            createParticle(0,[...lego.pos],5,1.1,DeBread.randomNum(0,Math.PI * 2, 10), 5, 1.1, 100, {color: 'white'})
                        }

                        lego.remove()
                    }

                    doge('area').append(lego)
                }
            }
        ]
    },
    phoenix: {
        name: 'PHOENIX',
        desc: 'DO NOT TOUCH!',
        health: 1000,
        size: 36,
        color: [230, 140, 52],
        boss: true,
        miniboss: true,
        speed: 0,
        weight: 0.25,
        texture: 'phoenixPortrait.png',
        textureSheet: 'phoenix.png',
        fireImmunity: true,

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            boss.data.dirVels.push({
                speed: 0.25 * player.stats.enemy.speedMult,
                angle: angle+((Math.PI/2)*boss.data.movementDir),
                div: 1.05
            })
        },

        onSpawn: boss => {
            boss.data.movementDir = [-1,1][DeBread.randomNum(0,1)]
        },

        moves: [
            { //Change movement direction
                duration: 0,
                do: boss => {
                    boss.data.movementDir = -boss.data.movementDir
                }
            },
            { //Dash
                duration: 25,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 15 * player.stats.enemy.speedMult,
                        angle: playerAngle + (Math.PI * [-1,1][DeBread.randomNum(0,1)]) / 2,
                        div: 1.1
                    })
                }
            },
            { //Dash
                duration: 50,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.1
                    })
                }
            },
            { //Spray
                duration: 50,
                do: boss => {
                    for(let i = 0; i < 10; i++) {
                        boss.data.timeouts.push(createTimeout(() => {
                            const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                            const projAngle = Math.atan2(
                                DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight) - projPos[1],
                                DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth) - projPos[0],
                            )

                            const fire = createFire([...boss.data.centerPos], 100, false)
                            fire.dirVels.push({
                                speed: DeBread.randomNum(10,25,10) * player.stats.enemy.speedMult,
                                angle: projAngle + DeBread.randomNum(-0.25,0.25,10),
                                div: 1.1
                            })
                        }, i*2))
                    }
                }
            },
            { //Fire
                duration: 50,
                do: boss => {
                    for(let i = 0; i < 2; i++) {
                        boss.data.timeouts.push(createTimeout(() => {
                            const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                            const projAngle = Math.atan2(
                                projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                                projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                            )

                            const projData = {
                                cooldown: 10,
                                damage: 25,
                                explosionSize: 100,
                                speed: DeBread.randomNum(5,20,10) * player.stats.enemy.speedMult,
                                size: 10,
                                speedDiv: 1.05,
                                range: 250,
                                fireyAmmo: true,
                            }

                            createProjectile(1, [...projPos], projAngle + DeBread.randomNum(-0.25,0.25,10), projData, [player.elem], boss.data)
                        }, i*10))
                    }
                }
            },
        ]
    },
    chip: {
        name: 'CHIP',
        desc: '',
        health: 1000,
        size: 36,
        color: [216, 152, 148],
        boss: true,
        miniboss: true,
        speed: 0,
        weight: 0.25,
        texture: 'chipPortrait.png',
        textureSheet: 'chip.png',

        creep: {
            size: 5,
            damage: 5,
            ticks: 25,
            tickRate: 10,
            tickRate: 2,
            color: [222, 247, 255]
        },

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            boss.data.dirVels.push({
                speed: 0.25 * player.stats.enemy.speedMult,
                angle: angle+((Math.PI/2)*boss.data.movementDir),
                div: 1.05
            })
        },

        onSpawn: boss => {
            boss.data.movementDir = [-1,1][DeBread.randomNum(0,1)]
        },

        moves: [
            { //Change movement direction
                duration: 0,
                do: boss => {
                    boss.data.movementDir = -boss.data.movementDir
                }
            },
            { //Dash
                duration: 50,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 10 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.1
                    })
                }
            },
            { //Bird (chud)
                duration: 75,
                do: boss => {
                    spawnEnemy([...boss.data.pos],enemies.bird,0,0)
                }
            },
            { //Fire
                duration: 50,
                do: boss => {
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        cooldown: 10,
                        damage: 25,
                        speed: DeBread.randomNum(10,20,10) * player.stats.enemy.speedMult,
                        size: 20,
                        speedDiv: 1.1,
                        range: 30,

                        splits: 1,
                        split: 3,

                        poisonFieldChance: 100,
                        poisonFieldSize: 100,
                        poisonFieldTicks: 5,
                        poisonFieldDmgPercent: 40,
                        poisonFieldColor: [222, 247, 255],
                    }

                    createProjectile(1, [...projPos], projAngle + DeBread.randomNum(-0.25,0.25,10), projData, [player.elem], boss.data)
                }
            },
        ]
    },
    jaden: {
        name: 'JADEN',
        desc: '',
        health: 1250,
        size: 36,
        color: [178, 82, 102],
        boss: true,
        miniboss: true,
        speed: 0,
        weight: 0.5,
        texture: 'jadenPortrait.png',
        textureSheet: 'jaden.png',

        tick: boss => {
            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            if(boss.data.followingPlayer) {
                boss.data.dirVels.push({
                    speed: 0.5 * player.stats.enemy.speedMult,
                    angle: angle,
                    div: 1.05
                })

                createParticle(
                    1,
                    [...boss.data.centerPos],
                    DeBread.randomNum(3,5,10),
                    1.1,
                    Math.PI * DeBread.randomNum(0,1) + DeBread.randomNum(-0.1,0.1,10),
                    5,
                    1.1,
                    25,
                    {
                        color: 'rgba(255,255,255,0.25)'
                    }
                )
            } else {
                boss.data.dirVels.push({
                    speed: 0.25 * player.stats.enemy.speedMult,
                    angle: angle+((Math.PI/2)*boss.data.movementDir),
                    div: 1.05
                })
            }
        },

        onSpawn: boss => {
            boss.data.movementDir = [-1,1][DeBread.randomNum(0,1)]
            boss.data.followingPlayer = false
            boss.data.lastHitPlayer = 0
        },

        onPlayerCollision: boss => {
            if(e.gameUpdates - boss.data.lastHitPlayer > 25) {
                player.isBleeding = true
                player.damage(20)
                boss.data.damage(-20)
                boss.data.lastHitPlayer = e.gameUpdates

                const popup = createPopupText('+20', [...boss.data.centerPos])
                popup.style.color = 'lime'
                popup.style.fontSize = '10px'
                doge('area').append(popup)

            }
        },

        moves: [
            { //Follow player toggle
                duration: 10,
                do: boss => {
                    boss.data.followingPlayer = !boss.data.followingPlayer
                }
            },
            { //Change movement direction
                duration: 0,
                do: boss => {
                    boss.data.movementDir = -boss.data.movementDir
                }
            },
            { //Dash
                duration: 50,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 15 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.05
                    })
                }
            },
            { //Fire
                duration: 25,
                do: boss => {
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        damage: 50,
                        size: 25,
                        speed: 10 * player.stats.enemy.speedMult,
                        heal: 25
                    }

                    createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)
                }
            },
        ]
    },
}

const bosses = {
    the_tutorialist: {
        name: 'THE TUTORIALIST',
        desc: 'The creator of all',
        health: 15_000,
        size: 36,
        color: [255,255,255],
        boss: true,
        speed: 0,
        texture: 'tutorialist/tutorialistPortrait.png',
        textureSheet: 'tutorialist/tutorialist.png',
        bossBarTexture: 'tutorialist/tutorialistBar.gif',
        noDeathParticles: true,
        dontFinishBossWave: true,

        tick: boss => {
            //Looking directions

            const frames = {
                "-3": 0,
                "-2": 1,
                "-1": 2,
                "0": 5,
                "1": 8,
                "2": 7,
                "3": 6,
                "4": 3,
                "-4": 3
            }

            const dx = player.centerPos[0] - boss.data.centerPos[0]
            const dy = player.centerPos[1] - boss.data.centerPos[1]

            const angle = Math.atan2(dy, dx)

            const dir = Math.round(angle / (Math.PI / 4))
            boss.querySelector('.enemyTextureContainer').querySelector('img').style.translate = `-${(frames[dir] * 36) + 2 * frames[dir]}px 0px`

            //Movement
            boss.data.dirVels.push({
                speed: 0.25 * player.stats.enemy.speedMult,
                angle: angle,
                div: 1.05
            })

            //Shadow
            const shadow = document.createElement('div')
            shadow.style.setProperty('--shadowX',DeBread.randomNum(-25,25)+'px')
            shadow.style.setProperty('--shadowY',DeBread.randomNum(-25,25)+'px')
            shadow.classList.add('tutorialistShadow')
            addStyles(shadow, {
                left: boss.data.pos[0]+'px',
                top: boss.data.pos[1]+'px',
                width: '36px',
                height: '36px',
                backgroundSize: '36px 36px',
                opacity: '0.25',
                zIndex: '0'
            })

            doge('area').append(shadow)

            setTimeout(() => {
                shadow.remove()
            }, 1000);
        },

        moves: [
            { //Horizontal Dash
                duration: 25,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 15 * player.stats.enemy.speedMult,
                        angle: playerAngle + (Math.PI * [-1,1][DeBread.randomNum(0,1)]) / 2,
                        div: 1.1
                    })
                }
            },
            { //Dash
                duration: 50,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: playerAngle,
                        div: 1.1
                    })
                }
            },
            { //Fire
                duration: 25,
                do: boss => {
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        damage: 50,
                        size: 25,
                        speed: 7 * player.stats.enemy.speedMult,
                    }

                    createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)

                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 10 * player.stats.enemy.speedMult,
                        angle: playerAngle + Math.PI,
                        div: 1.1
                    })
                }
            },
            { //Spray
                duration: 50,
                do: boss => {
                    for(let i = 0; i < 5; i++) {
                        boss.data.timeouts.push(createTimeout(() => {
                            const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                            const projAngle = Math.atan2(
                                projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                                projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                            )

                            const projData = {
                                damage: 10,
                                size: 10,
                                speed: 7 * player.stats.enemy.speedMult,
                                radiationSize: 50,
                                poisonFieldChance: 100,
                                poisonFieldSize: 25,
                                poisonFieldTicks: 3,
                                poisonFieldDmgPercent: 25,
                                poisonFieldColor: [255,255,255],
                            }

                            createProjectile(1, [...projPos], projAngle + DeBread.randomNum(-0.25,0.25,10), projData, [player.elem], boss.data)
                        }, i*5))
                    }
                }
            },
            { //Servant
                duration: 100,
                do: boss => {
                    let servants = 1
                    let randomServant = DeBread.randomNum(0,1)

                    const servantData = enemies.tutorialistServant
                    servantData.textureSheet = `tutorialist/tutorialistServant${randomServant}.png`

                    const servant = spawnEnemy([...boss.data.pos],enemies.tutorialistServant,0,0)
                    servant.data.servantType = randomServant
                }
            },
            { //Star shot
                duration: 150,
                do: boss => {
                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 25 * player.stats.enemy.speedMult,
                        angle: playerAngle + Math.PI,
                        div: 1.1
                    })

                    boss.data.timeouts.push(createTimeout(() => {
                        for(let i = 0; i < 5; i++) {
                            boss.data.timeouts.push(createTimeout(() => {
                                const projData = {
                                    damage: 10,
                                    size: 20,
                                    speed: 7 * player.stats.enemy.speedMult,
                                    bounces: 1,
                                    range: 100,
                                }
                                for(let x = 0; x < 10; x++) {
                                    createProjectile(1,[...boss.data.centerPos],(Math.PI * 2 / 10) * x, projData, [player.elem], boss.data)
                                }
                            }, 5 * i))
                        }
                    }, 25))
                }
            },
            { //Fire homing
                duration: 100,
                do: boss => {
                    const projPos = [boss.data.pos[0] + (boss.data.size)/2, boss.data.pos[1] + (boss.data.size)/2]
                    const projAngle = Math.atan2(
                        projPos[1] - DeBread.randomNum(boss.data.target.pos[1], boss.data.target.pos[1] + boss.data.target.elem.offsetHeight),
                        projPos[0] - DeBread.randomNum(boss.data.target.pos[0], boss.data.target.pos[0] + boss.data.target.elem.offsetWidth),
                    )

                    const projData = {
                        damage: 50,
                        size: 25,
                        speed: 3 * player.stats.enemy.speedMult,
                        range: 500,
                        radiationSize: 50,
                        magnetStrength: 0.25,
                    }

                    const proj = createProjectile(1, [...projPos], projAngle, projData, [player.elem], boss.data)
                    proj.classList.add('tutorialistHomingProj')

                    const playerAngle = Math.atan2(
                        player.centerPos[1] - boss.data.centerPos[1],
                        player.centerPos[0] - boss.data.centerPos[0]
                    )

                    boss.data.dirVels.push({
                        speed: 10 * player.stats.enemy.speedMult,
                        angle: playerAngle + Math.PI,
                        div: 1.1
                    })
                },

                requirement: boss => {
                    return doge('area').querySelectorAll('.tutorialistHomingProj').length === 0
                }
            },
        ],

        onDeath: boss => {
            spawnEnemy([...boss.data.pos],enemies.tutorialistDeath, 0, 0)
        }
    },
}

const voicelines = {
    Dottr: {
        ambient: 11,
        hurt: 8,
        death: 2,
    },
    Plinkel: {
        ambient: 4,
        hurt: 4,
        death: 4,
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

    if(data.hideLevel || extraData.hideLevel) {
        enemy.querySelector('.enemyLevel').remove()
    }

    let sizeMult = [1,1]
    if(saveData.selectedChallenge === 'abstract') {
        sizeMult = [Math.pow(10,DeBread.randomNum(-1,1,5)),Math.pow(10,DeBread.randomNum(-1,1,5))]
    }

    enemy.data = {
        alive: true,
        active: false,

        maxHealth: extraData.health ?? data.health * (1 + level / 5),
        health: extraData.health ?? data.health * (1 + level / 5),
        lastHitDate: e.gameUpdates + 30,
        spawnDate: e.gameUpdates,
        immune: false,
        armor: 1,
        
        pos: [...pos],
        centerPos: [
            pos[0]+(data.size * sizeMult[0])/2,
            pos[1]+(data.size * sizeMult[1])/2
        ],
        size: extraData.size ?? data.size,
        weight: data.weight ?? 1,

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

        //Boss stuff
        currentAttack: {duration: 0},
        lastAttackDate: e.gameUpdates + 100,
        timeouts: []
    }
    if(data.phases) enemy.data.phase = 1

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

    if(data.textureSheet) {
        addStyles(enemy, {
            backgroundColor: 'transparent',
            borderRadius: '0px'
        })

        const div = document.createElement('div')
        div.classList.add('enemyTextureContainer')
        addStyles(div, {
            position: 'absolute',
            width: (extraData.size ?? data.size) * sizeMult[0] + 'px',
            height: (extraData.size ?? data.size) * sizeMult[1] + 'px',
            overflow: 'hidden'
        })

        const img = document.createElement('img')
        addStyles(img, {
            height: '74px',
        })
        img.src = `graphics/enemies/${data.textureSheet}`

        div.append(img)
        enemy.append(div)
    } else if(data.texture) {
        addStyles(enemy, {
            backgroundColor: 'transparent',
            backgroundImage: `url(graphics/enemies/${data.texture})`,
            backgroundSize: `${(extraData.size ?? data.size) * sizeMult[0]}px ${(extraData.size ?? data.size) * sizeMult[1]}px`,
            borderRadius: '0px'
        })
    }


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
    if(data.boss || data.useBossBar) {
        enemyData.bossBar = document.createElement('div')
        enemyData.bossBar.classList.add('gameBossbar')
        enemyData.bossBar.innerHTML = `
            <span>${data.name.toUpperCase()}</span>
            <div class="gameBossbarFill" style="width: 0%; background-color: rgb(${data.color});"></div>
        `

        if(data.bossBarTexture) {
            enemyData.bossBar.querySelector('div').style.backgroundImage = `url(graphics/enemies/${data.bossBarTexture})`
            enemyData.bossBar.querySelector('div').style.backgroundSize = 'cover'
        }

        doge('gameBossbarContainer').append(enemyData.bossBar)

        if(data.phases) {
            for(let i = 0; i < data.phases; i++) {
                const phaseBar = document.createElement('div')
                addStyles(phaseBar, {
                    position: 'absolute',
                    translate: '-50% 0',
                    width: '2px',
                    height: '100%',
                    backgroundColor: 'black',
                    top: '0',
                    left: (100/(data.phases))*i+'%',
                    zIndex: '1'
                })

                enemyData.bossBar.append(phaseBar)
            }
        }
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
    
            if(enemyData.target && isColliding(enemy, enemyData.target.elem) && !enemyData.data.noTargetCollision) {
                const angle = Math.atan2(enemyData.target.centerPos[1] - enemyData.centerPos[1], enemyData.target.centerPos[0] - enemyData.centerPos[0])
                const distance = Math.sqrt(
                    Math.pow(enemyData.pos[0] - enemyData.target.pos[0],2) + 
                    Math.pow(enemyData.pos[1] - enemyData.target.pos[1],2)
                )
    
                const overlap = (enemyData.size - distance) / 10
                enemyData.pos[0] -= Math.cos(angle) * (enemyData.speed * player.stats.enemy.speedMult * enemyData.speedMult + overlap)
                enemyData.pos[1] -= Math.sin(angle) * (enemyData.speed * player.stats.enemy.speedMult * enemyData.speedMult + overlap)
                
                if(data.meleeDamage && e.gameUpdates - enemyData.lastHitDate >= 25) {
                    enemyData.target.damage(data.meleeDamage * (1 + level / 5))
                    enemyData.lastHitDate = e.gameUpdates

                    if(enemyData.explosive) {
                        if(enemyData.explosive.impact) {
                            enemy.data.kill()
                        }
                    }
                }

                if(data.onPlayerCollision) {
                    data.onPlayerCollision(enemy)
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
        if(extraData.regen || data.regen) {
            enemy.data.damage(-(extraData.regen ?? data.regen), true)
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
        if(enemyData.active && data.creep && e.gameUpdates % (data.creep.tickRate ?? 10) === 0) {
            createPoisonField([...enemy.data.centerPos],data.creep.size ?? enemy.data.size,data.creep.damage,data.creep.ticks,data.creep.tickRate, [player.elem], data.creep.color ?? data.color, true)
        }

        //Fire
        if(!data.fireImmunity) {
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

        //Boss stuff
        if(data.boss && enemyData.active) {
            let meetsMoveRequirement = true

            if(data.generalMoveRequirement) {
                meetsMoveRequirement = data.generalMoveRequirement(enemy)
            }
            
            let randomAttack
            if(data.phases) {
                randomAttack = data.moves[enemy.data.phase-1][DeBread.randomNum(0, data.moves[enemy.data.phase-1].length-1)]
            } else {
                randomAttack = data.moves[DeBread.randomNum(0, data.moves.length-1)]
            }

            if(randomAttack.requirement) {
                meetsMoveRequirement = randomAttack.requirement(enemy)
            }

            if(e.gameUpdates - enemyData.lastAttackDate > ((enemyData.currentAttack.duration ?? 0) / player.stats.enemy.speedMult) && meetsMoveRequirement) {
                randomAttack.do(enemy)
                enemyData.lastAttackDate = e.gameUpdates
                enemyData.currentAttack = randomAttack
            }
        }

        //Tick events
        if(data.tick && enemyData.active) {
            data.tick(enemy)
        }
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
                // projData.damage *= (1 + level / 5)
                projData.speed *= player.stats.enemy.speedMult
                projData.speed *= enemyData.speedMult

                createProjectile(1, [...projPos], projAngle, projData, [player.elem], enemy.data)
                enemyData.dirVels.push({angle: projAngle, speed: data.projectile.recoil ?? 0, div: 1.25})

                enemyData.lastShotDate = e.gameUpdates

                DeBread.playSound(`audio/enemyShoot${DeBread.randomNum(0,2)}.mp3`,DeBread.randomNum(0.95,1.05,10),false)
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

        if(data.boss || data.useBossBar) {
            enemyData.bossBar.querySelector('div').style.width = enemyData.health / enemyData.maxHealth * 100 + '%'
        }

        if(data.onSpawn) data.onSpawn(enemy)
    }

    enemy.data.damage = (amountBase, silent, origin) => {
        if(enemyData.active) {
            let amount = amountBase
            if(enemyData.isBleeding) {
                amount *= 1.5
            }

            amount /= enemyData.armor

            if(enemyData.immune) {
                amount = 0
            }

            if(enemyData.health < Infinity) {
                enemy.querySelector('.enemyHealthBarContainer').style.opacity = '1'
            }

            enemyData.health -= amount
            enemyData.health = Math.min(enemyData.health, enemyData.maxHealth)

            healthBar.style.width = enemyData.health / enemyData.maxHealth * 100 + '%'

            if(data.boss || data.useBossBar) {
                addStyles(enemyData.bossBar.querySelector('div'), {
                    width: enemyData.health / enemyData.maxHealth * 100 + '%',
                    animation: 'none'
                })
                requestAnimationFrame(() => {
                    enemyData.bossBar.querySelector('div').style.animation = 'bossbarPulse 250ms ease-out 1 forwards'
                })
            }

            if(!silent) {
                DeBread.playSound('audio/enemyHit.mp3', DeBread.randomNum(0.9,1.1,5), false)
                
                healthBar.style.animation = 'none'
                enemy.style.animation = 'none'
                setTimeout(() => {
                    healthBar.style.animation = 'healthBarPulse 250ms ease-out 1 forwards'
                    enemy.style.animation = 'enemyHit 250ms ease-out 1 forwards'
                }, e.gameUpdateInterval)
            }
            
            if(enemyData.health <= 0) {
                enemy.data.kill(origin)
            }

            enemyData.damageTaken += amount
            player.gameOverStats.damageGiven += amount

            if(enemyData.health === Infinity) {
                enemy.querySelector('span').innerText = formatNumber(DeBread.round(enemyData.damageTaken))
            }

            if(amount > 0) {
                player.comboStrength++

                
                if(saveData.settings.enemyVoiceLines !== 'none' && DeBread.randomNum(1,7) === 1) {
                    const volumeSpeedMult = 50 / enemyData.size
                    DeBread.playSound(
                        `audio/voicelines/${saveData.settings.enemyVoiceLines}/hurt${DeBread.randomNum(0,voicelines[saveData.settings.enemyVoiceLines].hurt)}.mp3`,
                        volumeSpeedMult,
                        false
                    )
                }
                
                if(data.onDamage) {
                    data.onDamage(enemy,silent)
                }
            }

            return amount
        }  
    }
    
    enemy.data.kill = (origin) => {
        if(enemyData.alive) {
            enemyData.alive = false
            
            if(!data.noDeathParticles) {
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
            }
            
            if(data.boss || data.useBossBar) {
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
            
            if(data.explosive) {
                createExplosion(
                    [...enemyData.centerPos],
                    data.explosive.size,
                    data.explosive.damage,
                    25,
                    false
                )
            }
            
            if(player.tutorial.stage === 3) {
                player.tutorial.goalValue++
                updateTutorialGoal()
            }
            
            
            
            if(!data.noKillBonus) {
                if(origin) {
                    origin.kills++
                    if(origin.kills >= 4) {
                        getStyle(styles.multi_kill)
                    } else if(origin.kills >= 3) {
                        getStyle(styles.triple_kill)
                    } else if(origin.kills >= 2) {
                        getStyle(styles.double_kill)
                    } else {
                        getStyle(styles.kill)
                    }
                } else {
                    getStyle(styles.kill)
                }

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

                player.getPower(1)
                player.gameOverStats.enemiesKilled++
            }
            if(saveData.settings.enemyVoiceLines !== 'none') {
                const volumeSpeedMult = 50 / enemyData.size
                DeBread.playSound(
                    `audio/voicelines/${saveData.settings.enemyVoiceLines}/death${DeBread.randomNum(0,voicelines[saveData.settings.enemyVoiceLines].death)}.mp3`,
                    volumeSpeedMult,
                    false
                )
            }
            
            if(doge('perfect')) {
                doge('perfect').style.animation = 'none'
                doge('perfect').querySelector('div').style.animation = 'none'
                requestAnimationFrame(() => {
                    doge('perfect').style.animation = 'perfectPulse 250ms ease-out 1 forwards'
                    doge('perfect').querySelector('div').style.animation = 'perfectOverlayPulse 250ms ease-out 1 forwards'
                })
            }

            player.lastKillDate = e.gameUpdates
        }
        
        if(doge('area').querySelectorAll('.enemy').length === 0 && saveData.gameSettings.gamemode !== 2) {
            progressWave()
        }

        //Clear enemy attached timeouts
        for(const id of enemyData.timeouts) {
            timeouts[id].finished = true
        }

        if(data.finishBossWave) {
            player.fightingBoss = false
            player.wave++   
        }

        if(data.boss) {
            if(!data.dontFinishBossWave) {
                player.fightingBoss = false
                player.wave++
            }

            DeBread.easeShake(doge('area'),20,5,0.1)

            player.moneyBonusQueue.push({
                text: 'Boss kill',
                value: 25,
            })
            
            // e.gameUpdateInterval *= 2
            // createTimeout(() => {
            //     e.gameUpdateInterval /= 2
            // }, 50)
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

    return enemy
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
        } else if(wave === 101) {
            getAchievement(`${saveData.selectedCharacter}_Perfection`)
            getAchievement('Conqueror')
        } else if(wave === 50) {
            getAchievement('Trooper')
        } else if(wave === 10) {
            getAchievement('Survivor')
        }
    }
}

function progressWave(portal) {
    if(![2,3,4].includes(saveData.gameSettings.gamemode) && e.gameUpdates - player.lastWaveDate > 2) {
        if(player.wave % 5 === 0 && player.wave > 0 && !portal) {
            if(elems.enemies.length === 0 && e.gameUpdates - player.lastKillDate > 100) {
                if(player.wave % 100 === 0) {
                    player.fightingBoss = true
                    const bossKey = DeBread.randomNum(0, Object.keys(bosses).length - 1)
                    const boss = bosses[Object.keys(bosses)[bossKey]]
                    startLargeBossSequence(
                        {
                            name: characters[saveData.selectedCharacter].name,
                            imgSrc: `graphics/characters/${saveData.selectedCharacter}PortraitLarge.png`
                        },
                        {
                            name: boss.name,
                            imgSrc: `graphics/enemies/${boss.name.toLowerCase()}PortraitLarge.png`
                        }
                    )
                    createTimeout(() => {
                        spawnEnemy([doge('area').offsetWidth / 2, doge('area').offsetHeight / 2], boss, 1, 100)
                    }, 500)

                    player.health = player.stats.player.maxHealth
                    updateUI()
                } else if(player.wave % 25 === 0) {
                    player.fightingBoss = true
                    const bossKey = DeBread.randomNum(0, Object.keys(minibosses).length - 1)
                    const boss = minibosses[Object.keys(minibosses)[bossKey]]
                    startBossSequence(
                        {
                            name: characters[saveData.selectedCharacter].name,
                            imgSrc: `graphics/characters/${saveData.selectedCharacter}PortraitLarge.png`
                        },
                        {
                            name: boss.name,
                            imgSrc: `graphics/enemies/${boss.name.toLowerCase()}PortraitLarge.png`
                        }
                    )
                    createTimeout(() => {
                        spawnEnemy([doge('area').offsetWidth / 2, doge('area').offsetHeight / 2], boss, 1, 100)
                    }, 100)

                    player.health = player.stats.player.maxHealth
                    updateUI()
                } else {
                    if(saveData.selectedChallenge === 'perfect' && player.timesHit > 0) {
                        player.autoWavesPaused = false
                        progressWave(true)
                    } else {
                        spawnPortal()
                    }
                }
            }
        } else {
            player.wave++
            spawnWave(player.wave)
            player.lastWaveDate = e.gameUpdates
        
            doge('gameWaveCounter').innerText = player.wave
        
            doge('gameWaveCounter').style.animation = 'none'
            requestAnimationFrame(() => {
                doge('gameWaveCounter').style.animation = 'wavePulse 1s ease-out 1 forwards'
            })
    
            if(player.wave % 5 === 0) {
                player.lastWaveDate = 0
            }
        }
    }
}

function startBossSequence(playerData = {}, opponentData = {}) {
    doge('bossPopupPlayerName').innerText = playerData.name ?? '???'
    doge('bossPopupPlayerImg').src = playerData.imgSrc
    if(playerData.modifier) {
        doge('bossPopupPlayerModifier').innerText = playerData.modifier
        doge('bossPopupPlayerModifier').style.display = 'unset'
    } else {
        doge('bossPopupPlayerModifier').style.display = 'none'
    }


    let evils = [
        'Evil',
        'Fucked up',
        'Twisted',
    ]

    if(opponentData.name.toLowerCase() === playerData.name.toLowerCase()) {
        opponentData.name = `${evils[DeBread.randomNum(0,evils.length-1)]} ${opponentData.name}`
    }
    doge('bossPopupOpponentName').innerText = opponentData.name ?? '???'
    doge('bossPopupOpponentImg').src = opponentData.imgSrc
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

function startLargeBossSequence(playerData = {}, opponentData = {}) {
    doge('gameLargeBossPopupOpponentName').innerText = opponentData.name
    doge('gameLargeBossPopupContainer').style.opacity = '1'
    doge('gameLargeBossPlayerImg').src = `graphics/characters/${saveData.selectedCharacter}Portrait.png`

    DeBread.shake(doge('gameLargeBossOpponentImg'), 20, 1, 1, 10000)

    createTimeout(() => {
        doge('gameLargeBossPopupContainer').style.gap = '100px'
        doge('gameLargeBossPopupContainer').querySelectorAll('.gameLargeBossPopupSection').forEach(section => {
            section.style.opacity = '1'
            section.style.letterSpacing = '10px'
        })

        createTimeout(() => {
            doge('gameLargeBossPopupContainer').querySelectorAll('.gameLargeBossPopupSection').forEach(section => {
                section.style.opacity = '0'
            })

            createTimeout(() => {
                doge('gameLargeBossPopupContainer').style.opacity = '0'

                setTimeout(() => {
                    doge('gameLargeBossPopupContainer').style.gap = '0px'
                    doge('gameLargeBossPopupContainer').querySelectorAll('.gameLargeBossPopupSection').forEach(section => {
                        section.style.letterSpacing = '0px'
                    })
                }, 1000);
            }, 100)
        }, 200)
    }, 100)
}