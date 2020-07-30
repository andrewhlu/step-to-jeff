// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const path = require('path');
const { sayHi, searchForEmails, isSignedIn } = require(path.resolve( __dirname, "./gmail.js" ));

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        console.log("Start of new skill invocation!");
        // First, check if the user is signed in
        if(isSignedIn(handlerInput)) {
            // User is signed in!
            await searchForEmails(handlerInput);
            console.log("finished");
            
            const signedIn = "Welcome back to Step to Jeff. You can ask about your upcoming onboarding tasks or Amazon's company culture. Which would you like to learn about?";
            return handlerInput.responseBuilder
                .speak(signedIn)
                .withSimpleCard(handlerInput.requestEnvelope.context.System.user.accessToken)
                .reprompt(signedIn)
                .getResponse();
        }
        else {
            // User is not signed in, tell them they need to sign in to a Gmail account
            // const notSignedInText = "You are not signed in.";
            const notSignedInText = "Welcome to Step to Jeff, and congratulations on accepting your internship offer with Amazon! The Amazon Student Programs team is excited to have you join, and we're making many preparations for your arrival. In the coming months, we will email you items that you will need to complete. This Alexa Skill can help you keep track of all of those items, as well as help you learn about Amazon's peculiar culture. To make this happen, you'll need to sign in to the Gmail account that you used when you applied to Amazon. We've sent a card to your Alexa app to sign in. Please sign in, and then ask me to step to jeff again!";
            return handlerInput.responseBuilder.speak(notSignedInText).withLinkAccountCard().getResponse();
        }
    }
};
const LoginToGmailIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LoginToGmailIntent';
    },
    handle(handlerInput) {
        let accessToken = handlerInput.requestEnvelope.context.System.user.accessToken;
        if(accessToken === undefined) {
            // No token was found, prompt to sign in to account
            let text = "We'll need permission to read your onboarding emails to use this app. Please use the Alexa app to link the Gmail account that you used when applying to Amazon.";
            return handlerInput.responseBuilder.speak(text).withLinkAccountCard().getResponse();
        }
        else {
            let text = "We found an account. Congratulations!";
            return handlerInput.responseBuilder.speak(text).withSimpleCard(sayHi(accessToken)).getResponse();
        }
    }
};
const ItemsToCompleteIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ItemsToCompleteIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You have to say hi to Jeff Bezos due in 2 days. You can ask me to send a link to your phone.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can ask about your upcoming due dates or other Amazon related questions! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye! Come back again to be one step closer to Jeff Bezos.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        LoginToGmailIntentHandler,
        ItemsToCompleteIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
