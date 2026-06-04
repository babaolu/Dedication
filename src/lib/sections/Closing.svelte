<script>
  import { onMount, onDestroy } from 'svelte';

  export let element = null;

  const TARGET_DATE = '2026-07-15T11:00:00+01:00'; // July 15, 11:00 BST = GMT+1
  const targetTime = new Date(TARGET_DATE).getTime();

  let days = '00';
  let hours = '00';
  let minutes = '00';
  let seconds = '00';
  let finished = false;
  let timer = null;

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

<section class="card hidden" id="s-closing" bind:this={element}>
  <div class="closing-ornament">🕊️</div>
  <h2 class="closing-main">We give him back to <em>God</em><br>who gave him to us</h2>
  <p class="closing-sub">
    On this day, Seyi and Ebun Oladepo stand before God and family to dedicate Enoch — to raise him in love, faith, and the knowledge that he is deeply, eternally wanted.
  </p>
  <div class="closing-date-badge">July 15 — Baby Dedication</div>

  <div id="countdown-wrap">
    <span class="cdown-label">Counting the Moments</span>
    <div id="countdown">
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
</section>

<style>
  #s-closing {
    background: linear-gradient(160deg, #ffffff 0%, #f4f2f8 40%, #eef3ee 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: clamp(30px, 5vh, 60px) 30px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }

  .closing-ornament {
    font-size: 34px;
    margin-bottom: clamp(12px, 2.5vh, 24px);
    opacity: .5;
  }

  .closing-main {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 5.5vw, 58px);
    font-weight: 300;
    color: var(--text-dark);
    line-height: 1.25;
    margin-bottom: clamp(12px, 2.5vh, 20px);
  }

  .closing-main em {
    font-style: italic;
    color: var(--gold);
  }

  .closing-sub {
    font-size: clamp(14.5px, 2vw, 18.5px);
    color: var(--text-mid);
    line-height: 1.8;
    max-width: 480px;
    margin: 0 auto clamp(16px, 3vh, 32px);
  }

  .closing-date-badge {
    font-size: 13.5px;
    letter-spacing: .3em;
    color: var(--gold);
    text-transform: uppercase;
    border: 1px solid var(--gold-light);
    padding: 10px 28px;
    border-radius: 30px;
    display: inline-block;
    margin-bottom: clamp(16px, 3vh, 36px);
  }

  /* COUNTDOWN */
  #countdown-wrap {
    margin-top: 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

  #countdown {
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
