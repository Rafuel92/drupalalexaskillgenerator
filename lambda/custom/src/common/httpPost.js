const config = require('../../config');


const transport = require(config.protocol);

async function httpPost(host,data, callback) {


    const options = {
        hostname: config.hostname,
        path: '/alexa_skill_generator/respond',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = transport.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', (d) => {
            callback(d);
        })
    });

    req.on('error', (error) => {
        console.error(error)
    });

    req.write(data);
    req.end()
}

module.exports = httpPost;
