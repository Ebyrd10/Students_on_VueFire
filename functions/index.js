const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendRecaptcha = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://students-on-vuefire-17fe1.firebaseapp.com/');
    
    
    const secret = '6LcNlOAZAAAAAMbA8Ml2t5gMwQJQhTfqlKMDduOi';
  
    //Front-end will send the token        
    const token = req.query.token;
    const response = await axios.get(`https://recaptcha.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);
    const data = response.data;
  
    if (data.success) {
        // Send the score back
        return res.status(200).send({ score: data.score })
    }
    // Handle errors here
  });