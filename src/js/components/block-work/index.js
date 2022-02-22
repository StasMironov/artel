import field from 'parsleyjs/src/parsley/field';
import { throttle } from 'throttle-debounce';
import validation from './../validation';
import Input from './../input';
import select from './../select';
import Datepicker from './../datepicker';
import gsap from 'gsap';

export default class Education {
	constructor() {
		this.form = document.querySelector('[data-work-ajax]');

       
		if (!this.form) return;

		this.counter = 100;
		this.temp;
		//console.log(this.btnAddEducation);
		this.inputs = new Input();
		this.render();
	}

	resizeJquerySteps(del=true) {
		console.log(del);
		if(!del){
			$('.wizard .content').animate({ height: $('.body.current').outerHeight()}, "slow");
		} else {
			$('.wizard .content').animate({ height: $('.body.current').outerHeight() + 32}, "slow");
		}
	}


	render() {
		this.frame = this.form.querySelector('[data-container-works]');
		if (!this.frame) return;

		this.url = this.form.getAttribute('data-url');
		if (!this.url) return;

		this.btnAddEducations = this.form.querySelector('[data-add-work]');

		this.btnAddEducations.addEventListener('click', (e)=>{	
			this.counter += 1;
			this.fetch();	
		});

		
		$(window ).on( "custom-work", ()=> {
		
			this.btnDeleteEducations = this.form.querySelectorAll('[data-delete-work]');


			this.btnDeleteEducations.forEach((el)=>{
				console.log(el);
				el.addEventListener('click', (e)=>{	
					let parentBox = $(el).closest('[data-work-card]');
					console.log(parentBox);
					parentBox.remove();
					this.resizeJquerySteps(false) 
				});
			})

			select.init();
			this.inputs.render();
			
		});

		$(window).trigger("custom-work");
	}

	fetch() {
		let url = this.url;
        console.log(url)
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
               // console.log(text)
				this.appendText(text);
			})
			.catch((err) => {
				console.log(`Failed to fetch url (${url}): `, err);
			});
	}

	appendText(value = null) {
        console.log(1)
			let range = document.createRange();
			let fragment = range.createContextualFragment(value); //Creates a DOM object
			let fragmentCard = fragment.querySelector('[data-work-card]');

			fragmentCard.style.opacity = 0;

			//console.log(fragment);
			this.frame.appendChild(fragment);
			$(window).trigger("custom-work");
			this.resizeJquerySteps();
			gsap.fromTo(fragmentCard, {
				autoAlpha: 0,
			},{
				autoAlpha: 1,
				delay: 0.5
			});
            new Datepicker();
			
	}
}
