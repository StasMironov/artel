


import select from '../select';
import { debounce } from 'throttle-debounce';
import mask from './../../libs/mask';


export default {
	init() {
		const wrapperNode = document.querySelector('[data-steps-career]');
		if(!wrapperNode) return;

		const progressLine = document.createElement('div');
		progressLine.setAttribute('class', 'progress-step');

		let step;
		

		$(wrapperNode).children('div').steps({
			headerTag: 'h3',
			bodyTag: 'section',
			transitionEffect: 'slideLeft',
			labels: {
				finish: "Отправить",
				next: "Дальше",
				previous: "Назад",
			},
			onInit: function (event, currentIndex, priorIndex) {
				require('./../../libs/jquery.inputmask.bundle');
				require('./../../libs/jquery.inputmask-multi');
				mask.initMask();
				select.init();
				$('.steps').append(progressLine);
			

				let tabs = wrapperNode.querySelectorAll('.steps li');
				step = 100 / tabs.length;

				$(progressLine).width(step*(1) + '%')
				
				$('.wizard .content').animate({ height: $('.body.current').outerHeight() }, "slow");
			},
			onStepChanged: function (event, currentIndex, priorIndex) {
				resizeJquerySteps();
				$(progressLine).width(step*(currentIndex+1) + '%')
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
