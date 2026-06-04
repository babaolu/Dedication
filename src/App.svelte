<script>
  import { onMount, onDestroy } from 'svelte';
  import { currentSection, navigationGoTo } from './lib/store.js';
  import { createEngine } from './lib/cardEngine.js';

  // Shared Floating Controls
  import ProgressBar from './lib/components/ProgressBar.svelte';
  import NavDots from './lib/components/NavDots.svelte';
  import AudioBar from './lib/components/AudioBar.svelte';
  import TapHint from './lib/components/TapHint.svelte';
  import NavigationOverlay from './lib/components/NavigationOverlay.svelte';

  // Card Sections
  import Hero from './lib/sections/Hero.svelte';
  import Chapter1 from './lib/sections/Chapter1.svelte';
  import Chapter2 from './lib/sections/Chapter2.svelte';
  import Chapter3 from './lib/sections/Chapter3.svelte';
  import Interlude from './lib/sections/Interlude.svelte';
  import Chapter4 from './lib/sections/Chapter4.svelte';
  import Gallery from './lib/sections/Gallery.svelte';
  import Closing from './lib/sections/Closing.svelte';

  let engine = null;
  
  // Placeholder navigation callback until engine mounts
  let goTo = (idx) => {};

  onMount(() => {
    // Query DOM directly to get all 8 sections in document order
    const sections = Array.from(document.querySelectorAll('#stage .card'));

    // Instantiate card transition engine with bound DOM elements
    engine = createEngine({
      sections,
      onSectionChange: (idx) => {
        currentSection.set(idx);
      }
    });

    // Wire up navigation function
    goTo = engine.goTo;
    navigationGoTo.set(engine.goTo);
  });

  onDestroy(() => {
    if (engine) {
      engine.destroy();
    }
  });
</script>

<!-- Global progress bar -->
<ProgressBar />

<!-- Section stage and cards -->
<div id="stage">
  <Hero />
  <Chapter1 />
  <Chapter2 />
  <Chapter3 />
  <Interlude />
  <Chapter4 />
  <Gallery />
  <Closing />
</div>

<!-- Full-screen Click-Zone and Swipe Overlay -->
<NavigationOverlay />

<!-- Floating Nav Dots (right-side) -->
<NavDots {goTo} />

<!-- Floating Custom Audio Player -->
<AudioBar />

<!-- "Tap to continue" Hint Overlay -->
<TapHint />
