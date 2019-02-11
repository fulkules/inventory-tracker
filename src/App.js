import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Shoe from './components/Shoe';
import Search from './components/Search'
import Hero from './components/Hero';
import Footer from './components/Footer'


class App extends Component {
  constructor(){
    super()

    this.state = {
      shoes: [],
      id: 0,
      brand: ``,
      releaseInfo: ``,
      purchaseInfo: ``,
      marketValue: ``,
      input: ``
    }
  }

  handleSearch = (val) => {
    this.setState({
        input: val
    })
}

  handleBrand(val){
    this.setState({ brand: val })
  }

  handleReleaseDate(val){
    this.setState({ releaseInfo: val })
  }

  handlePurchaseInfo(val){
    this.setState({ purchaseInfo: val })
  }

  handleMarketValue(val){
    this.setState({ marketValue: val })
  }
  
  componentDidMount(){
    axios.get('/api/shoes').then((res) => {
      this.setState({
        shoes: res.data
      })
    })
  }

  addShoe(brand,releaseInfo,purchaseInfo,marketValue){
    axios.post('/api/shoe', {brand,releaseInfo,purchaseInfo,marketValue}).then(res => {
      this.setState({
        shoes: res.data,
        brand: ``,
        releaseInfo: ``,
        purchaseInfo: ``,
        marketValue: ``
      })
    })
  }

  updateShoe = (id, releaseInfo, purchaseInfo, marketValue) => {
    console.log(releaseInfo, purchaseInfo, marketValue)
    axios.put(`/api/shoe/${id}`, {releaseInfo,purchaseInfo,marketValue}).then(res => {
      this.setState({
        shoes: res.data,
      })
    })
  }

  deleteShoe = (id) => {
    axios.delete(`/api/shoe/${id}`).then(res => {
      this.setState({
        shoes: res.data
      })
    })
  }

  setEdit(releaseInfo,purchaseInfo,marketValue){
    this.setState({
      releaseInfo,
      purchaseInfo,
      marketValue
    })
  }

  render() {
    const {brand,releaseInfo,purchaseInfo,marketValue} = this.state
    let filteredShoes = this.state.shoes.filter(shoe => shoe.brand.toLowerCase().includes(this.state.input.toLowerCase())).map(shoe => {
      return(
        <Shoe 
          key={shoe.id}
          shoe={shoe}
          deleteShoe={this.deleteShoe}
          updateShoe={this.updateShoe}
          setEdit={this.setEdit}
        />
      )
    })
    
    return (
      <div className="App">
        <Hero className="hero"/> <br />
        <Search 
          handleSearch={this.handleSearch}
        /> <br />
        <input 
          className="inputAdd"
          placeholder="Add Shoe Brand-Model"
          onChange={(e) => this.handleBrand(e.target.value)}
          value={this.state.brand}
        />
        <input 
          className="inputAdd"
          placeholder="Add release date info"
          onChange={(e) => this.handleReleaseDate(e.target.value)}
          value={this.state.releaseInfo}
        />
        <input 
          className="inputAdd"
          placeholder="Add purchase info"
          onChange={(e) => this.handlePurchaseInfo(e.target.value)}
          value={this.state.purchaseInfo}
        />
        <input 
          className="inputAdd"
          placeholder="Add market value info"
          onChange={(e) => this.handleMarketValue(e.target.value)}
          value={this.state.marketValue}
        />
        <button onClick={() => this.addShoe(brand,releaseInfo,purchaseInfo,marketValue)}>Add Shoe</button>
        <br /><br />
        {filteredShoes}
        <br /> <br /> <br />
        <Footer />
      </div>
    );
  }
}

export default App;
