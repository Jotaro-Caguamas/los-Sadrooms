const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// Jugador temporal
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 40,
    speed: 4
};


// Teclas
const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});


// Actualizar jugador
function update() {

    if (keys["w"]) player.y -= player.speed;
    if (keys["s"]) player.y += player.speed;
    if (keys["a"]) player.x -= player.speed;
    if (keys["d"]) player.x += player.speed;

}


// Dibujar
function draw() {

    // Fondo
    ctx.fillStyle = "#c9bd6b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // Jugador temporal
    ctx.fillStyle = "red";

    ctx.fillRect(
        player.x - player.size / 2,
        player.y - player.size / 2,
        player.size,
        player.size
    );

}


// Bucle
function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();
