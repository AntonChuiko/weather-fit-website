const _sentinel = document.getElementById('header-sentinel');
const _header = document.querySelector('.site-header');
if (_sentinel && _header && 'IntersectionObserver' in window) {
  new IntersectionObserver(
    ([entry]) => _header.classList.toggle('is-scrolled', !entry.isIntersecting),
    { threshold: 0 }
  ).observe(_sentinel);
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-tracker]');
  if (!el) return;
  const parts = el.dataset.tracker.split('|');
  if (parts.length !== 2) return;
  if (typeof mixpanel !== 'undefined') mixpanel.track(parts[0], { label: parts[1] });
});
