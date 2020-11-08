const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//sample cloud function location:  https://us-central1-students-on-vuefire-17fe1.cloudfunctions.net/helloWorld
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


//This cloud function should accept a token from the front end, asks google if that token is valid or not, then respond to the front-end with the answer
//This function is necesary becuase google recaptcha refuses connections from the front-end so a local or cloud serverside connection is needed to 'talk' to Google
exports.sendToGoogle = functions{
    return new Promise((resolve, reject) => {
        const googleURL = 'https://www.google.com/recaptcha/api/siteverify'
        const data = {
          secret: '6LcNlOAZAAAAAMbA8Ml2t5gMwQJQhTfqlKMDduOi',
          response: token
        //   response: req.body.recaptchaToken
        }
        axios.post(googleURL, data)
        .then(() => {
            this.addItem()
            resolve(true)
        }).catch(err=>{
            reject(err)
        })
    })
};