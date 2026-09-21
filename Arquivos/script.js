const menu = document.querySelector(".nav-menu");
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");


/* Menu */

const closeMenu = () => {
    menu?.classList.remove("active");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Abrir menu");
};

toggle?.addEventListener("click", () => {
    const active = menu.classList.toggle("active");

    toggle.setAttribute("aria-expanded", active);
    toggle.setAttribute(
        "aria-label",
        active ? "Fechar menu" : "Abrir menu"
    );
});


/* Fechar menu */

links.forEach(link => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", ({ key }) => {
    if (key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
    if (innerWidth > 768) closeMenu();
});


/* Navegação ativa */

const updateActiveLink = () => {
    const position = scrollY + 150;

    let current = "";

    sections.forEach(section => {
        if (
            position >= section.offsetTop &&
            position < section.offsetTop + section.offsetHeight
        ) {
            current = section.id;
        }
    });

    links.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
};

addEventListener("scroll", updateActiveLink);
addEventListener("load", updateActiveLink);


/* Rolagem suave */

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));

        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* Ano do rodapé */

document.querySelector("#current-year").textContent =
    new Date().getFullYear();