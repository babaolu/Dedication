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
    background: linear-gradient(160deg, #f8f9f8 0%, #f2f5f2 50%, #f5f2f9 100%);
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
  .gallery-card :global(.c1) { background: linear-gradient(135deg, #f8e0c8, #e8c8a0); }
  .gallery-card :global(.c2) { background: linear-gradient(135deg, #e8eef0, #d0dde8); }
  .gallery-card :global(.c3) { background: linear-gradient(135deg, #f0e0d8, #d8c0b0); }
  .gallery-card :global(.c4) { background: linear-gradient(135deg, #eaeef0, #ccd8e4); }
  .gallery-card :global(.c5) { background: linear-gradient(135deg, #fce8d8, #f0d0b0); }
  .gallery-card :global(.c6) { background: linear-gradient(135deg, #eaecf4, #d4d8ee); }

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
