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

const body = document.querySelector('body');
const minusBtn = document.querySelectorAll('.minusBtn');

// use fetch to GET binance data from api
fetch('https://api2.binance.com/api/v3/ticker/24hr')
  .then((data) => data.json())
  .then((data) => {
    // console.log(data);
    const cryptoList = {
      BTCUSDT: 'BTCUSDT',
      ETHUSDT: 'ETHUSDT',
      BNBUSDT: 'BNBUSDT',
    };
    const cryptoModal = document.createElement('div');
    cryptoModal.id = 'crypto-modal';
    const title = document.createElement('h1');
    title.innerText = '$$CRYPTO BOYZ$$';
    cryptoModal.appendChild(title);
    // add message for (price as of xxx time);
    // iterate through the data JSON object, looking for the current price for BTC, ETH and BNB
    for (let i = 0; i < data.length; i++) {
      const currentObj = data[i];
      // add each data point to a container/div
      if (cryptoList.hasOwnProperty(currentObj['symbol'])) {
        const container = document.createElement('div');
        container.classList.add('container');
        container.id = i;
        // in each container, add a minus button / link

        const ticker = document.createElement('p');
        ticker.innerHTML = currentObj['symbol'];
        container.appendChild(ticker);

        const price = document.createElement('p');
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        const formattedPrice = formatter.format(
          Number(currentObj['lastPrice'])
        );
        price.innerHTML = formattedPrice;
        container.appendChild(price);

        const minusBtn = document.createElement('button');
        minusBtn.classList.add('minusBtn');
        minusBtn.textContent = '-';
        // assign the onclick to invoke the helper function that will remove the
        minusBtn.onclick = function () {
          delete cryptoList[currentObj['symbol']];
          const deletedCoin = document.getElementById(`${i}`);
          cryptoModal.removeChild(deletedCoin);
        };
        // object.onclick = 'deleteItem()';
        container.appendChild(minusBtn);

        cryptoModal.appendChild(container);
      }
      // add each div to the modal
    }

    // // add a form div here that will submit the input text and add a container to the cryptoModal
    const addCoinContainer = document.createElement('div');
    addCoinContainer.classList.add('addCoin');

    const addCoinLabel = document.createElement('label');
    addCoinLabel.for = 'addCoinText';
    const addCoinTextBox = document.createElement('input');
    addCoinTextBox.type = 'text';
    addCoinTextBox.id = 'addCoinText';
    addCoinTextBox.name = 'addCoinText';
    addCoinTextBox.placeholder = 'Add Coin';
    const addBtn = document.createElement('button');
    addBtn.id = 'addCoinBtn';
    addBtn.innerHTML = '+';
    addBtn.onclick = function () {
      //   console.log('add button works');
      // take the text from the input (addCoinTextBox.value) and add to the cryptoList
      // iterate through the data
      // we want to check if the cryptolist already has the added Coin, if it does, this function does nothing / return or break nothing
      // otherwise, we want to do the following:
      // we want to add the added Coin to the cryptoList
      // we want to add a container with the added Coin to the cryptoModal
      const addedCoin = addCoinTextBox.value;

      if (!cryptoList.hasOwnProperty[addedCoin]) {
        cryptoList[addedCoin] = addedCoin;
        for (let i = 0; i < data.length; i++) {
          const currentObj = data[i];
          // add each data point to a container/div
          if (currentObj['symbol'] === addedCoin) {
            const container = document.createElement('div');
            container.classList.add('container');
            container.id = i;
            // in each container, add a minus button / link

            const ticker = document.createElement('p');
            ticker.innerHTML = currentObj['symbol'];
            container.appendChild(ticker);

            const price = document.createElement('p');
            const formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            });
            const formattedPrice = formatter.format(
              Number(currentObj['lastPrice'])
            );
            price.innerHTML = formattedPrice;
            container.appendChild(price);

            const minusBtn = document.createElement('button');
            minusBtn.classList.add('minusBtn');
            minusBtn.textContent = '-';
            // assign the onclick to invoke the helper function that will remove the
            minusBtn.onclick = function () {
              delete cryptoList[currentObj['symbol']];
              const deletedCoin = document.getElementById(`${i}`);
              cryptoModal.removeChild(deletedCoin);
            };
            cryptoModal.appendChild(container);
            container.appendChild(minusBtn);
          }
        }
      } else return;
      // copy and paste the code from above
      //
    };

    addCoinContainer.append(addCoinLabel, addCoinTextBox, addBtn);

    body.appendChild(cryptoModal);
    body.appendChild(addCoinContainer);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });

// wrap the functionality below in a helper function so we can invoke it when minusBtn onclick is triggered
// function deleteItem() {
//   console.log('hello');
//   // minusBtn.forEach((btn) => {
//   //   btn.addEventListener('click', (e) => {
//   //     e.preventDefault();
//   //     console.log('it works');
//   //   });
//   // });
// }

// add eventlisteners for clicking on the minus button
// remove that associated ticket from the cryptolist
// remove the container associated with this ticker

// add a function that will be invoked when the form for additioal ticker is clicked
// look up the data and add that ticker and price to the modal
