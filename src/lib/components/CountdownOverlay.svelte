<script>
  import { onMount, onDestroy } from 'svelte';

  export let revealed = false;

  const TARGET_DATE = '2026-07-05T11:00:00+01:00'; // Target date
  const targetTime = new Date(TARGET_DATE).getTime();

  let days = '00';
  let hours = '00';
  let minutes = '00';
  let seconds = '00';
  let finished = false;
  let timer = null;
  let hasBeenRevealed = false;

  $: if (revealed) {
    hasBeenRevealed = true;
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      finished = true;
      if (timer) {
        clearInterval(timer);
      }
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    days = String(d).padStart(2, '0');
    hours = String(h).padStart(2, '0');
    minutes = String(m).padStart(2, '0');
    seconds = String(s).padStart(2, '0');
  }

  onMount(() => {
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
  });

  onDestroy(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
</script>

<div class="countdown-placeholder" class:is-hidden={hasBeenRevealed}>
  <div class="countdown-container static-mode">
    <span class="cdown-label">Counting the Moments</span>
    <div class="countdown-grid">
      {#if finished}
        <span class="cd-live">✦ The dedication is happening now! ✦</span>
      {:else}
        <div class="cd-unit">
          <span class="cd-num">{days}</span>
          <span class="cd-lbl">Days</span>
        </div>
        <div class="cd-unit">
          <span class="cd-num">{hours}</span>
          <span class="cd-lbl">Hours</span>
        </div>
        <div class="cd-unit">
          <span class="cd-num">{minutes}</span>
          <span class="cd-lbl">Minutes</span>
        </div>
        <div class="cd-unit">
          <span class="cd-num">{seconds}</span>
          <span class="cd-lbl">Seconds</span>
        </div>
      {/if}
    </div>
  </div>
</div>

{#if hasBeenRevealed}
  <div class="countdown-container fixed-mode animate-pop">
    <span class="cdown-label">Counting the Moments</span>
    <div class="countdown-grid">
      {#if finished}
        <span class="cd-live">✦ The dedication is happening now! ✦</span>
      {:else}
        <div class="cd-unit">
          <span class="cd-num">{days}</span>
          <span class="cd-lbl">Days</span>
        </div>
        <div class="cd-unit">
          <span class="cd-num">{hours}</span>
          <span class="cd-lbl">Hours</span>
        </div>
        <div class="cd-unit">
          <span class="cd-num">{minutes}</span>
          <span class="cd-lbl">Minutes</span>
        </div>
        <div class="cd-unit">
          <span class="cd-num">{seconds}</span>
          <span class="cd-lbl">Seconds</span>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .countdown-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .countdown-placeholder {
    width: 100%;
    display: flex;
    justify-content: center;
    visibility: hidden;
    pointer-events: none;
    margin-top: 24px;
  }

  .fixed-mode {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 8000;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.98) 80%, rgba(255, 255, 255, 0.9) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.05);
    padding: 20px 24px;
    border-top: 1px solid var(--gold-light);
  }

  .animate-pop {
    animation: popIn 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) both;
  }

  @keyframes popIn {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  .cdown-label {
    display: block;
    font-size: 11.5px;
    letter-spacing: .32em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-bottom: 16px;
    text-align: center;
  }

  .countdown-grid {
    display: flex;
    gap: clamp(8px, 2vw, 18px);
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }

  .cd-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: clamp(64px, 11vw, 120px);
    aspect-ratio: 1/1;
    border: 1px solid var(--gold-light);
    border-radius: 4px;
    background: rgba(245, 234, 212, 0.92);
    padding: 8px;
  }

  .cd-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 5.5vw, 60px);
    font-weight: 300;
    color: var(--gold);
    line-height: 1;
  }

  .cd-lbl {
    font-size: 10.5px;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--text-light);
  }

  .cd-live {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 2.8vw, 26px);
    font-style: italic;
    color: var(--gold);
    animation: pulse-note 1.4s ease-in-out infinite;
    text-align: center;
  }
</style>
