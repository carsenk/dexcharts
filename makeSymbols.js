const path = require('path');
const fs = require('fs-extra');
let coins = [];

makeSymbolsFile = () => {
  const _location = path.join(__dirname, 'coinsSource.json');
  const _allCoins = JSON.parse(fs.readFileSync(_location));
  let _coins = ['BTC', 'KMD'];
  let _symbols = [];
  let _coinsUI = [];

  for (let i = 0; i < _allCoins.length; i++) {
    _coins.push(_allCoins[i].coin);
  }

  coins = _coins;

  // ref:https://codereview.stackexchange.com/questions/75658/pairwise-combinations-of-an-array-in-javascript
  function pairwise(list) {
    if (list.length < 2) { return []; }

    const first = list[0];
    const rest  = list.slice(1);

    let pairs = rest.map(function (x) { return [first, x]; });

    return pairs.concat(pairwise(rest));
  }

  const _pairs = pairwise(_coins);

  for (let i = 0; i < _pairs.length; i++) {
    _symbols.push({ "name": `${_pairs[i][1]}-${_pairs[i][0]}`, "description": _pairs[i][1], "exchange":"barterdex", "type":"barterdex"});
    _symbols.push({ "name": `${_pairs[i][0]}-${_pairs[i][1]}`, "description": _pairs[i][0], "exchange":"barterdex", "type":"barterdex"});
  }

  fs.writeFileSync('coinList.json', JSON.stringify(_symbols));

  for (let i = 0; i < _coins.length; i++) {
    _coinsUI.push({
      value: _coins[i],
      label: _coins[i],
    });
  }
  fs.writeFileSync('coins.json', JSON.stringify(_coinsUI));
}

makeSymbolsFile();

module.exports = {
  coins
};