// Written by Passionyte (v.0.01)

// UI ELEMENTS

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
const shopui = document.getElementById("shop")
const upgdummy = document.getElementById("upgdummy")
const upglist = document.getElementById("upgrades")

// PLAYER VARIABLES
let views = 0
let subs = 0
let videos = 0
let upgrades = [
    {Name: "Subscriber Begging", Cost: 10000, Description: "Begging for subscribers raises the chance you get some!", Stat: "subchance", Inc: 0.05, Available: true},
    {Name: "Smash Like", Cost: 10000, Description: "Asking your viewers to smash the like button will increase your likes!", Stat: "likechance", Inc: 0.05, Available: true},
    {Name: "Custom Thumbnails", Cost: 100000, Description: "Begin creating custom thumbnails people will actually click!", Stat: "viewmult", Inc: 0.1, Available: true, MinSubs: 10000},
]

// UPGRADE VARIABLES
let upgradevars = {
    "subchance": 0,
    "likechance": 0,
    "viewmult": 1,
}
let ownedupgrades = []

// VIDEO VARIABLES
let vidviews = 0
let vidlikes = 0
let viddislikes = 0
let vidlife = 0
let vidcooldown = 0
let vidtitle = ""
let interval

// GAME TUNING
let timescale = 1
let vidlifetime = (5 * 60)
let cooldown = 30
let updaterate = 60

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

    vidtitle = uploadtitle.value
    uploadtitle.value = ""

    views += vidviews
    videos++

    vidviews = 0
    vidlikes = 0
    viddislikes = 0
    vidlife = vidlifetime
    vidcooldown = cooldown

    uploadui.hidden = true
    cooldownui.hidden = false

    videoui.hidden = false
    vidtitletext.innerText = vidtitle
    thumb.innerText = vidtitle

    step()

    interval = setInterval(tick, (1000 / timescale))
    setTimeout(ready, (1000 * cooldown))
}

function step() {
    totalsubs.innerText = `${subs} Subscribers`
    totalviews.innerText = `${views} Views`
    totalvids.innerText = `${videos} Videos`

    vidviewtext.innerText = `${vidviews} views`
    likes.innerText = vidlikes
    dislikes.innerText = viddislikes

    const ratings = (vidlikes + viddislikes)

    likebar.style.width = ((ratings > 0) && ((vidlikes / ratings) * 200)) || 0

    document.title = (((!cooldownui.hidden) && "(" + vidcooldown + ") ") || "") + `SocialSquid - ${subs} subscribers`

    if (!cooldownui.hidden) {
        timeout.innerText = `Bandwidth timed out: ${vidcooldown} seconds`
    }
    if (subs >= 1000 && shopui.hidden) {
        shopui.hidden = false
    }
    if (subs >= 100000) {
        playbutton.src = "images/" + (((subs >= 100000000) && "reddiamond") || ((subs >= 50000000) && "ruby") || ((subs >= 10000000) && "diamond") || ((subs >= 1000000) && "gold") || ((subs >= 100000) && "silver")) + ".png"
    }

    if (!shopui.hidden) {
        updateshop()
    }
}
// step()

function tick() {
    if (vidcooldown > 0) {
        vidcooldown--
    }
    if (vidlife > 0) {
        if (Math.random() < 0.9) {
            vidviews += Math.floor((Math.floor((((subs * Math.random()) / 32) + ((vidlikes * Math.random()) / 8))) + 1) * upgradevars.viewmult)
        }
        if (Math.random() < (0.1 + upgradevars.subchance)) {
            subs += ((Math.floor((((vidviews + subs) * Math.random()) / 96)) + 1))
        }
        if (Math.random() < (0.15 + upgradevars.likechance)) {
            vidlikes += ((Math.floor(((vidviews + subs) * Math.random()) / 600) + 1))
        }
        else if (Math.random() < 0.2) {
            viddislikes += ((Math.floor((vidviews * Math.random()) / 600) + 1))
        }
        vidlife--
    
        step()
    }  
}

function save() { // Convert our save data to a readable format.. save to localStorage
    if (subs > 0) { // Storage is valuable...
        let data = {}

        data.subs = subs
        data.views = views
        data.videos = videos
        data.video = false

        data.ownedupgrades = ownedupgrades
        data.upgradevars = upgradevars

        if (!videoui.hidden) {
            data.video = true
            data.vidtitle = vidtitle
            data.vidviews = vidviews
            data.vidlikes = vidlikes
            data.viddislikes = viddislikes
            data.vidlife = vidlife
        }

        if (!cooldownui.hidden) {
            data.vidcooldown = vidcooldown
        }

        localStorage.setItem("save", JSON.stringify(data))
        console.log("Saved user data.")
    }
}
setInterval(save, (updaterate * 1000))

function load() { // Convert our saved data to a expendible format.. load from localStorage
    let data = localStorage.getItem("save")

    if (data) {
        data = JSON.parse(data)

        subs = data.subs
        views = data.views
        videos = data.videos

        if (data.vidcooldown) {
            uploadui.hidden = true
            cooldownui.hidden = false

            setTimeout(ready, (data.vidcooldown * 1000))
        }
        if (data.video) {
            videoui.hidden = false
            vidtitletext.innerText = data.vidtitle
            thumb.innerText = data.vidtitle

            vidviews = data.vidviews
            vidlikes = data.vidlikes
            viddislikes = data.viddislikes
            vidlife = data.vidlife
            vidcooldown = data.vidcooldown
            ownedupgrades = data.ownedupgrades
            upgradevars = data.upgradevars
            interval = setInterval(tick, (1000 / timescale))
        }
        console.log("Loaded user data.")
        step()
    }
}
load()

function appendupgrade(table) {
    let upg = upgdummy.cloneNode(true)

    upg.id = table.Name

    upg.children[0].src = "images/" + ((table.Icon) && table.Icon || "placeholder") + ".png"
    upg.children[1].innerText = table.Name + " - " + table.Cost + " views"
    upg.children[3].innerText = table.Description

    upg.children[5].addEventListener("click", _ => {
        if (views >= table.Cost) {
            views -= table.Cost
            upgradevars[table.Stat] += table.Inc

            ownedupgrades.push(table.Name)

            upglist.removeChild(upg)
        }
    })

    upg.hidden = false
    upglist.appendChild(upg)
}

function findstring(string, table) {
    let result

    table.forEach(thing => {
        if (thing == string) {
            result = true
        }
    })

    return (result)
}

function updateshop() {
    upglist.innerHTML = ""

    for (i = 0; (i < upgrades.length); i++) {
        const upgrade = upgrades[i]

        if (((upgrade.Available) && (!upgrade.MinSubs || (subs >= upgrade.MinSubs))) && (!findstring(upgrade.Name, ownedupgrades))) {
            appendupgrade(upgrade)
        }
    }
}

// EVENT LISTENERS
uploadbutton.addEventListener("click", upload)