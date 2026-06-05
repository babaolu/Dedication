<section class="scroll-section" id="s-venue">
  <div class="venue-card">
    <div class="venue-ribbon"></div>

    <div class="venue-top">
      <span class="venue-icon">🕊️</span>
      <h2 class="venue-heading">You're Invited</h2>
      <p class="venue-tagline">A Special Celebration of Life</p>
    </div>

    <div class="venue-divider"></div>

    <div class="venue-details">
      <div class="venue-row">
        <span class="venue-row-icon">📅</span>
        <div>
          <div class="venue-row-label">Date & Time</div>
          <div class="venue-row-value">Sunday, July 5th, 2026 — 11:00am</div>
        </div>
      </div>

      <div class="venue-row">
        <span class="venue-row-icon">📍</span>
        <div>
          <div class="venue-row-label">Venue</div>
          <div class="venue-row-value">RCCG, Livingston Assembly<br>EH54 6LT</div>
        </div>
      </div>

      <div class="venue-row">
        <span class="venue-row-icon">👗</span>
        <div>
          <div class="venue-row-label">Dress Code</div>
          <div class="venue-row-value">Dress like an African<br><em>a touch of teal blue</em></div>
        </div>
      </div>
    </div>

    <div class="venue-divider"></div>

    <div class="venue-reception">
      <span class="reception-icon">🎉</span>
      <p>Reception follows immediately afterwards at<br>
      <strong>Harburn Village Hall, West Calder, EH55 8RF</strong></p>
    </div>

    <div class="venue-ribbon bottom"></div>
  </div>
</section>

<style>
  #s-venue {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(160deg, #f0f7fa 0%, #e8f3f8 50%, #eaf4f0 100%);
    padding: clamp(40px, 8vh, 80px) 24px;
    position: relative;
  }

  .venue-card {
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid #b4cdd4;
    border-radius: 16px;
    max-width: 560px;
    width: 100%;
    padding: clamp(32px, 5vw, 60px);
    text-align: center;
    box-shadow: 0 20px 60px rgba(90, 128, 144, 0.12);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);
  }

  /* Decorative teal ribbon strips top and bottom */
  .venue-ribbon {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #b4cdd4, #7a9aaa, #a8c0b0, #b4cdd4);
  }

  .venue-ribbon.bottom {
    top: auto;
    bottom: 0;
  }

  .venue-top {
    margin-bottom: 24px;
  }

  .venue-icon {
    font-size: 32px;
    display: block;
    margin-bottom: 12px;
    opacity: 0.7;
  }

  .venue-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(32px, 6vw, 52px);
    font-weight: 300;
    font-style: italic;
    color: var(--text-dark);
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .venue-tagline {
    font-size: clamp(12px, 1.6vw, 15px);
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .venue-divider {
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
    margin: 24px auto;
  }

  .venue-details {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
  }

  .venue-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }

  .venue-row-icon {
    font-size: 22px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .venue-row-label {
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 4px;
  }

  .venue-row-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(17px, 2.5vw, 22px);
    font-weight: 400;
    color: var(--text-dark);
    line-height: 1.5;
  }

  .venue-row-value em {
    font-style: italic;
    color: var(--gold);
  }

  .venue-reception {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .reception-icon {
    font-size: 20px;
  }

  .venue-reception p {
    font-size: clamp(13px, 1.8vw, 16px);
    color: var(--text-mid);
    line-height: 1.7;
    text-align: center;
  }

  .venue-reception strong {
    color: var(--text-dark);
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .venue-card {
      padding: 28px 20px;
    }
  }
</style>
