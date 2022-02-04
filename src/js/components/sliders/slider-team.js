import Slider from './constructor';

export default{
	init() {

	const SliderTeam = new Slider({
		init: true,
		wrap: '[data-slider-team]',
		slider: '[data-slider]',
		prev: '[data-nav-arrow-prev]',
		next: '[data-nav-arrow-next]',
		options: {
			slidesPerView: '1',
			allowTouchMove: true,
			speed: 800,
			loop: false
		},
	});
	}
}
