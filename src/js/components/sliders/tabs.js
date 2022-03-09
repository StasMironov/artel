import gsap from 'gsap';
import Slider from './constructor';
import { isDesktop } from '../../utils/breakpoints';
import SmoothScroll from 'smooth-scroll';

export default {
	data: {
		state: 0,
	},
	init() {
		const slider = new Slider({
			init: true,
			wrap: '[data-tabs]:not([data-tabs-timeline])',
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
						const timeline = gsap.timeline({
							paused: true,
						});
						const timelineItem = gsap.timeline({
							paused: true,
						});

						const tabsContainer = this.el.closest(
							'[data-tab-container]'
						);
						if (!tabsContainer) return;

						const tabsWrap = tabsContainer.querySelectorAll(
							'[data-tabs-wrap]'
						);
						const tabs = tabsContainer.querySelectorAll(
							'[data-tab]'
						);

						tabsWrap.forEach((elem, index) => {
							let panes = elem.querySelectorAll(
								'[data-tab-pane]'
							);
							if (!panes || !tabs) return;

							gsap.fromTo(
								panes[0],
								0.5,
								{
									opacity: 0,
									y: 0,
								},
								{
									opacity: 1,
									yPercent: 0,
								}
							);

							tabs.forEach((tab, idx) => {
								tab.addEventListener('click', (e) => {
									e.preventDefault();
									tabs.forEach((tab) => {
										tab.classList.remove('tab--active');
									});
									tab.classList.add('tab--active');
									const id = tab.dataset.tab;
									panes.forEach((pane, index) => {
										pane.classList.remove('is-active');
										pane.classList.remove('animate');
										const paneId = pane.dataset.tabPane;

										if (paneId === id) {
											pane.classList.add('is-active');
											pane.classList.add('animate');

											const items = pane.querySelectorAll(
												'[data-fadein-up]'
											);

											timeline.fromTo(
												pane,
												0.5,
												{
													opacity: 0,
													y: 40,
												},
												{
													opacity: 1,
													y: 0,
												}
											);

											timeline.play();

											if (items.length > 0) {
												timelineItem.fromTo(
													items,
													{
														opacity: 0,
														y: 40,
													},
													{
														stagger: 0.2,
														duration: 0.8,
														opacity: 1,
														y: 0,
													}
												);
												timelineItem.play();
											}
										}
									});
									// this.slideTo(
									// 	+tab.getAttribute('data-tab') - 1,
									// 	800
									// );

									//this.slideTo(idx, 400);
								});
							});
						});

						// const tabsWrap = this.el.closest('[data-tabs-wrap]');
						// if (!tabsWrap) return;
						// const tabs = tabsWrap.querySelectorAll('[data-tab]');
						// const panes = tabsWrap.querySelectorAll(
						// 	'[data-tab-pane]'
						// );
						// if (!panes || !tabs) return;
						// tabs.forEach((tab) => {
						// 	tab.addEventListener('click', (e) => {
						// 		e.preventDefault();
						// 		tabs.forEach((tab) => {
						// 			tab.classList.remove('tab--active');
						// 		});
						// 		tab.classList.add('tab--active');
						// 		const id = tab.dataset.tab;
						// 		panes.forEach((pane) => {
						// 			pane.classList.remove('is-active');
						// 			const paneId = pane.dataset.tabPane;
						// 			if (paneId === id) {
						// 				pane.classList.add('is-active');
						// 			}
						// 		});
						// 		// this.slideTo(
						// 		// 	+tab.getAttribute('data-tab') - 1,
						// 		// 	800
						// 		// );
						// 	});
						// });
					},
					resize() {
						if (isDesktop()) {
							this.wrapperEl.style = '';
						}
					},
				},
			},
		});

		const sliderTimeline = new Slider({
			init: true,
			wrap: '[data-tabs][data-tabs-timeline]',
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
				//spaceBetween: 24,
				observer: true,
				observeParents: true,
				[window.breakpoints.lg]: {
					freeMode: false,
					spaceBetween: 0,
				},
				on: {
					init() {
						const timeline = gsap.timeline({
							paused: true,
						});
						const timelineItem = gsap.timeline({
							paused: true,
						});

						const tabsContainer = this.el.closest(
							'[data-tab-container]'
						);
						if (!tabsContainer) return;

						const tabsWrap = tabsContainer.querySelectorAll(
							'[data-tabs-wrap]'
						);
						const tabs = tabsContainer.querySelectorAll(
							'[data-tab]'
						);

						tabsWrap.forEach((elem, index) => {
							let panes = elem.querySelectorAll(
								'[data-tab-pane]'
							);
							if (!panes || !tabs) return;

							gsap.fromTo(
								panes[0],
								0.5,
								{
									opacity: 0,
									y: 0,
								},
								{
									opacity: 1,
									yPercent: 0,
								}
							);

							tabs.forEach((tab, idx) => {
								tab.addEventListener('click', (e) => {
									e.preventDefault();
									tabs.forEach((tab) => {
										tab.classList.remove('tab--active');
									});
									tab.classList.add('tab--active');
									const id = tab.dataset.tab;
									panes.forEach((pane, index) => {
										pane.classList.remove('is-active');
										pane.classList.remove('animate');
										const paneId = pane.dataset.tabPane;

										if (paneId === id) {
											pane.classList.add('is-active');
											pane.classList.add('animate');

											const items = pane.querySelectorAll(
												'[data-fadein-up]'
											);

											timeline.fromTo(
												pane,
												0.5,
												{
													opacity: 0,
													y: 40,
												},
												{
													opacity: 1,
													y: 0,
												}
											);

											timeline.play();

											if (items.length > 0) {
												timelineItem.fromTo(
													items,
													{
														opacity: 0,
														y: 40,
													},
													{
														stagger: 0.2,
														duration: 0.8,
														opacity: 1,
														y: 0,
													}
												);
												timelineItem.play();
											}
										}
									});
									// this.slideTo(
									// 	+tab.getAttribute('data-tab') - 1,
									// 	800
									// );

									this.slideTo(idx, 400);
								});
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
    
    //скролл до блока
    let scroll = new SmoothScroll('[data-scroll]', {
      speed: 300,
      updateURL: false,
      header: "header",      
    });

    // маркер у активной ссылки
    const tabs = document.querySelectorAll('.tab');
    let lastClicked = tabs[0];

    let logScrollEvent = function (event) {
      //console.log('toggle:', event.detail.toggle);      
      lastClicked.classList.remove('tab--active');
      event.detail.toggle.classList.add("tab--active");     
      lastClicked = event.detail.toggle; 
    };
    
    document.addEventListener('scrollStart', logScrollEvent, false);
	},
};
