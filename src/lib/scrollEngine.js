let velocity = 0;
let rafRunning = false;
let wheelHandler = null;

export function initScrollEngine() {
  if ('ontouchstart' in window) {
    // Touch devices already have momentum scrolling
    return;
  }

  wheelHandler = (event) => {
    // Do not call preventDefault - do not block native scroll.
    velocity += event.deltaY * 0.6;
    
    // Cap velocity at ±120
    if (velocity > 120) velocity = 120;
    if (velocity < -120) velocity = -120;

    if (!rafRunning) {
      rafRunning = true;
      requestAnimationFrame(updateScroll);
    }
  };

  window.addEventListener('wheel', wheelHandler, { passive: true });
}

function updateScroll() {
  window.scrollBy(0, velocity);
  velocity *= 0.88;

  if (Math.abs(velocity) >= 0.5) {
    requestAnimationFrame(updateScroll);
  } else {
    velocity = 0;
    rafRunning = false;
  }
}

export function destroyScrollEngine() {
  if (wheelHandler) {
    window.removeEventListener('wheel', wheelHandler);
    wheelHandler = null;
  }
  velocity = 0;
  rafRunning = false;
}
