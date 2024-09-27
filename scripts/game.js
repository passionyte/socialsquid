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
const vidtitle = document.getElementById("vidtitle")
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

// PLAYER VARIABLES
let views = 0
let subs = 0
let videos = 0

// VIDEO VARIABLES
let vidviews = 0
let vidlikes = 0
let viddislikes = 0
let uploadedat = 0
let interval

// GAME TUNING
let timescale = 1
let vidlifetime = (5 * 60)
let cooldown = 30

// FUNCTIONS
function ready() {
    uploadui.hidden = false
    cooldownui.hidden = true
}

function upload() {
    uploadedat = performance.now()

    if (interval) {
        clearInterval(interval)
        interval = null
    }

    const title = uploadtitle.value
    uploadtitle.value = ""

    views += vidviews
    videos++

    vidviews = 0
    vidlikes = 0
    viddislikes = 0

    uploadui.hidden = true
    cooldownui.hidden = false

    videoui.hidden = false
    vidtitle.innerText = title
    thumb.innerText = title

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

    const cdwait = (cooldown - Math.floor(((performance.now() / 1000) - (uploadedat / 1000))))

    document.title = (((!cooldownui.hidden) && "(" + cdwait + ") ") || "") + `SocialSquid - ${subs} subscribers`

    if (!cooldownui.hidden) {
        timeout.innerText = `Bandwidth timed out: ${cdwait} seconds`
    }
    if (subs >= 1000 && shopui.hidden) {
        shopui.hidden = false
    }
    if (subs >= 100000) {
        playbutton.src = "images/" + (((subs >= 100000000) && "reddiamond") || ((subs >= 50000000) && "ruby") || ((subs >= 10000000) && "diamond") || ((subs >= 1000000) && "gold") || ((subs >= 100000) && "silver")) + ".png"
    }
}
step()

function tick() {
    if ((performance.now() - uploadedat) < (vidlifetime * 1000)) {
        if (Math.random() < 0.9) {
            vidviews += (Math.floor((((subs * Math.random()) / 32) + ((vidlikes * Math.random()) / 8))) + 1)
        }
        if (Math.random() < 0.1) {
            subs += ((Math.floor((((vidviews + subs) * Math.random()) / 96)) + 1))
        }
        if (Math.random() < 0.15) {
            vidlikes += ((Math.floor(((vidviews + subs) * Math.random()) / 600) + 1))
        }
        else if (Math.random() < 0.2) {
            viddislikes += ((Math.floor((vidviews * Math.random()) / 600) + 1))
        }
    
        step()
    }  
}

function save() { // Convert our save data to a readable format.. save to localStorage
    let data = {}

    data.subs = subs
    data.views = views
    data.videos = videos

    if (!videoui.hidden) {
        data.vidname = uploadtitle.value
        data.vidviews = vidviews
        data.vidlikes = vidlikes
        data.viddislikes = viddislikes
        data.uploadedat = (performance.now() - uploadedat)
    }

    if (!cooldownui.hidden) {
        data.cooldownleft = (cooldown - Math.floor(((performance.now() / 1000) - (uploadedat / 1000))))
    }

    localStorage.setItem("save", JSON.stringify(data))
    console.log("Saved user data")
}

function load() { // Convert our saved data to a expendible format.. load from localStorage
    const data = localStorage.getItem("save")

    if (data) {
        data = JSON.parse(data)

        subs = data.subs
        views = data.views
        videos = data.videos

        if (data.cooldownleft) {
            uploadui.hidden = true
            cooldownui.hidden = false

            setTimeout(ready, (data.cooldownleft * 1000))
        }
        if (data.vidname) {
            videoui.hidden = false
            vidtitle.innerText = data.vidname
            thumb.innerText = data.vidname        

            vidviews = data.vidviews
            vidlikes = data.vidlikes
            viddislikes = data.viddislikes
            uploadedat = data.uploadedat
            interval = setInterval(tick, (1000 / timescale)) // teest
        }
        step()
    }
}

// EVENT LISTENERS
uploadbutton.addEventListener("click", upload)