
// =========================
// CANVAS
// =========================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


// =========================
// TAMAÑO
// =========================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// =========================
// PLAYER
// =========================

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,

    width: 32,
    height: 32,

    speed: 3
};


// =========================
// TECLADO
// =========================

const keys = {};

window.addEventListener("keydown", function (event) {

    keys[event.key.toLowerCase()] = true;

});

window.addEventListener("keyup", function (event) {

    keys[event.key.toLowerCase()] = false;

});


// =========================
// JOYSTICK
// =========================

const joystick = document.getElementById("joystick");
const knob = document.getElementById("joystickKnob");

let joystickActive = false;

let joystickX = 0;
let joystickY = 0;

let touchId = null;

const joystickRadius = 65;


// =========================
// TOUCH START
// =========================

joystick.addEventListener("touchstart", function (event) {

    event.preventDefault();

    const touch = event.changedTouches[0];

    touchId = touch.identifier;

    joystickActive = true;

    moveJoystick(touch);

}, { passive: false });


// =========================
// TOUCH MOVE
// =========================

joystick.addEventListener("touchmove", function (event) {

    event.preventDefault();

    for (const touch of event.changedTouches) {

        if (touch.identifier === touchId) {

            moveJoystick(touch);

        }

    }

}, { passive: false });


// =========================
// TOUCH END
// =========================

joystick.addEventListener("touchend", function (event) {

    for (const touch of event.changedTouches) {

        if (touch.identifier === touchId) {

            joystickActive = false;

            joystickX = 0;
            joystickY = 0;

            knob.style.left = "50%";
            knob.style.top = "50%";

        }

    }

});


// =========================
// MOVER JOYSTICK
// =========================

function moveJoystick(touch) {

    const rect = joystick.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > joystickRadius) {

        dx = (dx / distance) * joystickRadius;
        dy = (dy / distance) * joystickRadius;

    }

    joystickX = dx / joystickRadius;
    joystickY = dy / joystickRadius;

    knob.style.left = `calc(50% + ${dx}px)`;
    knob.style.top = `calc(50% + ${dy}px)`;

}


// =========================
// MOVIMIENTO
// =========================

function updatePlayer() {

    let moveX = 0;
    let moveY = 0;


    // WASD

    if (keys["w"]) {
        moveY -= 1;
    }

    if (keys["s"]) {
        moveY += 1;
    }

    if (keys["a"]) {
        moveX -= 1;
    }

    if (keys["d"]) {
        moveX += 1;
    }


    // JOYSTICK

    if (joystickActive) {

        moveX += joystickX;
        moveY += joystickY;

    }


    // Normalizar movimiento diagonal

    const magnitude =
        Math.sqrt(moveX * moveX + moveY * moveY);

    if (magnitude > 0) {

        moveX /= magnitude;
        moveY /= magnitude;

    }


    player.x += moveX * player.speed;
    player.y += moveY * player.speed;

}


// =========================
// FONDO
// =========================

function drawBackground() {

    // Amarillo provisional del Backrooms

    ctx.fillStyle = "#c9bd6b";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// =========================
// PLAYER
// =========================

function drawPlayer() {

    // Cuadrado provisional

    ctx.fillStyle = "#ff0000";

    ctx.fillRect(
        player.x - player.width / 2,
        player.y - player.height / 2,
        player.width,
        player.height
    );

}


// =========================
// GAME LOOP
// =========================

function gameLoop() {

    updatePlayer();

    drawBackground();

    drawPlayer();

    requestAnimationFrame(gameLoop);

}


// =========================
// INICIAR
// =========================

gameLoop();
```
