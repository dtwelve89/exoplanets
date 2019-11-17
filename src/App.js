import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Dropdowns from './components/Dropdowns/Dropdowns';
import Scatterplot from './components/Scatterplot/Scatterplot';
import * as d3 from 'd3';
import phl from './phl_hec_all_confirmed.csv';
import './App.css';

const App = () => {
  // const [data, setData] = useState();

  useEffect(() => {
    d3.csv(phl, result => {
      // setData(result);
      console.log(result);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Dropdowns />
      <Scatterplot />
      {/* <div>{data}</div> */}
    </div>
  );
};

export default App;
