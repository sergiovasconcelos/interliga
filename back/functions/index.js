// Imports dos modulos de dependencia 
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Imports dos modulos locais da aplicação
const autenticacao = require('./src/controllers/autenticacao');

// Inicializa o sdk adimin do Firebase
const app = admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

/**  
 * Cadastra um novo usuário no Authentication do Firebase
 * Faça uma requisição POST para https://us-central1-interligadb.cloudfunctions.net/cadastrarUsuarioRequest ou 
 * Faça uma chamada para essa função usando functions.httpsCallable('cadastrarUsuario');
 * passando usuário e senha no body da requisição      
 **/ 
exports.cadastrarUsuario = functions.https.onCall((data, context) => {
    autenticacao.cadastrarUsuario(data, context, app);
});

/**  
 * Autentica o login do usuário na aplicação usando o Authentication do Firebase
 * Faça uma requisição POST para https://us-central1-interligadb.cloudfunctions.net/fazerLoginRequest
 * passando usuário e senha no body da requisição      
 **/ 
exports.fazerLoginRequest = functions.https.onRequest((req, res) => {
    autenticacao.fazerLogin(req, res, app); // pelo que tô vendo só dá pra fazer login no front
});

/**  
 * Cria uma custom claim para o usuário colocando-o como admin
 * Faça uma requisição POST para https://us-central1-interligadb.cloudfunctions.net/addAdminRole ou
 * Faça uma chamada para essa função usando functions.httpsCallable('addAdminRole');
 * passando o email do usuário que será admin como parametro      
 **/ 
exports.addAdminRole = functions.https.onCall((data, context) => {
    autenticacao.addAdminRole(data, context, app);
});
