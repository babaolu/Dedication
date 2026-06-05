<script>
  import ImagePanel from '../components/ImagePanel.svelte';

  const slides = [
    { class: 's1', icon: '👶', img: 'photo-1.jpg' },
    { class: 's2', icon: '🤱', img: 'photo-2.jpg' },
    { class: 's3', icon: '✨', img: 'photo-3.jpg' }
  ];
</script>

<section class="scroll-section" id="s-ch4">
  <div class="chapter-card flip-layout">
    <div class="img-wrapper">
      <ImagePanel sectionName="chapter4" {slides} />
    </div>
    
    <div class="text-panel tp-blend">
      <div class="chapter-tag">Chapter Four</div>
      <div class="chapter-number cn-sage">04</div>
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
  #s-ch4 {
    min-height: 100vh;
  }

  .chapter-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
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
    background: linear-gradient(160deg, #ffffff 0%, #f0f4f2 50%, #f5f3f9 100%);
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

  .cn-sage {
    color: #e6eee9;
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
    font-size: clamp(14.5px, 1.6vw, 18.5px);
    line-height: 1.9;
    color: var(--text-mid);
    font-weight: 400;
    max-width: 420px;
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
    background: #f0f4f2;
  }

  .verse p {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(15.5px, 2vw, 19.5px);
    font-style: italic;
    color: var(--brown);
    line-height: 1.7;
  }

  .verse cite {
    display: block;
    margin-top: 8px;
    font-size: 12.5px;
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
      min-height: 40vh;
      max-height: 45vh;
    }
    .text-panel {
      padding: 28px 20px;
    }
    .chapter-text {
      max-width: 100%;
    }
  }
</style>
