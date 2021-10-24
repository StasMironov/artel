import './polyfills';
import './utils/scroll';
import './utils/userAgent';

import libs from './libs';

import Header from './components/header';
import Toggle from './components/lang-toggle';
import SlideDown from './components/slidedown';
import InputSearch from './components/input-search';
import Sliders from './components/sliders';
import Submenu from './components/submenu';
import Animation from './components/animation';
import Sticky from './components/sticky';

import { devices } from './utils/breakpoints';

window.breakpoints = devices;

window.$ = $;
window.jQuery = $;
window.breakpoints = devices;

document.addEventListener('DOMContentLoaded', () => {
	libs.init();

	// Components
	Animation.init();
	Header.init();
	Toggle.init();
	InputSearch.init();
	SlideDown.init();
	Sliders.init();
	Submenu.init();
	//Sticky.init();

	document.body.classList.add('content-loaded');
});

window.addEventListener('reinit', () => {
	window.dispatchEvent(new CustomEvent('init.lazyload'));
	window.dispatchEvent(new CustomEvent('init.validation'));
	window.dispatchEvent(new CustomEvent('init.mask'));
});
