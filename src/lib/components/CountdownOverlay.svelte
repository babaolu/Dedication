<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  export let revealed = false; // kept for compatibility, no longer the visibility trigger

  const dispatch = createEventDispatcher();

  const TARGET_DATE = '2026-07-05T11:00:00+01:00';
  const targetTime = new Date(TARGET_DATE).getTime();

  let days = '00', hours = '00', minutes = '00', seconds = '00';
  let finished = false;
  let timer = null;
  let dockVisible = false;
  let dockEl = null;
  let venueObserver = null;

  function updateCountdown() {
    const now = Date.now();
    const diff = targetTime - now;
    if (diff <= 0) {
      finished = true;
      clearInterval(timer);
      return;
    }
    days    = String(Math.floor(diff / 86400000)).padStart(2, '0');
    hours   = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }

  onMount(() => {
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);

    // Observe #s-venue to show/hide dock
    const venueSection = document.getElementById('s-venue');
    if (venueSection) {
      venueObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          dockVisible = entry.intersectionRatio >= 0.2;
        });
      }, { threshold: [0, 0.2, 0.5, 1] });
      venueObserver.observe(venueSection);
    }

    // Dispatch dock height after render so App can add padding to #s-venue
    requestAnimationFrame(() => {
      if (dockEl) {
        dispatch('dockHeight', { height: dockEl.offsetHeight });
      }
    });
  });

  onDestroy(() => {
    clearInterval(timer);
    if (venueObserver) venueObserver.disconnect();
  });
</script>

<div
  class="dock"
  class:dock-visible={dockVisible}
  bind:this={dockEl}
>
  <!-- LEFT: Countdown -->
  <div class="dock-countdown">
    <span class="cdown-label">Counting the Moments</span>
    <div class="countdown-grid">
      {#if finished}
        <span class="cd-live">✦ The dedication is happening now! ✦</span>
      {:else}
        <div class="cd-unit"><span class="cd-num">{days}</span><span class="cd-lbl">Days</span></div>
        <div class="cd-unit"><span class="cd-num">{hours}</span><span class="cd-lbl">Hours</span></div>
        <div class="cd-unit"><span class="cd-num">{minutes}</span><span class="cd-lbl">Minutes</span></div>
        <div class="cd-unit"><span class="cd-num">{seconds}</span><span class="cd-lbl">Seconds</span></div>
      {/if}
    </div>
  </div>

  <!-- RIGHT: Map buttons -->
  <div class="dock-buttons">
    <a
      href="https://maps.google.com/maps?q=RCCG+Livingston+Assembly+EH54+6LT"
      target="_blank"
      rel="noopener noreferrer"
      class="map-btn"
    >
      <span class="map-btn-icon">🗺️</span>
      <span class="map-btn-label">View Map</span>
    </a>
    <a
      href="https://www.google.com/maps/dir/?api=1&destination=EH54+6LT"
      target="_blank"
      rel="noopener noreferrer"
      class="map-btn"
    >
      <span class="map-btn-icon">🧭</span>
      <span class="map-btn-label">Directions</span>
    </a>
  </div>
</div>

<style>
  .dock {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 8000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: clamp(12px, 3vw, 32px);
    padding: 16px clamp(16px, 4vw, 40px);
    background: linear-gradient(to top, rgba(238, 246, 250, 0.98) 80%, rgba(238, 246, 250, 0.9) 100%);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--gold-light);
    box-shadow: 0 -10px 40px rgba(90, 128, 144, 0.08);
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
    pointer-events: none;
  }

  .dock.dock-visible {
    transform: translateY(0);
    pointer-events: auto;
  }

  /* Countdown side */
  .dock-countdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 0;
  }

  .cdown-label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-bottom: 10px;
    text-align: center;
  }

  .countdown-grid {
    display: flex;
    gap: clamp(6px, 1.5vw, 14px);
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }

  .cd-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: clamp(52px, 9vw, 90px);
    aspect-ratio: 1/1;
    border: 1px solid var(--gold-light);
    border-radius: 4px;
    background: rgba(221, 234, 240, 0.92);
    padding: 6px;
  }

  .cd-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 4vw, 46px);
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
  }

  .cd-lbl {
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-light);
  }

  .cd-live {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(15px, 2.5vw, 22px);
    font-style: italic;
    color: var(--gold);
    animation: pulse-note 1.4s ease-in-out infinite;
    text-align: center;
  }

  /* Button side */
  .dock-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;
  }

  .map-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border: 1px solid var(--gold-light);
    border-radius: 30px;
    background: rgba(221, 234, 240, 0.92);
    color: var(--text-dark);
    text-decoration: none;
    font-family: 'Quicksand', sans-serif;
    font-size: clamp(11px, 1.4vw, 14px);
    font-weight: 500;
    letter-spacing: 0.06em;
    white-space: nowrap;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  }

  .map-btn:hover {
    background: rgba(180, 205, 212, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(90, 128, 144, 0.15);
  }

  .map-btn-icon {
    font-size: 16px;
  }

  .map-btn-label {
    color: var(--text-dark);
  }

  @media (max-width: 480px) {
    .dock {
      flex-direction: column;
      gap: 12px;
      padding: 14px 12px;
    }
    .dock-buttons {
      flex-direction: row;
      justify-content: center;
    }
  }
</style>
