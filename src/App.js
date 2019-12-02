import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Scatterplot from './components/Scatterplot';
import phl from './data/phl_hec_all_confirmed.csv';
import * as d3 from 'd3';
import './App.css';

const App = () => {
  // Set initial state
  const [data, setData] = useState([]);
  const [xVar, setXvar] = useState('P. ESI');
  const [yVar, setYvar] = useState('P. Radius (EU)');

  // Load data on initial mount
  useEffect(() => {
    d3.csv(phl).then(setData);
  }, []);

  // Filtered list of possible x and y axes
  let options = data.length === 0 ? [] : Object.keys(data[0]);
  options = options.filter(
    option =>
      option !== 'P. Atmosphere Class' &&
      option !== 'P. Composition Class' &&
      option !== 'P. Disc. Method' &&
      option !== 'P. Habitable Class' &&
      option !== 'P. Mass Class' &&
      option !== 'P. Name' &&
      option !== 'P. Name KOI' &&
      option !== 'P. Name Kepler' &&
      option !== 'P. SPH' &&
      option !== 'P. Zone Class' &&
      option !== 'S. Constellation' &&
      option !== 'S. Name' &&
      option !== 'S. Name HD' &&
      option !== 'S. Name HIP' &&
      option !== 'S. Type' &&
      option !== 'S. [Fe/H]'
  );

  // Store all of the data to be plotted
  let allData = data.map(datum => {
    return {
      x: datum[xVar],
      y: datum[yVar]
    };
  });

  return (
    <div className='container'>
      <Navbar />
      <div className='control-container'>
        {/* X Variable Select Menu */}
        <div className='control-wrapper'>
          <label htmlFor='xVar'>X-Axis: </label>
          <select
            id='xVar'
            value={xVar}
            className='custom-select'
            onChange={e => setXvar(e.target.value)}
          >
            {options
              .filter(option => option !== yVar)
              .map(option => {
                return <option key={option}>{option}</option>;
              })}
          </select>
        </div>

        {/* Y Variable Select Menu */}
        <div className='control-wrapper'>
          <label htmlFor='yVar'>Y-Axis: </label>
          <select
            id='yVar'
            value={yVar}
            className='custom-select'
            onChange={e => setYvar(e.target.value)}
          >
            {options
              .filter(option => option !== xVar)
              .map(option => {
                return <option key={option}>{option}</option>;
              })}
          </select>
        </div>
      </div>
      <Scatterplot xTitle={xVar} yTitle={yVar} data={allData} />
    </div>
  );
};

export default App;
