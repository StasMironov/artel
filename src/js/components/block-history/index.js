import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Swiper from 'swiper/swiper-bundle';

gsap.registerPlugin(ScrollTrigger);

export default class blockProduct {
	constructor() {
		this.supportsTouch = 'ontouchstart' in document.documentElement;
		this.nodes = document.querySelectorAll('[data-history-wrap]');
		if (this.nodes && this.nodes.length > 0) {
			this.nodes.forEach((node) => {
				this.render(node);
			});
		}
	}

	render(node) {
		const pinSidebar = this.nodes[0].querySelector('[data-pin-aside]');
		const progress = this.nodes[0].querySelector('[data-progress]');
		const dataTabs = this.nodes[0].querySelectorAll('[data-tab]');

		let isVertical = true,
			direction = 'vertical';

		let autoPlayDelay = 1500;

		let slider = initSwiper(direction);

		function initSwiper(direction) {
			return new Swiper('.block-history [data-slider]', {
				spaceBetween: 0,
				direction: direction,
				slidesPerView: 4,
				touchRatio: false,
				watchSlidesProgress: true,
				watchSlidesVisibility: true,
				observer: true,
				observeParents: true,
				// pagination: {
				// 	el: '.swiper-pagination',
				// 	type: 'progressbar',
				// },
				breakpoints: {
					320: {
						slidesPerView: 'auto',
					},
					1024: {
						slidesPerView: 4,
					},
				},
			});
		}

		const progressNodeHeight =
			($('.block-history__period .tabs__item').height() * 100) /
			$('.block-history__period').height();

		//console.log(progressNodeHeight);

		//console.log(ST);

		gsap.to(progress, {
			//value: 100,
			ease: 'none',
			scrollTrigger: { scrub: 0.3 },
		});

		gsap.utils.toArray('[data-tab-pane]').forEach((stage, index) => {
			ScrollTrigger.create({
				id: 'trigger2',
				trigger: stage,
				start: 'center center',
				end: 'center center',
				onUpdate(self) {
					// console.log(index * 10);
					// console.log(`${self.progress * 100}%`);
				},
				onEnter: (self) => {
					let dataPane = stage.getAttribute('data-tab-pane');

					dataTabs.forEach((elem) => {
						if (elem.getAttribute('data-tab') == dataPane) {
							elem.classList.add('tab--active');
							// progress.style.height =
							// 	progress.style.height - 4 + '%';

							slider.slideTo(index);

							if (index == 0) {
								progress.style.height = `${
									Math.ceil(
										self.progress *
											(index * progressNodeHeight)
									) + 9
								}%`;
							} else {
								progress.style.height = `${
									Math.ceil(
										self.progress *
											(index * progressNodeHeight)
									) + 5.5
								}%`;
							}

							//console.log(progress.style.height);
						} else {
							elem.classList.remove('tab--active');
						}
						// +
						// index * 1.25
					});
				},
				onEnterBack: (self) => {
					let elemCurrent;
					if (index !== 0) {
						elemCurrent = gsap.utils.toArray('[data-tab-pane]')[
							index - 1
						];
					} else {
						elemCurrent = stage;
					}

					let dataPane = elemCurrent.getAttribute('data-tab-pane');
					dataTabs.forEach((elem) => {
						if (elem.getAttribute('data-tab') == dataPane) {
							elem.classList.add('tab--active');
							slider.slideTo(index - 1);

							if (index == 1) {
								progress.style.height = `${
									Math.ceil(
										self.progress *
											(index * progressNodeHeight)
									) + 7.5
								}%`;
								console.log(index);
							} else {
								progress.style.height = `${
									Math.ceil(
										(index - 1) * progressNodeHeight
									) + 5.5
								}%`;
							}

							//console.log(index);
						} else {
							elem.classList.remove('tab--active');
							slider.slideTo(index - 1);
							// progress.style.height = `${
							// 	Math.ceil(index * progressNodeHeight) + 5.5
							// }%`;
							// console.log(
							// 	Math.ceil(index * progressNodeHeight) + 5.5
							// );
						}
					});
				},

				anticipatePin: 1,
				//markers: true,
			});
		});

		// let ST = gsap.timeline({
		// 	scrollTrigger: {
		// 		id: 'trigger1',
		// 		trigger: this.nodes[0],
		// 		start: 'top top',
		// 		end: 'bottom bottom',
		// 		//onUpdate: getCurrentSection,
		// 		//pin: pinSidebar,

		// 		//	markers: true,
		// 	},
		// });

		//	ST.play();

		// $(window)
		// 	.on('resize', () => {
		// 		if ($(window).width() < 1024) {
		// 			if (typeof ST !== 'undefined') {
		// 				ST.pause(0).kill(true);
		// 				ScrollTrigger.getById('trigger1').kill(true);
		// 				// ScrollTrigger.querySelector(
		// 				// 	'.block-history__aside'
		// 				// ).kill(true);
		// 				gsap.set('.block-history__aside', { clearProps: true });
		// 				gsap.set(pinSidebar, { clearProps: true });
		// 			}
		// 			return false;

		// 			// console.log(ST);
		// 		} else {
		// 			ST = gsap.timeline({
		// 				scrollTrigger: {
		// 					id: 'trigger1',
		// 					trigger: this.nodes[0],
		// 					start: 'top top',
		// 					end: 'bottom bottom',
		// 					//onUpdate: getCurrentSection,
		// 					pin: pinSidebar,

		// 					//	markers: true,
		// 				},
		// 			});
		// 		}
		// 	})
		// 	.resize();
	}
}
