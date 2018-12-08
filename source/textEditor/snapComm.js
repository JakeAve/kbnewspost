//Only shows the Send SnapComm button if snapcom is selected
document.querySelector('#snapCheck').addEventListener('change', () => {
    const checkBox = document.querySelector('#snapCheck');
    const btn = document.querySelector('#snapbtn');
    checkBox.checked ? btn.classList.add('showBtn') : btn.classList.remove('showBtn');
})

//Opens in a new tab
function makeSnapComm() {
    const snapCode = formatSnap();
    copySnapText(snapCode);
}

//Copies the code using the hidden text area
function copySnapText(code) {
    const hiddenTextBox = document.querySelector('#hiddenTxtArea');
    hiddenTextBox.value = code;
    hiddenTextBox.focus();
    hiddenTextBox.select();
    document.execCommand('copy');
    snapCopied();
}

//combines all the parts of the snapcomm
function formatSnap(code) {
    const head = snapHead()
    const body = snapBody()
    const snapCode = `${head}\n\n<!--cut and paste everything below this line into the body-->\n\n${body}`;
    return snapCode
}

//makes the snaphead 
function snapHead() {
    const h = document.querySelector('#headline').value;
    //This checks if the Updated check is checked to determine how to send the header
    const head = `<div><h1 class="designer-title">${ document.querySelector('#updateCheck').checked ? h + '<font color="#ff0000"> - UPDATED</font></b>' : h }</h1>\n</div>`;
    return head
}

//takes everything after the second line of #fullHTML and adds a US date stamp
function snapBody() {
    const fullHtml = document.querySelector('#fullHTML').value;
    const secondLine = fullHtml.search(/[\r\n]/);
    const content = fullHtml.slice(secondLine).replace(/<p>/g, '<p class="designer-normal">').replace(/<hr>/g, '').trim();
    const timeStamp = formatTimeAndDate('1717');
    const foot = `\n<p class="designer-normal" style="text-align: center; font-family:Avenir; font-size: 10pt;">${timeStamp[0]}<br>\nHow helpful was this Snap? <a href=https://docs.google.com/forms/d/e/1FAIpQLSfpjeLDtCcPMjTsll4biJO0JaKdbEjhRMM3dFnZc8dwPeodbw/viewform target="_blank">Tell us here!</a>\n<br>`;
    const body = content + foot;
    return body
}

function snapCopied() {
    dialog.showMessageBox({
        type: 'info',
        title: 'SnapCode Copied!',
        buttons: ['Yes', 'No'],
        message: 'The code for the SnapComm is copied in the clipboard. Do you want to open SnapComm in the browser?'
    }, resp => {
        if (resp === 0) {
            shell.openExternal('http://snapcomm.yleo.us/manager/#/real-login/');
        }
      })
}