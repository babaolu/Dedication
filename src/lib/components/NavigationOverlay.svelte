<script>
  import { currentSection, totalSections, isTransitioning, navigationGoTo } from '../store.js';

  let startX = 0;
  let startY = 0;
  let isSwiping = false;

  function handleTouchStart(e) {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;
  }

  function handleTouchEnd(e) {
    if (!isSwiping || e.changedTouches.length !== 1) return;
    isSwiping = false;

    // Ignore swipes if target/closest is within interactive components
    const target = e.target;
    if (
      target.closest('#audio-bar') ||
      target.closest('#nav-dots') ||
      target.closest('.img-arrow') ||
      target.closest('.img-dot') ||
      target.closest('button') ||
      target.closest('a')
    ) {
      return;
    }

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // Minimum swipe threshold of 50px
    const THRESHOLD = 50;

    // Determine direction
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (Math.abs(diffX) > THRESHOLD) {
        if (diffX < 0) {
          // Swipe left -> advance
          navigateForward();
        } else {
          // Swipe right -> backward
          navigateBackward();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(diffY) > THRESHOLD) {
        if (diffY < 0) {
          // Swipe up -> advance
          navigateForward();
        } else {
          // Swipe down -> backward
          navigateBackward();
        }
      }
    }
  }

  function navigateForward() {
    if ($isTransitioning || !$navigationGoTo) return;
    const current = $currentSection;
    const total = $totalSections;
    if (current < total - 1) {
      $navigationGoTo(current + 1);
    } else {
      $navigationGoTo(0);
    }
  }

  function navigateBackward() {
    if ($isTransitioning || !$navigationGoTo) return;
    const current = $currentSection;
    if (current > 0) {
      $navigationGoTo(current - 1);
    }
  }

  function handleLeftClick(e) {
    if ($isTransitioning) return;
    e.stopPropagation();
    navigateBackward();
  }

  function handleRightClick(e) {
    if ($isTransitioning) return;
    e.stopPropagation();
    navigateForward();
  }
</script>

<svelte:window 
  on:touchstart={handleTouchStart} 
  on:touchend={handleTouchEnd}
/>

<div class="nav-overlay-container">
  <!-- Left Third Click Zone -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="click-zone left-zone" 
    class:disabled={$currentSection === 0}
    on:click={handleLeftClick}
  >
    <div class="arrow-hint left-arrow">‹</div>
  </div>

  <!-- Right Third Click Zone -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="click-zone right-zone" 
    on:click={handleRightClick}
  >
    <div class="arrow-hint right-arrow">›</div>
  </div>
</div>

<style>
  .nav-overlay-container {
    position: fixed;
    inset: 0;
    pointer-events: none; /* Let clicks pass through center third */
    z-index: 50; /* Above cards (z-index 1-2) and below floating elements (z-index 9999) */
  }

  .click-zone {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 33.333%;
    pointer-events: auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    transition: background 0.3s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .left-zone {
    left: 0;
  }

  .right-zone {
    right: 0;
  }

  .click-zone.disabled {
    cursor: default;
  }

  .arrow-hint {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: clamp(48px, 6vw, 72px);
    font-weight: 200;
    color: var(--gold);
    opacity: 0;
    transform: scale(0.85);
    transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    pointer-events: none;
  }

  /* Desktop hover hints only */
  @media (hover: hover) {
    .left-zone:not(.disabled):hover {
      background: linear-gradient(90deg, rgba(201, 169, 110, 0.04) 0%, rgba(201, 169, 110, 0) 100%);
    }
    
    .right-zone:hover {
      background: linear-gradient(-90deg, rgba(201, 169, 110, 0.04) 0%, rgba(201, 169, 110, 0) 100%);
    }

    .left-zone:not(.disabled):hover .arrow-hint {
      opacity: 0.65;
      transform: translateX(-10px) scale(1);
    }

    .right-zone:hover .arrow-hint {
      opacity: 0.65;
      transform: translateX(10px) scale(1);
    }
  }

  /* Active click ripple/flash on all devices */
  .click-zone:not(.disabled):active {
    background: rgba(201, 169, 110, 0.08);
  }
</style>
