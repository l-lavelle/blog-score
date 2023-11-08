import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-8">
            <MainContent />
            <h1>Testing</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
