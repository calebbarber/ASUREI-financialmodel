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
  return <h1>View Energy Efficiency For Our Current Renewable Energy Systems</h1>
}

// class PowerGenerated {
//   constructor(kwh, kbtu) {
//     this.kwh = kwh;
//     this.kbtu = kbtu;
//   }
// }

class Savings /* extends PowerGenerated */ {
  constructor(kwh, kbtu, cost) {
    this.kwh = kwh;
    this.kbtu = kbtu;
    this.cost = cost;
    this.months = 0;
    this.years = 0;
  }

  calculateKWH() {
    this.months = this.cost/(.0995 * this.kwh); /* 9.95 cents per kWh */
    this.months = Math.ceil(this.months);

    let remainder = this.months % 12;
    this.years = this.months / 12;
    
    let targetYear = new Date().getFullYear() + this.years;
    targetYear = Math.floor(targetYear);

    if (remainder) {
      this.years = Math.floor(this.years);
      return (
        <h4>
          This project will take {this.years} years and {remainder} months
          to achieve a return, i.e. the year {targetYear}.
        </h4>
      );
    }
    
    return (
      <h4>
        This project will take {this.years} years to achieve a return,
        i.e. the year {targetYear}.
      </h4>
    );
  }

  calculateKBTU() {
    this.months = this.cost/(.0007 * (this.kbtu * 1000)); /* 0.07 cents per BTU */
    this.months = Math.ceil(this.months);

    let remainder = this.months % 12;
    this.years = this.months / 12;

    let targetYear = new Date().getFullYear() + this.years;
    targetYear = Math.floor(targetYear);

    if (remainder) {
      this.years = Math.floor(this.years);
      return (
        <h4>
          This project will take {this.years} years and {remainder} months
          to achieve a return, i.e. the year {targetYear}.
        </h4>
      );
    }

    return (
      <h4>
        This project will take {this.years} years to achieve a return,
        i.e. the year {targetYear}.
      </h4>
    );
  }
}

class Profits /* extends PowerGenerated */ {
  constructor(kwh, kbtu, years, cost) {
    this.kwh = kwh;
    this.kbtu = kbtu;
    this.years = years;
    this.cost = cost;
    this.progress = 0;
  }

  calculate() {
    let yearKwh = this.kwh * 12;
    this.progress = .0995 * (yearKwh * this.years);
    this.progress.toFixed(2);

    let result = this.progress - this.cost;
    if (result < 0) { /* ROI not yet achieved */
      let diff = this.cost - this.progress;
      return <p>
        This project has saved ${this.progress} after {this.years} years\n
        This project will need to save ${diff} to acheive a Return
      </p>
    } else { /* ROI acheived */
      return <p>This project has saved ${this.progress} after {this.years} years</p>
    }
  }

  // calculateOld() {
  //   let yearKwh = this.kwh * 12;
  //   this.profit = .0995 * (yearKwh * this.years);
  //   this.profit = this.profit.toFixed(2);
  //   let targetYear = new Date().getFullYear() + this.years + this.roi;

  //   return <p>You will have saved ${this.profit} by the year {targetYear}.</p>
  // }
}

function KWHForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    displayKwhROI(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter kWh Saved Per Month:
        <input
          type='number'
          name='kwh'
          value={inputs.kwh || ''}
          onChange={handleChange}
          required='required'
        />
      </label>
      <label>Enter Total Cost:
        <input
          type='number'
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

function KBTUForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    displayBtuROI(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter kBTU Saved Per Month: 
        <input
          type='number'
          name='kbtu'
          value={inputs.kbtu || ''}
          onChange={handleChange}
          required='required'
        />
      </label>
      <label>Enter Total Cost:
        <input
          type='number'
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

function YearlyProgressForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    displayYearlyProgress(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter number of years:
        <input
          type='number'
          name='years'
          value={inputs.years || ''}
          onChange={handleChange}
          required='required'
        />
      </label>
      <input type='submit' value='Calculate'/>
      <p><em>* This feature has not been implemented yet</em></p>
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

function displayKwhROI(inputs) {
  const savings = new Savings(inputs.kwh, 0, inputs.cost);
  ReactDOM.render(savings.calculateKWH(), document.getElementById('kwhRoi'));
  // ReactDOM.render(<YearlyProgressForm />, document.getElementById('kwhProgressForm'));

  // const profits5 = new Profits(inputs.kwh, 5, savings.years);
  // const profits20 = new Profits(inputs.kwh, 20, savings.years);
  // ReactDOM.render(profits5.calculate(), document.getElementById('profit5'));
  // ReactDOM.render(profits20.calculate(), document.getElementById('profit20'));
}

function displayBtuROI(inputs) {
  const savings = new Savings(0, inputs.kbtu, inputs.cost);
  ReactDOM.render(savings.calculateKBTU(), document.getElementById('btuRoi'));
  ReactDOM.render(<YearlyProgressForm />, document.getElementById('kbtuProgressForm'));
}

function displayYearlyProgress(inputs) {
  // const progress = new Profits(kwh, inputs.years, cost); /* trying to figure out how to get kwh and cost from displayKwhROI() */
  // ReactDOM.render(progress.calculate(), document.getElementById())
  alert('Looks like someone did not read the disclaimer');
}

ReactDOM.render(<H1 />, document.getElementById('h1'));
ReactDOM.render(<Header />, document.getElementById('head'));
ReactDOM.render(<KWHForm />, document.getElementById('kwhForm'));
ReactDOM.render(<KBTUForm />, document.getElementById('kbtuForm'));
ReactDOM.render(<CurrentSystemH1 />, document.getElementById('currentSystemH1'));
ReactDOM.render(<CurrentSystemDropdown />, document.getElementById('currentSystemSelect'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
