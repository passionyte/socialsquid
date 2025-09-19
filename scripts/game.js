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
const viraltext = document.getElementById("viraltext")

// Channel
const totalsubs = document.getElementById("totalsubs")
const totalviews = document.getElementById("totalviews")
const totalvids = document.getElementById("totalvids")
const playbutton = document.getElementById("playbutton")
const pbboostdiv = document.getElementById("buttonboost")
const pbboosttext = document.getElementById("buttonboosttext")

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
    "timesviral": 0,
    "totalviews": 0,
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
    "cooldown": 60,
    "vidlifetime": 30,
    "viralchance": 0,
    "buttonboost": 1
}

// GAME
let timescale = 2
let fps = 30
let loaded = false
const vers = "0.02_2 alpha"

let interval

const upgrades = [
    // Subscriber Progression
    {Name: "Amateur Videos", Cost: 50, Description: "Well, you gotta start somewhere. (-10s cooldown)", Stat: "cooldown", Inc: -10, Available: true},
    {Name: "Share With Friends", Cost: 100, Description: "Your friends are sure to check out your videos! (+10% views)", Stat: "viewmult", Inc: 0.1, Available: true},
    {Name: "Subscriber Begging", Cost: 300, Description: "Begging for subscribers raises the chance you get some! (+5% chance for subs)", Stat: "subchance", Inc: 0.05, Available: true},
    {Name: "Sub4Sub", Cost: 500, Description: "Now you're desperate... (+5% subs)", Stat: "submult", Inc: 0.05, Available: true},
    {Name: "Faster Wi-Fi", Cost: 400, Description: "Wi-Fi will time out less if you upgrade it to be faster. (-10s cooldown)", Stat: "cooldown", Inc: -10, Available: true},
    {Name: "Smash Like", Cost: 800, Description: "Asking your viewers to smash the like button will increase your likes! (+15% chance for likes)", Stat: "likechance", Inc: 0.15, Available: true},
    {Name: "Smarter Titles", Cost: 1000, Description: "Better titles will make more people click. (Guaranteed chance for views)", Stat: "viewchance", Inc: 0.1, Available: true},
    {Name: "Experimentation", Cost: 2500, Description: "Having experimentation will draw more recommendations from the algorithm. (+15% views)", Stat: "viewmult", Inc: 0.15, Available: true, Requirements: {subs: 100}},
    {Name: "Enthusiasm", Cost: 2000, Description: "Perhaps not being boring may help your watch time! (+10s video lifetime)", Stat: "vidlifetime", Inc: 10, Available: true, Requirements: {subs: 100}},
    {Name: "Likeability", Cost: 3000, Description: "Make sure your audience loves you. (+10% subs)", Stat: "submult", Inc: 0.1, Available: true, Requirements: {subs: 100}},
    {Name: "Commentary", Cost: 4000, Description: "Adding commentary to your videos will make them more engaging! (+5% chance for subs)", Stat: "subchance", Inc: 0.05, Available: true, Requirements: {subs: 500}},
    {Name: "Giveaways", Cost: 5000, Description: "Say you are doing a giveaway, people are sure to like... (+10% chance for likes)", Stat: "likechance", Inc: 0.1, Available: true, Requirements: {subs: 500}},
    {Name: "Trending Topic", Cost: 8000, Description: "Making videos on trending topics will increase the longevity. (+15s vid lifetime)", Stat: "vidlifetime", Inc: 15, Available: true, Requirements: {subs: 1000}},
    {Name: "Webcam", Cost: 9000, Description: "Use a webcam for better viewer engagement. (+10% chance for subs)", Stat: "subchance", Inc: 0.1, Available: true, Requirements: {subs: 1000}},
    {Name: "Hit the bell", Cost: 10000, Description: "Tell viewers to hit the notification bell, makes them return more often! (+15% views)", Stat: "viewmult", Inc: 0.15, Available: true, Requirements: {subs: 1000}},
    {Name: "Decent Videos", Cost: 20000, Description: "Seems like you've gotten more experienced! But, you gotta pay.. for some reason (-10s cooldown)", Stat: "cooldown", Inc: -10, Available: true, Requirements: {subs: 2000}},
    {Name: "HD Video", Cost: 40000, Description: "Upgrade your device for better quality so less people dislike! (-10% chance for dislikes)", Stat: "dislikechance", Inc: -0.1, Available: true, Requirements: {subs: 5000}},
    {Name: "Even-Faster Wi-Fi", Cost: 50000, Description: "Reduce Wi-Fi timeout by making it EVEN-FASTER! (-15s cooldown)", Stat: "cooldown", Inc: -15, Available: true, Requirements: {subs: 5000}},
    {Name: "Custom Thumbnails", Cost: 100000, Description: "Begin creating custom thumbnails people will actually click! (+20% views)", Stat: "viewmult", Inc: 0.2, Available: true, Requirements: {subs: 10000}},
    {Name: "Unique Content", Cost: 80000, Description: "Having more unique content will make your videos stand out from others. (+20s vid lifetime)", Stat: "vidlifetime", Inc: 20, Available: true, Requirements: {subs: 10000}},
    {Name: "Shoutout", Cost: 110000, Description: "Yay a shoutout! (+15% subs)", Stat: "submult", Inc: 0.15, Available: true, Requirements: {subs: 10000}},
    {Name: "Fiber Wi-Fi", Cost: 350000, Description: "Upgrade your even-faster Wi-Fi to Fiber for even faster uploads. (-20s cooldown)", Stat: "cooldown", Inc: -20, Available: true, Requirements: {subs: 50000}},
    {Name: "Subaggedon", Cost: 400000, Description: "SUPA SUBS (+10% chance for subs)", Stat: "subchance", Inc: 0.1, Available: true, Requirements: {subs: 50000}},
    {Name: "Favorability", Cost: 700000, Description: "You've grown to the point people love you! Just believe! (+8% chance for likes)", Stat: "likechance", Inc: 0.08, Available: true, Requirements: {subs: 100000}},
    {Name: "Sponsorships", Cost: 800000, Description: "You get some sponsors which help you produce longer and more engaging videos. (+15s vid lifetime)", Stat: "vidlifetime", Inc: 15, Available: true, Requirements: {subs: 100000}},
    {Name: "Collaboration", Cost: 1600000, Description: "Collaborate with other creators! (+20% views)", Stat: "viewmult", Inc: 0.2, Available: true, Requirements: {subs: 500000}},
    {Name: "Longevity", Cost: 2200000, Description: "Looooongevity! (+15s vid lifetime)", Stat: "vidlifetime", Inc: 15, Available: true, Requirements: {subs: 1000000}},
    {Name: "More Subs", Cost: 2800000, Description: "Subs. Subs. And... More Subs... Not sandwiches right? (+15% subs)", Stat: "submult", Inc: 0.15, Available: true, Requirements: {subs: 1000000}},
    // Niche
    {Name: "Trendy Squid is Trendy", Cost: 777777, Description: "Just be trendy™ (+10% viral chance)", Stat: "viralchance", Inc: 0.1, Available: true, Requirements: {timesviral: 7}},
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

    const viral = (Math.random() >= (0.9 - upgvars.viralchance))
    stats.video.viral = viral

    viraltext.hidden = (!viral)

    uploadui.hidden = true
    cooldownui.hidden = false

    videoui.hidden = false
    vidtitletext.innerText = stats.video.title
    thumb.innerText = stats.video.title

    if (viral) {
       thumb.style.backgroundColor = "rgb(255, 255, 0)"
       stats.timesviral++
    }
    else {
        thumb.style.backgroundColor = "white" // I actually have no idea if this works
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
        const pblevel = ((roundedsubs >= 100000000) && 5) || ((roundedsubs >= 50000000) && 4) || ((roundedsubs >= 10000000) && 3) || ((roundedsubs >= 1000000) && 2) || 1
        playbutton.src = `images/${(((pblevel == 5) && "reddiamond") || ((pblevel == 4) && "ruby") || ((pblevel == 3) && "diamond") || ((pblevel == 2) && "gold") || "silver")}.png`
        
        const boost = (1 + (pblevel / 4))
        if (stats.buttonboost != boost || pbboostdiv.hidden) {
            stats.buttonboost = boost
            pbboostdiv.hidden = false
            pbboosttext.innerText = `Play button boosting Subscribers and Views by ${(pblevel * 25)}%!`
        }
    }
    
    drawshop()
}

function tick() {
    if (stats.video.cooldown > 0) {
        stats.video.cooldown -= ((1 / fps) * timescale)
    }
    else {
        ready()
    }
    if (stats.video.life > 0) {
        if (Math.random() <= (0.9 + upgvars.viewchance)) {
            const inc = (((Math.floor((((stats.subs * Math.random()) / 48) + ((stats.video.likes * Math.random()) / 8))) + 1) * (((upgvars.viewmult * upgvars.buttonboost) * ((stats.video.viral) && 7) || 1))) / 60) * timescale
            stats.video.views += inc
            stats.views += inc
            stats.totalviews += inc
        }
        if (Math.random() <= (0.2 + upgvars.subchance)) {
            stats.subs += (Math.floor((((((stats.video.views + stats.subs) * Math.random()) / 128)) + 1) * (upgvars.submult * upgvars.buttonboost)) / 60) * timescale
        }
        if (Math.random () <= (0.25 + upgvars.likechance)) {
            stats.video.likes += (((Math.floor(((stats.video.views + stats.subs) * Math.random()) / 600) + 1) * upgvars.likemult) / 60) * timescale
        }
        else if (Math.random() <= (0.3 + upgvars.dislikechance)) {
            stats.video.dislikes += (((Math.floor((stats.video.views * Math.random()) / 600) + 1) * upgvars.dislikemult) / 60) * timescale
        }
        stats.video.life -= ((1 / fps) * timescale)
    }  
    step()
}

function save() { // Convert our save data to a readable format.. save to localStorage
    if (stats.subs > 0 && loaded) { // Storage is valuable... and people's saves.
        localStorage.setItem("save", JSON.stringify(stats))
    }
}

function load() { // Convert our saved data to a expendible format.. load from localStorage
    let data = localStorage.getItem("save")

    if (data) {
        savedata = JSON.parse(data)
    
        for (const stat in stats) {
            if (!savedata[stat]) {
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
            thumb.style.backgroundColor = "white"
        }
    }

    loaded = true

    step()
}

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

function reqsmet(reqs) {
    for (const req in reqs) {
        if (stats[req] && (stats[req] >= reqs[req])) {
            return true
        }
    }

    return false
}

function drawshop() {
    for (i = 0; (i < upgrades.length); i++) {
        const upgrade = upgrades[i]

        if (!find(upgrade.Name, upgbuttons)) {
            if ((upgrade.Available) && (!upgrade.Requirements || reqsmet(upgrade.Requirements)) && (!find(upgrade.Name, stats.ownedupgrades))) {
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

// LOADING
load()
setInterval(save, ((fps * 1000) / timescale))
document.getElementById("loadscreen").hidden = true