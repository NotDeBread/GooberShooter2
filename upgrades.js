function renderStats() {
    doge('gameStatsContainer').innerHTML = ''
    for(const key in player.stats) {
        const statSection = document.createElement('div')
        statSection.classList.add('gameStatContainer')
        statSection.innerHTML = `<span class="gameStatSectionName">${key.toUpperCase()}</span>`
        for(const stat in player.stats[key]) {
            if(player.visibleStats.includes(`${key}-${stat}`) || saveData.settings.debug) {
                const elem = document.createElement('div')
                elem.innerHTML = `
                    <span class="gameStatName">${stat}:</span>
                    <span id="${key}-${stat}">${player.stats[key][stat]}</span>
                    <span class="gameStatChange" id="${key}-${stat}Change"></span>
                `
                statSection.append(elem)
            }
        }

        if(statSection.children.length > 1) {
            doge('gameStatsContainer').append(statSection)
        }
    }

    if(saveData.settings.debug) {
        addStyles(doge('gameStatsContainer'), {
            opacity: '0.25',
            fontSize: '0.25em'
        })
    } else {
        addStyles(doge('gameStatsContainer'), {
            opacity: '1',
            fontSize: '0.75em'
        })
    }
}

function fixStats() {
    //Ammo
    player.stats.ammo.max = DeBread.round(player.stats.ammo.max)
    if(player.stats.ammo.current > player.stats.ammo.max) {
        player.stats.ammo.current = player.stats.ammo.max
    }

    if(characters[saveData.selectedCharacter].weapon === weaponPresets.none) {
        player.stats.ammo.max = 0
    }

    player.stats.player.speed = Math.min(player.stats.player.speed,10)

    player.stats.bullet.multishot = Math.max(DeBread.round(player.stats.bullet.multishot),1)
}

function modifyStat(stat, modifier) {
    const startingValue = player.stats[stat[0]][stat[1]] * (player.stats[stat[0]][stat[1]+"Mult"] ?? 1)
    eval('player.stats[stat[0]][stat[1]]' + modifier)
    
    fixStats()
    
    const change = player.stats[stat[0]][stat[1]] * (player.stats[stat[0]][stat[1]+"Mult"] ?? 1) - startingValue
    if(doge(`${stat[0]}-${stat[1]}`)) {
        doge(`${stat[0]}-${stat[1]}`).innerText = DeBread.round(player.stats[stat[0]][stat[1]] * (player.stats[stat[0]][stat[1]+"Mult"] ?? 1),2)
        const changeElem = doge(`${stat[0]}-${stat[1]}Change`)
        
        if(change > 0) {
            changeElem.innerText = `+${DeBread.round(change,2)}`
            changeElem.style.color = 'rgb(100,255,100)'
        } else if(change < 0) {
            changeElem.innerText = DeBread.round(change,2)
            changeElem.style.color = 'rgb(255,100,100)'
        }

        changeElem.style.opacity = 1
        clearTimeout(changeElem.timeout)
        changeElem.timeout = setTimeout(() => {
            changeElem.style.opacity = 0
        }, 2500);
    }

    if(player.stats.player.speed >= 10) {
        getAchievement('Speed_Demon')
    }
}

const upgrades = [
    {
        reinforced_gloves: {
            name: 'Reinforced Gloves',
            desc: `
                <cg>+10%</cg> Reload speed
            `,

            apply: () => {
                modifyStat(['ammo','reloadSpeed'], '*=0.9')
            },

            requirement: () => {
                return player.stats.ammo.max < Infinity && characters[saveData.selectedCharacter].weapon !== weaponPresets.none
            }
        },
        bandage: {
            name: 'Bandage',
            desc: `
                <cg>+25</cg> HP
            `,

            apply: () => {
                player.health += 25
            },

            requirement: () => {
                return player.health / player.stats.player.maxHealth < 0.9
            }
        },
        helmet: {
            name: 'Hard Hat',
            desc: `
                <cg>+20</cg> Max HP
            `,

            apply: () => {
                modifyStat(['player','maxHealth'], '+=20')
            }
        },
        running_shoes: {
            name: 'Running Shoes',
            desc: `
                <cg>+0.5</cg> Speed
            `,

            apply: () => {
                modifyStat(['player','speed'], '+=0.5')
            },

            requirement: () => {
                return player.stats.player.speed < 10
            }
        },
        // magnet: {
        //     name: 'Magnet',
        //     desc: `
        //         <cg>+0.25</cg> Pickup pull strength
        //     `,

        //     apply: () => {
        //         modifyStat(['player','pickupRange'], '+=0.25')
        //     }
        // },
        rock: {
            name: 'Rock',
            desc: `
                <cg>+1</cg> Damage
            `,
            priceMult: 1.25,
            
            apply: () => {
                modifyStat(['bullet', 'damage'], '+=1')
            }
        },
        precision_goggles: {
            name: 'Precision Goggles',
            desc: `
                <cg>+2</cg>% Crit chance
            `,
            
            apply: () => {
                modifyStat(['bullet', 'critChance'], '+=2')
            }
        },
        chalk: {
            name: 'Chalk',
            desc: `
                <cg>+1</cg> Melee Damage
            `,
            
            apply: () => {
                modifyStat(['melee', 'damage'], '+=1')
            }
        },
        hand_wrap: {
            name: 'Hand Wrap',
            desc: `
                <cg>-5%</cg> Melee cooldown
            `,
            
            apply: () => {
                modifyStat(['melee', 'cooldown'], '*=0.95')
            }
        },
        mushroom: {
            name: 'Mushroom',
            desc: `
                Multiplies a random base stat by <strong>1.15</strong>.
            `,
            
            apply: () => {
                const stats = [
                    ['bullet','damage'],
                    ['bullet','speed'],
                    ['bullet','size'],
                    ['bullet','shotCooldown'],
                    ['bullet','range'],
                    ['player','maxHealth'],
                    ['ammo','reloadSpeed'],
                    ['ammo','max'],
                    ['melee','size'],
                    ['melee','damage']
                ]
                const randomStat = stats[DeBread.randomNum(0,stats.length-1)]
                createNotification('Stat increased!',`${randomStat[0]} ${randomStat[1]}`)

                modifyStat(randomStat,'*=1.1')
            }
        },
    },
    {
        heavy_ammo: {
            name: 'Heavy Ammo',
            desc: `
            <cg>+2</cg> Damage<br>
            <cb>-10%</cb> Projectile speed`,
            apply: () => {
                modifyStat(['bullet', 'damage'], '+=3')
                modifyStat(['bullet', 'speed'], '*=0.9')
            },
        },
        light_ammo: {
            name: 'Light Ammo',
            desc: `
                <cg>+0.25</cg> Projectile speed<br>
                <cb>-5%</cb> Damage
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['bullet','speed'], '+=0.25')
                modifyStat(['bullet','damage'], '*=0.95')
            }

        },
        trigger_finger: {
            name: 'Trigger Finger',
            desc: `
                <cg>-10%</cg> Shot cooldown
            `,

            apply: () => {
                modifyStat(['bullet','shotCooldown'], '*=0.9')
            },

            requirement: () => {
                return characters[saveData.selectedCharacter].weapon !== weaponPresets.none
            }
        },
        extended_mag: {
            name: 'Extended Mag',
            desc: `
                <cg>+3</cg> Max ammo<br>
                <cb>-10%</cb> Reload speed
            `,

            apply: () => {
                modifyStat(['ammo','max'], '+=3')
                modifyStat(['ammo','reloadSpeed'], '*=1.1')
            },

            requirement: () => {
                return player.stats.ammo.max < Infinity && characters[saveData.selectedCharacter].weapon !== weaponPresets.none
            }
        },
        medkit: {
            name: 'Medkit',
            desc: `
                <cg>+100%</cg> HP
            `,
            priceMult: 0.75,

            apply: () => {
                player.health = player.stats.player.maxHealth
            }
        },
        four_leaf_clover: {
            name: 'Four-leaf Clover',
            desc: `
                <cg>+1</cg> Luck
            `,

            apply: () => {
                modifyStat(['shop','luck'], '+=1')
            }
        },
        steroids: {
            name: 'Steroids',
            desc: `
            <cg>+2.5</cg> Damage<br>
            <cb>-15%</cb> Max HP
            `,
            priceMult: 1.1,
            
            apply: () => {
                modifyStat(['bullet','damage'], '+=2.5')
                modifyStat(['player','maxHealth'], '*=0.85')
            }
        },
        bouncy_ammo: {
            name: 'Bouncy Ammo',
            desc: `
            <cg>+2</cg> Projectile bounces<br>
            <cg>+0.25</cg> Projectile knockback<br>
            <cb>-20%</cb> Damage<br>
            <cb>-20%</cb> Reload speed<br>
            <em style="color: grey;">Bounces multiply projectile damage by 1.2.</em>
            `,
            priceMult: 1.25,
            
            apply: () => {
                modifyStat(['bullet','bounces'], '+=2')
                modifyStat(['bullet','knockback'], '+=0.25')
                modifyStat(['bullet','damage'], '*=0.8')
                modifyStat(['ammo','reloadSpeed'], '*=1.2')
            }
        },
        scope: {
            name: 'Scope',
            desc: `
                <cg>+10%</cg> Crit damage <br>
                <cg>+5</cg>% Crit chance
            `,

            apply: () => {
                modifyStat(['bullet','critDamageMult'], '*=1.1')
                modifyStat(['bullet','critChance'], '+=10')
            }
        },
        grip: {
            name: 'Grip',
            desc: `
                <cg>+10%</cg> Accuracy<br>
                <cg>-5%</cg> Shot cooldown
            `,
            priceMult: 1.15,

            apply: () => {
                modifyStat(['bullet','accuracy'], '*=0.9')
                modifyStat(['bullet','shotCooldown'], '*=0.95')
            }
        },
        totem: {
            name: 'Totem',
            desc: `
                <cg>+4</cg> Damage <br>
                <cb>+2</cb> Enemy level
            `,

            apply: () => {
                modifyStat(['bullet','damage'], '+=4')
                modifyStat(['enemy','levelIncrease'], '+=2')
            }
        },
        brass_knuckles: {
            name: 'Brass Knuckles',
            desc: `
                <cg>+5</cg> Melee damage
            `,

            apply: () => {
                modifyStat(['melee','damage'], '+=5')
            }
        },
        screw: {
            name: 'Screw',
            desc: `
                Player projectiles gain a +<cg>10%</cg> chance to hit an enemy an additional time<br>
                <cb>-20%</cb> Reload speed
            `,
            priceMult: 1.5,

            apply: () => {
                modifyStat(['bullet','drillChance'], '+=10')
                modifyStat(['ammo','reloadSpeed'], '*=1.2')
            }
        },
        mini_mushroom: {
            name: 'Mini Mushroom',
            desc: `
                <cg>-10%</cg> Size <br>
                <cg>+1</cg> Speed <br>
                <cg>+20%</cg> Reload speed<br>
                <cb>-10%</cb> Max HP
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['player','size'], '*=0.9')
                modifyStat(['player','speed'], '+=1')
                modifyStat(['ammo','reloadSpeed'], '*=0.8')
                modifyStat(['player','maxHealth'], '*=0.9')
            }
        },
        mega_mushroom: {
            name: 'Mega Mushroom',
            desc: `
                <cg>+40</cg> Max HP<br>
                <cg>+1</cg> Contact damage<br>
                <cb>+15</cb> Size <br>
                <cb>-15%</cb> Speed <br>
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['player','maxHealth'], '+=40')
                modifyStat(['player','contactDamage'], '+=1')
                modifyStat(['player','size'], '+=15')
                modifyStat(['player','speed'], '*=0.85')
            }
        },
        speedbag: {
            name: 'Speedbag',
            desc: `
                <cg>-15%</cg> Melee cooldown<br>
            `,

            apply: () => {
                modifyStat(['melee','cooldown'], '*=0.85')
            }
        },
        boxing_gloves: {
            name: 'Boxing Gloves',
            desc: `
                <cg>+10</cg> Melee size<br>
                <cb>-25%</cb> Melee damage
            `,
            unlockable: true,

            apply: () => {
                modifyStat(['melee','size'], '+=10')
                modifyStat(['melee','damage'], '*=0.75')
            }
        },
        feedbacker: {
            name: 'Feedbacker',
            desc: `
                Gain <cg>+10</cg> HP when parrying an enemy projectile.
            `,
            unlockable: true,

            apply: () => {
                modifyStat(['player','parryHeal'], '+=10')
            }
        },
        skates: {
            name: 'Skates',
            desc: `
                <cg>+2</cg> Speed<br>
                <cb>-30%</cb> Friction
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['player','speed'], '+=2')
                modifyStat(['player','speedStep'], '*=0.7')
            },

            requirement: () => {
                return player.stats.player.speed < 10
            }
        },
        shield: {
            name: 'Shield',
            desc: `
                <cg>+15</cg> Melee size<br>
                <cb>+15%</cb> Melee cooldown<br>
                <cb>-5%</cb> Speed
            `,

            apply: () => {
                modifyStat(['melee','size'], '+=15')
                modifyStat(['melee','cooldown'], '*=1.15')
                modifyStat(['player','speed'], '*=0.95')
            }
        },
        thorn_ring: {
            name: 'Thorn Ring',
            desc: `
                <cg>+6.6</cg> Damage<br>
                After firing a projectile, take <cb>+0.5</cb> damage.<br>
                <em style="color:grey;">Does not damage player when at 1HP or less.</em>
            `,

            apply: () => {
                modifyStat(['bullet','damage'], '+=6.6')
                modifyStat(['bullet','thornDamage'], '+=0.5')
            }
        },
        pepto_bismol: {
            name: 'Pepto Bismol',
            desc: `
                Parried projectiles spawn poison fields on impact.
            `,
            priceMult: 0.75,
            unlockable: true,

            apply: () => {
                if(player.stats.player.parryPoisonSize > 0) {
                    modifyStat(['player','parryPoisonSize'], '+=20')
                } else {
                    modifyStat(['player','parryPoisonSize'], '=50')
                }

                modifyStat(['player','parryPoisonTicks'], '+=5')
                modifyStat(['player','parryPoisonDmg'], '+=50')
            }
        },
        extended_barrel: {
            name: 'Extended Barrel',
            desc: `
                <cg>+15</cg> Range<br>
                <cb>-10%</cb> Damage
            `,

            apply: () => {
                modifyStat(['bullet','range'], '+=15')
                modifyStat(['bullet','damage'], '*=0.9')

                const speedDivBefore = player.stats.bullet.speedDiv - 1
                const speedDivAfter = speedDivBefore * 0.95

                modifyStat(['bullet','speedDiv'], `-=${speedDivBefore-speedDivAfter}`)
            }
        },
        bean_bag_rounds: {
            name: 'Bean Bag Rounds',
            desc: `
                <cg>+1</cg> Knockback<br>
                <cb>-10%</cb> Damage
            `,
            priceMult: 0.75,

            apply: () => {
                modifyStat(['bullet','knockback'], '+=1')
                modifyStat(['bullet','damage'], '*=0.9')
            }
        },
        dagger: {
            name: 'Dagger',
            desc: `
                Heal <cg>+5</cg> HP when meleeing an enemy.
            `,
            unlockable: true,

            apply: () => {
                modifyStat(['melee','heal'], '+=5')
            }
        },
        sharp_plug: {
            name: 'Sharp Plug',
            desc: `
                Fills up the <cp>POWER</cp> bar<br>
                Lose <cb>1</cb>HP for each POWER point gained
            `,

            priceMult: 0.75,
            apply: () => {
                const difference = player.stats.player.maxPower - player.power
                player.getPower(difference)
                player.damage(difference, true)
                DeBread.playSound('audio/hit.mp3')
            },

            requirement: () => {
                return player.power < player.stats.player.maxPower
            }
        },
        store_credit: {
            name: 'Store Credit',
            desc: `
                Gain <cp>+$10</cp> when entering the shop.
            `,

            priceMult: 1.1,
            apply: () => {
                modifyStat(['player','couponBonus'],'+=10')
            },
        },
        coupon: {
            name: 'Coupon',
            desc: `
                <cg>-15%</cg> shop reroll price
            `,

            priceMult: 1.25,
            apply: () => {
                modifyStat(['shop','rerollPrice'],'*=0.85')

                if(player.rerolls === 0) {
                    doge('rerollPrice').innerText = `($${Math.floor(player.stats.shop.rerollPrice)})`
                }
            },
        },
    },
    {
        boulder: {
            name: 'Boulder',
            desc: `
                <cg>+10</cg> Damage<br>
                <cb>-20%</cb> Speed<br>
                <cb>+15t</cb> Shot cooldown
            `,

            apply: () => {
                modifyStat(['bullet','damage'], '+=10')
                modifyStat(['player','speed'], '*=0.8')
                modifyStat(['bullet','shotCooldown'], '+=15')
            }
        },
        parasite: {
            name: 'Parasite',
            desc: `
                Heal for <cg>+0.25</cg> HP when an enemy is hit.
            `,
            priceMult: 1.2,

            apply: () => {
                modifyStat(['bullet','heal'], '+=0.25')
            }
        },
        drum_mag: {
            name: 'Drum Mag',
            desc: `
                <cg>+10</cg> Max ammo<br>
                <cb>+50%</cb> Reload speed<br>
                <cb>+25%</cb> Shot cooldown 
            `,

            apply: () => {
                modifyStat(['ammo','max'], '+=10')
                modifyStat(['ammo','reloadSpeed'], '*=1.5')
                modifyStat(['bullet','shotCooldown'], '*=1.25')
            },

            requirement: () => {
                return player.stats.ammo.max < Infinity && characters[saveData.selectedCharacter].weapon !== weaponPresets.none
            }
        },
        drill_ammo: {
            name: 'Drill Ammo',
            desc: `
                Player projectiles hit <cg>+1</cg> additional times when hitting an enemy.<br>
                <cg>+2</cg> Damage<br>
                <cb>-25%</cb> Bullet speed
            `,

            priceMult: 1.25,

            apply: () => {
                modifyStat(['bullet','drillTicks'], '+=1')
                modifyStat(['bullet','damage'], '+=2')
                modifyStat(['bullet','speed'], '*=0.75')
            }
        },
        magnetic_ammo: {
            name: 'Magnetic Ammo',
            desc: `
                Player projectiles become attracted towards nearby enemies.<br>
                <cb>-20%</cb> Max ammo
            `,
            priceMult: 1.25,

            apply: () => {
                modifyStat(['bullet','magnetStrength'], '+=0.2')
                modifyStat(['ammo','max'], '*=0.8')
            }
        },
        goat_head: {
            name: 'Goat Head',
            desc: `
                Reduces max HP to <cb>10</cb>.<br>
                Gain <cg>+0.1</cg> Damage for each health point taken.
            `,
            priceMult: 1.25,

            apply: () => {
                modifyStat(['bullet','damage'], `+=(player.stats.player.maxHealth-10)/10`)
                modifyStat(['player','maxHealth'], '=10')
            },

            requirement: () => {
                return player.stats.player.maxHealth > 10
            }
        },
        nuclear_waste: {
            name: 'Nuclear Waste',
            desc: `
                Player projectiles get a <cg>+10%</cg> chance to create a poison field, dealing <cg>+100%</cg> of your damage for <cg>+5</cg> ticks.<br>
                <cg>+5</cg> Poison field size <br>
                <cb>-50%</cb> Max health
            `,

            apply: () => {
                modifyStat(['bullet','poisonFieldChance'], '+=10')
                modifyStat(['bullet','poisonFieldDmgPercent'], '+=100')
                modifyStat(['bullet','poisonFieldTicks'], '+=5')
                if(player.stats.bullet.poisonFieldSize > 0) {
                    modifyStat(['bullet','poisonFieldSize'], '+=10')
                } else {
                    modifyStat(['bullet','poisonFieldSize'], '+=100')
                }
                modifyStat(['player','maxHealth'], '*=0.5')
            }
        },
        static_socks: {
            name: 'Static Socks',
            desc: `
                Every 100 ticks, spawn a electricity field on a random enemy, dealing +<cg>150%</cg> of your damage.
            `,

            apply: () => {
                modifyStat(['player','socksDamage'], '+=1.5')
            }
        },
        grow: {
            name: 'Grow',
            desc: `
                Every tick a player projectile is active, multiply damage and size by 1.0025 (<cg>+0.0025</cg>)
            `,

            apply: () => {
                modifyStat(['bullet','grow'], '+=0.25')
            }
        },
        extendo_grip: {
            name: 'Extendo Grip',
            desc: `
                <cg>+20</cg> Melee size<br>
                <cg>+3</cg> Melee damage<br>
                <cb>-10%</cb> Speed
            `,

            apply: () => {
                modifyStat(['melee','size'], '+=20')
                modifyStat(['melee','damage'], '+=3')
                modifyStat(['player','speed'], '*=0.9')
            }
        },
        explosive_vest: {
            name: 'Explosive Vest',
            desc: `
                Getting hit by an enemy has a <cg>+10%</cg> chance to create an explosion, dealing <cg>+100%</cg> of your damage.<br>
                <cb>-20%</cb> Speed<br>
                <em style="color: grey;">Explosion does not damage player.</em>
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['player','explosiveHitChance'], '+=10')
                modifyStat(['player','explosiveHitDamage'], '+=1')

                modifyStat(['player','speed'], '*=0.8')
            }
        },
        knuckleblaster: {
            name: 'Knuckleblaster',
            desc: `
                Meleeing an enemy creates an explosion.<br>
                <cg>+10</cg> Knuckleblaster explosion size<br>
                <cg>+5</cg> Melee knockback<br>
                <cb>+20%</cb> Melee cooldown
            `,
            priceMult: 0.75,
            unlockable: true,

            apply: () => {
                modifyStat(['melee','explosionPower'], '+=15')
                modifyStat(['melee','knockback'], '+=5')
                modifyStat(['melee','cooldown'], '*=1.2')
            }
        },
        reinforced_shield: {
            name: 'Reinforced Shield',
            desc: `
                <cg>+20</cg> Melee size<br>
                <cg>+5</cg> Melee damage<br>
                <cb>-20%</cb> Speed
                `,
                priceMult: 0.9,
                
                apply: () => {
                    modifyStat(['melee','size'], '+=20')
                    modifyStat(['melee','damage'], '+=5')
                    modifyStat(['player','speed'], '*=0.8')
                }
        },
        mysterious_mushroom: {
            name: 'Mysterious Mushroom',
            desc: `
                Multiplies two random base stats by <strong>1.1</strong><br>
                Multiplies one random base stat by <strong>0.75</strong>
            `,
    
            apply: () => {
                const stats = [
                    ['bullet','damage'],
                    ['bullet','speed'],
                    ['bullet','size'],
                    ['bullet','shotCooldown'],
                    ['bullet','range'],
                    ['player','maxHealth'],
                    ['ammo','reloadSpeed'],
                    ['ammo','max'],
                    ['melee','size'],
                    ['melee','damage']
                ]

                const statsChanges = [[],[]]

                for(let i = 0; i < 2; i++) {
                    const randomStat = stats[DeBread.randomNum(0,stats.length-1)]
                    modifyStat(randomStat,'*=1.1')
                    statsChanges[0].push(randomStat)
                }

                const randomStat = stats[DeBread.randomNum(0,stats.length-1)]
                modifyStat(randomStat,'*=0.75')
                statsChanges[1].push(randomStat)

                createNotification('Stats modified!',`Increased: ${statsChanges[0][0][0]}.${statsChanges[0][0][1]}, ${statsChanges[0][1][0]}.${statsChanges[0][1][1]}<br>Decreased: ${statsChanges[1][0][0]}.${statsChanges[1][0][1]}`)
            }
        },
        red_mushroom: {
            name: 'Red Mushroom',
            desc: `
                Multiplies a random damage stat by <cg>1.25</cg><br>
                Multiplies a random cooldown stat by <cb>1.25</cb><br>
            `,
            unlockable: true,
    
            apply: () => {
                const damageStats = [
                    ['bullet','damage'],
                    ['melee','damage'],
                ]
                const randomDamageStat = damageStats[DeBread.randomNum(0,damageStats.length-1)]
                modifyStat(randomDamageStat,'*=1.25')

                const cooldownStats = [
                    ['bullet','shotCooldown'],
                    ['ammo','reloadSpeed'],
                    ['melee','cooldown']
                ]
                const randomCooldownStat = cooldownStats[DeBread.randomNum(0,cooldownStats.length-1)]
                modifyStat(randomCooldownStat,'*=1.25')

                createNotification('Stats increased!',`${randomDamageStat[0]} ${randomDamageStat[1]}, ${randomCooldownStat[0]} ${randomCooldownStat[1]}`)
            }
        },
        blue_mushroom: {
            name: 'Blue Mushroom',
            desc: `
                Multiplies a random cooldown stat by <cg>0.75</cg><br>
                Multiplies a random damage stat by <cb>0.75</cb><br>
            `,
    
            apply: () => {
                const damageStats = [
                    ['bullet','damage'],
                    ['melee','damage'],
                ]
                const randomDamageStat = damageStats[DeBread.randomNum(0,damageStats.length-1)]
                modifyStat(randomDamageStat,'*=0.75')

                const cooldownStats = [
                    ['bullet','shotCooldown'],
                    ['ammo','reloadSpeed'],
                    ['melee','cooldown']
                ]
                const randomCooldownStat = cooldownStats[DeBread.randomNum(0,cooldownStats.length-1)]
                modifyStat(randomCooldownStat,'*=0.75')

                createNotification('Stats decreased!',`${randomDamageStat[0]} ${randomDamageStat[1]}, ${randomCooldownStat[0]} ${randomCooldownStat[1]}`)
            }
        },
        hamsa: {
            name: 'Hamsa',
            desc: `
                Grants homing to parried projectiles<br>
                <cg>+1</cg> Luck
            `,
    
            apply: () => {
                modifyStat(['player','parryHoming'],'+=1')
                modifyStat(['shop','luck'],'+=1')
            }
        },
        credit_card: {
            name: 'Credit Card',
            desc: `
                <cp>+$25</cp> interest cap
            `,

            priceMult: 1.1,
            apply: () => {
                modifyStat(['player','interestCap'],'+=25')
            },
        },
        hot_hands: {
            name: 'Hot Hands',
            desc: `
                Touching an enemy with your weapon deals <cg>+1</cg> damage every tick. 
            `,
            priceMult: 0.75,
    
            apply: () => {
                modifyStat(['player','weaponContactDamage'], '+=1')
            }
        },
    },
    {
        black_hole: {
            name: 'Black Hole',
            desc: `
                Condenses half the total damage in your magazine into one projectile.<br>
                <cb>-10%</cb> Reload speed<br>
                <cb>-50%</cb> Projectile speed<br>
                <cb>+50%</cb> Shot cooldown<br>
            `,
            priceMult: 1.25,

            apply: () => {
                modifyStat(['bullet','damage'], '=(player.stats.bullet.damage*player.stats.ammo.max)/2')
                modifyStat(['ammo','max'], '=1')
                modifyStat(['ammo','reloadSpeed'], '*=1.1')
                modifyStat(['bullet','speed'], '*=0.5')
                modifyStat(['bullet','shotCooldown'], '*=1.5')
            },

            requirement: () => {
                return player.stats.ammo.max < Infinity
            }
        },
        electric_ammo: {
            name: 'Electric Ammo',
            desc: `
                Hit player projectiles deal damage to <cg>+1</cg> other nearby enemies.<br>
                <em style="color: grey;">Arcs deal projectile damage / # of times arced.</em><br>
                <cg>+10</cg> Arc reach<br>
                <cb>-20%</cb> Reload speed<br>
            `,
            priceMult: 1.25,

            apply: () => {
                modifyStat(['bullet','electricChainLength'], '+=1')
                modifyStat(['bullet','electricChainReach'], '+=10')
                modifyStat(['ammo','reloadSpeed'], '*=1.2')
            }
        },
        ghost_ammo: {
            name: 'Ghost Ammo',
            desc: `
                Player projectiles can hit up to <cg>+25</cg> additional times when hitting an enemy.<br>
                <cb>-75%</cb> Damage<br>
                <cb>-50%</cb> Damage multiplier<br>
                <cb>-75%</cb> Knockback
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['bullet','drillTicks'], '+=25')
                modifyStat(['bullet','damage'], '*=0.25')
                modifyStat(['bullet','damageMult'],'*=0.5')
                modifyStat(['bullet','knockback'], '*=0.25')
            }
        },
        incendiary_ammo: {
            name: 'Incendiary Ammo',
            desc: `
                Player projectiles have a <cg>+5%</cg> chance to set enemies on fire
            `,
            priceMult: 1,

            apply: () => {
                modifyStat(['bullet','fireyAmmoChance'], '+=5')
            }
        },
        op_hourglass: {
            name: 'OP Hourglass',
            desc: `
                All passive abilities trigger twice as often.<br>
                <em style="color: grey;">Every 100 ticks... --> Every 50 ticks</em>
            `,
            priceMult: 0.6,

            apply: () => {
                modifyStat(['player','passiveAbilityMult'], '*=2')
            }
        },
        rigged_dice: {
            name: 'Rigged Dice',
            desc: `
                Player projectiles gain a random damage multiplier between 1 and 2(<cg>+1</cg>)
            `,
            
            apply: () => {
                modifyStat(['bullet','randDmgMult'], '+=1')
            }
        },
        broken_hourglass: {
            name: 'Broken Hourglass',
            desc: `
                Enemies become <cg>+10%</cg> slower.
            `,
            
            apply: () => {
                modifyStat(['enemy','speedMult'], '*=0.9')
            }
        },
        golden_mushroom: {
            name: 'Golden Mushroom',
            desc: `
                Multiplies a random base stat by <strong>10x</strong><br>
                Multiplies a random base stat by <strong>0.2x</strong>
            `,
            priceMult: 1.2,
            
            apply: () => {
                const stats = [
                    ['bullet','damage'],
                    ['bullet','speed'],
                    ['bullet','size'],
                    ['bullet','shotCooldown'],
                    ['bullet','range'],
                    ['player','maxHealth'],
                    ['ammo','reloadSpeed'],
                    ['ammo','max'],
                    ['melee','size'],
                    ['melee','damage']
                ]

                modifyStat(stats[DeBread.randomNum(0,stats.length-1)],'*=10')
                modifyStat(stats[DeBread.randomNum(0,stats.length-1)],'*=0.2')
            }
        },
        explosive_ammo: {
            name: 'Explosive Ammo',
            desc: `
            Player projectiles explode when colliding with a wall or enemy.<br>
            <cg>+10</cg> Projectile explosion size <br>
            <cg>+5</cg> Damage<br>
            <em style="color: grey;">Explosions can damage player.</em>
            `,
            priceMult: 0.6,
            
            apply: () => {
                if(player.stats.bullet.explosionSize === 0) {
                    modifyStat(['bullet','explosionSize'], '+=110')
                } else {
                    modifyStat(['bullet','explosionSize'], '+=10')
                }
                modifyStat(['bullet','damage'], '+=5')
            }
        },
        golden_ammo: {
            name: 'Golden Ammo',
            desc: `
                Hitting an enemy with a projectile gains a <cg>+1%</cg> chance to spawn a random coin
            `,
            priceMult: 1.5,
            unlockable: true,

            apply: () => {
                modifyStat(['bullet','coinChance'], '+=1')
            }
        },
        radioactive_ammo: {
            name: 'Radioactive Ammo',
            desc: `
                Player projectiles gain a damaging aura, dealing up to <cg>+150%</cg> of your damage every 10 ticks<br>
                <cg>+10</cg> Radiation size
            `,
            priceMult: 1.75,

            apply: () => {
                if(player.stats.bullet.radiationSize === 0) {
                    modifyStat(['bullet','radiationSize'], '+=75')
                } else {
                    modifyStat(['bullet','radiationSize'], '+=10')
                }
            }
        },
        sharp_ammo: {
            name: 'Sharp Ammo',
            desc: `
                Player projectiles gain a <cg>+2</cg>% chance to apply bleeding to enemies and deal <cg>1.5x</cg> damage.
            `,
            priceMult: 2,
    
            apply: () => {
                modifyStat(['bullet','sharpChance'], '+=2')
            }
        },
        multishot: {
            name: 'Multi-shot',
            desc: `
                Shoot <cg>+1</cg> more projectiles at a time.
            `,
            priceMult: 1.1,
    
            apply: () => {
                modifyStat(['bullet','multishot'], '+=1')
            }
        },
        third_eye: {
            name: 'Third Eye',
            desc: `
                Every 50 ticks, <cg>+1</cg> projectiles automatically shoot towards the nearest enemy.<br>
                <em style="color: grey;">Does not consume ammo.</em>
            `,
            priceMult: 1.25,

            apply: () => {
                modifyStat(['player','thirdEye'], '+=1')
            }
        },
        shrapnel: {
            name: 'Shrapnel',
            desc: `
                Hitting an enemy with a parried projectile creates <cg>+3</cg> projectiles that mimic player projectile attributes with <cb>50%</cb> less damage.
            `,
            priceMult: 1.5,

            apply: () => {
                modifyStat(['player','parryShrapnel'], '+=3')
            }
        },
        overstock: {
            name: 'Overstock',
            desc: `
                Gain <cg>+1</cg> free shop reroll.
            `,
            priceMult: 2,
    
            apply: () => {
                modifyStat(['shop','rerolls'], '+=1')
            }
        },
        car_battery: {
            name: 'Car Battery',
            desc: `
                Power items have a <cg>+1%</cg> chance to repeat its ability. 
            `,
            priceMult: 2,
    
            apply: () => {
                modifyStat(['player','powerItemRepeatChance'], '+=1')
            }
        },
        cannon_ball: {
            name: 'Cannon Ball',
            desc: `
                <cg>+15</cg> Damage<br>
                <cg>+5</cg> Projectile size<br>
                <cb>+20</cb> Projectile inaccuracy<br>
                <cb>-20%</cb> Projectile speed<br>
                <cb>+25%</cb> Shot cooldown 
            `,
            priceMult: 2,
    
            apply: () => {
                modifyStat(['bullet','damage'], '+=15')
                modifyStat(['bullet','size'], '+=5')
                modifyStat(['bullet','accuracy'], '+=20')
                modifyStat(['bullet','speed'], '*=0.8')
                modifyStat(['bullet','shotCooldown'], '*=1.25')
            }
        },
        bankruptcy_form: {
            name: 'Bankruptcy Form',
            desc: `
                <cg>-75%</cg> Shop reroll price 
            `,
            priceMult: 5,
    
            apply: () => {
                modifyStat(['shop','rerollPrice'], '*=0.25')
            }
        },
    },
    {
        bottomless_mag: {
            name: 'Bottomless Mag',
            desc: `
            <cg>+50</cg> Max ammo
            `,
            
            apply: () => {
                modifyStat(['ammo','max'], '+=50')
            }
        },
        super_mushroom: {
            name: 'Super Mushroom',
            desc: `
                <cg>+5</cg> Damage<br>
                <cg>+1</cg> Bullet speed<br>
                <cg>+25%</cg> Reload speed<br>
                <cg>-50%</cg> Shot cooldown<br>
                <cg>+100%</cg> HP<br>
                <cg>+100</cg> Max HP<br>
            `,
    
            apply: () => {
                modifyStat(['bullet','damage'], '+=5')
                modifyStat(['bullet','speed'], '+=1')
                modifyStat(['ammo','reloadSpeed'], '*=0.75')
                modifyStat(['bullet','shotCooldown'], '*=0.5')
                player.health = player.stats.player.maxHealth
                modifyStat(['player','maxHealth'], '+=100')
            }
        },
        cluster_ammo: {
            name: 'Cluster Ammo',
            desc: `
                Bullets split into <cg>+3</cg> when hitting a wall or enemy.<br> <em style="color: grey;">Split bullets deal half damage.</em>
            `,
            priceMult: 1.5,

            apply: () => {
                modifyStat(['bullet','split'], '+=3')
                if(player.stats.bullet.splits === 0) {
                    modifyStat(['bullet','splits'], '+=1')
                }
            }
        },
        jumper_cables: {
            name: 'Jumper Cables',
            desc: `
                Using a power item retriggers its effect <cg>+1</cg> more times.
            `,
            priceMult: 2,

            apply: () => {
                modifyStat(['player','powerItemRepeats'],'+=1')
            }
        },
        backpack: {
            name: 'Backpack',
            desc: `
                Allows the player to carry <cg>2</cg> power items.<br>
                <br>
                <em>You can switch power items by pressing <strong>E</strong></em>
            `,
            priceMult: 1.5,

            apply: () => {
                if(!player.powerItem) {
                    player.powerItem = powerItems[5].empty
                }
                modifyStat(['player','canCarrySecondaryPowerItem'],'=true')
            },

            requirement: () => {
                return !player.stats.player.canCarrySecondaryPowerItem && Boolean(player.powerItem)
            }
        },
        chicken_alfredo: {
            name: 'Chicken Alfredo',
            desc: `
                <cg>2x</cg> Max HP<br>
                <cg>+100%</cg> HP<br>
                <em style="color: grey;">only the best!</em>
            `,
            priceMult: 0.9,

            apply: () => {
                modifyStat(['player','maxHealth'],'*=2')
                player.health = player.stats.player.maxHealth
            }
        },
        debread_sale: {
            name: 'debread.space Sale',
            desc: `
                Sets shop reroll price to <cp>$5</cp><br>
                All shop items become <cg>50%</cg> cheaper.
            `,
            priceMult: 2,

            apply: () => {
                modifyStat(['shop','rerollPrice'],'=5')
                modifyStat(['shop','priceMult'],'*=0.5')
            }
        },
        the_tophat: {
            name: 'The Tophat',
            desc: `
                All damage taken becomes reduced by <cg>+50</cg>%<br>
                <em style="color: grey;">gone but not forgotten</em>
            `,
    
            apply: () => {
                modifyStat(['player','armor'], '+=1')
            }
        },
        raccoon_tail: {
            name: 'Raccoon Tail',
            desc: `
                Hitting an enemy with a projectile has a <cg>+25%</cg> chance to apply bleeding and deal 1.5x damage<br>
                <cg>+7</cg> Damage<br>
                <cg>+1</cg> Bullet speed<br>
                <cg>+2</cg> Luck
            `,
            unlockable: true,
            
            apply: () => {
                modifyStat(['bullet','sharpChance'], '=25')
                modifyStat(['bullet','damage'], '+=7')
                modifyStat(['bullet','speed'], '+=1')
                modifyStat(['shop','luck'], '+=2')
            }
        },
        beret: {
            name: 'Beret',
            desc: `
                Explosives no longer deal damage to the player, but instead heal up to <cg>+5</cg> HP<br>
                <em style="color: grey;">I HATE YOU I HATE YOU I HATE YOU</em>
            `,
            unlockable: true,
            
            apply: () => {
                modifyStat(['player','explosiveHeal'], '+=5')
            }
        },
        used_needle: {
            name: 'Used Needle',
            desc: `
                Enables autofire<br>
                <cg>+20</cg> Max ammo<br>
                <cg>-50%</cg> Shot cooldown<br>
                <cb>-75%</cb> Damage
            `,
            unlockable: true,
            
            apply: () => {
                modifyStat(['ammo','autoFire'], '=true')
                modifyStat(['ammo','max'], '+=20')
                modifyStat(['bullet','shotCooldown'],'*=0.5')
                modifyStat(['bullet','damage'], '*=0.25')
            }
        },
        old_laptop: {
            name: 'Old Laptop',
            desc: `
                Randomizes all bullet and melee values between <strong>0.1x</strong> and <strong>10x</strong>
            `,
            priceMult: 0.75,
            unlockable: true,
            
            apply: () => {
                for(const statCat in {bullet:{},melee:{}}) {
                    for(const key in player.stats[statCat]) {
                        if(typeof player.stats[statCat][key] === 'number' && !['multishot','speedDiv'].includes(key)) {
                            // player.stats[statCat][key] *= Math.pow(10,DeBread.randomNum(-1,1,5))
                            modifyStat([statCat,key],`*=Math.pow(10,DeBread.randomNum(-1,1,5))`)
                        }
                    }
                }
                player.stats.bullet.multishot = DeBread.round(player.stats.bullet.multishot)
            }
        },
        soap: {
            name: 'Soap',
            desc: `
                Enables charging rounds, dealing up to <cg>x10</cg> damage.
            `,
            unlockable: true,
            
            apply: () => {
                modifyStat(['ammo','chargeShot'], '=true')
                modifyStat(['ammo','chargeMultCap'], '+=10')

                if(player.stats.ammo.chargeTime === 0) {
                    modifyStat(['ammo','chargeTime'], '=100')
                } else {
                    modifyStat(['ammo','chargeTime'], '*=0.75')
                }
            }
        },
        black_feather: {
            name: 'Black Feather',
            desc: `
                Every time a bullet hits an enemy, its damage gets multiplied by <cg>1.1</cg> (+<cg>0.1</cg>)
            `,
            priceMult: 1.5,
            unlockable: true,

            apply: () => {
                modifyStat(['bullet','hitDamageMult'],'+=0.1')
            }
        },
        drool: {
            name: 'Drool',
            desc: `
                The player leaves a trail of poison fields, which mimic player projectile attributes.
            `,
            priceMult: 2,
            unlockable: true,

            apply: () => {
                if(player.stats.player.droolSize === 0) {
                    modifyStat(['player','droolSize'],'=25')
                } else {
                    modifyStat(['player','droolSize'],'+=10')
                }
            }
        },
    },
    {
        sog: {
            name: 'Sog',
            desc: `
                <cg>+sog</cg>
            `,

            apply: () => {
            
                doge('area').querySelectorAll('div').forEach(elem => {
                    elem.style.backgroundImage = 'url(graphics/sog.png)'
                    elem.style.backgroundSize = 'cover'
                })
            }
        },
        poop_upgrade: {
            name: 'Poop Upgrade',
            desc: `
                Dont use this<br>
                <em style="color: grey; font-size: 0.75em;">By plinkel</em>
                `,

            apply: () => {
                window.alert('you did this.')
                let repeats = 0
                setInterval(() => {
                    for(let i = 0; i < repeats; i++) {
                        createExplosion([DeBread.randomNum(0,doge('area').offsetWidth),DeBread.randomNum(0,doge('area').offsetHeight)], DeBread.randomNum(100,250)+repeats, 5, 100)
                    }

                    spawnEnemy([0,0],minibosses.plonk,10000,0)

                    repeats++
                }, 100)

                setTimeout(() => {
                    openPrompt('poop upgrade warning', 'You softlocked your game, refreshing in 5 seconds...', {})
                    setTimeout(() => {
                        window.location.reload()
                    }, 5000);
                }, 10000);
            }
        },
        nuke: {
            name: 'Nuke',
            desc: `
                Creates a giant explosion, dealing <cg>10,000</cg> damage.
            `,

            apply: () => {
                createExplosion([doge('area').offsetWidth / 2, doge('area').offsetHeight / 2], doge('area').offsetWidth, 10000, 250, true)
            }
        },
        dummy_nuke: {
            name: 'Dummy Nuke',
            desc: `
                Creates a giant explosion, dealing <strong>0</strong> damage.
            `,

            apply: () => {
                createExplosion([doge('area').offsetWidth / 2, doge('area').offsetHeight / 2], doge('area').offsetWidth, 0, 250, true)
            }
        },
    },
    {
        error: {
            name: () => {
                let name = ''

                for(let i = 0; i < DeBread.randomNum(3,7); i++) {
                    const randomRarity = DeBread.randomNum(0,upgrades.length-2)
                    const randomUpgrade = Object.keys(upgrades[randomRarity])[DeBread.randomNum(0,Object.keys(upgrades[randomRarity]).length-1)]
                    const randomDesc = upgrades[randomRarity][randomUpgrade].name

                    name += randomDesc.substr(DeBread.randomNum(0,5),DeBread.randomNum(5,10))
                }

                return name 
            },
            animatedTexture: true,
            desc: () => {
                let desc = ''

                for(let i = 0; i < DeBread.randomNum(5,15); i++) {
                    const randomRarity = DeBread.randomNum(0,upgrades.length-2)
                    const randomUpgrade = Object.keys(upgrades[randomRarity])[DeBread.randomNum(0,Object.keys(upgrades[randomRarity]).length-1)]
                    const randomDesc = upgrades[randomRarity][randomUpgrade].desc

                    desc += randomDesc.substr(DeBread.randomNum(0,5),DeBread.randomNum(10,50))
                }

                return desc
            },

            apply: () => {
                let upgradesGot = ''
                for(let i = 0; i < DeBread.randomNum(2,5); i++) {
                    const randomRarity = DeBread.randomNum(0,upgrades.length-4)
                    const randomUpgrade = Object.keys(upgrades[randomRarity])[DeBread.randomNum(0,Object.keys(upgrades[randomRarity]).length-1)]

                    upgrades[randomRarity][randomUpgrade].apply()
                    upgradesGot += `<div style="display: flex; gap: 5px; align-items: center;"><img src="graphics/upgrades/${randomUpgrade}.png" style="width: 16px; height: 16px;">${upgrades[randomRarity][randomUpgrade].name}</div>`

                }
                createNotification('Upgrades Got!',upgradesGot)

            }
        }
    }
]

const consumables = [
    { //Common
        medicine: {
            name: 'Medicine',
            desc: 'Heals +25HP',
            use: () => {
                player.damage(-25)
            }
        },
        adrenaline: {
            name: 'Adrenaline',
            desc: 'Gives strength I for 15 seconds.',
            use: () => {
                modifyStat(['bullet','damage'], '*=1.5')
                player.statusEffects.push({
                    end: () => {
                        modifyStat(['bullet','damage'], '/=2')
                    },
                    class: 'damage',
                    duration: (1000 / e.gameUpdateInterval) * 15,
                    maxDuration: (1000 / e.gameUpdateInterval) * 15
                })
            }
        },
        magezine: {
            name: 'Magezine',
            desc: 'Instantly reload ammo.',
            use: () => {
                player.stats.ammo.current = player.stats.ammo.max
            }
        },
        blunt: {
            name: 'Blunt',
            desc: 'Halves enemy speed for 30 seconds.',
            use: () => {
                modifyStat(['enemy','speedMult'], '/=2')
                player.statusEffects.push({
                    end: () => {
                        modifyStat(['enemy','speedMult'], '*=2')
                        player.damage(10)
                    },
                    class: 'blunt',
                    duration: (1000 / e.gameUpdateInterval) * 30,
                    maxDuration: (1000 / e.gameUpdateInterval) * 30
                })
            }
        },
    },
    { //Uncommon

    },
    { //Rare

    }, 
    { //Legendary
        heroin: {
            name: 'Heroin',
            desc: `
                <em style="color:grey;">For 5 seconds:</em><br>
                <cg>x10</cg> Damage<br>
                <cg>x2</cg> Speed<br>
                After the 5 seconds, take <cb>75</cb> damage.
            `,
            use: () => {
                modifyStat(['bullet','damage'], '*=10')
                modifyStat(['player','speed'], '*=2')
                player.statusEffects.push({
                    end: () => {
                        modifyStat(['bullet','damage'], '/=10')
                        modifyStat(['player','speed'], '*=2')
                        player.damage(75)
                    },
                    class: 'damage',
                    duration: (1000 / e.gameUpdateInterval) * 5,
                    maxDuration: (1000 / e.gameUpdateInterval) * 5
                })
            }
        },
    }
]

const powerItems = [
    {
        apple: {
            name: 'Apple',
            desc: `
                Uses <cp>25</cp> POWER<br>
                <cg>+25</cg> HP
                `,
            charge: 25,

            use: () => {
                player.damage(-25)
            }
        },
        mater: {
            name: 'Mater',
            desc: `
                Uses <cp>25</cp> POWER<br>
                Throws a tomato at your cursor, spawning a poison field that deals <cg>250%</cg> of your damage for 10 ticks.
                `,
            charge: 25,

            use: () => {
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
                    
                    createPoisonField([mater.pos[0], mater.pos[1] - 10], 75, player.stats.bullet.damage * 2.5, 10, 10, elems.enemies, [255,50,50])
                    createParticles(mater.pos, 10, 10, [0,50],500,'ease-out',{backgroundColor: 'red'})
    
                    DeBread.playSound('audio/splat.mp3')
                }, 1000);
            }
        },
        blunt: {
            name: 'Blunt',
            desc: `
                Uses <cp>50</cp> POWER<br>
                Halves the speed of enemies for 30 seconds, then take <cb>10</cb> damage.
                `,
            charge: 50,

            use: () => {
                modifyStat(['enemy','speedMult'], '/=2')
                createParticles([...player.centerPos], 50, player.stats.player.size, [0, 250], 7500, 'ease-out', {backgroundColor: 'rgba(150,175,150,0.1)', filter: 'blur(10px)'})
                player.statusEffects.push({
                    end: () => {
                        modifyStat(['enemy','speedMult'], '*=2')
                        player.damage(10)
                    },
                    class: 'blunt',
                    duration: (1000 / e.gameUpdateInterval) * 30,
                    maxDuration: (1000 / e.gameUpdateInterval) * 30
                })
            }
        },
        extra_mag: {
            name: 'Extra Mag',
            desc: `
                Uses <cp>20</cp> POWER<br>
                Immediately reloads your weapon.
                `,
            charge: 20,

            use: () => {
                player.stats.ammo.current = player.stats.ammo.max
                DeBread.playSound('audio/reload-long-end.mp3')
                updateUI()
            }
        },
        pocket_change: {
            name: 'Pocket Change',
            desc: `
                Uses <cp>5</cp> POWER<br>
                Spawns one random coin<br>
                Has a <cg>5%</cg> chance to spawn a battery instead
                `,
            charge: 5,

            use: () => {
                if(DeBread.randomNum(1,20) === 1) {
                    pickups.battery([...player.centerPos],5)
                } else {
                    pickups.coin(getWeightedChance([500,100,20,4,1]),[...player.centerPos],5,1)
                }
            }
        },
    },
    {
        pepper: {
            name: 'Pepper',
            desc: `
                Uses <cp>75</cp> POWER<br>
                <em style="color:grey;">For 10 seconds:</em><br>
                <cg>+5</cg> Speed<br>
                <cg>+5</cg> Contact damage
            `,
            charge: 75,

            use: () => {
                modifyStat(['player','speed'], '+=5')
                modifyStat(['player','contactDamage'], '+=5')
                player.statusEffects.push({
                    end: () => {
                        modifyStat(['player','speed'], '-=5')
                        modifyStat(['player','contactDamage'], '-=5')

                    },
                    class: 'pepper',
                    duration: (1000 / e.gameUpdateInterval) * 10,
                    maxDuration: (1000 / e.gameUpdateInterval) * 10
                })
            }
        },
        poker_chip: {
            name: 'Poker Chip',
            desc: `
                Uses <cp>50</cp> POWER<br>
                Gain <cg>+0.5</cg> Luck<br>
            `,
            charge: 50,

            use: () => {
                modifyStat(['shop','luck'], '+=0.5')
            }
        },
        tennis_ball: {
            name: 'Tennis Ball',
            desc: `
                Uses <cp>15</cp> POWER<br>
                
                <em style="color: grey;">If there is no Tennis Ball:</em><br>
                Throws a tennis ball that bounces around the area, dealing, <cg>15</cg> contact damage.
                (Tennis ball disappears after 250 ticks)
                <br>
                <em style="color: grey;">If Tennis Ball is active:</em><br>
                Dash towards the Tennis Ball, temporarily gaining <cg>+10</cg> contact damage and immunity. 
            `,
            charge: 15,

            use: () => {
                if(doge('area').querySelectorAll('.tennisBall').length === 0) {
                    const ball = document.createElement('div')
                    ball.classList.add('entity')
                    ball.classList.add('physObj')
                    ball.classList.add('tennisBall')
                    ball.pos = [...player.centerPos]
                    ball.angle = Math.atan2(e.relCursorPos[1] - ball.pos[1], e.relCursorPos[0] - ball.pos[0])
                    ball.speed = 15
                    ball.size = 16
                    ball.traction = 1.01
                    ball.roll = 0
                    ball.ticksActive = 0
                    ball.dirVels = []
                    addStyles(ball, {
                        position: 'absolute',
                        width: '16px',
                        height: '16px',
                        left: ball.pos[0]+'px',
                        top: ball.pos[1]+'px',
                        translate: '-50% -50%',
                        backgroundImage: 'url(graphics/tennisball.png)',
                        backgroundSize: '96px 16px'
                    })

                    
                    doge('area').append(ball)
                    
                    ball.tick = () => {
                        ball.pos[0] += Math.cos(ball.angle) * ball.speed
                        ball.pos[1] += Math.sin(ball.angle) * ball.speed
                        ball.speed /= ball.traction

                        for(let i = 0; i < ball.dirVels.length; i++) {
                            const dirVel = ball.dirVels[i]
                            ball.pos[0] += Math.cos(dirVel.angle) * dirVel.speed
                            ball.pos[1] += Math.sin(dirVel.angle) * dirVel.speed
        
                            dirVel.speed /= dirVel.div
                            if(dirVel.speed <= 0.1) {
                                ball.dirVels.splice(i, 1)
                            }
                        }

                        if(ball.pos[0] >= doge('area').offsetWidth) ball.pos[0] = doge('area').offsetWidth
                        if(ball.pos[0] <= 0) ball.pos[0] = 0
                        if(ball.pos[1] >= doge('area').offsetHeight) ball.pos[1] = doge('area').offsetHeight
                        if(ball.pos[1] <= 0) ball.pos[1] = 0

                        //These below should also flip all dirVel angles
                        if(ball.pos[0] >= doge('area').offsetWidth || ball.pos[0] <= 0) {
                            ball.angle = Math.PI - ball.angle

                            for(let i = 0; i < ball.dirVels.length; i++) {
                                const dirVel = ball.dirVels[i]
                                dirVel.angle = Math.PI - ball.angle
                            }
                        }

                        if(ball.pos[1] >= doge('area').offsetHeight || ball.pos[1] <= 0) {
                            ball.angle = -ball.angle

                            for(let i = 0; i < ball.dirVels.length; i++) {
                                const dirVel = ball.dirVels[i]
                                dirVel.angle = -dirVel.angle
                            }
                        }

                        elems.enemies.forEach(enemy => {
                            if(isColliding(enemy, ball)) {
                                enemy.data.damage(10)
                            }
                        })

                        ball.roll += ball.speed / 30

                        addStyles(ball, {
                            left: ball.pos[0]+'px',
                            top: ball.pos[1]+'px',
                            rotate: ball.angle+'rad',
                            backgroundPosition: `${Math.round(ball.roll) * 16}px 0px`
                        })

                        ball.ticksActive++

                        if(ball.ticksActive > 250) {
                            ball.destroy()
                        }
                    }

                    ball.destroy = () => {
                        createParticles([...ball.pos], 5, 16, [0, 16], 250, 'ease-out',{backgroundColor: '#72b570'})
                        ball.remove()
                    }
                } else {
                    const ball = document.querySelector('.tennisBall')
                    const angle = Math.atan2(ball.pos[1] - player.centerPos[1], ball.pos[0] - player.centerPos[0])
                    player.dirVels.push({
                        angle: angle,
                        speed: 50,
                        div: 1.1
                    })

                    modifyStat(['player','contactDamage'], '+=15')
                    player.immune++
                    player.statusEffects.push({
                        end: () => {
                            modifyStat(['player','contactDamage'], '-=15')
                            player.immune--
                        },
                        class: 'dash',
                        duration: (1000 / e.gameUpdateInterval) * 0.75,
                        maxDuration: (1000 / e.gameUpdateInterval) * 0.75
                    })

                    ball.destroy()
                }
            }
        },
    },
    {
        coin: {
            name: 'Coin',
            desc: `
                Uses <cp>25</cp> POWER and <cp>$1</cp><br>
                Throws a coin in the air. Shooting a coin redirects the bullet towards the nearest coin or enemy, dealing <cg>3x</cg> damage
            `,
            charge: 25,
            requirement: () => {return player.money > 0},

            use: () => {
                player.getMoney(-1)

                const coin = document.createElement('div')
                coin.classList.add('entity')
                coin.classList.add('thrownCoin')
                coin.pos = [...player.centerPos]
                coin.angle = Math.atan2(e.relCursorPos[1] - coin.pos[1], e.relCursorPos[0] - coin.pos[0])
                coin.speed = 10
                coin.grav = -5
                addStyles(coin, {
                    width: '50px',
                    height: '50px',
                    // outline: '1px solid red',
                    position: 'absolute',
                    left: coin.pos[0]+'px',
                    top: coin.pos[1]+'px',
                    translate: '-50% -50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 5,
                })
                coin.innerHTML = '<img src="graphics/throwableCoin.gif" width=16>'

                coin.tick = () => {
                    const texture = coin.querySelector('img')

                    coin.movementAngle = Math.atan2(
                        coin.pos[1] - (coin.pos[1] + Math.sin(coin.angle) * coin.speed + coin.grav),
                        coin.pos[0] - (coin.pos[0] + Math.cos(coin.angle) * coin.speed)
                    )

                    texture.style.rotate = coin.movementAngle + 'rad'

                    coin.pos[0] += Math.cos(coin.angle) * coin.speed 
                    coin.pos[1] += Math.sin(coin.angle) * coin.speed + coin.grav
                    coin.speed /= 1.05
                    coin.grav += 0.25

                    if(e.gameUpdates % 2 === 0) {
                        createParticles([...coin.pos], 1, 8, [0, 5], 250, 'ease-out', {backgroundColor: 'yellow', zIndex: 4})
                    }

                    addStyles(coin, {
                        left: coin.pos[0]+'px',
                        top: coin.pos[1]+'px'
                    })

                    doge('area').querySelectorAll('.projectile').forEach(bullet => {
                        if(isColliding(coin, bullet)) {
                            let othercoins = 0
                            doge('area').querySelectorAll('.thrownCoin').forEach(otherCoin => {
                                if(coin !== otherCoin) othercoins++
                            })
                            if(othercoins > 0) {
                                const closestCoin = {elem: undefined, distance: Infinity}

                                doge('area').querySelectorAll('.thrownCoin').forEach(otherCoin => {
                                    if(coin !== otherCoin) {
                                        const dis = Math.sqrt(
                                            Math.pow(coin.pos[0] - otherCoin.pos[0],2) +
                                            Math.pow(coin.pos[1] - otherCoin.pos[1],2)
                                        )

                                        if(dis < closestCoin.distance) {
                                            closestCoin.distance = dis
                                            closestCoin.elem = otherCoin
                                        }
                                    }
                                })

                                bullet.angle = Math.atan2(
                                    bullet.pos[1] - closestCoin.elem.pos[1],
                                    bullet.pos[0] - closestCoin.elem.pos[0]
                                )

                                bullet.style.rotate = bullet.angle + 'rad'
                            } else {                                
                                const enemy = getClosest(bullet, '.enemy').elem
                                
                                bullet.pos = [...coin.pos]
                                if(enemy) {
                                    bullet.angle = Math.atan2(
                                        bullet.pos[1] - enemy.data.centerPos[1],
                                        bullet.pos[0] - enemy.data.centerPos[0]
                                    )
                                    bullet.style.rotate = bullet.angle + 'rad'
                                } else {
                                    bullet.angle = DeBread.randomNum(0,Math.PI*2,5)
                                }
                            }

                            bullet.damage *= 3
                            bullet.speed = 25
                            getStyle(styles.ricoshot)

                            const flashEffect = document.createElement('div')
                            addStyles(flashEffect, {
                                position: 'absolute',
                                translate: '-50% -50%',
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'red',
                                left: coin.pos[0]+'px',
                                top: coin.pos[1]+'px',  
                                borderRadius: '50%',
                                backgroundColor: 'yellow',
                                animation: 'coinHitEffect 250ms ease-out 1 forwards'
                            })

                            doge('area').append(flashEffect)

                            setTimeout(() => {
                                flashEffect.remove()
                            }, 250)

                            coin.remove()
                        }
                    })
                    if(coin.pos[1] > doge('area').offsetHeight ||
                        coin.pos[0] < 0 ||
                        coin.pos[0] > doge('area').offsetWidth
                    ) {
                        coin.remove()
                    }
                }

                doge('area').append(coin)

            }
        },
        beer_bottle: {
            name: 'Beer Bottle',
            desc: `
                Uses <cp>15</cp> POWER<br>
                Throws a beer bottle towards your cursor, dealing <cg>200%</cg> of your damage on impact and applies bleeding to enemies.
            `,
            charge: 15,

            use: () => {
                const bottle = document.createElement('div')
                bottle.classList.add('entity')
                bottle.pos = [...player.centerPos]
                bottle.angle = Math.atan2(e.relCursorPos[1] - bottle.pos[1], e.relCursorPos[0] - bottle.pos[0])
                bottle.speed = 10
                bottle.grav = -5
                bottle.rot = 0
                addStyles(bottle, {
                    position: 'absolute',
                    left: bottle.pos[0]+'px',
                    top: bottle.pos[1]+'px',
                    width: '25px',
                    height: '25px',
                    translate: '-50% -50%',
                    backgroundImage: 'url(graphics/bottle.png)',
                    backgroundSize: '16px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                })

                bottle.tick = (enemies) => {
                    bottle.rot += 10
                    bottle.pos[0] += Math.cos(bottle.angle) * bottle.speed
                    bottle.pos[1] += Math.sin(bottle.angle) * bottle.speed + bottle.grav
                    
                    bottle.grav += 0.5

                    addStyles(bottle, {
                        left: bottle.pos[0]+'px',
                        top: bottle.pos[1]+'px',
                        rotate: bottle.rot+'deg'
                    })

                    bottle.destroy = () => {
                        createParticles([...bottle.pos], 5, 10, [25,50], 250, 'ease-out',{backgroundColor: 'white'})
                        DeBread.playSound('audio/glass.mp3',DeBread.randomNum(0.9,1.1,10))
                        bottle.remove()
                    }

                    if(bottle.pos[1] > doge('area').offsetHeight ||
                        bottle.pos[0] < 0 ||
                        bottle.pos[0] > doge('area').offsetWidth
                    ) {
                        bottle.destroy()
                    }

                    enemies.forEach(enemy => {
                        if(isColliding(bottle, enemy) && enemy.data.active) {
                            enemy.data.damage(player.stats.bullet.damage * 2)
                            enemy.data.isBleeding = true
                            bottle.destroy()
                        }
                    })
                }

                doge('area').append(bottle)
            }
        },
        dash: {
            name: 'Dash',
            desc: `
                Uses <cp>30</cp> POWER<br>
                <em style="color: grey;">During this dash:</em><br>
                Dashes towards your cursor.<br>
                <cg>+10</cg> Contact damage<br>
                Immunity
            `,
            charge: 30,

            use: () => {
                const angle = Math.atan2(e.relCursorPos[1] - player.centerPos[1], e.relCursorPos[0] - player.centerPos[0])

                modifyStat(['player','contactDamage'], '+=10')
                player.immune = true
                player.statusEffects.push({
                    end: () => {
                        modifyStat(['player','contactDamage'], '-=10')
                        player.immune = false
                    },
                    class: 'dash',
                    duration: (1000 / e.gameUpdateInterval) * 0.75,
                    maxDuration: (1000 / e.gameUpdateInterval) * 0.75
                })

                player.dirVels.push({angle: angle, speed: 25, div: 1.1})
            }
        },
        impulse_grenade: {
            name: 'Impulse Grenade',
            desc: `
                Uses <cp>25</cp> POWER<br>
                Creates a shockwave that pushes back enemies
            `,
            charge: 25,

            use: () => {
                createExplosion([...player.centerPos], 250, 0, 100, true, [[0,50],[155,255],[255,255],0.5])
            }
        },
        lucky_penny: {
            name: 'Lucky Penny',
            desc: `
                Uses <cp>15</cp> POWER<br>
                Has a 50% chance to double every pickup in the area, otherwise, it removes all pickups.
            `,
            charge: 15,

            use: () => {
                let chance = DeBread.randomNum(0,1)
                for(const key in elems.pickups) {
                    const pickup = elems.pickups[key]
                    if(chance) { //Dupe
                        createPickup(
                            [
                                pickup.data.pos[0]+DeBread.randomNum(-1,1,10),
                                pickup.data.pos[1]+DeBread.randomNum(-1,1,10)
                            ],
                            pickup.data
                        )
                    } else {
                        pickup.destroy(true)
                    }
                }
            }
        },
        blue_sharpie: {
            name: 'Blue Sharpie',
            desc: `
                Uses <cp>25</cp> POWER<br>
                Throws a blue sharpie towards your cursor.<br>
                The sharpie spawns several poison fields dealing <cg>100%</cg> of your damage for 10 ticks.
            `,
            charge: 25,

            use: () => {
                const bottle = document.createElement('div')
                bottle.classList.add('entity')
                bottle.pos = [...player.centerPos]
                bottle.angle = Math.atan2(e.relCursorPos[1] - bottle.pos[1], e.relCursorPos[0] - bottle.pos[0])
                bottle.speed = 10
                bottle.grav = -5
                bottle.rot = 0
                addStyles(bottle, {
                    position: 'absolute',
                    left: bottle.pos[0]+'px',
                    top: bottle.pos[1]+'px',
                    width: '25px',
                    height: '25px',
                    translate: '-50% -50%',
                    backgroundImage: 'url(graphics/sharpie.png)',
                    backgroundSize: '16px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                })

                bottle.tick = (enemies) => {
                    bottle.rot += 10
                    bottle.pos[0] += Math.cos(bottle.angle) * bottle.speed
                    bottle.pos[1] += Math.sin(bottle.angle) * bottle.speed + bottle.grav
                    
                    bottle.grav += 0.5

                    addStyles(bottle, {
                        left: bottle.pos[0]+'px',
                        top: bottle.pos[1]+'px',
                        rotate: bottle.rot+'deg'
                    })

                    bottle.destroy = () => {
                        createParticles([...bottle.pos], 5, 10, [25,50], 250, 'ease-out',{backgroundColor: 'white'})
                        createPoisonField([...bottle.pos], 100, player.stats.bullet.damage, 10, 20, elems.enemies, [0,0,255])

                        for(let i = 0; i < 10; i++) {
                            const projData = {
                                speedDiv: 1.1,
                                speed: 10,
                                damage: player.stats.bullet.damage,
                                size: 0,
                                range: 25,
                                damageInterval: 250,

                                poisonFieldSize: 50,
                                poisonFieldTicks: 5,
                                poisonFieldColor: [0,0,255],
                                poisonFieldChance: 100,
                                poisonFieldDmgPercent: 100,
                            }
                            createProjectile(1,[...bottle.pos],(Math.PI * 2 / 10) * i + DeBread.randomNum(-0.25,0.25,10), projData, elems.enemies, player.elem)
                        }

                        bottle.remove()
                    }

                    if(bottle.pos[1] > doge('area').offsetHeight ||
                        bottle.pos[0] < 0 ||
                        bottle.pos[0] > doge('area').offsetWidth
                    ) {
                        bottle.destroy()
                    }

                    enemies.forEach(enemy => {
                        if(isColliding(bottle, enemy) && enemy.data.active) {
                            bottle.destroy()
                        }
                    })
                }

                doge('area').append(bottle)
            }
        },
        // perfume: {
        //     name: 'Perfume',
        //     desc: `
        //         Uses <cp>75</cp> POWER<br>
        //         The closest enemy to the player <em>(That is below 10 credits)</em> becomes friendly.
        //     `,
        //     charge: 75,

        //     use: () => {
        //         const closestEnemy = getClosest(player.elem, '.enemy[tame="false"]').elem
        //         closestEnemy.tame()
        //     }
        // }
    },
    {
        js_bug: {
            name: 'JS Bug',
            desc: `
                Uses <cp>75</cp> POWER<br>
                50% chance to turn all enemies into Lvl 1 Guy<br>
                50% chance to double all enemies<br>
                <br>
                <em style="color: grey;">Does not work on bosses</em>
            `,
            charge: 75,

            use: () => {
                if(DeBread.randomNum(0,1) === 0) {
                    doge('area').querySelectorAll('.enemy').forEach(enemy => {
                        if(!enemy.data.data.boss) {
                            spawnEnemy(enemy.data.pos,enemies.guy,1,0)
                            enemy.data.kill(undefined, true)
                        }
                    })
                } else {
                    doge('area').querySelectorAll('.enemy').forEach(enemy => {
                        if(!enemy.data.data.boss) {
                            spawnEnemy([enemy.data.pos[0]+1, enemy.data.pos[1]+1],enemy.data.data,enemy.data.level,0)
                        }
                    })
                }
            }
        },
        supermagnet: {
            name: 'Supermagnet',
            desc: `
                Uses <cp>75</cp> POWER<br>
                Throws a supermagnet, which sticks to enemies, attracting nearby enemy projectiles.<br>
                Enemy projectiles within its yellow circle can deal damage to other enemies.
            `,
            charge: 75,

            use: () => {
                const magnet = document.createElement('div')
                magnet.pos = [...player.centerPos]
                magnet.grav = 0
                magnet.speed = 25
                magnet.angle = Math.atan2(
                    e.relCursorPos[1] - player.centerPos[1],
                    e.relCursorPos[0] - player.centerPos[0],
                )
                magnet.attachedEnemy = undefined
                magnet.attachedEnemyRelPos = [0,0]
                magnet.classList.add('entity')
                magnet.classList.add('supermagnet')
                addStyles(magnet, {
                    position: 'absolute',
                    translate: '-50% -50%',
                    width: '32px',
                    height: '16px',
                    left: magnet.pos[0]+'px',
                    top: magnet.pos[1]+'px',
                    rotate: magnet.angle+'rad',
                    backgroundImage: 'url(graphics/magnet.png)',
                    backgroundSize: '32px 16px'
                })

                doge('area').append(magnet)

                const magnetArea = document.createElement('div')
                addStyles(magnetArea, {
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    border: '1px solid rgb(255,255,0,0.25)',
                    translate: 'calc(-50% + 16px) calc(-50% + 8px)',
                    position: 'absolute'
                })
                doge(magnet.append(magnetArea))

                magnet.tick = () => {
                    if(magnet.attachedEnemy) {
                        magnet.pos = [
                            magnet.attachedEnemy.data.centerPos[0] + magnet.attachedEnemyRelPos[0],
                            magnet.attachedEnemy.data.centerPos[1] + magnet.attachedEnemyRelPos[1]
                        ]

                        if(!magnet.attachedEnemy.data.alive) {
                            magnet.attachedEnemy = undefined
                            magnet.speed = 0
                            magnet.grav = 0
                        }
                    } else {
                        magnet.movementAngle = Math.atan2(
                            magnet.pos[1] - (magnet.pos[1] + Math.sin(magnet.angle) * magnet.speed + magnet.grav),
                            magnet.pos[0] - (magnet.pos[0] + Math.cos(magnet.angle) * magnet.speed)
                        )
    
                        magnet.style.rotate = magnet.movementAngle + 'rad'
    
                        magnet.pos[0] += Math.cos(magnet.angle) * magnet.speed 
                        magnet.pos[1] += Math.sin(magnet.angle) * magnet.speed + magnet.grav
                        magnet.speed /= 1.025
                        magnet.grav += 0.3

                        elems.enemies.forEach(enemy => {
                            if(isColliding(magnet, enemy)) {
                                magnet.attachedEnemy = enemy
                                magnet.attachedEnemyRelPos = [
                                    magnet.pos[0] - enemy.data.centerPos[0],
                                    magnet.pos[1] - enemy.data.centerPos[1]
                                ]
                                enemy.data.damage(player.stats.bullet.damage*2)
                            }
                        })
                    }

                    if(magnet.pos[1] > doge('area').offsetHeight) {
                        magnet.destroy()
                    }

                    addStyles(magnet, {
                        left: magnet.pos[0]+'px',
                        top: magnet.pos[1]+'px'
                    })

                    doge('area').querySelectorAll('.projectile').forEach(proj => {
                        if(proj.origin === player) return

                        const dx = proj.pos[0] - magnet.pos[0]
                        const dy = proj.pos[1] - magnet.pos[1]
                        const distance = Math.sqrt(dx*dx+dy*dy)

                        const currentAngle = proj.angle

                        const targetAngle = Math.atan2(
                            proj.pos[1] - magnet.pos[1],
                            proj.pos[0] - magnet.pos[0]
                        )

                        let delta = targetAngle - proj.angle

                        delta = Math.atan2(Math.sin(delta), Math.cos(delta))

                        proj.angle += delta * (1/Math.pow(distance, 0.5))
                        proj.style.rotate = proj.angle+'rad'

                        if(distance <= 100) {
                            proj.targetList = elems.enemies
                        }
                    })
                }

                magnet.destroy = () => {
                    magnet.remove()
                }
            }
        },
        molotov: {
            name: 'Molotov',
            desc: `
                Uses <cp>30</cp> POWER<br>
                Throws a Molotov towards your crosshair, creating an explosion dealing <cg>200%</cg> of your damage and applying burning to enemies. 
            `,
            charge: 30,

            use: () => {
                const bottle = document.createElement('div')
                bottle.classList.add('entity')
                bottle.pos = [...player.centerPos]
                bottle.angle = Math.atan2(e.relCursorPos[1] - bottle.pos[1], e.relCursorPos[0] - bottle.pos[0])

                const cursorDis = Math.sqrt(
                    Math.pow(player.centerPos[0] - e.relCursorPos[0],2) +
                    Math.pow(player.centerPos[1] - e.relCursorPos[1],2)
                )

                bottle.speed = 10
                bottle.grav = -5
                bottle.rot = 0
                addStyles(bottle, {
                    position: 'absolute',
                    left: bottle.pos[0]+'px',
                    top: bottle.pos[1]+'px',
                    width: '25px',
                    height: '25px',
                    translate: '-50% -50%',
                    backgroundImage: 'url(graphics/bottle.png)',
                    backgroundSize: '16px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                })

                bottle.tick = (enemies) => {
                    bottle.rot += 10
                    bottle.pos[0] += Math.cos(bottle.angle) * (cursorDis / 25)
                    bottle.pos[1] += Math.sin(bottle.angle) * (cursorDis / 25) + bottle.grav
                    
                    bottle.grav += 0.5

                    addStyles(bottle, {
                        left: bottle.pos[0]+'px',
                        top: bottle.pos[1]+'px',
                        rotate: bottle.rot+'deg'
                    })

                    bottle.destroy = () => {
                        createExplosion([...bottle.pos], 100, player.stats.bullet.damage*2, 10, true)
                        createFire([...bottle.pos], 250, true)
                        DeBread.playSound('audio/glass.mp3',DeBread.randomNum(0.9,1.1,10))

                        bottle.remove()
                    }

                    if(bottle.pos[1] > doge('area').offsetHeight ||
                        bottle.pos[0] < 0 ||
                        bottle.pos[0] > doge('area').offsetWidth
                    ) {
                        bottle.destroy()
                    }

                    enemies.forEach(enemy => {
                        if(isColliding(bottle, enemy) && enemy.data.active) {
                            enemy.data.damage(player.stats.bullet.damage * 2)
                            enemy.data.onFire = true
                            bottle.destroy()
                        }
                    })

                    // createParticles(
                    //     [...bottle.pos],
                    //     1,
                    //     10,
                    //     [25,50],
                    //     250,
                    //     'ease-out',
                    //     {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`}
                    // )

                    createParticle(
                        0,
                        [...bottle.pos],
                        DeBread.randomNum(3,7,10),
                        1.25,
                        DeBread.randomNum(0,Math.PI*2,10),
                        5,
                        1.1,
                        25,
                        {color: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`}
                    )
                }

                doge('area').append(bottle)
            }
        },
        the_d6: {
            name: 'The D6',
            desc: `
                Uses <cp>75</cp> POWER<br>
                Rerolls all items in the shop within their types and rarities.
            `,
            charge: 75,
            canUseInShop: true,
            unlockable: true,
            requirement: () => {
                return player.inPortal
            },

            use: () => {
                let items = []
                doge('gameShopUpgrades').querySelectorAll('.shopItem').forEach(elem => {
                    let itemList = []
                    if(elem.data.type === 0) {
                        itemList = upgrades
                    } else if(elem.data.type === 1) {
                        itemList = powerItems
                    } else if(elem.data.type === 2) {
                        itemList = elixirs
                    }
                    
                    let itemPicked = false

                    while(!itemPicked) {
                        const keys = Object.keys(itemList[elem.data.rarity])
                        const randomKey = keys[DeBread.randomNum(0,keys.length-1)]
                        const randomItem = itemList[elem.data.rarity][randomKey]

                        let meetsRequirement = true
                        if(randomItem.requirement) {
                            meetsRequirement = randomItem.requirement()
                        }

                        if(meetsRequirement) {
                            items.push({
                                data: randomItem,
                                id: randomKey,
                                rarity: elem.data.rarity,
                                type: elem.data.type,
                                cost: DeBread.round(rarities[elem.data.rarity].costBase * (1 + player.wave / 10) * (randomItem.priceMult ?? 1)) * 2
                            })

                            itemPicked = true
                        }
                    }

                    if(elem.data.rarity === 4) {
                        getAchievement('Item_Abuse')
                    }
                })


                DeBread.playSound('audio/dice.mp3', DeBread.randomNum(0.95,1.05,10))
                createShopItems(items)
            }
        },
        the_d100: {
            name: 'The D100',
            desc: `
                Uses <cp>100</cp> POWER<br>
                Rerolls all of the players items.<br>
                <cp>!</cp> Can only be used when there are no enemies alive<br>
                <cs>!</cs> You can look at your items under STATS in the pause menu.
            `,
            charge: 100,
            unlockable: true,
            requirement: () => {
                return elems.enemies.length === 0
            },

            use: () => {
                const playerBefore = player

                player = createPlayer()
                player.wave = playerBefore.wave
                player.lastWaveDate = playerBefore.lastWaveDate
                player.gameOverStats = playerBefore.gameOverStats
                player.powerItem = playerBefore.powerItem
                player.health = playerBefore.health
                player.power = playerBefore.power
                player.pos = [...playerBefore.pos]
                renderStats()

                for(let i = 0; i < playerBefore.itemsBought.length; i++) {
                    createTimeout(() => {
                        let rarity = getWeightedChance([
                            55 + playerBefore.stats.shop.luck,
                            27 + 1.25*playerBefore.stats.shop.luck,
                            16 + 1.25*playerBefore.stats.shop.luck,
                            1.95 + 1.25*playerBefore.stats.shop.luck,
                            0.01 + 0.05*playerBefore.stats.shop.luck
                        ])
                        const itemList = upgrades[rarity]
                        const randomKey = Object.keys(itemList)[DeBread.randomNum(0,Object.keys(itemList).length-1)]
                        const randomItem = itemList[randomKey]
                        randomItem.apply()

                        player.itemsBought.push({
                            data: randomItem,
                            id: randomKey,
                            rarity: rarity
                        })
                    }, i)
                }
                updateUI()

                DeBread.playSound('audio/dice.mp3', DeBread.randomNum(0.95,1.05,10))
            }
        },
        demon_core: {
            name: 'Demon Core',
            desc: `
                Uses <cp>100</cp> POWER<br>
                Creates a giant explosion, dealing <cg>50</cg> damage and applying bleeding to enemies.<br>
                Creates a giant poison field that does <cb>100</cb> damage to the player and enemies over 500 ticks.<br>
            `,
            charge: 100,

            use: () => {
                const targets = [...elems.enemies]
                targets.push(player.elem)
                createExplosion([player.centerPos[0]+DeBread.randomNum(-1,1,10),player.centerPos[1]+DeBread.randomNum(-1,1,10)], 500, 50, 250, true, [[255,255],[255,255],[255,255]])
                createPoisonField([...player.centerPos], 500, 10, 10, 50, targets, [200,255,200])
                elems.enemies.forEach(enemy => {
                    enemy.isBleeding = true
                })
            }
        },
        lightning_rod: {
            name: 'Lightning Rod',
            desc: `
                Uses <cp>40</cp> POWER<br>
                Deals <cg>2500%</cg> of the players damage to a random enemy.<br>
                <cp>!</cp> If there are no enemies on screen, the player is targeted instead.
            `,
            charge: 40,

            use: () => {
                let randomEnemy
                let pos
                if(elems.enemies.length > 0) {
                    randomEnemy = elems.enemies[DeBread.randomNum(0,elems.enemies.length-1)]
                    pos = [...randomEnemy.data.centerPos]
                } else {
                    randomEnemy = player.elem
                    pos = [...randomEnemy.data.centerPos]
                }
                

                const superMagnets = doge('area').querySelectorAll('.supermagnet')
                let damage
                if(superMagnets.length > 0) {
                    const randomMagnet = superMagnets[DeBread.randomNum(0,superMagnets.length-1)]
                    pos = [...randomMagnet.pos]
                    createExplosion(pos, 100, player.stats.bullet.damage * 100, 20, true, [[0,50],[155,255],[255,255]])
                } else {
                    damage = randomEnemy.data.damage(player.stats.bullet.damage * 25)
                    const popup = createPopupText(formatNumber(DeBread.round(damage)), [...randomEnemy.data.centerPos])
                    popup.style.color = 'aqua'
                    doge('area').append(popup)
                }

                DeBread.easeShake(doge('area'),10,5,0.2)

                const lightning = document.createElement('div')
                lightning.classList.add('entity')
                lightning.backgroundPos = 0
                let randomYOffset = DeBread.randomNum(0,128)
                addStyles(lightning, {
                    width: '32px',
                    height: '2048px',
                    position: 'absolute',
                    translate: '-50% 0',
                    left: pos[0]+'px',
                    top: pos[1]-2048+'px',
                    backgroundImage: 'url(graphics/lightning.png)',
                    backgroundSize: '160px 128px',
                    backgroundPosition: `0 ${randomYOffset}px`,
                    scale: `${[-1,1][DeBread.randomNum(0,1)]} 1`,
                    filter: 'drop-shadow(0px 0px 5px rgba(0,255,255,0.5))',
                })

                lightning.tick = () => {
                    if(e.gameUpdates % 2 === 0) {
                        lightning.style.backgroundPosition = `-${lightning.backgroundPos*32}px ${randomYOffset}px`
                        lightning.backgroundPos++
    
                        if(lightning.backgroundPos > 4) {
                            lightning.remove()
                        }
                    }
                }

                doge('area').append(lightning)
            }
        },
        mace: {
            name: 'Mace',
            desc: `
                Uses <cp>75</cp> POWER<br>
                Throws a mace into the air that later lands where your crosshair was, dealing <cg>10,000%</cg> of your damage at a single point.
            `,
            charge: 75,
            unlockable: true,

            use: () => {
                const cursorPos = [...e.relCursorPos]

                const mace = document.createElement('div')
                mace.classList.add('entity')
                mace.grav = -50
                mace.rot = 0
                mace.pos = [...player.centerPos]
                addStyles(mace, {
                    position: 'absolute',
                    width: '64px',
                    height: '64px',
                    translate: '-50% -50%',
                    backgroundImage: 'url(graphics/mace.png)',
                    backgroundSize: 'cover'
                })

                mace.tick = () => {
                    mace.pos[1] += mace.grav

                    addStyles(mace, {
                        left: mace.pos[0]+'px',
                        top: mace.pos[1]+'px',
                        rotate: mace.rot+'deg'
                    })

                    mace.grav++
                    mace.rot += 10

                    if(Math.sign(mace.grav) === 1) {
                        mace.pos[0] = cursorPos[0]
                        if(mace.pos[1] >= cursorPos[1]) {
                            const projData = {
                                damage: player.stats.bullet.damage * 100,
                                range: 2,
                                speed: 0,
                                size: 32,
                            }
                            const proj = createProjectile(0,cursorPos,0,projData,elems.enemies,player.elem)
                            proj.style.opacity = '0'
                            createExplosion([...cursorPos],250,0,25,true,[[0,0],[0,0],[0,0],0])

                            DeBread.easeShake(doge('area'),20,10,0.25)
                            DeBread.playSound('audio/clang.mp3')
                            mace.remove()
                        }
                    }

                }

                doge('area').append(mace)
            }
        }
    },
    {
        wisp: {
            name: 'Wisp',
            desc: `
                Uses <cp>25</cp> POWER<br>
                -Summons a wisp on your crosshair.<br>
                -Wisps fire projectiles your crosshair when the player fires a projectile, which deals <cg>50%</cg> of the players damage.<br>
                -Wisps' projectile attributes copy the players projectile attributes.<br>
                -Wisps explode after 500 ticks, dealing up to <cg>100</cg> damage.
            `,
            charge: 25,
            unlockable: true,

            use: () => {
                const wisp = document.createElement('div')
                wisp.ticksActive = 0
                wisp.pos = [...e.relCursorPos]
                wisp.classList.add('entity')
                wisp.classList.add('wisp')
                addStyles(wisp, {
                    position: 'absolute',
                    left: wisp.pos[0]+'px',
                    top: wisp.pos[1]+'px',
                    width: '32px',
                    height: '32px',
                    translate: '-50% -50%',
                    filter: `hue-rotate(${DeBread.randomNum(-90,90)}deg)`,
                    backgroundImage: 'url(graphics/wisp.gif)',
                    backgroundSize: 'cover'
                })

                doge('area').append(wisp)

                wisp.tick = () => {
                    wisp.ticksActive++

                    if(wisp.ticksActive >= 500) {
                        wisp.destroy()
                    }
                }

                wisp.destroy = () => {
                    createExplosion(wisp.pos, 100, 100, 25, true)
                    wisp.remove()
                }
            }
        },
        tesla_coil: {
            name: 'Tesla Coil',
            desc: `
                Uses <cp>75</cp> POWER<br>
                Spawns a Tesla Coil on your crosshair, dealing constant electricity damage to random enemies.
            `,
            charge: 75,
            unlockable: true,

            use: () => {
                const teslaCoil = document.createElement('div')
                teslaCoil.ticksActive = 0
                teslaCoil.pos = [...e.relCursorPos]
                teslaCoil.classList.add('entity')
                addStyles(teslaCoil, {
                    position: 'absolute',
                    left: teslaCoil.pos[0]+'px',
                    top: teslaCoil.pos[1]+'px',
                    width: '32px',
                    height: '64px',
                    translate: '-50% -50%',
                    backgroundImage: 'url(graphics/teslaCoil.png)',
                    backgroundSize: '32px 64px'
                })

                doge('area').append(teslaCoil)

                teslaCoil.tick = () => {
                    teslaCoil.ticksActive++

                    if(teslaCoil.ticksActive % Math.max(DeBread.round((10 / player.stats.player.passiveAbilityMult)), 1) === 0 && elems.enemies.length > 0) {
                        const randomEnemy = elems.enemies[DeBread.randomNum(0,elems.enemies.length-1)]
                        const rdx = randomEnemy.data.centerPos[0] - teslaCoil.pos[0]
                        const rdy = randomEnemy.data.centerPos[1] - teslaCoil.pos[1]
                        const rdis = Math.sqrt(rdx*rdx+rdy*rdy)
                        let closestStartingEnemy = {enemy: randomEnemy, distance: rdis, d: [rdx,rdy]}

                        if(closestStartingEnemy.enemy) {
                            let enemiesHit = [closestStartingEnemy.enemy]
                            let currentEnemy = closestStartingEnemy.enemy
    
                            closestStartingEnemy.enemy.data.damage(player.stats.bullet.damage * 2)
    
                            const popup = createPopupText(DeBread.round(player.stats.bullet.damage), [...closestStartingEnemy.enemy.data.centerPos])
                            popup.style.color = 'aqua'
                            popup.style.fontSize = Math.min(Math.max(player.stats.bullet.damage / 5, 15), 50) + 'px'
                            doge('area').append(popup)
                            const startingEnemyAngle = Math.atan2(closestStartingEnemy.d[1], closestStartingEnemy.d[0])
                            
                            const firstChain = document.createElement('div')
                            addStyles(firstChain, {
                                width: closestStartingEnemy.distance+'px',
                                height: '10px',
                                translate: '-50% -50%',
                                position: 'absolute',
                                left: (teslaCoil.pos[0]+closestStartingEnemy.enemy.data.centerPos[0])/2+'px',
                                top: (teslaCoil.pos[1]+closestStartingEnemy.enemy.data.centerPos[1])/2+'px',
                                rotate: startingEnemyAngle+'rad',
                                backgroundImage: 'url(graphics/electricityChain.gif)',
                                backgroundSize: 'contain',
                                filter: 'drop-shadow(0px 0px 5px rgba(0,255,255,0.5))',
                                animation: 'electricityChain 250ms ease-out 1 forwards',
                                zIndex: 5,
                            })
                            setTimeout(() => {
                                firstChain.remove()
                            }, 250);
                            doge('area').append(firstChain)
    
                            getStyle(styles.shocked)
    
                            for(let i = 0; i < 10; i++) {
                                let shortestEnemy = {enemy: undefined, distance: Infinity, d: []}
                                elems.enemies.forEach(otherEnemy => {
                                    if(currentEnemy !== otherEnemy && !enemiesHit.includes(otherEnemy) && otherEnemy.data.active) {
                                        const dx = currentEnemy.data.pos[0] - otherEnemy.data.pos[0]
                                        const dy = currentEnemy.data.pos[1] - otherEnemy.data.pos[1]
        
                                        const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
                                        if(distance < shortestEnemy.distance && distance <= 150) {
                                            shortestEnemy.enemy = otherEnemy
                                            shortestEnemy.distance = distance
                                            shortestEnemy.d = [dx, dy]
                                        }
                                    }
                                })
    
                                if(shortestEnemy.enemy === undefined) break
                                
                                const fromEnemy = currentEnemy
                                currentEnemy = shortestEnemy.enemy
                                const toEnemy = currentEnemy
    
                                const damage = (player.stats.bullet.damage * 2) / (i + 1)
                                shortestEnemy.enemy.data.damage(damage)
    
                                const popup = createPopupText(DeBread.round(damage), [...shortestEnemy.enemy.data.centerPos])
                                popup.style.color = 'aqua'
                                popup.style.fontSize = Math.min(Math.max(damage / 5, 15), 50) + 'px'
                                doge('area').append(popup)
    
                                getStyle(styles.shocked)

                                const enemiesAngle = Math.atan2(fromEnemy.data.centerPos[1] - toEnemy.data.centerPos[1], fromEnemy.data.centerPos[0] - toEnemy.data.centerPos[0])
                                const enemiesDist = Math.sqrt(
                                    Math.pow(fromEnemy.data.centerPos[0] - toEnemy.data.centerPos[0],2) + 
                                    Math.pow(fromEnemy.data.centerPos[1] - toEnemy.data.centerPos[1],2)
                                )

                                const chain = document.createElement('div')
                                addStyles(chain, {
                                    width: enemiesDist+'px',
                                    height: '10px',
                                    translate: '-50% -50%',
                                    position: 'absolute',
                                    left: (fromEnemy.data.centerPos[0]+toEnemy.data.centerPos[0])/2+'px',
                                    top: (fromEnemy.data.centerPos[1]+toEnemy.data.centerPos[1])/2+'px',
                                    rotate: enemiesAngle+'rad',
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
    
                                enemiesHit.push(shortestEnemy.enemy)
                            }
                        }
                    }

                    if(teslaCoil.ticksActive >= 750) {
                        teslaCoil.destroy()
                    }
                }

                teslaCoil.destroy = () => {
                    createExplosion(teslaCoil.pos, 100, 100, 25, true, [[0,50],[155,255],[255,255]])
                    teslaCoil.remove()
                }
            }
        },
        pringles_can: {
            name: 'Pringles™ Can',
            id: 'pringles_can',
            desc: `
                Uses <cp>100</cp> POWER<br>
                Throws a pringles can towards your cursor, dealing <cg>1000%</cg> of your damage on impact and pushes enemies away.<br>
                <br>
                <em style="color: grey;">Only real ones know that chaos I've caused with these.</em>
            `,
            charge: 100,

            use: () => {
                const bottle = document.createElement('div')
                bottle.classList.add('entity')
                bottle.pos = [...player.centerPos]
                bottle.angle = Math.atan2(e.relCursorPos[1] - bottle.pos[1], e.relCursorPos[0] - bottle.pos[0])
                bottle.speed = 10
                bottle.grav = -5
                bottle.rot = 0
                addStyles(bottle, {
                    position: 'absolute',
                    left: bottle.pos[0]+'px',
                    top: bottle.pos[1]+'px',
                    width: '25px',
                    height: '25px',
                    translate: '-50% -50%',
                    backgroundImage: 'url(graphics/pringles_can.png)',
                    backgroundSize: '16px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                })

                bottle.tick = (enemies) => {
                    bottle.rot += 10
                    bottle.pos[0] += Math.cos(bottle.angle) * bottle.speed
                    bottle.pos[1] += Math.sin(bottle.angle) * bottle.speed + bottle.grav
                    
                    bottle.grav += 0.35

                    addStyles(bottle, {
                        left: bottle.pos[0]+'px',
                        top: bottle.pos[1]+'px',
                        rotate: bottle.rot+'deg'
                    })

                    bottle.destroy = () => {
                        createParticles([...bottle.pos], 5, 10, [25,50], 250, 'ease-out',{backgroundColor: 'white'})
                        createExplosion([...bottle.pos], 250, 0, 100, true, [[0,0],[0,0],[0,0],0])
                        DeBread.playSound('audio/pringlesCan.mp3',DeBread.randomNum(0.95,1.05,5),false)
                        bottle.remove()
                    }

                    if(bottle.pos[1] > doge('area').offsetHeight ||
                        bottle.pos[0] < 0 ||
                        bottle.pos[0] > doge('area').offsetWidth
                    ) {
                        bottle.destroy()
                    }

                    enemies.forEach(enemy => {
                        if(isColliding(bottle, enemy) && enemy.data.active) {
                            enemy.data.damage(player.stats.bullet.damage * 10)
                            bottle.destroy()
                        }
                    })
                }

                doge('area').append(bottle)
            }
        },
        pepsi: {
            name: 'Pepsi',
            desc: `
                Uses <cp>50</cp> POWER<br>
                Grants <cg>1</cg> random stat up<br>
                <br>
                <em style="color: grey;">better than coke</em>
            `,
            charge: 50,

            use: () => {
                const randomStats = [
                    ['player','speed','+=0.1'],
                    ['player','maxHealth','+=10'],
                    ['player','maxPower','+=1'],
                    ['player','grazeSize','+=0.1'],
                    ['player','parryHeal','+=1'],
                    ['shop','luck','+=0.5'],
                    ['shop','rerolls','+=1'],
                    ['bullet','damage','+=1'],
                    ['bullet','size','+=1'],
                    ['bullet','shotCooldown','*=0.95'],
                    ['bullet','range','+=5'],
                    ['bullet','critChance','+=5'],
                    ['bullet','critDamageMult','+=0.1'],
                    ['bullet','drillChance','+=1'],
                    ['bullet','bounces','+=1'],
                    ['melee','damage','+=2'],
                    ['melee','cooldown','*=0.95'],
                    ['melee','knockback','+=1'],
                    ['melee','heal','+=1'],
                    ['ammo','max','+=1'],
                    ['ammo','reloadSpeed','*=0.95'],
                ]

                const randomStat = randomStats[DeBread.randomNum(0,randomStats.length-1)]
                modifyStat([randomStat[0],randomStat[1]], randomStat[2])
                createNotification('Stat up!',`${randomStat[0]}.${randomStat[1]}`)
            }
        },
        // zenith: {

        // },
    },
    {
        empty: {
            name: 'Empty',
            desc: 'Does nothing<br>Used when the player has an empty secondary power item',
            charge: 0,
            ignoreReplacementWarning: true,

            use: () => {}
        },
        walfling: {
            name: 'Walfling',
            desc: `
                Uses <cp>25</cp> POWER<br>
                Spawns a Walfling on the crosshair<br>
                Walflings fire projectiles that mimic player bullet attributes<br>
                Explodes after 300 ticks
            `,
            charge: 25,

            use: () => {
                const walfling = document.createElement('div')
                walfling.ticksActive = 0
                walfling.pos = [...e.relCursorPos]
                walfling.classList.add('entity')
                walfling.classList.add('walfling')
                addStyles(walfling, {
                    position: 'absolute',
                    left: walfling.pos[0]+'px',
                    top: walfling.pos[1]+'px',
                    width: '32px',
                    height: '32px',
                    translate: '-50% -50%',
                    backgroundImage: 'url(graphics/walfling.png)',
                    backgroundSize: 'cover'
                })

                doge('area').append(walfling)
                createParticles(
                    walfling.pos,
                    5,
                    32,
                    [8,32],
                    250,
                    'ease-out',
                    {backgroundColor: '#a69e9a'}
                )

                walfling.tick = () => {
                    walfling.ticksActive++

                    if(walfling.ticksActive >= 300) {
                        walfling.destroy()
                    }
                }

                walfling.destroy = () => {
                    createExplosion(walfling.pos, 100, 100, 25, true)
                    walfling.remove()
                }
            }
        },
        diet_pepsi: {
            name: 'Diet Pepsi',
            desc: `
                Uses <cp>50</cp> POWER<br>
                -Grants <cg>2</cg> random stat ups<br>
                -Gives a <cb>+2</cb>% chance for shop items to become <strong>Pepsified</strong><br>
                -Every two uses, the power of the stat ups increase<br>
                <br>
                <strong>Pepsified Item:</strong><br>
                Cannot be bought
            `,
            charge: 50,

            use: () => {
                const randomStats = [
                    ['player','speed','+=0.1'],
                    ['player','maxHealth','+=10'],
                    ['player','maxPower','+=1'],
                    ['player','grazeSize','+=0.1'],
                    ['player','parryHeal','+=1'],
                    ['shop','luck','+=0.5'],
                    ['shop','rerolls','+=1'],
                    ['bullet','damage','+=1'],
                    ['bullet','size','+=1'],
                    ['bullet','shotCooldown','*=0.95'],
                    ['bullet','range','+=5'],
                    ['bullet','critChance','+=5'],
                    ['bullet','critDamageMult','+=0.1'],
                    ['bullet','drillChance','+=1'],
                    ['bullet','bounces','+=1'],
                    ['melee','damage','+=2'],
                    ['melee','cooldown','*=0.95'],
                    ['melee','knockback','+=1'],
                    ['melee','heal','+=1'],
                    ['ammo','max','+=1'],
                    ['ammo','reloadSpeed','*=0.95'],
                ]

                for(let i = 0; i < 2; i++) {
                    const randomStat = randomStats[DeBread.randomNum(0,randomStats.length-1)]
                    for(let i = 0; i < Math.floor(player.stats.misc.pepsiPower); i++) {
                        modifyStat([randomStat[0],randomStat[1]], randomStat[2])
                    }
                    createNotification(`Stat up! (x${Math.floor(player.stats.misc.pepsiPower)})`,`${randomStat[0]}.${randomStat[1]}`)
                }

                modifyStat(['shop','pepsifyChance'],'+=2')
                modifyStat(['misc','pepsiPower'],'+=0.5')
            }
        },
        egg: {
            name: 'Egg',
            desc: `
                Uses <cp>25</cp> POWER<br>
                Spawns a Chud Chip that attacks enemies dealing <cg>100%</cg> of your damage every 25 ticks<br>
                After 500 ticks, it explodes dealing <cg>500%</cg> of your damage
            `,
            charge: 25,

            use: () => {
                const bird = document.createElement('div')
                bird.pos = [player.centerPos[0]+DeBread.randomNum(-0.95,1.05,10),player.centerPos[1]+DeBread.randomNum(-0.95,1.05,10)]
                bird.dirVels = []
                bird.classList.add('entity')
                bird.classList.add('chudChip')
                bird.lastHitDate = 0
                bird.ticksActive = 0
                addStyles(bird, {
                    width: '36px',
                    height: '36px',
                    position: 'absolute',
                    left: bird.pos[0]+'px',
                    top: bird.pos[1]+'px',
                    translate: '-50% -50%',
                    backgroundImage: 'url(graphics/enemies/chudBird.gif)',
                    backgroundSize: 'cover',
                    zIndex: '10'
                })

                bird.tick = () => {
                    for(let i = 0; i < bird.dirVels.length; i++) {
                        const dirVel = bird.dirVels[i]
                        bird.pos[0] += Math.cos(dirVel.angle) * dirVel.speed
                        bird.pos[1] += Math.sin(dirVel.angle) * dirVel.speed
            
                        dirVel.speed /= dirVel.div
                        if(Math.abs(dirVel.speed) <= 0.1) {
                            bird.dirVels.splice(i, 1)
                        }
                    }

                    addStyles(bird, {
                        left: bird.pos[0]+'px',
                        top: bird.pos[1]+'px',
                    })

                    const enemy = getClosest(bird, '.enemy')
                    if(enemy.elem) {
                        const dx = enemy.elem.data.centerPos[0] - bird.pos[0]
                        const dy = enemy.elem.data.centerPos[1] - bird.pos[1]
    
                        const angle = Math.atan2(dy, dx)
    
                        bird.dirVels.push({
                            speed: 1,
                            angle: angle,
                            div: 1.05
                        })

                        if(isColliding(enemy.elem, bird) && e.gameUpdates - bird.lastHitDate > 25 && enemy.elem.data.active) {
                            const damage = enemy.elem.data.damage(player.stats.bullet.damage)
                            bird.lastHitDate = e.gameUpdates

                            const popup = createPopupText(DeBread.round(damage), [...bird.pos])
                            popup.style.color = '#fff3bc'
                            popup.style.fontSize = Math.min(Math.max(damage / 5, 15), 50) + 'px'
                            doge('area').append(popup)
                        }
                    }

                    if(bird.ticksActive >= 500 * player.stats.player.passiveAbilityMult) {
                        createExplosion([...bird.pos],100,player.stats.bullet.damage*5,25,true,)
                        bird.remove()
                    }

                    doge('area').querySelectorAll('.chudChip').forEach(otherBird => {
                        const angle = Math.atan2(otherBird.pos[1] - bird.pos[1], otherBird.pos[0] - bird.pos[0])
                        if (isColliding(bird, otherBird) && bird !== otherBird) {
                            const distance = Math.sqrt(
                                Math.pow(bird.pos[0] - otherBird.pos[0],2) + 
                                Math.pow(bird.pos[1] - otherBird.pos[1],2)
                            )
                            
                            const overlap = (36 - distance) / 10
                            bird.pos[0] -= Math.cos(angle) * overlap
                            bird.pos[1] -= Math.sin(angle) * overlap                    
                        }
                    })

                    bird.ticksActive++
                }

                doge('area').append(bird)
            }
        },
    }
]

const elixirs = [{
    strength: {
        name: 'Strength Elixir',
        desc: `
            <cg>+0.15</cg> Damage multiplier<br>
            <cg>+0.15</cg> Melee damage multiplier
        `,
        baseCost: 100,
        costIncrease: 1.25,
        buyLimit: Infinity,
        tier: 0,

        apply: () => {
            modifyStat(['bullet','damageMult'], '+=0.15')
            modifyStat(['melee','damageMult'], '+=0.15')
        }
    },
    fighter: {
        name: 'Fighter Elixir',
        desc: `
            <cg>+0.5</cg> Melee damage multiplier
        `,
        baseCost: 100,
        costIncrease: 1.15,
        buyLimit: Infinity,
        tier: 0,

        apply: () => {
            modifyStat(['melee','damageMult'], '+=0.5')
        }
    },
    gunslinger: {
        name: 'Gunslinger Elixir',
        desc: `
            <cg>+0.25</cg> Damage multiplier
        `,
        baseCost: 100,
        costIncrease: 1.5,
        buyLimit: Infinity,
        tier: 0,

        apply: () => {
            modifyStat(['bullet','damageMult'], '+=0.25')
        }
    },
    haste: {
        name: 'Haste Elixir',
        desc: `
            <cg>+0.5</cg> Speed<br>
            <cg>+5%</cg> Reload speed<br>
            <cg>-5%</cg> Shot cooldown<br>
            <cg>-5%</cg> Melee cooldown
        `,
        baseCost: 250,
        costIncrease: 1.2,
        buyLimit: Infinity,
        tier: 0,

        apply: () => {
            modifyStat(['player','speed'], '+=0.5')
            modifyStat(['ammo','reloadSpeed'], '*=0.95')
            modifyStat(['bullet','shotCooldown'], '*=0.95')
            modifyStat(['melee','cooldown'], '*=0.95')
        }
    },
    // greed: {
    //     name: 'Greed Elixir',
    //     desc: `
    //         <cg>+0.25</cg> Coin drop multiplier
    //     `,
    //     baseCost: 100,
    //     costIncrease: 2,
    //     buyLimit: Infinity,
    //     tier: 0,

    //     apply: () => {
    //         modifyStat(['enemy','moneyMult'], '+=0.25')
    //     }
    // },
    space: {
        name: 'Space Elixir',
        desc: `
            <cg>+10</cg> Area size
        `,
        baseCost: 100,
        costIncrease: 2,
        buyLimit: 15,
        tier: 0,

        apply: () => {
            modifyStat(['misc','areaSize'], '+=10')
            updateArea()
        }
    },
    consumer: {
        name: 'Consumer Elixir',
        desc: `
            <cg>+1</cg> Shop slots
        `,
        baseCost: 250,
        costIncrease: 5,
        buyLimit: 3,
        tier: 0,

        apply: () => {
            modifyStat(['shop','upgrades'], '+=1')
        }
    },
    power: {
        name: 'Power Elixir',
        desc: `
            <cg>+0.1</cg> POWER gain multiplier
        `,
        baseCost: 100,
        costIncrease: 2.5,
        buyLimit: 15,
        tier: 0,

        apply: () => {
            modifyStat(['player','powerGainMult'], '+=0.1')
        }
    },
    backstock: {
        name: 'Backstock Elixir',
        desc: `
            <cg>+1</cg> Shop rerolls
        `,
        baseCost: 100,
        costIncrease: 2,
        buyLimit: Infinity,
        tier: 0,

        apply: () => {
            modifyStat(['shop','rerolls'], '+=1')
        }
    },
    battery: {
        name: 'Battery Elixir',
        desc: `
            <cg>+10</cg> Max POWER
        `,
        baseCost: 125,
        costIncrease: 2,
        buyLimit: 10,
        tier: 0,

        apply: () => {
            modifyStat(['player','maxPower'], '+=10')
        }
    }
}]

const rarities = [
    {
        name: 'COMMON',
        color: 'rgb(75,75,75)',
        costBase: 3
    },
    {
        name: 'UNCOMMON',
        color: 'rgb(66, 112, 62)',
        costBase: 7
    },
    {
        name: 'RARE',
        color: 'rgb(61, 123, 151)',
        costBase: 25
    },
    {
        name: 'EPIC',
        color: 'rgb(103, 61, 151)',
        costBase: 50
    },
    {
        name: 'MYTHIC',
        color: 'linear-gradient(to left, rgba(64, 155, 158, 1), rgba(134, 68, 172, 1))',
        costBase: 100
    },
    {
        name: 'SANDBOX',
        color: 'rgb(164, 140, 73)',
        costBase: 3
    },
    {
        name: undefined,
        color:undefined
    }
]

function openShop(upgradeList) {
    updateShopTab()
    if(player.alive) {
        e.gameActive = false
        player.rerolls = player.stats.shop.rerolls
        doge('gameShopContainer').style.display = 'flex'

        if(player.stats.shop.rerolls > 0) {
            doge('rerollPrice').innerText = `(${player.rerolls})`
        } else {
            doge('rerollPrice').innerText = `($${Math.floor(player.stats.shop.rerollPrice)})`
        }
        doge('gameShopTitle').innerText = 'Shop :)'
        applyFlowText(doge('gameShopTitle'))

        // function updateBankinfo() {
        //     doge('bankBalance').innerText = '$'+formatNumber(Math.floor(saveData.bankMoney))
        //     doge('bankBalanceCents').innerText = `.${Math.min(Math.floor(DeBread.round(saveData.bankMoney - Math.floor(saveData.bankMoney), 2)*100),99)}`.padEnd(3,0)
        // } updateBankinfo()

        // //Deposit
        // doge('bankDeposit').onclick = () => {
        //     saveData.bankMoney += player.money / 10
        //     player.getMoney(-player.money / 10)
        //     updateBankinfo()
        // }

        // //Withdrawl
        // doge('bankWithdrawl').onclick = () => {
        //     player.getMoney(saveData.bankMoney / 10)
        //     saveData.bankMoney -= player.money / 10
        //     updateBankinfo()
        // }

        doge('gameShopUpgradesButtons').style.display = 'flex'
        
        createShopItems(upgradeList)

        for(const key in player.moneyBonusQueue) {
            const data = player.moneyBonusQueue[key]
            createTimeout(() => {
                const bonus = document.createElement('div')
                bonus.innerHTML = `<strong>+$${data.value}</strong> <span style="color: grey;">-</span> <span style="color: white;">${data.text}</span>`
                addStyles(bonus, {
                    color: 'rgb(255, 255, 100)',
                    width: 'fit-content',
                    animation: 'moneyBonusIn 250ms ease-out 1 forwards'
                })
                doge('gameBonusContainer').append(bonus)

                createTimeout(() => {
                    bonus.style.animation = 'moneyBonusOut 500ms cubic-bezier(.5,-0.75,.9,.5) 1 forwards'
                    createTimeout(() => {
                        bonus.remove()
                        player.getMoney(data.value)
                        DeBread.playSound(`audio/money${DeBread.randomNum(0,3)}.mp3`,0.5, DeBread.randomNum(0.9,1.1,3), false)
                    }, 24);
                }, 75);
            }, 100 * key);   
        }

        player.moneyBonusQueue = []
    }
}

function createShopItems(items) {
    let randomItems = []
    let randomItemsIDs = []

    let playerElixirs = [...player.elixirIDs]
    let chosenPlayerElixirs = []
    if(items) {
        randomItems = items
    } else {        
        for(let i = 0; i < player.stats.shop.upgrades; i++) {
            const itemType = getWeightedChance(player.shopWeights)
    
            let itemList = []
            if(itemType === 0) {
                itemList = upgrades
            } else if(itemType === 1) {
                itemList = powerItems
            } else if(itemType === 2) {
                itemList = elixirs
            }
    
            let rarity = 0
            const luck = player.stats.shop.luck
            if(itemType < 2) {
                rarity = getWeightedChance([
                    55 + luck,
                    27 + 1.25*luck,
                    16 + 1.25*luck,
                    1.95 + 1.25*luck,
                    0.01 + 0.05*luck
                ])
            }
            
            let attempts = 0
            let itemChosen = false

            if(playerElixirs.length >= 3 && itemType === 2) {
                while(!itemChosen) {
                    const randomIndex = DeBread.randomNum(0, playerElixirs.length - 1)
                    const elixirID = playerElixirs[randomIndex]

                    const elixirIndex = player.elixirIDs.indexOf(elixirID)
                    const randomElixir = player.elixirs[elixirIndex]

                    if(!chosenPlayerElixirs.includes(elixirID)) {
                        itemChosen = true

                        randomItems.push({
                            data: randomElixir,
                            id: elixirID,
                            rarity: 0,
                            type: 2,
                            cost: DeBread.round(rarities[rarity].costBase * (1 + player.wave / 50) * (randomElixir.priceMult ?? 1)) * player.stats.shop.priceMult
                        })

                        randomItemsIDs.push(elixirID)
                        chosenPlayerElixirs.push(elixirID)

                        playerElixirs.splice(randomIndex, 1)
                    }

                    attempts++
                    if(attempts > 1000) break
                }
            } else {
                while(!itemChosen) {
                    const keys = Object.keys(itemList[rarity])
                    let filteredKeys = keys

                    if(itemType === 2) {
                        if(player.elixirIDs.length >= 3) {
                            filteredKeys = keys.filter(k => player.elixirIDs.includes(Number(k)))
                        } else {
                            filteredKeys = keys.filter(k => !player.elixirIDs.includes(Number(k)))
                        }
                    }

                    if(filteredKeys.length === 0) break

                    const randomKey = filteredKeys[DeBread.randomNum(0, filteredKeys.length - 1)]
                    const randomItem = itemList[rarity][randomKey]

                    let itemCost = DeBread.round(rarities[rarity].costBase * (1 + player.wave / 50) * (randomItem.priceMult ?? 1)) * player.stats.shop.priceMult
                    
                    if(saveData.selectedChallenges.includes('classic')) itemCost = 0

                    let isUnlocked = true
                    if(randomItem.unlockable) {
                        if(!saveData.stats.unlocked[['items','powerItems','elixirs'][itemType]].includes(randomKey) || saveData.settings.devMode) {
                            isUnlocked = false
                        }
                    }

                    let meetsRequirement = true
                    if(randomItem.requirement) {
                        meetsRequirement = randomItem.requirement()
                    }

                    let isSpicy = false
                    if(DeBread.randomNum(1,100) <= player.stats.shop.pepsifyChance) {
                        isSpicy = true                        
                    }

                    if(!randomItemsIDs.includes(randomKey) && !saveData.selectedChallenges.includes('abstract') && isUnlocked && meetsRequirement) {
                        itemChosen = true
                        randomItems.push({
                            data: randomItem,
                            id: randomKey,
                            rarity: rarity,
                            type: itemType,
                            cost: itemCost,
                            spicy: isSpicy
                        })
                        randomItemsIDs.push(randomKey)
                    }
    
                    attempts++
    
                    if(attempts > 500) {
                        itemChosen = true
                        randomItems.push({
                            data: upgrades[6].error,
                            rarity: 6,
                            type: 0,
                            id: 'error',
                            cost: 100,
                        })
    
                        break
                    }
                }
            }

        }
    }

    doge('gameShopUpgrades').innerHTML = ''
    for(const key in randomItems) {
        let item = randomItems[key].data
        const itemMeta = randomItems[key]
        const itemSlot = document.createElement('div')
        itemSlot.classList.add('shopItem')
        itemSlot.data = itemMeta

        let textureExtension = 'png'
        if(item.animatedTexture) textureExtension = 'gif'

        let texturePath = 'upgrades'
        if(randomItems[key].type === 1) {
            texturePath = 'powerItems'
        } else if(randomItems[key].type === 2) {
            texturePath = 'elixirs'
            //Adjust cost to specified elixir cost

            if(player.elixirIDs.includes(itemMeta.id)) {
                const elixirIndex = player.elixirIDs.indexOf(itemMeta.id)
                const boughtElixir = player.elixirs[elixirIndex]
                item = boughtElixir
            }

            let totalCost = item.baseCost
            for(let i = 0; i < item.tier; i++) {
                totalCost *= item.costIncrease
            }

            itemMeta.cost = totalCost
        }

        itemSlot.innerHTML = `
            <div class="shopElixirTier">
                <span>${roman(item.tier+1)}</span>
            </div>
            <div class="shopItemPrice">
                <span>$${formatNumber(itemMeta.cost)}</span>
            </div>
            <img src="graphics/${texturePath}/${randomItems[key].id}.${textureExtension}">
        `

        if(item.tier === undefined) {
            itemSlot.querySelector('.shopElixirTier').remove()
        }

        doge('gameShopUpgrades').append(itemSlot)
        itemSlot.style.animation = `shopItemIn 500ms cubic-bezier(0,1,.5,1) ${key * 100}ms 1 forwards`

        if(itemMeta.rarity === 4) {
            itemSlot.style.animation += ', mythicBorder 5s linear infinite forwards'
            itemSlot.querySelector('img').style.animation = 'mythicGlow 5s linear infinite forwards'
        } else {
            itemSlot.querySelector('img').style.filter = `drop-shadow(0px 0px 5px ${rarities[itemMeta.rarity].color})`
            itemSlot.style.boxShadow = `inset 0px 0px 0px 5px ${rarities[itemMeta.rarity].color}`
        }

        if(itemMeta.spicy) {
            itemSlot.style.backgroundImage = 'url(graphics/spicyItem.png)'
            itemSlot.style.backgroundSize = 'cover'
            itemSlot.querySelector('img').style.filter = 'grayscale() brightness(25%)'
        }

        itemSlot.onmouseenter = () => {
            const itemRect = itemSlot.getBoundingClientRect()

            //literally just for the error item

            let itemName = item.name
            if(typeof item.name === 'function') {
                itemName = item.name()
            }

            let itemDesc = item.desc
            if(typeof item.desc === 'function') {
                itemDesc = item.desc()
            }

            if(itemMeta.type === 2) {
                itemDesc += `<br><br>Tier <cs>${roman(item.tier)}</cs> -> <cs>${roman(item.tier+1)}</cs>`

                if(item.buyLimit < Infinity) {
                    itemDesc += `<br>Maxes out at tier <cs>${roman(item.buyLimit)}</cs>`
                }
            }

            if(itemMeta.spicy) {
                itemDesc = `<strong style="color: #532c4e;">PEPSIFIED</strong><br>This item cannot be bought!`
            }

            tooltip(
                [itemRect.left + itemSlot.offsetWidth / 2, itemRect.top + itemSlot.offsetHeight + 12], 
                itemName,
                [
                    {text: rarities[randomItems[key].rarity].name, col: rarities[randomItems[key].rarity].color},
                    {text: ['ITEM','POWER ITEM','ELIXIR'][itemMeta.type], col: 'rgb(50,50,50)'}
                ], 
                itemDesc, 
                itemMeta.cost
            )
        }

        itemSlot.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }

        itemSlot.onclick = () => {
            let underBuyLimit = true

            if(itemMeta.type === 2) {
                if(item.tier >= item.buyLimit) {
                    underBuyLimit = false
                }
            }

            if(player.money >= randomItems[key].cost && underBuyLimit && !itemMeta.spicy) {
                if(itemMeta.type === 0) { //Items
                    item.apply()
                    itemSlot.sellOut()

                    player.itemsBought.push(randomItems[key])
                } else if(itemMeta.type === 1) { //Power items
                    if(!player.powerItem) {
                        player.powerItem = item
                        itemSlot.sellOut()
                    } else if(!player.secondaryPowerItem && player.stats.player.canCarrySecondaryPowerItem) {
                        player.secondaryPowerItem = item
                        itemSlot.sellOut()
                    } else if(saveData.settings.showPowerItemWarning) {
                        openPrompt('Warning!','Buying this power item will override your current one! Are you sure?',[{text: 'Yeah', onclick: () => {player.powerItem = item; itemSlot.sellOut(); closePrompt()}},{text: 'PLEASE NO', onclick: () => {closePrompt()}}])
                    } else {
                        player.powerItem = item
                        itemSlot.sellOut()
                    }

                } else if(itemMeta.type === 2) { //Elixirs
                    //Elixir shit
                    
                    if(!player.elixirIDs.includes(itemMeta.id)) {
                        player.elixirIDs.push(itemMeta.id)
                        player.elixirs.push(itemMeta.data)
                    }

                    const elixirIndex = player.elixirIDs.indexOf(itemMeta.id)
                    const boughtElixir = player.elixirs[elixirIndex]
                    boughtElixir.tier++
                    boughtElixir.apply()

                    itemSlot.sellOut()
                }
            }

            if(saveData.selectedChallenges.includes('classic')) closeShop()
        }
        
        itemSlot.sellOut = () => {
            player.getMoney(-randomItems[key].cost)
            player.gameOverStats.items++
            player.gameOverStats.moneySpent += randomItems[key].cost
            itemSlot.style.pointerEvents = 'none'
            itemSlot.querySelector('.shopItemPrice').innerText = 'SOLD OUT'
            itemSlot.style.filter = 'grayscale(1) brightness(50%)'
            updateUI()

            updateShopTab()
            
            if(player.tutorial.stage === 19) {
                player.tutorial.goalValue++
                updateTutorialGoal()
            }

            const typeNames = [
                'items',
                'powerItems',
                'elixirs',
            ]

            if(![2,3].includes(saveData.gameSettings.gamemode) && saveData.selectedChallenges.length === 0) {
                const collectionList = saveData.stats.collection[typeNames[itemMeta.type]]
                let collectionHasItem = false
                for(const key in collectionList) {
                    if(collectionList[key].name === item.name) {
                        collectionList[key].count++
                        collectionHasItem = true
                        break
                    }
                }
    
                if(!collectionHasItem) {
                    collectionList.push({
                        name: item.name,
                        count: 1,
                    })
                }
            }

            // if(
            //     !saveData.stats.itemsCollected.includes(randomItems[key].id) &&
            //     ![2,3].includes(saveData.gameSettings.gamemode) &&
            //     saveData.selectedChallenge === 'none'
            // ) {
            //     saveData.stats.itemsCollected.push(randomItems[key].id)
            // }
            save()
        }
    }
}

// function createShopItems() {
//     let randomItems = []
//     let randomItemsIDs = []
        
//     for(let i = 0; i < player.stats.shop.upgrades; i++) {
//         //Gets a random item type based on previously specified item type weights
//         const itemType = getWeightedChance(player.shopWeights) 

//         let itemList = []
//         if(itemType === 0) {
//             itemList = upgrades
//         } else if(itemType === 1) {
//             itemList = powerItems
//         } else if(itemType === 2) {
//             itemList = elixirs
//         }

//         let rarity = 0
//         const luck = player.stats.shop.luck
//         if(itemType < 2) {
//             rarity = getWeightedChance([ //Returns a random number between 0 and 4 based on weights
//                 55 + luck,
//                 27 + 1.25*luck,
//                 16 + 1.25*luck,
//                 1.95 + 1.25*luck,
//                 0.01 + 0.05*luck
//             ])
//         }
        
//         let attempts = 0
//         let itemChosen = false

//         while(!itemChosen) {
//             const keys = Object.keys(itemList[rarity]) //Turns the list object into an array to iterate through

//             const randomKey = keys[DeBread.randomNum(0, keys.length - 1)]
//             const randomItem = itemList[rarity][randomKey]
            
//             if(!randomItemsIDs.includes(randomKey)) {
//                 itemChosen = true
//                 randomItems.push({
//                     data: randomItem,
//                     id: randomKey,
//                     rarity: rarity,
//                     type: itemType,
//                     cost: DeBread.round(rarities[rarity].costBase * (1 + player.wave / 10) * (randomItem.priceMult ?? 1))
//                 })
//                 randomItemsIDs.push(randomKey)
//             }

//             attempts++

//             if(attempts > 500) { //If the picker fails to find an item after 500 attempts, it chooses the rare 'error' item
//                 itemChosen = true
//                 randomItems.push({
//                     data: upgrades[6].error,
//                     rarity: 6,
//                     type: 0,
//                     id: 'error',
//                     cost: 10,
//                 })

//                 break
//             }
//         }
//     }
// }

function updateShopTab() {
    const powerItemDiv = doge('shopTab-powerItem').querySelector('div')
    if(player.powerItem) {
        const divRect = powerItemDiv.getBoundingClientRect()
        powerItemDiv.querySelector('img').style.opacity = '1'
        powerItemDiv.querySelector('img').src = `graphics/powerItems/${player.powerItem.name.toLowerCase().replaceAll(' ','_')}.png`

        powerItemDiv.onmouseenter = () => {
            if(player.powerItem) {
                tooltip(
                    [divRect.left + powerItemDiv.offsetWidth / 2, divRect.top + powerItemDiv.offsetHeight + 24], 
                    player.powerItem.name,
                    [{text: 'POWER ITEM', col: 'rgb(50,50,50)'}], 
                    player.powerItem.desc
                )
            }
        }

        powerItemDiv.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }
    } else {
        powerItemDiv.querySelector('img').style.opacity = '0'
    }

    for(let i = 0; i < 3; i++) {
        const elixir = player.elixirs[i]
        const elixirDiv = doge('shopTab-elixirs').querySelectorAll('.gameShopTabItem')[i]
        const divRect = elixirDiv.getBoundingClientRect()
        const tier = elixirDiv.querySelector('.gameShopElixirsTabTier').querySelector('span')
        
        if(player.elixirIDs[i]) {
            elixirDiv.querySelector('img').style.opacity = '1'
            elixirDiv.querySelector('img').src = `graphics/elixirs/${player.elixirIDs[i]}.png`
            tier.innerText = roman(player.elixirs[i].tier)

            elixirDiv.onmouseenter = () => {
                let elixirDesc = elixir.desc
                elixirDesc += `<br><br>Tier <cs>${roman(elixir.tier)}</cs>`

                if(elixir.buyLimit < Infinity) {
                    elixirDesc += `<br>Maxes out at tier <cs>${roman(elixir.buyLimit)}</cs>`
                }

                tooltip(
                    [divRect.left + elixirDiv.offsetWidth / 2, divRect.top + elixirDiv.offsetHeight + 24], 
                    elixir.name,
                    [{text: 'ELIXIR', col: 'rgb(50,50,50)'}], 
                    elixirDesc
                )
            }

            elixirDiv.onmouseleave = () => {
                doge('tooltip').style.opacity = '0'
            }
        } else {
            elixirDiv.querySelector('img').style.opacity = '0'
            tier.innerText = '0'
        }
    }
}

// function createShopUpgrades(upgradeList) {
//     let randomUpgrades
//     if(upgradeList) {
//         randomUpgrades = upgradeList
//     } else {
//         randomUpgrades = []
//     }

    
//     let upgradeAttempts = 0
//     if(!upgradeList) {
//         while((randomUpgrades.length < player.stats.shop.upgrades && upgradeAttempts < 1000)) {
//             let rarity = 0
//             const randomRarityNum = DeBread.randomNum(0,1,100)
            
//             const luck = player.stats.shop.luck / 2
//             let weights = [
//                 55 + luck,
//                 27 + 1.25*luck,
//                 16 + 1.25*luck,
//                 1.95 + 1.25*luck,
//                 0.01 + 0.05*luck
//             ]
//             let total = weights[0]+weights[1]+weights[2]+weights[3]+weights[4]
//             let proportions = [
//                 weights[0]/total,
//                 weights[1]/total+weights[0]/total,
//                 weights[2]/total+weights[1]/total+weights[0]/total,
//                 weights[3]/total+weights[2]/total+weights[1]/total+weights[0]/total,
//                 weights[4]/total+weights[3]/total+weights[2]/total+weights[1]/total+weights[0]/total,
//             ]
            
//             for(let i = 0; i < proportions.length; i++) {
//                 if(randomRarityNum < proportions[i]) {
//                     rarity = i
//                     break
//                 }
//             }
            
//             const upgradeKeys = Object.keys(upgrades[rarity])
//             const randomUpgrade = upgradeKeys[DeBread.randomNum(0,upgradeKeys.length - 1)]
            
//             if(!randomUpgrades.some(u => u.id === randomUpgrade && u.rarity === rarity)) {
//                 randomUpgrades.push({id: randomUpgrade, rarity: rarity})
//             }
    
//             upgradeAttempts++
//         }
//     }
    
//     if(upgradeAttempts >= 1000) {
//         randomUpgrades.push({id: 'rock', rarity: 0})
//     }

//     doge('gameShopUpgrades').querySelectorAll('.shopItem').forEach(elem => {elem.remove()})

//     const upgradeSlotBase = document.createElement('div')
//     upgradeSlotBase.classList.add('shopItem')
//     upgradeSlotBase.innerHTML = `
//         <div class="shopItemPrice">
//             <span>$25</span>
//         </div>
//         <img src="graphics/placeholder.png">
//     `
//     for(const key in randomUpgrades) {
//         const rarity = randomUpgrades[key].rarity
//         const id = randomUpgrades[key].id.toString()

//         const upgrade = {
//             price: upgrades[rarity][id].price ?? Math.pow(4,rarity+1),
//             data: upgrades[rarity][id]
//         }
//         const upgradeSlot = upgradeSlotBase.cloneNode(true)
        
//         upgradeSlot.style.animation = `shopItemIn 500ms cubic-bezier(0,1,.5,1) ${key * 100}ms 1 forwards`

//         doge('gameShopUpgrades').append(upgradeSlot)
//         upgradeSlot.querySelector('.shopItemPrice').querySelector('span').innerText = '$' + formatNumber(upgrade.price)
//         upgradeSlot.querySelector('img').src = `graphics/upgrades/${randomUpgrades[key].id}.png`

//         if(rarity === 4) {
//             upgradeSlot.style.animation = 'mythicBorder 5s linear infinite forwards'
//             upgradeSlot.querySelector('img').style.animation = 'mythicGlow 5s linear infinite forwards'
//         } else {
//             upgradeSlot.querySelector('img').style.filter = `drop-shadow(0px 0px 5px ${rarities[rarity].color})`
//         }

//         upgradeSlot.onclick = () => {
//             if(upgrade.price <= player.money) {
//                 upgradeSlot.style.pointerEvents = 'none'
//                 upgradeSlot.querySelector('.shopItemPrice').innerText = 'SOLD OUT'
//                 upgradeSlot.style.filter = 'grayscale(1) brightness(50%)'
//                 upgrades[rarity][randomUpgrades[key].id].apply()
//                 updateUI()

//                 player.getMoney(-upgrade.price)
                
//                 player.gameOverStats.items++
//                 player.gameOverStats.moneySpent += upgrade.price

//                 if(player.tutorial.stage === 17) {
//                     player.tutorial.goalValue++
//                     updateTutorialGoal()
//                 }
//             }
//         }

//         upgradeSlot.onmouseenter = () => {
//             const upgradeRect = upgradeSlot.getBoundingClientRect()

//             //literally just for the error item

//             let itemName = upgrade.data.name
//             if(typeof upgrade.data.name === 'function') {
//                 itemName = upgrade.data.name()
//             }

//             let itemDesc = upgrade.data.desc
//             if(typeof upgrade.data.desc === 'function') {
//                 itemDesc = upgrade.data.desc()
//             }

//             tooltip(
//                 [upgradeRect.left + upgradeSlot.offsetWidth / 2, upgradeRect.top + upgradeSlot.offsetHeight + 12], 
//                 itemName, 
//                 [{text: rarities[rarity].name, col: rarities[rarity].color}], 
//                 itemDesc, 
//                 upgrade.price
//             )
//         }

//         upgradeSlot.onmouseleave = () => {
//             doge('tooltip').style.opacity = '0'
//         }
//     }
// }

function rerollShop() {
    if(player.rerolls === 0 && player.money > player.stats.shop.rerollPrice) {
        player.getMoney(-player.stats.shop.rerollPrice)
        modifyStat(['shop','rerollPrice'],'*=1.1')
        doge('rerollPrice').innerText = `($${Math.floor(player.stats.shop.rerollPrice)})`

        createShopItems()
        saveData.stats.list.Times_Rerolled++
    }

    if(player.rerolls > 0) {
        player.rerolls--
        doge('rerollPrice').innerText = `(${player.rerolls})`
        createShopItems()
        saveData.stats.list.Times_Rerolled++

        player.gameOverStats.rerolls++

        if(player.rerolls === 0) {
            doge('rerollPrice').innerText = `($${Math.floor(player.stats.shop.rerollPrice)})`
        }
    }

    if(saveData.stats.list.Times_Rerolled >= 500) {
        getAchievement('Reroll_Addict')
    }
}

function closeShop() {
    doge('gameShopContainer').style.display = 'none'
    e.gameActive = true
    player.perfectSet = true

    player.moneyBonusQueue.push({
        value: Math.min(Math.floor(player.money / 5), player.stats.player.interestCap),
        text: 'Interest'
    })

    doge('area').querySelectorAll('.portal').forEach(portal => {
        addStyles(portal, {
            width: '0px',
            height: '0px',
            border: '1px solid white'
        })

        setTimeout(() => {
            portal.remove()
            player.elem.style.scale = '1'
            doge('weapon').style.scale = '1'
        }, 1000);
    })

    createTimeout(() => {
        progressWave(true)
        player.lastWaveDate = e.gameUpdates
        player.autoWavesPaused = false
        player.inPortal = false
    }, 100);

    if(player.tutorial.stage === 20) {
        player.tutorial.goalValue++
        updateTutorialGoal()
    }
}