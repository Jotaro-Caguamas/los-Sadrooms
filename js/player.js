export class Player {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 40;

        this.speed = 3;

    }


    // ==========================
    // MOVIMIENTO
    // ==========================

    update(keys) {

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


        // Evitar velocidad extra en diagonal

        const distance =
            Math.sqrt(
                moveX * moveX +
                moveY * moveY
            );


        if (distance > 0) {

            moveX /= distance;
            moveY /= distance;

        }


        // Aplicar movimiento

        this.x += moveX * this.speed;
        this.y += moveY * this.speed;

    }


    // ==========================
    // DIBUJAR
    // ==========================

    draw(ctx) {

        ctx.fillStyle = "#ff0000";

        ctx.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );

    }

}
