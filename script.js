const pageSequence = [
  { key: "home", title: "Home", href: "index.html" },
  { key: "services", title: "Services", href: "services.html" },
  { key: "repairs", title: "Repairs", href: "repairs.html" },
  { key: "about", title: "About", href: "about.html" },
  { key: "contact", title: "Contact", href: "contact.html" },
];

const pageMap = Object.fromEntries(pageSequence.map((page) => [page.key, page.href]));

const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const bookingForm = document.querySelector("#booking-form");
const formNote = document.querySelector("#form-note");
const formSubmitButton = bookingForm?.querySelector('button[type="submit"]');
const nameField = bookingForm?.querySelector('input[name="name"]');
const phoneField = bookingForm?.querySelector('input[name="phone"]');
const visitTypeField = bookingForm?.querySelector('select[name="visitType"]');
const deviceField = bookingForm?.querySelector('select[name="device"]');
const pickupAddressWrap = bookingForm?.querySelector("#pickup-address-wrap");
const pickupAddressField = bookingForm?.querySelector('textarea[name="pickupAddress"]');
const manualDeviceWrap = bookingForm?.querySelector("#manual-device-wrap");
const manualDeviceField = bookingForm?.querySelector('input[name="manualDevice"]');
const defaultFormNote = formNote?.textContent || "";
const defaultSubmitLabel = formSubmitButton?.textContent || "Open Repair Email";
const interactiveCards = document.querySelectorAll(
  ".hero-copy, .hero-panel, .hero-side-card, .info-card, .metric-card, .step-card, .repair-card, .contact-card, .booking-panel, .cta-card"
);
let lastScrollY = window.scrollY;

const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.prepend(progressBar);

const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? scrollTop / scrollRange : 0;
  document.documentElement.style.setProperty("--scroll-progress", String(progress));
};

const updateMobileHeaderVisibility = () => {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  if (window.innerWidth > 720) {
    body.classList.remove("mobile-header-hidden");
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY <= 24) {
    body.classList.remove("mobile-header-hidden");
    lastScrollY = currentScrollY;
    return;
  }

  if (scrollDelta > 6 && currentScrollY > 96) {
    body.classList.add("mobile-header-hidden");
  } else if (scrollDelta < -6) {
    body.classList.remove("mobile-header-hidden");
  }

  lastScrollY = currentScrollY;
};

updateScrollProgress();
updateMobileHeaderVisibility();
window.addEventListener("scroll", () => {
  updateScrollProgress();
  updateMobileHeaderVisibility();
}, { passive: true });

interactiveCards.forEach((card) => {
  card.classList.add("interactive-card");
});

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980 && body.classList.contains("nav-open")) {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }

    if (window.innerWidth > 720) {
      body.classList.remove("mobile-header-hidden");
    }
  });
}

const currentPage = body.dataset.page;

if (currentPage && pageMap[currentPage]) {
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === pageMap[currentPage]) {
      link.setAttribute("aria-current", "page");
    }
  });
}

const currentPageIndex = pageSequence.findIndex((page) => page.key === currentPage);

if (currentPageIndex !== -1) {
  const activePage = pageSequence[currentPageIndex];
  const siteHeader = document.querySelector(".site-header");

  if (siteHeader) {
    const pageStrip = document.createElement("div");
    pageStrip.className = "page-strip";
    pageStrip.innerHTML = `
      <div class="container">
        <nav class="page-switcher" aria-label="Page navigation">
          <div class="page-current">${activePage.title}</div>
        </nav>
      </div>
    `;

    siteHeader.insertAdjacentElement("afterend", pageStrip);
  }
}

document.querySelectorAll(".year").forEach((yearNode) => {
  yearNode.textContent = new Date().getFullYear();
});

const normalizeName = (value) => value.replace(/\s+/g, " ").trim();
const normalizePhone = (value) => value.replace(/[\s()-]/g, "").trim();
const normalizeTextBlock = (value) => value.replace(/\s+/g, " ").trim();

const isValidFullName = (value) => {
  const nameParts = normalizeName(value).split(" ").filter(Boolean);

  if (nameParts.length < 2) {
    return false;
  }

  return nameParts.every((part) => /^[A-Za-z]+(?:['-][A-Za-z]+)*$/.test(part));
};

const isValidUkPhone = (value) => /^(?:0\d{10}|\+44\d{10})$/.test(normalizePhone(value));

const resetBookingFeedback = () => {
  if (formNote) {
    formNote.textContent = defaultFormNote;
    formNote.classList.remove("is-success");
  }

  if (formSubmitButton) {
    formSubmitButton.textContent = defaultSubmitLabel;
    formSubmitButton.classList.remove("is-complete");
  }
};

const updatePickupAddressState = () => {
  if (!visitTypeField || !pickupAddressWrap || !pickupAddressField) {
    return;
  }

  const needsPickupAddress = visitTypeField.value === "Please pick up my device";

  pickupAddressWrap.hidden = !needsPickupAddress;
  pickupAddressField.required = needsPickupAddress;
  pickupAddressField.disabled = !needsPickupAddress;
  pickupAddressField.setCustomValidity("");

  if (!needsPickupAddress) {
    pickupAddressField.value = "";
  }
};

const updateManualDeviceState = () => {
  if (!deviceField || !manualDeviceWrap || !manualDeviceField) {
    return;
  }

  const needsManualDevice = deviceField.value === "Other / type it manually";

  manualDeviceWrap.hidden = !needsManualDevice;
  manualDeviceField.required = needsManualDevice;
  manualDeviceField.disabled = !needsManualDevice;
  manualDeviceField.setCustomValidity("");

  if (!needsManualDevice) {
    manualDeviceField.value = "";
  }
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 60, 260)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (bookingForm) {
  updatePickupAddressState();
  updateManualDeviceState();

  visitTypeField?.addEventListener("change", () => {
    updatePickupAddressState();
    resetBookingFeedback();
  });

  deviceField?.addEventListener("change", () => {
    updateManualDeviceState();
    resetBookingFeedback();
  });

  bookingForm.addEventListener("input", (event) => {
    const field = event.target;

    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
      field.setCustomValidity("");
    }

    resetBookingFeedback();
  });

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(bookingForm);
    const email = bookingForm.dataset.email || "augustinsebastia2890@gmail.com";

    const name = normalizeName(String(data.get("name") || ""));
    const customerEmail = String(data.get("email") || "").trim();
    const phone = normalizePhone(String(data.get("phone") || ""));
    const visitType = String(data.get("visitType") || "").trim();
    const pickupAddress = normalizeTextBlock(String(data.get("pickupAddress") || ""));
    const device = String(data.get("device") || "").trim();
    const manualDevice = normalizeTextBlock(String(data.get("manualDevice") || ""));
    const urgency = String(data.get("urgency") || "").trim();
    const issue = String(data.get("issue") || "").trim();
    const details = String(data.get("details") || "").trim();

    if (nameField) {
      nameField.value = name;
    }

    if (phoneField) {
      phoneField.value = phone;
    }

    if (pickupAddressField) {
      pickupAddressField.value = pickupAddress;
    }

    if (manualDeviceField) {
      manualDeviceField.value = manualDevice;
    }

    resetBookingFeedback();

    if (nameField && !isValidFullName(name)) {
      nameField.setCustomValidity("Please enter your full name.");
    }

    if (phoneField && !isValidUkPhone(phone)) {
      phoneField.setCustomValidity("Please enter a valid UK phone number.");
    }

    if (pickupAddressField && visitType === "Please pick up my device" && !pickupAddress) {
      pickupAddressField.setCustomValidity("Please enter the pickup address.");
    }

    if (manualDeviceField && device === "Other / type it manually" && !manualDevice) {
      manualDeviceField.setCustomValidity("Please type the device name.");
    }

    if (!bookingForm.reportValidity()) {
      if (formNote) {
        formNote.textContent = "Please complete the required details before opening the email.";
      }

      return;
    }

    const subject = encodeURIComponent(`Repair request from ${name || "SebTech website visitor"}`);
    const selectedDevice = device === "Other / type it manually" ? manualDevice : device;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${customerEmail}`,
      `Phone: ${phone}`,
      `Repair Option: ${visitType}`,
      `Pickup Address: ${pickupAddress || "Not needed"}`,
      `Device: ${selectedDevice}`,
      `Urgency: ${urgency}`,
      "",
      "Issue:",
      issue,
      "",
      "Extra details:",
      details || "None provided",
    ];

    const bodyText = encodeURIComponent(bodyLines.join("\n"));
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${bodyText}`;

    if (formNote) {
      formNote.textContent = "Email confirmed and opened. Press send in your email app and you should receive a reply soon.";
      formNote.classList.add("is-success");
    }

    if (formSubmitButton) {
      formSubmitButton.textContent = "Email Opened";
      formSubmitButton.classList.add("is-complete");
    }

    window.setTimeout(() => {
      window.location.href = mailtoLink;
    }, 120);
  });
}
