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
     * @param parameters Object
     */
    sendMessage (eventType, ...parameters) {
        if (this.iframeId) {
            const iframe = document.getElementById(this.iframeId);
            iframe.contentWindow.postMessage(
                JSON.stringify({type: `${this.applicationId}--${eventType}`, ...parameters}),
                '*',
            );
        } else {
            window.parent.postMessage(
                JSON.stringify({type: `${this.applicationId}--${eventType}`, ...parameters}),
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
        window.addEventListener('message', (event) => {
            try {
                const eventData = JSON.parse(event.data);
                if (eventData.type === `${this.applicationId}--${eventType}`) {
                    callback(event.data);
                }
            } catch (e) {
            }
        }, false);
    }
}

module.exports = {EventTypes, Transport};
