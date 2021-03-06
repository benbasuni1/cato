const browser = require('webextension-polyfill')
const plugin = {
  keyword: "History",
  subtitle: 'Open your search history.',
  action: openHistory,
  icon: {
    path: 'images/chrome-icon.svg'
  }
}

async function openHistory() {
  browser.tabs.create({url: "chrome://history"})
}

module.exports = plugin
