export default {
	init() {
		const toggle = $('[data-text-hidden]');
		let status = 0;

		if (!toggle) return;

		const action = $('[data-text-btn]');
		if (!action) return;

		action.on('click', function () {
			if (status) {
				toggle.slideUp();
				$(this).text('Читать далее');
				status--;
			} else {
				toggle.slideDown();
				$(this).text('Скрыть');
				status++;
			}
		});
	},
};
