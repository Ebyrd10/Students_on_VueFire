const functions = require('firebase-functions');
const axios = require('axios');

//This cloud function should accept a token from the front end, asks google if that token is valid or not, then respond to the front-end with the answer
//This function is necesary becuase google recaptcha refuses connections from the front-end so a local or cloud serverside connection is needed to 'talk' to Google
exports.sendToGoogle = (data) => {
    return new Promise((resolve, reject) => {
        const googleURL = 'https://www.google.com/recaptcha/api/siteverify'
        
        axios.post(googleURL, data)
        .then((response) => {
            resolve(response)
        }).catch(err=>{
            reject(err)
        })
    })
    
};