// ========================================
// CONFIGURACIÓN
// ========================================

const TILE_SIZE = 64;


// ========================================
// TEXTURA DEL SUELO
// ========================================

const floorTexture = new Image();

floorTexture.src = "./sprites/suelo.png";


// ========================================
// PAREDES
// ========================================

export const walls = [

    // -------------------------
    // PARED SUPERIOR
    // -------------------------

    {
        x: 100,
        y: 100,
        width: 800,
        height: 40
    },


    // -------------------------
    // PARED IZQUIERDA
    // -------------------------

    {
        x: 100,
        y: 100,
        width: 40,
        height: 500
    },


    // -------------------------
    // PARED DERECHA
    // -------------------------

    {
        x: 860,
        y: 100,
        width: 40,
        height: 500
    },


    // -------------------------
    // PARED INFERIOR
    // -------------------------

    {
        x: 100,
        y: 560,
        width: 800,
        height: 40
    }

];


// ========================================
// DIBUJAR MAPA
// ========================================

export function drawMap(ctx, camera, width, height) {

    // ====================================
    // SUELO
    // ====================================

    // Primero rellenamos todo de un color
    // por si la textura todavía no ha cargado.

    ctx.fillStyle = "#c9bd6b";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // ====================================
    // TEXTURA DEL SUELO
    // ====================================

    if (floorTexture.complete && floorTexture.naturalWidth > 0) {

        /*
         * Calculamos qué parte del mapa
         * debe aparecer según la cámara.
         */

        const startX =
            Math.floor(camera.x / TILE_SIZE) * TILE_SIZE;

        const startY =
            Math.floor(camera.y / TILE_SIZE) * TILE_SIZE;


        // Dibujamos suficientes tiles para
        // cubrir toda la pantalla.

        for (
            let worldY = startY;
            worldY < camera.y + height + TILE_SIZE;
            worldY += TILE_SIZE
        ) {

            for (
                let worldX = startX;
                worldX < camera.x + width + TILE_SIZE;
                worldX += TILE_SIZE
            ) {

                ctx.drawImage(

                    floorTexture,

                    worldX - camera.x,
                    worldY - camera.y,

                    TILE_SIZE,
                    TILE_SIZE

                );

            }

        }

    }


    // ====================================
    // PAREDES
    // ====================================

    ctx.fillStyle = "#151515";


    for (const wall of walls) {

        ctx.fillRect(

            wall.x - camera.x,

            wall.y - camera.y,

            wall.width,

            wall.height

        );

    }

}
