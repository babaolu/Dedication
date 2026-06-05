<section class="scroll-section" id="s-hero">
  <!-- Immovable background element clipped to this section footprint -->
  <div class="hero-bg-cover"></div>
  
  <!-- Foreground main image in original position -->
  <div class="hero-fg-intro"></div>
</section>

<style>
  #s-hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: visible;
    /* Immovable clip path mask */
    clip-path: inset(0 0 0 0);
    -webkit-clip-path: inset(0 0 0 0);
    padding: 0;
    margin: 0;
    background-color: #ffffff; /* Sits behind transparent immovable background */
  }

  /* Fixed immovable background element */
  .hero-bg-cover {
    position: fixed;
    inset: 0;
    background-image: url('/images/Intro_cover.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    z-index: 1;
    filter: blur(8px);
    opacity: 0.45;
    pointer-events: none;
  }

  /* Foreground image in original position on top of cover */
  .hero-fg-intro {
    position: absolute;
    inset: 0;
    background-image: url('/images/Intro.jpeg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
</style>
