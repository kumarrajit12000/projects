import React, { useEffect, useState } from 'react'
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import "./App.css"
import axios from 'axios';

const App = () => {

  const [data, setData] = useState({ amount : "", from : "usd" , to : "inr"});
  const [info, setInfo] = useState([]);
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(0);

  useEffect(() => {

       axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${data.from}.json`)
            .then((res) => {
              setInfo(res.data[data.from]);
            })
            .catch((err) => console.log(err));
              
  },[data.from,data.to]);

  useEffect(() => {
    setOptions(Object.keys(info))
    convert()
    console.log(options)

  },[info])

  
  const convert = () => {
    setResult(data.amount * info[data.to]);
}
  
  const updateValue = (event) => {
       setData({...data, [event.target.name] : event.target.value})

  }

  const reset = () => {
        setData({
           amount : "",
           from : "usd",
           to : "inr"
        })

        setResult(0)
  }

  return (
    <div className='main'>
      <div className='Navbar'>
        <div className='logo'> <CurrencyExchangeRoundedIcon/> <b>Currency Converter</b> </div>
      </div>
      <div className='hero'>
        <div className='container'>
            <div className='inputs'>
              <h3>AMOUNT</h3>
              <input type='text' placeholder='Enter Amount' name='amount'  value={data.amount} onChange={updateValue} style={{height:'30px' , fontSize : '20px',}}></input>
            </div>
            <div className='inputs'>
              <h3>FROM</h3>
              <select name='from' onChange={updateValue} style={{fontSize: '20px'}} value={data.from}>
                { options.map(el => {
                  return (
                    <option value={el}>{el}</option>
                  )
                }) }
              </select>
            </div>
            <div className='inputs' onChange={updateValue} >
              <h3>TO</h3>
              <select name='to' style={{fontSize: '20px'}} value={data.to}>
              { options.map(el => {
                return(
                    <option value={el}>{el}</option>
                )
                }) }
              </select>
            </div>
            <div className='' style={{textAlign : 'center' , marginTop : '30px'}}>
               <h2>CONVERTED AMOUNT</h2>
               <h3 style={{margin : "10px" , fontSize : '30px'}}>{data.amount + " "}{data.from}</h3>
               <h3 style={{margin : "10px" , fontSize : '30px'}}> = </h3>
               <h3 style={{margin : "10px" , fontSize : '30px'}}> {result + " "} {data.to}</h3>
               <div style={{display : "flex", flexDirection : "column" , alignItems : "center" ,gap : "10px"}}>
               <button style={{width : "50%", height : '30px'}} onClick={convert}>CONVERT</button>
               <button style={{width : "50%", height : '30px'}} onClick={reset}>RESET</button>
               </div>
            </div>
            </div>
      </div>
    </div>
  )
}

export default App