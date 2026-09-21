const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(
        320,
        Math.floor((innerWidth * innerHeight) / 4200)
    );

    stars = Array.from({ length: count }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: Math.random() * 1.5 + 0.25,
        a: Math.random() * 0.8 + 0.2,
        s: Math.random() * 0.018 + 0.006,
        phase: Math.random() * Math.PI * 2
    }));
}

window.addEventListener("resize", resize);
window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
resize();

function drawStars(t) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    const px = (mouse.x / innerWidth - 0.5) * 7;
    const py = (mouse.y / innerHeight - 0.5) * 7;

    for (const star of stars) {
        const twinkle = Math.max(
            0.12,
            star.a + Math.sin(t * star.s + star.phase) * 0.32
        );

        ctx.beginPath();
        ctx.arc(
            star.x + px * star.r,
            star.y + py * star.r,
            star.r,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 248, 210, ${twinkle})`;
        ctx.fill();

        if (star.r > 1.25 && twinkle > 0.8) {
            ctx.beginPath();
            ctx.moveTo(star.x - 4, star.y);
            ctx.lineTo(star.x + 4, star.y);
            ctx.moveTo(star.x, star.y - 4);
            ctx.lineTo(star.x, star.y + 4);
            ctx.strokeStyle = `rgba(255, 220, 80, ${twinkle * 0.25})`;
            ctx.stroke();
        }
    }

    if (Math.random() < 0.006) {
        shootingStars.push({
            x: Math.random() * innerWidth * 0.75,
            y: Math.random() * innerHeight * 0.35,
            vx: 6 + Math.random() * 4,
            vy: 2.5 + Math.random() * 2,
            life: 1
        });
    }

    shootingStars = shootingStars.filter((s) => s.life > 0);

    shootingStars.forEach((s) => {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx.strokeStyle = `rgba(255, 235, 150, ${s.life})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.018;
    });

    requestAnimationFrame(drawStars);
}
requestAnimationFrame(drawStars);


// ===============================
// MENSAJES DE LA GALAXIA
// ===============================
const modal = document.getElementById("messageModal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".memory").forEach((btn) => {
    btn.addEventListener("click", () => {
        modalText.textContent = btn.dataset.message;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        sparkleBurst(btn.getBoundingClientRect());
    });
});

function hideModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        hideModal();
    }
});

function sparkleBurst(rect) {
    for (let i = 0; i < 12; i++) {
        const s = document.createElement("span");

        s.textContent = Math.random() > 0.45 ? "✨" : "🌻";
        s.style.position = "fixed";
        s.style.zIndex = "80";
        s.style.left = `${rect.left + rect.width / 2}px`;
        s.style.top = `${rect.top + rect.height / 2}px`;
        s.style.pointerEvents = "none";
        s.style.fontSize = `${12 + Math.random() * 10}px`;

        document.body.appendChild(s);

        const angle = (Math.PI * 2 * i) / 12;
        const dist = 55 + Math.random() * 65;

        s.animate(
            [
                {
                    transform: "translate(-50%,-50%) scale(.2)",
                    opacity: 0
                },
                {
                    opacity: 1,
                    offset: 0.2
                },
                {
                    transform:
                        `translate(calc(-50% + ${Math.cos(angle) * dist}px), ` +
                        `calc(-50% + ${Math.sin(angle) * dist}px)) scale(1)`,
                    opacity: 0
                }
            ],
            {
                duration: 950,
                easing: "cubic-bezier(.2,.7,.2,1)"
            }
        ).onfinish = () => s.remove();
    }
}


// ===============================
// BOTÓN INICIAL: MÚSICA + GALAXIA
// ===============================
const openSurprise = document.getElementById("openSurprise");
const welcomeScreen = document.getElementById("welcomeScreen");
const galaxyExperience = document.getElementById("galaxyExperience");
const floricientaFrame = document.getElementById("floricientaFrame");

openSurprise.addEventListener("click", () => {
    // Inicia la canción después del clic del usuario.
    // YouTube puede aplicar sus propias restricciones según navegador/dispositivo.
    floricientaFrame.src =
        "https://www.youtube.com/embed/dOvQXBobwwM" +
        "?autoplay=1&playsinline=1&rel=0&controls=0";

    // Transición de la portada a la galaxia.
    welcomeScreen.classList.add("hide-welcome");
    galaxyExperience.classList.add("show-experience");
    galaxyExperience.setAttribute("aria-hidden", "false");

    // Lleva la pantalla al inicio de la experiencia.
    setTimeout(() => {
        galaxyExperience.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 250);
});
