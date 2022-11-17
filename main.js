/* pieces of this project
1. the actual JS code itself that fetches the data
    a. BTC
    b. ETH
    c. BNB
2. display latest price to USD
2. the popup modal
3. the manifest docs for chrome extension
4. the styling/displaying of the data that we fetched
5. stretch features (add your own coin to track)

*/

// use fetch to GET binance data from api
fetch('https://api2.binance.com/api/v3/ticker/24hr')
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
    const cryptoList = {
      BTCUSDT: 'BTCUSDT',
      ETHUSDT: 'ETHUSDT',
      BNBUSDT: 'BNBUSDT',
    };
    const cryptoModal = document.createElement('div');
    cryptoModal.id = 'crypto-modal';
    // add message for (price as of xxx time);
    // iterate through the data JSON object, looking for the current price for BTC, ETH and BNB
    for (let i = 0; i < data.length; i++) {
      const currentObj = data[i];
      // add each data point to a container/div
      if (cryptoList.hasOwnProperty(currentObj['symbol'])) {
        const container = document.createElement('div');
        container.classList.add('container');
        // in each container, add a minus button / link

        const ticker = document.createElement('p');
        ticker.innerHTML = currentObj['symbol'];
        container.appendChild(ticker);

        const price = document.createElement('p');
        price.innerHTML = currentObj['lastPrice'];
        container.appendChild(price);

        const minusBtn = document.createElement('button');
        minusBtn.classList.add('minus-btn');
        minusBtn.textContent = '-';
        container.appendChild(minusBtn);

        cryptoModal.appendChild(container);
      }
      // add each div to the modal
    }
    document.querySelector('body').appendChild(cryptoModal);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

// add eventlisteners for clicking on the minus button
// remove that associated ticket from the cryptolist
// remove the container associated with this ticker
// function removeSymbol(list) {
//   const minusBtn = document.querySelectorAll('.minus-btn');
//   minustBtn.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//       e.preventDefault();
//       console.log(e);
//     });
//   });
// }
// removeSymbol();
// add a function that will be invoked when the form for additioal ticker is clicked
// look up the data and add that ticker and price to the modal
