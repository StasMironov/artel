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
				speed: 1300,
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

		const kof =
			(($('.block-history__period .tab').height() / 2) * 100) /
			$('.block-history__period').height();

		
		const lastTab = document.querySelectorAll(".tab");
		lastTab[lastTab.length -1].classList.add('last-tab');

		gsap.to(progress, {
			//value: 100,
			ease: 'none',
			scrollTrigger: { scrub: 0.3 },
		});

		gsap.utils.toArray('[data-tab-pane]').forEach((stage, index) => {
			ScrollTrigger.create({
				id: 'trigger2',
				trigger: stage,
				//start: 'center center',
				start: 'bottom bottom',
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

							slider.slideTo(index);

							if (index == 0) {
								progress.style.height = `${
									Math.ceil(
										self.progress *
											(index * progressNodeHeight)
									) + kof
								}%`;
							} else {
								progress.style.height = `${Math.ceil(
									self.progress *
										(index * progressNodeHeight) +
										kof
								)}%`;
							}
						} else {
							elem.classList.remove('tab--active');
						}
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
									) + kof
								}%`;
								// console.log(index);
							} else {
								progress.style.height = `${
									Math.ceil(
										(index - 1) * progressNodeHeight
									) + kof
								}%`;
							}

							//console.log(index);
						} else {
							elem.classList.remove('tab--active');
							slider.slideTo(index - 1);
						}
					});
				},

				anticipatePin: 1,
				//markers: true,
			});
		});
	}
}
