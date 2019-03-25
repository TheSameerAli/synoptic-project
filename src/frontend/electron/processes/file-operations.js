const { ipcMain, IpcMessageEvent } = require('electron');
const { dialog } = require('electron');

ipcMain.on('show-file-upload', (event, fileTypes) => {
    dialog.showOpenDialog({ 
        properties: ['openFile', 'multiSelections'],
        filters: 
        [
            {'name': 'Media', 'extensions': fileTypes},
            {'name':  'All Files', 'extensions': ['*']}
        ]
    }, (files) => {
        if (files) {
            event.sender.send('files', files);
        } 
    })
});

ipcMain.on('show-folder-upload', (event) => {
    dialog.showOpenDialog({ 
        properties: ['openDirectory']
    }, (folders) => {
        if ((!folders) || (folders.length === 0)) {
            console.log(folders);
            return;
        }
        event.sender.send('folders', folders);
    })
});

