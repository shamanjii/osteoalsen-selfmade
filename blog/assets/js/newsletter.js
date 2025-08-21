// newsletter.js – Newsletter-Formular einfach verarbeiten

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');

  if (!form || !emailInput) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!validateEmail(email)) {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    // Hier könnte man die E-Mail an einen Server senden
    alert(`Vielen Dank! Wir haben "${email}" für den Newsletter registriert.`);
    form.reset();
  });
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
