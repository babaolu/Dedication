<script>
  import { onMount } from 'svelte';

  // Base list of real images from public/images/gallery
  const baseItems = [
    { img: 'Dad_and_mum.jpeg', emoji: '👨‍👩‍👦' },
    { img: 'Grateful_mum.jpeg', emoji: '🤱' },
    { img: 'Mummy_date.jpeg', emoji: '👩‍👦' }
  ];

  // Default non-random items for SSR safety
  let items = baseItems.map((item, i) => ({
    ...item,
    colSpan: 1,
    aspectRatio: '1/1',
    tilt: 0,
    bgClass: `c${(i % 6) + 1}`
  }));

  let imageErrors = {};

  function handleImageError(img) {
    imageErrors = { ...imageErrors, [img]: true };
  }

  onMount(() => {
    // 1. Shuffle the real image items
    let shuffled = [...baseItems].sort(() => Math.random() - 0.5);

    // 2. Choose a curated, gapless layout configuration for 3 cards in a 3-column grid
    const layouts = [
      [1, 1, 1], // Single clean row
      [2, 1, 3], // Dynamic asymmetric 2-row grid (no holes)
      [1, 2, 3], // Dynamic asymmetric 2-row grid (no holes)
      [3, 1, 2], // Full-width hero card followed by smaller split cards
      [3, 2, 1]  // Full-width hero card followed by smaller split cards
    ];
    let randomLayout = [...layouts[Math.floor(Math.random() * layouts.length)]];

    // Ensure Dad_and_mum.jpeg always takes the largest column span in the layout
    const dadMumIndex = shuffled.findIndex(item => item.img === 'Dad_and_mum.jpeg');
    const maxSpanVal = Math.max(...randomLayout);
    const maxSpanIndex = randomLayout.indexOf(maxSpanVal);

    if (maxSpanIndex !== dadMumIndex) {
      const temp = randomLayout[dadMumIndex];
      randomLayout[dadMumIndex] = randomLayout[maxSpanIndex];
      randomLayout[maxSpanIndex] = temp;
    }

    // 3. Map with random styling properties and curated aspect ratios based on column span
    items = shuffled.map((item, i) => {
      const colSpan = randomLayout[i];
      
      let aspectRatio;
      if (colSpan === 3) {
        // Landscape formats for full-width cards
        const landscapeRatios = ['16/9', '21/9', '3/2'];
        aspectRatio = landscapeRatios[Math.floor(Math.random() * landscapeRatios.length)];
      } else if (colSpan === 2) {
        // Square or light landscape
        const mediumRatios = ['1/1', '4/3', '3/2'];
        aspectRatio = mediumRatios[Math.floor(Math.random() * mediumRatios.length)];
      } else {
        // Portrait or square
        const smallRatios = ['3/4', '1/1', '4/3'];
        aspectRatio = smallRatios[Math.floor(Math.random() * smallRatios.length)];
      }
      
      // Random subtle rotation/tilt (-2.5deg to 2.5deg) for a physical photo-print aesthetic
      const tilt = (Math.random() * 5 - 2.5).toFixed(1);

      return {
        ...item,
        colSpan,
        aspectRatio,
        tilt,
        bgClass: `c${(i % 6) + 1}`
      };
    });
  });
</script>

<section class="scroll-section" id="s-gallery">
  <div class="gallery-label">✦ Moments ✦</div>
  <h2 class="gallery-heading">A Life, Captured in Light</h2>
  
  <div class="gallery-grid">
    {#each items as item}
      <div 
        class="gallery-card"
        style="--col-span: {item.colSpan}; --col-span-tablet: {item.colSpan === 3 ? 2 : item.colSpan}; --aspect-ratio: {item.aspectRatio}; --tilt: {item.tilt}deg;"
      >
        <div class={item.bgClass}>
          {#if !imageErrors[item.img]}
            <img
              src={`/images/gallery/${item.img}`}
              alt="Enoch's life captured"
              on:error={() => handleImageError(item.img)}
              class="gallery-img"
            />
          {/if}
          <span class="emoji-placeholder" style={!imageErrors[item.img] ? 'display: none;' : ''}>{item.emoji}</span>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  #s-gallery {
    background: linear-gradient(160deg, #f5f4ec 0%, #ddeee5 50%, #ddeaf0 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: clamp(60px, 8vh, 100px) clamp(20px, 5vw, 40px);
    text-align: center;
    min-height: 100vh;
  }

  .gallery-label {
    font-size: 13px;
    letter-spacing: .35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 14px;
    font-weight: 500;
  }

  .gallery-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 4.5vw, 48px);
    font-weight: 300;
    color: var(--text-dark);
    margin-bottom: 48px;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    max-width: 1040px;
    width: 100%;
    margin: 0 auto;
  }

  .gallery-card {
    grid-column: span var(--col-span, 1);
    aspect-ratio: var(--aspect-ratio, 1/1);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    transform: rotate(var(--tilt, 0deg));
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 12px 32px rgba(46, 58, 64, 0.08);
  }

  .gallery-card:hover {
    transform: rotate(0deg) scale(1.035);
    box-shadow: 0 24px 48px rgba(46, 58, 64, 0.16);
    z-index: 10;
  }

  .gallery-card div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    position: relative;
  }

  .gallery-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
    z-index: 2;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .gallery-card:hover .gallery-img {
    transform: scale(1.02);
  }

  .emoji-placeholder {
    position: absolute;
    z-index: 1;
  }

  /* Specific premium gradients from palette shadow tones */
  .gallery-card :global(.c1) { background: linear-gradient(135deg, #ddeaf0, #b4cdd4); }
  .gallery-card :global(.c2) { background: linear-gradient(135deg, #ddeee5, #a8c0b0); }
  .gallery-card :global(.c3) { background: linear-gradient(135deg, #f5f4ec, #ddeaf0); }
  .gallery-card :global(.c4) { background: linear-gradient(135deg, #b4cdd4, #7a9aaa); }
  .gallery-card :global(.c5) { background: linear-gradient(135deg, #ddeee5, #ddeaf0); }
  .gallery-card :global(.c6) { background: linear-gradient(135deg, #a8c0b0, #7a9aaa); }

  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .gallery-card {
      grid-column: span var(--col-span-tablet, 1);
    }
  }

  @media (max-width: 480px) {
    .gallery-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .gallery-card {
      grid-column: span 1 !important;
      aspect-ratio: 4/3 !important; /* Force standard comfortable aspect ratio on small mobile */
      transform: none !important; /* Disable tilt on small mobile to maximize screen utilization */
    }
    .gallery-card:hover {
      transform: scale(1.02) !important;
    }
  }
</style>
