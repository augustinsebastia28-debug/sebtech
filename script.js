const pageSequence = [
  { key: "home", title: "Home", href: "index.html" },
  { key: "services", title: "Services", href: "services.html" },
  { key: "repairs", title: "Repairs", href: "repairs.html" },
  { key: "about", title: "About", href: "about.html" },
  { key: "contact", title: "Contact", href: "contact.html" },
];

const pageMap = Object.fromEntries(pageSequence.map((page) => [page.key, page.href]));
const inlineSvgByDevice = {
  brand: `
    <svg viewBox="0 0 120 120" role="img" aria-label="SebTech logo" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sebtech-logo-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14b8a6"/>
          <stop offset="100%" stop-color="#0f766e"/>
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="104" height="104" rx="28" fill="url(#sebtech-logo-fill)"/>
      <path d="M73 27h15v12H78l-5 5h10c10.5 0 18 6.5 18 16.5 0 10-7.5 16.5-18 16.5H63l-5 5h30v12H48l15-15h20c3.8 0 6.5-2.2 6.5-5.5S86.8 64 83 64H64l-14 14H34V66h11l5-5H34V49h31l5-5H43V32h30z" fill="#ffffff"/>
      <path d="M26 82h21" stroke="#bff7ef" stroke-width="6" stroke-linecap="round"/>
      <path d="M83 82l11 11" stroke="#bff7ef" stroke-width="6" stroke-linecap="round"/>
      <path d="M94 82L83 93" stroke="#bff7ef" stroke-width="6" stroke-linecap="round"/>
    </svg>
  `,
  phone: `
    <svg viewBox="0 0 240 180" role="img" aria-label="Phone and tablet devices" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" rx="28" fill="#f6fafb"/>
      <rect x="40" y="20" width="58" height="122" rx="14" fill="#132330"/>
      <rect x="46" y="30" width="46" height="92" rx="9" fill="#5eead4"/>
      <circle cx="69" cy="132" r="5" fill="#dbe7ec"/>
      <rect x="120" y="30" width="82" height="104" rx="12" fill="#1f3444"/>
      <rect x="128" y="40" width="66" height="84" rx="8" fill="#c5fff6"/>
      <path d="M145 154h42" stroke="#14b8a6" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `,
  laptop: `
    <svg viewBox="0 0 240 180" role="img" aria-label="Laptop device" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" rx="28" fill="#f6fafb"/>
      <rect x="54" y="26" width="132" height="84" rx="10" fill="#1f3444"/>
      <rect x="62" y="34" width="116" height="68" rx="6" fill="#99f6e4"/>
      <path d="M38 122h164l12 22H26l12-22z" fill="#cdd9df"/>
      <rect x="95" y="128" width="50" height="6" rx="3" fill="#8aa1ad"/>
      <circle cx="168" cy="64" r="10" fill="#14b8a6" opacity="0.85"/>
    </svg>
  `,
  desktop: `
    <svg viewBox="0 0 240 180" role="img" aria-label="Desktop PC tower" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" rx="28" fill="#f6fafb"/>
      <rect x="28" y="34" width="112" height="74" rx="10" fill="#1f3444"/>
      <rect x="36" y="42" width="96" height="58" rx="6" fill="#c5fff6"/>
      <rect x="74" y="112" width="20" height="12" rx="4" fill="#8aa1ad"/>
      <rect x="56" y="124" width="56" height="8" rx="4" fill="#8aa1ad"/>
      <rect x="158" y="26" width="48" height="112" rx="10" fill="#162531"/>
      <circle cx="182" cy="48" r="5" fill="#14b8a6"/>
      <rect x="170" y="66" width="24" height="34" rx="4" fill="#2c4354"/>
      <path d="M170 114h24" stroke="#8cf3e5" stroke-width="5" stroke-linecap="round"/>
    </svg>
  `,
  console: `
    <svg viewBox="0 0 240 180" role="img" aria-label="Game console and controller" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" rx="28" fill="#f6fafb"/>
      <rect x="36" y="34" width="44" height="96" rx="14" fill="#1f3444"/>
      <rect x="160" y="34" width="44" height="96" rx="14" fill="#1f3444"/>
      <rect x="92" y="84" width="56" height="30" rx="15" fill="#132330"/>
      <circle cx="114" cy="98" r="7" fill="#14b8a6"/>
      <circle cx="126" cy="98" r="7" fill="#5eead4"/>
      <circle cx="173" cy="150" r="10" fill="#14b8a6"/>
      <path d="M60 150h38" stroke="#14b8a6" stroke-width="8" stroke-linecap="round"/>
      <path d="M79 131v38" stroke="#14b8a6" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `,
};

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

document.querySelectorAll(".brand-mark").forEach((mark) => {
  mark.innerHTML = inlineSvgByDevice.brand;
});

document.querySelectorAll(".repair-media[data-device]").forEach((media) => {
  const device = media.getAttribute("data-device");

  if (device && inlineSvgByDevice[device]) {
    media.innerHTML = inlineSvgByDevice[device];
  }
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
