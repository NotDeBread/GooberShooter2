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

function modifyStat(stat, modifier, reverse) {
    const startingValue = player.stats[stat[0]][stat[1]]

    eval('player.stats[stat[0]][stat[1]]' + modifier)
    fixStats()

    doge(`${stat[0]}-${stat[1]}`).innerText = DeBread.round(player.stats[stat[0]][stat[1]],2)

    const change = player.stats[stat[0]][stat[1]] - startingValue
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

//Planned rarity distribution
//Common 50%
//Uncommon 40%
//Rare 9.9%
//Mythic 0.1%
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
        magnet: {
            name: 'Magnet',
            desc: `
                <cg>+0.25</cg> Pickup pull strength
            `,

            apply: () => {
                modifyStat(['player','pickupRange'], '+=0.25')
            }
        },
        rock: {
            name: 'Rock',
            desc: `
                <cg>+1</cg> Damage
            `,
            
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
                <cg>+10</cg> Damage<br>
                After firing a projectile, take <cb>+0.5</cb> damage.<br>
                <em style="color:grey;">Does not damage player when at 1HP or less.</em>
            `,

            apply: () => {
                modifyStat(['bullet','damage'], '+=10')
                modifyStat(['bullet','thornDamage'], '+=0.5')
            }
        },
        pepto_bismol: {
            name: 'Pepto Bismol',
            desc: `
                Parried bullets spawn poison fields on impact.
            `,

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

            apply: () => {
                modifyStat(['bullet','drillTicks'], '+=2')
                modifyStat(['bullet','damage'], '+=2')
                modifyStat(['bullet','speed'], '*=0.75')
            }
        },
        explosive_ammo: {
            name: 'Explosive Ammo',
            desc: `
            Bullets explode when colliding with a wall or enemy.<br>
            <cg>+10</cg> Bullet explosion size <br>
            <em style="color: grey;">Explosions can damage player.</em>
            `,
            
            apply: () => {
                modifyStat(['bullet','explosionSize'], '+=10')
            }
        },
        magnetic_ammo: {
            name: 'Magnetic Ammo',
            desc: `
                Bullets become attracted towards the nearest enemy.<br>
                <cb>-20%</cb> Max ammo
            `,

            apply: () => {
                modifyStat(['bullet','magnetStrength'], '+=0.2')
                modifyStat(['ammo','max'], '*=0.8')
            }
        },
        goat_head: {
            name: 'Goat Head',
            desc: `
                Reduces max HP to <cb>10</cb>.<br>
                Gives <cg>+0.5</cg> Damage for each health point taken.
            `,

            apply: () => {
                modifyStat(['bullet','damage'], `+=(player.stats.player.maxHealth-10)/2`)
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
                Every 100 ticks, spawn a electricity field on a random enemy, dealing +<cg>75%</cg> of your damage.
            `,

            apply: () => {
                modifyStat(['player','socksDamage'], '+=0.75')
            }
        },
        third_eye: {
            name: 'Third Eye',
            desc: `
                Every 50 ticks, <cg>+1</cg> bullets automatically shoots towards the nearest enemy.<br>
                <em style="color: grey;">Does not consume ammo.</em>
            `,

            apply: () => {
                modifyStat(['player','thirdEye'], '+=1')
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
            name: 'Entendo Grip',
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

            apply: () => {
                modifyStat(['bullet','drillTicks'], '+=25')
                modifyStat(['bullet','damage'], '*=0.1')
            }
        },
        OP_hourglass: {
            name: 'OP Hourglass',
            desc: `
                All passive abilities trigger twice as often.<br>
                <em style="color: grey;">Every 100 ticks... --> Every 50 ticks</em>
            `,

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
    },
    {
        sog: {
            name: 'Sog',
            rarity: 6,
            desc: `
                <cg>+sog</cg>
            `,

            apply: () => {
                window.alert('sog')
            }
        },
        poop_upgrade: {
            name: 'Poop Upgrade',
            rarity: 5,
            desc: `
                Dont use this<br>
                <cb>This will literally soft-lock your game so watch out</cb>
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
            rarity: 5,
            desc: `
                Creates a giant explosion, dealing <cg>10,000</cg> damage.
            `,

            apply: () => {
                createExplosion([doge('area').offsetWidth / 2, doge('area').offsetHeight / 2], doge('area').offsetWidth, 10000, 250, true)
            }
        },
        dummy_nuke: {
            name: 'Dummy Nuke',
            rarity: 5,
            desc: `
                Creates a giant explosion, dealing <strong>0</strong> damage.
            `,

            apply: () => {
                createExplosion([doge('area').offsetWidth / 2, doge('area').offsetHeight / 2], doge('area').offsetWidth, 0, 250, true)
            }
        },
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
                Throws a tomato at your cursor, spawning a poison field that deals <cg>100%</cg> of your damage for 10 ticks.
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
                    
                    createPoisonField(mater.pos, 50, player.stats.bullet.damage, 10, 10, false, [255,50,50])
                    createParticles(mater.pos, 10, 10, [0,50],500,'ease-out',{backgroundColor: 'red'})
    
                    DeBread.playSound('audio/splat.mp3', 0.1)
                }, 3000);
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
    },
    {
        pepper: {
            name: 'Pepper',
            desc: `
                Uses <cp>75</cp> POWER<br>
                <em style="color:grey;">For 10 seconds:</em><br>
                <cg>+5</cg> Speed<br>
                <cg>+25</cg> Contact damage
            `,
            charge: 75,

            use: () => {
                modifyStat(['player','speed'], '+=5')
                modifyStat(['player','contactDamage'], '+=25')
                player.statusEffects.push({
                    end: () => {
                        modifyStat(['player','speed'], '-=5')
                        modifyStat(['player','contactDamage'], '-=25')

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
                <br>
                <em style="color: grey;">If Tennis Ball is active:</em><br>
                Dash towards the Tennis Ball, temporarily gaining <cg>+50</cg> contact damage and immunity. 
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
                    }
                } else {
                    const ball = document.querySelector('.tennisBall')
                    const angle = Math.atan2(ball.pos[1] - player.centerPos[1], ball.pos[0] - player.centerPos[0])
                    player.dirVels.push({
                        angle: angle,
                        speed: 50,
                        div: 1.1
                    })

                    modifyStat(['player','contactDamage'], '+=100')
                    player.immune = true
                    player.statusEffects.push({
                        end: () => {
                            modifyStat(['player','contactDamage'], '-=100')
                            player.immune = false
                        },
                        class: 'dash',
                        duration: (1000 / e.gameUpdateInterval) * 1,
                        maxDuration: (1000 / e.gameUpdateInterval) * 1
                    })

                    createParticles([...ball.pos], 5, 16, [0, 16], 250, 'ease-out',{backgroundColor: '#72b570'})
                    ball.remove()
                }
            }
        }
    },
    {
        coin: {
            name: 'Coin',
            desc: `
                Uses <cp>25</cp> POWER and <cp>$1</cp><br>
                Throws a coin in the air. Shooting a coin redirects the bullet towards the nearest coin or enemy, dealing <cg>2x</cg> damage
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
                    outline: '1px solid red',
                    position: 'absolute',
                    left: coin.pos[0]+'px',
                    top: coin.pos[1]+'px',
                    translate: '-50% -50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                })
                coin.innerHTML = '<img src="graphics/throwableCoin.png" width=16>'

                coin.move = () => {
                    coin.pos[0] += Math.cos(coin.angle) * coin.speed 
                    coin.pos[1] += Math.sin(coin.angle) * coin.speed + coin.grav
                    coin.speed /= 1.05
                    coin.grav += 0.25

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

                            bullet.damage *= 2
                            bullet.speed = 25

                            // createParticles()
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
                Dashes towards your cursor<br>
                <em style="color: grey;">During this dash:</em><br>
                <cg>+100</cg> Contact damage<br>
                Immunity
                .
            `,
            charge: 0,

            use: () => {
                const angle = Math.atan2(e.relCursorPos[1] - player.centerPos[1], e.relCursorPos[0] - player.centerPos[0])

                modifyStat(['player','contactDamage'], '+=100')
                player.immune = true
                player.statusEffects.push({
                    end: () => {
                        modifyStat(['player','contactDamage'], '-=100')
                        player.immune = false
                    },
                    class: 'dash',
                    duration: (1000 / e.gameUpdateInterval) * 1,
                    maxDuration: (1000 / e.gameUpdateInterval) * 1
                })

                player.dirVels.push({angle: angle, speed: 25, div: 1.1})
            }
        }
    },
    {},
]

const rarities = [
    {name: 'COMMON', color: 'grey'},
    {name: 'UNCOMMON', color: 'rgb(66, 112, 62)'},
    {name: 'RARE', color: 'rgb(61, 123, 151)'},
    {name: 'EPIC', color: 'rgb(103, 61, 151)'},
    {name: 'MYTHIC', color: 'linear-gradient(to left, rgba(64, 155, 158, 1), rgba(134, 68, 172, 1))'},
    {name: 'SANDBOX', color: 'rgb(164, 140, 73)'}
]

function openShop(upgradeList) {
    if(player.alive) {
        e.gameActive = false
        player.rerolls = player.stats.shop.rerolls
        doge('gameShopContainer').style.display = 'flex'
        doge('rerollPrice').innerText = `(${player.rerolls})`

        if(player.stats.shop.rerolls === 0) {
            doge('gameShopUpgradesButtons').style.display = 'none'
        } else {
            doge('gameShopUpgradesButtons').style.display = 'flex'
        }
        
        createShopUpgrades(upgradeList)
    }
}

function createShopUpgrades(upgradeList) {
    let randomUpgrades
    if(upgradeList) {
        randomUpgrades = upgradeList
    } else {
        randomUpgrades = []
    }
    
    let upgradeAttempts = 0
    if(!upgradeList) {
        while((randomUpgrades.length < player.stats.shop.upgrades && upgradeAttempts < 1000)) {
            let rarity = 0
            const randomRarityNum = DeBread.randomNum(0,1,100)
            
            const luck = player.stats.shop.luck / 2
            let weights = [
                55 + luck,
                27 + 1.25*luck,
                16 + 1.25*luck,
                1.95 + 1.25*luck,
                0.01 + 0.05*luck
            ]
            let total = weights[0]+weights[1]+weights[2]+weights[3]+weights[4]
            let proportions = [
                weights[0]/total,
                weights[1]/total+weights[0]/total,
                weights[2]/total+weights[1]/total+weights[0]/total,
                weights[3]/total+weights[2]/total+weights[1]/total+weights[0]/total,
                weights[4]/total+weights[3]/total+weights[2]/total+weights[1]/total+weights[0]/total,
            ]
            
            for(let i = 0; i < proportions.length; i++) {
                if(randomRarityNum < proportions[i]) {
                    rarity = i
                    break
                }
            }
            
            const upgradeKeys = Object.keys(upgrades[rarity])
            const randomUpgrade = upgradeKeys[DeBread.randomNum(0,upgradeKeys.length - 1)]
            
            if(!randomUpgrades.some(u => u.id === randomUpgrade && u.rarity === rarity)) {
                randomUpgrades.push({id: randomUpgrade, rarity: rarity})
            }
    
            upgradeAttempts++
        }
    }
    
    if(upgradeAttempts >= 1000) {
        randomUpgrades.push({id: 'rock', rarity: 0})
    }

    doge('gameShopUpgrades').querySelectorAll('.shopUpgrade').forEach(elem => {elem.remove()})

    const upgradeSlotBase = document.createElement('div')
    upgradeSlotBase.classList.add('shopUpgrade')
    upgradeSlotBase.innerHTML = `
        <span class="shopUpgradePrice">$25</span>
        <img src="graphics/placeholder.png">
    `
    for(const key in randomUpgrades) {
        const rarity = randomUpgrades[key].rarity
        const id = randomUpgrades[key].id.toString()

        const upgrade = {
            price: upgrades[rarity][id].price ?? Math.pow(4,rarity+1),
            data: upgrades[rarity][id]
        }
        const upgradeSlot = upgradeSlotBase.cloneNode(true)
        doge('gameShopUpgrades').append(upgradeSlot)
        upgradeSlot.querySelector('.shopUpgradePrice').innerText = '$' + formatNumber(upgrade.price)
        upgradeSlot.querySelector('img').src = `graphics/upgrades/${randomUpgrades[key].id}.png`

        if(rarity === 4) {
            upgradeSlot.style.animation = 'mythicBorder 5s linear infinite forwards'
            upgradeSlot.querySelector('img').style.animation = 'mythicGlow 5s linear infinite forwards'
        } else {
            upgradeSlot.querySelector('img').style.filter = `drop-shadow(0px 0px 5px ${rarities[rarity].color})`
        }

        upgradeSlot.onclick = () => {
            if(upgrade.price <= player.money) {
                upgradeSlot.style.pointerEvents = 'none'
                upgradeSlot.querySelector('.shopUpgradePrice').innerText = 'SOLD OUT'
                upgradeSlot.style.filter = 'grayscale(1) brightness(50%)'
                upgrades[rarity][randomUpgrades[key].id].apply()
                updateUI()

                player.getMoney(-upgrade.price)

                if(player.tutorial.stage === 17) {
                    player.tutorial.goalValue++
                    updateTutorialGoal()
                }
            }
        }

        upgradeSlot.onmouseenter = () => {
            const upgradeRect = upgradeSlot.getBoundingClientRect()
            tooltip([upgradeRect.left + upgradeSlot.offsetWidth / 2, upgradeRect.top + upgradeSlot.offsetHeight + 12], upgrade.data.name, rarity, upgrade.data.desc, upgrade.price)
        }

        upgradeSlot.onmouseleave = () => {
            doge('tooltip').style.opacity = '0'
        }
    }
}

function rerollShop() {
    if(player.rerolls > 0) {
        player.rerolls--
        doge('rerollPrice').innerText = `(${player.rerolls})`
        createShopUpgrades()
    }
}

function closeShop() {
    doge('gameShopContainer').style.display = 'none'
    e.gameActive = true

    doge('area').querySelectorAll('.portal').forEach(portal => {
        addStyles(portal, {
            width: '0px',
            height: '0px'
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

    if(player.tutorial.stage === 18) {
        player.tutorial.goalValue++
        updateTutorialGoal()
    }
}