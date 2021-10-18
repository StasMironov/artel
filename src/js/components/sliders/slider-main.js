import gsap from 'gsap';

export default class Slider {
	constructor() {
		this.sliderWrapNode = document.querySelector('[data-main-hero]');

		if (this.sliderWrapNode) this.render();
	}

	render() {
		this.slides = this.sliderWrapNode.querySelectorAll('[data-slide]');

		if (!this.slides.length) return;

		this.activeIndex = 0;
		this.slidesAmount = this.slides.length;

		this.prev = this.sliderWrapNode.querySelector('[data-nav-arrow-prev]');
		this.next = this.sliderWrapNode.querySelector('[data-nav-arrow-next]');

		this.prev.addEventListener('click', () => {
			this.classToggle(this.slides[this.activeIndex], true);

			if (this.activeIndex < this.slidesAmount - 1) {
				this.activeIndex += 1;
			} else {
				this.activeIndex = 0;
			}

			this.classToggle(this.slides[this.activeIndex], false);
		});
		this.next.addEventListener('click', () => {
			this.classToggle(this.slides[this.activeIndex], true);

			if (this.activeIndex !== 0) {
				this.activeIndex -= 1;
			} else {
				this.activeIndex = this.slidesAmount - 1;
			}

			this.classToggle(this.slides[this.activeIndex], false);
		});
	}

	classToggle(slide, remove = false) {
		if (remove) {
			slide.classList.remove('is-active');
		} else {
			slide.classList.add('is-active');
		}
	}
}
