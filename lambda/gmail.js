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
        title: "Offer Accepted and Survey",
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
                matcher: "https://amazonuni.qualtrics.com/jfe/form",
                delimiter: "Survey ID:",
                afterMatcherText: false
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
        title: "Offer Survey Confirmation",
        query: "from:(noreply@qemailserver.com) subject:(Welcome to Amazon - Survey Confirmation) This is a confirmation that your responses have been received.",
        parse: [
            {
                key: "title",
                matcher: "below to see which d...",
                delimiter: "Are you completing",
                afterMatcherText: true,
            },
            {
                key: "startDate",
                matcher: "CPT, please check...",
                delimiter: "-",
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
    },
    {
        title: "Information Session Confirmation",
        query: "from:(customercare@gotowebinar.com) subject:(Confirming Registration: Amazon Internship Q&A) Thank you for registering for Amazon Internship Q&A",
        parse: [
            {
                key: "date",
                matcher: "             ",
                delimiter: "1. Click the link",
                afterMatcherText: true
            },
            {
                key: "link",
                matcher: "https://global.gotowebinar.com",
                delimiter: "https://link",
                afterMatcherText: false
            }
        ]
    },
    {
        title: "Relocation",
        query: "from:graebel.com subject:(Welcome to Graebel globalCONNECT!) globalCONNECT Password",
        parse: [
            {
                key: "link",
                matcher: "https://myrelocation.graebel.com",
                delimiter: "\">",
                afterMatcherText: false
            }
        ]
    },
    {
        title: "Organization Confirmation",
        query: "from:(asp-offersonboarding@amazon.com) subject:(Amazon organization confirmation) Congratulations on your offer and decision to join Amazon!",
        parse: [
            {
                key: "organization",
                matcher: "in the ",
                delimiter: " organization",
                afterMatcherText: true
            }    
        ]
    },
    {
        title: "Manager Intro",
        query: "from:(asp-offersonboarding@amazon.com) subject:(Welcome to Amazon - Manager Intro) introduce you to your manager",
        parse: [
            {
                key: "name",
                matcher: "your manager, ",
                delimiter: ", who is",
                afterMatcherText: true
            }
        ]
    },
    {
        title: "AWS Educate",
        query: "from:(notifications@instructure.com) subject:(Course Invitation) AWS Academy Cloud Foundations",
        parse: [
            {
                key: "link",
                matcher: "https://awsacademy.instructure.com",
                delimiter: "________________________________________",
                afterMatcherText: false
            }
        ]
    },
    {
        title: "New Hire Documents",
        query: "from:(MyDocs-noreply@onbaseonline.com) subject:(You Have Documents to Review and Electronically Sign) Your new hire employment documents",
        parse: [
            {
                key: "link",
                matcher: "https://amazon.onbaseonline.com",
                delimiter: "<",
                afterMatcherText: false
            }    
        ]
    },
    {
        title: "Embark",
        query: "from:(newhiresupport@amazon.com) subject:(Welcome Amazonian! Start exploring Amazon’s peculiar ways) Amazon Embark",
        parse: [
            {
                key: "link",
                matcher: "Visit Amazon Embark<",
                delimiter: ">",
                afterMatcherText: true
            }
        ]
    },
    {
        title: "Equipment Delivery",
        query: "from:(noreply@qemailserver.com) subject:(Mailing address for Amazon Equipment Delivery) ship your equipment",
        parse: [
            {
                key: "dueDate",
                matcher: "no later than ",
                delimiter: ".",
                afterMatcherText: true
            },
            {
                key: "link",
                matcher: "https://amazonuni.qualtrics.com/jfe/form",
                delimiter: ">",
                afterMatcherText: false
            },
        ]
    },
    {
        title: "I-9 Verification Section 1",
        query: "from:(amazon-i9@i9advantage.com) subject:(Remote Hire Employment Eligibility) Form I-9",
        parse: [
            {
                key: "link",
                matcher: "https://hr.i9advantage.com",
                delimiter: "Enter the",
                afterMatcherText: false
            },
            {
                key: "pin",
                matcher: "PIN:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;",
                delimiter: "Please contact",
                afterMatcherText: true
            }
        ]
    },
    {
        title: "I-9 Verification Section 1 Completion",
        query: "from:(amazon-i9@i9advantage.com) subject:(Remote Hire Section 1 Completion) Form I-9"
    },
    {
        title: "New Hire Orientation Info",
        query: "from:(newhiresupport@amazon.com) subject:(Welcome to Amazon! New Hire Orientation Info. Enclosed) New Hire Orientation"
    },
    {
        title: "Midway Temporary PIN",
        query: "from:(registration-pin-no-reply@amazon.com) subject:(Here's your temporary PIN) temporary PIN",
        parse: [
            {
                key: "pin",
                matcher: "Your temporary PIN: ",
                delimiter: "</p>",
                afterMatcherText: true
            }    
        ]
    }
];

function parseEmailText(text, matcher, delimiter, afterMatcherText) {
    let beginningIndex = text.indexOf(matcher)  + (afterMatcherText ? matcher.length : 0);
    return text.indexOf(matcher) < 0 ? "" : text.substr(beginningIndex, text.substring(beginningIndex).indexOf(delimiter)).replace(/^\s+|\s+$/g, '');
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
                    // Get the message
                    gmail.users.messages.get({
                        id: res.data.messages[0].id,
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
                            });
                        }
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
