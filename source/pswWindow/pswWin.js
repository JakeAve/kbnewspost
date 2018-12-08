const {ipcRenderer} = require('electron')
const {dialog} = require('electron').remote
const markets = require('../countrySwitch/markets.js')

//check for internet connection
const alertOnlineStatus = () => {
    if (navigator.onLine == false) {
        dialog.showMessageBox( {type: 'error', title: 'No Connection', message: 'You are not connected to the internet. Please connect to the internet and re-open the program.'} )
    }
}
window.addEventListener('offline',  alertOnlineStatus)
alertOnlineStatus();

//makes the post as long as it is not submitted
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const key = getKey();
    checkAuth(key);
})

//retuns the password and username to base 64
function getKey() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#pass').value;
    const key = `Basic ${btoa(username + ':' + password)}`;
    document.querySelector('#pass').value = '';
    return key;
}

function invalidCountryCode() {
    dialog.showMessageBox( {type: 'error', title: 'Invalid Market Code', message: 'The market code was invalid. Contact a KBase Admin for your market code.'} )
}

function failedAuth() {
    dialog.showMessageBox( {type: 'error', title: 'Check Credentials', message: 'Check your username and password.'} )
}

function otherFailure() {
    dialog.showMessageBox( {type: 'error', title: 'Failed to Connect', message: 'Something went wrong. If the problem continues, contact a KBase Admin.'} )
}



function saveData(key) {
    const username = document.querySelector('#username').value;
    const countryCode = document.querySelector('#countryCode').value;
    const cc = markets.authenticate(countryCode);
    if (cc) {
        ipcRenderer.send('save-data', key, username, cc)
    } else invalidCountryCode()
}