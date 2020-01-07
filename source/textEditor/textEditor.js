//The preview shows on every keyup inside the headline and content
document.querySelector('#headline').addEventListener('keyup', showPostPreview);
document.querySelector('#content').addEventListener('keyup', showPostPreview);

//The #fullHTML takes its information from the formatPost function, not the #content div directly. 
//The preview and final code are all based off the #fullHTML.
function showPostPreview() {
    document.querySelector('#fullHTML').value = formatPost();
    document.querySelector('#preview').innerHTML = document.querySelector('#fullHTML').value;
    //document.querySelector('#nothing').value = document.querySelector('#content').innerHTML;
    aTagBlank();
    return formatPost()
};

//returns the headline combined with the post
function formatPost() {
    const h = document.querySelector('#headline').value;
    const c = document.querySelector('#content').innerHTML;
    const post = formatHeadline(h) + '\n' + formatContent(c) + '\n<hr>\n';
    return post;
};

//returns the complete header 
function formatHeadline(text) {
    const categories = addCategory();
    const timeStamp = formatTimeAndDate(countryCode);
    const header = `<h4><a id="${timeStamp[1]}" name="${timeStamp[1]}"></a>${text} - ${timeStamp[0]} ${categories}</h4>`;
    return header;
};

//uses the current time to create to return a unique timestamp and unique anchor. 
//The months and timestamp are be modified for each market. 
function formatTimeAndDate(cc) {
    const d = new Date();
    
    const yyyy = `${d.getFullYear()}`;
    const MM = d.getMonth() < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`;
    const dd = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`;
    const hh = d.getHours() < 10 ? `0${d.getHours()}` : `${d.getHours()}`;
    const mm = d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
    const ss = d.getSeconds() < 10 ? `0${d.getSeconds()}` : `${d.getSeconds()}`;
    const aTagId = `${MM}-${dd}-${yyyy}at${hh}-${mm}-${ss}`;
    
    const timeStamp = markets.formatDateFor(d, cc);
    
    const arr = [timeStamp, aTagId];
    return arr;
};

//This function uses regExs to make a text/plain feel, but it's not needed yet
document.querySelector('#content').addEventListener('paste', () => {
    showPostPreview();
    setTimeout(() => {
        document.querySelector('#content').innerHTML = formatContent(removeStyles(document.querySelector('#content').innerHTML));
        showPostPreview();
    }, 1000);
});


//All pastes in #content are text/plain
/*document.querySelector('#content').addEventListener('paste', (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
});*/

//This takes the code from the #content div performs several functions
function formatContent(text) {
    let code = text;
    /*const firstTag = code.search(/<[^font|a|u>|b>|\/]/);
    code = firstTag != -1 ? `<div>${code.slice(0, firstTag)}</div>\n${code.slice(firstTag)}` : `<div>${code}</div>`;*/
    //code = convertToPlain(code);
    code = removeStyles(code);
    code = deleteMSOfficeTags(code);
    code = fixLists(code);
    //code = fixRedFontGlitches(code)
    code = deleteEmptyDivs(code);
    code = reduceHeadings(code);
    code = divsToPs(code);
    code = makePretty2(code);
    return code.trim();
};

//takes out common glitches
function deleteEmptyDivs(empty) {
    return empty.replace(/<div><\/div>|<div>\n<\/div>|<div>\n<br>\n<\/div>|<p><\/p>|<p>\n<\/p>|<p>\n<br>\n<\/p>|\n+/g, '');
};

//fix lists and images
function fixLists(lists) {
    return lists.replace(/<p>\n<ul>/g, '<ul>').replace(/<\/p>\n<\/div>/g, '</ul>').replace(/<p>\n<ol>/g, '<ol>').replace(/<\/p>\n<\/div>/g, '</ol>').replace(/<p>\n<img/g, '<img').replace(/;"><\/p>/g, ';">');
};

//removes any double 
function deleteMSOfficeTags (officeGarbage) {
    return officeGarbage.replace(/o:p>/gi, 'p>');
};
//this makes everything a p instead of a div. Could use more testing and a better regEx
function divsToPs(divs) {
    return divs.replace(/div>/g, 'p>');
};

//found this on stack overflow
function convertToPlain(rtf) {
    rtf = rtf.replace(/\\par[d]?/g, '');
    return rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, '').trim();
};

//removed span tags and several types of attributes also takes out pesky comments, brs and hrs
function removeStyles(code) {
    //const bad = /<\/span>|<span[^]+?>|\s+(style|class|id|dir|data-ft|rel|data-lynx-mode|data-lynx-uri)=".*?"|<!--.*-->|<br>|<hr>/igm;
    //const bad = /<\/span>|<span[^]+?>|\s+(style|class|id|dir|data-ft|rel|data-lynx-mode|data-lynx-uri|)="(?!width:.*%).*?"|<!--.*-->|<br>|<hr>/igm;
    const bad = /<\/span>|<span[^]+?>|\s+(style|class(?!="redWarning")(?!="tlOnly")|id|dir|data-ft|rel|data-lynx-mode|data-lynx-uri|)="(?!width:.*%).*?"|<!--.*-->|<br>|<hr>/igm;
    const noStyle = code.replace(bad, '');
    return noStyle.trim();
};

//adds newlines after new opening tags
function makePretty(ugly) {
    //const tags = /<\/*(div|ul|ol|li|p|h[1-6])>\s*</g;
    const tags = /<\/*(div|ul|ol|li|p|h[1-6]).*?>\s*</g;
    //const tags = /<.*?><|<\/.*?></g;
    let match;
    while ((match = tags.exec(ugly)) !== null) {
        ugly = ugly.slice(0, (tags.lastIndex - 1)) + '\n' + ugly.slice((tags.lastIndex - 1));
    };
    const pretty = ugly.replace(/\n+/g, '\n');
    return pretty;
};

//make pretty 2 is to be simpler
function makePretty2(ugly) {
    return ugly.replace(/<(?!\/)/g, '\n<');
};

//as intended
function fixRedFontGlitches(code) {
    const glitch = /(<br>|<\/font>)\n/g;
    const fixed = code.replace(glitch, '');
    return fixed;
};

//makes sure that any h tag is changed to h5
function reduceHeadings(code) {
    const headings = /<h[1-6]/g;
    const reduced = code.replace(headings, '<h5');
    return reduced;
};

function makeBold() {
    document.execCommand('bold', true);
    showPostPreview();
};

function makeUnderline() {
    document.execCommand('underline', true);
    showPostPreview();
};

function makeRed() {
    document.execCommand('foreColor', true, '#ff0000');
    showPostPreview();
};

function removeRed() {
    document.execCommand('foreColor', true, '#000000');
    colorShift();
    showPostPreview();
};

//temporarily changes the color of the color change icon
function colorShift() {
    const red = document.querySelector('#red');    
    red.style.color = '#000000';
    setTimeout(() => {
        red.style.color = '#ff0000';
    }, 1000);
};

function makeUL() {
    document.execCommand('insertUnorderedList', true);
    showPostPreview();
};

function makeOL() {
    document.execCommand('insertOrderedList', true);
    showPostPreview();
};

//makes the link and makes it open in new window
function makeLink(url, text) {
    const selection = document.getSelection();
    document.execCommand('createLink', true, url);
    selection.anchorNode.parentElement.target = '_blank';
    selection.anchorNode.parentElement.innerHTML = text;
    showPostPreview();
};

function makeImg(url, width) {
    document.execCommand('insertImage', true, url);
    const img = document.querySelector(`img[src="${url}"]`);
    img.style.width = `${width}%`;
    showPostPreview();
};

function addRedWarning() {
    const HTML = `\n<p class="redWarning">&#9888; Do not share this information until after the official announcement is made on the 2nd!</p>\n<p>After the warning</p>`;
    document.execCommand('insertHTML', true, HTML);
    showPostPreview();
};

function addTLOnly() {
    const HTML = `
    \n<rn:answer_section title="YL Manager, YL Internal" access="4,3">
	<p class="tlOnly">
		<p style="font-weight: bold">TEAM LEAD</p>
		<p>TEXT GOES HERE</p>
	</p>
    </rn:answer_section>
    \n<p>After the TL</p>`;
    document.execCommand('insertHTML', true, HTML);
    showPostPreview();
};

//toggle between the ABC and </> windows
function editCode(id) {
    id.classList.add('selectedswitch');
    id.previousElementSibling.classList.remove('selectedswitch');
    document.querySelector('#fullHTML').style.display = 'block';
    document.querySelector('#content').style.display = 'none';
};

function editText(id) {
    id.classList.add('selectedswitch');
    id.nextElementSibling.classList.remove('selectedswitch');
    document.querySelector('#content').style.display = 'block';
    document.querySelector('#fullHTML').style.display = 'none';
};

//this adds the icons for the headers
function addCategory() {
    const list = document.querySelector('#headicons');
    const titles = [];
    const srcs = [];
    let updated
    for (let i = 0; i < list.length; i ++) {
        if (list[i].checked) {
            if (list[i].previousElementSibling.title) {
                titles.push(list[i].previousElementSibling.title);
                srcs.push(list[i].previousElementSibling.src);
            } else {
                updated = true;
            }
        }
    }
    //This is special formatting for the -Updated button
    let output = updated ? '<font color="#ff0000">- UPDATED</font></b>' : '';
    titles.forEach((val, i) => {
        output += `<img src="${srcs[i]}" title="${val}" alt="${val}" style="margin-left: 5px;">`;
    });
    return output
};

//checkboxes have an event listener that triggers ShowPostPreview
const checkBoxes = document.querySelectorAll('#headicons input[type=checkbox]');
for (let i = 0; i < checkBoxes.length; i ++) {
    checkBoxes[i].addEventListener('change', showPostPreview);
};

//Opens all link the the native browser. Shell is defined in index.js
document.querySelector('#preview').addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() == 'a') {
        e.preventDefault();
        shell.openExternal(e.target.href);
    }
});

//This adds _blank to all links and underlines them without it being stripped because of styling
function aTagBlank() {
    const aTags = document.querySelectorAll('A');
    aTags.forEach((tag) => {
        tag.target='_blank';
        tag.innerHTML = tag.innerHTML.includes('<u>') ? tag.innerHTML : `<u>${tag.innerHTML}</u>`;
    })
};
