import 'parsleyjs';
import './parsley-ru';

export default {
	init() {
		window.addEventListener('init.validation', () => {
			const $lang = $('html').attr('lang');
			const $forms = $(
				'[data-parsley-validate]:not([data-parsley-initialized])'
			);
			$forms.each((index, form) => {
				console.log(form);
				const $form = $(form);
				$form.parsley({
					errorClass: 'parsley-error',
					successClass: 'parsley-success',
				});

				$form.on('submit', (e) => {
					
					if (form.hasAttribute('data-ajax-form')) {
						e.preventDefault();
						console.log('valid submit');

						window.dispatchEvent(
							new CustomEvent('form:submit', { detail: e })
						);
					}
				});

				$form.attr('data-parsley-initialized', '');
				window.Parsley.setLocale(`${$lang}`);
			});
		});
		window.dispatchEvent(new CustomEvent('init.validation'));
	},
};
