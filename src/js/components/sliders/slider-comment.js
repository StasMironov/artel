import gsap from 'gsap';
import Slider from './constructor';
import Swiper from 'swiper/swiper-bundle';
export default {
	init() {
		if (document.querySelector('[data-slider-comment-wrap]')) {
			let slidersWrapNode = document.querySelectorAll(
				'[data-slider-comment-wrap]'
			);

			slidersWrapNode.forEach((slider) => {
				let sliderWrap = slider.querySelector('[data-slider-comment]');
				let sliderPag = slider.querySelector('[data-pag]');
				let prev = slider.querySelector('[data-nav-arrow-prev]');
				let next = slider.querySelector('[data-nav-arrow-next]');
				let progress = slider.querySelector('[data-slider-progress]');

				const pagSlide = new Swiper(sliderPag, {
					slidesPerView: 8,
					spaceBetween: 10,
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
							spaceBetween: 13,
							slidesPerView: 3,
						},
						769: {
							spaceBetween: 10,
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
						touchEnd() {
							const lastSlide = this.slides[
								this.slides.length - 1
							];
							if (
								$(lastSlide).hasClass(
									'swiper-slide-thumb-active'
								)
							) {
								document
									.querySelector('[data-pag]')
									.classList.remove('overlay');
							} else {
								document
									.querySelector('[data-pag]')
									.classList.add('overlay');
							}
						},
					},
				});

				let sliderComment = new Swiper(sliderWrap, {
					allowTouchMove: true,
					speed: 500,
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					slideToClickedSlide: true,
					fadeEffect: { crossFade: true },
					effect: 'fade',
					loop: true,
					lazy: {
						loadPrevNext: true,
						elementClass: 'swiper-lazy',
					},
					autoplay: {
						delay: 5000,
						disableOnInteraction: false,
					},
					autoHeight: false,
					navigation: {
						nextEl: next,
						prevEl: prev,
					},

					thumbs: {
						swiper: pagSlide,
					},
					on: {
						slideChangeTransitionStart() {
							const lastSlide =
								pagSlide.slides[pagSlide.slides.length - 1];
							if (
								$(lastSlide).hasClass(
									'swiper-slide-thumb-active'
								)
							) {
								sliderPag.classList.remove('overlay');
							} else {
								sliderPag.classList.add('overlay');
							}
							showContent(this.slides[this.activeIndex]);
						},
						init: function () {
							progress.classList.remove('animate');
							progress.classList.add('animate');
						},
						slideChangeTransitionStart: function () {
							progress.classList.remove('animate');
						},
						slideChangeTransitionEnd: function () {
							progress.classList.add('animate');
						},
					},
				});

				sliderComment.update();
				pagSlide.update();
			});
		}
	},
};
