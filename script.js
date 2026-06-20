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
      hasSelection ? "" : "Please select at least one topic."
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
      "The support from Dreamer Education in choosing a university and later during my application preparations significantly improved the overall quality and helped me get accepted to the university of my dreams. Above all, the support from people who had been successful in applying to top universities gave me the much-needed peace of mind during the entire application process.",
    name: "Martin",
  },
  {
    quote:
      "I really appreciate the patience and professionalism of the Dreamer Education team. They helped me with everything from choosing a school to writing my motivation letter.",
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
  var CONSENT_KEY = 'dreamer_cookie_consent';

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
        '<p>We use <strong>Microsoft Clarity</strong> to understand how this website is used and to improve its content. By accepting, you agree that we and Microsoft may collect and use this data. <a href="privacy.html">Privacy Policy</a></p>' +
        '<div class="cookie-banner-actions">' +
          '<button class="cookie-btn cookie-btn--accept" id="cookie-accept">Accept</button>' +
          '<button class="cookie-btn cookie-btn--decline" id="cookie-decline">Decline</button>' +
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
      '<button class="modal-close" id="careers-modal-close" aria-label="Close">&times;</button>' +
      '<h3>Application Form</h3>' +
      '<form class="contact-form" action="https://formspree.io/f/xykqggwp" method="POST" enctype="multipart/form-data">' +
        '<div class="form-field">' +
          '<label class="form-label" for="c-first-name">What is your first name?<span class="required">*</span></label>' +
          '<input class="form-input" id="c-first-name" type="text" name="first_name" placeholder="Your first name" required />' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="form-label">How did you hear about us?<span class="required">*</span></label>' +
          '<div class="form-options">' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="friend_colleague" required /> Friend or colleague</label>' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="social_media" required /> Social media</label>' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="search_engine" required /> Search engine</label>' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="school_university" required /> School or university</label>' +
            '<label class="option-item"><input type="radio" name="heard_about_us" value="other" required /> Other</label>' +
          '</div>' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="form-label" for="c-email">What is your email address?<span class="required">*</span></label>' +
          '<input class="form-input" id="c-email" type="email" name="email" placeholder="Your email address" required />' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="form-label" for="c-linkedin">LinkedIn profile URL (optional)</label>' +
          '<input class="form-input" id="c-linkedin" type="url" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" />' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="form-label" for="c-motivation">Why do you want to join us, and what do you believe you can bring to the team?<span class="required">*</span></label>' +
          '<textarea class="form-textarea" id="c-motivation" name="motivation" placeholder="Tell us why you want to join Dreamer Education and what skills or qualities you would bring to the team..." required></textarea>' +
        '</div>' +
        '<div class="form-field">' +
          '<label class="option-item"><input type="checkbox" name="consent" required /><span> I agree with the <a href="privacy.html">Privacy Policy</a> and <a href="terms.html">Terms of Use</a>.</span></label>' +
          '<label class="option-item"><input type="checkbox" name="human_check" required /><span> I am not a robot.</span></label>' +
        '</div>' +
        '<div class="form-actions">' +
          '<button class="btn-solid" type="submit">Send Application</button>' +
          '<span class="form-note">We reply within 2 business days.</span>' +
        '</div>' +
      '</form>' +
    '</div>';
  document.body.appendChild(overlay);

  var otherWrap = document.createElement('div');
  otherWrap.style.cssText = 'display:none;margin-top:8px;';
  otherWrap.innerHTML = '<input class="form-input" type="text" name="heard_about_us_other" placeholder="Please specify how you heard about us..." />';
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
