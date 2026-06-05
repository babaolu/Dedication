<script>
  import { onMount } from 'svelte';
  import ImagePanel from '../components/ImagePanel.svelte';

  const slides = [
    { class: 's1', icon: '👶', img: 'photo-1.jpg' },
    { class: 's2', icon: '🤱', img: 'photo-2.jpg' },
    { class: 's3', icon: '✨', img: 'photo-3.jpg' }
  ];

  let randomImgWidth = '65%';
  let randomImgHeight = '82%';

  onMount(() => {
    // Generate a random width between 50% and 80%
    const w = 50 + Math.random() * 30;
    randomImgWidth = `${w.toFixed(1)}%`;

    // Generate a random height between 75% and 90%
    const h = 75 + Math.random() * 15;
    randomImgHeight = `${h.toFixed(1)}%`;
  });
</script>

<section class="scroll-section" id="s-ch5">
  <div class="chapter-card flip-layout">
    <div class="img-wrapper">
      <div 
        class="desktop-reduced-panel" 
        style="--desktop-width: {randomImgWidth}; --desktop-height: {randomImgHeight};"
      >
        <ImagePanel sectionName="chapter5" {slides} />
      </div>
    </div>
    
    <div class="text-panel tp-blend">
      <h2 class="chapter-title">Our <em>Greatest</em> Gift</h2>
      <div class="chapter-text">
        <p>He arrived on the 3rd of March — and the house filled with a joy that has no adequate word. Enoch. Tiny fingers, curious eyes, and a cry that sounded like an answered prayer.</p>
        <p>Ebun held him first, tears streaming, whispering "thank you" over and over. Seyi looked at his son and understood in an instant what it means when the Bible says God gives good gifts.</p>
        <p>Every year of waiting made sense. Every prayer found its answer in this one small face. Enoch is not just a baby — he is a miracle, a testimony, and a declaration that God is faithful.</p>
      </div>
      <div class="verse verse-blend">
        <p>"Children are a heritage from the Lord, offspring a reward from him."</p>
        <cite>Psalm 127:3</cite>
      </div>
    </div>
  </div>
</section>

<style>
  #s-ch5 {
    min-height: 100vh;
  }

  .chapter-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    background: #eaf4f0;
  }

  .chapter-card.flip-layout {
    direction: rtl;
  }

  .chapter-card.flip-layout > * {
    direction: ltr;
  }

  .img-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .desktop-reduced-panel {
    width: var(--desktop-width, 100%);
    height: var(--desktop-height, 100%);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .desktop-reduced-panel:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
  }

  .text-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(40px, 7vw, 90px) clamp(30px, 5vw, 70px);
    position: relative;
    overflow-y: auto;
  }

  .text-panel::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 120px;
    background: radial-gradient(circle at top right, rgba(200, 192, 216, 0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  .tp-blend {
    background: linear-gradient(160deg, #ffffff 0%, #eaf4f0 50%, #eaf2f6 100%);
  }

  .chapter-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 4.5vw, 44px);
    font-weight: 400;
    color: var(--text-dark);
    line-height: 1.2;
    margin-bottom: 22px;
  }

  .chapter-title em {
    font-style: italic;
    color: var(--gold);
  }

  .chapter-text {
    font-size: clamp(18px, 2.3vw, 24px);
    line-height: 1.9;
    color: var(--text-mid);
    font-weight: 600;
    max-width: 480px;
  }

  .chapter-text p + p {
    margin-top: 14px;
  }

  .verse {
    margin-top: 28px;
    padding: 18px 22px;
    border-left: 2px solid var(--gold);
    border-radius: 0 8px 8px 0;
  }

  .verse-blend {
    background: #e4f0ec;
  }

  .verse p {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(19px, 2.5vw, 26px);
    font-style: italic;
    color: var(--brown);
    line-height: 1.7;
    font-weight: 600;
  }

  .verse cite {
    display: block;
    margin-top: 8px;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: .15em;
    color: var(--gold);
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    .chapter-card {
      grid-template-columns: 1fr;
      direction: ltr !important;
    }
    .chapter-card.flip-layout > * {
      direction: ltr;
    }
    .img-wrapper {
      min-height: auto !important;
      max-height: none !important;
      height: auto !important;
      aspect-ratio: 4 / 3 !important;
    }
    .desktop-reduced-panel {
      width: 100% !important;
      height: 100% !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }
    .desktop-reduced-panel:hover {
      transform: none !important;
      box-shadow: none !important;
    }
    .text-panel {
      padding: 28px 20px;
    }
    .chapter-text {
      max-width: 100%;
    }
  }
</style>
