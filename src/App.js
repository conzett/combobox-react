import React, { Component } from 'react';
import Combobox from './combobox.js';
import './App.css';

class App extends Component {
  render() {
    var options = [
      { value: '1', text: undefined },
      { value: '2', text: 'Item 2', className: "text-uppercase" },
      { value: '3', text: 'Item 3', style: { fontWeight: "bold" }},
      { value: '4', text: 'Item 4', style: { color: "red" }},
      { value: '5', text: 'Item 5', style: { textDecoration: "line-through"} },
      { value: '6', text: 'Item 6' },
      { value: '7', text: null },
      { value: '8', text: '89101112 13141516 17181920212223 24252627282 93031323 3343536 37383940' },
      { value: '9', text: "      " },
      { value: '10', text: "poop" }
    ];
    return (
      <div>
        before text
        <Combobox style={{width: 300}} options={options} selectedValue="4" placeholder="Select…" name="my-form"/>
        after text
      </div>
    );
  }
}

export default App;
