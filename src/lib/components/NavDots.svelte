<script>
  import { currentSection, totalSections } from '../store.js';

  export let goTo = (idx) => {};

  function handleClick(e, idx) {
    e.stopPropagation();
    goTo(idx);
  }
</script>

<div id="nav-dots">
  {#each Array($totalSections) as _, i}
    <button
      class="nav-dot"
      class:active={$currentSection === i}
      title="Section {i + 1}"
      on:click={(e) => handleClick(e, i)}
      aria-label="Navigate to section {i + 1}"
    ></button>
  {/each}
</div>

<style>
  #nav-dots {
    position: fixed;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .nav-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s;
    padding: 0;
    outline: none;
  }

  .nav-dot.active {
    background: #fff;
    transform: scale(1.4);
  }

  @media (max-width: 768px) {
    #nav-dots {
      display: none;
    }
  }
</style>
