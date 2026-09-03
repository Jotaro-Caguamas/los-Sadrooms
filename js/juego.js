// ========================================
// IMPORTACIONES
// ========================================

import { Player } from "./player.js";

import {
    walls,
    drawMap
} from "./map.js";


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

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

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


window.addEventListener(
    "keydown",

    (event) => {

        keys[
            event.key.toLowerCase()
        ] = true;

    }

);


window.addEventListener(
    "keyup",

    (event) => {

        keys[
            event.key.toLowerCase()
        ] = false;

    }

);


// ========================================
// JOYSTICK
// ========================================

// Solo cargar en dispositivos táctiles

if (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
) {

    const joystickModule =
        await import("./joystick.js");


    joystickModule.createJoystick(
        player
    );

}


// ========================================
// RESIZE
// ========================================

window.addEventListener(
    "resize",

    () => {

        resizeCanvas();

    }

);


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {


    // -------------------------
    // ACTUALIZAR PLAYER
    // -------------------------

    player.update(
        keys,
        walls
    );


    // -------------------------
    // CÁMARA
    // -------------------------

    const camera =
        player.getCamera(
            canvas.width,
            canvas.height
        );


    // -------------------------
    // MAPA
    // -------------------------

    drawMap(
        ctx,
        camera,
        canvas.width,
        canvas.height
    );


    // -------------------------
    // PLAYER
    // -------------------------

    ctx.save();


    ctx.translate(
        -camera.x,
        -camera.y
    );


    player.draw(ctx);


    ctx.restore();


    // -------------------------
    // SIGUIENTE FRAME
    // -------------------------

    requestAnimationFrame(
        gameLoop
    );

}


// ========================================
// INICIAR
// ========================================

gameLoop();
