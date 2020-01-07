const {ipcRenderer} = require('electron')
const {dialog} = require('electron').remote
const {shell} = require('electron')
const markets = require('../countrySwitch/markets.js')

let newPost;
let key;
let length;

//this runs when the page loads
ipcRenderer.on('new-post-data', (e, auth) => {
    key = auth;
})

//creates the html on the page
ipcRenderer.on('send-all-countries', (e, arr) => {
    length = arr.length;
    makeElements(arr)
    makeCalls(arr)
})

//creates the dom for the page
function makeElements(arr) {
    let btns = ''
    for (let i = 0; i < arr.length; i ++) {
        btns += tabButton(arr[i])
    }

    let divs = '';
    for (let i = 0; i < arr.length; i ++) {
        divs += previewDiv(arr[i])
    }
    
    document.querySelector('.tabs-list').innerHTML = btns;
    document.querySelector('#previews-container').innerHTML = divs;
    document.querySelector('.tab-buttons').classList.add('selected');
    document.querySelector('.preview-container').classList.add('open');
}

//gets each page's feed
function makeCalls(arr) {
    for (let i = 0; i < arr.length; i ++) {
        renderPreview(arr[i])
    }
}

//sends the undo request to undo js
function undo(id) {
    const current = document.getElementById('final-post-preview-' + id).innerHTML;
    document.getElementById('final-post-preview-' + id).innerHTML = loadingScreen;
    compileUndo(current, id)
}

//runs the undo func then removes the undo btn from the DOM
function undoSuccess() {
    dialog.showMessageBox( {type: 'none', title: 'Success!', message: 'The post was removed from the page.'} )
    const undobtn = document.querySelector('#undobtn');
    undobtn.parentNode.removeChild(undobtn);
}

//if the undo does not match the final get
function undoError() {
    dialog.showMessageBox( {type: 'error', title: 'Oops!', message: 'Could not undo the post. Please contact a KBase admin for help.'} )
}

function alreadyError() {
    dialog.showMessageBox( {type: 'error', title: 'Already Done!', message: 'You already removed the post. Please contact a KBase Admin for help.'} )
}

function finish() {
    ipcRenderer.send('finish-prev')
}

//tab function
function openTab(market, button) {

    const btns = document.querySelectorAll('.tab-buttons')
    for (let i = 0; i < btns.length; i ++) {
        btns[i].classList.remove('selected');
    }

    const divs = document.querySelectorAll('.preview-container')
    for (let i = 0; i < divs.length; i ++) {
        divs[i].classList.remove('open');
    }

    button.classList.add('selected')
    document.getElementById(market).classList.add('open')
}

//the loading animation
const loadingScreen = `
<div class="text-center">Loading the preview...</div>
<div class="sk-cube-grid">
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
</div>`;

//This is the inside of each tab
function previewDiv(id) {
    const div = `
    <div id="${id}" class="preview-container">
        <div class="fixed">
            <button id="undobtn" class="center grey undo-btn" onclick="undo(${id});">Undo ${length > 1 ? `${markets.getCountryName(id)}(${id})`: 'Post'} <i class="fas fa-undo-alt"></i></button>
            <a target="_blank"><button id="new-tab" class="center grey" onclick="shell.openExternal('https://youngliving.custhelp.com/app/answers/detail/a_id/${id}');">View in Kbase <i class="fas fa-external-link-alt"></i></button></a>
            <button id="finish" class="center" onclick="finish();">Finish All <i class="fas fa-check"></i></button>
        </div>
        <div class="preview final-post-preview" id="final-post-preview-${id}">
            ${loadingScreen}
        </div>
    </div>
    `;
    return div
}

function tabButton(id) {
    const btn = `<button class="tab-buttons grey" onclick="openTab(${id}, this)">${markets.getCountryName(id)}</button>`
    return btn
}
