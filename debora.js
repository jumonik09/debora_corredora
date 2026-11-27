document.documentElement.classList.add('js-ready');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenuExpanded(expanded) {
  menuButton.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('open', expanded);
}
menuButton.addEventListener('click', () => {
  setMenuExpanded(menuButton.getAttribute('aria-expanded') !== 'true');
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenuExpanded(false);
});
menuButton.closest('header').addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuExpanded(false);
    menuButton.focus();
  }
});
[['video-open', 'media-dialog'], ['contact-open', 'contact-dialog']].forEach(([trigger, target]) => {
  const dialog = document.getElementById(target);
  document.getElementById(trigger).addEventListener('click', () => dialog.showModal());
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }});
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
} else document.querySelectorAll('.reveal').forEach(section => section.classList.add('visible'));
document.getElementById('year').textContent = new Date().getFullYear();
