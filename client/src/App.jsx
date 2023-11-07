import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
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
          </div>
          <div className="col-md-4">
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
