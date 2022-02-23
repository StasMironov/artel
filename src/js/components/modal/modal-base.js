import MicroModal from 'micromodal';
import PerfectScrollbar from 'perfect-scrollbar';
import { debounce } from 'throttle-debounce';

export default class ModalBase {
	constructor(props) {
		this.initial = props.init;
		this.trigger = props.trigger;
		this.closeTrigger = props.closeTrigger;
		this.openClass = props.openClass;
		this.id = props.id;

		if (this.initial) {
			this.init();
		}
	}

	onShow(modal) {
		// window._disableScroll();
		window.dispatchEvent(new CustomEvent('modal.open'));
		// window.ps.update();
	}

	onClose(modal) {
		// window._enableScroll();
		window.dispatchEvent(new CustomEvent('modal.close'));
	}

	init() {
		//	const btnClose = document.querySelectorAll(this.closeTrigger);

		if (typeof this.id == 'undefined') return;

		const wrapNode = document.querySelector('.' + this.id);

		if (!wrapNode) return;

		const scrollNode = wrapNode.querySelector('[data-modal-ps]');

		

		if (!scrollNode) return;

		MicroModal.init({
			openTrigger: this.trigger,
			closeTrigger: this.closeTrigger,
			openClass: this.openClass,
			disableFocus: false,
			awaitOpenAnimation: true,
			awaitCloseAnimation: true,
			debugMode: true,
			disableScroll: false,
			onShow: (modal) => {
				
				// this.onShow(modal);
				if (scrollNode) {
					this.ps  = new PerfectScrollbar(scrollNode, {
						wheelSpeed: 2,
						wheelPropagation: true,
						minScrollbarLength: 20,
						suppressScrollX: true
					});

					

					window.addEventListener(
						'resize',
						debounce(100, () => {
							this.ps.update();
						})
					);
				}

				window._disableScroll();
				
				setTimeout(()=>{
					console.log($('header'));
					$('.header').addClass('show-header');
				}, 100);
			},
			onClose: (modal) => {
				this.onClose(modal);
				$('.header').removeClass('show-header');
				window._enableScroll();
			},
		});

		

		// if (this.id === 'modal-warning') {
		// 	let state = 0;

		// 	$(`#${this.id}`).addClass('is-warning');
		// 	setTimeout(() => {
		// 		if (localStorage.getItem('popupWarning') != true) {
		// 			MicroModal.show(this.id);
		// 			localStorage.setItem('popupWarning', 1);
		// 			window._disableScroll();
		// 		}
		// 	}, 1500);

		// 	btnClose.forEach((elem, index) => {
		// 		elem.addEventListener('click', () => {
		// 			MicroModal.close(this.id);
		// 			window._enableScroll();
		// 		});
		// 	});

		// 	window.onbeforeunload = function () {
		// 		localStorage.removeItem('popupWarning');
		// 		return null;
		// 	};
		// }
	}
}
