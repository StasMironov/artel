import MicroModal from 'micromodal';
import Plyr from 'plyr';

const Modal = {
	init() {
		this.ajaxSetup();

		const video = document.querySelector('[data-video]');
		const trigger = document.querySelector('[data-modal-video]');

		if (!video || !trigger) return;

		const palyer = new Plyr(video, {});

		MicroModal.init({
			openTrigger: 'data-modal-video',
			closeTrigger: 'data-modal-close',
			openClass: 'is-open',
			disableFocus: false,
			awaitOpenAnimation: true,
			awaitCloseAnimation: true,
			debugMode: false,
			disableScroll: false,
			onShow: (modal) => {
				palyer.play();
				window._disableScroll();
				setTimeout(()=>{
					//console.log($('header'));
					$('.header').addClass('show-header mf-index');
				}, 100);
			},
			onClose: (modal) => {
				palyer.stop();
				$('.header').removeClass('show-header mf-index');
				window._enableScroll();
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
			});
		});
	},
};

export default Modal;
