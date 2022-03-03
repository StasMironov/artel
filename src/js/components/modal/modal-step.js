


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

		

		var curIdx = 0;

		validation.init();

		const progressLine = document.createElement('div');
		progressLine.setAttribute('class', 'progress-step');

		let step;
		var form = $('[data-steps-career]');
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
				// finish: "Отправить",
				next: "<button class='button button--white' data-btn-next>Дальше</button>",
				previous: "<button class='button button--outline-white' data-btn-prev>Назад</button>",
				finish: "<button class='button button--white' type='submit' data-btn-submit>Отправить</button>",
				current: "current step:",
				pagination: "Pagination",
			},
			onInit: function (event, currentIndex, priorIndex) {
				require('./../../libs/jquery.inputmask.bundle');
				require('./../../libs/jquery.inputmask-multi');
				mask.initMask();
				const inputs = new Input();
				$('.steps').append(progressLine);
		
				let tabs = wrapperNode.querySelectorAll('.steps li');
				step = 100 / tabs.length;

				$(progressLine).width(step*(1) + '%')
				
				$('.wizard .content').animate({ height: $('.body.current').outerHeight() }, "slow");

				
			},
			onStepChanging: function (event, currentIndex, newIndex){ 
				if (newIndex<currentIndex){
					curIdx = newIndex;
					resizeJquerySteps(newIndex);
					return true;
				}

				if(fieldValidate()){
					curIdx = newIndex;
					resizeJquerySteps(newIndex);
					return true;
				}

				

				//return true;
			},
			onStepChanged: function (event, currentIndex, priorIndex) {
				//let resetButton = wrapperNode.querySelectorAll('[data-datepicker-reset]');

				// resetButton.forEach((button)=>{
				// 	button.addEventListener('click', ()=>{
				// 		resizeJquerySteps(currentIndex);
				// 	});
				// });
				
				$(progressLine).width(step*(currentIndex+1) + '%');				
			},
			onFinishing: function (event, currentIndex)
			{
				return true;
			},
			onFinished: function (event, currentIndex)
			{
				if(fieldValidate()){
					window.dispatchEvent(new CustomEvent('submit.formPopup'));
				}
			}	
		});
		
		function resizeJquerySteps(index=false, datepicker=false) {
			// if(index>=0){
			// 	$('.wizard .content').animate({ height: $('.body').eq(index).outerHeight() }, "faster");
			// }


			if(datepicker){
				let count = 0;
				$('.datepicker').each((_, elem)=>{
					if($(elem).hasClass('is-active')){
						count++;
					}
				});
				if(count<=0){
					if(index>=0){
						$('.wizard .content').animate({ height: $('.body').eq(index).outerHeight() }, "faster");
					}
				}
				count = 0
			} else {
				if(index>=0){
					$('.wizard .content').animate({ height: $('.body').eq(index).outerHeight() }, "faster");
				}
			}
		}

		$(window).resize(debounce(100, () => {
			250, resizeJquerySteps(curIdx, true);	
		}));

		window.addEventListener('submit.formPopup', () => {
			const form = $('[data-steps-career]');
			form.submit();
			console.log(form);
		});
	}
};
