export default {
	init() {
		const filterNode = document.querySelector('[data-service-wrap]');
		if (!filterNode) return;

		const urlData = filterNode.dataset.url;
		if (!urlData) return;

		const cards = document.querySelectorAll('[data-id]');
		let select_val = false;
		let tempArr = [];
		let inputVal = false;

		function renderServise(select, reset) {
			cards.forEach((card) => {
				if (!select) {
					tempArr.forEach((elem) => {
						if (card.dataset.id == elem.id) {
							card.classList.remove('hide');
						}
					});
				} else {
					if (select != 'All') {
						if (!inputVal) {
							tempArr.forEach((elem) => {
								if (card.dataset.products == select) {
									card.classList.remove('hide');
								} else {
									card.classList.add('hide');
								}
							});
						} else {
							tempArr.forEach((elem) => {
								if (
									card.dataset.id == elem.id &&
									card.dataset.products == select &&
									elem.name.indexOf(inputVal) !== -1
								) {
									card.classList.remove('hide');
								} else {
									card.classList.add('hide');
								}
							});
						}
					} else {
						if (!inputVal) {
							tempArr.forEach((elem) => {
								if (select == 'All') {
									card.classList.remove('hide');
								}
							});
						} else {
							tempArr.forEach((elem) => {
								if (
									select == 'All' &&
									card.dataset.id == elem.id &&
									elem.name.indexOf(inputVal) !== -1
								) {
									card.classList.remove('hide');
								}
							});
						}
					}
				}
			});

			if (reset) {
				if (!select) {
					cards.forEach((card) => {
						tempArr.forEach((elem) => {
							if (card.dataset.id == elem.id) {
								card.classList.remove('hide');
							}
						});
					});
				} else {
					if (select != 'All') {
						cards.forEach((card) => {
							tempArr.forEach((elem) => {
								if (card.dataset.products == select) {
									card.classList.remove('hide');
								} else {
									card.classList.add('hide');
								}
							});
						});
					} else {
						cards.forEach((card) => {
							tempArr.forEach((elem) => {
								card.classList.remove('hide');
							});
						});
					}
				}
			}
		}

		function initService() {
			fetch(urlData)
				.then((response) => response.json())
				.then((response) => {
					if (response && response.data) {
						const city = response.data;
						tempArr = [];

						cards.forEach((card) => {
							let obj = {
								id: card.dataset.id,
								products: card.dataset.products,
							};
							city.forEach((elem, index) => {
								if (elem.id == card.dataset.id) {
									obj.name = elem.name;
								}
							});
							tempArr.push(obj);
						});
					}
				});
		}

		initService();

		$('body').on('keyup', '[data-input]', function (e) {
			fetch(urlData)
				.then((response) => response.json())
				.then((response) => {
					if (response && response.data) {
						const city = response.data;
						inputVal = e.target.value;
						var cityServ = inputVal;
						let serviceEl;

						if (!cityServ.length) {
							serviceEl = '';
						} else {
							serviceEl = city.filter(function (place) {
								return place.name.indexOf(cityServ) !== -1;
							});

							if (serviceEl.length) {
								tempArr = [];
								serviceEl.forEach((elem) => {
									cards.forEach((card) => {
										card.classList.add('hide');
										if (card.dataset.id == elem.id) {
											tempArr.push({
												id: card.dataset.id,
												name: elem.name,
												products: card.dataset.products,
											});
										}
									});
								});
								renderServise(select_val, false);
							} else {
								cards.forEach((card) => {
									card.classList.add('hide');
								});
							}
						}
					}
				});
		});

		$('#filter-form-select-1').on('select2:select', (e) => {
			select_val = $(e.currentTarget).val();
			renderServise(select_val, false);
		});

		$('[data-reset]').on('click', function () {
			if (!select_val) {
				renderServise(false, true);
				inputVal = '';
			} else {
				renderServise(select_val, true);
				inputVal = '';
			}
		});
	},
};
