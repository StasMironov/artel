import { isDesktop } from '../../utils/breakpoints';
import Slider from './constructor';
if (document.querySelector('[data-slider-photo-wrap]')) {
	try {
		const pagSlide = new Slider({
			init: true,
			wrap: '[data-slider-photo-wrap]',
			slider: '[data-pag]',
			options: {
				slidesPerView: 5,
				spaceBetween: 20,
				touchRatio: false,
				//loop: true,
				slideToClickedSlide: true,
				touchRatio: 0.2,
				breakpoints: {
					359: {
						spaceBetween: 16,
						slidesPerView: 3,
					},
					641: {
						slidesPerView: 5,
					},
					769: {
						spaceBetween: 20,
					},
				},
				on: {
					init() {
						if (this.slides.length >= 5) {
							document
								.querySelector('[data-pag]')
								.classList.add('overlay');
						}
					},
				},
			},
		});

		const sliderPhoto = new Slider({
			init: true,
			wrap: '[data-slider-photo-wrap]',
			slider: '[data-slider-photo]',
			prev: '[data-nav-arrow-prev]',
			next: '[data-nav-arrow-next]',
			options: {
				slidesPerView: 'auto',
				allowTouchMove: true,
				speed: 1300,
				watchSlidesVisibility: true,
				loop: true,
				fadeEffect: { crossFade: true },
				effect: 'fade',
				lazy: {
					loadPrevNext: true,
					elementClass: 'swiper-lazy',
				},
				autoHeight: false,
				breakpoints: {
					768: {
						autoHeight: false,
					},
				},
				thumbs: {
					swiper: pagSlide.swiper,
				},
				on: {
					init() {
						if (
							!!this.slides &&
							!!this.visibleSlidesIndexes &&
							this.slides.length <=
								this.visibleSlidesIndexes.length
						) {
							this.wrapperEl
								.closest('[data-slider-photo-wrap]')
								.classList.add('nav-hidden');
						}
					},
					resize() {
						if (
							!!this.slides &&
							!!this.visibleSlidesIndexes &&
							this.slides.length <=
								this.visibleSlidesIndexes.length
						) {
							this.wrapperEl
								.closest('[data-slider-photo-wrap]')
								.classList.add('nav-hidden');
						} else {
							this.wrapperEl
								.closest('[data-slider-photo-wrap]')
								.classList.remove('nav-hidden');
							this.slideTo(0);
						}
					},
				},
			},
		});
		sliderPhoto.update();
		pagSlide.update();
	} catch (err) {
		console.log(err);
	}
}
