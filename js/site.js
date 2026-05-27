const _sentinel = document.getElementById('header-sentinel');
const _header = document.querySelector('.site-header');
if (_sentinel && _header && 'IntersectionObserver' in window) {
  new IntersectionObserver(
    ([entry]) => _header.classList.toggle('is-scrolled', !entry.isIntersecting),
    { threshold: 0 }
  ).observe(_sentinel);
}

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const _revealObs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); _revealObs.unobserve(e.target); }
    }),
    { threshold: 0.15 }
  );
  document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach(el => _revealObs.observe(el));

  const _chipObs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('chips-visible'); _chipObs.unobserve(e.target); }
    }),
    { threshold: 0.6 }
  );
  document.querySelectorAll('.pivot__stage, .pivot__chips-mobile').forEach(el => _chipObs.observe(el));
}

// FAQ accordion — animates the <details> wrapper (not its content child).
// Animating the child is unreliable: the child is what <details> renders on
// open, so it appears at full height for one composite step before any style
// or animation can engage. The wrapper is always in the layout tree, so we
// can lock its height before opening and animate cleanly in both directions.
;(function () {
  var motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  var OPEN_DURATION = 280;
  var CLOSE_DURATION = 200;
  var OPEN_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'; // mild ease-out, no reflow stutter
  var CLOSE_EASING = 'cubic-bezier(0.4, 0, 1, 1)';  // accelerate — decisive exit

  document.querySelectorAll('.faq__details').forEach(function (details) {
    var summary = details.querySelector('.faq__question');
    var anim = null;
    var rafId = null;

    function cancelInFlight() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (anim) {
        // Preserve the current visual height as inline style so the next
        // animation can start from where this one was visually, not snap.
        try { anim.commitStyles(); } catch (e) {}
        anim.cancel();
        anim = null;
      }
    }

    summary.addEventListener('click', function (e) {
      e.preventDefault();

      if (!motionOK) {
        summary.classList.toggle('is-open');
        details.toggleAttribute('open');
        return;
      }

      var shouldOpen = !summary.classList.contains('is-open');
      cancelInFlight();

      if (shouldOpen) {
        summary.classList.add('is-open');

        // If details was mid-close, it's still [open] — start from current visual.
        // Otherwise it's truly closed — start from summary height (collapsed).
        var startHeight = details.open
          ? details.offsetHeight + 'px'
          : summary.offsetHeight + 'px';

        details.style.overflow = 'hidden';
        details.style.height = startHeight;
        if (!details.open) details.setAttribute('open', '');

        // rAF: wait one frame so the content has entered the layout tree and
        // we can read scrollHeight (the true natural height of the open box).
        rafId = requestAnimationFrame(function () {
          rafId = null;
          var endHeight = details.scrollHeight + 'px';

          anim = details.animate(
            [{ height: startHeight }, { height: endHeight }],
            { duration: OPEN_DURATION, easing: OPEN_EASING, fill: 'forwards' }
          );

          anim.onfinish = function () {
            // Clear inline locks; details[open] keeps content visible at natural height.
            details.style.height = '';
            details.style.overflow = '';
            anim.cancel(); // animation effect ends; CSS auto height takes over
            anim = null;
          };
        });
      } else {
        summary.classList.remove('is-open');

        var startHeight = details.offsetHeight + 'px';
        var endHeight = summary.offsetHeight + 'px';

        details.style.overflow = 'hidden';
        details.style.height = startHeight;

        anim = details.animate(
          [{ height: startHeight }, { height: endHeight }],
          { duration: CLOSE_DURATION, easing: CLOSE_EASING, fill: 'forwards' }
        );

        anim.onfinish = function () {
          // Order matters: remove [open] first (closes details to summary height,
          // but animation fill at endHeight keeps the visual unchanged), then
          // clear inline styles, then cancel the animation. Each step preserves
          // the visual height so there's no flash.
          details.removeAttribute('open');
          details.style.height = '';
          details.style.overflow = '';
          anim.cancel();
          anim = null;
        };
      }
    });
  });
})();

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-tracker]');
  if (!el) return;
  const parts = el.dataset.tracker.split('|');
  if (parts.length !== 2) return;
  if (typeof mixpanel !== 'undefined') mixpanel.track(parts[0], { label: parts[1] });
});
