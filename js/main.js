//--- Apertura DOMContentLoaded --- //
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     FORMULARIO CONTACTO
  ========================= */

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const serviceSelect = document.getElementById("service-select");
  const biProjectGroup = document.getElementById("bi-project-group");
  const biProjectSelect = document.getElementById("bi-project-select");
  const webPlanGroup = document.getElementById("web-plan-group");
  const webPlanSelect = document.getElementById("web-plan-select");
  const classesTopicGroup = document.getElementById("classes-topic-group");
  const classesTopicInput = document.getElementById("classes-topic");
  const budgetGroup = document.getElementById("budget-group");
  const budgetSelect = document.getElementById("budget-select");
  const trackEvent = (name, params) => {
    if (typeof gtag === "function") {
      gtag("event", name, params);
    }
  };
  const budgetRanges = {
    businessIntelligence: [
      "100-200€",
      "200€-300€",
      "300€-500€",
      "+ 500€",
      "No estoy seguro"
    ],
    webAdvanced: [
      "559€-600€",
      "600€-700€",
      "700€-800€",
      "900€-1.000€",
      "+ 1.000€"
    ]
  };
  const setGroupVisibility = (group, visible) => {
    if (group) {
      group.classList.toggle("is-hidden", !visible);
    }
  };
  const setFieldState = (field, enabled, required = false) => {
    if (!field) return;
    field.disabled = !enabled;
    field.required = enabled && required;

    if (!enabled) {
      field.value = "";
    }
  };
  const updateBudgetOptions = (ranges = []) => {
    if (!budgetSelect) return;

    budgetSelect.replaceChildren();

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Selecciona una franja";
    budgetSelect.appendChild(placeholder);

    ranges.forEach((range) => {
      const option = document.createElement("option");
      option.value = range;
      option.textContent = range;
      budgetSelect.appendChild(option);
    });
  };
  const updateConditionalFields = () => {
    if (!serviceSelect) return;

    const selectedService = serviceSelect.value;
    const selectedWebPlan = webPlanSelect ? webPlanSelect.value : "";
    const showBiProject = selectedService === "Business Intelligence";
    const showWebPlan = selectedService === "Desarrollo Web";
    const showClassesTopic = selectedService === "Clases";
    const budgetType =
      selectedService === "Business Intelligence"
        ? "businessIntelligence"
        : showWebPlan && selectedWebPlan === "Web Avanzada / Tienda"
          ? "webAdvanced"
          : "";

    setGroupVisibility(biProjectGroup, showBiProject);
    setFieldState(biProjectSelect, showBiProject, true);

    setGroupVisibility(webPlanGroup, showWebPlan);
    setFieldState(webPlanSelect, showWebPlan, true);

    setGroupVisibility(classesTopicGroup, showClassesTopic);
    setFieldState(classesTopicInput, showClassesTopic, true);

    setGroupVisibility(budgetGroup, Boolean(budgetType));
    setFieldState(budgetSelect, Boolean(budgetType), true);
    updateBudgetOptions(budgetType ? budgetRanges[budgetType] : []);
  };

  if (serviceSelect) {
    serviceSelect.addEventListener("change", updateConditionalFields);
  }

  if (webPlanSelect) {
    webPlanSelect.addEventListener("change", updateConditionalFields);
  }

  updateConditionalFields();

  document.querySelectorAll("[data-bi-project]").forEach((link) => {
    link.addEventListener("click", () => {
      const selectedProject = link.dataset.biProject;

      if (serviceSelect) {
        serviceSelect.value = "Business Intelligence";
      }

      updateConditionalFields();

      if (biProjectSelect && selectedProject) {
        biProjectSelect.value = selectedProject;
      }
    });
  });

  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      trackEvent("submit_form", {
        event_category: "conversion",
        event_label: window.location.pathname
      });

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
          trackEvent("generate_lead", {
            lead_type: "contact_form",
            form_id: "contact-form",
            event_category: "conversion",
            event_label: window.location.pathname
          });
          form.reset();
          updateConditionalFields();
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
     ANIMACIÓN SERVICIOS
  ========================= */

  document.querySelectorAll(".service-card")
    .forEach(card => card.classList.add("show"));


  /* =========================
     AÑO DINÁMICO FOOTER
  ========================= */

  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

// --- Cierre DOMContentLoaded --- //
  }); 
