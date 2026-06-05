<script>
  import { onMount } from 'svelte';
  import ImagePanel from '../components/ImagePanel.svelte';

  const slides = [
    { class: 't1', icon: '🙌', img: 'photo-1.jpg' },
    { class: 't2', icon: '❤️', img: 'photo-2.jpg' },
    { class: 't3', icon: '👨‍👩‍👧‍👦', img: 'photo-3.jpg' }
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

<section class="scroll-section" id="s-ch4">
  <div class="chapter-card">
    <div class="img-wrapper">
      <div 
        class="desktop-reduced-panel" 
        style="--desktop-width: {randomImgWidth}; --desktop-height: {randomImgHeight};"
      >
        <ImagePanel sectionName="Chapter4" {slides} />
      </div>
    </div>
    
    <div class="text-panel tp-support">
      <div class="chapter-tag">Chapter Four</div>
      <div class="chapter-number cn-purple">04</div>
      <h2 class="chapter-title">Surrounded by <em>Love</em></h2>
      <div class="chapter-text">
        <p>A miracle is never witnessed in isolation. As Seyi and Ebun waited, and as they now celebrate, they were never alone. They were held up by the hands of friends, wrapped in the prayers of parents, and cheered on by a community of love.</p>
        <p>From quiet, whispered prayers in distant rooms to the joyful noise of family gathered close, every step of this journey has been paved with the support of those who stood in the gap.</p>
      </div>
      <div class="verse verse-support">
        <p>"Bear one another's burdens, and so fulfill the law of Christ."</p>
        <cite>Galatians 6:2</cite>
      </div>
    </div>
  </div>
</section>

<style>
  #s-ch4 {
    min-height: 100vh;
  }

  .chapter-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    background: #faf8fc;
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

  .tp-support {
    background: linear-gradient(160deg, #ffffff 0%, #faf8fc 50%, #fcf8f6 100%);
  }

  .chapter-tag {
    font-size: 11.5px;
    letter-spacing: .35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .chapter-tag::before {
    content: '';
    display: block;
    width: 30px;
    height: 1px;
    background: var(--gold);
  }

  .chapter-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(65px, 10vw, 100px);
    font-weight: 300;
    line-height: 1;
    margin-bottom: -10px;
  }

  .cn-purple {
    color: #f5f1f9;
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

  .verse-support {
    background: #fcf9f2;
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
