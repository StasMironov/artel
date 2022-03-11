import field from 'parsleyjs/src/parsley/field';
import { throttle } from 'throttle-debounce';
import validation from './../validation';
import Input from './../input';
import select from './../select';
import Datepicker from './../datepicker';
import gsap from 'gsap';

export default class Education {
	constructor() {
		this.form = document.querySelector('[data-education-ajax]');
		if (!this.form) return;

		this.counter = 100;
		this.temp;
		this.inputs = new Input();
		this.render();
	}

	resizeJquerySteps(del=true) {
		if(!del){
			$('.wizard .content').animate({ height: $('.body.current').outerHeight()}, "slow");
		} else {
			$('.wizard .content').animate({ height: $('.body.current').outerHeight() + 32}, "slow");
		}
	}


	render() {
		this.frame = this.form.querySelector('[data-container-frame]');
		if (!this.frame) return;

		this.url = this.form.getAttribute('data-url');
		if (!this.url) return;

		this.btnAddEducations = this.form.querySelector('[data-btn-education]');

		this.btnAddEducations.addEventListener('click', (e)=>{	
			//console.log('t');
			this.counter += 1;
			this.fetch();
		});
		
		$(window ).on( "custom", ()=> {
			
			this.btnDeleteEducations = this.form.querySelectorAll('[data-btn-delete]');

			this.btnDeleteEducations.forEach((el)=>{
				el.addEventListener('click', (e)=>{	
					let parentBox = $(el).closest('[data-ed-card]');
					parentBox.remove();
					let lastEl = $('[data-ed-card]').last();
					$(lastEl).get(0).scrollIntoView(false);
					this.resizeJquerySteps(false);
				});
			})

			select.init();
			this.inputs.render();
			new Datepicker();
		});

		$(window).trigger("custom");
	}

	fetch() {
		let url = this.url;
	

		url += [
			url.indexOf('?') >= 0 ? '&' : '?',
			`q=${this.counter}`,
		].join('');

		const response = fetch(url);

		response
			.then((res) => {
				if (res.ok) {
					return res.text();
				} else {
					throw new Error('Something has gone wrong :(');
				}
			})
			.then((text) => {
				this.appendText(text);
			})
			.catch((err) => {
				console.log(`Failed to fetch url (${url}): `, err);
			});
	}

	appendText(value = null) {
			let range = document.createRange();
			let fragment = range.createContextualFragment(value); //Creates a DOM object
			let fragmentCard = fragment.querySelector('[data-ed-card]');

			fragmentCard.style.opacity = 0;
			this.frame.appendChild(fragment);
			$(window).trigger("custom");
			this.resizeJquerySteps();
			gsap.fromTo(fragmentCard, {
				autoAlpha: 0,
			},{
				autoAlpha: 1,
				delay: 0.5
			});
			
	}
}
