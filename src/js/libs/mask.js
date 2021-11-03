export default {
	initMask() {
		function removeInputMask(target) {
			target.inputmask('remove');
		}

		function applyInputMasks(target, maskOpts) {
			target.inputmasks(maskOpts);
		}

		// плагин Inputmask не работает с input[type=email]
		// вместо этого можно использовать input[type=text] и data-parsley-type="email"
		let $tel = $('.js-mask-tel, [data-mask-tel], [mask-tel]');

		let path = '/ajax/phone-codes.json';

		if (window.templateSource) {
			path = window.templateSource + path;
		}

		let listCountries = $.masksSort(
			$.masksLoad(path),
			['#'],
			/[0-9]|#/,
			'mask'
		);
		const maskOpts = {
			inputmask: {
				definitions: {
					'#': {
						validator: '[0-9]',
						cardinality: 1,
					},
				},
				showMaskOnHover: false,
				autoUnmask: true,
				clearMaskOnLostFocus: true,
			},
			list: listCountries,
			match: /[0-9]/,
			replace: '#',
			listKey: 'mask',
			onMaskChange: function (maskObj, completed) {
				if (completed) {
					$tel.blur(function () {
						$(this).parsley().validate();
					});
				} else {
					if ($(this).val()) {
						$(this).addClass('not-empty');
					} else {
						$(this).removeClass('not-empty');
					}
				}
			},
		};

		$tel.each(function () {
			let $this = $(this);

			$this.change(function (e) {
				let $this = $(this);
				removeInputMask($this);
				applyInputMasks($this, maskOpts);
			});

			removeInputMask($this);
			applyInputMasks($this, maskOpts);
		});

		$tel.attr('data-parsley-excluded', false);
		let $form = $tel.closest('.js-validate-form');
		if ($form.length > 0) {
			$form.parsley().refresh();
		}
	},
};
