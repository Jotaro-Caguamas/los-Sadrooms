
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Mantener el pixel-art nítido
ctx.imageSmoothingEnabled = false;


// ==========================
// CONFIGURACIÓN DEL JUEGO
// ==========================

const player = {
    x: 400,
    y: 300,
    width: 32,
    height: 32,
    speed: 3
};


// Teclas presionadas
const keys = {};


// ==========================
// CONTROLES
// ==========================

window.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});


// ==========================
// TAMAÑO DEL CANVAS
// ==========================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


// ==========================
// MOVIMIENTO DEL PLAYER
// ==========================

function updatePlayer() {

    if (keys["w"]) {
        player.y -= player.speed;
    }

    if (keys["s"]) {
        player.y += player.speed;
    }

    if (keys["a"]) {
        player.x -= player.speed;
    }

    if (keys["d"]) {
        player.x += player.speed;
    }

}


// ==========================
// DIBUJAR FONDO
// ==========================

function drawBackground() {

    // Fondo amarillo de los Backrooms
    ctx.fillStyle = "#c9bd6b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}


// ==========================
// DIBUJAR PLAYER
// ==========================

function drawPlayer() {

    // Placeholder temporal
    ctx.fillStyle = "#ff0000";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

}


// ==========================
// GAME LOOP
// ==========================

function gameLoop() {

    updatePlayer();

    drawBackground();

    drawPlayer();

    requestAnimationFrame(gameLoop);
}


// Iniciar juego
gameLoop();


