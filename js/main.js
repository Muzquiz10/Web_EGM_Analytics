const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      status.textContent = "Gracias por contactar con EGM Analytics te responderé lo antes posible.";
      status.style.color = "#035d24ff";
      form.reset();
    } else {
      status.textContent = "Ha ocurrido un error. Inténtalo de nuevo.";
      status.style.color = "#8e1717ff";
    }
  } catch (error) {
    status.textContent = "Error de conexión. Inténtalo más tarde.";
    status.style.color = "#8e1717ff";
  }
});

// Animación botón hamburguesa

document.addEventListener('DOMContentLoaded', () => {
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});
});

// Google Analytics - Seguimiento pulsación botón whatsapp y Formulario
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('#contact-form');

  forms.forEach(form => {
    form.addEventListener('submit', () => {
      gtag('event', 'submit_form', {
        event_category: 'conversion',
        event_label: window.location.pathname
      });
    });
  });
});

// Animación de entrada para las tarjetas de servicios
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  cards.forEach(card => card.classList.add("show"));
});
// Fin animación de entrada para las tarjetas de servicios
