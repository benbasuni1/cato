import React, { Component } from 'react';
import utils from './Utils';

class Search extends Component {
  render() {
    return (
      <div className="cLauncher">
        <div className="cLauncher__search-input-wrapper">
          <input onChange={this.props.handleChange} type="text" className="cLauncher__search" autoFocus placeholder="Enter a Command"/>
        </div>
        <div className="cLauncher__suggestions-wrapper">
          <ul className="cLauncher__suggestions cLauncher__scrollbar"></ul>
        </div>  
      </div>
    );
  }
}

export default Search;