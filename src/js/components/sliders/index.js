import SliderMain from './slider-main';
import SliderInfo from './slider-info';
import SliderStrategy from './slider-strategy';
import Tabs from './tabs';
import SliderDocs from './slider-docs';
import SliderTeam from './slider-team';
import SliderTabs from './slider-icon-tabs';
import './slider-logos';
import './slider-period';
import './slider-press';
import SliderComment from './slider-comment';
import './slider-photo';
import './slider-similar';
import './slider-facilities';


export default {
	init() {
		new SliderStrategy();
		new SliderMain();
		new SliderInfo();

		Tabs.init();
		SliderDocs.init();
		SliderTeam.init();
		SliderTabs.init();
		SliderComment.init();
	},
};
