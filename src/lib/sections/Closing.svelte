<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let sectionEl = null;
  let observer = null;

  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.2) {
          dispatch('countdownReveal');
          if (observer) {
            observer.disconnect();
          }
        }
      });
    }, { threshold: [0, 0.2, 1] });

    if (sectionEl) {
      observer.observe(sectionEl);
    }
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<section class="scroll-section" id="s-closing" bind:this={sectionEl}>
  <div class="closing-ornament">🕊️</div>
  <h2 class="closing-main">We give him back to <em>God</em><br>who gave him to us</h2>
  <p class="closing-sub">
    On this day, Seyi and Ebun Oladepo stand before God and family to dedicate Enoch — to raise him in love, faith, and the knowledge that he is deeply, eternally wanted.
  </p>
  <div class="closing-date-badge">July 5 — Baby Dedication</div>
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
    min-height: 100vh;
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
</style>
