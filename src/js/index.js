import './polyfills';
import './utils/scroll';
import './utils/userAgent';

import libs from './libs';

import { devices } from './utils/breakpoints';

window.breakpoints = devices;

window.$ = $;
window.jQuery = $;
window.breakpoints = devices;

document.addEventListener('DOMContentLoaded', () => {
	libs.init();
});

window.addEventListener('reinit', () => {
	window.dispatchEvent(new CustomEvent('init.lazyload'));
	window.dispatchEvent(new CustomEvent('init.validation'));
	window.dispatchEvent(new CustomEvent('init.mask'));
});
