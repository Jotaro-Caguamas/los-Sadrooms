// ========================================
// PAREDES
// ========================================

export const walls = [

    // Pared superior
    {
        x: 100,
        y: 100,
        width: 800,
        height: 40
    },

    // Pared izquierda
    {
        x: 100,
        y: 100,
        width: 40,
        height: 500
    },

    // Pared derecha
    {
        x: 860,
        y: 100,
        width: 40,
        height: 500
    },

    // Pared inferior
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

export function drawMap(ctx, width, height) {

    // Fondo
    ctx.fillStyle = "#c9bd6b";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // Paredes
    ctx.fillStyle = "#7b3fb5";

    for (const wall of walls) {

        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );

    }

}
