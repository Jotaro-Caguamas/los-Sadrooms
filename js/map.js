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

    // -------------------------
    // FONDO
    // -------------------------

    ctx.fillStyle = "#c9bd6b";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // -------------------------
    // PAREDES
    // -------------------------

    ctx.fillStyle = "#7b3fb5";


    for (const wall of walls) {

        ctx.fillRect(

            wall.x - camera.x,

            wall.y - camera.y,

            wall.width,

            wall.height

        );

    }

}
