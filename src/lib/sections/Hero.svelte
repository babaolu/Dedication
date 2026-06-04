<script>
  import { onMount, onDestroy } from 'svelte';
  import { currentSection, targetSection } from '../store.js';

  export let element = null;

  const colors = ['#c9a96e', '#c8c0d8', '#dde8e2', '#e8d5b0', '#d4d0e8'];
  let petals = [];

  let revealImage = false;
  let timer = null;

  // React to currentSection to start a 5-second timer when Hero is active
  $: if ($currentSection === 0) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      revealImage = true;
    }, 5000);
  } else {
    clearTimeout(timer);
    revealImage = false; // Reset when navigating away
  }

  onMount(() => {
    // Generate petals parameters reactively
    petals = Array.from({ length: 22 }, () => ({
      left: Math.random() * 100 + '%',
      background: colors[Math.floor(Math.random() * colors.length)],
      duration: (6 + Math.random() * 10) + 's',
      delay: (Math.random() * 10) + 's',
      transform: 'rotate(' + (Math.random() * 360) + 'deg)'
    }));
  });

  onDestroy(() => {
    clearTimeout(timer);
  });
</script>

<section class="card front" id="s-hero" bind:this={element}>
  <!-- Background fade layer revealing Invite.jpeg -->
  <div 
    class="hero-bg" 
    class:visible={revealImage}
  ></div>

  <div class="hero-petals">
    {#each petals as petal}
      <div
        class="petal"
        style="left: {petal.left}; background: {petal.background}; animation-duration: {petal.duration}; animation-delay: {petal.delay}; transform: {petal.transform};"
      ></div>
    {/each}
  </div>

  <div class="hero-content" class:darkened-text={revealImage}>
    <div class="hero-ornament">A Story of Grace &amp; Love</div>
    <h1 class="hero-title"><em>Enoch</em></h1>
    <div class="hero-sub">The Dedication of a Promised Son</div>
    
    <div class="hero-divider">
      <span></span>
      <i>🕊️</i>
      <span></span>
    </div>
    
    <div class="hero-parents">Seyi &amp; Ebun Oladepo</div>
    <div class="hero-date">July 15 — Baby Dedication</div>
  </div>
</section>

<style>
  #s-hero {
    background: linear-gradient(160deg, #ffffff 0%, #f8f4ff 40%, #ede8f4 70%, #e8f0ec 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 24px;
    position: relative;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    /* Soft light radial gradient vignette overlay ensures contrast and high readability of dark text */
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(244, 238, 248, 0.9) 100%), 
                url('/images/Invite.jpeg');
    background-size: cover;
    background-position: center;
    z-index: 1;
    opacity: 0;
    transition: opacity 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity;
  }

  .hero-bg.visible {
    opacity: 1;
  }

  .hero-petals {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;
  }

  .hero-content {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  /* Smooth 2.5s transitions for elegant text darkening */
  .hero-ornament,
  .hero-title,
  .hero-title em,
  .hero-sub,
  .hero-parents,
  .hero-date {
    transition: color 2.5s ease-in-out, text-shadow 2.5s ease-in-out;
  }

  .petal {
    position: absolute;
    width: 8px;
    height: 14px;
    border-radius: 50% 50% 50% 0;
    opacity: .16;
    animation: fall linear infinite;
  }

  .hero-ornament {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(13px, 2vw, 17px);
    letter-spacing: .35em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(56px, 13vw, 120px);
    font-weight: 300;
    line-height: 1;
    color: var(--text-dark);
    margin-bottom: 8px;
  }

  .hero-title em {
    font-style: italic;
    color: var(--gold);
  }

  .hero-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 3.2vw, 25px);
    font-weight: 300;
    font-style: italic;
    color: var(--text-mid);
    margin-bottom: 32px;
    letter-spacing: .04em;
  }

  .hero-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
  }

  .hero-divider span {
    width: 60px;
    height: 1px;
    background: var(--gold);
    opacity: .6;
  }

  .hero-divider i {
    font-style: normal;
    font-size: 20px;
  }

  .hero-parents {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 2.8vw, 25px);
    color: var(--text-mid);
    margin-bottom: 8px;
  }

  .hero-date {
    font-size: 13px;
    letter-spacing: .25em;
    color: var(--text-light);
    text-transform: uppercase;
  }

  /* Darkened-text contrast state overrides */
  .hero-content.darkened-text .hero-ornament {
    color: var(--brown);
  }

  .hero-content.darkened-text .hero-title {
    color: var(--text-dark);
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  }

  .hero-content.darkened-text .hero-title em {
    color: var(--brown);
  }

  .hero-content.darkened-text .hero-sub {
    color: var(--text-dark);
  }

  .hero-content.darkened-text .hero-parents {
    color: var(--text-dark);
  }

  .hero-content.darkened-text .hero-date {
    color: var(--text-mid);
  }
</style>
