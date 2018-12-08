const https = require("https");

let get1;

let get2;

function patchNow(code) {

    const content = code;

    const getHeader = {
        method: "GET",
        hostname: "youngliving.custhelp.com",
        port: null,
        path: "/services/rest/connect/v1.3/answers/5654/solution",
        headers: {
            authorization: "Basic amFhdmVyeTpTY2llbmNlMDEwMSE=",
            "cache-control": "no-cache",
        }
    };

    let patchHeader = {
        method: "PATCH",
        hostname: "youngliving.custhelp.com",
        port: null,
        path: "/services/rest/connect/v1.3/answers/5654/solution",
        headers: {
            authorization: "Basic amFhdmVyeTpTY2llbmNlMDEwMSE=",
            "cache-control": "no-cache",
            "Content-Type": "text/html",
            "Content-Length": ""
        }
    };

    function getRequest() {
        const req = https.request(getHeader, (res) => {
            let response = '';
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                response += chunk;
        });
            res.on("end", () => {
                const parsedResponse = JSON.parse(response);
                makeFullPatch(parsedResponse.solution);
            });
        });
        req.on("err", (err) => {
            console.log(`Error: ${err.message}`);
            throw err;
        });
        req.end();
    };

    function makeFullPatch(string) {
        const fullPatch = content + string;
        const jsonData = JSON.stringify(fullPatch);
        return patchRequest(jsonData);
    };

    function patchRequest(jsonData) {
        patchHeader.headers["Content-Length"] = jsonData.length;
        const req = https.request(patchHeader, res => {
        response = '';
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                response += chunk;
                //console.log("chunk" + chunk);
            });
        });
        req.write(jsonData);
        req.on("err", (err) => {
            console.log(`Error: ${err.message}`);
            throw err;
        });
        req.end();
    };

    getRequest();
};