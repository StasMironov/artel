import field from 'parsleyjs/src/parsley/field';
import { throttle } from 'throttle-debounce';
import validation from './../validation';
import Input from './../input';
import select from './../select';
import Datepicker from './../datepicker';

export default class Education {
	constructor() {
		this.form = document.querySelector('[data-education-ajax]');
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
		this.frame = this.form.querySelector('[data-container-frame]');
		if (!this.frame) return;

		this.url = this.form.getAttribute('data-url');
		if (!this.url) return;

		
		$(window ).on( "custom", ()=> {
			this.btnAddEducations = this.form.querySelectorAll('[data-btn-education]');
			this.btnDeleteEducations = this.form.querySelectorAll('[data-btn-delete]');


			this.btnDeleteEducations.forEach((el)=>{
				//console.log(el);
				el.addEventListener('click', (e)=>{	
					let parentBox = $(el).closest('[data-ed-card]');
					console.log(parentBox);
					parentBox.remove();
					this.resizeJquerySteps(false) 
				});
			})

			this.btnAddEducations.forEach((el)=>{
				//console.log(el);
				el.addEventListener('click', (e)=>{	
					this.counter += 1;
					this.fetch();
					
				});
			})



			
				select.init();
			//	const elements = document.querySelectorAll('[data-select]');
			//	console.log(elements)
		
			// this.inputs.render();
			new Datepicker();
		});

		$(window).trigger("custom");
	}

	fetch() {
		//const formData = new FormData(this.form);
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
		//let htmlEl = document.createDocumentFragment();
			let range = document.createRange();
			let fragment = range.createContextualFragment(value); //Creates a DOM object
			// htmlEl.setAttribute('data-box-ed','');
			this.frame.appendChild(fragment);
			$(window).trigger("custom");
			this.resizeJquerySteps();
	}
}
