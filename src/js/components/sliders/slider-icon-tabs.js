import Swiper from 'swiper/swiper-bundle';

export default {
  init() {

    const wrappers = document.querySelectorAll('[data-slider-icon-tabs]');
    if (!wrappers.length) return;

    for (let i = 0; i < wrappers.length; i++) {
      const sliderNode = wrappers[i].querySelector('[data-slider]');
      if (!sliderNode) continue;

      const options = {
        slidesPerView: 1,
        speed: 800,
        a11y: false,
        loop: false,
        observer: true,
        observeParents: true,
        simulateTouch: true,
        breakpoints: {
          [window.breakpoints.md]: {
            slidesPerView: 2,
          },
        }
      };

      const swiper = new Swiper(sliderNode, options);

      const blocks = wrappers[i].querySelectorAll('[data-tab-block]');
      const tabs = wrappers[i].querySelectorAll('[data-slider-tab]');

      tabs.forEach((tab, tabIdx) => {
        tab.addEventListener('click', () => {
          this.classToggle(tabs, tabIdx);
          this.classToggle(blocks, tabIdx);         
          
          swiper.slideTo(tabIdx, 800);
        });
      });
    }
  },

  classToggle(arr, idx = undefined) {
    arr.forEach((el, elIdx) => {
      if (idx === elIdx) {
        el.classList.add('is-active');
        
      } else {
        el.classList.remove('is-active');
      }
      
    });
  }
}