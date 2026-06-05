<script>
  import { onMount, onDestroy } from 'svelte';
  import { isAudioPlaying } from '../store.js';

  const TRACKS = [
    '/music/Anendlessocean_-_Gratitude_CeeNaija.com_.mp3',
    '/music/Brandon_Lake_-_Gratitude_CeeNaija.com_.mp3',
    '/music/Mile-Twelve-Gratitude-Kate-Serban-Bethel-Music-(CeeNaija.com).mp3',
    '/music/Victoria_Orenze_-_Gratitude_CeeNaija.com_.mp3'
  ];

  let selectedTrack = TRACKS[Math.floor(Math.random() * TRACKS.length)];
  let audioElement;
  let audioUnlocked = false;

  // Draggable State
  let buttonEl;
  let posX = 0;
  let posY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialX = 0;
  let initialY = 0;
  let dragThreshold = 5;
  let moved = false;

  function keepInBounds() {
    const width = buttonEl ? buttonEl.offsetWidth : 150;
    const height = buttonEl ? buttonEl.offsetHeight : 45;
    if (posX < 10) posX = 10;
    if (posY < 10) posY = 10;
    const maxW = window.innerWidth - width - 10;
    const maxH = window.innerHeight - height - 10;
    if (posX > maxW) posX = maxW;
    if (posY > maxH) posY = maxH;
  }

  function handleMouseDown(e) {
    if (e.button !== 0) return; // Only left click
    startDrag(e.clientX, e.clientY);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function handleTouchStart(e) {
    if (e.touches.length > 0) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
  }

  function startDrag(clientX, clientY) {
    isDragging = true;
    moved = false;
    startX = clientX;
    startY = clientY;
    initialX = posX;
    initialY = posY;
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    moveDrag(e.clientX, e.clientY);
  }

  function handleTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault(); // Prevent scrolling page while sliding the audio button
    if (e.touches.length > 0) {
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  function moveDrag(clientX, clientY) {
    const dx = clientX - startX;
    const dy = clientY - startY;
    if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
      moved = true;
    }
    posX = initialX + dx;
    posY = initialY + dy;
    keepInBounds();
  }

  function handleMouseUp() {
    isDragging = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  function handleTouchEnd() {
    isDragging = false;
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  }

  function handleButtonClick(e) {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    toggleAudio();
  }

  function toggleAudio() {
    if (!audioElement) return;

    if (audioElement.paused) {
      audioElement.play()
        .then(() => {
          audioUnlocked = true;
          isAudioPlaying.set(true);
          removeInteractionListeners();
        })
        .catch(err => console.log('Playback error:', err));
    } else {
      audioElement.pause();
      isAudioPlaying.set(false);
    }
  }

  function startAudio() {
    if (audioUnlocked) return;
    if (!audioElement) return;
    
    if (!audioElement.paused) {
      audioUnlocked = true;
      isAudioPlaying.set(true);
      removeInteractionListeners();
      return;
    }

    audioElement.volume = 0.45;
    audioElement.play()
      .then(() => {
        audioUnlocked = true;
        isAudioPlaying.set(true);
        removeInteractionListeners();
      })
      .catch((err) => {
        // Playback blocked, keep listeners active for scroll or clicks
        isAudioPlaying.set(false);
      });
  }

  function removeInteractionListeners() {
    ['click', 'touchstart', 'touchend', 'pointerdown', 'pointerup', 'keydown', 'mousedown', 'mouseup', 'scroll', 'touchmove', 'wheel'].forEach(evt => {
      window.removeEventListener(evt, startAudio);
      document.removeEventListener(evt, startAudio);
    });
  }

  onMount(() => {
    // Wait for DOM to lay out and measure actual width/height
    setTimeout(() => {
      const width = buttonEl ? buttonEl.offsetWidth : 150;
      const height = buttonEl ? buttonEl.offsetHeight : 45;
      posX = window.innerWidth - width - 24;
      posY = window.innerHeight - height - 24;
      keepInBounds();
    }, 100);

    window.addEventListener('resize', keepInBounds);

    // Attempt automatic play on load
    startAudio();

    // Setup global interaction listeners to unlock audio, including scroll & wheel & touch/pointer release events
    ['click', 'touchstart', 'touchend', 'pointerdown', 'pointerup', 'keydown', 'mousedown', 'mouseup', 'scroll', 'touchmove', 'wheel'].forEach(evt => {
      window.addEventListener(evt, startAudio, { passive: true });
      document.addEventListener(evt, startAudio, { passive: true });
    });
  });

  onDestroy(() => {
    window.removeEventListener('resize', keepInBounds);
    removeInteractionListeners();
  });
</script>

<!-- Floating Audio Controller (Slidable) -->
<button
  bind:this={buttonEl}
  id="audio-bar"
  class:playing={$isAudioPlaying}
  class:dragging={isDragging}
  style="left: {posX}px; top: {posY}px; bottom: auto; right: auto; margin: 0; position: fixed;"
  on:mousedown={handleMouseDown}
  on:touchstart|passive={handleTouchStart}
  on:click|stopPropagation={handleButtonClick}
  aria-label="Toggle background music"
>
  <span class="note">♪</span>
  <span class="label">{$isAudioPlaying ? 'Now Playing' : 'Tap to Play'}</span>
</button>

<!-- Background Music Element -->
<audio bind:this={audioElement} src={selectedTrack} loop preload="auto"></audio>

<style>
  #audio-bar {
    position: fixed;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid var(--gold-light);
    border-radius: 50px;
    padding: 10px 18px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(8px);
    cursor: grab;
    transition: transform 0.2s, background-color 0.2s;
    outline: none;
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none; /* Prevents native gestures on the play button */
  }

  #audio-bar:hover {
    transform: scale(1.04);
  }

  #audio-bar.dragging {
    cursor: grabbing;
    background: rgba(245, 234, 212, 0.95);
    transform: scale(1.05);
  }

  #audio-bar .note {
    font-size: 18px;
    color: var(--text-dark);
    display: inline-block;
  }

  #audio-bar .label {
    font-size: 12px;
    color: var(--text-mid);
    letter-spacing: 0.08em;
    font-weight: 500;
  }

  #audio-bar.playing .note {
    animation: pulse-note 1.4s ease-in-out infinite;
  }
</style>
