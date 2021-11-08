import {isDesktop} from '../../utils/breakpoints';
import Slider from './constructor';

const sliderLogos = new Slider({
	init: true,
	wrap: '[data-slider-logos-wrap]',
	slider: '[data-slider-logos]',
	prev: '[data-nav-arrow-prev]',
	next: '[data-nav-arrow-next]',
	options: {
		slidesPerView: 'auto',
		allowTouchMove: true,
		speed: 300,
		watchSlidesVisibility: true,
		lazy: {
			loadPrevNext: true,
			elementClass: 'swiper-lazy',
		},
		on: {
			init() {
				if (
					!!this.slides &&
					!!this.visibleSlidesIndexes &&
					this.slides.length <= this.visibleSlidesIndexes.length
				) {
					this.wrapperEl
						.closest('[data-slider-logos-wrap]')
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
						.closest('[data-slider-logos-wrap]')
						.classList.add('nav-hidden');
					if (isDesktop()) {
						this.wrapperEl.style = '';
					}
				} else {
					this.wrapperEl
						.closest('[data-slider-logos-wrap]')
						.classList.remove('nav-hidden');
					this.slideTo(0);
				}
			},
		},
	},
});
