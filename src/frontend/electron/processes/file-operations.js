const {
  ipcMain,
  IpcMessageEvent
} = require('electron');
const {
  dialog
} = require('electron');
const recursive = require("recursive-readdir");
const path = require('path');
const fs = require('fs')

ipcMain.on('show-file-upload', (event, fileTypes) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [{
        'name': 'Media',
        'extensions': fileTypes
      },
      {
        'name': 'All Files',
        'extensions': ['*']
      }
    ]
  }, (files) => {
    if (files) {
      event.sender.send('files', files); // Sends all the files back to the application
    }
  })
});

ipcMain.on('show-folder-upload', (event, fileTypes) => {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, (folders) => {
    if ((!folders) || (folders.length === 0)) {
      return;
    }
    const ignoreFunc = (file, stats) => {
      // `file` is the path to the file, and `stats` is an `fs.Stats`
      // object returned from `fs.lstat()`.
      if (fileTypes) {
        return !fileTypes.includes(path.extname(file).split('.')[1]) &&
          !stats.isDirectory(); // Checks to match the fileType
      } else {
        return false;
      }
    }
    const files = [];
    folders.forEach(folder => {
      recursive(folder, [ignoreFunc], (err, filesFound) => {
        for (let index = 0; index < filesFound.length; index++) {
          const file = filesFound[index];
          files.push(file);
        }
        event.sender.send('files', files); // Sends all the files back to the application
      });
    });
  })
});

ipcMain.on('save-state', (event, data) => {
  var savePath = dialog.showSaveDialog({});
  fs.writeFile(`${savePath}.statefile`, data, function (err) {
    // file saved or err
  });
})

ipcMain.on('load-state', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      'name': 'State File',
      'extensions': ['statefile']
    }, ]
  }, (files) => {
    if (files) {
      const filePath = files[0];
      fs.readFile(filePath, (err, data) => {
        event.sender.send('state-data', data.toString());
      })
    }
  })
});

function ignoreFunc(file, stats) {
  return stats.isDirectory() && path.basename(file) == "test";
}
