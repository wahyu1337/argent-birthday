/**
 * main.js — Entry point for Birthday Site
 *
 * Usage config: edit CONFIG below to personalize
 * the site without touching any other file.
 */

import '../css/styles.css';
import { init as initConfetti, burstCenter, burst } from './confetti.js';
import { mountCounters } from './counter.js';
import { mountAnimations } from './animations.js';

/* =============================================
   CONFIGURATION — edit this block to personalise
   ============================================= */
const CONFIG = {
  /** Name displayed in the hero */
  recipientName: 'Aisya Sabrina',

  /**
   * Birthday: set the actual birth date to make
   * counters accurate. Leave null to default to 22 yrs ago.
   * Format: new Date('YYYY-MM-DD')
   */
  birthDate: new Date('1998-03-29'),

  /** Auto-fire confetti on page load */
  autoConfetti: true,
};
/* ============================================= */


function applyConfig() {
  const nameEl = document.getElementById('recipient-name');
  if (nameEl && CONFIG.recipientName) {
    nameEl.textContent = CONFIG.recipientName;
  }

  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()}`;
  }
}

function bindCelebrate() {
  const btn = document.getElementById('btn-celebrate');
  if (!btn) return;

  btn.addEventListener('click', () => {
    burstCenter(90);
  });
}

function bindCakeClick() {
  // If there's a decorative cake element added later
  const cake = document.getElementById('cake');
  if (!cake) return;
  cake.addEventListener('click', (e) => {
    burst(e.clientX, e.clientY, 80);
  });
}

function init() {
  applyConfig();
  initConfetti();
  mountAnimations();
  mountCounters(CONFIG.birthDate);
  bindCelebrate();
  bindCakeClick();

  if (CONFIG.autoConfetti) {
    // Short delay so page paints first
    setTimeout(() => burstCenter(70), 900);
  }
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
