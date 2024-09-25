// UI ELEMENTS

// Upload
const uploadui = document.getElementById("upload")
const uploadbutton = document.getElementById("uploadbutton")
const uploadtitle = document.getElementById("uploadtitle")

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
}

function upload() {
    uploadedat = performance.now()
    console.log(uploadedat)

    if (interval) {
        clearInterval(interval)
        interval = null
    }

    const title = uploadtitle.value

    views += vidviews
    videos++

    vidviews = 0
    vidlikes = 0
    viddislikes = 0

    uploadui.hidden = true

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

    likebar.style.width = ((vidlikes / (vidlikes + viddislikes)) * 200)
}

function tick() {
    if ((performance.now() - uploadedat) < (vidlifetime * 1000)) {
        if (Math.random() < 0.9) {
            vidviews += (Math.floor(((subs * Math.random()) / 16)) + 1)
        }
        if (Math.random() < 0.1) {
            subs += ((Math.floor(((subs * Math.random()) / 64)) + 1))
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

// EVENT LISTENERS
uploadbutton.addEventListener("click", upload)