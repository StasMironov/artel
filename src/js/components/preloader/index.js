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
		this.duration = 1.5;

		this.init();
	}

	updateText(progress) {
		this.progressText.innerHTML = Math.round(progress * 100) + ' %';
		// this.progressTextMasked.innerHTML = Math.round(progress * 100) + ' %';
	}

	animate() {
       
		let els = this.progress;
		let that = this;
        

		gsap.set(els, { x: '-100%', rotation: 0, opacity: 1});

		gsap.to(els, {
			x: '0%',
			duration: this.duration,
			// ease: this.contentEasingIn,
			// delay: 0.5,
			force3D: true,
			onStart() {
			//	[that.progressText, that.progressTextMasked].forEach(el => el.classList.add('visible'));
				document.body.classList.add('preloading');
				//window.ls.stop();
			},
			onUpdate() {
				that.updateText(this.progress())
			},
			onComplete() {
				that.onComplete();
			},
		});
	}

	onComplete() {
		window.dispatchEvent(new CustomEvent('preloader:complete'));

		let that = this;

		sessionStorage.setItem('preloader', 'initialize');

		document.body.classList.remove('preloading');
		// window.ls.start();
		// window.ls.update();

		gsap.to(this.preloader, {
			opacity: 0,
			//duration: 0.5,
			//delay: 0.2,
			onComplete() {
				that.preloader.style.display = 'none';
              
			},
		});
	}

	init() {
		this.preloader = document.querySelector('.preloader');

		if(!this.preloader) return;

		this.progress = this.preloader.querySelector('[data-preloader-progress]');
		// this.progressMask = this.preloader.querySelector('.preloader-svg__text-mask');
		this.progressText = this.preloader.querySelector('[data-preloader-num]');
       
		// this.progressTextMasked = this.preloader.querySelector('.preloader-svg__num--masked');
        
        //this.animate();

		if (sessionStorage.getItem('preloader') !== 'initialize') {
			this.animate();
           // this.preloader.classList.add('hidden');
		} else {
			window.dispatchEvent(new CustomEvent('preloader:complete'))
		}
	}
}
