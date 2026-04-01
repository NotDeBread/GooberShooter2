function renderStats() {
    doge('gameStatsContainer').innerHTML = ''
    for(const key in player.stats) {
        const statSection = document.createElement('div')
        statSection.classList.add('gameStatContainer')
        statSection.innerHTML = `<span class="gameStatSectionName">${key.toUpperCase()}</span>`
        for(const stat in player.stats[key]) {
            const elem = document.createElement('div')
            elem.innerHTML = `
                <span class="gameStatName">${stat}:</span>
                <span id="${key}-${stat}">${player.stats[key][stat]}</span>
                <span class="gameStatChange" id="${key}-${stat}Change"></span>
            `
            statSection.append(elem)
        }

        doge('gameStatsContainer').append(statSection)
    }
}

function fixStats() {
    //Ammo
    player.stats.ammo.max = DeBread.round(player.stats.ammo.max)
    if(player.stats.ammo.current > player.stats.ammo.max) {
        player.stats.ammo.current = player.stats.ammo.max
    }
}

function modifyStat(stat, modifier) {
    const startingValue = player.stats[stat[0]][stat[1]] * (player.stats[stat[0]][stat[1]+"Mult"] ?? 1)
    eval('player.stats[stat[0]][stat[1]]' + modifier)

    fixStats()

    doge(`${stat[0]}-${stat[1]}`).innerText = DeBread.round(player.stats[stat[0]][stat[1]] * (player.stats[stat[0]][stat[1]+"Mult"] ?? 1),2)

    const change = player.stats[stat[0]][stat[1]] * (player.stats[stat[0]][stat[1]+"Mult"] ?? 1) - startingValue
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

const upgrades = [
    {
        reinforced_gloves: {
            name: 'Reinforced Gloves',
            desc: `
                <cg>+10%</cg> Reload speed
            `,

            apply: () => {
                modifyStat(['ammo','reloadSpeed'], '*=0.9')
            }
        },
        bandage: {
            name: 'Bandage',
            desc: `
                <cg>+25</cg> HP
            `,

            apply: () => {
                player.health += 25
            }
        },
        helmet: {
            name: 'Helmet',
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
                <cg>+5</cg>% Crit chance
            `,
            
            apply: () => {
                modifyStat(['bullet', 'critChance'], '+=5')
            }
        },
        chalk: {
            name: 'Chalk',
            desc: `
                <cg>+0.5</cg> Melee Damage
            `,
            
            apply: () => {
                modifyStat(['melee', 'damage'], '+=0.5')
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
                console.log(randomStat)

                modifyStat(randomStat,'*=1.1')
            }
        },
    },
    {
        heavy_ammo: {
            name: 'Heavy Ammo',
            desc: `
            <cg>+2</cg> Damage<br>
            <cb>-10%</cb> Bullet speed`,
            apply: () => {
                modifyStat(['bullet', 'damage'], '+=3')
                modifyStat(['bullet', 'speed'], '*=0.9')
            },
        },
        light_ammo: {
            name: 'Light Ammo',
            desc: `
                <cg>+0.25</cg> Bullet speed<br>
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
            <cg>+2</cg> Bullet bounces<br>
            <cg>+0.25</cg> Bullet knockback<br>
            <cb>-20%</cb> Damage<br>
            <cb>-20%</cb> Reload speed<br>
            <em style="color: grey;">Bounces multiply bullet damage by 1.2.</em>
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
                <cg>+10</cg>% Crit chance
            `,

            apply: () => {
                modifyStat(['bullet','critDamageMult'], '*=1.1')
                modifyStat(['bullet','critChance'], '+=10')
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
                <cg>+2</cg> Melee damage <br>
            `,

            apply: () => {
                modifyStat(['melee','damage'], '+=2')
            }
        },
        screw: {
            name: 'Screw',
            desc: `
                Bullets hit <cg>+1</cg> more times when hitting an evemy.<br>
                <cb>-25%</cb> Reload speed
            `,
            priceMult: 1.5,

            apply: () => {
                modifyStat(['bullet','drillTicks'], '+=1')
                modifyStat(['ammo','reloadSpeed'], '*=1.25')
            }
        },
        mini_mushroom: {
            name: 'Mini Mushroom',
            desc: `
                <cg>-10%</cg> Size <br>
                <cg>+1</cg> Speed <br>
                <cb>-10%</cb> Max HP
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['player','size'], '*=0.9')
                modifyStat(['player','speed'], '+=1')
                modifyStat(['player','maxHealth'], '*=0.9')
            }
        },
        mega_mushroom: {
            name: 'Mega Mushroom',
            desc: `
                <cg>+30</cg> Max HP<br>
                <cg>+1</cg> Contact damage<br>
                <cb>+15</cb> Size <br>
                <cb>-15%</cb> Speed <br>
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['player','maxHealth'], '+=30')
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
                modifyStat(['melee','cooldown'], '*=0.85', )
            }
        },
        boxing_gloves: {
            name: 'Boxing Gloves',
            desc: `
                <cg>+10</cg> Melee size<br>
                <cb>-25%</cb> Melee damage
            `,

            apply: () => {
                modifyStat(['melee','size'], '+=10', )
                modifyStat(['melee','damage'], '*=0.75', )
            }
        },
        feedbacker: {
            name: 'Feedbacker',
            desc: `
                Gain <cg>+10</cg> HP when parrying an enemy projectile.
            `,

            apply: () => {
                modifyStat(['player','parryHeal'], '+=10', )
            }
        },
        skates: {
            name: 'Skates',
            desc: `
                <cg>+3</cg> Speed<br>
                <cb>-40%</cb> Friction
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['player','speed'], '+=3', )
                modifyStat(['player','speedStep'], '*=0.6', )
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
                modifyStat(['melee','size'], '+=15',)
                modifyStat(['melee','cooldown'], '*=1.15',)
                modifyStat(['player','speed'], '*=0.95',)
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
                Parried bullets spawn poison fields on impact.
            `,
            priceMult: 0.75,

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
                Heal <cg>+2</cg> HP when meleeing an enemy.
            `,

            apply: () => {
                modifyStat(['melee','heal'], '+=2')
            }
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
            }
        },
        drill_ammo: {
            name: 'Drill Ammo',
            desc: `
                Bullets hit <cg>+2</cg> times when hitting an enemy.<br>
                <cg>+2</cg> Damage<br>
                <cb>-25%</cb> Bullet speed
            `,

            priceMult: 1.25,

            apply: () => {
                modifyStat(['bullet','drillTicks'], '+=2')
                modifyStat(['bullet','damage'], '+=2')
                modifyStat(['bullet','speed'], '*=0.75')
            }
        },
        magnetic_ammo: {
            name: 'Magnetic Ammo',
            desc: `
                Bullets become attracted towards the nearest enemy.<br>
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
            }
        },
        nuclear_waste: {
            name: 'Nuclear Waste',
            desc: `
                Bullets get a <cg>+10%</cg> chance to create a poison field, dealing <cg>+10%</cg> of your damage.<br>
                <cg>+5</cg> Poison field size <br>
                <cb>-50%</cb> Max health
            `,

            apply: () => {
                modifyStat(['bullet','poisonFieldChance'], '+=10')
                modifyStat(['bullet','poisonFieldDmgPercent'], '+=1')
                modifyStat(['bullet','poisonFieldSize'], '+=5')
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
                Every tick a bullet is active, multiply damage and size by 1.0025 (<cg>+0.0025</cg>)
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
                Getting hit by an enemy has a <cg>+10%</cg> to create an explosion, dealing <cg>+25%</cg> of your damage.<br>
                <cb>-20%</cb> Speed<br>
                <em style="color: grey;">Explosion does not damage player.</em>
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['player','explosiveHitChance'], '+=10')
                modifyStat(['player','explosiveHitDamage'], '+=0.25')

                modifyStat(['player','speed'], '*=0.8')
            }
        },
        knuckleblaster: {
            name: 'Knuckleblaster',
            desc: `
                Meleeing an enemy creates an explosion.<br>
                <cg>+10</cg> Knuckleblaster explosion size<br>
                <cb>+20%</cb> Melee cooldown
            `,
            priceMult: 0.75,

            apply: () => {
                modifyStat(['melee','explosionPower'], '+=10')
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
        multishot: {
            name: 'Multi-shot',
            desc: `
                Shoot <cg>+1</cg> more bullets at a time.
            `,
            priceMult: 1.1,
    
            apply: () => {
                modifyStat(['bullet','multishot'], '+=1')
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
                for(let i = 0; i < 2; i++) {
                    const randomStat = stats[DeBread.randomNum(0,stats.length-1)]
                    console.log(randomStat)    
                    modifyStat(randomStat,'*=1.1')
                }
                modifyStat(stats[DeBread.randomNum(0,stats.length-1)],'*=0.75')
            }
        },
        red_mushroom: {
            name: 'Red Mushroom',
            desc: `
                Multiplies a random damage stat by <cg>1.25</cg><br>
                Multiplies a random cooldown stat by <cb>1.25</cb><br>
            `,
    
            apply: () => {
                const damageStats = [
                    ['bullet','damage'],
                    ['melee','damage'],
                    ['player','contactDamage']
                ]
                modifyStat(damageStats[DeBread.randomNum(0,damageStats.length-1)],'*=1.25')

                const cooldownStats = [
                    ['bullet','shotCooldown'],
                    ['ammo','reloadSpeed'],
                    ['melee','cooldown']
                ]
                modifyStat(cooldownStats[DeBread.randomNum(0,cooldownStats.length-1)],'*=1.25')
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
                    ['player','contactDamage']
                ]
                modifyStat(damageStats[DeBread.randomNum(0,damageStats.length-1)],'*=0.75')

                const cooldownStats = [
                    ['bullet','shotCooldown'],
                    ['ammo','reloadSpeed'],
                    ['melee','cooldown']
                ]
                modifyStat(cooldownStats[DeBread.randomNum(0,cooldownStats.length-1)],'*=0.75')
            }
        },
    },
    {
        black_hole: {
            name: 'Black Hole',
            desc: `
                Condenses half the total damage in your magazine into one bullet.<br>
                <cb>-10%</cb> Reload speed<br>
                <cb>-50%</cb> Bullet speed<br>
                <cb>+50%</cb> Shot cooldown<br>
            `,
            priceMult: 1.25,

            apply: () => {
                modifyStat(['bullet','damage'], '=(player.stats.bullet.damage*player.stats.ammo.max)/2')
                modifyStat(['ammo','max'], '=1')
                modifyStat(['ammo','reloadSpeed'], '*=1.1')
                modifyStat(['bullet','speed'], '*=0.5')
                modifyStat(['bullet','shotCooldown'], '*=1.5')
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
                // modifyStat(['bullet','splits'], '+=1') //Wayyy too laggy
            }
        },
        electric_ammo: {
            name: 'Electric Ammo',
            desc: `
                Hit bullets deal damage to <cg>+1</cg> other nearby enemies.<br>
                <em style="color: grey;">Arcs deal bullet damage / # of times arced.</em><br>
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
                Bullets hit <cg>+25</cg> times when hitting an enemy.<br>
                <cb>-90%</cb> Damage
            `,
            priceMult: 0.8,

            apply: () => {
                modifyStat(['bullet','drillTicks'], '+=25')
                modifyStat(['bullet','damage'], '*=0.1')
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
                Bullets gain a random damage multiplier between 1 and 2(<cg>+1</cg>)
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
                Multiplies a random base stat by <strong>10x</strong>
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
            Bullets explode when colliding with a wall or enemy.<br>
            <cg>+10</cg> Bullet explosion size <br>
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
        third_eye: {
            name: 'Third Eye',
            desc: `
                Every 50 ticks, <cg>+1</cg> bullets automatically shoots towards the nearest enemy.<br>
                <em style="color: grey;">Does not consume ammo.</em>
            `,
            priceMult: 1.25,

            apply: () => {
                modifyStat(['player','thirdEye'], '+=1')
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
        raccoon_tail: {
            name: 'Raccoon Tail',
            desc: `
                Enables penetrating rounds<br>
                <cg>+7</cg> Damage<br>
                <cg>+1</cg> Bullet speed<br>
                <cg>+2</cg> Luck
            `,
            
            apply: () => {
                modifyStat(['ammo','penetratingRounds'], '=true')
                modifyStat(['bullet','damage'], '+=7')
                modifyStat(['bullet','speed'], '+=1')
                modifyStat(['shop','luck'], '+=2')
            }
        },
        beret: {
            name: 'Beret',
            desc: `
                Explosives no longer deal damage to the player, but instead heal up to <cg>+5</cg> HP
            `,
            
            apply: () => {
                modifyStat(['player','explosiveHeal'], '+=5')
            }
        },
        used_needle: {
            name: 'Used Needle',
            desc: `
                Enables autofire<br>
                <cg>+20</cg> Max ammo<br>
                <cg>-75%</cg> Shot cooldown<br>
                <cb>-75%</cb> Damage
            `,
            
            apply: () => {
                modifyStat(['ammo','autoFire'], '=true')
                modifyStat(['ammo','max'], '+=20')
                modifyStat(['bullet','shotCooldown'],'*=0.25')
                modifyStat(['bullet','damage'], '*=0.25')
            }
        },
        old_laptop: {
            name: 'Old Laptop',
            desc: `
                Randomizes all player values between <strong>0.1x</strong> and <strong>10x</strong>
            `,
            priceMult: 0.75,
            
            apply: () => {
                for(const statCat in player.stats) {
                    for(const key in player.stats[statCat]) {
                        if(typeof player.stats[statCat][key] === 'number') {
                            player.stats[statCat][key] *= Math.pow(10,DeBread.randomNum(-1,1,5))
                            modifyStat([statCat,key],`=${player.stats[statCat][key]}`)
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
        chicken_alfredo: {
            name: 'Chicken Alfredo',
            desc: `
                <cg>2x</cg> Max HP<br>
                <cg>+100%</cg> HP
            `,
            priceMult: 0.9,

            apply: () => {
                modifyStat(['player','maxHealth'],'*=2')
                player.health = player.stats.player.maxHealth
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
                <cg>+20</cg> HP
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
                    
                    createPoisonField([mater.pos[0], mater.pos[1] - 10], 50, player.stats.bullet.damage * 2.5, 10, 10, false, [255,50,50])
                    createParticles(mater.pos, 10, 10, [0,50],500,'ease-out',{backgroundColor: 'red'})
    
                    DeBread.playSound('audio/splat.mp3', 0.1)
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
                Uses <cp>50</cp> POWER<br>
                Immediatly reloads your weapon.
                `,
            charge: 50,

            use: () => {
                player.stats.ammo.current = player.stats.ammo.max
                DeBread.playSound('audio/reload-long-end.mp3',0.25)
                updateUI()
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
                    ball.classList.add('tennisBall')
                    ball.classList.add('physObj')
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
                    
                    ball.move = () => {
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
                    player.immune = true
                    player.statusEffects.push({
                        end: () => {
                            modifyStat(['player','contactDamage'], '-=15')
                            player.immune = false
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

                coin.move = () => {
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

                    doge('area').querySelectorAll('.bullet').forEach(bullet => {
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
                                        bullet.pos[1] - enemy.centerPos[1],
                                        bullet.pos[0] - enemy.centerPos[0]
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
                bottle.classList.add('thrownBottle')
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

                bottle.move = (enemies) => {
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
                        bottle.remove()
                    }

                    if(bottle.pos[1] > doge('area').offsetHeight ||
                        bottle.pos[0] < 0 ||
                        bottle.pos[0] > doge('area').offsetWidth
                    ) {
                        bottle.destroy()
                    }

                    enemies.forEach(enemy => {
                        if(isColliding(bottle, enemy) && enemy.active) {
                            enemy.damage(player.stats.bullet.damage * 2)
                            enemy.isBleeding = true
                            enemy.speedMult /= 2
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
                50% chance to double all enemies
            `,
            charge: 75,

            use: () => {
                if(DeBread.randomNum(0,1) === 0) {
                    doge('area').querySelectorAll('.enemy').forEach(enemy => {
                        spawnEnemy(enemy.pos,enemies.guy,1,0)
                        enemy.kill(undefined, true)
                    })
                } else {
                    doge('area').querySelectorAll('.enemy').forEach(enemy => {
                        spawnEnemy([enemy.pos[0]+1, enemy.pos[1]+1],enemy.data,enemy.level,0)
                    })
                }
            }
        },
        supermagnet: {
            name: 'Supermagnet',
            desc: `
                Uses <cp>100</cp> POWER<br>
                Places a magnet on the ground, which attracts enemy bullets. After 500 ticks, the magnet explodes, shooting projectiles away.
            `,
            charge: 100,

            use: () => {
                const magnet = document.createElement('div')
                magnet.pos = [...e.relCursorPos]
                magnet.classList.add('supermagnet')
                addStyles(magnet, {
                    position: 'absolute',
                    translate: '-50% -50%',
                    width: '32px',
                    height: '32px',
                    left: magnet.pos[0]+'px',
                    top: magnet.pos[1]+'px',
                    backgroundImage: 'url(graphics/magnet.png)',
                    backgroundSize: '32px 32px',
                    animation: 'magnetIn 250ms cubic-bezier(.5,0,1,.5) 1 forwards'
                })

                doge('area').append(magnet)

                setTimeout(() => {
                    createParticles([magnet.pos[0]-4,magnet.pos[1]+16],10, 10, [5,25], 250, 'ease-out',{backgroundColor:'white',zIndex:'5'})
                }, 250);

                magnet.ticksActive = 0
                magnet.move = () => {
                    magnet.ticksActive++

                    if(magnet.ticksActive % 10 === 0) {
                        createParticles([magnet.pos[0],magnet.pos[1]-15],3, 10, [5,25], 250, 'ease-out',{backgroundColor:`hsl(${60 * (1 - (magnet.ticksActive / 500))}, 100%, 50%)`,zIndex:'5', borderRadius: '0'})
                    }

                    if(magnet.ticksActive > 500) {
                        magnet.destroy()
                    }
                }

                magnet.destroy = () => {
                    const explosion = document.createElement('div')
                    addStyles(explosion, {
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        translate: '-50% -50%',
                        position: 'absolute',
                        left: magnet.pos[0]+'px',
                        top: magnet.pos[1]+'px',
                        backgroundColor: 'white',
                        animation: 'magnetExplosion 250ms ease-out 1 forwards'
                    })

                    doge('area').append(explosion)
                    createParticles([...magnet.pos], 10, 25, [25, 50], 250, 'ease-out', {backgroundColor: 'white'})

                    doge('area').querySelectorAll('.enemyProjectile').forEach(projectile => {
                        const dis = Math.sqrt(
                            Math.pow(magnet.pos[0] - projectile.pos[0],2) +
                            Math.pow(magnet.pos[1] - projectile.pos[1],2)
                        )

                        if(dis <= 50) {
                            projectile.angle = Math.atan2(magnet.pos[1] - projectile.pos[1], magnet.pos[0] - projectile.pos[0])
                            projectile.parried = true
                            projectile.canHitEnemy = true
                            projectile.damage *= 3
                            projectile.speed = DeBread.randomNum(10,20,5)

                            getStyle(styles.fragmented)
                        }
                    })

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
                bottle.classList.add('thrownBottle')
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

                bottle.move = (enemies) => {
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

                        createParticles([...bottle.pos], 5, 10, [25,50], 250, 'ease-out',{backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`})
                        bottle.remove()
                    }

                    if(bottle.pos[1] > doge('area').offsetHeight ||
                        bottle.pos[0] < 0 ||
                        bottle.pos[0] > doge('area').offsetWidth
                    ) {
                        bottle.destroy()
                    }

                    enemies.forEach(enemy => {
                        if(isColliding(bottle, enemy) && enemy.active) {
                            enemy.damage(player.stats.bullet.damage * 2)
                            enemy.onFire = true
                            enemy.speedMult /= 2
                            bottle.destroy()
                        }
                    })

                    createParticles(
                        [...bottle.pos],
                        1,
                        10,
                        [25,50],
                        250,
                        'ease-out',
                        {backgroundColor: `rgb(255, ${DeBread.randomNum(0, 255)}, 0)`}
                    )
                }

                doge('area').append(bottle)
            }
        },
        the_d6: {
            name: 'The D6',
            desc: `
                Uses <cp>100</cp> POWER<br>
                Rerolls all items in the shop within their types and rarities. Rerolled items become twice as expensive.
            `,
            charge: 100,
            canUseInShop: true,
            requirement: () => {
                console.log('requirement checked!')
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
                    
                    const keys = Object.keys(itemList[elem.data.rarity])
                    const randomKey = keys[DeBread.randomNum(0,keys.length-1)]
                    const randomItem = itemList[elem.data.rarity][randomKey]

                    items.push({
                        data: randomItem,
                        id: randomKey,
                        rarity: elem.data.rarity,
                        type: elem.data.type,
                        cost: DeBread.round(rarities[elem.data.rarity].costBase * (1 + player.wave / 10) * (randomItem.priceMult ?? 1)) * 2
                    })
                })

                createShopItems(items)
            }
        },
    },
    {
        wisp: {
            name: 'Wisp',
            desc: `
                Uses <cp>75</cp> POWER<br>
                Summons a wisp on your crosshair.<br>
                Wisps fire projectiles at enemies when the player fires a projectile that deals <cg>50%</cg> of the players damage. This also ignore shot cooldown and ammo.<br>
                Wisps' projectile attributes copy the players projectile attributes.<br>
                Wisps explode after 500 ticks, dealing up to <cg>100</cg> damage.
            `,
            charge: 75,

            use: () => {
                const wisp = document.createElement('div')
                wisp.ticksActive = 0
                wisp.pos = [...e.relCursorPos]
                wisp.classList.add('wisp')
                addStyles(wisp, {
                    position: 'absolute',
                    left: wisp.pos[0]+'px',
                    top: wisp.pos[1]+'px',
                    width: '32px',
                    height: '32px',
                    translate: '-50% -50%',
                    outline: '1px solid red'
                })

                doge('area').append(wisp)

                wisp.move = () => {
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
    }
]

const elixirs = [{
    strength: {
        name: 'Strength Elixir',
        desc: `
            <cg>+0.5</cg> Damage multiplier<br>
            <cg>+0.5</cg> Melee damage multiplier
        `,
        baseCost: 100,
        costIncrease: 1.25,
        buyLimit: Infinity,
        tier: 0,

        apply: () => {
            modifyStat(['bullet','damageMult'], '+=0.5')
            modifyStat(['melee','damageMult'], '+=0.5')
        }
    },
    fighter: {
        name: 'Fighter Elixir',
        desc: `
            <cg>+1.25</cg> Melee damage multiplier
        `,
        baseCost: 100,
        costIncrease: 1.25,
        buyLimit: Infinity,
        tier: 0,

        apply: () => {
            modifyStat(['melee','damageMult'], '+=1.25')
        }
    },
    gunslinger: {
        name: 'Gunslinger Elixir',
        desc: `
            <cg>+1.25</cg> Damage multiplier
        `,
        baseCost: 100,
        costIncrease: 1.25,
        buyLimit: Infinity,
        tier: 0,

        apply: () => {
            modifyStat(['bullet','damageMult'], '+=1.25')
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
        costIncrease: 1.25,
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
        buyLimit: 10,
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
        costIncrease: 2.5,
        buyLimit: Infinity,
        tier: 0,

        apply: () => {
            modifyStat(['shop','rerolls'], '+=1')
        }
    },
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
    if(player.alive) {
        e.gameActive = false
        player.rerolls = player.stats.shop.rerolls
        doge('gameShopContainer').style.display = 'flex'
        doge('rerollPrice').innerText = `(${player.rerolls})`
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

        if(player.stats.shop.rerolls === 0) {
            doge('gameShopUpgradesButtons').style.display = 'none'
        } else {
            doge('gameShopUpgradesButtons').style.display = 'flex'
        }
        
        createShopItems(upgradeList)
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
                            cost: DeBread.round(rarities[rarity].costBase * (1 + player.wave / 10) * (randomElixir.priceMult ?? 1))
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
                    
                    if(!randomItemsIDs.includes(randomKey) && saveData.selectedChallenge !== 'abstract') {
                        itemChosen = true
                        randomItems.push({
                            data: randomItem,
                            id: randomKey,
                            rarity: rarity,
                            type: itemType,
                            cost: DeBread.round(rarities[rarity].costBase * (1 + player.wave / 10) * (randomItem.priceMult ?? 1))
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
                            cost: 10,
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

            if(player.money >= randomItems[key].cost && underBuyLimit) {
                if(itemMeta.type === 0) { //Items
                    item.apply()
                    itemSlot.sellOut()
                } else if(itemMeta.type === 1) { //Power items
                    if(player.powerItem && saveData.settings.showPowerItemWarning) {
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
        }
    }
}

function updateShopTab() {
    const powerItemDiv = doge('shopTab-powerItem').querySelector('div')
    if(player.powerItem) {
        const divRect = powerItemDiv.getBoundingClientRect()
        powerItemDiv.querySelector('img').style.opacity = '1'
        powerItemDiv.querySelector('img').src = `graphics/powerItems/${player.powerItem.name.toLowerCase().replaceAll(' ','_')}.png`

        powerItemDiv.onmouseenter = () => {
            tooltip(
                [divRect.left + powerItemDiv.offsetWidth / 2, divRect.top + powerItemDiv.offsetHeight + 24], 
                player.powerItem.name,
                [{text: 'POWER ITEM', col: 'rgb(50,50,50)'}], 
                player.powerItem.desc
            )
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
    if(player.rerolls > 0) {
        player.rerolls--
        doge('rerollPrice').innerText = `(${player.rerolls})`
        createShopItems()

        player.gameOverStats.rerolls++
    }
}

function closeShop() {
    doge('gameShopContainer').style.display = 'none'
    e.gameActive = true

    doge('area').querySelectorAll('.portal').forEach(portal => {
        addStyles(portal, {
            width: '0px',
            height: '0px',
            border: '1px solid white'
        })

        setTimeout(() => {
            portal.remove()
            player.elem.style.scale = '1'
            player.stats.player.pickupRange -= 10
            doge('weapon').style.scale = '1'
        }, 1000);
    })

    setTimeout(() => {
        player.wavesPaused = false
        player.lastWaveDate = -1e67
        player.inPortal = false
    }, 2000);

    if(player.tutorial.stage === 20) {
        player.tutorial.goalValue++
        updateTutorialGoal()
    }
}