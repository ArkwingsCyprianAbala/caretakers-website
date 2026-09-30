// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Open/close the menu when the hamburger is clicked
menuToggle.addEventListener('click', function () {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close the menu after tapping a link
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== HERO SLIDESHOW =====
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.getElementById('heroDots');

// Only run if there is more than one photo
if (heroSlides.length > 1) {
  let current = 0;
  let timer;

  // Create one dot for each slide
  heroSlides.forEach(function (slide, i) {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Show photo ' + (i + 1));
    dot.addEventListener('click', function () {
      goTo(i);
      startTimer();   // restart the countdown after a manual click
    });
    heroDots.appendChild(dot);
  });

  const dots = heroDots.querySelectorAll('.hero-dot');

  // Switch to slide number n
  function goTo(n) {
    heroSlides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + heroSlides.length) % heroSlides.length;  // loops back to the start
    heroSlides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  // Change slide automatically every 5 seconds
  function startTimer() {
    clearInterval(timer);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(function () { goTo(current + 1); }, 5000);
  }

  startTimer();
}

// ===== ENQUIRY FORM =====
const enquiryForm = document.getElementById('enquiryForm');
const formSuccess = document.getElementById('formSuccess');
const WHATSAPP_NUMBER = '254110700944';   // school's WhatsApp number (no + sign)

if (enquiryForm) {

  // Each required field: what counts as valid, and what to say if it isn't
  const rules = {
    parentName: {
      isValid: function (v) { return v.trim().length >= 2; },
      message: 'Please enter your full name.'
    },
    phone: {
      isValid: function (v) {
        const digits = v.replace(/\D/g, '');                  // keep only the digits
        return /^[+0-9\s-]+$/.test(v.trim()) && digits.length >= 9 && digits.length <= 13;
      },
      message: 'Please enter a valid phone number, e.g. +254 7XX XXX XXX.'
    },
    childName: {
      isValid: function (v) { return v.trim().length >= 2; },
      message: "Please enter your child's name."
    },
    childAge: {
      isValid: function (v) { return v.trim().length >= 1; },
      message: "Please enter your child's age."
    },
    programme: {
      isValid: function (v) { return v !== ''; },
      message: 'Please choose a programme.'
    }
  };

  // Check one field, show or clear its error, and return true/false
  function validateField(field) {
    const rule = rules[field.name];
    const errorBox = field.parentElement.querySelector('.error-msg');
    if (rule.isValid(field.value)) {
      field.classList.remove('invalid');
      errorBox.textContent = '';
      return true;
    }
    field.classList.add('invalid');
    errorBox.textContent = rule.message;
    return false;
  }

  // Clear a field's error as soon as the user starts fixing it
  enquiryForm.addEventListener('input', function (e) {
    formSuccess.hidden = true;
    if (rules[e.target.name] && e.target.classList.contains('invalid')) {
      validateField(e.target);
    }
  });

  enquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();   // stop the page from reloading

    // Validate every required field
    let firstInvalid = null;
    for (const name in rules) {
      const field = enquiryForm.elements[name];
      if (!validateField(field) && !firstInvalid) {
        firstInvalid = field;
      }
    }
    if (firstInvalid) {
      firstInvalid.focus();   // jump to the first problem
      return;
    }

    // Build the WhatsApp message from the form answers
    const f = enquiryForm.elements;
    let text = "Hello Caretakers' Kindergarten, I would like to make an enquiry.\n\n" +
      'Parent: ' + f.parentName.value.trim() + '\n' +
      'Phone: ' + f.phone.value.trim() + '\n' +
      "Child's name: " + f.childName.value.trim() + '\n' +
      "Child's age: " + f.childAge.value.trim() + '\n' +
      'Programme: ' + f.programme.value;
    if (f.message.value.trim()) {
      text += '\nMessage: ' + f.message.value.trim();
    }

    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank');

    formSuccess.hidden = false;
    enquiryForm.reset();
  });
}

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();