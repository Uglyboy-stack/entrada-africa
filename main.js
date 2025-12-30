// ===============================
// MOBILE MENU TOGGLE (Slide-Out)
// ===============================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const darkToggle = document.getElementById("darkModeToggle") || document.getElementById("darkToggle");

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// ===============================
// HIGHLIGHT CURRENT SECTION ON SCROLL
// ===============================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const highlightNav = () => {
  let scrollPos = window.scrollY + window.innerHeight / 2;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(section.id)) link.classList.add('active');
      });
    }
  });
};
window.addEventListener('scroll', highlightNav);

// ===============================
// FADE-IN ON SCROLL
// ===============================
const fadeElements = document.querySelectorAll('.card, .contact-form, .contact-info, .event-card, .team-member');

const fadeInOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  fadeElements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerBottom) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    } else {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
    }
  });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// ===============================
// CONTACT FORM VALIDATION
// ===============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields.');
      return;
    }

    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      alert('Please enter a valid email.');
      return;
    }

    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();
  });
}

// ===============================
// EVENTS SEARCH FILTER
// ===============================
const searchInput = document.getElementById('searchInput');
const eventCards = document.querySelectorAll('.event-card');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    eventCards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      const location = card.getAttribute('data-location').toLowerCase();
      const type = card.getAttribute('data-type').toLowerCase();
      card.style.display = title.includes(filter) || location.includes(filter) || type.includes(filter) ? 'block' : 'none';
    });
  });
}

// ===============================
// BUY TICKET SIMULATION
// ===============================
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const eventName = btn.closest('.event-card')?.getAttribute('data-title') || "Event";
    const price = btn.closest('.event-card')?.getAttribute('data-price') || "0";
    const url = `payment.html?event=${encodeURIComponent(eventName)}&price=${price}`;
    window.location.href = url;
  });
});

// ===============================
// PAYMENT PAGE FUNCTIONALITY
// ===============================
if (window.location.pathname.includes("payment.html")) {
  const params = new URLSearchParams(window.location.search);
  const eventName = params.get("event") || "Event";
  const price = params.get("price") || "0";

  const eventNameEl = document.getElementById("eventName");
  const ticketPriceEl = document.getElementById("ticketPrice");
  const paymentForm = document.getElementById("paymentForm");

  if (eventNameEl) eventNameEl.textContent = eventName;
  if (ticketPriceEl) ticketPriceEl.textContent = `Price: ₦${price}`;

  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const cardNumber = document.getElementById("cardNumber").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      if (!name || !email || !cardNumber || !cvv) {
        alert("Please fill in all fields.");
        return;
      }

      if (cardNumber.length !== 16 || cvv.length !== 3) {
        alert("Invalid card details. Please check your information.");
        return;
      }

      alert(`✅ Payment successful! Your ticket for "${eventName}" has been booked.`);
      window.location.href = "events.html";
    });
  }
}

// ===============================
// DARK MODE TOGGLE (Works Inside Mobile Nav)
// ===============================
const body = document.body;

if (darkToggle) {
  // Apply saved preference
  if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
  }

  darkToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
}

function enableDarkMode() {
  body.classList.add("dark-mode");
  document.querySelector("header")?.classList.add("dark-mode");
  document.querySelector("footer")?.classList.add("dark-mode");
  document.querySelectorAll(".hero, .event-card, .buy-btn, .cta-section, .payment-box").forEach(el => el.classList.add("dark-mode"));
  localStorage.setItem("darkMode", "enabled");
  if (darkToggle) darkToggle.textContent = "☀️";
}

function disableDarkMode() {
  body.classList.remove("dark-mode");
  document.querySelector("header")?.classList.remove("dark-mode");
  document.querySelector("footer")?.classList.remove("dark-mode");
  document.querySelectorAll(".hero, .event-card, .buy-btn, .cta-section, .payment-box").forEach(el => el.classList.remove("dark-mode"));
  localStorage.setItem("darkMode", "disabled");
  if (darkToggle) darkToggle.textContent = "🌙";
}
