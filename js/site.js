document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-tracker]');
  if (!el) return;
  const parts = el.dataset.tracker.split('|');
  if (parts.length !== 2) return;
  if (typeof mixpanel !== 'undefined') mixpanel.track(parts[0], { label: parts[1] });
});
