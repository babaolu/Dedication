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
  <!-- Sticky immovable background clipped to the section footprint -->
  <div class="closing-bg"></div>

  <!-- Top 1/3: Solid content panel with boosted text sizes -->
  <div class="closing-content">
    <div class="closing-ornament">🕊️</div>
    <h2 class="closing-main">We give him back to <em>God</em><br>who gave him to us</h2>
    <p class="closing-sub">
      On this day, Seyi and Ebun Oladepo stand before God and family to dedicate Enoch — to raise him in love, faith, and the knowledge that he is deeply, eternally wanted.
    </p>
  </div>

  <!-- Bottom 2/3: Transparent window revealing Invite.jpeg behind it -->
  <div class="closing-window"></div>
</section>

<style>
  #s-closing {
    position: relative;
    min-height: 120vh;
    display: flex;
    flex-direction: column;
    overflow: visible;
    /* High-performance mobile-safe parallax container clipping */
    clip-path: inset(0 0 0 0);
    -webkit-clip-path: inset(0 0 0 0);
    background: transparent;
    padding: 0;
    margin: 0;
  }

  /* Fixed immovable background element */
  .closing-bg {
    position: fixed;
    inset: 0;
    background-image: url('/images/Invite.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  /* Solid top 1/3 card containing the closing texts */
  .closing-content {
    background: linear-gradient(160deg, #ffffff 0%, #eef6fa 40%, #eaf4f0 100%);
    width: 100%;
    min-height: 40vh; /* Occupies exactly 1/3 of the viewport height */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: clamp(40px, 6vh, 80px) 24px;
    box-sizing: border-box;
    position: relative;
    z-index: 2; /* Sits on top of the fixed background */
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.05);
  }

  /* Transparent lower 2/3 window revealing Invite.jpeg */
  .closing-window {
    width: 100%;
    height: 80vh; /* Occupies the lower 2/3 of the viewport height */
    background: transparent; /* Reveals the immovable background */
    position: relative;
    z-index: 1; /* Underneath content card, but reveals the background */
    pointer-events: none;
  }

  .closing-ornament {
    font-size: 38px;
    margin-bottom: clamp(16px, 2.5vh, 28px);
    opacity: .7;
  }

  .closing-main {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 5.5vw, 64px);
    font-weight: 600;
    color: var(--text-dark);
    line-height: 1.25;
    margin-bottom: clamp(16px, 2.5vh, 24px);
  }

  .closing-main em {
    font-style: italic;
    color: var(--gold);
  }

  .closing-sub {
    font-size: clamp(18px, 2.3vw, 24px);
    color: var(--text-mid);
    line-weight: 600;
    font-weight: 600;
    line-height: 1.8;
    max-width: 520px;
    margin: 0 auto clamp(20px, 3vh, 36px);
  }



  @media (max-width: 768px) {
    #s-closing {
      min-height: 110vh;
    }
    .closing-content {
      min-height: 45vh;
      padding: 32px 16px;
    }
    .closing-window {
      height: 65vh;
    }
  }
</style>
