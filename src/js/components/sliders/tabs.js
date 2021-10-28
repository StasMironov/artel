import Slider from './constructor';
import { isDesktop } from '../../utils/breakpoints';

export default {
	init() {
		const slider = new Slider({
			init: true,
			wrap: '[data-tabs]',
			slider: '[data-slider]',
			options: {
				slidesPerView: 'auto',
				speed: 400,
				a11y: false,
				freeMode: {
					enabled: true,
					sticky: false,
				},
				simulateTouch: false,
				resistance: true,
				resistanceRatio: 0,
				spaceBetween: 24,
				observer: true,
				observeParents: true,
				[window.breakpoints.lg]: {
					freeMode: false,
					spaceBetween: 0,
				},
				on: {
					init() {
						const tabsWrap = this.el.closest('[data-tabs-wrap]');
						if (!tabsWrap) return;
						const tabs = tabsWrap.querySelectorAll('[data-tab]');
						const panes = tabsWrap.querySelectorAll(
							'[data-tab-pane]'
						);
						if (!panes || !tabs) return;
						tabs.forEach((tab) => {
							tab.addEventListener('click', (e) => {
								e.preventDefault();
								tabs.forEach((tab) => {
									tab.classList.remove('tab--active');
								});
								tab.classList.add('tab--active');
								const id = tab.dataset.tab;
								panes.forEach((pane) => {
									pane.classList.remove('is-active');
									const paneId = pane.dataset.tabPane;
									if (paneId === id) {
										pane.classList.add('is-active');
									}
								});
								// this.slideTo(
								// 	+tab.getAttribute('data-tab') - 1,
								// 	800
								// );
							});
						});
					},
					resize() {
						if (isDesktop()) {
							this.wrapperEl.style = '';
						}
					},
				},
			},
		});
	},
};
