const {ipcRenderer} = require('electron')
const {dialog} = require('electron').remote
const markets = require('../countrySwitch/markets.js')

//receives the data from main
//initiates the post, which is in htmlCalls/mainPatch.js
ipcRenderer.on('post-data', (e, newPost, key, cc, i, length) => {
    document.querySelector('#page-number').innerHTML = `Posting to ${markets.getCountryName(cc)} (${cc})<br>${length > 1 ? `${i + 1}/${length}` : 'One moment please...'}`;
    const completion = (i + 1) / length;
    //makePatch(newPost, key, cc, i, completion)

    //This code is for testing simulates posting there is another part in nextPost
    if (completion == 1) {
        setTimeout(() => {successMessage()}, 1000)
    } else {
        nextPost(i)
    }

})

function nextPost(i) {
    //ipcRenderer.send('ready-for-next-post', i + 1)
    //This code is for testing and simulates a successful post
    setTimeout(() => {ipcRenderer.send('ready-for-next-post', i + 1)}, 1000);
}

function alreadySubmit() {
    ipcRenderer.send('was-submitted-false')
}

function closeSmtForError() {
    ipcRenderer.send('close-smt-for-error')
}

function failedAuth() {
    closeSmtForError()
    dialog.showMessageBox( {type: 'error', title: 'Check Credentials', message: 'Failed to post! Check your username and password.'} )
}

function failedToPost() {
    closeSmtForError()
    dialog.showMessageBox( {type: 'error', title: 'Failed to Post', message: 'Post was not completed. If this problem persists, contact a KBase Admin.'} )
}

//initiates the window close, which will open the prevWin
function successMessage() {
    dialog.showMessageBox( {type: 'none', title: 'Success!', message: 'Post was successful!'} )
    ipcRenderer.send('post-success')
}

function stopAnimation() {
    const x = document.querySelectorAll('.sk-cube');
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = 'none'
    }
}