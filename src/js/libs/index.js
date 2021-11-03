import lazyload from './lazyload';
import mask from './mask';
import sal from './sal';
import counter from './counter';

export default {
	init() {
		require('./jquery.inputmask.bundle');
		require('./jquery.inputmask-multi');

		lazyload.init();
		mask.initMask();
		sal.init();
		counter.init();
	},
};
