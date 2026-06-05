<script>
  import { onMount, onDestroy } from 'svelte';

  let stars = [];
  let revealImage = false;
  let timer = null;
  let sectionEl = null;
  let observer = null;

  onMount(() => {
    // Generate star parameters reactively
    stars = Array.from({ length: 60 }, () => {
      const size = 0.5 + Math.random() * 2;
      return {
        width: size + 'px',
        height: size + 'px',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        duration: (2 + Math.random() * 3) + 's',
        delay: Math.random() * 3 + 's'
      };
    });

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.3) {
          if (!timer && !revealImage) {
            timer = setTimeout(() => {
              revealImage = true;
            }, 5000);
          }
        } else {
          clearTimeout(timer);
          timer = null;
          revealImage = false;
        }
      });
    }, { threshold: [0, 0.3, 1] });

    if (sectionEl) {
      observer.observe(sectionEl);
    }
  });

  onDestroy(() => {
    clearTimeout(timer);
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<section class="scroll-section" id="s-interlude" bind:this={sectionEl}>
  <!-- Background fade layer revealing Invite.jpeg after 5s -->
  <div 
    class="interlude-bg" 
    class:visible={revealImage}
  ></div>

  <div class="stars">
    {#each stars as star}
      <div
        class="star"
        style="width: {star.width}; height: {star.height}; left: {star.left}; top: {star.top}; animation-duration: {star.duration}; animation-delay: {star.delay};"
      ></div>
    {/each}
  </div>
  
  <div class="interlude-content" class:darkened-text={revealImage}>
    <div class="interlude-pre">✦ And then ✦</div>
    <div class="interlude-title">Seyi &amp; Ebun Oladepo joyfully welcome</div>
    <h2 class="interlude-name">Enoch</h2>
    <div class="interlude-meaning">— He who walks with God —</div>
    
    <div class="interlude-line"></div>
    
    <div class="interlude-verse">
      <p>"Before I formed you in the womb I knew you, before you were born I set you apart."</p>
      <cite>Jeremiah 1:5</cite>
    </div>
  </div>
</section>

<style>
  #s-interlude {
    background: linear-gradient(150deg, #3a2e22 0%, #5a4535 50%, #3a2e22 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 24px;
    position: relative;
    min-height: 100vh;
  }

  .interlude-bg {
    position: absolute;
    inset: 0;
    /* Soft light radial gradient vignette overlay on Interlude.jpeg ensures perfect readability when darkened */
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(245, 240, 235, 0.8) 100%), 
                url('/images/Interlude.jpeg');
    background-size: cover;
    background-position: center;
    z-index: 1;
    opacity: 0;
    transition: opacity 3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: opacity;
  }

  .interlude-bg.visible {
    opacity: 1;
  }

  .stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
  }

  .star {
    position: absolute;
    background: #fff;
    border-radius: 50%;
    animation: twinkle ease-in-out infinite;
  }

  .interlude-content {
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
  .interlude-pre,
  .interlude-title,
  .interlude-name,
  .interlude-meaning,
  .interlude-line,
  .interlude-verse,
  .interlude-verse cite {
    transition: color 2.5s ease-in-out, background-color 2.5s ease-in-out, text-shadow 2.5s ease-in-out;
  }

  .interlude-pre {
    font-size: 13.5px;
    letter-spacing: .35em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .interlude-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(16px, 2.8vw, 22px);
    font-weight: 300;
    color: rgba(255, 255, 255, .75);
    margin-bottom: 14px;
    letter-spacing: .08em;
  }

  .interlude-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(75px, 20vw, 160px);
    font-weight: 300;
    font-style: italic;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 16px;
    text-shadow: 0 0 80px rgba(201, 169, 110, .4);
  }

  .interlude-meaning {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 2.8vw, 25px);
    font-style: italic;
    color: rgba(255, 255, 255, .65);
    margin-bottom: 36px;
  }

  .interlude-line {
    width: 80px;
    height: 1px;
    background: var(--gold);
    margin: 0 auto 36px;
  }

  .interlude-verse {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(17px, 2.2vw, 23px);
    font-style: italic;
    color: rgba(255, 255, 255, .7);
    line-height: 1.8;
    max-width: 500px;
  }

  .interlude-verse cite {
    display: block;
    margin-top: 12px;
    font-size: 12.5px;
    letter-spacing: .2em;
    color: var(--gold);
    text-transform: uppercase;
    font-style: normal;
  }

  /* High-contrast premium text darkening rules */
  .interlude-content.darkened-text .interlude-pre {
    color: var(--brown);
  }

  .interlude-content.darkened-text .interlude-title {
    color: var(--text-dark);
  }

  .interlude-content.darkened-text .interlude-name {
    color: var(--text-dark);
    text-shadow: 0 0 40px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5);
  }

  .interlude-content.darkened-text .interlude-meaning {
    color: var(--text-mid);
  }

  .interlude-content.darkened-text .interlude-line {
    background: var(--brown);
  }

  .interlude-content.darkened-text .interlude-verse {
    color: var(--text-dark);
  }

  .interlude-content.darkened-text .interlude-verse cite {
    color: var(--brown);
  }
</style>
