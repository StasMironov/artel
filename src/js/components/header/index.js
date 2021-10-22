import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default {
	init() {
		const header = document.querySelector('header.header');
		if (!header) return;

		ScrollTrigger.create({
			trigger: "body",
			start: "top top",
			onUpdate: self => {
				if (self.direction > 0) {
					header.classList.add('is-hide');
				} else {
					header.classList.remove('is-hide');

					if (self.progress !== 0) {
						header.classList.add('in-progress');
					} else {
						header.classList.remove('in-progress');
					}
				}
			}
		});
	}
}
