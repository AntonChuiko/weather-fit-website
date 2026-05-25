document.addEventListener('click', function (e) {
  var el = e.target.closest('[data-tracker]');
  if (!el) return;
  var parts = el.dataset.tracker.split('|');
  if (parts.length !== 2) return;
  if (typeof mixpanel !== 'undefined') mixpanel.track(parts[0], { label: parts[1] });
});
