import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import app from '../../util/firebaseUtils';
import { verifyAdminRole } from '../../services/AuthService';

export default function Home() {

  useEffect(() => {
    verifyAdminRole();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sair</button>
      <Link className="link" to="/signup" >
        Cadastre-se
      </Link>
    </div>
  );
}
