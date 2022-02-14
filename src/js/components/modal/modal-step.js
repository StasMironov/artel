export default {
	init() {
		const wrapperNode = document.querySelector('[data-steps-career]');
		console.log(wrapperNode);
		if (!wrapperNode) false;

		$(wrapperNode).children('div').steps({
			headerTag: 'h3',
			bodyTag: 'section',
			transitionEffect: 'slideLeft',
		});
	},
};
