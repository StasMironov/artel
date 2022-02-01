import './polyfills';
import './utils/scroll';
import './utils/userAgent';

import libs from './libs';

import Header from './components/header';
import FilterService from './components/filter-service';
import ScrollAnimation from './components/scroll-animation/scroll-animation';
import Toggle from './components/lang-toggle';
import Nav from './components/nav';
import SlideDown from './components/slidedown';
import InputSearch from './components/input-search';
import Sliders from './components/sliders';
import Submenu from './components/submenu';
import Animation from './components/animation';
import Map from './components/map';
import MapService from './components/map-service';
import validation from './components/validation';
import FormHandler from './components/form-handler';
import ScrollTo from './components/scrollto';
import Table from './components/table';
import Input from './components/input';
import Strategy from './components/strategy';
import BlockProduct from './components/block-product';
import BlockHistory from './components/block-history';
import Modals from './components/modal';
import ModalAjax from './components/modal/ajax-modal';

// import ModalWarning from './components/modal/modal-base';
import Menu from './components/menu';
import select from './components/select';

import { devices } from './utils/breakpoints';

// Api

import server from '../api/mock';
import ChartCanvas from "./components/chart-canvas";

if (process.env.API) {
	server.start();
}

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
	FilterService.init();
	Toggle.init();
	Nav.init();
	InputSearch.init();
	SlideDown.init();
	Sliders.init();
	Submenu.init();
	ScrollTo.init();
	Table.init();
	Modals.init();
	Menu.init();
	select.init();
	ModalAjax.init();
	new ScrollAnimation();
	new Map();
	new MapService();
	validation.init();
	// Sticky.init();
	new FormHandler();

	new ChartCanvas();

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

	new BlockProduct();
	new BlockHistory();

	document.body.classList.add('content-loaded');
});

document.addEventListener('DOMContentLoaded', () => {
	// window.addEventListener('init.modals', () => {
	// 	if (document.querySelector('#modal-warning')) {
	// 		new ModalWarning({
	// 			init: true,
	// 			id: 'modal-warning',
	// 			trigger: '[data-modal-warning]',
	// 			closeTrigger: '#modal-warning [data-modal-close]',
	// 			openClass: 'is-open',
	// 		});
	// 	}
	// });

	window.dispatchEvent(new CustomEvent('init.modals'));
});
window.addEventListener('reinit', () => {
	window.dispatchEvent(new CustomEvent('init.lazyload'));
	window.dispatchEvent(new CustomEvent('init.validation'));
	window.dispatchEvent(new CustomEvent('init.mask'));
	window.dispatchEvent(new CustomEvent('init.input'));
	window.dispatchEvent(new CustomEvent('init.modals'));
	libs.init();
	Animation.init();
	Sliders.init();
	Modals.init();
	ModalAjax.init();
	select.init();
	Table.init();
	Menu.init();
	select.init();
	new MapService();

	new ScrollAnimation();
});
