const {ipcRenderer, remote} = require('electron')
const {dialog} = require('electron').remote
const {shell} = require('electron'); //This is used in the text editor so all links are opened in new tabs
const markets = require('./countrySwitch/markets.js')

//check for internet connection
const alertOnlineStatus = () => {
    if (navigator.onLine == false) {
        dialog.showMessageBox( {type: 'error', title: 'No Connection', message: 'You are not connected to the internet. Be sure to re-connect before posting.'} )
    }
}
window.addEventListener('offline',  alertOnlineStatus)
alertOnlineStatus();

var countryCode = '';

//sets header depending on market
function setHeader(code) {
    const name = markets.getCountryName2(code)
    document.querySelector('#main-title').innerHTML = `Kbase News Post ${name}`;
}

//sets a check to the country that is logged in
function setChecks(code) {
    const arr = document.querySelectorAll('#country-checklist [type=checkbox]');
    for (let i = 0; i < arr.length; i ++) {
        const marketName = arr[i].previousSibling.textContent.trim();
        if (markets.getAnswerIdByName(marketName) == code) {
            arr[i].checked = true;
        } else {
            arr[i].checked = false;
        }
    }
}

//the country code is defined
ipcRenderer.on('country-code', (e, cc, admin) => {
    countryCode = cc;
    setHeader(cc)
    setChecks(cc)
    const adminTools = document.querySelectorAll('.adminTools');
    if (admin) {
        //ADMINISTRATOR ACCESS
        for (let i = 0; i < adminTools.length; i ++) {
            adminTools[i].style.visibility = 'visible';
            adminTools[i].style.height = '';
        }
    } else {
        for (let i = 0; i < adminTools.length; i ++) {
            adminTools[i].style.visibility = 'hidden';
            adminTools[i].style.height = '0';
        }
    }
})

//sends the selected text to main then the linkWin
function linkWindow() {
    const selection = document.getSelection().toString();
    ipcRenderer.send('open-link-window', selection)
}

//triggers the makeLink
ipcRenderer.on('link-data', (e, url, text) => {
    makeLink(url, text)
})

function imgWindow() {
    ipcRenderer.send('open-img-window')
}

//triggers the makeImg
ipcRenderer.on('img-data', (e, url, size) => {
    makeImg(url, size)
})

//Makes sure at least one market is selected
//checks that content is reasonably long enought to be a full post
//Remakes the header and formatting right before posting
function startPost() {
    const selectedMarkets = identifyCCs()
    if (selectedMarkets.length <= 0) {
        dialog.showMessageBox( {type: 'error', title: 'No Markets Selected', message: 'You have not selected any markets to send a post to. Contact a KBase Admin for help.'} )
    } else if (document.querySelector('#content').innerHTML.length < 50 && document.querySelector('#headline').value.length < 3) {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Wait!',
            buttons: ['No. I want to edit it before sending', 'Yes. This post is finished'],
            message: 'This post is not very long. Are you sure you want to send it?',
        }, resp => {
            if (resp === 1) {
                ipcRenderer.send('open-smt-window')
            }
          })
    } else {
        ipcRenderer.send('open-smt-window')
    }
}

//figure out which markets are checked
function identifyCCs() {
    list = document.querySelector('#country-checklist')
    const ccs = [];
    for (let i = 0; i < list.length; i ++) {
        if (list[i].checked) {
            const marketName = list[i].previousSibling.textContent.trim()
            ccs.push(markets.getAnswerIdByName(marketName));
        }
    }
    return ccs;
}

//Sends a specific post by country
function compilePosts(i) {
    const ccs = identifyCCs();
    countryCode = ccs[i];
    const newPost = showPostPreview()
    ipcRenderer.send('post-data', newPost, countryCode, i, ccs.length)
}

//waits for smtWin to be ready before sending the data
ipcRenderer.on('next-post', (e, i) => {
    compilePosts(i)
})

//sends the array of countrues
ipcRenderer.on('request-all-countries', () => {
    const ccs = identifyCCs()
    const newPost = showPostPreview()
    ipcRenderer.send('send-all-countries', ccs, newPost)
})

//This is the contenxt menu. It pulls up on right click
const {Menu, MenuItem} = remote

const ctxmenu = new Menu()

// Build menu one item at a time
ctxmenu.append(new MenuItem ({role: 'copy'}))
ctxmenu.append(new MenuItem ({role: 'paste'}))
ctxmenu.append(new MenuItem({type: 'separator'}))
ctxmenu.append(new MenuItem ({role: 'undo'}))
ctxmenu.append(new MenuItem ({role: 'redo'}))
ctxmenu.append(new MenuItem({type: 'separator'}))
ctxmenu.append(new MenuItem ({
    label: 'Insert Warning',
    click() {
        addRedWarning()
    }
}))
ctxmenu.append(new MenuItem({type: 'separator'}))
ctxmenu.append(new MenuItem ({
    label: 'Make Bold',
    click() {
        makeBold()
    }
}))
ctxmenu.append(new MenuItem ({
    label: 'Underline',
    click() {
        makeUnderline()
    }
}))
ctxmenu.append(new MenuItem ({
    label: 'Make Red',
    click() {
        makeRed()
    }
}))
ctxmenu.append(new MenuItem ({
    label: 'Remove Red',
    click() {
        removeRed()
    }
}))
ctxmenu.append(new MenuItem({type: 'separator'}))
ctxmenu.append(new MenuItem ({
    label: 'Make Unordered List',
    click() {
        makeUL()
    }
}))
ctxmenu.append(new MenuItem ({
    label: 'Make Numbered List',
    click() {
        makeOL()
    }
}))
ctxmenu.append(new MenuItem({type: 'separator'}))
ctxmenu.append(new MenuItem ({
    label: 'Make Link',
    click() {
        linkWindow()
    }
}))
ctxmenu.append(new MenuItem ({
    label: 'Insert Image',
    click() {
        imgWindow()
    }
}))
// Prevent default action of right click in chromium. Replace with our menu.
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if (e.target != document.querySelector('#red')){
        ctxmenu.popup(remote.getCurrentWindow())
    } else {removeRed()}
}, false)
