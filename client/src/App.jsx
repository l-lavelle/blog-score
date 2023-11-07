import React from 'react';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <MainContent />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
