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
		if (this.supportsTouch && $(window).width() < 1024) return;

		const pinSidebar = this.nodes[0].querySelector('[data-pin-aside]');
		const progress = this.nodes[0].querySelector('[data-progress]');
		const dataTabs = this.nodes[0].querySelectorAll('[data-tab]');

		let isVertical = true,
			direction = 'vertical';

		let slider = initSwiper(direction);

		function initSwiper(direction) {
			return new Swiper('.block-history [data-slider]', {
				spaceBetween: 0,
				direction: direction,
				slidesPerView: 4,
				touchRatio: false,
				breakpoints: {
					320: {
						slidesPerView: 'auto',
					},
					1023: {
						slidesPerView: 4,
					},
				},
			});
		}

		const ST = ScrollTrigger.create({
			trigger: this.nodes[0],
			start: 'top top',
			end: 'bottom bottom',
			//onUpdate: getCurrentSection,
			pin: pinSidebar,
			onUpdate(self) {
				progress.style.height = `${Math.ceil(self.progress * 100)}%`;
			},
		});

		$(window)
			.on('resize', () => {
				if ($(window).width() > 1023) {
					slider.update();
				}
			})
			.resize();

		gsap.to(progress, {
			value: 100,
			ease: 'none',
			scrollTrigger: { scrub: 0.3 },
		});

		gsap.utils.toArray('[data-tab-pane]').forEach((stage, index) => {
			ScrollTrigger.create({
				trigger: stage,
				start: 'center center',
				end: 'center center',
				onEnter: () => {
					let dataPane = stage.getAttribute('data-tab-pane');
					dataTabs.forEach((elem) => {
						if (elem.getAttribute('data-tab') == dataPane) {
							elem.classList.add('tab--active');
							slider.slideTo(index);
						} else {
							elem.classList.remove('tab--active');
						}
					});
				},
				onEnterBack: () => {
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
