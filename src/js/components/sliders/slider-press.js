import gsap from 'gsap';
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
						$(this.$el[0]).addClass('overlay');
					}
				},
				touchEnd() {
					const lastSlide = this.slides[this.slides.length - 1];
					if ($(lastSlide).hasClass('swiper-slide-thumb-active')) {
						$(this.$el[0]).removeClass('overlay');
					} else {
						$(this.$el[0]).addClass('overlay');
					}
				},
			},
		},
	});

	function showContent(element) {
		const titleEl = element.querySelector('[data-article]');
		const qtyEl = element.querySelector('[data-qty]');

		const showTl = gsap.timeline({
			paused: true,
		});

		showTl.fromTo(
			[titleEl, qtyEl],
			{ autoAlpha: 0, yPercent: 20 },
			{
				autoAlpha: 1,
				yPercent: 0,
				stagger: {
					each: 0.3,
				},
			}
		);

		showTl.play();
	}

	const sliderPress = new Slider({
		init: true,
		wrap: '[data-slider-press-wrap]',
		slider: '[data-slider-press]',
		prev: '[data-nav-arrow-prev]',
		next: '[data-nav-arrow-next]',
		//initialSlide: 0,
		options: {
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
			autoHeight: false,

			thumbs: {
				swiper: pagSlide.swiper,
			},
			on: {
				slideChangeTransitionStart() {
					console.log($(pagSlide.swiper.$el[0]));
					const lastSlide =
						pagSlide.swiper.slides[
							pagSlide.swiper.slides.length - 1
						];
					if ($(lastSlide).hasClass('swiper-slide-thumb-active')) {
						$(pagSlide.swiper.$el[0]).removeClass('overlay');
					} else {
						$(pagSlide.swiper.$el[0]).addClass('overlay');
					}
					showContent(this.slides[this.activeIndex]);
				},
			},
		},
	});
	sliderPress.update();
	pagSlide.update();
}
