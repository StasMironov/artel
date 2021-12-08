import { isDesktop } from '../../utils/breakpoints';
import Slider from './constructor';

if (document.querySelector('[data-slider-press-wrap]')) {
	const pagSlide = new Slider({
		init: true,
		wrap: '[data-slider-press-wrap]',
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
					spaceBetween: 14,
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

	const sliderPress = new Slider({
		init: true,
		wrap: '[data-slider-press-wrap]',
		slider: '[data-slider-press]',
		prev: '[data-nav-arrow-prev]',
		next: '[data-nav-arrow-next]',
		initialSlide: 0,
		options: {
			allowTouchMove: true,
			speed: 1300,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			//centerInsufficientSlides: true,
			slideToClickedSlide: true,
			//touchRatio: false,
			fadeEffect: { crossFade: true },
			effect: 'fade',
			loop: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'swiper-lazy',
			},
			autoHeight: false,

			thumbs: {
				swiper: pagSlide.swiper,
			},
		},
	});
	sliderPress.update();
	pagSlide.update();
}
