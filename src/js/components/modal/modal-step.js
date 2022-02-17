


import select from '../select';
import { debounce } from 'throttle-debounce';
import mask from './../../libs/mask';
import validation from './../validation';
import Input from './../input';

import 'parsleyjs';
import './../validation/parsley-ru';


export default {
	init() {
		const wrapperNode = document.querySelector('[data-steps-career]');
		if(!wrapperNode) return;

		validation.init();

		const progressLine = document.createElement('div');
		progressLine.setAttribute('class', 'progress-step');

		let step;
		var form = $('[data-steps-career]');
		var is_async_step = false;
		var stateValid = 0;
	
		function fieldValidate(){
			stateValid = 0;

				
			let fields = $('.body.current').find('[data-field-check]');
			
			fields.each((_, field)=>{
				$(field).parsley().validate();
			});
		
			const erorFields = $('.body.current').find('.parsley-error')

			if (erorFields.length <= 0) {
				return true;
			}
		}
	
		form.children("div").steps({
			headerTag: 'h3',
			bodyTag: 'section',
			transitionEffect: "fade",
			
			labels: {
				finish: "Отправить",
				next: "Дальше",
				previous: "Назад",
				current: "current step:",
				pagination: "Pagination",
			},
			onInit: function (event, currentIndex, priorIndex) {
				require('./../../libs/jquery.inputmask.bundle');
				require('./../../libs/jquery.inputmask-multi');
				mask.initMask();
				// select.init();
				//validation.init();
				const inputs = new Input();
				//inputs.render();

				$('.steps').append(progressLine);
			

				let tabs = wrapperNode.querySelectorAll('.steps li');
				step = 100 / tabs.length;

				$(progressLine).width(step*(1) + '%')
				
				$('.wizard .content').animate({ height: $('.body.current').outerHeight() }, "slow");
			},
			onStepChanging: function (event, currentIndex, newIndex){
				if(fieldValidate()){
					return true;
				}
			},
			onStepChanged: function (event, currentIndex, priorIndex) {
				resizeJquerySteps();
				$(progressLine).width(step*(currentIndex+1) + '%');
				// form.validate().settings.ignore = ":disabled,:hidden";
        		// return form.valid();

				
			},	
			onFinished: function (event, currentIndex){
				// if(fieldValidate()){
				// 	console.log('submit');
				// 	alert("Submitted!");
				// }

				console.log(form);
				form.submit();
			}	
		});
		
		function resizeJquerySteps() {
			$('.wizard .content').animate({ height: $('.body.current').outerHeight() }, "slow");
		}

		$(window).resize(debounce(100, () => {
			250, resizeJquerySteps
		}));
	},
};
