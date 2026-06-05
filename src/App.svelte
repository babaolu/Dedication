<script>
  import { onMount, onDestroy } from 'svelte';
  import { currentSection } from './lib/store.js';
  import { initScrollEngine, destroyScrollEngine } from './lib/scrollEngine.js';

  // Floating controls
  import AudioBar from './lib/components/AudioBar.svelte';
  import CountdownOverlay from './lib/components/CountdownOverlay.svelte';

  // Sections
  import Hero from './lib/sections/Hero.svelte';
  import Chapter1 from './lib/sections/Chapter1.svelte';
  import Chapter2 from './lib/sections/Chapter2.svelte';
  import Chapter3 from './lib/sections/Chapter3.svelte';
  import ChapterFour from './lib/sections/Chapter4.svelte';
  import Interlude from './lib/sections/Interlude.svelte';
  import ChapterFive from './lib/sections/Chapter5.svelte';
  import Gallery from './lib/sections/Gallery.svelte';
  import Closing from './lib/sections/Closing.svelte';

  const SECTION_IDS = [
    's-hero', 's-ch1', 's-ch2', 's-ch3', 's-ch4',
    's-interlude', 's-ch5', 's-gallery', 's-closing'
  ];

  const ANIMATION_CLASSES = [
    'anim-fade-up', 'anim-fade-down',
    'anim-flip-x', 'anim-flip-y', 'anim-flip-y-neg',
    'anim-zoom-in', 'anim-zoom-out',
    'anim-slide-left', 'anim-slide-right',
    'anim-tilt-left', 'anim-tilt-right',
    'anim-rise-rotate', 'anim-drop-rotate',
    'anim-swing-in', 'anim-scale-tilt'
  ];

  let animPool = [];
  function getNextAnimation() {
    if (animPool.length === 0) {
      // Shuffle the 15 classes
      animPool = [...ANIMATION_CLASSES].sort(() => Math.random() - 0.5);
    }
    return animPool.pop();
  }

  let countdownRevealed = false;
  let animatedSections = new Set();
  let entranceObserver = null;
  let scrollObserver = null;

  onMount(() => {
    // 1. Initialize Inertial Scrolling
    initScrollEngine();

    // 2. Entrance Animation Observer
    entranceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const id = el.id;

          if (id === 's-hero' || id === 's-closing') {
            // Hero and Closing sections are exempt
            return;
          }

          if (!animatedSections.has(id)) {
            const animClass = getNextAnimation();
            el.style.opacity = '0';
            el.classList.add(animClass);
            animatedSections.add(id);
          }
        }
      });
    }, { threshold: 0.15 });

    // 3. Scroll Position Active Section Observer
    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = SECTION_IDS.indexOf(id);
          if (index !== -1) {
            currentSection.set(index);
          }
        }
      });
    }, { threshold: 0.5 });

    // Observe all scroll-sections
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => {
      entranceObserver.observe(section);
      scrollObserver.observe(section);
    });
  });

  onDestroy(() => {
    // Destroy Inertial Scrolling
    destroyScrollEngine();

    // Disconnect Observers
    if (entranceObserver) entranceObserver.disconnect();
    if (scrollObserver) scrollObserver.disconnect();
  });
</script>

<main>
  <Hero />
  <Chapter1 />
  <Chapter2 />
  <Chapter3 />
  <ChapterFour />
  <Interlude />
  <ChapterFive />
  <Gallery />
  <Closing on:countdownReveal={() => countdownRevealed = true} />
  
  <CountdownOverlay revealed={countdownRevealed} />
</main>

<AudioBar />
