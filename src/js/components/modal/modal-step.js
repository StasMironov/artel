

import libs from '../../libs';
import select from '../select';

export default {
	init() {
		const wrapperNode = document.querySelector('[data-steps-career]');
	
		if (!wrapperNode) false;

		$(wrapperNode).children('div').steps({
			headerTag: 'h3',
			bodyTag: 'section',
			transitionEffect: 'slideLeft',
			labels: {
				finish: "Отправить",
				next: "Дальше",
				previous: "Назад",
			},
			onInit: ()=> {
				libs.init();
				select.init();
			}
		});

		
	},
};
