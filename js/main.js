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

