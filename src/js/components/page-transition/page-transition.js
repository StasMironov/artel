import barba from '@barba/core';
import gsap from 'gsap';
// import EasingFunctions from '../../utils/easing';

export default class PageTransition {
	constructor() {
		this.wrap = document.querySelector('.page-transition');
		this.overlay = null;
		this.path = null;
		this.numPoints = 10;
		this.duration = 900;
		this.delayPointsArray = [];
		this.delayPointsMax = 300;
		this.delayPerPath = 250;
		this.timeStart = Date.now();
		this.isOpened = false;
        

		this.init();
	}

    loaderIn() {
        const loader = this.overlay;
        let trigger = document.querySelector('html');
        // console.log(trigger.getBoundingClientRect());
        const { height, width, top, left } = trigger.getBoundingClientRect();
        const triggerTop = Math.floor(top);
        const triggerLeft = Math.floor(left);
        const triggerWidth = Math.floor(width);
        const triggerHeight = Math.floor(height);
        // console.log({triggerTop, triggerLeft, triggerHeight, triggerWidth});

        // GSAP timeline to stretch the loading screen across the whole screen

        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;     
        const loaderSize = viewportHeight > viewportWidth ? viewportHeight*2 : viewportWidth*2;

        const tl = gsap.timeline();
        tl
            .set(loader, {
                autoAlpha: 1,
               xPercent: -50,
                yPercent: -100
            })
            .fromTo(loader, 
            {
                //scale: 0,
                //transformOrigin: 'center center',
                yPercent: -100
            },
            { 
                duration: 20,
                // scale: 2, 
                yPercent: -300,
                ease: 'Power4.out'
            });
        return tl;
    }

    loaderAway() {
        const loader = this.overlay;

        console.log('finish');

        const tl = gsap.timeline();
        return tl.to(loader, { 
            // scale: 0,
            // transformOrigin: 'center center',
            // duration: 0.8
           // autoAlpha:0
        })
    }

	toggle() {
		this.isAnimating = true;

		if (this.isOpened === false) {
            console.log(this.isOpened);
			return this.open();
		} else {
            console.log(this.isOpened);
			return this.close();
		}
	}

	open() {
		this.isOpened = true;
		//this.overlay.classList.add('is-opened');
		this.timeStart = Date.now();

		return this.renderLoop();
	}

	close() {
		this.isOpened = false;
		//this.overlay.classList.remove('is-opened');
		this.timeStart = Date.now();

		return this.renderLoop();
	}


	render() {
		if (this.isOpened) {
            this.loaderIn();
		} else {
            this.loaderAway();
		}
	}

	renderLoop() {
		return new Promise((resolve, reject) => {
			this.render();
            return resolve();
		});
	}

	initBarbaLinks() {
		let links = document.querySelectorAll('a[href]');

		if(!links.length) return;

		[...links].forEach(link => {
			if(link.href === window.location.href) {
				link.dataset.active = 'true';
			} else {
				link.dataset.active = 'false';
			}
		});
	}

	initBarba() {
		let that = this;

		barba.init({
			debug: true,
			prefetchIgnore: true,
			// timeout: 5000,
			transitions: [{
				name: 'default-transition',
				// prevent: ({ el }) => {
				// 	console.log(el);
				// 	el.hasAttribute('data-prevent-barba-link');
				// },
				leave(data) {
					window.dispatchEvent(new CustomEvent('page:leave'));

					return that.toggle();
				},
				after(data) {
					// Reset scroll
					//window.ls.destroy();
					//window.ls.init();

					window.dispatchEvent(new CustomEvent("reinit"));
					//window.ls.update();
					that.initBarbaLinks();

					return that.toggle();
				},
				requestError: (trigger, action, url, response) => {
					// go to a custom 404 page if the user click on a link that return a 404 response status
					if (action === 'click' && response.status && response.status === 404) {
						barba.go('/404.html');
					}

					// prevent Barba from redirecting the user to the requested URL
					// this is equivalent to e.preventDefault() in this context
					return false;
				}
			}]
		});

		this.initBarbaLinks();
	}

	init() {
		if(!this.wrap) return;

		this.overlay = this.wrap.querySelector('.page-transition-overlay');
		// this.path = this.overlay.querySelectorAll('path')

		this.initBarba();
	}
}
