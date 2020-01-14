import React from 'react';

import './Home.css';
import app from '../../util/firebaseUtils';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sair</button>
    </div>
  );
}
