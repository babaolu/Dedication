<script>
  import { currentSection, totalSections } from '../store.js';

  $: visible = $currentSection < $totalSections - 1;
</script>

<div id="tap-hint" style="opacity: {visible ? '1' : '0'}; pointer-events: none;">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M12 5v14M5 12l7 7 7-7"/>
  </svg>
  Swipe or tap right side to continue
</div>

<style>
  #tap-hint {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    font-size: 11px;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, .55);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    animation: bob 2.4s ease-in-out infinite;
    transition: opacity .5s;
  }

  #tap-hint svg {
    width: 18px;
    opacity: .5;
  }
</style>
