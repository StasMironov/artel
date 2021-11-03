import { Server } from 'miragejs';
import contactUs from '../../public/ajax/contacts/success.json';
import dealers from '../../public/ajax/contacts/success.json';

const requestTime = 1000;

class MirageServer {
	constructor() {
		this.server = null;
	}

	start(environment = 'development') {
		this.server = this.server
			? this.server
			: new Server({
					environment,

					routes() {
						this.post('/ajax/contacts', () => contactUs, {
							timing: requestTime,
						});

						this.get('/ajax/dealers', () => dealers, {
							timing: requestTime,
						});

						// For other requests dont use fake API routes
						this.passthrough();
					},
			  });
	}

	stop() {
		if (this.server) {
			this.server.shutdown();
			this.server = undefined;
		}
	}
}

const server = new MirageServer();

export default server;
