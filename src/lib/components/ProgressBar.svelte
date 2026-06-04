<script>
  import { currentSection, totalSections } from '../store.js';

  // Svelte reactive declaration to calculate width percentage
  $: width = ($currentSection / ($totalSections - 1)) * 100;
</script>

<div id="progress-bar" style="width: {width}%"></div>

<style>
  #progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--hblue));
    z-index: 9999;
    transition: width 0.6s ease;
    pointer-events: none;
  }
</style>
