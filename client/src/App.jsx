import React from 'react';
import './App.css';
import LivesSaved from './components/LivesSaved/LivesSaved';
import AdoptByAge from './components/AdoptByAge/AdoptByAge';
import AdoptOverTime from './components/AdoptOverTime/AdoptOverTime';
import Characteristics from './components/Characteristics/Characteristics';
import TopBreeds from './components/TopBreeds/TopBreeds';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    // <>
    <div className='app'>
      <Header />

      <div className='components-container'>
        <div className='component'>
          <LivesSaved />
        </div>

        <div className='component'>
          <AdoptByAge />
          <AdoptOverTime />
        </div>

        <div className='component'>
          <Characteristics />
          <TopBreeds />
        </div>
      </div>

      <Footer />
    </div>
    // {/* </> */ }

  );
};

export default App;
