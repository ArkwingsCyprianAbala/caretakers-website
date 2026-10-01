// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Enquiry form (Contact page). Placeholder behaviour carried over from the original:
// it only shows an alert. Replace with a real submit (Formspree, EmailJS, backend) before launch.
const submitBtn = document.getElementById('submit-enquiry');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    alert('Thank you! We will contact you shortly on +254 110 700 944.');
  });
}
