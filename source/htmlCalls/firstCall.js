const https = require('https');

function checkAuth(key) {
    let getHeader = {
        method: "GET",
        hostname: "youngliving.custhelp.com",
        port: null,
        path: "/services/rest/connect/v1.3",
        headers: {
            authorization: key,
            "cache-control": "no-cache",
        }
    };
   
    //check either triggers failedAuth or savesAuth
    const req = https.request(getHeader, (res) => {
        let response = '';
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
            response += chunk;
        });
        res.on("end", () => {
            //console.log(response);
            const parsedResponse = JSON.parse(response);
            //console.log(parsedResponse.status);
            if (parsedResponse.status == 401) {
                failedAuth();
                return
            } else {
                saveData(key);
                return
            }
        });
    });
    
    req.on("err", (err) => {
        console.log(`Error: ${err.message}`);
        otherFailure();
        throw err;
    });

    req.end();
};
