import axios from 'axios';
import fs from 'fs'


const stocks: string[] = ['AAPL', 'MSFT', 'GOOG', 'AMZN', 'TSM', 'XOM', 'NVDA', 'TSLA', 'META', 'SPY', 'VTI', 'VOO', 'VEA', 'VWO', 'VXUS', 'SCHF', 'IVE']

export const stockHandler = async (code: string) => {
  try {
    const { data } = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${code}&apikey=${process.env.STOCKS_API_KEY}`)
    fs.writeFile(`${__dirname}/stock-data/${code}.txt`, JSON.stringify(data), 'utf-8', (err) => {
      if (err) {
        console.log(err)
      }
      console.log(`Data written to /${code}.txt`)

    })

  } catch (err) {
    console.error(err)
  }
}

export const fetchStocks = async () => {
  let i = 0;
  const customLoop = () => {
    console.log(i)
    setTimeout(() => {
      stockHandler(stocks[i])
      i++
      if (i <= stocks.length - 1) {
        customLoop();
      }
    }, 20 * 1000)
  }
  customLoop();
}

