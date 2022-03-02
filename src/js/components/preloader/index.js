import gsap from 'gsap';
// import anime from 'animejs/lib/anime.es.js';
// import KUTE from 'kute.js';

export default class Preloader {
	constructor() {
		this.preloader = null;
		this.progress = null;
		this.progressMask = null;
		this.progressText = null;
		this.progressTextMasked = null;
		this.duration = 2;

		this.init();
	}

	updateText(progress) {
		// this.progressText.innerHTML = Math.round(progress * 100) + ' %';
		// this.progressTextMasked.innerHTML = Math.round(progress * 100) + ' %';
	}

	animate() {
        console.log('preloader');
		// let els = [this.progress, this.progressMask];
		// let that = this;

		// gsap.set(els, { y: '60%', rotation: 0, opacity: 1});

		// gsap.to(els, {
		// 	y: '-50%',
		// 	rotation: 30,
		// 	duration: this.duration,
		// 	// ease: this.contentEasingIn,
		// 	// delay: 0.5,
		// 	force3D: true,
		// 	onStart() {
		// 		[that.progressText, that.progressTextMasked].forEach(el => el.classList.add('visible'));
		// 		document.body.classList.add('preloading');
		// 		window.ls.stop();
		// 	},
		// 	onUpdate() {
		// 		that.updateText(this.progress())
		// 	},
		// 	onComplete() {
		// 		that.onComplete();
		// 	},
		// });
	}

	onComplete() {
		window.dispatchEvent(new CustomEvent('preloader:complete'));

		let that = this;

		sessionStorage.setItem('preloader', 'initialize');

		document.body.classList.remove('preloading');
		window.ls.start();
		window.ls.update();

		gsap.to(this.preloader, {
			opacity: 0,
			duration: 0.5,
			delay: 0.2,
			onComplete() {
				that.preloader.style.display = 'none';
			},
		});
	}

	// animateMorph() {
	// 	let els = [this.progress, this.progressMask];

	// 	// anime({
	// 	// 	targets: els,
	// 	// 	d: [
	// 	// 		{ value: 'M-84.8915 0C-124.257 0 -175.984 52.06 -216 52.06V588H576V52.06C516.5 52.06 475.004 0 435.639 0C396.274 0 345.522 52.06 305.181 52.06C264.84 52.06 213.112 0 172.12 0C131.129 0 83.9555 52.06 46.5424 52.06C9.12929 52.06 -45.5264 0 -84.8915 0Z'},
	// 	// 		{ value: 'M-84.8915 0H-216V588H576V0H435.639H305.181H172.12H46.5424H-84.8915Z'},
	// 	// 		{ value: 'M-84.8915 0C-124.257 0 -175.984 52.06 -216 52.06V588H576V52.06C516.5 52.06 475.004 0 435.639 0C396.274 0 345.522 52.06 305.181 52.06C264.84 52.06 213.112 0 172.12 0C131.129 0 83.9555 52.06 46.5424 52.06C9.12929 52.06 -45.5264 0 -84.8915 0Z'}
	// 	// 	],
	// 	// 	easing: 'easeOutQuad',
	// 	// 	duration: this.duration * 5000,
	// 	// 	loop: true
	// 	// });
	// }

	// animateMorphTest() {
	// 	let el = document.querySelector('#rectangle');
	// 	let to = document.querySelector('#star');

	// 	// anime({
	// 	// 	targets: el,
	// 	// 	d: [
	// 	// 		{ value: 'M301.113,12.011l99.25,179.996l201.864,38.778L461.706,380.808 l25.508,203.958l-186.101-87.287L115.01,584.766l25.507-203.958L0,230.785l201.86-38.778L301.113,12.011'},
	// 	// 		{ value: 'M38.01,5.653h526.531c17.905,0,32.422,14.516,32.422,32.422v526.531 c0,17.905-14.517,32.422-32.422,32.422H38.01c-17.906,0-32.422-14.517-32.422-32.422V38.075C5.588,20.169,20.104,5.653,38.01,5.653z'}
	// 	// 	],
	// 	// 	easing: 'easeOutQuad',
	// 	// 	duration: this.duration * 2000,
	// 	// 	loop: true
	// 	// });

	// 	var tween = KUTE.fromTo('#start', {path: '#start' }, { path: '#finish' }).start();
	// }

	init() {
		this.preloader = document.querySelector('.preloader');

		if(!this.preloader) return;

		// this.progress = this.preloader.querySelector('.preloader-svg__progress');
		// this.progressMask = this.preloader.querySelector('.preloader-svg__text-mask');
		// this.progressText = this.preloader.querySelector('.preloader-svg__num');
		// this.progressTextMasked = this.preloader.querySelector('.preloader-svg__num--masked');

		if (sessionStorage.getItem('preloader') !== 'initialize') {
			this.animate();
		} else {
			this.preloader.classList.add('hidden');
			//window.dispatchEvent(new CustomEvent('preloader:complete'))
		}
	}
}
