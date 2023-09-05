import React from 'react';
import './App.css';
import LivesSaved from './components/LivesSaved/LivesSaved';
import AdoptByAge from './components/AdoptByAge/AdoptByAge';
import AdoptOverTime from './components/AdoptOverTime/AdoptOverTime';
import Characteristics from './components/Characteristics/Characteristics';
import TopBreeds from './components/TopBreeds/TopBreeds';

const App = () => {
  return (
    <div className='app'>
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
  );
};

export default App;
