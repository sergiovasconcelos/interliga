import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from "react-router";

import { AuthContext } from "../../services/AuthService";
import app from '../../util/firebaseUtils';

import './Login.css';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (

    <main className="acesso">
      <h1>Interliga</h1>
      <section>
        <h2>Entre com seu email e senha para acessar o sistema.</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <div className="div_input">
            <input autoComplete='email' id="email" name="email" type="email" placeholder="Ex. email@example.com" />
          </div>
          <label htmlFor="password">Senha</label>
          <div className="div_input">
            <input autoComplete='current-password' id="password" name="password" type="password" placeholder="************" />
          </div>
          <button type="submit">
            Entrar
          </button>
        </form>
      </section>
    </main>

  );
}

export default withRouter(Login);
