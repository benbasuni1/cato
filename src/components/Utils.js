import React from 'react';
import fuzzaldrin from 'fuzzaldrin-plus';
import mathexp from 'math-exp';

const utils = {};

utils.test = () => console.log('testing');

utils.createSuggestionElement  = suggestion => {
    const isObject = Object.prototype.toString.call(suggestion) === '[object Object]' ? true: false
    if(isObject) {
        const element = (
            <li className="cLauncher__suggestion" onClick={suggestion.action}>
                <img className="cLauncher__suggestion-icon" src={suggestion.icon.path} />
                <div className="cLauncher__suggestion-title-info">
                <div
                    className="cLauncher__suggestion-title dont-break-out"
                    dangerouslySetInnerHTML={{__html: suggestion.textWithMatchedChars || suggestion.keyword}}>
                </div>
                <div
                    class="cLauncher__suggestion-subtitle dont-break-out"
                    dangerouslySetInnerHTML={{__html: suggestion.subtitle}}>
                </div>
                </div>
            </li>
        )
        return element;
    };
}

utils.renderSuggestions = suggestions => {
    suggestions.forEach(suggestion => {
        const searchResult = utils.createSuggestionElement(suggestion);
        if (searchResult !== undefined)
          console.log(searchResult);
            // window.searchResultsList.appendChild(searchResult);
    })    
};

utils.highlightTopSuggestion = () => window.searchResultsList.children[0].classList.add('selected');

utils.getMatches = (query, suggestions) => {
    const matches = fuzzaldrin
            .filter(suggestions, query, { key: 'keyword', maxresults: 20 })
            .map(matchedResult => {
                matchedResult.textWithMatchedChars = fuzzaldrin.wrap(matchedResult.keyword, query);
                return matchedResult;
            })
    return matches;
}
utils.displayPotentialMathResult = function(query) {
    try {
      const mathresult = mathexp.eval(query);
      return [{
        keyword: mathresult,
        subtitle: 'copy number to your clipboard.',
        action: function copyresult() {
          utils.copytoclipboard(mathresult, ev => {
            window.close();
          });
        },
        icon: {
          path: 'images/calculator-icon.svg'
        }
      }]
    }
    catch(exception) {
      if(exception.message === "complete the expression" && query !== '') {
        return [{
          keyword: '...',
          action: '',
          subtitle: 'please enter a valid math expression.',
          icon: {
            path: 'images/calculator-icon.svg'
          }
        }]
      }
      else {
        return []
      }
    }
  }
// utils.resetFakeAppTheme;
// utils.resetLocalStorageTheme;
// utils.resetThemInputValue;
// utils.updateCSSVariable; // two functions
// utils.handleThemeInputValueChange;
// utils.useAvailableExtensionIcon;
// utils.copyToClipboard;

export default utils;