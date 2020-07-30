const { google } = require('googleapis');

const searchTerms = [
    {
        title: "Offer Letter",
        query: "from:(asp-offersonboarding@amazon.com) subject:(Congratulations on Your Amazon Offer!) we are excited to present you with an opportunity to join Amazon",
        parse: [
            {
                key: "location",
                matcher: "in the ",
                delimiter: "!",
                afterMatcherText: true
            },
            {
                key: "link",
                matcher: "clicking here<",
                delimiter: ">",
                afterMatcherText: true
            }
        ]
    },
    {
        title: "Offer Accepted",
        query: "from:(noreply@qemailserver.com) subject:(Congrats from Amazon + Onboarding Logistics) We are excited to see you have accepted your offer!",
        parse: [
            {
                key: "dueDate",
                matcher: "complete the survey no later than *",
                delimiter: "*",
                afterMatcherText: true
            },
            {
                key: "link",
                matcher: "Survey LInk:",
                delimiter: "Survey ID:",
                afterMatcherText: true
            },
            {
                key: "id",
                matcher: "Survey ID: ",
                delimiter: "\n",
                afterMatcherText: true
            }
        ]
    },
    {
        title: "Background Check",
        query: "from:(customer_service@accurate.com) subject:(Amazon Background Information Form) Amazon has invited you to provide information in order to conduct a background check.",
        parse: [
            {
                key: "link",
                matcher: "https://myportal.accuratebackground.com/",
                delimiter: "'",
                afterMatcherText: false
            },
            {
                key: "numDays",
                matcher: "The link below will expire in ",
                delimiter: " days",
                afterMatcherText: true
            }
        ]
    },
    {
        title: "Information Session",
        query: "from:(asp-offersonboarding@amazon.com) subject:(Amazon Intern Information Session) information session",
        parse: [
            {
                key: "date",
                matcher: "*         ",
                delimiter: " (sign up",
                afterMatcherText: true
            },
            {
                key: "link",
                matcher: "sign up here<",
                delimiter: ">",
                afterMatcherText: true
            }
        ]
    }
];

function parseEmailText(text, matcher, delimiter, afterMatcherText) {
    let beginningIndex = text.indexOf(matcher)  + (afterMatcherText ? matcher.length : 0);
    return text.indexOf(matcher) < 0 ? "" : text.substr(beginningIndex, text.substring(beginningIndex).indexOf(delimiter));
}

module.exports.sayHi = (accessToken) => {
    return "Hi " + accessToken;
}

module.exports.searchForEmails = async (handlerInput) => {
    console.log("Starting getEmails");
    console.log("User ID: " + getUserId(handlerInput));
    
    const accessToken = getAccessToken(handlerInput);
    
    if(accessToken === undefined) {
        // The user is not signed in, let them know
        const notSignedInText = "It looks like you aren't signed in to your Gmail account. In order to use this feature, you'll need to sign in to the Gmail account that you used when you applied to Amazon. Please use the Alexa app to sign in.";
        return handlerInput.responseBuilder.speak(notSignedInText).withLinkAccountCard().getResponse();
    }
    else {
        // The user is signed in, create OAuth2 client with the access token
        const oAuth2Client = new google.auth.OAuth2();
        oAuth2Client.setCredentials({
            access_token: accessToken,
            token_type: "Bearer"
        });
        
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

        // Search Gmail for emails based on search terms 
        searchTerms.forEach((item) => {
            gmail.users.messages.list({
                userId: 'me',
                q: item.query,
            }, (err, res) => {
                if(err) {
                    console.log(err);
                }

                console.log(item.title + " has " + res.data.resultSizeEstimate + " matching emails.");
                
                if(res.data.resultSizeEstimate > 0) {
                    res.data.messages.forEach((message) => {
                        // Get the message
                        gmail.users.messages.get({
                            id: message.id,
                            userId: 'me',
                        }, async (err, res) => {
                            if(err) {
                                throw err;
                            }
                            
                            let payload = res.data.payload;
                            while(payload.parts) {
                                payload = payload.parts[0];
                            }
                            
                            let text = Buffer(payload.body.data, 'base64').toString();
                            // console.log("Decoded: " + text);
                            
                            if(item.parse) {
                                item.parse.forEach((criteria) => {
                                    console.log(item.title + " has key " + criteria.key + " with value: " + parseEmailText(text, criteria.matcher, criteria.delimiter, criteria.afterMatcherText));
                                })
                            }
                        });
                    });
                }
            });
        });
    }
}

module.exports.isSignedIn = (handlerInput) => {
    return getAccessToken(handlerInput) !== undefined;
}

function getUserId(handlerInput) {
    return handlerInput.requestEnvelope.context.System.user.userId;
}

function getAccessToken(handlerInput) {
    return handlerInput.requestEnvelope.context.System.user.accessToken;
}
