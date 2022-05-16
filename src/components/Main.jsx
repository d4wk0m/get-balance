import React, { useEffect, useState } from 'react'

function Main() {
    const [currentPrice, setCurrentPrice] = useState("")
    const [currentBalance, setCurrentBalance] = useState("")
    var currentB
    
    async function getData() {
      return await fetch('https://api.binance.com/api/v3/ticker/price?symbol=LUNABUSD')
        .then(response => response.json())
        .then(data => setCurrentPrice(data.price));
    }

    //retrieve current price, setCurrentPrice
    useEffect(() => {
      const intervalCall = setInterval(() => {
        let old = currentPrice
        getData();
      }, 3000);
      return () => {
        clearInterval(intervalCall);
      };
    }, []);

    
    //setCurrentBalance
    useEffect(() => {
      let old = currentBalance;
      console.log("old: " + old)
      setCurrentBalance(Math.round(((currentPrice * 260000 * 4.6) + Number.EPSILON) * 100) / 100);
      currentB = Math.round(((currentPrice * 260000 * 4.6) + Number.EPSILON) * 100) / 100
      console.log("current: " + currentB)
      window.setTimeout(() => {
        changeColor(old, currentB, "balance");
      }, 100)
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


    return (
      <div>
        <h1>Get Balance</h1>
        <div className="balance">
          <div className="item">
            <h2>Current price</h2>
            <h3 id="price" className="change">{ currentPrice }</h3>
          </div>
          <div className="item">
            <h2>Current balance</h2>
            <h3 id="balance" className="change">{ currentBalance }</h3>
          </div>
        </div>
      </div>
    )
}

export default Main