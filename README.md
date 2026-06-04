# Enoch's Dedication — Svelte + Vite Migration

A beautifully structured, highly responsive, interactive web application celebrating the dedication of Enoch Oladepo. This project has been migrated from a single-file HTML layout to a modular, performance-oriented **Svelte 5 + Vite** application.

---

## 🚀 How to Run Locally

Follow these quick steps to get the development server running:

1. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed, then run the following in your terminal:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   Launch the live reloading server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the address shown in your terminal (typically `http://localhost:5173`).

3. **Production Build**:
   Compile and optimize the project for production:
   ```bash
   npm run build
   ```
   To preview the built assets:
   ```bash
   npm run preview
   ```

---

## 📸 Placing Your Photos

All chapter and gallery slide shows support actual photo assets. 

If any photo is missing, the application automatically falls back to beautiful, handcrafted CSS gradients and emoji icons, so **the presentation remains elegant even before photos are added**.

Drop your photo files in the following folders:

| Location | Path | Expected Filenames |
| :--- | :--- | :--- |
| **Chapter 1** | `public/images/chapter1/` | `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg` |
| **Chapter 2** | `public/images/chapter2/` | `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg` |
| **Chapter 3** | `public/images/chapter3/` | `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg` |
| **Chapter 4** | `public/images/chapter4/` | `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg` |
| **Gallery Grid** | `public/images/gallery/` | `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg`, `photo-4.jpg`, `photo-5.jpg`, `photo-6.jpg` |

> [!NOTE]
> Ensure files are saved with `.jpg` extension (lowercase) and correspond exactly to the filenames in the table above.

---

## 🎵 Placing the Music Files

The background music player randomly selects one of 4 gratitude-themed audio tracks when the page loads/reloads, which persists continuously across slide transitions. It attempts autoplay on page load and handles restricted browser permissions gracefully by unlocking on the first user interaction (click, keydown, or touch).

- **Path**: `public/music/`
- **Supported Audio Tracks**:
  1. `Anendlessocean_-_Gratitude_CeeNaija.com_.mp3`
  2. `Brandon_Lake_-_Gratitude_CeeNaija.com_.mp3`
  3. `Mile-Twelve-Gratitude-Kate-Serban-Bethel-Music-(CeeNaija.com).mp3`
  4. `Victoria_Orenze_-_Gratitude_CeeNaija.com_.mp3`

> [!TIP]
> The selected track will loop seamlessly and persist without interruption as you navigate through the chapters. Refreshing the browser will randomly load and cycle to another one of the 4 tracks.

---

## ⏳ Changing the Countdown Target Date

The high-contrast boxed countdown overlay targets a specific date and updates live in seconds. It persists cleanly through card animations, appearing as a fixed overlay when viewing the closing section.

To adjust the target date:
1. Open the file `src/lib/components/Countdown.svelte`.
2. Locate the `TARGET_DATE` constant at the top of the script tag:
   ```javascript
   const TARGET_DATE = '2026-07-15T11:00:00+01:00'; // BST timezone (GMT+1)
   ```
3. Change the date string to your desired target date and save. The countdown is fully ISO 8601 compliant and supports custom offsets (like `+01:00` for BST or `Z` for UTC).

---

## 🛠️ Project Structure

The project has been refactored into the following clean architecture:

```text
enoch-dedication/
├── public/
│   ├── music/               ← Place background.mp3 here
│   └── images/              ← Place chapter photos here (organized by folder)
├── src/
│   ├── lib/
│   │   ├── sections/        ← Individual card/slide components
│   │   │   ├── Hero.svelte
│   │   │   ├── Chapter1.svelte
│   │   │   ├── Chapter2.svelte
│   │   │   ├── Chapter3.svelte
│   │   │   ├── Interlude.svelte
│   │   │   ├── Chapter4.svelte
│   │   │   ├── Gallery.svelte
│   │   │   └── Closing.svelte
│   │   ├── components/      ← Floating overlays and media controls
│   │   │   ├── ImagePanel.svelte
│   │   │   ├── AudioBar.svelte
│   │   │   ├── NavDots.svelte
│   │   │   ├── ProgressBar.svelte
│   │   │   ├── Countdown.svelte
│   │   │   └── TapHint.svelte
│   │   ├── transitions.js   ← Extract of all 50 canvas-free slide transitions
│   │   └── cardEngine.js    ← Event dispatchers, mousewheel, keys, and auto timers
│   ├── styles/              ← Unified styling token files
│   │   ├── global.css
│   │   ├── cards.css
│   │   └── typography.css
│   ├── App.svelte           ← Main application orchestrator
│   └── main.js              ← Application mount point
├── index.html               ← Minimal Vite root template
├── package.json
└── vite.config.js
```
