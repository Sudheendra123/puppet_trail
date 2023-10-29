const { contextBridge, ipcRenderer, clipboard } = require('electron');

// Expose ipcRenderer to the renderer process
contextBridge.exposeInMainWorld('ipcRenderer', {
    on: (channel, listener) => {
        ipcRenderer.on(channel, listener)
    },
    send: ipcRenderer.send,
});

contextBridge.exposeInMainWorld('electron', {
    clipboard: {
        writeText: (text) => {
            clipboard.writeText(text)
        },
    }

});
