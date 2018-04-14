import React, { Component } from 'react';
import Search from "./Search";
import utils from './Utils';
import defaultSuggestions from '../plugins/plugins'
import fallbackWebSearches from '../plugins/fallback-web-searches/index'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchScopes: []
    }
  }

  componentDidMount() {
    window.defaultSuggestions = [...defaultSuggestions];
    window.currentSearchSuggestions = [...defaultSuggestions]
    window.searchInput = document.querySelector(".cLauncher__search")
    window.userQuery = ''
    window.searchResultsList = document.querySelector(".cLauncher__suggestions")

    defaultSuggestions.forEach( plugin => {
      if (plugin.searchScope !== undefined) 
        this.state.searchScopes.push(plugin.searchScope.toLowerCase());
    })
  }

  rerenderSuggestions(event) {
    window.searchResultsList.innerHTML = ""
    if(window.searchInput.value === '') {
      window.currentSearchSuggestions = [...defaultSuggestions]
      window.searchResultsList.innerHTML = ""
    }
  
    let domain = this.state.searchScopes.filter(searchScope => {
      if (window.searchInput.value.toLowerCase().includes(searchScope)) {
        return searchScope
      }
    })[0]
  
  
  
    //if we have "Find Bookmark apple" in the search input only pass everything after for searching.
    if (domain) {
      //userQuery = 'find bookmark async'
      //trimedQuery for matches = 'async'
  
      //find the plugin to execute based off the domain.
      let x = defaultSuggestions.filter((plugin) => {
        let regex = new RegExp(domain, 'i')
        if(plugin.searchScope != undefined){
          return plugin.searchScope.match(regex)
        }
      })
  
      let regex = new RegExp(`${domain  } `, 'i')
      let query = window.searchInput.value.split(regex).filter((x) => x.length !== 0).join()
      window.userQuery = query
  
      const matches = utils.getMatches(query, window.currentSearchSuggestions)
      utils.renderSuggestions(matches)
    }
  
    else {
      let matches = utils.getMatches(window.searchInput.value, window.currentSearchSuggestions)
  
      if(matches.length > 0) {
        utils.renderSuggestions(matches)
      }
  
      else if(utils.displayPotentialMathResult(window.searchInput.value).length > 0){
        utils.renderSuggestions(utils.displayPotentialMathResult(window.searchInput.value))
      }
  
      else if (matches.length === 0 && window.searchInput.value !== '') {
        // const results = 'asdf';
        const results = fallbackWebSearches.map((webSearch) => webSearch(window.searchInput.value))
        utils.renderSuggestions(results)
      }
    }
    window.suggestionElements = document.querySelectorAll('.cLauncher__suggestion')
  }


  render() {
    return (
      <div className="container">
        <Search handleChange={this.rerenderSuggestions.bind(this)} />
      </div>
    );
  }
}

export default App;