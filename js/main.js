document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     FORMULARIO CONTACTO
  ========================= */

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          status.textContent =
            "Gracias por contactar con EGM Analytics, te responderé lo antes posible.";
          status.style.color = "#035d24ff";
          form.reset();
        } else {
          status.textContent = "Ha ocurrido un error. Inténtalo de nuevo.";
          status.style.color = "#8e1717ff";
        }
      } catch {
        status.textContent = "Error de conexión. Inténtalo más tarde.";
        status.style.color = "#8e1717ff";
      }
    });
  }

  /* =========================
     MENÚ HAMBURGUESA
  ========================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  /* =========================
     GA4 - FORMULARIO
  ========================= */

  if (form) {
    form.addEventListener("submit", () => {
      gtag("event", "submit_form", {
        event_category: "conversion",
        event_label: window.location.pathname
      });
    });
  }

  /* =========================
     ANIMACIÓN SERVICIOS
  ========================= */

  document.querySelectorAll(".service-card")
    .forEach(card => card.classList.add("show"));
});

