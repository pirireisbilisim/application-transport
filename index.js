const EventTypes = {
    POINT_SELECTED: 'POINT_SELECTED',
};

class Transport {
    constructor(id) {
        this.iframeId = id;
    }

    sendMessage (...data) {
        const iframe = document.getElementById(this.iframeId);
        iframe.contentWindow.postMessage(
            {type: 'coordinates', ...data},
            appUrl,
        );

    }

    subscribeToMessages(onMessage) {
        window.addEventListener('message', onMessage, false);
    }
}

module.exports = {EventTypes, Transport}
