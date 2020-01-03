const functions = require('firebase-functions');

const helloWorld = require('./controllers/helloWorld');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest(helloWorld.handler);