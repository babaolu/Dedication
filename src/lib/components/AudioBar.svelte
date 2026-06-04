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

  function toggleAudio() {
    if (!audioElement) return;

    if (audioElement.paused) {
      audioElement.play()
        .then(() => {
          audioUnlocked = true;
          isAudioPlaying.set(true);
          // Clean up interaction event listeners if successfully played manually
          ['click', 'touchstart', 'keydown', 'mouseover'].forEach(evt => {
            window.removeEventListener(evt, startAudio);
          });
        })
        .catch(err => console.log('Playback error:', err));
    } else {
      audioElement.pause();
      isAudioPlaying.set(false);
    }
  }

  function startAudio() {
    if (audioUnlocked) return;
    if (!audioElement || !audioElement.paused) return;
    audioElement.volume = 0.45;
    audioElement.play()
      .then(() => {
        audioUnlocked = true;
        isAudioPlaying.set(true);
        // Clean up global listeners once successfully playing
        ['click', 'touchstart', 'keydown', 'mouseover'].forEach(evt => {
          window.removeEventListener(evt, startAudio);
        });
      })
      .catch((err) => {
        // Autoplay or hover play blocked, keep listeners active for click/touch
        isAudioPlaying.set(false);
      });
  }

  onMount(() => {
    // Attempt automatic play on load
    startAudio();

    // Setup global interaction listeners to unlock audio if blocked
    ['click', 'touchstart', 'keydown', 'mouseover'].forEach(evt => {
      window.addEventListener(evt, startAudio, { passive: true });
    });
  });

  onDestroy(() => {
    ['click', 'touchstart', 'keydown', 'mouseover'].forEach(evt => {
      window.removeEventListener(evt, startAudio);
    });
  });
</script>

<!-- Floating Audio Controller -->
<button
  id="audio-bar"
  class:playing={$isAudioPlaying}
  on:click|stopPropagation={toggleAudio}
  aria-label="Toggle background music"
>
  <span class="note">♪</span>
  <span class="label">{$isAudioPlaying ? 'Now Playing' : 'Tap to Play'}</span>
</button>

<!-- Background Music Element -->
<audio bind:this={audioElement} src={selectedTrack} loop></audio>

<style>
  #audio-bar {
    position: fixed;
    bottom: 24px;
    right: 24px;
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
    cursor: pointer;
    transition: transform 0.2s;
    outline: none;
    font-family: inherit;
  }

  #audio-bar:hover {
    transform: scale(1.04);
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
