/**
 * counter.js
 * Animates number counters on scroll entry.
 */

/**
 * Easing: ease-out cubic
 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animate a single element from 0 → target.
 * @param {HTMLElement} el
 * @param {number} target
 * @param {number} duration  ms
 */
function animateTo(el, target, duration = 2000) {
  const start = performance.now();

  function frame(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value    = Math.floor(easeOutCubic(progress) * target);

    el.textContent = value.toLocaleString();

    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

/**
 * Calculate age-based counters from a birth date.
 * If no birth date supplied, defaults to 22 years ago today.
 * @param {Date} [birthDate]
 */
function getCounterValues(birthDate) {
  const now  = new Date();
  const from = birthDate || (() => {
    const d = new Date(now);
    d.setFullYear(d.getFullYear() - 22);
    return d;
  })();

  const diffMs = now - from;

  return {
    years:   Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25)),
    days:    Math.floor(diffMs / (1000 * 60 * 60 * 24)),
    hours:   Math.floor(diffMs / (1000 * 60 * 60)),
    minutes: Math.floor(diffMs / (1000 * 60)),
  };
}

/**
 * Mount the counter section.
 * Triggers animation once when the counter grid enters the viewport.
 * @param {Date} [birthDate]
 */
function mountCounters(birthDate) {
  const grid = document.getElementById('counter-grid');
  if (!grid) return;

  const values = getCounterValues(birthDate);

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();

      animateTo(document.getElementById('cnt-years'),   values.years,   1800);
      animateTo(document.getElementById('cnt-days'),    values.days,    2000);
      animateTo(document.getElementById('cnt-hours'),   values.hours,   2200);
      animateTo(document.getElementById('cnt-minutes'), values.minutes, 2400);
    },
    { threshold: 0.25 },
  );

  observer.observe(grid);
}

export { mountCounters };
