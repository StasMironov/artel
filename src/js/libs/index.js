import lazyload from './lazyload';
import mask from './mask';
import sal from './sal';
import repeat from './repeat';
import counter from './counter';


export default {
	init() {
		require('./jquery.inputmask.bundle');
		require('./jquery.inputmask-multi');
		require('./steps');

		lazyload.init();
		mask.initMask();
		sal.init();
		repeat.init();
		counter.init();
	},
};
