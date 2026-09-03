// ========================================
// JOYSTICK MÓVIL
// ========================================

export function createJoystick(player) {

    // Crear joystick
    const joystick = document.createElement("div");
    const knob = document.createElement("div");

    joystick.id = "joystick";
    knob.id = "joystickKnob";

    joystick.appendChild(knob);
    document.body.appendChild(joystick);


    // Estilos
    joystick.style.position = "fixed";
    joystick.style.left = "30px";
    joystick.style.bottom = "30px";
    joystick.style.width = "130px";
    joystick.style.height = "130px";
    joystick.style.borderRadius = "50%";
    joystick.style.background = "rgba(255,255,255,0.15)";
    joystick.style.border = "3px solid rgba(255,255,255,0.4)";
    joystick.style.zIndex = "1000";
    joystick.style.touchAction = "none";

    knob.style.position = "absolute";
    knob.style.left = "50%";
    knob.style.top = "50%";
    knob.style.width = "50px";
    knob.style.height = "50px";
    knob.style.borderRadius = "50%";
    knob.style.background = "rgba(255,255,255,0.5)";
    knob.style.border = "2px solid white";
    knob.style.transform = "translate(-50%, -50%)";


    // ========================================
    // VARIABLES
    // ========================================

    let active = false;
    let touchId = null;

    let directionX = 0;
    let directionY = 0;

    const radius = 65;


    // ========================================
    // ACTUALIZAR PLAYER
    // ========================================

    function updatePlayer() {

        player.joystickX = directionX;
        player.joystickY = directionY;

    }


    // ========================================
    // MOVER JOYSTICK
    // ========================================

    function moveJoystick(touch) {

        const rect = joystick.getBoundingClientRect();

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;


        let dx = touch.clientX - centerX;
        let dy = touch.clientY - centerY;


        const distance =
            Math.sqrt(dx * dx + dy * dy);


        // Limitar el joystick
        if (distance > radius) {

            dx = (dx / distance) * radius;
            dy = (dy / distance) * radius;

        }


        // Convertir a dirección
        directionX = dx / radius;
        directionY = dy / radius;


        // Mover círculo interior
        knob.style.left =
            `calc(50% + ${dx}px)`;

        knob.style.top =
            `calc(50% + ${dy}px)`;


        updatePlayer();

    }


    // ========================================
    // TOUCH START
    // ========================================

    joystick.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            const touch = event.changedTouches[0];

            active = true;

            touchId = touch.identifier;

            moveJoystick(touch);

        },
        { passive: false }
    );


    // ========================================
    // TOUCH MOVE
    // ========================================

    joystick.addEventListener(
        "touchmove",
        function(event) {

            event.preventDefault();

            for (const touch of event.changedTouches) {

                if (touch.identifier === touchId) {

                    moveJoystick(touch);

                }

            }

        },
        { passive: false }
    );


    // ========================================
    // TOUCH END
    // ========================================

    joystick.addEventListener(
        "touchend",
        function(event) {

            for (const touch of event.changedTouches) {

                if (touch.identifier === touchId) {

                    active = false;

                    touchId = null;

                    directionX = 0;
                    directionY = 0;

                    knob.style.left = "50%";
                    knob.style.top = "50%";

                    updatePlayer();

                }

            }

        }
    );

}
