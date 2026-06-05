<script>
  import ImagePanel from '../components/ImagePanel.svelte';

  const slides = [
    { class: 'q1', icon: '💍', img: 'photo-1.jpg' },
    { class: 'q2', icon: '🎶', img: 'photo-2.jpg' },
    { class: 'q3', icon: '🥂', img: 'photo-3.jpg' }
  ];
</script>

<section class="scroll-section" id="s-ch2">
  <div class="chapter-card flip-layout">
    <div class="img-wrapper">
      <ImagePanel sectionName="chapter2" {slides} />
    </div>
    
    <div class="text-panel tp-sage">
      <div class="chapter-tag">Chapter Two</div>
      <div class="chapter-number cn-sage">02</div>
      <h2 class="chapter-title">They Said <em>"I Do"</em></h2>
      <div class="chapter-text">
        <p>Dressed in white and wrapped in joy, Ebun walked towards the one God had kept for her. Seyi waited — eyes glistening, heart full — ready to make his forever promise.</p>
        <p>Before family, before friends, and before their Father in heaven, Seyi and Ebun Oladepo became one. Two became one flesh. One home. One covenant.</p>
        <p>The celebration was glorious, but the quiet moment between them — hands held, vows whispered — that was the sacred part that will live forever.</p>
      </div>
      <div class="verse verse-sage">
        <p>"Therefore what God has joined together, let no one separate."</p>
        <cite>Mark 10:9</cite>
      </div>
    </div>
  </div>
</section>

<style>
  #s-ch2 {
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

  .tp-sage {
    background: linear-gradient(160deg, #ffffff 0%, #f2f6f4 100%);
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

  .verse-sage {
    background: #f2f5f1;
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
