import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

const Header = () => {
  const myStyle = {
    height: "145px",
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

const BuildingUsageH1 = () => {
  return <h1>View Energy Efficiency Of Our Campus Buildings</h1>
}

let savingsValues = {
  kwh: 0,
  kbtu: 0,
  cost: 0,
  years: 0,
  kwhOld: 0,
  kbtuOld: 0
};

class Savings /* extends PowerGenerated */ {
  constructor(kwh, kbtu, cost) {
    this.kwh = kwh;
    this.kbtu = kbtu;
    this.cost = cost;
    this.months = 0;
    this.years = 0;
  }

  calculateKWH() {
    this.months = this.cost/(.091 * this.kwh); /* 9.95 cents per kWh */
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

function addCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Progress {
  constructor(kwh, kbtu, years, cost) {
    this.kwh = kwh;
    this.kbtu = kbtu;
    this.years = years;
    this.cost = cost;
    this.progress = 0;
  }

  calculateKWH() {
    let yearKwh = this.kwh * 12;
    this.progress = .091 * (yearKwh * this.years);
    this.progress = this.progress.toFixed(2);
    let progressDisplay = addCommas(this.progress);

    let diff = this.cost - this.progress;
    diff = diff.toFixed(2);
    let diffDisplay = addCommas(diff);

    let result = this.progress - this.cost;
    let yearString = 'years';
    if (this.years == 1) {
      yearString = 'year';
    }

    if (this.years == 0) {
      return <h4>Why?</h4>
    }

    if (result < 0) { /* ROI not yet achieved */
      return <h4>
        This project has saved ${progressDisplay} after {this.years} {yearString}<br></br>
        This project will need to save ${diffDisplay} to acheive a return
      </h4>
    } else { /* ROI acheived */
      diff *= -1;
      diff = diff.toFixed(2);
      diffDisplay = addCommas(diff);
      return <h4>
        This project has saved ${progressDisplay} after {this.years} {yearString}<br></br>
        That is ${diffDisplay} over the initial cost
      </h4>
    }
  }

  calculateKBTU() {
    let yearKbtu = this.kbtu * 12;
    let yearBtu = yearKbtu * 1000;

    this.progress = .0007 * (yearBtu * this.years);
    this.progress = this.progress.toFixed(2);
    let progressDisplay = addCommas(this.progress);

    let diff = this.cost - this.progress;
    diff = diff.toFixed(2);
    let diffDisplay = addCommas(diff);

    let result = this.progress - this.cost;
    let yearString = 'years';
    if (this.years == 1) {
      yearString = 'year';
    }

    if (this.years == 0) {
      return <h4>Why?</h4>
    }

    if (result < 0) { /* ROI not yet achieved */
      return <h4>
        This project has saved ${progressDisplay} after {this.years} {yearString}<br></br>
        This project will need to save ${diffDisplay} to acheive a return
      </h4>
    } else { /* ROI acheived */
      diff *= -1;
      diff = diff.toFixed(2);
      diffDisplay = addCommas(diff);
      return <h4>
        This project has saved ${progressDisplay} after {this.years} {yearString}<br></br>
        That is ${diffDisplay} over the initial cost
      </h4>
    }
  }
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

function YearlyKWHProgresForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    DisplayYearlyKWHProgres(inputs);
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
    </form>
  );
}

function YearlyBTUProgresForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    DisplayYearlyBTUProgress(inputs);
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
    </form>
  );
}

function BuildingNameDropdown() {
  const [mySystem, setMySystem] = useState('default');

  const handleChange = (event) => {
    setMySystem(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mySystem === 'default') {
      alert('Looks like someone did not read the disclaimer\n'
            + 'And select is not even a real building');
    } else {
      alert('Looks like someone did not read the disclaimer');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={mySystem} onChange={handleChange}>
        <option value='default'>Select</option>
        <option value='ABH'>Anne Belk</option>
        <option value='CW'>Chapel Wilson</option>
        <option value='KH'>Kathryn Harper</option>
        <option value='COCK'>Peacock</option>
        <option value='PSU'>Plemmons</option>
        <option value='RSW'>Rankin Science West</option>
      </select>
      <input type='submit' value='Submit'/>
      <p><em>* This feature has not been implemented yet</em></p>
    </form>
  )
}

function displayKwhROI(inputs) {
  if (inputs.kwh < 0) {
    alert('If this project is losing power is it really a good idea?');
    return;
  }

  if (inputs.cost < 0) {
    alert('I wish it worked like that but someone has to pay for this');
    return;
  }

  const savings = new Savings(inputs.kwh, 0, inputs.cost);
  savingsValues.kwh = inputs.kwh;
  savingsValues.cost = inputs.cost;

  ReactDOM.render(savings.calculateKWH(), document.getElementById('kwhRoi'));
  ReactDOM.render(<YearlyKWHProgresForm />, document.getElementById('kwhProgressForm'));
}

function displayBtuROI(inputs) {
  if (inputs.kbtu < 0) {
    alert('If this project is losing energy is it really a good idea?');
    return;
  }

  if (inputs.cost < 0) {
    alert('I wish it worked like that but someone has to pay for this');
    return;
  }
  
  const savings = new Savings(0, inputs.kbtu, inputs.cost);
  savingsValues.kbtu = inputs.kbtu;
  savingsValues.cost = inputs.cost;

  ReactDOM.render(savings.calculateKBTU(), document.getElementById('btuRoi'));
  ReactDOM.render(<YearlyBTUProgresForm />, document.getElementById('kbtuProgressForm'));
}

function DisplayYearlyKWHProgres(inputs) {
  const progress = new Progress(savingsValues.kwh, 0, inputs.years, savingsValues.cost);
  ReactDOM.render(progress.calculateKWH(), document.getElementById('kwhProgress'));
}

function DisplayYearlyBTUProgress(inputs) {
  const progress = new Progress(0, savingsValues.kbtu, inputs.years, savingsValues.cost);
  ReactDOM.render(progress.calculateKBTU(), document.getElementById('btuProgress'));
}

ReactDOM.render(<H1 />, document.getElementById('h1'));
ReactDOM.render(<Header />, document.getElementById('head'));
ReactDOM.render(<KWHForm />, document.getElementById('kwhForm'));
ReactDOM.render(<KBTUForm />, document.getElementById('kbtuForm'));
ReactDOM.render(<BuildingUsageH1 />, document.getElementById('buildingUsageH1'));
ReactDOM.render(<BuildingNameDropdown />, document.getElementById('BuildingNameSelect'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
