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
import Map from './components/map';
import Sticky from './components/sticky';
<<<<<<< HEAD
import validation from './components/validation';
import FormHandler from './components/form-handler';
import ScrollTo from './components/scrollto';
import Input from './components/input';
=======
import Strategy from './components/strategy';
>>>>>>> ARTELDEV-90

import { devices } from './utils/breakpoints';

window.breakpoints = devices;
__webpack_public_path__ = window.__webpack_public_path__ || '';

window.$ = $;
window.jQuery = $;
window.breakpoints = devices;

const inputs = new Input();
window.addEventListener('init.input', () => {
	inputs.render();
});

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
	ScrollTo.init();

	new Map();
	validation.init();
	//Sticky.init();
	new FormHandler();
	// Sticky.init();

	const strategyContainers = document.querySelectorAll(
		'[data-strategy-container]'
	);
	const strategyList = [];
	if (strategyContainers.length) {
		strategyContainers.forEach((strategyContainer) => {
			strategyList.push(
				new Strategy({
					wrap: strategyContainer,
				})
			);
		});
	}

	document.body.classList.add('content-loaded');
});

window.addEventListener('reinit', () => {
	window.dispatchEvent(new CustomEvent('init.lazyload'));
	window.dispatchEvent(new CustomEvent('init.validation'));
	window.dispatchEvent(new CustomEvent('init.mask'));
	window.dispatchEvent(new CustomEvent('init.input'));
});
