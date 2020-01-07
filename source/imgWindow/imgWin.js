const {ipcRenderer} = require('electron')
const {dialog} = require('electron').remote

//prevents the img from being made unless both fields are filled
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const urlVal = document.getElementById('imgUrlInput').value;
    const sizeVal = document.querySelector('#size').value;
    const size = sizeVal > 100 ? 100 : sizeVal < 0 | sizeVal == '' ? 50 : sizeVal;
    if (urlVal == '') {
        dialog.showMessageBox( {type: 'error', title: 'Oops!', message: 'You need to enter a valid URL. Otherwise, close the window.'} )
    } else {
        ipcRenderer.send('img-data', urlVal, size)
    }
})
