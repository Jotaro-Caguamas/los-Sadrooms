import { Player } from "./player.js";
import { drawMap } from "./map.js";


// ==========================
// CANVAS
// ==========================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


// ==========================
// TAMAÑO
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
// JOYSTICK
// ==========================

// Solo cargar joystick en dispositivos táctiles

if ("ontouchstart" in window) {

    const joystickModule =
        await import("./joystick.js");

    joystickModule.createJoystick(player);

}


// ==========================
// GAME LOOP
// ==========================

function gameLoop() {

    player.update(keys);

    drawMap(
        ctx,
        canvas.width,
        canvas.height
    );

    player.draw(ctx);

    requestAnimationFrame(gameLoop);

}


gameLoop();
