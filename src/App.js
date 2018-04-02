import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="cLauncher">
        <div className="cLauncher__search-input-wrapper">
          <input type="text" className="cLauncher__search" autofocus placeholder="Enter a Command"/>
        </div>
        <div className="cLauncher__suggestions-wrapper">
          <ul className="cLauncher__suggestions cLauncher__scrollbar"></ul>
        </div>  
      </div>
    );
  }
}

export default App;

      // <div class="cLauncher">
      //   <div class="cLauncher__search-input-wrapper">
      //     <input type="text" class="cLauncher__search" autofocus placeholder="Enter a Command"/>
      //   </div>
      //   <div class="cLauncher__suggestions-wrapper">
      //     <ul class="cLauncher__suggestions cLauncher__scrollbar">
      //     </ul>
      //   </div>
      // </div>