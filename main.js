// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain, dialog} = require('electron')
const nodemailer = require('nodemailer')
const markets = require('./source/countrySwitch/markets.js')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//These variables are used thoughout the app

let key
let username

var wasSubmitted = false
let sessionTime

//These are the different windows
let mainWindow
let splash
let pswWin
let smtWin
let linkWin
let imgWin
let prevWin
let helpWin

//The splash is created when the app opens. 
//It is created after the password and  closed when the mainWindow is ready
function createSplashWindow() {
  splash = new BrowserWindow({width: 350, height: 350, frame: false, show: false})
  splash.loadFile('source/splashScreen/splashScreen.html')

  splash.on('close', () => {
    splash = null;
  })
}

const template = [
  {
    label: 'File',
    submenu: [
      /*{role: 'save'}, For another day
      {role: 'open'},
      {role: 'open'},
      {type: 'separator'},*/
      {
        label: 'Lock/Change Market',
        click() {
          pswWin.show()
          mainWindow.hide()
        }
      },
      {role: 'quit'}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'}
    ]
  },
  {
    label: 'Help',
    submenu: [
      {role: 'reload'},
      {
        label: 'How to Use',
        click() { createHelpWin() }
      },
      {role: 'toggledevtools'}
      //{role: 'minimize'}
    ]
  },
  {
    label: 'Version',
    submenu: [
      {
        label: `${app.getVersion()}`
      }
    ]
  }
]

//This is the main text editor window. It is created after the password is entered
function createMainWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow( {show: false} )

  // and load the index.html of the app.
  mainWindow.loadFile('source/index.html')

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.maximize()
    mainWindow.show()
    if (splash) {splash.close()}

  })
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    app.quit();
  })
}

//User enters country code, username and psword. Triggers the mainWin and splash
function createPswWindow() {
  if (pswWin) {
    if (pswWin.isMinimized()) {
      pswWin.restore();
    }
    pswWin.focus();
  } else {
    pswWin = new BrowserWindow({width: 350, height: 400, title: 'Login'})
    pswWin.loadFile('source/pswWindow/pswWin.html')
  }

  pswWin.setMenu(null)

  pswWin.on('close', () => {
    pswWin = null;
    app.quit();
  })
}

//If the credentials are correct, the key and cc are received from the pswWin
//This function also sets the app to require a password every 15 minutes
ipcMain.on('save-data', (e, auth, un, cc) => {
  key = auth;
  username = un;
  if (splash) {splash.show()}
  pswWin.hide()
  //if the window is already created, shows the window. Otherwise, makes new window
  if (mainWindow) {
    mainWindow.show()
    mainWindow.maximize()
    mainWindow.webContents.send('country-code', cc, cc == '1717' ? true : false)
  } else {
    createMainWindow()
    mainWindow.webContents.on('dom-ready', () => {
      mainWindow.webContents.send('country-code', cc, cc == '1717' ? true : false)
    })
  }
  //15 minute session time
  clearInterval(sessionTime)
  sessionTime = setTimeout(() => {
    pswWin.show()
    mainWindow.hide()
  }, 1000 * 60 * 15)
})

//the smtWin actually sends the post to the API
function createSmtWindow() {
  if (smtWin) {
    if (smtWin.isMinimized()) {
      smtWin.restore();
    }
    smtWin.focus();
  } else {
    smtWin = new BrowserWindow({width: 250, height: 250, title: 'Submit Post', frame: false})
    smtWin.loadFile('source/smtWindow/smtWin.html')
  }
  
  //smtWin.setMenu(null)
  
  smtWin.webContents.on('dom-ready', () => {
    if (wasSubmitted == false) {
      mainWindow.webContents.send('next-post', 0)
    } else {
      dialog.showMessageBox( {type: 'error', title: 'Already Posted!', message: 'You already posted this update!'} )
    }
  })
  
  smtWin.on('close', () => {
    smtWin = null;
  })
}

//The smtWin is created by clicking the post button on the mainWindow
ipcMain.on('open-smt-window', () => {
  clearTimeout(sessionTime)
  createSmtWindow()
})

//Gets data from the mainWin for each country

ipcMain.on('post-data', (e, post, pageNumber, i, length) => {
  if (smtWin) {
    smtWin.webContents.send('post-data', post, key, pageNumber, i, length)
  } else {
    dialog.showMessageBox( {type: 'error', title: 'Failed to Post', message: 'Post was not completed. If this problem persists, contact a KBase Admin. (Error 12)'} )
  }
})

ipcMain.on('ready-for-next-post', (e, i) => {
  mainWindow.webContents.send('next-post', i)
})

//This variable allows the user to submit again, if a post did not go through
ipcMain.on('was-submitted-false', () => {
  wasSubmitted = false;
})

//the smtWin is closed on an error
ipcMain.on('close-smt-for-error', () => {
  smtWin.close()
})

//This pulls all the newsfeed from the page and lets the user
//Keep the post or undo the post. There is also a link to let
//the user open the page on their web browser
function createprevWin() {
  prevWin = new BrowserWindow({title: 'Preview Page', height: 800})
  prevWin.loadFile('source/prevWindow/prevWin.html')

  prevWin.setMenu(null)

  prevWin.webContents.on('dom-ready', () => {
    prevWin.webContents.send('new-post-data', key)
    mainWindow.webContents.send('request-all-countries')
  })

  prevWin.on('close', () => {
    prevWin = null;
  })
}

//on a successful post, the smtWin is closed and the prevWin is created
//Also sends an email to notify administators
ipcMain.on('post-success', () => {
  smtWin.close()
  createprevWin()
})

ipcMain.on('send-all-countries', (e, ccs, newPost) => {
  prevWin.webContents.send('send-all-countries', ccs)
  //sendEmail(username, ccs, newPost)
})

//This is the last prompt of the process
//The user can either leave the application or work/edit a post
ipcMain.on('finish-prev', () => {
  prevWin.close()
  dialog.showMessageBox({
    type: 'info',
    title: 'Wait!',
    buttons: ['Continue working on a post', 'Close the application'],
    message: 'What would you like to do?',
}, resp => {
    if (resp === 1) {
      app.quit()
    }
  })
})

//create the how to use window
function createHelpWin() {
  if (helpWin != null) {
    if (helpWin.isMinimized()) {
      helpWin.restore();
    }
    helpWin.focus();
  } else {
    helpWin = new BrowserWindow({})
    helpWin.loadFile('source/helpWindow/helpWin.html')
  }

  helpWin.setMenu(null)

  helpWin.on('close', () => {
    helpWin = null;
  })
}

//sends an email to our accounts when an update is posted
function sendEmail(username, ccs, newPost) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'younglivingccd@gmail.com',
      pass: 'Young123'
    }
  });

  function getLinks() {
    let links = '';
    for (let i = 0; i < ccs.length; i ++) {
      links +=  `${markets.getCountryName(ccs[i])} https://youngliving.custhelp.com/app/answers/detail/a_id/${ccs[i]} <br>`
    }
    return links
  }

  const mailOptions = {
    from: '"KBase News Post" <younglivingccd@gmail.com>',
    to: 'kbnewsupdates@younglivingeo.onmicrosoft.com',
    subject: `News Post added on ${ccs.length == 1 ? 'page' : 'pages'} ${ccs} by ${username}`,
    html: newPost + `Posted by ${username} to:<br>${getLinks()}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      //console.log(error);
    } else {
      //console.log('Email sent: ' + info.response);
    }
  })
}

//This is opened on the mainWin. Allows user to create a link.
function createLinkWin(text) {
  if (linkWin) {
    if (linkWin.isMinimized()) {
      linkWin.restore();
    }
      linkWin.focus();
  } else {
    linkWin = new BrowserWindow({width: 350, height: 300, title: 'Insert Link'})
    linkWin.loadFile('source/linkWindow/linkWin.html')
  }

  linkWin.setMenu(null)

  //sends the selected text from mainWin to linkWin
  linkWin.webContents.on('dom-ready', (e) => {
    linkWin.webContents.send('link-text', text)
  })

  linkWin.on('close', () => {
    linkWin = null;
  })
}

//receives the selected text for the link from mainWin
ipcMain.on('open-link-window', (e, text) => {
  createLinkWin(text);
})

//sends all the data for a link to mainWin
ipcMain.on('link-data', (e, url, text) => {
  mainWindow.webContents.send('link-data', url, text)
  linkWin.close()
})

//This is opened on the mainWin. Allows user to create an image.
function createImgWin() {
  if (imgWin) {
    if (imgWin.isMinimized()) {
      imgWin.restore();
    }
    imgWin.focus();
  } else {
    imgWin = new BrowserWindow({width: 350, height: 300, title: 'Insert Image'})
    imgWin.loadFile('source/imgWindow/imgWin.html')
  }

  imgWin.setMenu(null)

  imgWin.on('close', () => {
    imgWin = null;
  })
}

//opens the imgWin when user selects the button on the mainWin
ipcMain.on('open-img-window', () => {
  createImgWin();
})

//sends the data from the imgWin to mainWin to make an image
ipcMain.on('img-data', (e, url, size) => {
  mainWindow.webContents.send('img-data', url, size)
  imgWin.close()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createPswWindow()
  createSplashWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createPswWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
