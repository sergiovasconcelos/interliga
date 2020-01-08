exports.cadastrarUsuario = (req, res, app) => {
    // Inicia a criação do usuario usando email e senha recuperados do body da requisição
    app.auth().createUser({
        email: req.body.email,
        password: req.body.password
    })
        .then(userRecord => {
            // Grava o email do usuario na coleção de usuarios no firestore
            // let data_atual = firebase.firestore.Timestamp.now();
            return app.firestore().collection('usuarios').doc(userRecord.uid).set({
                email: userRecord.email,
                data_criacao: new Date()
            })
        })
        .then(userInData => {
            // Retorna as informações de sucesso na criação e gravação do novo usuário
            return res.status(200).json({
                response: 'Criado e salvo com sucesso',
                data: userInData,
                success_saved: true
            })
        })
        .catch(err => {
            // Em caso de erro retorna com um status 500
            return res.status(500).json(err);
        })
}

exports.fazerLogin = (req, res, app) => {
    res.send('Ok');
}