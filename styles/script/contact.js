document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Tu peux ici récupérer les données, les envoyer vers un backend via fetch/AJAX
    // Pour l'instant, on simule juste un envoi réussi

    form.style.display = 'none';
    confirmation.style.display = 'block';
  });
});
