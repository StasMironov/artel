import Swiper from 'swiper/swiper-bundle';

export default {
	init() {
		const wrappers = document.querySelectorAll('[data-slider-docs]');
		if (!wrappers.length) return;

		for (let i = 0; i < wrappers.length; i++) {
			const sliderNode = wrappers[i].querySelector('[data-slider]');
			if (!sliderNode) continue;

			const prevEl = wrappers[i].querySelector('[data-nav-arrow-prev]');
			const nextEl = wrappers[i].querySelector('[data-nav-arrow-next]');

			const options = {
				slidesPerView: 1,
				slidesPerGroup: 1,
				navigation: {
					prevEl,
					nextEl,
				},
				speed: 800,
				a11y: false,
				loop: false,
				observer: true,
				observeParents: true,
				simulateTouch: false,
			};

			const swiper = new Swiper(sliderNode, options);
		}
	},
};
