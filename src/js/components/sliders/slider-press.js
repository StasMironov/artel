import { isDesktop } from '../../utils/breakpoints';
import Slider from './constructor';

const sliderLogos = new Slider({
	init: true,
	wrap: '[data-slider-press-wrap]',
	slider: '[data-slider-press]',
	prev: '[data-nav-arrow-prev]',
	next: '[data-nav-arrow-next]',
	options: {
		slidesPerView: 'auto',
		allowTouchMove: true,
		speed: 1300,
		watchSlidesVisibility: true,
		//loop: true,
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
		pagination: {
			el: '[data-pag]',
			clickable: true,
			renderBullet: function (index, className) {
				return (
					'<span class="' +
					className +
					'">0' +
					(index + 1) +
					'</span>'
				);
			},
		},
		on: {
			init() {
				if (
					!!this.slides &&
					!!this.visibleSlidesIndexes &&
					this.slides.length <= this.visibleSlidesIndexes.length
				) {
					this.wrapperEl
						.closest('[data-slider-press-wrap]')
						.classList.add('nav-hidden');
				}
			},
			resize() {
				if (
					!!this.slides &&
					!!this.visibleSlidesIndexes &&
					this.slides.length <= this.visibleSlidesIndexes.length
				) {
					this.wrapperEl
						.closest('[data-slider-press-wrap]')
						.classList.add('nav-hidden');
				} else {
					this.wrapperEl
						.closest('[data-slider-press-wrap]')
						.classList.remove('nav-hidden');
					this.slideTo(0);
				}
			},
		},
	},
});
