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
    shotgun: {
        name: 'Shotgun',
        desc: 'Shoots multiple short range bullets.',
        ammoChar: '|',
        textureSize: [18,9],

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
            modifyStat(['bullet','speed'], '=20')
            modifyStat(['bullet','multishot'], '=5')
            modifyStat(['bullet','grow'], '=-10')

            modifyStat(['ammo','reloadSpeed'], '=75')
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
            modifyStat(['ammo','max'], '=20')
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
            'Poisonous parries',
            'Damage Multiplier'
        ],

        cons: [
            'Accuracy',
            'Shot cooldown'
        ],
        
        apply: () => {
            modifyStat(['bullet','poisonFieldChance'], '=100')
            modifyStat(['bullet','poisonFieldSize'], '=100')
            modifyStat(['bullet','poisonFieldTicks'], '=2')
            modifyStat(['bullet','poisonFieldDmgPercent'], '=40')
            modifyStat(['bullet','size'], '=40')
            modifyStat(['bullet','accuracy'], '=40')
            modifyStat(['bullet','shotCooldown'], '=10')
            modifyStat(['bullet','damageMult'], '=1.5')
            
            modifyStat(['player','parryPoisonDmg'], '=20')
            modifyStat(['player','parryPoisonSize'], '=50')
        }
    },
    flintlock: {
        name: 'Flintlock',
        desc: 'A single shot pistol that has extreme damage and recoil.',
        textureSize: [16,9],
        ammoChar: '|',

        pros: [
            'Damage',
            'Bullet Speed'
        ],

        cons: [
            'Max Ammo',
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
            'Charge projectiles',
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
            'Drill Ticks',
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
}

const characters = {
    debread: {
        name: 'Bread',
        desc: 'Some guy',
        taunts: 7,
        tag: 'Fox',
        tagCol: '#e0a24a',
        color: [244, 175, 84],

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.gun,

        skins: [
            {
                name: 'Arctic DeBread',
                src: 'arctic_debread',

            },
            {
                name: 'DeBread Old',
                src: 'debread_old',
                taunts: 1,
            },
            {
                name: 'Arctic DeBread Old',
                src: 'arctic_debread_old',
                taunts: 4,
            }
        ]
    },
    fella: {
        name: 'Fella',
        desc: 'Some guy but real',
        taunts: 1,
        info: `Starts with the \'Poker Chip\' Power Item.<br>${powerItems[1].poker_chip.desc}`,
        tag: 'Raccoon',
        tagCol: '#775db9',
        color: [84, 84, 84],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.sniper,

        applyStats: () => {
            player.powerItem = powerItems[1].poker_chip
        }
    },
    plonk: {
        name: 'Plonk',
        desc: 'Some other guy',
        taunts: 9,
        tag: 'Cat',
        tagCol: 'rgb(72, 72, 72)',
        color: [127, 127, 127],

        tagList: [
            {text: 'GS1',col: '#e0a24a'},
        ],

        weapon: weaponPresets.piss,


        applyStats: () => {
            // player.consumables = ['heroin']
        }
    },
    ashton: {
        name: 'Ashton',
        desc: 'bro thinks hes james sunderland',
        tag: 'Arctic Fox',
        tagCol: 'rgb(89, 150, 168)',
        color: [105, 51, 78],
        taunts: 1,

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],

        weapon: weaponPresets.shotgun
    },
    tammy: {
        name: 'Tammy',
        desc: 'Some other other guy',
        tag: 'Dire Wolf',
        tagCol: 'rgb(147, 151, 182)',
        color: [76, 81, 128],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],
        
        weapon: weaponPresets.garand
    },
    lorna: {
        name: 'Lorna Walker',
        desc: 'ACAB? Even her?',
        tag: 'Black Wolf',
        tagCol: '#592c23',
        color: [45, 27, 30],
        taunts: 1,

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],

        weapon: weaponPresets.riot_shotgun
    },
    tana: {
        name: 'Tana',
        desc: '',
        tag: 'Dhole',
        tagCol: 'rgb(92, 189, 230)',
        color: [255,255,255],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Plinkel Pack', col: '#386942'},
        ],
        
        weapon: weaponPresets.baretta_93r
    },
    nyan: {
        name: 'Nyan',
        desc: 'The world famous magic cat man',
        tag: 'Cat thing??',
        tagCol: 'rgb(230, 92, 92)',
        color: [219, 219, 219],

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],
        
        weapon: weaponPresets.gun
    },
    jaden: {
        name: 'Jaden',
        desc: 'my wife left me',
        taunts: 2,
        tag: 'Vampire',
        tagCol: 'rgb(100,0,10)',
        color: [248, 226, 213],

        pros: [
            'Healing melees',
            'Parasite ammo',
        ],

        cons: [
            'Max health'
        ],

        tagList: [
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
        desc: '',
        taunts: 2,
        tag: 'Fox',
        tagCol: '#6072ad',
        color: [255, 255, 255],

        info: `Starts with the 'Demon Core' Power Item <br>${powerItems[3].demon_core.desc}`,

        tagList: [
            {text: 'GS1',col: '#e0a24a'}
        ],

        weapon: weaponPresets.cannon,

        applyStats: () => {
            player.powerItem = powerItems[3].demon_core
        }
    },
    slip: {
        name: 'Slip',
        desc: '',
        tag: 'Raccoon',
        tagCol: '#514d47',
        color: [128, 127, 123],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun //odst pistol
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
        taunts: 1,
        tag: 'German, Shepherd',
        tagCol: '#53463a',
        color: [98, 82, 63],

        info: `Starts with the 'Tennis Ball' Power Item <br>${powerItems[1].tennis_ball.desc}`,

        pros: ['Speed'],

        tagList: [
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
    //     desc: '',
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
        taunts: 1,
        tag: 'The Horse',
        tagCol: '#6b563c',
        color: [153, 110, 75],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: '🏇🐴🐴🐎🐎🏇🐴🐎🐴🐴',col: '#282422'}
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
            {text: 'GS1',col: '#e0a24a'},
            {text: 'Garn47',col: '#57473d'}
        ],

        weapon: weaponPresets.gun,
    },
    isaac: {
        name: 'Isaac',
        desc: '',
        tag: 'The Binding of Isaac',
        tagCol: '#a9c3ce',
        color: [129, 113, 106],

        tagList: [
            {text: 'GS2',col: '#775db9'},
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
        tag: 'Cat',
        tagCol: 'hotpink',
        color: [95, 86, 85],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.guitar
    },
    walf: {
        name: 'Walf',
        desc: '',
        taunts: 1,
        tag: 'Walf',
        tagCol: 'gray',
        color: [158, 158, 158],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        pros: ['POWER regen'],

        cons: [
            'Power items cannot appear in the shop'
        ],

        info: `
            Cannot fire thier own projectiles.<br>
            <br>
            Starts with the \'Walfling\' Power Item.<br>${powerItems[5].walfling.desc}
        `,

        weapon: weaponPresets.none,

        applyStats: () => {
            player.shopWeights[1] = 0
            modifyStat(['player','powerRegen'],'=0.1')
            player.powerItem = powerItems[5].walfling
        },
    },
    jake: {
        name: 'Jake',
        desc: 'good morning wag wag',
        taunts: 2,
        info: `Starts with the \'Pepper\' Power Item.<br>${powerItems[1].pepper.desc}`,
        tag: 'Dog',
        tagCol: '#ab886d',
        color: [231, 219, 205],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: '<img src="graphics/homosexual.gif" height=20>', col: 'linear-gradient(to right,rgb(255,100,100) 17%,rgb(255, 200, 100) 34%,rgb(255, 255, 100) 51%,rgb(100, 255, 100) 68%,rgb(100, 100, 255) 84%,rgb(255, 100, 255) 100%)'}
        ],

        applyStats: () => {
            player.powerItem = powerItems[1].pepper
        },

        weapon: weaponPresets.spicy_gun
    },
    // marcy: {
    //     name: 'Marcy',
    //     desc: '',
    //     tag: 'Fox',

    //     weapon: weaponPresets.gun
    // },
    crow: {
        name: 'Crow',
        desc: '',
        tag: 'Crow',
        tagCol: '#0c0026',
        color: [41, 41, 41],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.meatCleaver
    },
    krazy: {
        name: 'Krazy',
        desc: 'I know how orange cats are crazy',
        taunts: 1,
        tag: 'Cat',
        tagCol: '#a57f4b',
        color: [176, 126, 64],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    bean: {
        name: 'Bean',
        desc: '',
        tag: 'Bean',
        tagCol: 'rgb(113, 82, 45)',
        color: [178, 101, 29],

        tagList: [
            {text: 'GS2',col: '#775db9'}
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
        desc: '',
        taunts: 1,
        tag: 'Fox🔥',
        tagCol: '#FF5500',
        color: [248, 135, 0],

        info: `
            Colliding with enemies sets them on fire.<br>
            Has a <cg>50%</cg> to create an explosion dealing <cg>100%</cg> of your damage when hit.
        `,

        tagList: [
            {text: 'GS2',col: '#775db9'}
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
        desc: '',
        taunts: 1,
        tag: 'Protogen',
        tagCol: '#f67c20',
        color: [40, 32, 12],

        info: `Starts with the \'Tesla Coil\' Power Item.<br>${powerItems[4].tesla_coil.desc}`,

        tagList: [
            {text: 'GS2',col: '#775db9'}
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
        taunts: 1,
        tag: 'Raccoon',
        tagCol: '#a16e97',
        color: [167, 166, 167],
        info: `Starts with the \'Blunt\' Power Item.<br>${powerItems[0].blunt.desc}`,

        tagList: [
            {text: 'GS2',col: '#775db9'}
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
        taunts: 1,
        tag: 'Skunk',
        tagCol: 'rgb(50,50,50)',
        color: [79, 79, 79],

        info: `Starts with the \'Beer Bottle\' Power Item.<br>${powerItems[2].beer_bottle.desc}`,
        pros: ['Poisonous parries'],

        tagList: [
            {text: 'GS2',col: '#775db9'}
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
    //     desc: '',

    //     weapon: weaponPresets.gun
    // },
    // zeko: {
    //     name: 'Zeko',
    //     desc: '',
    //     tag: 'Arctic Fox',
    //     tagCol: 'rgb(89, 150, 168)',
    //     weapon: weaponPresets.gun
    // },
    udev: {
        name: 'udev',
        desc: '',
        taunts: 1,
        info: 'All stats are randomly multiplied between 0.1x and 10x at run start.',
        tag: 'Guy',
        tagCol: 'rgb(0,150,0)',
        color: [0, 255, 0],

        tagList: [
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
        desc: '',
        taunts: 5,
        tag: 'Cat ?',
        tagCol: '#5268da',
        color: [237, 237, 237],

        info: `
            Starts with the \'Diet Pepsi\' Power Item.<br>${powerItems[5].diet_pepsi.desc}
        `,
        tagList: [
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
        desc: '',
        taunts: 1,
        tag: 'Fox',
        tagCol: '#9c4321',
        color: [240, 142, 66],

        tagList: [
            {text: 'GS2',col: '#775db9'}
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
        tag: 'Wolf',
        tagCol: '#420d28',
        color: [112, 86, 78],

        tagList: [
            {text: 'GS1',col: '#e0a24a'},
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.gun
    },
    chip: {
        name: 'Chip',
        desc: 'AUSTRALIAN PEOPLE 🤮🤮🤮🤮',
        tag: 'Australian Shepherd',
        tagCol: 'rgb(247, 146, 148)',
        color: [247, 230, 217],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        info: `
            Starts with the \'Egg\' Power Item.<br>${powerItems[5].egg.desc}
        `,

        applyStats: () => {
            player.powerItem = powerItems[5].egg
        },

        weapon: weaponPresets.gun
    },
    // belle: {
    //     name: 'Belle',
    //     desc: '',
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
        tag: 'the&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsporiginal',
        tagCol: 'rgb(107, 106, 52)',
        color: [247, 230, 217],

        tagList: [
            {text: 'GS2',col: '#775db9'}
        ],

        weapon: weaponPresets.mounted_machine_gun
    },
    meringue: {
        name: 'Meringue',
        desc: '',
        taunts: 1,
        tag: 'Lynx',
        tagCol: '#3f3c4e',
        color: [175, 184, 204],

        tagList: [
            {text: 'GS2',col: '#775db9'}
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
        desc: '',
        taunts: 1,
        tag: 'Alien',
        tagCol: '#185225',
        color: [43, 255, 68],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Wizlians',col:'#185225'},
            {text: 'SUSA 2026', col: '#59a7ff'}
        ],

        weapon: weaponPresets.gun
    },
    tico: {
        name: 'Tico',
        desc: '',
        taunts: 1,
        tag: 'Dragon',
        tagCol: '#7c2f96',
        color: [141, 58, 183],

        tagList: [
            {text: 'GS2',col: '#775db9'},
            {text: 'Hot Springs',col:'#7c2f96'},
            {text: 'SUSA 2026', col: '#59a7ff'}
        ],

        weapon: weaponPresets.gun
    },
    tutorialist: {
        name: 'The Tutorialist',
        desc: '',
        taunts: 1,
        tag: '???',
        tagCol: '#050634',
        color: [255,255,255],

        tagList: [
            {text: 'GS2',col: '#775db9'}
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