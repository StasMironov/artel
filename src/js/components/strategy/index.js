import gsap from 'gsap';
import { isDesktop } from '../../utils/breakpoints';

class Strategy {
	constructor(props) {
		if (!(props.wrap instanceof HTMLElement) || !isDesktop()) return;
		this.wrap = props.wrap;
		this.forward = true;
		this.lastTime = 0;

		this.init();
	}

	checkDirection(tl) {
		const newTime = tl.time();
		if (
			(this.forward && newTime < this.lastTime) ||
			(!this.forward && newTime > this.lastTime)
		) {
			this.forward = !this.forward;
		}
		this.lastTime = newTime;
	}

	init() {
		this.cards = this.wrap.querySelectorAll('[data-card]');
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: this.wrap,
				start: 'center center',
				end: 'bottom top',
				scrub: 3,
				pin: true,
				ease: 'power2.out',
			},
		});
		if (this.cards.length) {
			this.cards.forEach((card, index, arr) => {
				if (index == 0) {
					card.classList.add('is-active');
				}
				tl.to(card, {
					top: 0,
					onUpdate: () => {
						this.checkDirection(tl);
						if (!this.forward && index == 0) {
							card.classList.add('is-active');
						}
						if (!this.forward && index != 0) {
							card.classList.remove('is-active');
							arr[index - 1].classList.add('is-active');
						}
					},
					onReverseComplete: () => {
						this.disableCards();
						card.classList.add('is-active');
					},
					onComplete: () => {
						this.disableCards();
						card.classList.add('is-active');
					},
				});
			});
		}
	}

	disableCards() {
		this.cards.forEach((card) => {
			card.classList.remove('is-active');
		});
	}
}

export default Strategy;
