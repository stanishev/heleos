import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      supply: '',
      base: '',
      quote: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
   
    let data = JSON.stringify({
      scope: "eosio",
      code: "eosio",
      table: "rammarket",
      json: true
    })

    console.log(data)
    axios.post('http://api.eosnewyork.io/v1/chain/get_table_rows', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    })
    .then(response => { 
      let row = response.data.rows[0]
      console.log(response);
      this.setState({supply: row.supply, base: row.base['balance'], quote: row.quote['balance']}) 
    })
  }

  render() {
    return (
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}>
          Refresh RAM Market 
        </button>
        <p>Supply: {this.state.supply}</p>
        <p>Base: {this.state.base}</p>
        <p>Quote: {this.state.quote}</p>

      </div>
    )
  }
}

export default App;
