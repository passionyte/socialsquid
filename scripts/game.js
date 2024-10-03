// Written by Passionyte

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

// STATISTICS
let stats = {
    "subs": 0,
    "views": 0,
    "videos": 0,
    "upgradevars": {
        "subchance": 0,
        "likechance": 0,
        "viewmult": 1,
    },
    "ownedupgrades": [],
    "video": {
        views: 0,
        likes: 0,
        dislikes: 0,
        life: 0,
        cooldown: 0,
        title: ""
    }
}

// GAME
let timescale = 1
let vidlifetime = 120
let cooldown = 30
let updaterate = 60

let interval

const upgrades = [
    {Name: "Subscriber Begging", Cost: 10000, Description: "Begging for subscribers raises the chance you get some!", Stat: "subchance", Inc: 0.05, Available: true},
    {Name: "Smash Like", Cost: 10000, Description: "Asking your viewers to smash the like button will increase your likes!", Stat: "likechance", Inc: 0.05, Available: true},
    {Name: "Custom Thumbnails", Cost: 100000, Description: "Begin creating custom thumbnails people will actually click!", Stat: "viewmult", Inc: 0.1, Available: true, MinSubs: 10000},
]

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

    stats.views += stats.video.views
    stats.videos++

    stats.video.views = 0
    stats.video.likes = 0
    stats.video.dislikes = 0
    stats.video.life = vidlifetime
    stats.video.cooldown = cooldown

    uploadui.hidden = true
    cooldownui.hidden = false

    videoui.hidden = false
    vidtitletext.innerText = stats.video.title
    thumb.innerText = stats.video.title

    step()

    interval = setInterval(tick, (1000 / timescale))
    setTimeout(ready, (1000 * cooldown))
}

function step() {
    totalsubs.innerText = `${stats.subs} Subscribers`
    totalviews.innerText = `${stats.views} Views`
    totalvids.innerText = `${stats.videos} Videos`

    vidviewtext.innerText = `${stats.video.views} views`
    likes.innerText = stats.video.likes
    dislikes.innerText = stats.video.dislikes

    const ratings = (stats.video.likes + stats.video.dislikes)

    likebar.style.width = ((ratings > 0) && ((stats.video.likes / ratings) * 200)) || 0

    document.title = (((!cooldownui.hidden) && "(" + stats.video.cooldown + ") ") || "") + `SocialSquid - ${stats.subs} subscribers`

    if (!cooldownui.hidden) {
        timeout.innerText = `Bandwidth timed out: ${stats.video.cooldown} seconds`
    }
    if (stats.subs >= 100000) {
        playbutton.src = `images/${(((stats.subs >= 100000000) && "reddiamond") || ((stats.subs >= 50000000) && "ruby") || ((stats.subs >= 10000000) && "diamond") || ((stats.subs >= 1000000) && "gold") || ((stats.subs >= 100000) && "silver"))}.png`
    }
    
    updateshop()
}

function tick() {
    if (stats.video.cooldown > 0) {
        stats.video.cooldown--
    }
    if (stats.video.life > 0) {
        if (Math.random() < 0.9) {
            stats.video.views += Math.floor((Math.floor((((stats.subs * Math.random()) / 32) + ((stats.video.likes * Math.random()) / 8))) + 1) * stats.upgradevars.viewmult)
        }
        if (Math.random() < (0.1 + stats.upgradevars.subchance)) {
            stats.subs += ((Math.floor((((stats.video.views + stats.subs) * Math.random()) / 96)) + 1))
        }
        if (Math.random() < (0.15 + stats.upgradevars.likechance)) {
            stats.video.likes += ((Math.floor(((stats.video.views + stats.subs) * Math.random()) / 600) + 1))
        }
        else if (Math.random() < 0.2) {
            stats.video.dislikes += ((Math.floor((stats.video.views * Math.random()) / 600) + 1))
        }
        stats.video.life--
    
        step()
    }  
}

function save() { // Convert our save data to a readable format.. save to localStorage
    if (stats.subs > 0) { // Storage is valuable...
        localStorage.setItem("save", JSON.stringify(stats))
        console.log("Saved user data.")
    }
}
setInterval(save, (updaterate * 1000))

function load() { // Convert our saved data to a expendible format.. load from localStorage
    let data = localStorage.getItem("save")

    if (data) {
        data = JSON.parse(data)

        for (i = 0; (i < data.length); i++) {
            stats[i] = data[i]
        }

        const cd = data.video.cooldown
        if (cd > 0) {
            uploadui.hidden = true
            cooldownui.hidden = false

            setTimeout(ready, (cd * 1000))
        }
        if (data.video) {
            videoui.hidden = false
            vidtitletext.innerText = data.video.title
            thumb.innerText = data.video.title
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

    upg.children[0].src = `images/${((table.Icon) && table.Icon || "placeholder")}.png`
    upg.children[1].innerText = `${table.Name} - ${table.Cost} views`
    upg.children[3].innerText = table.Description

    upg.children[5].addEventListener("click", _ => {
        if (stats.views >= table.Cost) {
            stats.views -= table.Cost
            upgradevars[table.Stat] += table.Inc

            stats.ownedupgrades.push(table.Name)

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

        if (((upgrade.Available) && (!upgrade.MinSubs || (stats.subs >= upgrade.MinSubs))) && (!findstring(upgrade.Name, stats.ownedupgrades))) {
            appendupgrade(upgrade)
        }
    }
}

// EVENT LISTENERS
uploadbutton.addEventListener("click", upload)