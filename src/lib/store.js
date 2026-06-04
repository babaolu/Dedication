import { writable } from 'svelte/store';

export const currentSection = writable(0);
export const targetSection = writable(0);
export const isAudioPlaying = writable(false);
export const totalSections = writable(8); // Hero, Ch1, Ch2, Ch3, Interlude, Ch4, Gallery, Closing
export const isTransitioning = writable(false);
export const navigationGoTo = writable(null);

