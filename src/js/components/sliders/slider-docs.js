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

			const select = wrappers[i].querySelector(
				'[data-slider-docs-field]'
			);

			const slides = [...swiper.slides];

			if (select && slides.length) {
				const $select = $(select);

				$select.on('change', (e) => {
					const { value } = e.target;

					if (value === 'all') {
						slides.forEach((el) => {
							el.classList.remove('is-hidden');
						});
					} else {
						for (let j = 0; j < slides.length; j++) {
							const year = slides[j].getAttribute('data-year');
							if (year === value) {
								slides[j].classList.remove('is-hidden');
							} else {
								slides[j].classList.add('is-hidden');
							}
						}
					}
				});
			}
		}
	},
};
