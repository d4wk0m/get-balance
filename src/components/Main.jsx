import React, { useEffect, useState } from 'react'

function Main() {
    const [currentPrice, setCurrentPrice] = useState("")
    const [currentPercent, setCurrentPercent] = useState("")
    const [currentBalance, setCurrentBalance] = useState("")
    const [differenceBalance, setDifferenceBalance] = useState("")
    var currentB
    var currentP
    
    async function getData() {
      return await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=LUNABUSD')
        .then(response => response.json())
        .then(data => {
          setCurrentPrice(data.lastPrice)
          setCurrentPercent(Math.round(((Number(data.priceChangePercent) + Number.EPSILON) * 100)) / 100);
        })
    }

    //retrieve current price, setCurrentPrice
    useEffect(() => {
      const intervalCall = setInterval(() => {
        getData();
      }, 1000);
      return () => {
        clearInterval(intervalCall);
      };
    }, []);

    
    //setCurrentBalance
    useEffect(() => {
      let old = currentBalance;
      setCurrentBalance(Math.round(((currentPrice * 260000 * 4.6) + Number.EPSILON) * 100) / 100);
      currentB = Math.round(((currentPrice * 260000 * 4.6) + Number.EPSILON) * 100) / 100
      changePercentColor(currentPercent);
      window.setTimeout(() => {
        changeColor(old, currentB, "balance");
      }, 10)
      setDifferenceBalance((400 - currentB) * -1)
      setColor(differenceBalance)
    }, [ currentPrice ])

    //change color
    function changeColor(old, current, id) {
      if (old <= current) {
        document.querySelectorAll('.change').forEach((item) => {
          item.style.color = "green"
        })
      }
      else {
        document.querySelectorAll('.change').forEach((item) => {
          item.style.color = "red"
        })
      }
    }

    function changePercentColor(current) {
      if (current < 0){
        document.getElementById('price-percentage').style.backgroundColor = 'red'
      }
      else {
        document.getElementById('price-percentage').style.backgroundColor = 'green' 
      }
    }

    function setColor(difference) {
      if (difference < 0){
        document.getElementById('difference').style.backgroundColor = 'red'
      }
      else {
        document.getElementById('difference').style.backgroundColor = 'green' 
      }
    }


    return (
      <div className="container-sm content-container">
        <h1>Get Balance</h1>
        <div className="balance">
          <div className="item">
            <h2>Current price</h2>
            <div className="row">
              <h3 id="price" className="change">{ currentPrice } USD</h3>
              <h4 id="price-percentage">{ currentPercent } %</h4>
            </div>
          </div>
          <div className="item">
            <h2>Current balance</h2>
            <div className="row">
              <h3 id="balance" className="change">{ currentBalance } zł</h3>
              <h4 id="difference">{ differenceBalance } zł</h4>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Main