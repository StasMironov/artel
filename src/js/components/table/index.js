import ScrollBooster from 'scrollbooster';

export default {
	init() {
		console.log(document.querySelector('[data-table-viewport]'));
		new ScrollBooster({
			viewport: document.querySelector('[data-table-viewport]'),
			content: document.querySelector('[data-table-content]'),
			scrollMode: 'native',
			emulateScroll: true, // scroll on wheel events
		});
	},
};
