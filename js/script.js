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