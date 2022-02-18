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
import TextArea from './components/textarea';
import Input from './components/input';
import Strategy from './components/strategy';
import BlockProduct from './components/block-product';
import BlockHistory from './components/block-history';
import Modals from './components/modal';
import ModalAjax from './components/modal/ajax-modal';
import Accordion from './components/accordion';
import Search from './components/search';
import Education from './components/block-education';
import Work from './components/block-work';
import Datepicker from './components/datepicker';

import ModalBase from './components/modal/modal-base';
import Menu from './components/menu';
import select from './components/select';

import {devices} from './utils/breakpoints';

// Api

import server from '../api/mock';
import ChartCanvas from './components/chart-canvas';
import uploadFile from './components/upload-file/upload-file';

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

window.addEventListener('init.uploadFile', () => {
	uploadFile.init();
});

document.addEventListener('DOMContentLoaded', () => {
	libs.init();
	// Components

	Animation.init();
	Header.init();
	//FilterService.init();
	Toggle.init();
	Nav.init();
	InputSearch.init();
	SlideDown.init();
	Sliders.init();
	Submenu.init();
	ScrollTo.init();
	TextArea.init();
	Table.init();
	Modals.init();
	Menu.init();
	select.init();
	ModalAjax.init();
	new ScrollAnimation();
	new Map();
	new MapService();
	new Search();
	new Education();
	new Work();
	validation.init();
	Accordion.init();
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

	new FilterService();
	new BlockProduct();
	new BlockHistory();

	new Datepicker();

	document.body.classList.add('content-loaded');
});

document.addEventListener('DOMContentLoaded', () => {
	window.addEventListener('init.modals', () => {
		new ModalBase({
			init: true,
			id: 'modal-person',
			trigger: 'data-modal-person',
			closeTrigger: 'data-modal-close',
			openClass: 'is-open',
		});

		new ModalBase({
			init: true,
			id: 'modal-career',
			trigger: 'data-modal-career',
			closeTrigger: 'data-modal-close',
			openClass: 'is-open',
		});

		new ModalBase({
			init: true,
			id: 'modal-warning',
			trigger: 'data-modal-warning',
			closeTrigger: 'data-modal-close',
			openClass: 'is-open',
		});
	});

	window.dispatchEvent(new CustomEvent('init.modals'));
	window.dispatchEvent(new CustomEvent('init.uploadFile'));
});

window.addEventListener('reinit', () => {
	window.dispatchEvent(new CustomEvent('init.lazyload'));
	window.dispatchEvent(new CustomEvent('init.validation'));
	window.dispatchEvent(new CustomEvent('init.mask'));
	window.dispatchEvent(new CustomEvent('init.input'));
	window.dispatchEvent(new CustomEvent('init.modals'));
	window.dispatchEvent(new CustomEvent('init.uploadFile'));

	libs.init();
	Animation.init();
	Sliders.init();
	Modals.init();
	ModalAjax.init();
//	select.init();
	Table.init();
	TextArea.init();
	Menu.init();
	select.init();
	new MapService();
	new ScrollAnimation();

	new Datepicker();
});
