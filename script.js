/* ========================================
   MARTE: UM NOVO LAR
   FUNCIONALIDADES JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // MENU RESPONSIVO
    // ========================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.classList.toggle("active", isOpen);
    });

    // Fecha o menu ao clicar em um link
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });


    // ========================================
    // ROLAGEM SUAVE
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

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


    // ========================================
    // BOTÃO VOLTAR AO TOPO
    // ========================================

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


    // ========================================
    // ANIMAÇÕES AO APARECER NA TELA
    // ========================================

    const elementsToReveal = document.querySelectorAll(
        ".section-heading, .planet-overview, .habitat-layout, " +
        ".food-card, .suit-layout, .conclusion-content"
    );

    elementsToReveal.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.1
    });

    elementsToReveal.forEach(element => {
        revealObserver.observe(element);
    });


    // ========================================
    // EXPANSÃO DE INFORMAÇÕES
    // ========================================

    const detailsButton = document.querySelector(".details-btn");
    const expandable = document.getElementById("habitatDetails");

    if (detailsButton && expandable) {

        detailsButton.addEventListener("click", () => {

            const isOpen = expandable.classList.toggle("open");

            detailsButton.querySelector("span").textContent =
                isOpen ? "−" : "+";

            detailsButton.childNodes[0].textContent =
                isOpen
                    ? " Ocultar detalhes "
                    : " Ver detalhes da construção ";

        });

    }


    // ========================================
    // EFEITO PARALLAX SUAVE NO PLANETA
    // ========================================

    const planet = document.querySelector(".planet");

    window.addEventListener("scroll", () => {

        if (planet && window.innerWidth > 900) {

            const scrollPosition = window.scrollY;

            planet.style.transform =
                `translateY(${scrollPosition * 0.05}px)`;

        }

    });


    // ========================================
    // DESTAQUE DO MENU CONFORME A SEÇÃO
    // ========================================

    const sections = document.querySelectorAll("section[id]");

    const sectionObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav-menu a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    }, {
        threshold: 0.35
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});