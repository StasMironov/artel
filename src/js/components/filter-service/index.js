export default {
	init() {
		const filterNode = document.querySelector('[data-service-wrap]');
		if (!filterNode) return;

		const urlData = filterNode.dataset.url;
		if (!urlData) return;

		const cards = document.querySelectorAll('[data-id]');
		let idElem = false;
		let select_val = false;

		$('body').on('keyup', '[data-input]', function () {
			fetch(urlData)
				.then((response) => response.json())
				.then((response) => {
					if (response && response.data) {
						const city = response.data;
						//console.log(city);

						city.forEach((elem, index) => {
							if (this.value == elem.name) {
								cards.forEach((card) => {
									if (!select_val) {
										if (card.dataset.id != elem.id) {
											card.classList.add('hide');
										} else {
											card.classList.remove('hide');
											idElem = card.dataset.id;
										}
									} else {
										if (
											card.dataset.id == elem.id &&
											card.dataset.products == select_val
										) {
											card.classList.remove('hide');
											idElem = card.dataset.id;
										} else {
											card.classList.add('hide');
										}
									}
								});
							} else if (this.value === '') {
								cards.forEach((card) => {
									card.classList.remove('hide');
								});
							}
						});
					}
				});
		});

		$('#filter-form-select-1').on('select2:select', (e) => {
			select_val = $(e.currentTarget).val();
			cards.forEach((card) => {
				if (idElem) {
					if (
						card.dataset.products == select_val &&
						card.dataset.id == idElem
					) {
						card.classList.remove('hide');
					} else {
						card.classList.add('hide');
					}
				} else {
					if (card.dataset.products == select_val) {
						card.classList.remove('hide');
					} else {
						card.classList.add('hide');
					}
				}

				if (select_val == 'All' && card.dataset.id == idElem) {
					card.classList.remove('hide');
				} else if (select_val == 'All' && card.dataset.id != idElem) {
					card.classList.remove('hide');
				}
			});
		});

		$('[data-reset]').on('click', function () {
			cards.forEach((card) => {
				card.classList.remove('hide');
			});
		});
	},
};
