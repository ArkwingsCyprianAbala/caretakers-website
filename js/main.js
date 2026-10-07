// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  // Close the menu after tapping a link (needed for #anchor links)
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Tour date: no past dates, weekdays only (tours run Monday to Friday)
const tourDate = document.getElementById('tour-date');
if (tourDate) {
  const today = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  tourDate.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  tourDate.addEventListener('input', () => {
    const day = tourDate.value ? new Date(tourDate.value + 'T00:00:00').getDay() : 1;
    tourDate.setCustomValidity(
      day === 0 || day === 6 ? 'Tours are available Monday to Friday. Please pick a weekday.' : ''
    );
  });
}

// Forms. Each form is separate (own ID, fields, endpoint, message).
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

const FORMS = {
  'enquiry-form': {
    endpoint: WEB3FORMS_URL,
    success: 'Thank you! Your enquiry has been received. We will get back to you shortly.'
  },
  'enrol-form': {
    endpoint: WEB3FORMS_URL,
    success: 'Thank you! Your enrolment request has been received. We will contact you shortly.'
  },
  'tour-form': {
    endpoint: WEB3FORMS_URL,
    success: 'Your tour request has been received. We will confirm the date and time with you.'
  }
};

Object.entries(FORMS).forEach(([id, config]) => {
  const form = document.getElementById(id);
  if (!form) return; // form isn't on this page

  const status = form.querySelector('.form-status');
  const btn = form.querySelector('button[type="submit"]');

  const show = (msg, ok) => {
    if (!status) return;
    status.textContent = msg;
    status.className = 'form-status' + (msg ? (ok ? ' success' : ' error') : '');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    show('', true);

    try {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error('Request failed');
      form.reset();
      show(config.success, true);
    } catch (err) {
      show('Sorry, something went wrong. Please call or WhatsApp us on +254 110 700 944.', false);
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  });
});