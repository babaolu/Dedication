<script>
  import { onMount, onDestroy } from 'svelte';

  export let sectionName = ''; // e.g. "chapter1"
  export let slides = []; // array of { class: 'p1', icon: '💛', img: 'photo-1.jpg' }

  let current = 0;
  let timer = null;
  let imageErrors = {};

  // Eagerly glob all images under public/images to count and load them dynamically
  const imageModules = import.meta.glob('../../../public/images/**/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG,WEBP,SVG}', { eager: true });

  let computedSlides = [];

  // Filter keys matching the current section name (folder)
  const prefix = `../../../public/images/${sectionName}/`;
  const matchedKeys = Object.keys(imageModules).filter(key => key.startsWith(prefix));

  // Extract clean file names and filter out any hidden/config files like .gitkeep
  const realImages = matchedKeys
    .map(key => key.substring(prefix.length))
    .filter(name => !name.startsWith('.') && name !== '.gitkeep')
    .sort();

  // Create a reactive list of computed slides
  if (realImages.length > 0) {
    computedSlides = realImages.map((imgName, idx) => {
      const origSlide = slides[idx % slides.length] || {};
      const fallbackClass = slides[0]?.class || 'p1';
      const sectionClassPrefix = fallbackClass.charAt(0);
      const classNum = (idx % 3) + 1; // Cycle through gradient fallback classes 1, 2, 3
      return {
        img: imgName,
        class: `${sectionClassPrefix}${classNum}`,
        icon: origSlide.icon || '✨',
        isReal: true
      };
    });
  } else {
    // Graceful fallback to existing CSS gradient placeholders if folder is empty or missing
    computedSlides = slides.map(slide => ({
      ...slide,
      isReal: false
    }));
  }

  // Calculate adaptive display timing
  let intervalMs = 4000;
  $: {
    const N = computedSlides.length;
    if (N > 0) {
      if (N >= 5) {
        intervalMs = 2000; // 2 seconds each
      } else {
        intervalMs = (10 / N) * 1000; // divide 10 seconds equally
      }
    }
  }

  function resetTimer() {
    clearInterval(timer);
    if (computedSlides.length <= 1) return;
    timer = setInterval(() => {
      slideMove(1);
    }, intervalMs);
  }

  function goSlide(idx) {
    current = (idx + computedSlides.length) % computedSlides.length;
    resetTimer();
  }

  function slideMove(dir) {
    goSlide(current + dir);
  }

  function handleImageError(index) {
    imageErrors = { ...imageErrors, [index]: true };
  }

  // Reactivate timer if intervalMs or slides list updates
  $: if (intervalMs && computedSlides.length > 1) {
    resetTimer();
  }

  onMount(() => {
    resetTimer();
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div class="img-panel">
  {#each computedSlides as slide, i}
    <div class="img-slide {slide.class} {i === current ? 'active' : ''}" data-icon={slide.icon}>
      {#if slide.isReal && !imageErrors[i]}
        <img
          src={`/images/${sectionName}/${slide.img}`}
          alt="Enoch's dedication slideshow"
          on:error={() => handleImageError(i)}
          class="slide-img"
        />
      {/if}
    </div>
  {/each}
  
  <div class="img-overlay"></div>
  
  <button class="img-arrow prev" on:click|stopPropagation={() => slideMove(-1)}>‹</button>
  <button class="img-arrow next" on:click|stopPropagation={() => slideMove(1)}>›</button>
  
  <div class="img-dots">
    {#each computedSlides as _, i}
      <button
        class="img-dot {i === current ? 'active' : ''}"
        on:click|stopPropagation={() => goSlide(i)}
        aria-label="View slide {i + 1}"
      ></button>
    {/each}
  </div>
</div>

<style>
  .img-panel {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .img-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.6s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img-slide.active {
    opacity: 1;
    z-index: 1;
  }

  .slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    inset: 0;
    z-index: 2;
  }

  /* CSS Gradients Fallback */
  .img-slide.p1 { background: linear-gradient(135deg, #e8c99a, #d4a574, #c4956a); }
  .img-slide.p2 { background: linear-gradient(135deg, #f0dcc0, #e0c095, #d0a870); }
  .img-slide.p3 { background: linear-gradient(135deg, #ddd0b8, #c8b890, #b8a068); }

  .img-slide.q1 { background: linear-gradient(135deg, #e0d5c8, #c8baa8, #b8a490); }
  .img-slide.q2 { background: linear-gradient(135deg, #d8e0d5, #b8c8b4, #98b090); }
  .img-slide.q3 { background: linear-gradient(135deg, #e8ddd5, #d0c0b0, #b8a090); }

  .img-slide.r1 { background: linear-gradient(135deg, #f0e8e0, #e0d0c0, #d0b8a0); }
  .img-slide.r2 { background: linear-gradient(135deg, #ece0d8, #d8c8b8, #c8b098); }
  .img-slide.r3 { background: linear-gradient(135deg, #f8ede0, #ecd8c0, #e0c4a0); }

  .img-slide.s1 { background: linear-gradient(135deg, #fce8d8, #f8d8c0, #f0c8a8); }
  .img-slide.s2 { background: linear-gradient(135deg, #fce0d0, #f8cdb8, #f4baa0); }
  .img-slide.s3 { background: linear-gradient(135deg, #f8e8dc, #f4d8c4, #eec8a8); }

  .img-slide::after {
    content: attr(data-icon);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: clamp(60px, 10vw, 100px);
    opacity: 0.2;
    z-index: 1;
  }

  .img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.15) 0%, transparent 65%);
    pointer-events: none;
    z-index: 3;
  }

  :global(.flip-layout) .img-overlay {
    background: linear-gradient(to left, rgba(0, 0, 0, 0.15) 0%, transparent 65%);
  }

  .img-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 4;
  }

  .img-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.45);
    cursor: pointer;
    border: none;
    transition: background 0.3s, transform 0.3s;
  }

  .img-dot.active {
    background: #fff;
    transform: scale(1.35);
  }

  .img-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 5;
    font-size: 16px;
    transition: background 0.2s;
    backdrop-filter: blur(4px);
  }

  .img-arrow:hover {
    background: rgba(255, 255, 255, 0.32);
  }

  .img-arrow.prev {
    left: 14px;
  }

  .img-arrow.next {
    right: 14px;
  }

  @media (max-width: 768px) {
    .img-panel {
      min-height: auto !important;
      max-height: none !important;
      height: 100% !important;
    }
    .slide-img {
      object-fit: contain !important;
    }
  }
</style>
