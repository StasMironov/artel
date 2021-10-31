import {Loader} from 'google-maps';
import PerfectScrollbar from "perfect-scrollbar";
import Swiper from 'swiper/swiper-bundle';

export default class Map {
	constructor() {
		this.mapNode = document.querySelector('[data-map]');
		if (!this.mapNode) return;

		this.mapInitNode = this.mapNode.querySelector('[data-map-init]');
		if (!this.mapInitNode) return;

		this.urlData = this.mapNode.getAttribute('data-url');
		if (!this.urlData) return;

		this.card = this.mapNode.querySelector('[data-map-card]');
		if (!this.card) return;

		this.cardContent = this.card.querySelector('[data-map-card-content]');
		if (!this.cardContent) return;

		this.tabsNode = this.mapNode.querySelector('[data-map-tabs]');
		if (!this.tabsNode) return;

		this.APIKEY = 'AIzaSyBKxxX68AJCEH2DX3_j0u1knkD6__xrYAk'; // TODO использовать только на этом проекте
		this.initOptions = {
			language: "RU"
		};

		this.ps = null;

		this.loader = new Loader(this.APIKEY, this.initOptions);

		this.load();
	}

	load() {
		this.loader.load()
			.then((google) => {
				this.render(google);
			});
	}

	render(google) {
		this.mapOptions = {
			center: {lat: 55.02147974086529, lng: 82.92257557883947},
			zoom: 4,
			disableDefaultUI: true,
			scrollwheel: false,
			zoomControl: false,
			restriction: {
				latLngBounds: {
					east: 179.9999,
					north: 85,
					south: -85,
					west: -179.9999,
				},
				strictBounds: true,
			},
			styles: [
				{
					featureType: 'water',
					elementType: 'geometry',
					stylers: [
						{color: '#E0E0E0'},
						{lightness: 17}
					],
				},
				{
					featureType: 'landscape',
					elementType: 'all',
					stylers: [
						{lightness: 20},
						{visibility: 'on'},
						{color: '#ffffff'},
					],
				},
				{
					featureType: 'landscape.man_made',
					elementType: 'geometry.stroke',
					stylers: [
						{visibility: 'on'},
						{color: '#dddddd'},
						{lightness: -30}
					],
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.fill',
					stylers: [
						{color: '#ffffff'},
						{lightness: 17}
					],
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry.stroke',
					stylers: [
						{color: '#ffffff'},
						{lightness: 29},
						{weight: 0.2}
					],
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry',
					stylers: [
						{color: '#ffffff'},
						{lightness: 18}
					],
				},
				{
					featureType: 'road.local',
					elementType: 'geometry',
					stylers: [
						{color: '#ffffff'},
						{lightness: 16}
					],
				},
				{
					featureType: 'poi',
					elementType: 'geometry',
					stylers: [
						{color: '#f5f5f5'},
						{lightness: 21}
					],
				},
				{
					featureType: 'poi.park',
					elementType: 'geometry',
					stylers: [
						{color: '#dedede'},
						{lightness: 21}
					],
				},
				{
					featureType: 'null',
					elementType: 'labels.text.stroke',
					stylers: [
						{visibility: 'on'},
						{color: '#ffffff'},
						{lightness: 16}
					],
				},
				{
					featureType: 'null',
					elementType: 'labels.icon',
					stylers: [
						{visibility: 'off'}
					],
				},
				{
					featureType: 'transit',
					elementType: 'geometry',
					stylers: [
						{color: '#f2f2f2'},
						{lightness: 19}
					],
				},
				{
					featureType: 'administrative',
					elementType: 'geometry.fill',
					stylers: [
						{color: '#bbbbbb'},
						{lightness: 20}
					],
				},
				{
					featureType: 'administrative',
					elementType: 'geometry.stroke',
					stylers: [
						{color: '#aaaaaa'},
						{lightness: 17},
						{weight: 1.2}
					],
				},
			],
		}

		this.map = new google.maps.Map(this.mapInitNode, this.mapOptions);

		this.zoomIn = this.mapNode.querySelector('[data-zoom-in]');
		this.zoomOut = this.mapNode.querySelector('[data-zoom-out]');

		if (this.zoomIn) {
			this.zoomIn.addEventListener('click', () => {
				const currentZoomLevel = this.map.getZoom();

				if (currentZoomLevel !== 21) {
					this.map.setZoom(currentZoomLevel + 1);
				}
			});
		}

		if (this.zoomOut) {
			this.zoomOut.addEventListener('click', () => {
				const currentZoomLevel = this.map.getZoom();

				if (currentZoomLevel !== 0) {
					this.map.setZoom(currentZoomLevel - 1);
				}
			});
		}

		this.cardWrap = this.mapNode.querySelector('[data-card-wrap]');
		this.cardClose = this.card.querySelector('[data-close]');

		this.markers = [];

		this.activeIndex = null;

		this.cardClose.addEventListener('click', () => {
			this.cardWrap.classList.remove('is-active');
			this.filterMarkers(); // показ всех меток текущего региона
			this.map.fitBounds(this.bounds);
		});

		this.ps = new PerfectScrollbar(this.cardContent, {
			suppressScrollX: true,
			wheelPropagation: false,
			minScrollbarLength: 140, // исправляет бесконечную прокрутку и баг с большим количеством элементов
		});

		this.tabs = new Swiper(this.tabsNode, {
			slidesPerView: 'auto',
			speed: 400,
			a11y: false,
			freeMode: {
				enabled: true,
				sticky: false,
			},
			simulateTouch: true,
			resistance: true,
			resistanceRatio: 0,
			observer: true,
			observeParents: true,
		});

		this.currentRegion = null;

		this.tabButtons = this.tabsNode.querySelectorAll('[data-region]');
		this.tabButtons.forEach((tab, idx) => {
			if (tab.classList.contains('tab--active')) {
				this.currentRegion = tab.getAttribute('data-region'); // определение текущего региона, чтобы исключить остальные
			}

			tab.addEventListener('click', () => {
				setTimeout(() => {
					this.tabs.slideTo(idx, 800);
				}, 50);

				for (let i = 0; i < this.tabButtons.length; i++) {
					if (idx === i) continue;
					this.tabButtons[i].classList.remove('tab--active');
				}

				tab.classList.add('tab--active');
				this.currentRegion = tab.getAttribute('data-region');
				this.filterMarkers(false, true);

				this.cardWrap.classList.remove('is-active'); // при переключении табов скрываем попап с данными ранее выбранной метки
			});
		});

		this.bounds = null;

		this.getPOI()
			.then((data) => {
				data.data.forEach((markerData, idx) => {
					this.addMarker(markerData, idx);
				});

				if (this.currentRegion) {
					this.bounds = null;
					this.filterMarkers(false, true);
				}
			});
	}

	addMarker(markerData, index) {
		const marker = new google.maps.Marker({
			id: markerData.id,
			exist: !!markerData.exist,
			position: new google.maps.LatLng(markerData.coords[0], markerData.coords[1]),
			icon: this.setIcon(markerData),
			region: markerData.region,
		});

		marker.setMap(this.map);
		this.markers.push(marker);

		marker.addListener('click', () => {
			if (this.activeIndex !== index) { // заперт на повторный клик по активной метке
				this.showContent(markerData); // передача данных метки
				this.cardWrap.classList.add('is-active'); // показ попапа с данными метки

				this.activeIndex = index;
				this.filterMarkers(true); // true - исключаем все метки, кроме текущей
			}

			this.map.setCenter(marker.getPosition());
			this.map.setZoom(12);
		});
	}

	setIcon({type}) {
		const icon = {
			path: "M31.292 10.2789C32.491 12.1317 33.2265 14.2458 33.4362 16.4427C33.6343" +
				" 18.4641 33.3801 20.5043 32.6918 22.4152C32.0036 24.3261 30.8986 26.0598" +
				" 29.457 27.4906L20.9163 36.0798C20.7659 36.2314 20.587 36.3518 20.3899" +
				" 36.4339C20.1928 36.516 19.9814 36.5583 19.7679 36.5583C19.5543 36.5583" +
				" 19.3429 36.516 19.1458 36.4339C18.9487 36.3518 18.7698 36.2314 18.6194" +
				" 36.0798L10.0464 27.4906C8.48277 25.9332 7.31703 24.0223 6.64767 21.9194C5.97831" +
				" 19.8164 5.825 17.5833 6.20069 15.4086C6.57639 13.2339 7.47004 11.1816 8.80615" +
				" 9.42513C10.1422 7.66865 11.8815 6.2596 13.877 5.31706C15.8725 4.37451 18.0656" +
				" 3.92616 20.2709 4.0099C22.4762 4.09364 24.6289 4.707 26.5472 5.79816C28.4655" +
				" 6.88932 30.0929 8.4262 31.292 10.2789ZM19.7371 24H26.7507V17C26.7507 13.1459" +
				" 23.6048 10 19.7507 10C15.8966 10 12.7507 13.1459 12.7507 17C12.7507 20.8405" +
				" 15.883 24 19.7371 24ZM24.204 21.4533V17C24.204 14.5623 22.2021 12.5467 19.7507" +
				" 12.5467C17.2994 12.5467 15.2974 14.5623 15.2974 17C15.2974 19.4377 17.2994" +
				" 21.4533 19.7507 21.4533H24.204Z",
			strokeOpacity: 0,
			fillOpacity: 1.0,
			scale: 1,
			anchor: new google.maps.Point(20, 20),
			labelOrigin: new google.maps.Point(20, 40),
			origin: new google.maps.Point(-20, -20),
			size: new google.maps.Size(40, 40),
		}

		// цвет иконки в зависимости от типа метки
		if (type.trim() === 'service') {
			icon.fillColor = '#00D372';
		} else if (type.trim() === 'factories') {
			icon.fillColor = '#000000';
		} else {
			icon.fillColor = '#CE00F8';
		}

		return icon;
	}

	async getPOI() { // получение данных меток
		const response = await fetch(this.urlData);

		if (!response.ok) {
			throw new Error(`There is some error by ${this.urlData}`);
		}

		return await response.json()
	}

	showContent(markerData) { // контент попапа
		this.cardContent.innerHTML = '';

		let heading = null;

		if (markerData.heading) {
			heading = document.createElement('p');
			heading.classList.add('card-map__heading', 'h2');

			heading.innerText = markerData.heading;
			this.cardContent.appendChild(heading);
		}

		if (markerData.address) {
			this.cardContent.appendChild(this.createElement(markerData.address));
		}

		if (markerData.phone) {
			let caption = null;

			const item = document.createElement('div');
			item.classList.add('card-map__item');

			if (markerData.phone.caption) {
				caption = document.createElement('p');
				caption.classList.add('card-map__caption');

				caption.innerText = markerData.phone.caption;
				item.appendChild(caption);
			}

			if (markerData.phone.links.length) {
				const linksContainer = document.createElement('div');
				linksContainer.classList.add('card-map__links');

				let links = '<ul class="card-map__list">';

				for (let i = 0; i < markerData.phone.links.length; i++) {
					links += `<li class='card-map__link-item'>
								<a href='${markerData.phone.links[i].href}' class="card-map__link h3">${markerData.phone.links[i].text}</a>
								</li>`
				}

				links += '</ul>';

				linksContainer.innerHTML = links;
				item.appendChild(linksContainer);
			}

			this.cardContent.appendChild(item);
		}

		if (markerData.staff) {
			this.cardContent.appendChild(this.createElement(markerData.staff));
		}

		if (markerData.production) {
			this.cardContent.appendChild(this.createElement(markerData.production));
		}

		setTimeout(() => {
			this.ps.update();
		}, 0);
	}

	createElement(data) { // разметка для элементов попапа
		let caption = null;
		let text = null;

		const item = document.createElement('div');
		item.classList.add('card-map__item');

		if (data.caption) {
			caption = document.createElement('p');
			caption.classList.add('card-map__caption');

			caption.innerText = data.caption;
			item.appendChild(caption);
		}

		if (data.text) {
			text = document.createElement('p');
			text.classList.add('card-map__text', 'h3');

			text.innerText = data.text;
			item.appendChild(text);
		}

		return item;
	}

	filterMarkers(exclude = false, fit = false) { // отображение / скрытие меток
		this.bounds = new google.maps.LatLngBounds();

		for (let i = 0; i < this.markers.length; i++) {
			if (this.markers[i].region !== this.currentRegion) {
				this.markers[i].setVisible(false);
			} else {
				if (!exclude) { // если нужно исключить все метки, кроме выбранной
					this.markers[i].setVisible(true);

					this.bounds.extend(this.markers[i].position);
				} else {
					if (this.activeIndex === i) {
						this.markers[i].setVisible(true);
					} else {
						this.markers[i].setVisible(false);
					}
				}
			}
		}

		if (!exclude && fit) {
			this.map.fitBounds(this.bounds);
		}
	}
}
