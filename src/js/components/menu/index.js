import gsap from 'gsap';
import { throttle } from 'throttle-debounce';
import PerfectScrollbar from 'perfect-scrollbar';
import { debounce } from 'throttle-debounce';
import { isDesktop } from '../../utils/breakpoints';

export default {
	init() {
		const menuNode = document.querySelector('[data-menu]');
		if (!menuNode) return;

		const triggers = menuNode.querySelectorAll('[data-trigger]');
		if (!triggers.length) return;

		const submenu = menuNode.querySelectorAll('[data-submenu]');
		if (!triggers.length) return;

		const backBtn = menuNode.querySelectorAll('[data-back]');
		if (!backBtn.length) return;

		const burger = document.querySelector('[data-menu-burger]');
		if (!burger) return;

		const parentNode = document.querySelector('body');
		if (!parentNode) return;

		const wrapNode = document.querySelector('[data-content]');
		if (!wrapNode) return;

		const ps = new PerfectScrollbar(wrapNode, {
			suppressScrollX: true,
			wheelPropagation: false,
			minScrollbarLength: 140, // исправляет бесконечную прокрутку и баг с большим количеством элементов
		});

		let state = false;
		let psSub;

		const timelineTrigger = gsap.fromTo(
			triggers,
			{
				opacity: 0,
			},
			{
				stagger: {
					each: 0.05,
				},
				className: '+=menu__item active',
				opacity: 1,
				duration: 0.12,
				ease: 'power1.out',
				paused: true,
			}
		);

		burger.addEventListener(
			'click',
			throttle(100, () => {
				burger.classList.add('active');
				burger.classList.remove('not-active');
				menuNode.classList.toggle('is-active');
				state = false;

				if (menuNode.classList.contains('is-active')) {
					window._disableScroll();
					timelineTrigger.play().delay(0.3);
					parentNode.classList.add('is-open');
				} else {
					window._enableScroll();
					burger.classList.remove('active');
					burger.classList.add('not-active');
					submenu.forEach((subMenu, idx) => {
						subMenu.classList.remove('is-active');
					});

					timelineTrigger.reverse().delay(0);
					parentNode.classList.remove('is-open');
				}
			})
		);

		triggers.forEach((trigger, index) => {
			trigger.addEventListener(
				'click',
				throttle(100, (event) => {
					event.stopPropagation();
					submenu.forEach((subMenu, idx) => {
						if (index === idx) {
							subMenu.classList.add('is-active');

							const wrapSubNode = subMenu.querySelector(
								'[data-sub-wrap]'
							);

							psSub = new PerfectScrollbar(wrapSubNode, {
								suppressScrollX: true,
								wheelPropagation: false,
								minScrollbarLength: 140, // исправляет бесконечную прокрутку и баг с большим количеством элементов
							});

							wrapSubNode.scrollTop = 0;

							if (!wrapSubNode) {
								try {
								} catch (err) {
									console.log(err);
								}
							}

							const subItems = subMenu.querySelectorAll(
								'[data-sub-item]'
							);

							const tlSubItems = gsap.fromTo(
								subItems,
								{
									translateY: 20,
									opacity: 0,
								},
								{
									stagger: 0.05,
									translateY: 0,
									opacity: 1,
									duration: 0.12,
									ease: 'power1.out',
									paused: true,
								}
							);

							if (!state) {
								tlSubItems.play().delay(0.3);
							} else {
								tlSubItems.seek(100);
							}
							state = true;
							psSub.update();
						}
					});
				})
			);
		});

		backBtn.forEach((btn, index) => {
			btn.addEventListener('click', function (event) {
				event.stopPropagation();
				const parentNode = $(this).closest('[data-submenu]');
				if (!parentNode) return;
				$(parentNode).removeClass('is-active');
				state = false;
				wrapNode.scrollTop = 0;
			});
		});

		function resetState() {
			menuNode.classList.remove('is-active');
			burger.classList.remove('active');
			burger.classList.add('not-active');
			submenu.forEach((subMenu, idx) => {
				subMenu.classList.remove('is-active');
			});
			timelineTrigger.reverse().delay(0);
		}

		window.addEventListener(
			'resize',
			debounce(100, () => {
				if (psSub) {
					psSub.update();
				}
				if (isDesktop()) {
					parentNode.classList.remove('is-open');
					window._enableScroll();
				} else if (!isDesktop()) {
					resetState();
					parentNode.classList.remove('is-open');
				}
			})
		);
	},
};
