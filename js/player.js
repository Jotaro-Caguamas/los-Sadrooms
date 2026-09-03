// ========================================
// PLAYER
// ========================================

export class Player {

    constructor(x, y) {

        // Posición en el mundo
        this.x = x;
        this.y = y;

        // Tamaño
        this.width = 40;
        this.height = 40;

        // Velocidad
        this.speed = 3;

        // Dirección del joystick
        this.joystickX = 0;
        this.joystickY = 0;

    }


    // ========================================
    // ACTUALIZAR PLAYER
    // ========================================

    update(keys, walls) {

        let moveX = 0;
        let moveY = 0;


        // -------------------------
        // WASD
        // -------------------------

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


        // -------------------------
        // JOYSTICK
        // -------------------------

        moveX += this.joystickX;
        moveY += this.joystickY;


        // -------------------------
        // NORMALIZAR
        // -------------------------

        const distance = Math.sqrt(
            moveX * moveX +
            moveY * moveY
        );

        if (distance > 0) {

            moveX /= distance;
            moveY /= distance;

        }


        // -------------------------
        // MOVIMIENTO X
        // -------------------------

        const newX =
            this.x + moveX * this.speed;

        if (!this.checkCollision(
            newX,
            this.y,
            walls
        )) {

            this.x = newX;

        }


        // -------------------------
        // MOVIMIENTO Y
        // -------------------------

        const newY =
            this.y + moveY * this.speed;

        if (!this.checkCollision(
            this.x,
            newY,
            walls
        )) {

            this.y = newY;

        }

    }


    // ========================================
    // COLISIONES
    // ========================================

    checkCollision(x, y, walls) {

        const playerLeft =
            x - this.width / 2;

        const playerRight =
            x + this.width / 2;

        const playerTop =
            y - this.height / 2;

        const playerBottom =
            y + this.height / 2;


        for (const wall of walls) {

            const wallLeft = wall.x;
            const wallRight =
                wall.x + wall.width;

            const wallTop = wall.y;
            const wallBottom =
                wall.y + wall.height;


            const collision =
                playerRight > wallLeft &&
                playerLeft < wallRight &&
                playerBottom > wallTop &&
                playerTop < wallBottom;


            if (collision) {

                return true;

            }

        }


        return false;

    }


    // ========================================
    // CÁMARA
    // ========================================

    getCamera(canvasWidth, canvasHeight) {

        return {

            x: this.x - canvasWidth / 2,

            y: this.y - canvasHeight / 2

        };

    }


    // ========================================
    // DIBUJAR PLAYER
    // ========================================

    draw(ctx) {

        // Placeholder temporal
        // Después aquí irá player.png

        ctx.fillStyle = "#ff0000";

        ctx.fillRect(

            this.x - this.width / 2,

            this.y - this.height / 2,

            this.width,

            this.height

        );

    }

}
