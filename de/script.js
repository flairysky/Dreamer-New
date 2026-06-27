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
      "Die Unterstützung von Dynasty Education bei der Wahl einer Universität und später bei der Vorbereitung meiner Bewerbung hat die Gesamtqualität meiner Unterlagen erheblich verbessert und mir geholfen, an der Universität meiner Träume angenommen zu werden. Vor allem die Begleitung durch Menschen, die selbst erfolgreich an Spitzenuniversitäten studiert haben, gab mir die so nötige innere Ruhe während des gesamten Bewerbungsprozesses.",
    name: "Martin",
  },
  {
    quote:
      "Ich schätze die Geduld und Professionalität des Dynasty Education-Teams sehr. Sie haben mir bei allem geholfen – von der Wahl der Schule bis hin zum Verfassen meines Motivationsschreibens.",
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

(function () {
  var CONSENT_KEY = 'dynasty_cookie_consent';

  function loadClarity() {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script","xa1zmxdgr2");
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p>Wir verwenden <strong>Microsoft Clarity</strong>, um zu verstehen, wie diese Website genutzt wird, und um deren Inhalt zu verbessern. Durch Ihre Zustimmung erklären Sie sich damit einverstanden, dass wir und Microsoft diese Daten erheben und verwenden dürfen. <a href="privacy.html">Datenschutzrichtlinie</a></p>' +
        '<div class="cookie-banner-actions">' +
          '<button class="cookie-btn cookie-btn--accept" id="cookie-accept">Akzeptieren</button>' +
          '<button class="cookie-btn cookie-btn--decline" id="cookie-decline">Ablehnen</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      banner.remove();
      loadClarity();
    });

    document.getElementById('cookie-decline').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'declined');
      banner.remove();
    });
  }

  var consent = localStorage.getItem(CONSENT_KEY);
  if (consent === 'accepted') {
    loadClarity();
  } else if (consent !== 'declined') {
    showBanner();
  }
}());

(function () {
  var openBtn = document.getElementById('careers-open');
  if (!openBtn) { return; }

  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'careers-modal';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML =
    '<div class="modal-card">' +
      '<button class="modal-close" id="careers-modal-close" aria-label="Schließen">&times;</button>' +
      '<h3>Bewerbungsformular</h3>' +
      '<form class="contact-form" action="https://formspree.io/f/xykqggwp" method="POST" enctype="multipart/form-data">' +
        '<div class="form-field">' +
          '<label class="form-label" for="c-first-name">Wie lautet Ihr Vorname?<span class="required">*</span></label>' +
          '<input class="form-input" id="c-first-name" type="text" name="first_name" placeholder="Ihr Vorname" required />' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="form-label">Wie haben Sie von uns erfahren?<span class="required">*</span></label>' +
          '<div class="form-options">' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="friend_colleague" required /> Freund oder Kollege</label>' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="social_media" required /> Soziale Medien</label>' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="search_engine" required /> Suchmaschine</label>' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="school_university" required /> Schule oder Universität</label>' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="other" required /> Sonstiges</label>' +
          '</div>' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="form-label" for="c-email">Wie lautet Ihre E-Mail-Adresse?<span class="required">*</span></label>' +
          '<input class="form-input" id="c-email" type="email" name="email" placeholder="Ihre E-Mail-Adresse" required />' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="form-label" for="c-linkedin">LinkedIn-Profil URL (optional)</label>' +
          '<input class="form-input" id="c-linkedin" type="url" name="linkedin" placeholder="https://linkedin.com/in/ihrprofil" />' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="form-label" for="c-motivation">Warum möchten Sie uns beitreten und was glauben Sie, können Sie dem Team bringen?<span class="required">*</span></label>' +
          '<textarea class="form-textarea" id="c-motivation" name="motivation" placeholder="Erzählen Sie uns, warum Sie Dynasty Education beitreten möchten und welche Fähigkeiten oder Qualitäten Sie einbringen würden ..." required></textarea>' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="option-item"><input type="checkbox" name="consent" required /><span> Ich stimme der <a href="privacy.html">Datenschutzrichtlinie</a> und den <a href="terms.html">Nutzungsbedingungen</a> zu.</span></label>' +
          '<label class="option-item"><input type="checkbox" name="human_check" required /><span> Ich bin kein Roboter.</span></label>' +
        '</div>' +
        '<div class="form-actions">' +
          '<button class="btn-solid" type="submit">Bewerbung senden</button>' +
          '<span class="form-note">Wir antworten innerhalb von 2 Werktagen.</span>' +
        '</div>' +
      '</form>' +
    '</div>';
  document.body.appendChild(overlay);

  var otherWrap = document.createElement('div');
  otherWrap.style.cssText = 'display:none;margin-top:8px;';
  otherWrap.innerHTML = '<input class="form-input" type="text" name="heard_about_us_other" placeholder="Bitte geben Sie an, wie Sie von uns erfahren haben ..." />';
  var otherRadio = overlay.querySelector('input[value="other"]');
  if (otherRadio) { otherRadio.closest('.form-field').appendChild(otherWrap); }

  overlay.querySelectorAll('input[name="heard_about_us"]').forEach(function (r) {
    r.addEventListener('change', function () {
      otherWrap.style.display = r.value === 'other' ? 'block' : 'none';
    });
  });

  function openModal() {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.modal-close').focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  openBtn.addEventListener('click', openModal);
  document.getElementById('careers-modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) { closeModal(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) { closeModal(); }
  });
}());
