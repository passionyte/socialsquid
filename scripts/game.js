// Written by Passionyte

// UI ELEMENTS

const version = document.getElementById("version")

// Upload
const uploadui = document.getElementById("upload")
const uploadbutton = document.getElementById("uploadbutton")
const uploadtitle = document.getElementById("uploadtitle")

// Cooldown
const cooldownui = document.getElementById("cooldown")
const timeout = document.getElementById("timeout")

// Video
const videoui = document.getElementById("video")
const vidtitletext = document.getElementById("vidtitle")
const thumb = document.getElementById("thumbnail")
const vidviewtext = document.getElementById("vidviews")
const likebar = document.getElementById("likebar")
const likes = document.getElementById("likes")
const dislikes = document.getElementById("dislikes")

// Channel
const totalsubs = document.getElementById("totalsubs")
const totalviews = document.getElementById("totalviews")
const totalvids = document.getElementById("totalvids")
const playbutton = document.getElementById("playbutton")

// Shop
const upgdummy = document.getElementById("upgdummy")
const upglist = document.getElementById("upgrades")
let upgbuttons = []

// Top Bar
const statsbutton = document.getElementById("statsbutton")
const settingsbutton = document.getElementById("settingsbutton")

// Settings
const menusettings = document.getElementById("settingsmenu")
const booldummy = document.getElementById("booldummy")
const inputdummy = document.getElementById("inputdummy")
const settingslist = document.getElementById("settingslist")
const settingsspace = document.getElementById("settingsspace")
let loadedsettings = []

// Stats
const menustats = document.getElementById("statsmenu")

// STATISTICS
let stats = {
    "subs": 0,
    "views": 0,
    "videos": 0,
    "ownedupgrades": [],
    "video": {
        views: 0,
        likes: 0,
        dislikes: 0,
        life: 0,
        cooldown: 0,
        title: ""
    },
    "settings": {}
}
let upgvars = {
    "subchance": 0,
    "viewchance": 0,
    "likechance": 0,
    "dislikechance": 0,
    "submult": 1,
    "viewmult": 1,
    "likemult": 1,
    "dislikemult": 1,
    "cooldown": 120,
    "vidlifetime": 60,
}

// GAME
let timescale = 1
let fps = 30
let loaded = false
const vers = "0.011 alpha"

let interval

const upgrades = [
    {Name: "Amateur Videos", Cost: 100, Description: "Well, you gotta start somewhere. (-10s cooldown)", Stat: "cooldown", Inc: -10, Available: true},
    {Name: "Share With Friends", Cost: 100, Description: "Your friends are sure to check out your videos! (+5% views)", Stat: "viewmult", Inc: 0.05, Available: true},
    {Name: "Subscriber Begging", Cost: 500, Description: "Begging for subscribers raises the chance you get some! (+3% chance for subs)", Stat: "subchance", Inc: 0.03, Available: true},
    {Name: "Faster Wi-Fi", Cost: 500, Description: "Wi-Fi will time out less if you upgrade it to be faster. (-10s cooldown)", Stat: "cooldown", Inc: -10, Available: true},
    {Name: "Smash Like", Cost: 1000, Description: "Asking your viewers to smash the like button will increase your likes! (+5% chance for likes)", Stat: "likechance", Inc: 0.05, Available: true},
    {Name: "Experimentation", Cost: 3000, Description: "Having experimentation will draw more recommendations from the algorithm. (+5% views)", Stat: "viewmult", Inc: 0.05, Available: true},
    {Name: "Smarter Titles", Cost: 5000, Description: "Better titles will make more people click. (Guaranteed chance for views)", Stat: "viewchance", Inc: 0.1, Available: true, MinSubs: 500},
    {Name: "Commentary", Cost: 5000, Description: "Adding commentary to your videos will make them more engaging! (+4% chance for subs)", Stat: "subchance", Inc: 0.04, Available: true, MinSubs: 500},
    {Name: "Trending Topic", Cost: 10000, Description: "Making videos on trending topics will increase the longevity. (+15s vid lifetime)", Stat: "vidlifetime", Inc: 15, Available: true, MinSubs: 1000},
    {Name: "Webcam", Cost: 10000, Description: "Use a webcam for better viewer engagement. (+5% chance for subs)", Stat: "subchance", Inc: 0.05, Available: true, MinSubs: 1000},
    {Name: "Decent Videos", Cost: 25000, Description: "Seems like you've gotten more experienced! But, you gotta pay.. for some reason ;3 (-10s cooldown)", Stat: "cooldown", Inc: -10, Available: true, MinSubs: 2000},
    {Name: "HD Video", Cost: 50000, Description: "Upgrade your device for better quality so less people dislike! (-5% chance for dislikes)", Stat: "dislikechance", Inc: -0.05, Available: true, MinSubs: 5000},
    {Name: "Even-Faster Wi-Fi", Cost: 50000, Description: "Reduce Wi-Fi timeout by making it EVEN-FASTER! (-15s cooldown)", Stat: "cooldown", Inc: -15, Available: true, MinSubs: 5000},
    {Name: "Custom Thumbnails", Cost: 100000, Description: "Begin creating custom thumbnails people will actually click! (+10% views)", Stat: "viewmult", Inc: 0.1, Available: true, MinSubs: 10000},
    {Name: "Unique Content", Cost: 100000, Description: "Having more unique content will make your videos stand out from others. (+20s vid lifetime)", Stat: "vidlifetime", Inc: 20, Available: true, MinSubs: 10000},
    {Name: "Fiber Wi-Fi", Cost: 500000, Description: "Upgrade your even-faster Wi-Fi to Fiber for even faster uploads. (-20s cooldown)", Stat: "cooldown", Inc: -20, Available: true, MinSubs: 50000},
    {Name: "Favorability", Cost: 1000000, Description: "You've grown to the point people love you! Just believe! (+8% chance for likes)", Stat: "likechance", Inc: 0.08, Available: true, MinSubs: 100000},
    {Name: "Sponsorships", Cost: 1000000, Description: "You get some sponsors which help you produce longer and more engaging videos. (+15s vid lifetime)", Stat: "vidlifetime", Inc: 15, Available: true, MinSubs: 100000},
    {Name: "Collaboration", Cost: 5000000, Description: "Collaborate with other creators! (+10% views)", Stat: "viewmult", Inc: 0.1, Available: true, MinSubs: 500000},
    {Name: "Directly Sourced Fiber", Cost: 10000000, Description: "Directly source your Fiber Wi-Fi from your ISP. Expensive but lightning fast. (-20s cooldown)", Stat: "cooldown", Inc: -20, Available: true, MinSubs: 1000000},
    {Name: "Professional Videos", Cost: 10000000, Description: "Hey now, you're an all-star.. now gimme your views. (-10s cooldown)", Stat: "cooldown", Inc: -10, Available: true, MinSubs: 1000000}
]
const settings = [
    {Name: "browsertext", DisplayName: "Browser Text", Description: "Site title displays video timeout length and number of subscribers. (i.e. (60) 7 subscribers - SocialSquid)", Type: "bool", Default: true},
    // {Name: "Test", Description: "Testing", Type: "input", Default: false}
]

// HARDCODED
version.innerText = `v${vers}`

// FUNCTIONS
function ready() {
    uploadui.hidden = false
    cooldownui.hidden = true
}

function upload() {
    if (interval) {
        clearInterval(interval)
        interval = null
    }

    stats.video.title = uploadtitle.value
    uploadtitle.value = ""

    stats.videos++

    stats.video.views = 0
    stats.video.likes = 0
    stats.video.dislikes = 0
    stats.video.life = upgvars.vidlifetime
    stats.video.cooldown = upgvars.cooldown

    const viral = (Math.random() >= 0.9)
    stats.video.viral = viral

    uploadui.hidden = true
    cooldownui.hidden = false

    videoui.hidden = false
    vidtitletext.innerText = stats.video.title
    thumb.innerText = stats.video.title

    if (viral) {
       thumb.style.backgroundColor = "rgb(255, 255, 0)"
    }
    else {
        thumb.style.backgroundColor = "whitesmoke" // I actually have no idea if this works
    }

    step()

    interval = setInterval(tick, ((1000 / timescale) / fps))
}

function step() {
    const roundedsubs = Math.floor(stats.subs)

    totalsubs.innerText = `${roundedsubs} Subscribers`
    totalviews.innerText = `${Math.floor(stats.views)} Views`
    totalvids.innerText = `${stats.videos} Videos`

    vidviewtext.innerText = `${Math.floor(stats.video.views)} views`

    const roundedlikes = Math.floor(stats.video.likes)
    const roundeddislikes = Math.floor(stats.video.dislikes)

    likes.innerText = roundedlikes
    dislikes.innerText = roundeddislikes

    const ratings = (roundedlikes + roundeddislikes)

    likebar.style.width = ((ratings > 0) && ((roundedlikes / ratings) * 200)) || 0

    const roundedcooldown = Math.floor(stats.video.cooldown)

    if (stats.settings.browsertext) {
        document.title = (((!cooldownui.hidden) && "(" + roundedcooldown + ") ") || "") + `${roundedsubs} subscribers - SocialSquid`
    }
    else {
        if (document.title != "SocialSquid") {
            document.title = "SocialSquid"
        }
    }

    if (!cooldownui.hidden) {
        timeout.innerText = `Bandwidth timed out: ${roundedcooldown} seconds`
    }
    if (roundedsubs >= 100000) {
        playbutton.src = `images/${(((roundedsubs >= 100000000) && "reddiamond") || ((roundedsubs >= 50000000) && "ruby") || ((roundedsubs >= 10000000) && "diamond") || ((roundedsubs >= 1000000) && "gold") || ((roundedsubs >= 100000) && "silver"))}.png`
    }
    
    drawshop()
}

function tick() {
    if (stats.video.cooldown > 0) {
        stats.video.cooldown -= (1 / (fps * timescale))
    }
    else {
        ready()
    }
    if (stats.video.life > 0) {
        if (Math.random() <= (0.9 + upgvars.viewchance)) {
            const inc = (((Math.floor((((stats.subs * Math.random()) / 48) + ((stats.video.likes * Math.random()) / 8))) + 1) * ((upgvars.viewmult * ((stats.video.viral) && 7) || 1))) / 60)
            stats.video.views += inc
            stats.views += inc
        }
        if (Math.random() <= (0.1 + upgvars.subchance)) {
            stats.subs += (Math.floor((((((stats.video.views + stats.subs) * Math.random()) / 128)) + 1) * upgvars.submult) / 60)
        }
        if (Math.random () <= (0.15 + upgvars.likechance)) {
            stats.video.likes += (((Math.floor(((stats.video.views + stats.subs) * Math.random()) / 600) + 1) * upgvars.likemult) / 60)
        }
        else if (Math.random() <= (0.2 + upgvars.dislikechance)) {
            stats.video.dislikes += (((Math.floor((stats.video.views * Math.random()) / 600) + 1) * upgvars.dislikemult) / 60)
        }
        stats.video.life -= (1 / (fps * timescale))
    }  
    step()
}

function save() { // Convert our save data to a readable format.. save to localStorage
    if (stats.subs > 0 && loaded) { // Storage is valuable... and people's saves.
        localStorage.setItem("save", JSON.stringify(stats))
    }
}
setInterval(save, ((fps * 1000) / timescale))

function load() { // Convert our saved data to a expendible format.. load from localStorage
    let data = localStorage.getItem("save")

    if (data) {
        savedata = JSON.parse(data)
    
        for (const stat in stats) {
            if (!savedata[stat]) {
                // console.log(`${stat} missing from legacy data`)
                savedata[stat] = stats[stat]
            }
        }

        stats = savedata

        for (let i = 0; (i < stats.ownedupgrades.length); i++) {
            let upgrade

            for (let x = 0; (x < upgrades.length); x++) {
                if (upgrades[x].Name == stats.ownedupgrades[i]) {
                    upgrade = upgrades[x]
                    break
                }
            }

            if (upgrade) {
                upgvars[upgrade.Stat] += upgrade.Inc
            }
        }

        const cd = stats.video.cooldown
        if (cd > 0) {
            uploadui.hidden = true
            cooldownui.hidden = false

            setTimeout(ready, ((cd * 1000) / timescale))
        }
        if (stats.video.views > 0) {
            videoui.hidden = false
            vidtitletext.innerText = stats.video.title
            thumb.innerText = stats.video.title
            interval = setInterval(tick, ((1000 / timescale) / fps))
        }
        if (stats.video.viral) {
            thumb.style.backgroundColor = "rgb(255, 255, 0)"
        }
        else {
            thumb.style.backgroundColor = "whitesmoke" // I actually have no idea if this works
        }
    }

    loaded = true

    step()
}
load()

function onoff(boolean) {
    return (((boolean) && "ON") || "OFF")
}

function appendupgrade(data) {
    let upg = upgdummy.cloneNode(true)

    upg.children[0].src = `images/${((data.Icon) && data.Icon || "placeholder")}.png`
    upg.children[1].innerText = `${data.Name} - ${data.Cost} views`
    upg.children[2].innerText = data.Description

    upg.children[3].addEventListener("click", _ => {
        if (stats.views >= data.Cost) {
            stats.views -= data.Cost
            upgvars[data.Stat] += data.Inc

            stats.ownedupgrades.push(data.Name)

            upglist.removeChild(upg)
        }
    })

    upg.hidden = false
    upglist.appendChild(upg)
    upgbuttons.push(data.Name)
}

function appendsetting(data) {
    if (data.Type == "bool") {
        const obj = booldummy.cloneNode(true)

        obj.children[0].innerText = `${data.DisplayName || data.Name}: ${onoff((((stats.settings[data.Name] != null)) && stats.settings[data.Name]) || data.Default)}`
        obj.children[1].innerText = data.Description

        obj.children[0].addEventListener("click", _ => {
            stats.settings[data.Name] = !stats.settings[data.Name]
            obj.children[0].innerText = `${data.DisplayName}: ${onoff(stats.settings[data.Name])}`
        })

        obj.hidden = false
        settingslist.appendChild(obj)
        loadedsettings.push(data.Name)
    }
    else if (data.Type == "input") {
        const obj = inputdummy.cloneNode(true)

        obj.children[1].innerText = data.Description

        obj.hidden = false
        settingslist.appendChild(obj)
        loadedsettings.push(data.Name)
    }
    else {
        console.log(`Unknown setting type ${data.Type} from ${data.DisplayName} (${data.Name})!`)
        return
    }

    const space = settingsspace.cloneNode()
    space.hidden = false
    settingslist.appendChild(space)
}

function find(string, table, dict) {
    // Return objects for now
    let result

    if (!dict) {
        table.forEach(thing => {
            if (thing == string) {
                result = thing
            }
        })
    }
    else {
        for (const thing in table) {
            if (thing == string) {
                result = table[thing]
            }
        }
    }

    return (result)
}

function drawshop() {
    for (i = 0; (i < upgrades.length); i++) {
        const upgrade = upgrades[i]

        if (!find(upgrade.Name, upgbuttons)) {
            if (((upgrade.Available) && (!upgrade.MinSubs || (stats.subs >= upgrade.MinSubs))) && (!find(upgrade.Name, stats.ownedupgrades))) {
                appendupgrade(upgrade)
            }
        }
    }
}

function drawsettings() {
    for (i = 0; (i < settings.length); i++) {
        const setting = settings[i]

        if (!find(setting.Name, loadedsettings)) {
            appendsetting(setting)
        }
    }
}

function settingsmenu() {
    if (!menustats.hidden) {
        menustats.hidden = true
    }
    menusettings.hidden = !menusettings.hidden
    if (!menusettings.hidden) {
        drawsettings()
    }
}

function statsmenu() {
    if (!menusettings.hidden) {
        menusettings.hidden = true
    }
    menustats.hidden = !menustats.hidden
    if (!menustats.hidden) {
       // drawstats()
    }
}

// EVENT LISTENERS
uploadbutton.addEventListener("click", upload)
settingsbutton.addEventListener("click", settingsmenu)
statsbutton.addEventListener("click", statsmenu)