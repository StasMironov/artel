

import libs from '../../libs';
import select from '../select';
import { debounce } from 'throttle-debounce';

export default {
	init() {
		const wrapperNode = document.querySelector('[data-steps-career]');
		if(!wrapperNode) return;

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
				libs.init();
				select.init();
				
				$('.wizard .content').animate({ height: $('.body.current').outerHeight() }, "slow");
			},
			onStepChanged: function (event, currentIndex, priorIndex) {
				resizeJquerySteps();
				
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
