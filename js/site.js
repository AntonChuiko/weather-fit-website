document.documentElement.classList.add('js');

const _sentinel = document.getElementById('header-sentinel');
const _header = document.querySelector('.site-header');
if (_sentinel && _header && 'IntersectionObserver' in window) {
  new IntersectionObserver(
    ([entry]) => _header.classList.toggle('is-scrolled', !entry.isIntersecting),
    { threshold: 0 }
  ).observe(_sentinel);
}

if ('IntersectionObserver' in window) {
  const _revealObs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); _revealObs.unobserve(e.target); }
    }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('[data-reveal]').forEach(el => _revealObs.observe(el));

  const _chipObs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('chips-visible'); _chipObs.unobserve(e.target); }
    }),
    { threshold: 0.6 }
  );
  document.querySelectorAll('.pivot__stage, .pivot__chips-mobile').forEach(el => _chipObs.observe(el));
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-tracker]');
  if (!el) return;
  const parts = el.dataset.tracker.split('|');
  if (parts.length !== 2) return;
  if (typeof mixpanel !== 'undefined') mixpanel.track(parts[0], { label: parts[1] });
});
