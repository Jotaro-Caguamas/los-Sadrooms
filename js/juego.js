import { Player } from "./player.js";
import { drawMap } from "./map.js";


// ==========================
// CANVAS
// ==========================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


// ==========================
// TAMAÑO DE PANTALLA
// ==========================

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// ==========================
// PLAYER
// ==========================

const player = new Player(
    canvas.width / 2,
    canvas.height / 2
);


// ==========================
// TECLADO
// ==========================

const keys = {};

window.addEventListener("keydown", (event) => {

    keys[event.key.toLowerCase()] = true;

});

window.addEventListener("keyup", (event) => {

    keys[event.key.toLowerCase()] = false;

});


// ==========================
// ACTUALIZAR JUEGO
// ==========================

function update() {

    player.update(keys);

}


// ==========================
// DIBUJAR JUEGO
// ==========================

function draw() {

    // Mapa
    drawMap(
        ctx,
        canvas.width,
        canvas.height
    );


    // Player
    player.draw(ctx);

}


// ==========================
// GAME LOOP
// ==========================

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);

}


// ==========================
// INICIAR
// ==========================

gameLoop();
