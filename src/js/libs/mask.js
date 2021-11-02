import IMask from 'imask';

export default {
	init() {
		this.tel();
	},
	tel() {
		const elements = document.querySelectorAll('[data-mask-tel]');

		const maskOptions = {
			mask: [
				{
					mask: '+00{(000)}0000-000',
					lazy: true,
				},
			],
		};

		elements.forEach((el) => {
			if (el.hasAttribute('data-initialized-mask')) return;
			let maskInstance = IMask(el, maskOptions);
			el.setAttribute('data-initialized-mask', '');
			el.addEventListener('mask-init', () => {
				if (!el.hasAttribute('data-initialized-mask')) {
					maskInstance = IMask(el, maskOptions);
					el.setAttribute('data-initialized-mask', '');
				}
			});
			el.addEventListener('mask-destroy', () => {
				if (el.hasAttribute('data-initialized-mask')) {
					maskInstance.destroy();
					el.removeAttribute('data-initialized-mask');
				}
			});
		});
	},
};
