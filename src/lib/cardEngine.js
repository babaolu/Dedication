import { TRANSITIONS, pickTransition } from './transitions.js';
import { targetSection, isTransitioning } from './store.js';

export function createEngine({ sections, onSectionChange }) {
  let current = 0;
  let transitioning = false;
  let autoTimer = null;
  let returnTimer = null;
  let wheelCooldown = false;

  const TOTAL = sections.length;

  function resetAutoTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (!transitioning) {
        if (current < TOTAL - 1) {
          advance();
        }
      }
    }, 10000);
  }

  function scheduleReturn() {
    clearTimeout(returnTimer);
    returnTimer = setTimeout(() => {
      goTo(0);
    }, 5000);
  }

  function goTo(next) {
    if (transitioning) return;
    if (next === current) return;
    transitioning = true;
    isTransitioning.set(true);
    targetSection.set(next);
    resetAutoTimer();
    clearTimeout(returnTimer);

    const fromEl = sections[current];
    const toEl = sections[next];

    if (!fromEl || !toEl) {
      transitioning = false;
      isTransitioning.set(false);
      return;
    }

    const tid = pickTransition();
    const T = TRANSITIONS[tid];

    // Prepare outgoing
    fromEl.classList.add('front');
    fromEl.classList.remove('behind', 'hidden');
    fromEl.style.zIndex = '2';

    // Prepare incoming (hidden behind)
    toEl.classList.remove('hidden');
    toEl.classList.add('behind');
    toEl.style.zIndex = '1';
    T.pin(toEl);

    // Animate out
    T.prep(fromEl);
    T.out(fromEl, () => {
      // Switch z order
      fromEl.style.zIndex = '1';
      toEl.style.zIndex = '2';
      toEl.classList.remove('behind');
      toEl.classList.add('front');

      // Animate in
      requestAnimationFrame(() => {
        T.in(toEl);
        setTimeout(() => {
          // Cleanup outgoing
          fromEl.classList.add('hidden');
          fromEl.classList.remove('front', 'behind');
          fromEl.style.cssText = '';
          
          // Clear inline styles but ensure cards render correctly
          toEl.style.cssText = '';
          toEl.style.opacity = '1';
          toEl.style.transform = 'none';
          toEl.style.filter = 'none';
          toEl.style.clipPath = '';
          
          current = next;
          transitioning = false;
          isTransitioning.set(false);
          onSectionChange(current);
          
          // If reached last, schedule return to first
          if (current === TOTAL - 1) {
            scheduleReturn();
          }
        }, T.dur + 100);
      });
    });
  }

  function advance() {
    if (current < TOTAL - 1) {
      goTo(current + 1);
    }
  }

  function handleWheel(e) {
    if (wheelCooldown || transitioning) return;
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 900);
    resetAutoTimer();
    clearTimeout(returnTimer);

    if (e.deltaY > 0) {
      if (current < TOTAL - 1) {
        advance();
      } else {
        goTo(0);
      }
    } else {
      if (current > 0) {
        goTo(current - 1);
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
      resetAutoTimer();
      clearTimeout(returnTimer);
      if (current < TOTAL - 1) {
        advance();
      } else {
        goTo(0);
      }
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      resetAutoTimer();
      clearTimeout(returnTimer);
      if (current > 0) {
        goTo(current - 1);
      }
    }
  }

  // Setup listeners
  window.addEventListener('wheel', handleWheel, { passive: true });
  window.addEventListener('keydown', handleKeyDown);

  // Initialize auto advance
  resetAutoTimer();

  // Return API
  return {
    goTo,
    advance,
    destroy() {
      clearInterval(autoTimer);
      clearTimeout(returnTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    }
  };
}
