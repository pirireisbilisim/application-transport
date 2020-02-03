/**
 *
 * @type {{POLYGON: string, POLYLINE: string, POINT: string}}
 */
const EventTypes = {
	POINT: 'POINT',
	POLYLINE: 'POLYLINE',
	POLYGON: 'POLYGON',
};

class Transport {
	/**
	 *
	 * @param iframeId String
	 * @param applicationId String
	 */
	constructor({iframeId, applicationId}) {
		this.iframeId = iframeId;
		this.applicationId = applicationId;
	}

	/**
	 *
	 * @param eventType EventTypes
	 * @param data Object
	 */
	sendMessage(eventType, data) {
		if (this.iframeId) {
			const iframe = document.getElementById(this.iframeId);
			iframe.contentWindow.postMessage(
				{type: `${this.applicationId}--${eventType}`, data},
				'*',
			);
		} else {
			window.parent.postMessage(
				{type: `${this.applicationId}--${eventType}`, data},
				'*',
			)
		}
	}

	/**
	 *
	 * @param eventType EventTypes
	 * @param callback function
	 */
	on(eventType, callback) {
		this.eventType = eventType;
		this.callback = callback;
		window.addEventListener('message', this.getMessage, true);
	}

	removeListener() {
		window.removeEventListener('message', this.getMessage ,true);
	}

	getMessage = (event) => {
		try {
			const eventData = event.data;
			if (eventData.type === `${this.applicationId}--${this.eventType}`) {
				this.callback(event.data.data);
			}
		} catch (e) {
		}
	}
}

module.export = {EventTypes, Transport};
