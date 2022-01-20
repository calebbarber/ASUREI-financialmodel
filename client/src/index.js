import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

const Header = () => {
  const myStyle = {
    height: "150px",
    marginLeft: "20px"
  };

  return (
    <a href='http://asurei-data.appstate.edu'>
      <img src="asurei.gif" alt='ASUREI' style={myStyle}/>
    </a>
  );
}

const H1 = () => {
  return <h1>Energy Efficiency Project Return on Investment Calculator</h1>;
}

const CurrentSystemH1 = () => {
  return <h1>View Energy Efficiency For Our Current Systems</h1>
}

class KwhGenerated {
  constructor(kwh) {
    this.kwh = kwh;
  }

  print() {
    return 'This project generates ' + this.kwh + ' kWh per month';
  }
}

class Savings extends KwhGenerated {
  constructor(kwh, cost) {
    super(kwh);
    this.cost = cost;
    this.months = 0;
    this.years = 0;
  }

  calculate() {
    this.months = this.cost/(.1115 * this.kwh);
    this.months = Math.ceil(this.months);

    let remainder = this.months % 12;
    this.years = this.months / 12;
    
    let targetYear = new Date().getFullYear() + this.years;
    targetYear = Math.floor(targetYear);

    if (remainder) {
      this.years = Math.floor(this.years);
      return (
        <p>
          This project will take {this.years} years and {remainder} months
          to achieve a return, i.e. the year {targetYear}.
        </p>
      );
    }
    
    return (
      <p>
        This project will take {this.years} years to ahieve a return,
        i.e. the year {targetYear}.
      </p>
    )
  }
}

class Profits extends KwhGenerated {
  constructor(kwh, years, roi) {
    super(kwh);
    this.years = years;
    this.roi = roi;
    this.profit = 0;
  }

  calculate() {
    let yearKwh = this.kwh * 12;
    this.profit = .1115 * (yearKwh * this.years);
    this.profit = this.profit.toFixed(2);
    let targetYear = new Date().getFullYear() + this.years + this.roi;

    return <p>You will have saved ${this.profit} by the year {targetYear}.</p>
  }
}

function MyForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    displayResults(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter kWh Saved Per Month:
        <input
          type='text'
          name='kwh'
          value={inputs.kwh || ''}
          onChange={handleChange}
          required='required'
        />
      </label>
      <label>Enter Total Cost:
        <input
          type='text'
          name='cost'
          value={inputs.cost || ''}
          onChange={handleChange}
          required='required'
        />
      </label>
      <input type='submit' value='Calculate'/>
    </form>
  );
}

function CurrentSystemDropdown() {
  const [mySystem, setMySystem] = useState('default');

  const handleChange = (event) => {
    setMySystem(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mySystem === 'default') {
      alert('Looks like someone did not read the disclaimer\n'
            + 'And select is not even a real option');
    } else {
      alert('Looks like someone did not read the disclaimer');
    }
  }

  // const DoesntWork = () => {
  //   return <p><em>* This feature has not been implemented yet</em></p>;
  // }

  return (
    <form onSubmit={handleSubmit}>
      <select value={mySystem} onChange={handleChange}>
        <option value='default'>Select</option>
        <option value='wind'>Wind Turbine</option>
        <option value='legends'>Legends PV</option>
        <option value='library'>Library Circle PV</option>
        <option value='mtnarray'>Mountain Array PV</option>
        <option value='plemmons'>Plemmons Student Union ST</option>
        <option value='varsity'>Varsity Gym ST</option>
      </select>
      <input type='submit' value='Submit'/>
      <p><em>* This feature has not been implemented yet</em></p>
    </form>
  )
}

function displayResults(inputs) {
  const savings = new Savings(inputs.kwh, inputs.cost);
  ReactDOM.render(savings.calculate(), document.getElementById('roi'));

  const profits5 = new Profits(inputs.kwh, 5, savings.years);
  const profits20 = new Profits(inputs.kwh, 20, savings.years);
  ReactDOM.render(profits5.calculate(), document.getElementById('profit5'));
  ReactDOM.render(profits20.calculate(), document.getElementById('profit20'));
}

ReactDOM.render(<H1 />, document.getElementById('h1'));
ReactDOM.render(<Header />, document.getElementById('head'));
ReactDOM.render(<MyForm />, document.getElementById('form'));
ReactDOM.render(<CurrentSystemH1 />, document.getElementById('currentSystemH1'));
ReactDOM.render(<CurrentSystemDropdown />, document.getElementById('currentSystemSelect'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);