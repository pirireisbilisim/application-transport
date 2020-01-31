module.exports = {
    sendMessage: (iframeRef, appUrl, coordinates, sources) => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(
                {type: 'coordinates', value: coordinates, sources: sources ? sources : ""},
                appUrl,
            );
        }
    },

    getMessage: (ev) => {
        ev.addEventListener('message', function(event) {
            return event.data;
        }, false);
    }
};
