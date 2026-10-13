(() => {
  // Replace this with your WhatsApp number in international format, digits only.
  // Nigeria example: 2348012345678 (do not include +, spaces, or leading 0).
  const WHATSAPP_NUMBER = '2349010902971';

  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const year = document.getElementById('year');
  const form = document.getElementById('contactForm');
  const formError = document.getElementById('formError');
  const directContact = document.getElementById('directContact');

  year.textContent = new Date().getFullYear();

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    mobileNav.hidden = isOpen;
  });

  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));

  const isPlaceholderNumber = () => !/^\d{10,15}$/.test(WHATSAPP_NUMBER) || WHATSAPP_NUMBER === '2348012345678';
  const openWhatsApp = (message) => {
    if (isPlaceholderNumber()) {
      formError.hidden = false;
      formError.textContent = 'Setup needed: open script.js and replace WHATSAPP_NUMBER with your own number in international format before publishing.';
      return;
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formError.hidden = true;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const business = String(data.get('business') || '').trim();
    const need = String(data.get('need') || '').trim();
    const details = String(data.get('details') || '').trim();
    const message = `Hi Goodnews, I'd like to discuss a website project.\n\nName: ${name}\nBusiness/project: ${business}\nService: ${need}\nProject details: ${details || 'I would like to discuss the details.'}`;
    openWhatsApp(message);
  });

  directContact.addEventListener('click', (event) => {
    event.preventDefault();
    openWhatsApp('Hi Goodnews, I would like to discuss a website or frontend project.');
  });
})();
