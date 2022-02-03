import Swiper from 'swiper/swiper-bundle';
import gsap from 'gsap';

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
          this.classToggle(blocks, tabIdx, true);         
          
          swiper.slideTo(tabIdx, 800);
        });

      });
    }
  },

  classToggle(arr, idx = undefined, animate = false) {
    arr.forEach((el, elIdx) => {
      if (idx === elIdx) {
        if (animate) {
          gsap.fromTo(el, {
            opacity: 0,
            translateY: 24,
          }, {
            opacity: 1,
            translateY: 0,
            duration: 0.5,
            ease: 'power4.out',
            onStart: () => {
              el.classList.add('is-active');
            }
          });
        }
      } else {
        el.classList.remove('is-active');
      }
    });
  }
}