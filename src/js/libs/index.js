import lazyload from './lazyload';
import mask from './mask';
import sal from './sal';
import counter from './counter';

export default {
	init() {
		lazyload.init();
		mask.init();
		sal.init();
		counter.init();
	},
};
