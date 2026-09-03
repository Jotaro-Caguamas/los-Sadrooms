import { Player } from "./player.js";

import {
    walls,
    drawMap
} from "./map.js";

import {
    createJoystick
} from "./joystick.js";


// ========================================
// CANVAS
// ========================================

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


// ========================================
// TAMAÑO
// ========================================

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();


// ========================================
// PLAYER
// ========================================

const player = new Player(
    480,
    330
);


// ========================================
// TECLADO
// ========================================

const keys = {};

window.addEventListener("keydown", (event) => {

    keys[event.key.toLowerCase()] = true;

});

window.addEventListener("keyup", (event) => {

    keys[event.key.toLowerCase()] = false;

});


// ========================================
// JOYSTICK
// ========================================

if (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
) {

    createJoystick(player);

}


// ========================================
// CAMBIO DE TAMAÑO
// ========================================

window.addEventListener("resize", () => {

    resizeCanvas();

});


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    // Actualizar jugador
    player.update(
        keys,
        walls
    );


    // Obtener cámara
    const camera =
        player.getCamera(
            canvas.width,
            canvas.height
        );


    // Dibujar mapa
    drawMap(
        ctx,
        camera,
        canvas.width,
        canvas.height
    );


    // Dibujar Player
    ctx.save();

    ctx.translate(
        -camera.x,
        -camera.y
    );

    player.draw(ctx);

    ctx.restore();


    // Siguiente frame
    requestAnimationFrame(gameLoop);

}


// ========================================
// INICIAR
// ========================================

gameLoop();
