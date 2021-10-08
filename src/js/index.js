import './polyfills';
import './utils/scroll';
import './utils/userAgent';

import libs from './libs';

import Header from './components/header';
import Toggle from './components/lang-toggle';
import InputSearch from './components/input-search';

import {devices} from './utils/breakpoints';

window.breakpoints = devices;

window.$ = $;
window.jQuery = $;
window.breakpoints = devices;

document.addEventListener('DOMContentLoaded', () => {
	libs.init();

	// Components
	Header.init();
	Toggle.init();
	InputSearch.init();

	document.body.classList.add('content-loaded');
});

window.addEventListener('reinit', () => {
	window.dispatchEvent(new CustomEvent('init.lazyload'));
	window.dispatchEvent(new CustomEvent('init.validation'));
	window.dispatchEvent(new CustomEvent('init.mask'));
});
