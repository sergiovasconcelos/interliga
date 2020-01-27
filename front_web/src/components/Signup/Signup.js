import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../../util/firebaseUtils";
import { Link } from 'react-router-dom';
import './Signup.css';
import engrenagem_icon from '../../assets/engrenagem_icon.png';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(event => {
    event.preventDefault();

    const execSignup = async () => {
      const { nome, cpf, celular, local_trabalho, cargo, email, senha } = event.target.elements;
      const usuario = {
        nome,
        cpf,
        celular,
        local_trabalho,
        cargo,
        email,
        senha,
      }
      try {
        await app.auth().createUserWithEmailAndPassword(email.value, senha.value).then(user => {
          console.log('Usuário', user);
          console.log('Dados do usuário', usuario);
          // app.firestore().collection('usuarios')
        });

        // redireciona para a Home
        history.push("/");

      } catch (error) {
        alert(error);
      }
    }

    // executa o signup e salva um documento com as informações do usuário no banco de dados
    execSignup();

  }, [history]);

  return (
    <>
      <header>
        <div className="links">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/usuarios">Usuários</Link>
        </div>
        <div className="icons">
          <Link to="/config"><img className="icon" src={engrenagem_icon} /></Link>
        </div>
      </header>
      <div className="container">
        <h2>Criação de Usuários</h2>
        <form onSubmit={handleSignUp}>
          <div className="nome_completo">
            <input name="nome" type="text" placeholder="Nome completo" />
          </div>
          <div className="cpf_celular">
            <input name="cpf" type="text" placeholder="CPF" />
            <input name="celular" type="text" placeholder="Nº celular" />
          </div>
          <div className="trabalho_cargo">
            <input name="local_trabalho" type="text" placeholder="Secretária" />
            <input name="cargo" type="text" placeholder="Cargo" />
          </div>
          <section className="email_senha">
            <input name="email" type="email" placeholder="Email" />
            <input name="senha" type="password" placeholder="Senha" />
          </section>
          <section className="usuario_admin">
            Usuário admin?
          <input type="checkbox" />
          </section>
          <section className="btn_criar_usuario">
            <button type="submit">Criar Usuário</button>
          </section>
        </form>
      </div>
    </>
  );
};

export default withRouter(SignUp);
