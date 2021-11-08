import SliderMain from './slider-main';
import SliderInfo from './slider-info';
import Tabs from './tabs';
import './slider-logos';

export default {
	init() {
		new SliderMain();
		new SliderInfo();
		Tabs.init();
	},
};
