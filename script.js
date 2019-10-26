var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//gambar
var BG = new Image();
BG.src = "./asset/background.jpg";
var pointLogo = new Image();
pointLogo.src = "./asset/point.png";
var gg = new Image();
gg.src = "./asset/garis.jpg";
var panah = new Image();
panah.src = "./asset/panah.jpg";

//consol
let GARIS_WIDTH = 100;
let GARIS_MARGIN_BOTTOM = 50;
let GARIS_HEIGHT = 20;
let point = 0;
let kiri = false;
let kanan = false;
let reset = false;

// gambar garis
let GARIS = {
    x: c.width / 2 - GARIS_WIDTH / 2,
    y: c.height - GARIS_MARGIN_BOTTOM - GARIS_HEIGHT,
    width: GARIS_WIDTH,
    height: GARIS_HEIGHT,
    dx: 5
}
function drawGARIS() {
    ctx.fillRect(GARIS.x, GARIS.y, GARIS.width, GARIS.height);
    ctx.strokeRect(GARIS.x, GARIS.y, GARIS.width, GARIS.height);
    ctx.drawImage(gg, GARIS.x, GARIS.y, width = GARIS_WIDTH, height = GARIS_HEIGHT)

}

// control kanan kiri
document.addEventListener('keydown', function (row) {
    if (row.keyCode === 68) {
        kanan = true
    } else if (row.keyCode === 65) {
        kiri = true
    } else if (row.keyCode === 13) {
        reset = true
    }
})
document.addEventListener('keyup', function (row) {
    if (row.keyCode === 68) {
        kanan = false
    } else if (row.keyCode === 65) {
        kiri = false
    }
})
function gerakanGaris() {
    if (kanan && (GARIS.x - GARIS.width + 200) < c.width) {
        GARIS.x += GARIS.dx
    } else if (kiri && GARIS.x > 0) {
        GARIS.x -= GARIS.dx
    }
}

// gambar rintangan
let kotak = {
    x: Math.floor((Math.random() * 150) + 1),
    y: 0,
    width: 100,
    height: 100,
    speed: 3
}
function drawRintangan() {
    ctx.fillRect(kotak.x, kotak.y, kotak.width, kotak.height);
    ctx.strokeRect(kotak.x, kotak.y, kotak.width, kotak.height);
    ctx.drawImage(panah, kotak.x, kotak.y, width = kotak.width, height = kotak.height)
}
function tambahRintangan() {
    if (kotak.y >= c.height) {
        if (point % 5 === 0 && point > 0) {
            kotak.speed += 2
            GARIS.dx += 5
        }
        kotak.x = Math.floor((Math.random() * 250) + 3)
        kotak.y = 0
        point++
    } else {
        kotak.y += kotak.speed
    }
}

// jika kena 
function cek() {
    if (kotak.y + kotak.height >= GARIS.y && kotak.y < GARIS.y + GARIS.height) {
        if (GARIS.x <= kotak.x + kotak.width && GARIS.x + GARIS.width >= kotak.x) {
            reset = true
        }
    }
}

//gambar point
function showGameStats(text, textX, textY, img, imgX, imgY) {
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

//proses game
function gambar() {
    drawGARIS()
    drawRintangan()
    showGameStats(point, 200, 25, pointLogo, 170, 5)
}
function gerakan() {
    tambahRintangan()
    gerakanGaris()
}
function loop() {
    cek()
    ctx.drawImage(BG, 0, 0)
    gambar()
    gerakan()
    if (reset !== true) {
        requestAnimationFrame(loop);
    }
    else {
        showYouLose()
    }
}
loop()

//munculin point jika kalah
let gameover = document.getElementById("gameover")
let yourPoint = gameover.children[1]
function showYouLose() {
    gameover.style.display = "block";
    playAgain.style.display = "block";
    yourPoint.innerHTML = point
}

//reset button
playAgain.addEventListener("click", function () {
    location.reload();
})