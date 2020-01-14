import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./services/AuthService";
import { Routes } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}