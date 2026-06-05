<script>
  import ImagePanel from '../components/ImagePanel.svelte';

  const slides = [
    { class: 'r1', icon: '🌿', img: 'photo-1.jpg' },
    { class: 'r2', icon: '🙏', img: 'photo-2.jpg' },
    { class: 'r3', icon: '⏳', img: 'photo-3.jpg' }
  ];
</script>

<section class="scroll-section" id="s-ch3">
  <div class="chapter-card">
    <div class="img-wrapper">
      <ImagePanel sectionName="chapter3" {slides} />
    </div>
    
    <div class="text-panel tp-blue">
      <div class="chapter-tag">Chapter Three</div>
      <div class="chapter-number cn-blue">03</div>
      <h2 class="chapter-title">The Beautiful <em>Wait</em></h2>
      <div class="chapter-text">
        <p>Four years. Four years of praying, trusting, and holding on together. There were mornings of tears and evenings of worship. There were moments of doubt dissolved by faith.</p>
        <p>Seyi and Ebun did not walk this season alone — God was weaving something in the quiet, crafting a testimony that would outlast the pain of the waiting.</p>
        <p>They held each other. They held on to God. And God held them both — all the while preparing a blessing beyond what they had imagined.</p>
      </div>
      <div class="verse verse-blue">
        <p>"He makes all things beautiful in its time."</p>
        <cite>Ecclesiastes 3:11</cite>
      </div>
    </div>
  </div>
</section>

<style>
  #s-ch3 {
    min-height: 100vh;
  }

  .chapter-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }

  .img-wrapper {
    height: 100%;
    width: 100%;
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

  .tp-blue {
    background: linear-gradient(160deg, #ffffff 0%, #f4f2f8 100%);
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

  .cn-blue {
    color: #ede8f4;
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

  .verse-blue {
    background: #f4f2f8;
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
    .text-panel {
      padding: 28px 20px;
    }
    .chapter-text {
      max-width: 100%;
    }
  }
</style>
