import MicroModal from 'micromodal';
import { throttle } from 'throttle-debounce';
import PerfectScrollbar from 'perfect-scrollbar';
import { isMob } from '../../utils/breakpoints';

const Modal = {
	init() {
		this.ajaxSetup();

		MicroModal.init({
			openTrigger: 'data-modal',
			closeTrigger: 'data-modal-close',
			openClass: 'is-open',
			disableFocus: false,
			awaitOpenAnimation: true,
			awaitCloseAnimation: true,
			debugMode: false,
			disableScroll: false,
			onShow: (modal) => {
				if (modal.querySelector('[data-modal-ajax-container]')) {
					this.ajaxInsert(
						modal.querySelector('[data-modal-ajax-container]')
					);
				}
				window._disableScroll();
				setTimeout(()=>{
					$('.header').addClass('show-header mf-index');
				}, 100);
				window.dispatchEvent(new CustomEvent('modal.open'));
			},
			onClose: (modal) => {
				$('.header').removeClass('show-header mf-index');
				window._enableScroll();
				window.dispatchEvent(new CustomEvent('modal.close'));
				//window.ls.update();
			},
		});
	},

	ajaxSetup() {
		const buttons = document.querySelectorAll('[data-modal-ajax]');

		buttons.forEach((button) => {
			button.addEventListener('click', () => {
				const url = button.getAttribute('data-modal-ajax');
				const modal = document.getElementById(
					button.getAttribute('data-modal')
				);

				if (!modal) return;
				const ajaxContainer = modal.querySelector(
					'[data-modal-ajax-container]'
				);

				if (
					!ajaxContainer ||
					ajaxContainer.getAttribute('data-modal-ajax-container') ===
						url
				)
					return;

				ajaxContainer.setAttribute('data-modal-ajax-container', url);
			});
		});
	},

	ajaxInsert(container) {
		const url = container.getAttribute('data-modal-ajax-container');

		if (!url) return;

		fetch(url)
			.then((res) => {
				if (!res.ok) {
					if (res.status === 404) {
						throw new Error('Not Found');
					} else {
						throw new Error('Some error');
					}
				}
				return res.text();
			})
			.then((text) => {
				container.innerHTML = text;

				const content = container.querySelector('[data-ps]');
				let ps = new PerfectScrollbar(content, {
						wheelPropagation: true,
						minScrollbarLength: 120,
				});

				/*if (document.querySelector('[data-ps]')) {
					let wrapSubNode = document.querySelector('[data-ps]');
					let ps = new PerfectScrollbar(wrapSubNode, {
						wheelSpeed: 2,
						wheelPropagation: true,
						minScrollbarLength: 20,
					});

					if (isMob()) {
						wrapSubNode.addEventListener('ps-scroll-y', () => {
							if ($('.modal-partner__info').offset().top <= 0) {
								$('[data-wrap-scroll]').addClass('scroll');
							} else {
								$('[data-wrap-scroll]').removeClass('scroll');
							}
						});

						function iOS() {
							return (
								[
									'iPad Simulator',
									'iPhone Simulator',
									'iPod Simulator',
									'iPad',
									'iPhone',
									'iPod',
								].includes(navigator.platform) ||
								// iPad on iOS 13 detection
								(navigator.userAgent.includes('Mac') &&
									'ontouchend' in document)
							);
						}

						if (iOS()) {
							$('[data-wrap-scroll]').addClass('ios-scroll');
						}
					}
				}*/
			})
			.catch((err) => {
				console.log(`failed to fetch url (${url}): `, err);
			});
	},
};

export default Modal;
