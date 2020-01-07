const https = require("https");

function makePatch(newData, key, cc, iteration, completion) {
    let firstGet;
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

    let patchHeader = {
        method: "PATCH",
        hostname: "youngliving.custhelp.com",
        port: null,
        path: `/services/rest/connect/v1.3/answers/${cc}/solution`,
        headers: {
            authorization: key,
            "cache-control": "no-cache",
            "Content-Type": "text/html",
            "Content-Length": ""
        }
    };
   
    //check either triggers failedAuth or creatFullPatch
    function getRequest() {
        const req = https.request(getHeader, (res) => {
            let response = '';
            res.setEncoding("utf-8");
            res.on("data", (chunk) => {
                response += chunk;
            });
            res.on("end", () => {
                const parsedResponse = JSON.parse(response);
                if (parsedResponse.status == 401) {
                    failedAuth();
                    //wasSubmitted = false;
                    return
                } else {
                    const parsedSolution = parsedResponse.solution;
                    firstGet = parsedSolution;
                    createFullPatch(parsedSolution, newData);
                }
            });
        });
        
        req.on("err", (err) => {
            console.log(`Error: ${err.message}`);
            throw err;
        });

        req.end();
    };
    
    //Takes the current information (string) and adds the newData
    //returns a the full page as JSON
    function createFullPatch(string, newData) {
        const fullPatch = newData + string;
        const jsonData = JSON.stringify(fullPatch);
        return patchRequest(jsonData);
    };
    
    //Writes the new page, then ideally runs secondGet after the req.write is done
    function patchRequest(jsonData) {
        patchHeader.headers["Content-Length"] = Buffer.byteLength(jsonData);
        
        const req = https.request(patchHeader, res => {
            response = '';
            res.setEncoding("utf-8");
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                secondGet(firstGet);
            });
        });
        req.write(jsonData, encoding='utf8');
        req.on("err", (err) => {
            console.log(`Error: ${err.message}`);
            throw err;
        });
        req.end();
    };

    //Pulls the page again and compares what should have been posted to what's really there
    //Returns a successMessage or failedToPost
    //Sometimes it runs before patchRequest finishes req.write, which creates a false error
    function secondGet(value) {
        const req = https.request(getHeader, (res) => {
            let response = '';
            res.setEncoding('utf-8');
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                const parsedResponse = JSON.parse(response);
                const parsedSolution = parsedResponse.solution;
                if (newData + value == parsedSolution) {
                    //wasSubmitted = true;
                    if (completion == 1) {
                        successMessage();
                    } else {
                        nextPost(iteration);
                    }
                } else {
                    failedToPost();
                    //wasSubmitted = false;
                }
            });
        });

        req.on('err', (err) => {
            console.log(`Error: ${err.message}`);
            throw err;
        });
        req.end();
    };

    //this starts the chain
    getRequest();
};