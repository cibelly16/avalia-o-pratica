/* =====================================================
   MARTE: UM NOVO LAR
   JAVASCRIPT PRINCIPAL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MENU RESPONSIVO
    ================================================= */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("active");

        menuToggle.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    /* =================================================
       ANIMAÇÕES AO APARECER NA TELA
    ================================================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =================================================
       BOTÃO VOLTAR AO TOPO
    ================================================= */

    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =================================================
       CARDS INTERATIVOS DE ALIMENTAÇÃO
    ================================================= */

    const cardToggles = document.querySelectorAll(".card-toggle");

    cardToggles.forEach(button => {

        button.addEventListener("click", () => {

            const extraContent = button.nextElementSibling;

            const isOpen = extraContent.classList.toggle("open");

            button.classList.toggle("open");

            button.setAttribute("aria-expanded", isOpen);

            button.querySelector("span").textContent = isOpen ? "−" : "+";

        });

    });


    /* =================================================
       SIMULADOR DE ROTINA EM MARTE
    ================================================= */

    const timelineItems = document.querySelectorAll(".timeline-item");

    const plannerIcon = document.getElementById("plannerIcon");
    const plannerTime = document.getElementById("plannerTime");
    const plannerTitle = document.getElementById("plannerTitle");
    const plannerDescription = document.getElementById("plannerDescription");

    const routineData = {

        "08:00": {
            icon: "◉",
            title: "Acordar na base",
            description: "Começar o dia em um ambiente pressurizado, seguro e preparado para a rotina marciana."
        },

        "10:00": {
            icon: "▣",
            title: "Trabalhar e pesquisar",
            description: "Realizar pesquisas científicas, cuidar dos sistemas da base e estudar o ambiente."
        },

        "13:00": {
            icon: "◇",
            title: "Alimentar-se",
            description: "Fazer uma refeição preparada com alimentos armazenados ou produzidos em estufas."
        },

        "15:00": {
            icon: "✦",
            title: "Explorar o planeta",
            description: "Utilizar um traje espacial para realizar atividades externas com segurança."
        },

        "20:00": {
            icon: "≈",
            title: "Descansar",
            description: "Retornar à habitação, realizar a manutenção dos equipamentos e descansar."
        }

    };

    timelineItems.forEach(item => {

        item.addEventListener("click", () => {

            timelineItems.forEach(otherItem => {
                otherItem.classList.remove("active");
            });

            item.classList.add("active");

            const selectedTime = item.dataset.time;
            const data = routineData[selectedTime];

            plannerIcon.textContent = data.icon;
            plannerTime.textContent = selectedTime;
            plannerTitle.textContent = data.title;
            plannerDescription.textContent = data.description;

        });

    });


    /* =================================================
       ROLAGEM SUAVE PARA LINKS INTERNOS
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =================================================
       EFEITO PARALLAX SUAVE NO PLANETA
    ================================================= */

    const planet = document.querySelector(".planet");

    window.addEventListener("scroll", () => {

        if (!planet) return;

        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {

            planet.style.transform =
                `translateY(${scrollPosition * 0.05}px)`;

        }

    });


    /* =================================================
       ACESSIBILIDADE: TECLA ESC FECHA MENU
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            nav.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

});