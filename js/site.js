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
  document.querySelectorAll('.pivot__stage, .pivot__mobile-layout').forEach(el => _chipObs.observe(el));
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

if ('IntersectionObserver' in window) {
  const _countEls = document.querySelectorAll('[data-count]');
  if (_countEls.length) {
    const _countObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        _countObs.unobserve(e.target);
        const end = parseInt(e.target.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();
        function step(now) {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          e.target.textContent = Math.round(eased * end);
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    _countEls.forEach(el => _countObs.observe(el));
  }
}

// Seamless review marquee: clone the card set so translateX(-50%) loops with no
// gap. Done in JS so the HTML source holds a single set of 12 reviews.
const _marqueeTrack = document.querySelector('.proof-bar__track');
if (_marqueeTrack) {
  const _origCount = _marqueeTrack.children.length;
  Array.from(_marqueeTrack.children).forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    _marqueeTrack.appendChild(clone);
  });
  // Safari sizes a `width: max-content` flex track to the cards' *unwrapped* text
  // width (~27000px), not the sum of their fixed 280px widths (~7100px), so
  // translateX(-50%) overshoots and the marquee scrolls several times too fast.
  // Pin the track to its real width: the first clone's offset == one card set.
  const _oneSet = _marqueeTrack.children[_origCount].offsetLeft;
  if (_oneSet) _marqueeTrack.style.width = _oneSet * 2 + 'px';
}

const _yearEl = document.querySelector('.copyright-year');
if (_yearEl) _yearEl.textContent = new Date().getFullYear();

// Footer language dropdown — disclosure: toggle, outside-click + Escape close.
// Option links navigate on their own; closed menu is visibility:hidden so its
// links drop out of the tab order.
document.querySelectorAll('[data-lang-select]').forEach((root) => {
  const trigger = root.querySelector('.lang-select__trigger');
  if (!trigger) return;
  const open  = () => { root.classList.add('is-open');    trigger.setAttribute('aria-expanded', 'true');  };
  const close = () => { root.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    root.classList.contains('is-open') ? close() : open();
  });
  document.addEventListener('click', (e) => { if (!root.contains(e.target)) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) { close(); trigger.focus(); }
  });
});

// Email links — assembled client-side so the address never ships as a plaintext
// `user@domain` pattern in the served HTML (defeats simple spam-harvesting bots).
// `data-etext` opts a link into showing the full address as its label too.
document.querySelectorAll('a.js-email').forEach((a) => {
  const user = a.getAttribute('data-eu');
  const domain = a.getAttribute('data-ed');
  if (!user || !domain) return;
  const addr = user + '@' + domain;
  a.setAttribute('href', 'mailto:' + addr);
  if (a.hasAttribute('data-etext')) a.textContent = addr;
  a.removeAttribute('data-eu');
  a.removeAttribute('data-ed');
  a.removeAttribute('data-etext');
});

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-tracker]');
  if (!el) return;
  const parts = el.dataset.tracker.split('|');
  if (parts.length !== 2) return;
  if (typeof mixpanel !== 'undefined') mixpanel.track(parts[0], { label: parts[1] });
});

// Android email capture — hero + final CTA on the home pages.
// Runs only when the inline <head> detector put `.ua-android` on <html>.
//
// There is no form endpoint: the submission is a Mixpanel event carrying the
// address, so spam bots that harvest `action` attributes have nothing to POST
// to. The cost is that Mixpanel is on ad-block lists, which makes one rule the
// whole point of this block — never say "you're on the list" unless Mixpanel
// confirmed it. Blocked, offline, or silent for 4s all fall back to a mailto.
;(function () {
  var root = document.documentElement;
  if (!root.classList.contains('ua-android')) return;

  var forms = document.querySelectorAll('.android-capture');
  if (!forms.length) return;

  var SEND_TIMEOUT_MS = 4000;
  var EMAIL_USER = 'hi';
  var EMAIL_DOMAIN = 'weatherfit.com';

  // The async Mixpanel stub pre-defines `track`, `identify`, `people.set` etc.
  // as queue-pushers, but not `get_distinct_id` — so this is true only once
  // the real library has actually loaded.
  function mixpanelLoaded() {
    return typeof mixpanel !== 'undefined' && typeof mixpanel.get_distinct_id === 'function';
  }

  function setStatus(status, state, text) {
    status.textContent = text || '';
    if (state) status.setAttribute('data-state', state);
    else status.removeAttribute('data-state');
  }

  // Honest failure: we could not record it, so say so and offer a human path.
  // The address is assembled here so it never ships as plaintext in the HTML
  // (same reason as the `js-email` links above).
  function showFallback(form, status) {
    var addr = EMAIL_USER + '@' + EMAIL_DOMAIN;
    setStatus(status, 'fallback', form.dataset.msgFallback + ' ');
    var a = document.createElement('a');
    a.href = 'mailto:' + addr + '?subject=Android';
    a.textContent = addr;
    status.appendChild(a);
  }

  // SHOWN is the denominator for the capture rate, so it goes through the stub
  // queue rather than waiting on mixpanelLoaded() — the library is async and is
  // usually still in flight here. Undercounting it would inflate the rate.
  if (typeof mixpanel !== 'undefined') {
    mixpanel.track('ANDROID_CAPTURE_SHOWN', { label: forms[0].dataset.label });
  }

  forms.forEach(function (form) {
    var status = form.querySelector('.android-capture__status');
    var row    = form.querySelector('.android-capture__row');
    var button = form.querySelector('.android-capture__button');
    var input  = form.querySelector('input[name="email"]');
    var label  = form.dataset.label;   // 'HOME' | 'HOME_DE' | 'HOME_ZH' …
    var source = form.dataset.source;  // 'HERO' | 'FINAL_CTA'
    var focused = false;

    input.addEventListener('focus', function () {
      if (focused || !mixpanelLoaded()) return;
      focused = true;
      mixpanel.track('ANDROID_CAPTURE_FOCUS', { label: label, source: source });
    });

    // Clear the error the moment they start fixing it, so a red border never
    // outlives the mistake. Fallback and success are left alone — the fallback
    // holds a mailto they may still be reading.
    input.addEventListener('input', function () {
      if (status.getAttribute('data-state') !== 'error') return;
      setStatus(status, null, '');
      input.removeAttribute('aria-invalid');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot. A real bot gets nothing useful out of the mailto (the address
      // is assembled in this file either way), and routing here rather than
      // returning silently means a human whose password manager filled the
      // field still has a working path instead of a button that does nothing.
      if (form.website && form.website.value) {
        showFallback(form, status);
        return;
      }

      input.value = input.value.trim();
      setStatus(status, null, '');
      input.removeAttribute('aria-invalid');

      if (!input.checkValidity()) {                     // novalidate is on; validate ourselves
        setStatus(status, 'error', form.dataset.msgError);
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }

      var originalText = button.textContent;
      button.disabled = true;
      button.textContent = '…';

      var settled = false;
      var poll = null;
      function settle(ok) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (poll) clearInterval(poll);
        if (ok) {
          row.hidden = true;
          setStatus(status, 'success', form.dataset.msgSuccess);
          status.setAttribute('tabindex', '-1');
          status.focus();
        } else {
          button.disabled = false;
          button.textContent = originalText;
          showFallback(form, status);
        }
      }

      // If the callback never fires (request hangs, network dropped after load,
      // or the library never arrives), this is what keeps us from leaving the
      // button spinning forever — and it's the only thing allowed to declare
      // failure. Nothing below shortcuts it.
      var timer = setTimeout(function () { settle(false); }, SEND_TIMEOUT_MS);

      function send() {
        mixpanel.track('ANDROID_CAPTURE_SUBMITTED', {
          label: label,
          source: source,
          email: input.value.toLowerCase(),
          locale: root.lang || 'en',
          page: location.pathname,
          browser_language: navigator.language || '',
          referrer: document.referrer || ''
        }, { send_immediately: true }, function (response) {
          settle(!!response);   // the SDK passes 1 on accept, 0 on failure
        });
      }

      // mixpanelLoaded() can't tell "blocked" from "hasn't landed yet", and the
      // library is async while this form sits above the fold. Declaring failure
      // the moment it's absent would tell a visitor on a slow connection that
      // their browser blocks us and drop a signup the stub queue would have
      // delivered. Wait for it inside the timeout budget that already exists.
      if (mixpanelLoaded()) {
        send();
      } else {
        poll = setInterval(function () {
          if (settled || !mixpanelLoaded()) return;
          clearInterval(poll);
          poll = null;
          send();
        }, 100);
      }
    });
  });
})();
