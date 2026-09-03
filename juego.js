
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;


// ==========================
// PLAYER
// ==========================

const player = {
    x: 400,
    y: 300,
    width: 32,
    height: 32,
    speed: 3
};


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

const joystick = {
    active: false,
    touchId: null,

    centerX: 0,
    centerY: 0,

    knobX: 0,
    knobY: 0,

    radius: 65,
    knobRadius: 25,

    x: 0,
    y: 0
};

const joystickBase = document.createElement("div");
joystickBase.id = "joystick";

const joystickKnob = document.createElement("div");
joystickKnob.id = "joystickKnob";

joystickBase.appendChild(joystickKnob);
document.body.appendChild(joystickBase);


// ==========================
// TOUCH
// ==========================

joystickBase.addEventListener("touchstart", (event) => {

    event.preventDefault();

    const touch = event.changedTouches[0];

    joystick.active = true;
    joystick.touchId = touch.identifier;

    const rect = joystickBase.getBoundingClientRect();

    joystick.centerX = rect.left + rect.width / 2;
    joystick.centerY = rect.top + rect.height / 2;

    updateJoystick(touch);

}, { passive: false });


window.addEventListener("touchmove", (event) => {

    if (!joystick.active) return;

    for (const touch of event.changedTouches) {

        if (touch.identifier === joystick.touchId) {

            event.preventDefault();

            updateJoystick(touch);
            break;
        }
    }

}, { passive: false });


window.addEventListener("touchend", (event) => {

    for (const touch of event.changedTouches) {

        if (touch.identifier === joystick.touchId) {

            joystick.active = false;
            joystick.touchId = null;

            joystick.x = 0;
            joystick.y = 0;

            joystickKnob.style.transform = "translate(-50%, -50%)";

            break;
        }
    }

});


// ==========================
// CALCULAR JOYSTICK
// ==========================

function updateJoystick(touch) {

    let dx = touch.clientX - joystick.centerX;
    let dy = touch.clientY - joystick.centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > joystick.radius) {

        dx = (dx / distance) * joystick.radius;
        dy = (dy / distance) * joystick.radius;

    }

    joystick.x = dx / joystick.radius;
    joystick.y = dy / joystick.radius;

    joystickKnob.style.transform =
        `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
}


// ==========================
// MOVIMIENTO
// ==========================

function updatePlayer() {

    let moveX = 0;
    let moveY = 0;


    // WASD

    if (keys["w"]) moveY -= 1;
    if (keys["s"]) moveY += 1;
    if (keys["a"]) moveX -= 1;
    if (keys["d"]) moveX += 1;


    // Joystick

    if (joystick.active) {

        moveX += joystick.x;
        moveY += joystick.y;

    }


    // Evitar que diagonal sea más rápida

    const magnitude =
        Math.sqrt(moveX * moveX + moveY * moveY);

    if (magnitude > 0) {

        moveX /= magnitude;
        moveY /= magnitude;

    }


    player.x += moveX * player.speed;
    player.y += moveY * player.speed;

}


// ==========================
// FONDO
// ==========================

function drawBackground() {

    ctx.fillStyle = "#c9bd6b";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// ==========================
// PLAYER
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
// CANVAS
// ==========================

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


// ==========================
// GAME LOOP
// ==========================

function gameLoop() {

    updatePlayer();

    drawBackground();

    drawPlayer();

    requestAnimationFrame(gameLoop);

}

gameLoop();
