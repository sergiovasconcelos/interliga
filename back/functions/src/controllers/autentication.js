exports.createUser = (data, context, app) => {
    const user = data.user;
    const password = data.password;
    // Inicia a criação do usuario usando email e senha recuperados do body da requisição
    app.auth().createUser({
        email: user.email,
        password: password,
    })
        .then(userRecord => {
            // Grava o email do usuario na coleção de usuarios no firestore
            // let data_atual = firebase.firestore.Timestamp.now();
            return app.firestore().collection('usuarios').doc(userRecord.uid).set({
                data_criacao: new Date(),
                nome: user.nome,
                cpf: user.cpf,
                celular: user.celular,
                local_trabalho: user.local_trabalho,
                cargo: user.cargo,
                email: user.email,
                admin: user.admin,
            })
        })
        .then(userInData => {
            // Retorna as informações de sucesso na criação e gravação do novo usuário
            return {
                response: 'Criado e salvo com sucesso',
                data: userInData,
                success_saved: true
            }
        })
        .catch(err => {
            // Em caso de erro retorna com um status 500
            return err;
        })
}

exports.login = (req, res, app) => {
    res.send('Ok');
}

exports.addAdminRole = (data, context, app) => {
    // checa se a requisição é feita por um admin
    if (context.auth.token.admin !== true) {
        return { error: 'Only admins can add other admins, sucker!' }
    }

    // recupera o usuário e adiciona uma custom claim de admin nele
    return app.auth().getUserByEmail(data.email).then(user => {
        return app.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    })
        .then(() => {
            return {
                message: `Success! ${data.email} has been made an admin`
            }
        })
        .catch(err => {
            return err;
        });
}

exports.addAdminRoleRequest = (req, res, app) => {

    // recupera o usuário e adiciona uma custom claim de admin nele
    console.log(req.body);
    return app.auth().getUserByEmail(req.body.email)
        .then(user => {
            return app.auth().setCustomUserClaims(user.uid, {
                admin: true
            })
        })
        .then(() => {
            return res.json({
                message: `Success! ${req.body.email} has been made an admin`
            })
        })
        .catch(err => {
            return res.status(500).json({ err });
        });
}