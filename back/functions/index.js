// Imports dos modulos de dependencia 
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Imports dos modulos locais da aplicação
const helloWorld = require('./src/controllers/helloWorld');
const autenticacao = require('./src/controllers/autenticacao');

// Inicializa o sdk adimin do Firebase
const app = admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

/**
 * Função de teste
 */
exports.helloWorld = functions.https.onRequest((req, res) => {
    helloWorld.handler(req, res, 'index');
});

/**  
 * Cadastra um novo usuário no Authentication do Firebase
 * Faça uma requisição POST para https://us-central1-interligadb.cloudfunctions.net/cadastrarUsuario
 * passando usuário e senha no body da requisição      
 **/ 
exports.cadastrarUsuario = functions.https.onRequest((req, res) => {
    autenticacao.cadastrarUsuario(req, res, app);
});

/**  
 * Autentica o login do usuário na aplicação usando o Authentication do Firebase
 * Faça uma requisição POST para https://us-central1-interligadb.cloudfunctions.net/fazerLogin
 * passando usuário e senha no body da requisição      
 **/ 
exports.fazerLogin = functions.https.onRequest((req, res) => {
    autenticacao.fazerLogin(req, res, app); // pelo que tô vendo só dá pra fazer login no front
});

exports.addAdminRole = functions.https.onCall((data, context) => {
    autenticacao.addAdminRole(data, context);
})