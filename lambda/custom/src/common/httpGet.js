const config = require('../../config');


const transport = require(config.protocol);

async function httpGet(host,query, callback) {
    console.log('considered host' + host + ' q '+query);
    var options = {
        "method": "GET",
        "hostname": host,
        "path": query,
        "headers": {
            "cache-control": "no-cache"
        }
    };
    let bodyobt = '';
    console.log('trighttp');
    let req = await transport.request(options, function (res) {
        console.log('responseobt');
        console.log(res);
        let chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
            console.log('trighttpdata');
        });

        res.on("end", function () {
            console.log('trighttpend');
            let body = Buffer.concat(chunks);
            console.log(body);
            //console.log(body.toString());
            bodyobt = body.toString();
            console.log(bodyobt);
            callback(bodyobt);
        });
    });

    req.end();
}

module.exports = httpGet;
