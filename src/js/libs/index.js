import lazyload from './lazyload';
import mask from './mask';
import sal from './sal';

export default {
	init() {
		lazyload.init();
		mask.init();
		sal.init();
	},
};
