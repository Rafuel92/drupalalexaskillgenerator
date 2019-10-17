const Alexa = require('ask-sdk-core');
const config = require('../../config');
const httpGet = require('../common/httpGet');
const httpPost = require('../common/httpPost');

const ResponderIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const receivedIntentData = handlerInput.requestEnvelope.request.intent;
        return new Promise(function(resolve, reject) {
            httpPost(config.hostname, JSON.stringify(receivedIntentData), (theResult) => {
                console.log(theResult);
                const parsed = JSON.parse(theResult);
                resolve(handlerInput.responseBuilder
                    .speak(parsed.output)
                    .getResponse()
                );
            });
        });
    }
};

module.exports = ResponderIntent;
