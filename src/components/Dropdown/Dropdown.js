import React from 'react';
import './Dropdown.css';

const Dropdown = () => {
  return (
    <div className='main-dropdown-section'>
      <div className='control-container'>
        {/* X Variable Select Menu */}
        <div className='control-wrapper'>
          <label htmlFor='xVar'>X Variable:</label>
          <select
            id='xVar'
            value='Appar Size (deg)'
            className='custom-select'
          ></select>
        </div>

        {/* Y Variable Select Menu */}
        <div className='control-wrapper'>
          <label htmlFor='yVar'>Y Variable:</label>
          <select
            id='yVar'
            value='Density (EU)'
            className='custom-select'
          ></select>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
