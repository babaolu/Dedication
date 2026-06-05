import { mount } from 'svelte';

// Import our custom style system
import './styles/typography.css';
import './styles/global.css';
import './styles/cards.css';
import './styles/animations.css';

import App from './App.svelte';

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
