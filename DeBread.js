console.log('mom look im hacking!')

let intervalID = 0

let gameSpeed = 1
let notiCount = 0
const soundPool = {};

let particles = 0
let audios = 0
let audioLimit = 15

const intervals = {}

const DeBread = {
    /**
    * Adds CSS styles to a specified element.
    * @param elem The element.
    * @param styles An object defining specific styles to apply to the element.
    */
    addStyles(elem, styles) {
        for(const key in styles) {
            elem.style[key] = styles[key]
        }
    },
    /**
    * Rounds a number to the specified decimal place.
    * @param num The number to round.
    * @param decimalPlaces The decimal place to round to.
    */
    round(num, decimalPlaces = 0) {
        return Math.round(num * (Math.pow(10, decimalPlaces))) / (Math.pow(10, decimalPlaces))
    },

    /**
    * Returns a random number.
    * @param min The minimum amount the number can be.
    * @param max The maximum amount amount the number can be.
    * @param decimalPlaces The amount of decimal places.
    */
    randomNum(min = 0, max = 1, decimalPlaces = 0) {
        return DeBread.round((Math.random() * (max - min)) + min, decimalPlaces)
    },

    /**
    * Returns a random color.
    */
    randomColor() {
        return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    },

    /**
    * Applies a shake effect to an element.
    * (This uses the CSS transform property so it will override an y current CSS transformations.)
    * @param element The element to shake.
    * @param interval The interval of the shake.
    * @param intensity The intensity of the shake.
    * @param time How long the shake lasts (ms).
    * @param rotate If to involve rotation in the shake.
    * @param rotateIntensity The intensity of the rotation in the shake.
    */
    shake(element, interval, intensityX, intensityY, time, rotate = false, rotateIntensity = 0) {
        let shakeInterval = setInterval(() => {
            if(rotate) {
                element.style.setProperty('transform',`translateX(${DeBread.randomNum(-intensityX, intensityX)}px) translateY(${DeBread.randomNum(-intensityY, intensityY)}px) rotate(${DeBread.randomNum(-rotateIntensity, rotateIntensity)}deg)`)
            } else {
                element.style.setProperty('transform',`translateX(${DeBread.randomNum(-intensityX, intensityX)}px) translateY(${DeBread.randomNum(-intensityY, intensityY)}px)`)
            }
        }, interval * gameSpeed);
        setTimeout(() => {
            clearInterval(shakeInterval)
            element.style.setProperty('transform',`none`)
        }, time * gameSpeed);
    },

    easeShake(element, interval, startIntensity, intensityDecrease) {
        let intensity = startIntensity
        let shakeInterval = setInterval(() => {
            if(intensity < 0) {
                clearInterval(shakeInterval)
                element.style.translate = 'none'
            } else {
                element.style.translate = `${DeBread.randomNum(-intensity, intensity)}px ${DeBread.randomNum(-intensity, intensity)}px`
                intensity -= intensityDecrease
            }
        }, interval);
    },

    /**
    * Plays a sound.
    * @param sound The file path of the audio.
    * @param volume The volume to play the sound at.
    * @param speed The speed to play the sound at.
    */
    playSound(sound, volume = 1, speed = 1, preservePitch = false) {
        // function updateCounter() {
        //     doge('dbAUD').innerText = `${audios}AUD`
        //     doge('dbAUD').style.color = `hsl(0deg, 100%, ${100 - (audios / audioLimit * 50)}%)`
        // }

        if(audios < audioLimit) {
            if (!soundPool[sound]) {
                soundPool[sound] = new Audio(sound)
            }
    
            const audio = soundPool[sound]
            audio.volume = volume
            audio.playbackRate = speed
            audio.preservesPitch = preservePitch
    
            if (audio.paused) {
                audio.play().catch((error) => {
                    console.error('Error playing audio:', error)
                });
                audios++
                // updateCounter()

                setTimeout(() => {
                    audios--
                    // updateCounter()
                }, audio.duration * 1000);
            } else {
                const audioClone = audio.cloneNode();
                audioClone.volume = volume
                audioClone.playbackRate = speed
                audioClone.preservesPitch = preservePitch
                audioClone.play().catch((error) => {
                    console.error('Error playing audio clone:', error)
                })
                audios++
                // updateCounter()


                setTimeout(() => {
                    audios--
                    // updateCounter()
                }, audio.duration * 1000);
            }
        }
    },

    createInterval(run, delay, repeat = Infinity) {
        intervalID++
        const id = intervalID

        intervals[id] = {
            lastRan: performance.now(),
            timePaused: undefined,
            timesRepeated: 0,
            paused: false,
            fun: run,
            delay: delay.toString(),
            callback: () => {
                intervals[id].timeout = setTimeout(() => {
                    run()
                    intervals[id].lastRan = performance.now()
                    intervals[id].timesRepeated++
                    if(intervals[id].timesRepeated < repeat) {
                        intervals[id].callback()
                    } else {
                        DeBread.deleteInterval(id)
                    }
                }, eval(delay.toString()));
            }
        }
        intervals[id].callback()
        
        return intervalID
    },

    /**
     * Pause/Resumes an interval using its ID.
     * @param id The ID of an existing interval.
     */
    pauseInterval(id, state) {
        if(intervals[id]) {
            let interval = intervals[id]

            if(state !== interval.paused) {
                if(interval.paused) {
                    setTimeout(() => {
                        interval.fun()
                        interval.callback()
                    }, interval.delay - (interval.timePaused - interval.lastRan));
                    interval.paused = false
                } else {
                    clearTimeout(interval.timeout)
                    interval.timePaused = performance.now()
                    interval.paused = true
                }
            }
        } else {
            throw new Error(`Couldn't find an interval with the ID of ${id}, try creating one using DeBread.createInterval()`)
        }
    },

    /**
     * Deletes an interval using its ID.
     * @param id The ID of an existing interval.
     */
    deleteInterval(id) {
        if(intervals[id]) {
            clearTimeout(intervals[id].timeout)
            intervals[id] = undefined
        } else {
            throw new Error(`Couldn't find an interval with the ID of ${id}, try creating one using DeBread.createInterval()`)
        }
    },

    getInterval(id) {
        if(intervals[id]) {
            return intervals[id]
        } else {
            throw new Error(`Couldn't find an interval with the ID of ${id}, try creating one using DeBread.createInterval()`)
        }
    }
}

let windowFocused = true
window.onfocus = () => {windowFocused = true}
window.onblur = () => {windowFocused = false}

/**
* Shortened document.getElementById.
* (From library "DeBread")
* @param id The ID of the element.
*/
function doge(id) {
    return document.getElementById(id)
}

function addStyles(elem, styles) {
    for(const style in styles) {
        elem.style[style] = styles[style]
    }
}

//FPS COUNTER: Made be me :D

let frameCount = 0
let lastUpdateDate = performance.now()
function frameUpdate() {
    frameCount++
    doge('dbFPSMS').innerText = `${DeBread.round(((performance.now() - lastUpdateDate) / frameCount), 2)}ms`
    if(performance.now() - lastUpdateDate >= 1000) {
        lastUpdateDate = performance.now()
        doge('dbFPS').innerText = `${frameCount}FPS`
        doge('dbFPS').style.color = `hsl(0deg, 100%, ${50 + frameCount}%)`
        frameCount = 0
    }
    requestAnimationFrame(frameUpdate)
} requestAnimationFrame(frameUpdate)

//Error message
window.onerror = ev => {
    // createNoti('media/error.png', 'An error has occured', 'Please report this to DeBread, click on this notification to copy the error to your clipboard.', 
    // () => {
    //     navigator.clipboard.writeText(ev)
    //     createNoti(undefined, 'Copied to clipboard.', ev)
    // })
}

function isColliding(div1, div2) {
    const rect1 = div1.getBoundingClientRect()
    const rect2 = div2.getBoundingClientRect()
  
    return !(
      rect1.right <= rect2.left ||
      rect1.left >= rect2.right ||
      rect1.bottom <= rect2.top ||
      rect1.top >= rect2.bottom
    )
}

const beginningNumberNames = [
    'Million',
    'Billion',
    'Trillion',
    'Quadrillion',
    'Quintillion',
    'Sextillion',
    'Septillion',
    'Octillion',
    'Nonillion',
]

const numberPrefixes = [
    '',
    'Un',
    'Duo',
    'Tre',
    'Quatturo',
    'Quin',
    'Sex', //funny!
    'Sept',
    'Octo',
    'Non'
]

const numberNames = [
    '',
    'decillion',
    'vigintillion',
    'trigintillion',
    'quadragintillion',
    'quinquagintillion',
    'sexagintillion',
    'septuagintillion',
    'octogintillion',
    'nonagintillion',
    'centillion' //thanks for playing!
]

function formatNumber(num) {
    let negative = ''
    if(num < 0) {negative = '-'}
    if(Math.abs(num) >= 1000000) {
        let tempNum = Math.abs(num)
        let timesDivided = -2
        while(tempNum >= 1000 && timesDivided < 1000) {
            tempNum /= 1000
            timesDivided++
        }

        if(Math.abs(num) >= 1e306) {
            return 'A LOT' //1e306 is right before the 32-bit integer limit
        } else if(Math.abs(num) >= 1e33) { //Thanks zean!
            timesDivided++

            let prefix = ''
            let name = numberNames[Math.floor(timesDivided / 10)]
            if(timesDivided % 10 === 0) {
                name = name[0].toUpperCase() + name.slice(1)
            } else {
                prefix = numberPrefixes[timesDivided % 10]
            }

            return negative + DeBread.round(tempNum,3).toPrecision(3+DeBread.round(tempNum).toString().length) + ' ' + prefix + name
        } else {
            return negative + DeBread.round(tempNum,3).toPrecision(3+DeBread.round(tempNum).toString().length) + ' ' + beginningNumberNames[timesDivided]
        }
    } else {
        if(Math.abs(num) > 100) {
            return DeBread.round(num).toLocaleString()
        } else {
            return DeBread.round(num, 1).toLocaleString()
        }
    }
}

function formatTime(seconds) {
    const time = {}

    time.centuries = Math.floor(seconds/3153600000)
    seconds %= 3153600000
    time.decades = Math.floor(seconds/315360000)
    seconds %= 315360000
    time.years = Math.floor(seconds/31536000)
    seconds %= 31536000
    time.weeks = Math.floor(seconds/604800)
    seconds %= 604800
    time.days = Math.floor(seconds/86400)
    seconds %= 86400
    time.hours = Math.floor(seconds/3600)
    seconds %= 3600
    time.minutes = Math.floor(seconds/60)
    time.seconds = seconds % 60

    let output = ''
    let timesMarked = 0
    for(const key in time) {
        if(time[key] !== 0) {
            if(time[key] === 1) {
                output += `${formatNumber(time[key])} ${key.slice(0,-1)} `
            } else {
                output += `${formatNumber(time[key])} ${key} `
            }
            timesMarked++
            if(timesMarked === 2) {
                break
            }
        }
    } return output
}

function applyFlowText(elem,speedMult = 1) {
    const targetText = elem.innerText

    elem.innerHTML = ''
    elem.style.display = 'flex'
    for(let i = 0; i < targetText.length; i++) {
        const div = document.createElement('div')
        div.style.opacity = 0
        div.innerText = targetText[i]
        div.style.animation = `textFlow 3s ease-in-out -${(targetText.length - i) * 250}ms infinite forwards, scaleIn 0.25s ease-in-out ${(i * 25) / speedMult}ms 1 forwards`
        div.style.rotate = (i - targetText.length / 2) / 3 + 'deg'
        if(targetText[i] === ' ') div.style.width = '10px'
        elem.append(div)

        setTimeout(() => {
            div.style.opacity = 1
        }, (i * 25) / speedMult + 5);
    }
}

function getWeightedChance(weights) {
    const total = weights.reduce((a, b) => a + b, 0)
    let randomNum = DeBread.randomNum(0, total, 100)

    for (let i = 0; i < weights.length; i++) {
        if (randomNum < weights[i]) return i
        randomNum -= weights[i]
    }
}


//I did NOT make the function below, i am too tired rn and i just want to get ts over with
function roman(num) {
    if(num === 0) {
        return '0'
    }
  // A lookup object mapping Roman symbols to their integer values in descending order
  const romanMap = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let roman = '';
  // Iterate over the properties of the lookup object
  for (const key in romanMap) {
    const value = romanMap[key];
    // Repeatedly append the Roman symbol and subtract its value as long as the number is greater than or equal to the value
    while (num >= value) {
      roman += key;
      num -= value;
    }
  }

  return roman;
}