import SliderMain from './slider-main';
import SliderInfo from './slider-info';
import SliderStrategy from './slider-strategy';
import Tabs from './tabs';
import './slider-logos';
import './slider-press';
import './slider-photo';
import './slider-similar';

export default {
	init() {
		new SliderStrategy();
		new SliderMain();
		new SliderInfo();

		Tabs.init();
	},
};
