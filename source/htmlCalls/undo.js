const https = require('https');


//this runs on the page load. It pulls the full html of the answer id.
//Inserts the response into #final-post-preview
function renderPreview(cc) {
    let getHeader = {
        method: "GET",
        hostname: "youngliving.custhelp.com",
        port: null,
        path: `/services/rest/connect/v1.3/answers/${cc}/solution`,        
        headers: {
            authorization: key,
            "cache-control": "no-cache",
        }
    };
   
    const req = https.request(getHeader, (res) => {
        let response = '';
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
            response += chunk;
        });
        res.on("end", () => {
            const parsedResponse = JSON.parse(response);
            const parsedSolution = parsedResponse.solution;
            document.getElementById('final-post-preview-' + cc).innerHTML = parsedSolution;
        });
    });
    
    req.on("err", (err) => {
        console.log(`Error: ${err.message}`);
        throw err;
    });

    req.end();
};

//If everything is fine, it takes the page content and removes the newPost.
//Converts the result to JSON and patches it. 
function compileUndo(current, cc) {
    const endOfPost = current.indexOf('<hr>') + 4;
    const previous = current.slice(endOfPost);
    const jsonData = JSON.stringify(previous);
    patchUndo(jsonData, cc);
};

//This patches a post, re-renders #final-post-preview and updates alreadyUndo to true. 
function patchUndo(jsonData, cc) {
    let patchHeader = {
        method: "PATCH",
        hostname: "youngliving.custhelp.com",
        port: null,
        path: `/services/rest/connect/v1.3/answers/${cc}/solution`,
        headers: {
            authorization: key,
            "cache-control": "no-cache",
            "Content-Type": "text/html",
            "Content-Length": Buffer.byteLength(jsonData)
        }
    };
    
    const req = https.request(patchHeader, res => {
        response = '';
        res.setEncoding("utf8");
        res.on('data', (chunk) => {
            response += chunk;
        });
        res.on('end', () => {
            alreadyUndo = true;
            renderPreview(cc);
            verifyUndo(jsonData, cc);
        });
    });
    req.write(jsonData, encoding='utf8');
    req.on("err", (err) => {
        console.log(`Error: ${err.message}`);
        throw err;
    });
    req.end();
};

//This double check that the post was really taken off.
//It compares the input of patchUndo() with what it finds
function verifyUndo(data, cc) {
    let getHeader = {
        method: "GET",
        hostname: "youngliving.custhelp.com",
        port: null,
        path: `/services/rest/connect/v1.3/answers/${cc}/solution`,        
        headers: {
            authorization: key,
            "cache-control": "no-cache",
        }
    };
   
    const req = https.request(getHeader, (res) => {
        let response = '';
        res.setEncoding("utf-8");
        res.on("data", (chunk) => {
            response += chunk;
        });
        res.on("end", async function() {
            const parsedResponse = JSON.parse(response);
            const parsedSolution = await JSON.stringify(parsedResponse.solution);
            if (parsedSolution == data) {
                undoSuccess()
            } else {
                undoError()
                alreadyUndo = false;
            }
        });
    });
    
    req.on("err", (err) => {
        console.log(`Error: ${err.message}`);
        throw err;
    });

    req.end();
};
