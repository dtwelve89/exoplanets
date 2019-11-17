import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Dropdowns from './components/Dropdowns/Dropdowns';
import Scatterplot from './components/Scatterplot/Scatterplot';
import * as d3 from 'd3';
// import phl from './data/phl_hec_all_confirmed.csv';
import test from './data/test.csv';
import './App.css';

let loaded = false;

const App = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    // let arr = [];
    // d3.csv(test, result => {
    //   arr.push(result);
    // });
    // console.log(arr);
    d3.csv(test).then(setData);
  }, []);

  useEffect(() => {
    if (loaded) {
      console.log(data);
    } else {
      loaded = true;
    }
  });

  return (
    <div className='container'>
      <Navbar />
      <Dropdowns />
      <Scatterplot />
      {/* <div>{data}</div> */}
    </div>
  );
};

export default App;
