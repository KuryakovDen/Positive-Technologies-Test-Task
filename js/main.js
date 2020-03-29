'use strict';

const onSuccess = (curRates) => {
  const ExchangeRates = {
    'rubles': curRates.rub.rate.toFixed(2), 
    'euros': curRates.eur.rate.toFixed(2), 
    'pounds': curRates.gbp.rate.toFixed(2), 
    'yens': curRates.jpy.rate.toFixed(2) 
  };
    
  const selectedCart = [
    {price: getRandomNumber()},
    {price: getRandomNumber()},
    {price: getRandomNumber()},
    {price: getRandomNumber()}
  ];
  
  document.write(`Кол-во товаров в корзине: <b> ${selectedCart.length} </b> <br><br>`);

  const calculateProductCost = (products) => {
    products.forEach((it, i) => {
      document.write(`Стоимость ${i + 1}-го товара: <b> ${products[i].price} &#36; </b> <br><br>`);
    });
  };

  calculateProductCost(selectedCart);
  
  const totalCartSum = [];
  
  selectedCart.forEach((it) => {
    totalCartSum.push(it.price);
  });

  const totalDollarsSum = totalCartSum.reduce((accumulator, currentValue) => accumulator + currentValue);

  const totalCartPrice = {};
  
  totalCartPrice.dollars = totalDollarsSum;
  totalCartPrice.rubles = Math.floor(totalDollarsSum * ExchangeRates.rubles);
  totalCartPrice.euros = Math.floor(totalDollarsSum * ExchangeRates.euros);
  totalCartPrice.pounds = Math.floor(totalDollarsSum * ExchangeRates.pounds);
  totalCartPrice.yens = Math.floor(totalDollarsSum * ExchangeRates.yens);
  
  const calculateCostOtherRates = (cartPrice) => {
    for (const cur in cartPrice) {
      document.write(`Общая стоимость всех товаров в корзине составляет <b> ${cartPrice[cur]} ${cur} </b> <br>`);
    }
  };

  calculateCostOtherRates(totalCartPrice);
}

const onError = (messege = `Error!`) => document.write(messege);

window.receive('https://www.floatrates.com/daily/usd.json', onSuccess, onError);
