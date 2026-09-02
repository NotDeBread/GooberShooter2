const weaponPresets = {
    none: {
        name: 'None',
        desc: 'No weapon',
        ammoChar: '❌',
        textureSize: [0,0],

        pros: [],
        cons: [],

        apply: () => {
            modifyStat(['ammo','max'],'=0')
        }
    },
    gun: {
        name: 'Gun',
        desc: 'Standard gun',
        ammoChar: '|',
        textureSize: [11,7],
        pros: [],
        cons: [],

        apply: () => {}
    },
    luke: {
        name: 'Fists',
        desc: `
            What is he parrying with? <br>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px; color: white; font-style: normal; font-size: 1.25em;">
                <img src="graphics/weapons/MP5SD.png" style="height: 24px;">
                <span>MP5SD</span>
            </div>
            A well-worn silenced SMG. Stuck in burst fire, refitted for 10mm. More damage, but harder to aim.
        `,
        ammoChar: '|',
        textureSize: [0,0],
        pros: [],
        cons: [],

        apply: () => {
            modifyStat(['bullet','silentShot'],'=true')
            modifyStat(['bullet','physRecoil'], '=0')
            modifyStat(['bullet','shotParticles'],'=false')
            modifyStat(['bullet','damage'],'=8')
            modifyStat(['bullet','accuracy'],'=50')
            modifyStat(['bullet','shotCooldown'],'=50')
            modifyStat(['ammo','burst'],'=5')
            modifyStat(['ammo','max'],'=30')
            modifyStat(['ammo','reloadSpeed'],'=60')
            modifyStat(['ammo','burstInterval'],'=2')


            player.onShoot = proj => {
                proj.remove()

                document.querySelectorAll('.mary').forEach(mary => {
                    mary.shoot()
                })
            }

            player.shootRequirement = () => {
                let maryAlive = false
                doge('area').querySelectorAll('.mary').forEach(mary => {
                    if(mary.alive) {
                        maryAlive = true                        
                    }
                })

                return maryAlive
            }

            player.onWaveIncrease = () => {
                doge('area').querySelectorAll('.mary').forEach(mary => {
                    mary.damage(-player.stats.player.maxHealth/10)
                })
            }

            upgrades[5].mary.apply()
        }
    },
    odstPistol: {
        name: 'ODST Pistol',
        desc: 'halo',
        ammoChar: '|',
        textureSize: [12,8],
        pros: [
            'Max ammo',
            'Accuracy'
        ],
        cons: [],

        apply: () => {
            modifyStat(['ammo','max'],'=12')
            modifyStat(['bullet','accuracy'],'=2')
        }
    },
    shotgun: {
        name: 'Shotgun',
        desc: 'Shoots multiple short range bullets.',
        ammoChar: '|',
        textureSize: [18,9],
        bulletTexture: true,

        pros: [
            'Multi-shot',
            'Bullet speed',
            'Damage',
        ],
        cons: [
            'Range',
            'Reload speed',
            'Shot cooldown',
            'Shrinking bullets',
            'Recoil'
        ],

        apply: () => {
            modifyStat(['bullet','damage'],'=10')
            modifyStat(['bullet','speed'], '=15')
            modifyStat(['bullet','multishot'], '=8')
            modifyStat(['bullet','grow'], '=-10')

            modifyStat(['ammo','reloadSpeed'], '=75')
            modifyStat(['ammo','max'], '=32')
            modifyStat(['bullet','range'], '=7')
            modifyStat(['bullet','shotCooldown'], '=25')
            modifyStat(['bullet','recoil'], '=3')
        }
    },
    riot_shotgun: {
        name: 'Riot Shotgun',
        desc: 'Loaded with rock salt. Less than lethal, but painful.',
        ammoChar: '|',
        textureSize: [26,10],

        pros: [
            'Multi-shot',
            'Bullet speed',
            'Slowing ammo',
            'Damage',
        ],
        cons: [
            'Range',
            'Reload speed',
            'Shot cooldown',
            'Shrinking bullets',
            'Recoil'
        ],

        apply: () => {
            modifyStat(['bullet','damage'],'=5')
            modifyStat(['bullet','speed'], '=20')
            modifyStat(['bullet','multishot'], '=10')
            modifyStat(['bullet','grow'], '=-7')
            modifyStat(['ammo','max'], '=50')
            modifyStat(['bullet','slow'], '=0.25')

            modifyStat(['ammo','reloadSpeed'], '=100')
            modifyStat(['bullet','range'], '=7')
            modifyStat(['bullet','shotCooldown'], '=30')
            modifyStat(['bullet','recoil'], '=2')
        }
    },
    garand: {
        name: 'Garand',
        desc: 'Shoots high speed and damage bullets, but can only be reload when ammo is at 0.',
        ammoChar: '|',
        textureSize: [41,9],

        pros: [
            'Damage',
            'Bullet speed',
            'Shot cooldown'
        ],
        cons: [
            'Reload speed',
            'Max ammo'
        ],

        apply: () => {
            modifyStat(['bullet','damage'], '=5')
            modifyStat(['bullet','speed'], '=20')
            modifyStat(['bullet','shotCooldown'], '=1')

            modifyStat(['ammo','reloadSpeed'], '=100')
            modifyStat(['ammo','max'], '=8')

            modifyStat(['ammo','garandReload'], '=true')
            modifyStat(['player','maxWeaponDistance'],'=60')
        }
    },
    sniper: {
        name: 'Sniper',
        desc: 'Long range weapon with increased damage and ammunition that has a chance to apply bleeding to enemies.',
        ammoChar: '|',
        textureSize: [20,9],
        pros: [
            'Damage',
            'Bullet speed',
            'Sharp rounds'
        ],
        cons: [
            'Reload Speed',
            'Shot cooldown',
            'Max ammo'
        ],

        apply: () => {
            modifyStat(['bullet','damage'], '=25')
            modifyStat(['bullet','speed'], '=15')
            modifyStat(['bullet','sharpChance'], '=15')

            modifyStat(['ammo','max'], '=3')
            modifyStat(['ammo','reloadSpeed'], '=80')
            modifyStat(['bullet','shotCooldown'], '=15')

            updateUI()
        }
    },
    brick: {
        name: 'Brick',
        desc: 'Brick. It\'s fun.',

        pros: [
            'Charging rounds'
        ],

        cons: [
            'Accuracy'
        ]
    },
    piss: {
        name: 'Piss',
        desc: 'PISSES EVERYWHERE.',
        ammoChar: '|',
        textureSize: [16,12],
        bulletTexture: true,

        pros: [
            'Max Ammo',
            'Shot cooldown',
            'Poisonous Bullets'
        ],
        cons: [
            'Bullet size',
            'Knockback'
        ],

        apply: () => {
            modifyStat(['bullet','shotCooldown'], '=1')
            modifyStat(['ammo','max'], '=50')
            modifyStat(['ammo','current'], '=50')
            modifyStat(['bullet','poisonFieldChance'], '=100')
            modifyStat(['bullet','poisonFieldSize'], '=25')
            modifyStat(['bullet','poisonFieldTicks'], '=3')
            modifyStat(['bullet','poisonFieldDmgPercent'], '=25')
            modifyStat(['bullet','poisonFieldColor'], '=[186, 161, 39]')
            modifyStat(['bullet','knockback'], '=0.1')
            
            modifyStat(['ammo','reloadSpeed'], '=125')
            modifyStat(['bullet','damage'], '=2.5')
            modifyStat(['ammo','autoFire'], '=true')

            modifyStat(['bullet','shotParticleColor'], '=[186, 161, 39]')
        }
    },
    bite: {
        name: 'Bite',
        desc: 'Releases a short-range wave of energy, passing through multiple enemies.',
        ammoChar: '|',
        textureSize: [0,0],
        bulletTexture: true,

        pros: [
            'Damage',
            'Drill ticks',
            'Bullet size',
            'Reload speed',
        ],
        cons: [
            'Range',
            'Shot cooldown',
            'Bullet speed',
            'Max ammo'
        ],

        apply: () => {
            modifyStat(['bullet','drillTicks'], '=8')
            modifyStat(['bullet', 'damage'], '=15')
            modifyStat(['ammo','reloadSpeed'], '=10')
            modifyStat(['bullet','size'], '=50')
            
            modifyStat(['bullet','range'], '=8')
            modifyStat(['bullet','shotCooldown'], '=20')
            modifyStat(['bullet','speed'], '=1')
            modifyStat(['ammo','max'], '=1')
        }
    },
    cannon: {
        name: 'Cannon',
        desc: 'Creates a very large and slow explosive.',
        ammoChar: '⏺',
        textureSize: [21,9],

        pros: [
            'Damage',
            'Explosive',
            'Bullet size',
        ],

        cons: [
            'Shot cooldown',
            'Reload Speed',
            'Recoil'
        ],
        
        apply: () => {
            modifyStat(['bullet','damage'], '=50')
            modifyStat(['bullet','explosionSize'], '=100')
            modifyStat(['bullet','size'], '=25')

            modifyStat(['bullet','speed'], '=5')
            modifyStat(['ammo','reloadSpeed'], '=100')
            modifyStat(['bullet','shotCooldown'], '=30')

            modifyStat(['bullet','recoil'], '=15')
        }
    },
    mounted_machine_gun: {
        name: 'Mounted Machine Gun',
        desc: 'A high fire-rate machine gun that can only be shot when standing still.',
        textureSize: [40,14],
        ammoChar: '|',

        pros: [
            'Shot cooldown',
            'Max ammo'
        ],

        cons: [
            'Reload speed',
            'Damage',
            'Stationary fire'
        ],
        
        apply: () => {
            modifyStat(['bullet','shotCooldown'], '=1')
            modifyStat(['ammo','max'], '=50')
            modifyStat(['ammo','current'], '=50')
            
            modifyStat(['ammo','reloadSpeed'], '=100')
            modifyStat(['bullet','damage'], '=5')
            modifyStat(['ammo','autoFire'], '=true')
            modifyStat(['ammo','stationaryFire'], '=true')
        }
    },
    spicy_gun: {
        name: 'Spicy Gun',
        desc: 'A low firerate pepper that fires other peppers, spawning poison fields.',
        textureSize: [12,8],
        bulletTexture: true,
        ammoChar: '🌶️',

        pros: [
            'Poison field chance',
            'Damage Multiplier'
        ],

        cons: [
            'Shot cooldown'
        ],
        
        apply: () => {
            modifyStat(['bullet','poisonFieldChance'], '=100')
            modifyStat(['bullet','poisonFieldSize'], '=100')
            modifyStat(['bullet','poisonFieldTicks'], '=5')
            modifyStat(['bullet','poisonFieldDmgPercent'], '=40')
            modifyStat(['bullet','poisonFieldColor'],'=[255,100,0]')
            modifyStat(['bullet','size'], '=40')
            modifyStat(['bullet','shotCooldown'], '=10')
            modifyStat(['bullet','damageMult'], '=1.5')
        }
    },
    flintlock: {
        name: 'Flintlock',
        desc: 'A single shot pistol that has extreme damage and recoil.',
        textureSize: [16,9],
        ammoChar: '|',

        pros: [
            'Damage',
            'Bullet speed'
        ],

        cons: [
            'Max ammo',
            'Recoil'
        ],
        
        apply: () => {
            modifyStat(['bullet','damage'], '=30')
            modifyStat(['bullet','speed'], '=15')
            
            modifyStat(['ammo','max'], '=1')
            modifyStat(['bullet','recoil'], '=10')
        }
    },
    bubble_blower: {
        name: 'Bubble Blower',
        desc: 'A regular weapon which can be charged to fire projectiles for 5x Damage. Hold Left Click to fire stronger projectiles.',
        textureSize: [5,8],
        ammoChar: '🫧',
        bulletTexture: true,

        pros: [
            'Charging rounds',
            'Damage'
        ],
        cons: ['Bullet speed'],

        apply: () => {
            modifyStat(['bullet','speed'], '=5')
            modifyStat(['bullet','damage'], '=6.1')

            modifyStat(['ammo','chargeShot'], '=true')
            modifyStat(['ammo','chargeTime'], '=100')
            modifyStat(['ammo','chargeMultCap'], '=10')
        }
    },
    staff: {
        name: 'Staff',
        desc: 'Summons an orb of electricity the moves through enemies dealing electric damage.',
        textureSize: [25,5],
        ammoChar: '|',
        animatedBulletTexture: true,

        pros: [
            'Drill ticks',
            'Electric chain length',
            'Electric chain reach',
            'Bullet size'
        ],
        cons: [
            'Damage',
            'Bullet speed'
        ],

        apply: () => {
            modifyStat(['bullet','drillTicks'], '=25')
            modifyStat(['bullet','electricChainLength'], '=3')
            modifyStat(['bullet','electricChainReach'], '=100')
            modifyStat(['bullet','size'], '=20')

            modifyStat(['bullet','damage'], '=2')
            modifyStat(['bullet','speed'], '=2')
        }
    },
    meatCleaver: {
        name: 'Meat Cleaver',
        desc: 'youch.',
        textureSize: [8,16],
        ammoChar: '🔪',
        bulletTexture: true,

        pros: [
            'Drill ticks',
            'Damage',
            'Bullet size'
        ],
        cons: [
            'Damage multiplier',
            'Shot cooldown',
        ],

        apply: () => {
            modifyStat(['bullet','drillTicks'], '=25')
            modifyStat(['bullet','damageMult'], '=0.2')
            modifyStat(['bullet','shotCooldown'], '=10')
            modifyStat(['bullet','size'], '=32')
            modifyStat(['bullet','spin'], '=20')
        }
    },
    omnirifle: {
        name: 'Omnirifle',
        desc: 'Projectiles shot by this weapon get a weak version of every bullet effect.',
        textureSize: [34,16],
        ammoChar: '|',

        pros: [
            'Splits',
            'Bouncy ammo',
            'Drill ticks',
            'Explosive ammo',
            'Parasite ammo',
            'Electric ammo',
            'Knockback',
            'Multishot',
            'Poison field ammo',
            'Magnetic ammo',
            'Fluctuating damage',
            'Growing ammo',

        ],
        cons: [
            'Prickly ammo',
        ],

        apply: () => {
            modifyStat(['bullet','split'], '=2')
            modifyStat(['bullet','bounces'], '=1')
            modifyStat(['bullet','drillTicks'], '=2')
            modifyStat(['bullet','explosionSize'], '=50')
            modifyStat(['bullet','heal'], '=0.1')
            modifyStat(['bullet','electricChainLength'], '=1')
            modifyStat(['bullet','electricChainReach'], '=10')
            modifyStat(['bullet','knockback'], '=2')
            modifyStat(['bullet','multishot'], '=2')
            modifyStat(['bullet','poisonFieldChance'],'=1')
            modifyStat(['bullet','poisonFieldSize'],'=50')
            modifyStat(['bullet','poisonFieldTicks'], '=1')
            modifyStat(['bullet','poisonFieldDmgPercent'],'=50'),
            modifyStat(['bullet','magnetStrength'], '=0.1')
            modifyStat(['bullet','randDmgMult'],'=1.5')
            modifyStat(['bullet','grow'],'=0.1')

            modifyStat(['bullet','thornDamage'],'=0.25')
        }
    },
    baretta_93r: {
        name: 'Baretta 93r',
        desc: '',
        textureSize: [16,11],
        ammoChar: '|',

        pros: [
            'Max ammo',
            'Burst'
        ],
        cons: [
        ],

        apply: () => {
            modifyStat(['ammo','max'], '=15')
            modifyStat(['ammo','burst'], '=3')
        }
    },
    fire_paws: {
        name: 'Fire Paws',
        desc: 'Hot firey paws, living grill and barbecue',
        ammoChar: '🔥',
        textureSize: [0,0],
        bulletTexture: true,

        pros: [
            'Firey ammo',
            'Explosive ammo',
            'Damage'
        ],
        cons: [
            'Speed loss',
            'Weapon reach'
        ],

        apply: () => {
            modifyStat(['bullet','damage'],'=10')
            modifyStat(['bullet','speedDiv'],'=1.1')
            modifyStat(['bullet','range'],'=50')
            modifyStat(['bullet','explosionSize'],'=75')
            modifyStat(['player','maxWeaponDistance'],'=25')
            modifyStat(['player','explosiveHeal'], '=0.00001')
            modifyStat(['bullet','fireyAmmo'],'=true')
        }
    },
    horse_weapon: {
        name: 'horse weapon',
        desc: 'horse weapon description',
        ammoChar: '🐎',
        textureSize: [32,16],
        bulletTexture: true,

        pros: [
            'Stat up per wave'
        ],
        cons: [],

        apply: () => {
            modifyStat(['bullet','spin'],'=10')
            modifyStat(['misc','horseWeapon'],'=true')
        }
    },
    quiver_of_malice: {
        name: 'Quiver of Malice',
        desc: 'horse weapon description',
        ammoChar: '🏹',
        textureSize: [0,0],
        bulletTexture: true,

        pros: [],
        cons: [],

        apply: () => {
            modifyStat(['ammo','burst'],'=Infinity')
        }
    },
    tears: {
        name: 'Tears',
        desc: '',
        ammoChar: '💧',
        textureSize: [0,0],
        bulletTexture: true,

        pros: [
            'Infinite ammo',
            'Projectile size',
            'Autofire'
        ],
        cons: [
            'Shot cooldown',
        ],

        apply: () => {
            modifyStat(['ammo','max'],'=Infinity')
            modifyStat(['bullet','size'],'=20')
            modifyStat(['ammo','autoFire'],'=true')
            modifyStat(['bullet','shotCooldown'],'=20')
        }
    },
    guitar: {
        name: 'Guitar',
        desc: '',
        textureSize: [12,20],
        ammoChar: '🎵',
        bulletTexture: true,

        pros: [
        ],
        cons: [
        ],

        apply: () => {
            modifyStat(['player','maxWeaponDistance'],'=25')
            modifyStat(['bullet','size'],'=14')
            modifyStat(['bullet','lockRot'], '=true')
            modifyStat(['bullet','silentShot'], '=true')

            player.onShoot = proj => {
                DeBread.playSound('audio/ahh.mp3',DeBread.randomNum(0.9,1.1,10), false)
            }
        }
    },
    keytar: {
        name: 'Keytar',
        desc: '',
        textureSize: [8,20],
        ammoChar: '|',
        bulletTexture: true,

        pros: [
            'Ghost ammo'
        ],
        cons: [
        ],

        apply: () => {
            modifyStat(['player','maxWeaponDistance'],'=30')
            modifyStat(['bullet','size'],'=14')
            modifyStat(['bullet','silentShot'], '=true')
            modifyStat(['bullet','shotParticleColor'],'=[97, 231, 166]')
            modifyStat(['bullet','drillTicks'],'=20')
            modifyStat(['bullet','damageInterval'],'=3')

            player.onShoot = proj => {
                if(player.currentNoteSFX) {
                    player.currentNoteSFX++
                    if(player.currentNoteSFX > 4) {
                        player.currentNoteSFX = 1
                    }
                } else {
                    player.currentNoteSFX = 1
                }

                DeBread.playSound(`audio/note${player.currentNoteSFX}.mp3`)
            }
        }
    },
    crossbow: {
        name: 'Crossbow',
        desc: 'Long ranged weapon with charging capabilities.',
        textureSize: [18,11],
        ammoChar: '🏹',
        bulletTexture: true,

        pros: [
            'Charging rounds',
            'Damage',
            'Bullet speed',
            'Bullet size'
        ],
        cons: [
            'Reload speed',
            'Max ammo',
        ],

        apply: () => {
            modifyStat(['bullet','damage'],'=15')
            modifyStat(['bullet','speed'],'=12')
            modifyStat(['bullet','shotCooldown'],'=10')
            modifyStat(['bullet','size'],'=16')
            modifyStat(['ammo','reloadSpeed'],'=125')
            modifyStat(['ammo','max'],'=5')

            modifyStat(['ammo','chargeShot'], '=true')
            modifyStat(['ammo','chargeTime'], '=75')
            modifyStat(['ammo','chargeMultCap'], '=5')
        }
    }
}

const characters = {
    debread: {
        name: 'Bread',
        desc: 'Some guy',
        color: [244, 175, 84],

        tagList: [
            {text: 'Fox',col:'#e0a24a'},
            {text: 'GS1',col:'#e0a24a'}
        ],

        weapon: weaponPresets.gun,

        skins: [
            {
                name: 'Arctic Bread',
                src: 'arctic_debread',

            },
            {
                name: 'Legacy Bread',
                src: 'debread_old',
            },
            {
                name: 'Legacy Arctic Bread',
                src: 'arctic_debread_old',
            },
            {
                name: 'Cliff',
                src: 'cliff',
            }
        ]
    },
    fella: {
        name: 'Fella',
        desc: 'Some guy but real',
        info: `Starts with the \'Poker Chip\' Power Item.<br>${powerItems[1].poker_chip.desc}`,
        color: [84, 84, 84],

        tagList: [
            {text: 'Raccoon',col:'#775db9'},
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.sniper,

        applyStats: () => {
            player.powerItem = powerItems[1].poker_chip
        },

        skins: [
            {
                name: 'Legacy Fella',
                src: 'fella_old',
                taunts: 1,
            },
        ]
    },
    plonk: {
        name: 'Plonk',
        desc: 'Some other guy',
        color: [127, 127, 127],

        tagList: [
            {text:'Cat',col:'#484848'},
            {text:'GS1',col:'#e0a24a'},
            {text:'Plinkel Pack',col:'#386942'},
        ],

        weapon: weaponPresets.piss,

        skins: [
            {
                name: 'Legacy Plonk',
                src: 'plonk_old',
                taunts: 9,
            },
        ]
    },
    ashton: {
        name: 'Ashton',
        desc: 'bro thinks hes james sunderland',
        color: [105, 51, 78],
        unlockable: true,

        tagList: [
            {text:'Arctic Fox',col:'#5996a8'},
            {text:'GS2',col:'#775db9'},
            {text:'Plinkel Pack',col:'#386942'},
        ],

        weapon: weaponPresets.shotgun
    },
    tammy: {
        name: 'Tammy',
        desc: 'Some other other guy',
        color: [76, 81, 128],
        unlockable: true,

        tagList: [
            {text:'Dire Wolf',col:'#9397b6'},
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],
        
        weapon: weaponPresets.garand
    },
    lorna: {
        name: 'Lorna Walker',
        desc: 'ACAB? Even her?',
        color: [45, 27, 30],
        taunts: 1,
        unlockable: true,

        tagList: [
            {text:'Black Wolf',col:'#592c23'},
            {text:'GS2',col:'#775db9'},
            {text:'Plinkel Pack',col:'#386942'},
        ],

        weapon: weaponPresets.riot_shotgun
    },
    luke: {
        name: 'Luke & Mary',
        desc: 'They\'ve survived worse.',
        color: [255,255,255],
        unlockable: true,
        pros: [
            'Melee size',
            'Melee damage',
        ],

        tagList: [
            {text:'Red Fox & BK',col:'#582A7A'},
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],

        skins: [
            {
                name: 'Bridge',
                src: 'bridge',
            },
            {
                name: 'Senior',
                src: 'senior',
            },
            // {
            //     name: 'The Stranger',
            //     src: 'stranger',
            // },
            {
                name: 'Luke (Fella Drawn)',
                src: 'luke_debread',
            },
            {
                name: 'Luke (Fella Drawn) (Bald)',
                src: 'luke_debreadbald',
            },
        ],

        applyStats: () => {
            modifyStat(['melee','size'],'=50')
            modifyStat(['melee','damage'],'=50')
            modifyStat(['player','maxWeaponDistance'],'=25')
        },
        
        weapon: weaponPresets.luke
    },
    tana: {
        name: 'Tana',
        desc: 'White woman jumpscare',
        color: [255,255,255],
        unlockable: true,

        tagList: [
            {text:'Dhole',col:'#5cbde6'},
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],
        
        weapon: weaponPresets.baretta_93r
    },
    nyan: {
        name: 'Nyan',
        desc: 'The world famous magic cat man',
        color: [219, 219, 219],

        tagList: [
            {text:'Cat thing??',col:'#e65c5c'},
            {text: 'GS1',col: '#e0a24a'}
        ],
        
        weapon: weaponPresets.gun
    },
    jaden: {
        name: 'Jaden',
        desc: 'my wife left me',
        taunts: 2,
        color: [248, 226, 213],

        pros: [
            'Healing melees',
            'Parasite ammo',
        ],

        cons: [
            'Max health'
        ],

        tagList: [
            {text:'Vampire',col:'#64000a'},
            {text: 'GS1',col: '#e0a24a'}
        ],

        applyStats: () => {
            modifyStat(['bullet','heal'], '=0.1')
            modifyStat(['melee','heal'], '=10')
            modifyStat(['player','maxHealth'], '=50')
        },

        weapon: weaponPresets.flintlock
    },
    peep: {
        name: 'Peep',
        taunts: 2,
        color: [255, 255, 255],
        unlockable: true,

        info: `Starts with the 'Demon Core' Power Item <br>${powerItems[3].demon_core.desc}`,

        tagList: [
            {text:'Arctic Fox',col:'#6072ad'},
            {text:'GS1',col:'#e0a24a'}
        ],

        weapon: weaponPresets.cannon,

        applyStats: () => {
            player.powerItem = powerItems[3].demon_core
        }
    },
    slip: {
        name: 'Slip',
        color: [128, 127, 123],

        tagList: [
            {text:'Raccoon',col:'#514d47'},
            {text:'GS2',col:'#775db9'}
        ],

        weapon: weaponPresets.odstPistol //odst pistol
    },
    // poppy: {
    //     name: 'Poppy',
    //     desc: 'Infinite energy',
    //     taunts: 1,
    //     tag: 'Pomeranian',
    //     tagCol: '#616161',
    //     color: [97,97,97],

    //     pros: ['Speed'],

    //     tagList: [
    //         {text: 'GS2',col: '#775db9'}
    //     ],

    //     weapon: weaponPresets.gun,
        
    //     applyStats: () => {
    //         modifyStat(['player','speed'],'+=1')
    //     }     
    // },
    sasha: {
        name: 'Sasha',
        desc: 'the chomnpner',
        color: [98, 82, 63],
        unlockable: true,

        info: `Starts with the 'Tennis Ball' Power Item <br>${powerItems[1].tennis_ball.desc}`,

        pros: ['Speed'],

        tagList: [
            {text:'German, Shepherd',col:'#53463a'},
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.bite,
        
        applyStats: () => {
            player.powerItem = powerItems[1].tennis_ball
            modifyStat(['player','speed'],'+=1')
        }
    },
    // olive: {
    //     name: 'Olive',
    //     taunts: 1,
    //     tag: 'Cat',
    //     tagCol: '#9c8670',

    //     tagList: [
    //         {text: 'GS1',col: '#e0a24a'}
    //     ],

    //     weapon: weaponPresets.gun,

    //     skins: [
    //         {
    //             name: 'Mold Olive',
    //             src: 'mold_olive',
    //             taunts: 1,
    //         },
    //         {
    //             name: 'Pixel Olive',
    //             src: 'pixel_olive',
    //             taunts: 1,
    //         },
    //     ]
    // },
    the_horse: {
        name: 'The Horse',
        desc: 'run',
        color: [153, 110, 75],
        unlockable: true,

        tagList: [
            {text:'The Horse',col:'#6b563c'},
            {text:'GS2',col:'#775db9'},
            {text:'🏇🐴🐴🐎🐎🏇🐴🐎🐴🐴',col:'#282422'}
        ],

        weapon: weaponPresets.horse_weapon,

        pros: [
            'So a horse walks into a bar',
            'It asks the bartender, what can I have in Goober Shooter',
            'The bartender says, Idk youre a horse',
            'The horse says give me stat ups',
            'The bartender says, I dont have any stat ups',
            'The horse says, fuck you, I\'ll go to the next bar',
        ],

        applyStats: () => {
            player.visibleStats.push('misc-horseIncrease')
        }
    },
    car: {
        name: 'car',
        desc: 'my name is car',
        taunts: 3,
        tag: 'Car',
        tagCol: '#403b39',
        color: [129, 113, 106],

        tagList: [
            {text:'Car',col:'#403b39'},
            {text:'GS1',col:'#e0a24a'},
            {text:'Garn47',col:'#57473d'}
        ],

        weapon: weaponPresets.gun,
    },
    isaac: {
        name: 'Isaac',
        color: [129, 113, 106],
        unlockable: true,

        tagList: [
            {text:'The Binding of Isaac',col:'#a9c3ce'},
            {text:'GS2',col:'#775db9'},
        ],

        info: `Starts with \'The D6\' Power Item.<br>${powerItems[3].the_d6.desc}`,

        weapon: weaponPresets.tears,

        applyStats: () => {
            player.powerItem = powerItems[3].the_d6
        },
    },
    erix: {
        name: 'erix',
        desc: 'use this one if you wanna be really swag',
        color: [95, 86, 85],

        tagList: [
            {text:'Cat',col:'#ff69b4'},
            {text:'GS2',col:'#775db9'}
        ],

        weapon: weaponPresets.guitar
    },
    walf: {
        name: 'Walf',
        color: [158, 158, 158],
        noDeathParticles: true,

        tagList: [
            {text:'Walf',col:'#9e9e9e'},
            {text:'GS2',col:'#775db9'}
        ],

        pros: ['POWER regen'],

        cons: [
            'Power items cannot appear in the shop'
        ],

        info: `
            Cannot fire their own projectiles.<br>
            <br>
            Starts with the \'Walfling\' Power Item.<br>${powerItems[5].walfling.desc}
        `,

        weapon: weaponPresets.none,

        skins: [
            {
                name: 'flaW',
                src: 'flaw',
                taunts: 1,
            },
            {
                name: 'Green Balf',
                src: 'green_balf',
                desc: 'He\'s green for an amazing reason! ✅✅',
                taunts: 1,
            },
        ],

        applyStats: () => {
            player.shopWeights[1] = 0
            modifyStat(['player','powerRegen'],'=0.1')
            player.powerItem = powerItems[5].walfling

            player.onDeath = () => {
                const walfDeath = document.createElement('div')
                walfDeath.classList.add('entity')
                addStyles(walfDeath, {
                    width: player.stats.player.size+'px',
                    height: player.stats.player.size+'px',
                    position: 'absolute',
                    left: player.pos[0]+'px',
                    top: player.pos[1]+'px',
                    backgroundImage: 'url(graphics/characters/walfDeath.png)',
                    backgroundSize: 'cover'
                })
                doge('area').append(walfDeath)

                DeBread.easeShake(walfDeath, 20, 0, -0.5)

                DeBread.playSound('audio/walfScream.mp3')
                createTimeout(() => {
                    walfDeath.remove()
                    DeBread.playSound('audio/deltaruneExplosion.mp3')
                    createExplosion(
                        [...player.centerPos],
                        250,
                        100,
                        100,
                        true
                    )
                }, 18)
            }
        },
    },
    jake: {
        name: 'Jake',
        desc: 'good morning wag wag',
        info: `Starts with the \'Pepper\' Power Item.<br>${powerItems[1].pepper.desc}`,
        color: [231, 219, 205],

        tagList: [
            {text:'Dog',col:'#ab886d'},
            {text: 'GS2',col: '#775db9'},
            {text: '<img src="graphics/homosexual.gif" height=20>', col: 'linear-gradient(to right,rgb(255,100,100) 17%,rgb(255, 200, 100) 34%,rgb(255, 255, 100) 51%,rgb(100, 255, 100) 68%,rgb(100, 100, 255) 84%,rgb(255, 100, 255) 100%)'}
        ],

        applyStats: () => {
            player.powerItem = powerItems[1].pepper
        },

        weapon: weaponPresets.spicy_gun
    },
    lore: {
        name: 'Lore',
        desc: 'I make songs in my bedroom',
        color: [88, 93, 112],

        tagList: [
            {text:'Crow',col:'#299379'},
            {text: 'GS2',col: '#775db9'},
            {text: 'FL Studio',col: '#f69e27'},
        ],

        pros: [
            'Small',
            'CD Reloads',
        ],

        cons: [
            'Reload Speed'
        ],

        weapon: weaponPresets.keytar,

        applyStats: () => {
            modifyStat(['player','size'],'=30'),
            modifyStat(['ammo','reloadSpeed'],'=100')
            player.onReloadFinish = () => {
                powerItems[2].cd.use()
                player.currentNoteSFX = 0
            }
        }
    },
    // marcy: {
    //     name: 'Marcy',
    //     tag: 'Fox',

    //     weapon: weaponPresets.gun
    // },
    crow: {
        name: 'Crow',
        color: [41, 41, 41],

        tagList: [
            {text:'Crow',col:'#0c0026'},
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.meatCleaver
    },
    krazy: {
        name: 'Krazy',
        desc: 'I know how orange cats are crazy',
        color: [176, 126, 64],

        tagList: [
            {text:'Cat',col:'#a57f4b'},
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    bean: {
        name: 'Bean',
        color: [178, 101, 29],

        tagList: [
            {text:'Bean',col:'#71522d'},
            {text:'GS2',col:'#775db9'}
        ],

        skins: [
            {
                name: 'Stew',
                src: 'stew',
                taunts: 1,
            },
            {
                name: 'Noodle',
                src: 'noodle',
                taunts: 1,
            },
            // {
            //     name: 'Spud', //beetle guy
            //     src: 'Spud',
            //     taunts: 1,
            // },
            // {
            //     name: 'Yogurt', //blue dragon
            //     src: 'yogurt',
            //     taunts: 1,
            // },
            // {
            //     name: 'Curry', //red dragon
            //     src: 'curry',
            //     taunts: 1,
            // },
            // {
            //     name: 'Nickel', //brown wolf (?) (pumpernickel)
            //     src: 'nickel',
            //     taunt: 1,
            // },
            // {
            //     name: 'Spaghetti', //yellow worm
            //     src: 'spaghetti',
            //     taunt: 1,
            // },
            {
                name: 'Soup', //cat
                src: 'soup',
                taunt: 1,
            },
            // {
            //     name: 'Lemon', //bee
            //     src: 'lemon',
            //     taunt: 1,
            // },
            // {
            //     name: 'Marshmellow', //bee
            //     src: 'marshmellow',
            //     taunt: 1,
            // },
        ],

        weapon: weaponPresets.gun
    },
    phoenix: {
        name: 'Phoenix',
        color: [248, 135, 0],

        info: `
            Colliding with enemies sets them on fire.<br>
            Has a <cg>50%</cg> to create an explosion dealing <cg>100%</cg> of your damage when hit.
        `,

        tagList: [
            {text:'Fox🔥',col:'#FF5500'},
            {text:'GS2',col:'#775db9'}
        ],

        pros: [
            'Explosion immunity',
            'Melee damage'
        ],

        cons: [
            'Speed'
        ],

        applyStats: () => {
            modifyStat(['player','fireTouch'],'=true')
            modifyStat(['player','speed'],'*=0.8')
            modifyStat(['player','explosiveHitChance'],'=50')
            modifyStat(['player','explosiveHitDamage'],'=1')  

            modifyStat(['melee','damage'], '=40')

            player.visibleStats.push('bullet-speedDiv')
        },

        weapon: weaponPresets.fire_paws
    },
    allx: {
        name: 'Quantum',
        color: [40, 32, 12],

        info: `Starts with the \'Tesla Coil\' Power Item.<br>${powerItems[4].tesla_coil.desc}`,

        tagList: [
            {text:'Protogen',col:'#f67c20'},
            {text:'GS2',col:'#775db9'}
        ],

        weapon: weaponPresets.gun,

        pros: [
            'Electrified ammo',
        ],

        applyStats: () => {
            player.powerItem = powerItems[4].tesla_coil

            modifyStat(['bullet','electricChainReach'], '=100')
            modifyStat(['bullet','electricChainLength'], '=3')
        }
    },
    dottr: {
        name: 'Dottr',
        desc: 'taco bel 🤤',
        color: [167, 166, 167],
        info: `Starts with the \'Blunt\' Power Item.<br>${powerItems[0].blunt.desc}`,

        tagList: [
            {text:'Raccoon',col:'#a16e97'},
            {text:'GS2',col:'#775db9'}
        ],

        skins: [
            {
                name: 'Hair',
                src: 'dottr_hair',

            },
        ],

        applyStats: () => {
            player.powerItem = powerItems[0].blunt
            modifyStat(['ammo','chargeShot'], '=true')
            modifyStat(['ammo','chargeTime'], '=75')
            modifyStat(['ammo','chargeMultCap'], '=10')

            updateUI()
        },

        weapon: weaponPresets.bubble_blower
    },
    // hugo: {
    //     name: 'Hugo',
    //     desc: 'stupid homo froge',
    //     tag: 'Frog',

    //     weapon: weaponPresets.gun
    // },
    skunk: {
        name: 'John',
        desc: 'yucky',
        color: [79, 79, 79],

        info: `Starts with the \'Beer Bottle\' Power Item.<br>${powerItems[2].beer_bottle.desc}`,
        pros: ['Poisonous parries'],

        tagList: [
            {text:'Skunk',col:'#323232'},
            {text:'GS2',col:'#775db9'}
        ],

        applyStats: () => {
            modifyStat(['player','parryPoisonDmg'],'=50')
            modifyStat(['player','parryPoisonTicks'],'=10')
            modifyStat(['player','parryPoisonSize'],'=75')

            player.powerItem = powerItems[2].beer_bottle
        },

        weapon: weaponPresets.gun
    },
    // nova: {
    //     name: 'Nova',

    //     weapon: weaponPresets.gun
    // },
    // zeko: {
    //     name: 'Zeko',
    //     tag: 'Arctic Fox',
    //     tagCol: 'rgb(89, 150, 168)',
    //     weapon: weaponPresets.gun
    // },
    udev: {
        name: 'udev',
        info: 'All possible player stats are randomly multiplied between 0.1x and 10x at run start.',
        color: [0, 255, 0],

        tagList: [
            {text:'Guy',col:'#009600'},
            {text: 'GS1',col: '#e0a24a'}
        ],

        applyStats: () => {
            for(const statCat in player.stats) {
                for(const key in player.stats[statCat]) {
                    if(typeof player.stats[statCat][key] === 'number') {
                        player.stats[statCat][key] *= Math.pow(10,DeBread.randomNum(-1,1,5))
                        modifyStat([statCat,key],`=${player.stats[statCat][key]}`)
                    }
                }
            }
            DeBread.round(player.stats.bullet.multishot)

            modifyStat(['bullet','speedDiv'],'=1')
        },

        weapon: weaponPresets.gun
    },
    snorp: {
        name: 'Douglas',
        color: [237, 237, 237],

        info: `
            Starts with the \'Diet Pepsi\' Power Item.<br>${powerItems[5].diet_pepsi.desc}
        `,
        tagList: [
            {text:'Cat ?',col:'#5268da'},
            {text: 'GS1',col: '#e0a24a'}
        ],

        cons: [
            'Power items cannot appear in the shop'
        ],

        applyStats: () => {
            player.powerItem = powerItems[5].diet_pepsi
            player.shopWeights[1] = 0
            player.visibleStats.push('shop-pepsifyChance')
        },

        weapon: weaponPresets.gun
    },
    wasp: {
        name: 'Wasp',
        taunts: 1,
        tag: 'Fox',
        tagCol: '#9c4321',
        color: [240, 142, 66],

        tagList: [
            {text:'Fox',col:'#9c4321'},
            {text:'GS2',col:'#775db9'}
        ],

        weapon: weaponPresets.staff
    },
    // tox: {
    //     name: 'Tox',
    //     desc: '',
    //     tag: 'Fox',
    //     tagCol: 'hotpink',

    //     weapon: weaponPresets.gun
    // },
    wolff: {
        name: 'Wolff',
        desc: 'BRITISH PEOPLE 🤮🤮🤮🤮',
        color: [112, 86, 78],

        tagList: [
            {text:'Wolf',col:'#420d28'},
            {text:'GS1',col:'#e0a24a'},
            {text:'GS2',col:'#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    chip: {
        name: 'Chip',
        desc: 'AUSTRALIAN PEOPLE 🤮🤮🤮🤮',
        color: [247, 230, 217],

        tagList: [
            {text:'Australian Shepherd',col:'#f79294'},
            {text:'GS2',col:'#775db9'}
        ],

        info: `
            Starts with the \'Egg\' Power Item.<br>${powerItems[5].egg.desc}
        `,

        applyStats: () => {
            player.powerItem = powerItems[5].egg
        },

        weapon: weaponPresets.gun
    },
    hana: {
        name: 'Hana',
        color: [206,144,73],

        tagList: [
            {text:'Kitsune',col:'#ce9049'},
            {text:'GS2',col:'#775db9'}
        ],

        pros: [],
        cons: [
            'Deadly fire damage'
        ],

        applyStats: () => {
            modifyStat(['player','fireDamageMult'],'=5')
        },

        weapon: weaponPresets.gun
    },
    // zolph: {
    //     name: 'Zolph',
    //     color: [119, 93, 185],

    //     tagList: [
    //         {text:'🖕',col:'#60c1b4'},
    //         {text:'GS2',col:'rgb(119, 93, 185)'}
    //     ],

    //     pros: [],
    //     cons: [
    //         'Deadly fire damage'
    //     ],

    //     applyStats: () => {
    //         modifyStat(['player','fireDamageMult'],'=5')
    //     },

    //     weapon: weaponPresets.brick
    // },
    // bMoney: {
    //     name: 'B-Money',
    //     desc: 'Squire? I hardly know her!',
    //     color: [46, 107, 73],

    //     tagList: [
    //         {text: 'Composer',col: 'rgb(46, 107, 73)'},
    //         {text: 'GS2',col: '#775db9'}
    //     ],

    //     pros: [],
    //     cons: [
    //         'Melee damage'
    //     ],

    //     applyStats: () => {
    //         modifyStat(['melee','damage'],'=10')
    //     },

    //     weapon: weaponPresets.crossbow
    // },
    // belle: {
    //     name: 'Belle',
    //     tag: 'Porcupinefish',
    //     tagCol: 'rgb(232, 213, 157)',
    //     color: [232, 213, 157],

    //     tagList: [
    //         {text: 'GS2',col: '#775db9'}
    //     ],

    //     weapon: weaponPresets.gun
    // },
    skywalkr: {
        name: 'Skywalkr',
        desc: 'this game is pissing me off',
        color: [247, 230, 217],

        tagList: [
            {text:'the&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsporiginal',col:'#65376a'},
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.mounted_machine_gun
    },
    meringue: {
        name: 'Meringue',
        color: [175, 184, 204],

        tagList: [
            {text:'Lynx',col:'#3f3c4e'},
            {text:'GS2',col:'#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    // jag: {
    //     name: 'JAG',
    //     desc: '',
    //     tag: 'Bloing',

    //     weapon: weaponPresets.gun
    // },
    // zima: {
    //     name: 'Zima',
    //     desc: '',
    //     tag: 'Yeen',

    //     weapon: weaponPresets.gun
    // },
    // cindy: {
    //     name: 'Cindy',
    //     desc: 'Autistic as fuck',
    //     taunts: 1,
    //     tag: 'Cat',
    //     tagCol: '#64afff',

    //     tagList: [
    //         {text: 'GS2',col: '#775db9'}
    //     ],

    //     weapon: weaponPresets.gun
    // },
    glorp: {
        name: 'Glorp',
        color: [43, 255, 68],

        tagList: [
            {text:'Alien',col:'#185225'},
            {text: 'GS2',col: '#775db9'},
            {text: 'Wizlians',col:'#185225'},
            {text: 'SUSA 2026', col: '#59a7ff'}
        ],

        weapon: weaponPresets.gun
    },
    tico: {
        name: 'Tico',
        color: [141, 58, 183],

        tagList: [
            {text:'Dragon',col:'#7c2f96'},
            {text: 'GS2',col: '#775db9'},
            {text: 'Hot Springs',col:'#7c2f96'},
            {text: 'SUSA 2026', col: '#59a7ff'}
        ],

        weapon: weaponPresets.gun
    },
    friend: {
        name: 'FRIEND',
        color: [255,255,255],
        unlockable: true,

        tagList: [
            {text:'???',col:'linear-gradient(to right, #fef200, #feaec9)'},
            {text: 'GS2',col:'#775db9'},
            {text: 'DELTARUNE',col:'#ee1c26'},
        ],

        pros: [
            'Poison field trail',
            'Parasite ammo',
            'Melee damage'
        ],

        applyStats: () => {
            modifyStat(['player','droolSize'],'=25')
            modifyStat(['bullet','heal'],'=0.1')
            modifyStat(['player','maxWeaponDistance'],'=125')
            modifyStat(['melee','damage'],'=50')
        },

        weapon: weaponPresets.none
    },
    tutorialist: {
        name: 'The Tutorialist',
        color: [255,255,255],
        unlockable: true,

        tagList: [
            {text:'???',col:'#050634'},
            {text:'GS2',col:'#775db9'}
        ],

        weapon: weaponPresets.omnirifle
    }
}

const cosmetics = {
    tophat: {
        name: 'Top Hat',
        desc: 'Stylish!',
        src: 'tophat'
    },
    sunglasses: {
        name: 'Sunglasses',
        desc: 'Is it too bright?',
        src: 'sunglasses'
    },
    cigarette: {
        name: 'Cigarette',
        desc: 'Take a smoke break.',
        src: 'cigarette'
    }
}