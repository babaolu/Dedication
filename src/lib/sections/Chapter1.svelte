<script>
  import ImagePanel from '../components/ImagePanel.svelte';

  export let element = null;

  const slides = [
    { class: 'p1', icon: '💛', img: 'photo-1.jpg' },
    { class: 'p2', icon: '🤝', img: 'photo-2.jpg' },
    { class: 'p3', icon: '🌸', img: 'photo-3.jpg' }
  ];
</script>

<section class="card hidden" id="s-ch1" bind:this={element}>
  <div class="chapter-card">
    <div class="img-wrapper">
      <ImagePanel sectionName="chapter1" {slides} />
    </div>
    
    <div class="text-panel tp-white">
      <div class="chapter-tag">Chapter One</div>
      <div class="chapter-number cn-blue">01</div>
      <h2 class="chapter-title">Where It All <em>Began</em></h2>
      <div class="chapter-text">
        <p>Every great story has a beginning — and ours began with a smile, a conversation, and a quiet knowing that something beautiful was unfolding.</p>
        <p>Seyi saw Ebun, and the world quietly rearranged itself. Two hearts, two paths, crossing at exactly the right moment — because God's timing is never late.</p>
        <p>What started as friendship bloomed into something neither could deny: a love rooted in faith, laughter, and the certainty that they were made for each other.</p>
      </div>
      <div class="verse verse-white">
        <p>"He who finds a wife finds a good thing and obtains favour from the Lord."</p>
        <cite>Proverbs 18:22</cite>
      </div>
    </div>
  </div>
</section>

<style>
  .chapter-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
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

  .tp-white {
    background: #ffffff;
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

  .verse-white {
    background: #faf6ee;
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
    }
    .img-wrapper {
      min-height: 45vw;
      max-height: 55vw;
    }
    .text-panel {
      padding: 28px 20px;
    }
    .chapter-text {
      max-width: 100%;
    }
  }
</style>
