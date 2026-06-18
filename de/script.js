const typewriter = document.querySelector(".typewriter");
const navToggle = document.querySelector(".nav-toggle");
const navbar = document.querySelector(".navbar");
const navItems = document.querySelectorAll(".nav-item");

if (navToggle && navbar) {
  navToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("menu-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) {
      navItems.forEach((item) => item.classList.remove("is-open"));
    }
  });

  navbar.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      navbar.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navItems.forEach((item) => item.classList.remove("is-open"));
    }
  });
}

navItems.forEach((item) => {
  const trigger = item.querySelector(".nav-trigger");
  if (!trigger) {
    return;
  }

  trigger.addEventListener("click", (event) => {
    if (trigger instanceof HTMLAnchorElement) {
      return;
    }
    event.preventDefault();
    const isOpen = item.classList.toggle("is-open");
    navItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove("is-open");
      }
    });

    if (!isOpen) {
      item.classList.remove("is-open");
    }
  });
});

const topicForms = document.querySelectorAll(".contact-form[data-require-topics]");

topicForms.forEach((form) => {
  const checkboxes = Array.from(form.querySelectorAll('input[name="topics"]'));
  if (checkboxes.length === 0) {
    return;
  }

  const firstCheckbox = checkboxes[0];

  const updateValidity = () => {
    const hasSelection = checkboxes.some((checkbox) => checkbox.checked);
    firstCheckbox.setCustomValidity(
      hasSelection ? "" : "Bitte wählen Sie mindestens ein Thema aus."
    );
  };

  updateValidity();
  checkboxes.forEach((checkbox) => checkbox.addEventListener("change", updateValidity));
  form.addEventListener("submit", updateValidity);
});

if (typewriter) {
  const lines = typewriter.dataset.lines.split("|");
  let lineIndex = 0;
  let charIndex = 0;

  const render = () => {
    const currentLine = lines[lineIndex];
    typewriter.textContent = currentLine.slice(0, charIndex);

    if (charIndex < currentLine.length) {
      charIndex += 1;
      setTimeout(render, 40);
      return;
    }

    setTimeout(() => {
      charIndex = 0;
      lineIndex = (lineIndex + 1) % lines.length;
      render();
    }, 1400);
  };

  render();
}

const pageHeroSubtitles = document.querySelectorAll(".page-hero p");

pageHeroSubtitles.forEach((subtitle) => {
  const fullText = subtitle.textContent.replace(/\s+/g, " ").trim();
  if (!fullText) {
    return;
  }

  subtitle.textContent = "";
  let index = 0;

  const typeSubtitle = () => {
    subtitle.textContent = fullText.slice(0, index);
    if (index < fullText.length) {
      index += 1;
      setTimeout(typeSubtitle, 28);
    }
  };

  setTimeout(typeSubtitle, 300);
});

const admissionTextBlocks = document.querySelectorAll(
  "#admission-cycles .split-text"
);

if (admissionTextBlocks.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
    }
  );

  admissionTextBlocks.forEach((block, index) => {
    block.style.transitionDelay = `${index * 0.12}s`;
    revealObserver.observe(block);
  });
}

const testimonials = [
  {
    quote:
      "Die Unterstützung von Dreamer Education bei der Wahl einer Universität und später bei der Vorbereitung meiner Bewerbung hat die Gesamtqualität meiner Unterlagen erheblich verbessert und mir geholfen, an der Universität meiner Träume angenommen zu werden. Vor allem die Begleitung durch Menschen, die selbst erfolgreich an Spitzenuniversitäten studiert haben, gab mir die so nötige innere Ruhe während des gesamten Bewerbungsprozesses.",
    name: "Martin",
  },
  {
    quote:
      "Ich schätze die Geduld und Professionalität des Dreamer Education-Teams sehr. Sie haben mir bei allem geholfen – von der Wahl der Schule bis hin zum Verfassen meines Motivationsschreibens.",
    name: "Nasta",
  },
];

const quoteEl = document.querySelector(".testimonial-quote");
const nameEl = document.querySelector(".testimonial-name");
const buttons = document.querySelectorAll(".carousel-btn");
let testimonialIndex = 0;
let rotationTimer;

const renderTestimonial = () => {
  if (!quoteEl || !nameEl) {
    return;
  }

  const { quote, name } = testimonials[testimonialIndex];
  quoteEl.textContent = `"${quote}"`;
  nameEl.textContent = name;
};

const rotateTestimonial = (direction = 1) => {
  testimonialIndex =
    (testimonialIndex + direction + testimonials.length) % testimonials.length;
  renderTestimonial();
};

const startRotation = () => {
  clearInterval(rotationTimer);
  rotationTimer = setInterval(() => rotateTestimonial(1), 5000);
};

renderTestimonial();
startRotation();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction === "prev" ? -1 : 1;
    rotateTestimonial(direction);
    startRotation();
  });
});
