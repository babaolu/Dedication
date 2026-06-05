<script>
  const galleryItems = [
    { emoji: '👨‍👩‍👦', img: 'photo-1.jpg', class: 'c1' },
    { emoji: '🤱', img: 'photo-2.jpg', class: 'c2' },
    { emoji: '👶', img: 'photo-3.jpg', class: 'c3' },
    { emoji: '🙏', img: 'photo-4.jpg', class: 'c4' },
    { emoji: '💛', img: 'photo-5.jpg', class: 'c5' },
    { emoji: '🌿', img: 'photo-6.jpg', class: 'c6' }
  ];

  let imageErrors = {};

  function handleImageError(idx) {
    imageErrors = { ...imageErrors, [idx]: true };
  }
</script>

<section class="scroll-section" id="s-gallery">
  <div class="gallery-label">✦ Moments ✦</div>
  <h2 class="gallery-heading">A Life, Captured in Light</h2>
  
  <div class="gallery-grid">
    {#each galleryItems as item, i}
      <div class="gallery-card">
        <div class={item.class}>
          {#if !imageErrors[i]}
            <img
              src={`/images/gallery/${item.img}`}
              alt="Enoch's life captured"
              on:error={() => handleImageError(i)}
              class="gallery-img"
            />
          {/if}
          <span class="emoji-placeholder" style={!imageErrors[i] ? 'display: none;' : ''}>{item.emoji}</span>
        </div>
      </div>
    {/each}
  </div>
  
  <p class="gallery-hint">Replace these placeholders with Enoch's real photos</p>
</section>

<style>
  #s-gallery {
    background: linear-gradient(160deg, #f0f7fa 0%, #eaf4f0 50%, #eaf2f6 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
    text-align: center;
    min-height: 100vh;
  }

  .gallery-label {
    font-size: 12.5px;
    letter-spacing: .35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 14px;
  }

  .gallery-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 4.5vw, 46px);
    font-weight: 300;
    color: var(--text-dark);
    margin-bottom: 32px;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    max-width: 800px;
    width: 100%;
  }

  .gallery-card {
    aspect-ratio: 3/4;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  .gallery-card div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    transition: transform 0.4s;
    position: relative;
  }

  .gallery-card:hover div {
    transform: scale(1.06);
  }

  .gallery-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    inset: 0;
    z-index: 2;
  }

  .emoji-placeholder {
    position: absolute;
    z-index: 1;
  }

  /* Specific Gradient Layouts matching original classes */
  .gallery-card :global(.c1) { background: linear-gradient(135deg, #c8dce8, #a8c4d4); }
  .gallery-card :global(.c2) { background: linear-gradient(135deg, #c4d8d0, #a4c0b8); }
  .gallery-card :global(.c3) { background: linear-gradient(135deg, #d4e4ec, #b4ccd8); }
  .gallery-card :global(.c4) { background: linear-gradient(135deg, #ccdce4, #aac8d4); }
  .gallery-card :global(.c5) { background: linear-gradient(135deg, #d0e8e4, #b0d0cc); }
  .gallery-card :global(.c6) { background: linear-gradient(135deg, #c8d8e8, #a8c0d8); }

  .gallery-hint {
    margin-top: 20px;
    font-size: 12px;
    color: var(--text-light);
    letter-spacing: .1em;
  }

  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
