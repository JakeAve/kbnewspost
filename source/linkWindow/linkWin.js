const {ipcRenderer} = require('electron')
const {dialog} = require('electron').remote

//Receives the selected text from main from index
//puts the text in the #textInput
ipcRenderer.on('link-text', (e, text) => {
    document.querySelector('#textInput').value = text;
})

//This prevents the link from being made unless both fields are filled
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const urlVal = document.querySelector('#urlInput').value;
    const textVal = document.querySelector('#textInput').value;
    if (urlVal == '' || textVal == '') {
        dialog.showMessageBox( {type: 'error', title: 'Oops!', message: 'You need to enter a valid URL and link. Otherwise, close the window.'} )
    } else {
        ipcRenderer.send('link-data', urlVal, textVal)
    }
})