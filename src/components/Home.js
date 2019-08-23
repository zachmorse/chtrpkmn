import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import _ from "lodash";
import axios from "axios";
import "../styles/home.css";

import PokemonList from "./PokemonList";

class Home extends Component {
  state = {
    data: [],
    searchTerm: "",
    traits: ["Fire", "Water", "Grass", "Electric", "Psychic", "Steel", "Normal", "Fairy", "Dark", "Flying", "Ghost", "Poison", "Ice", "Ground", "Rock", "Dragon", "Fighting", "Bug"],
    isloaded: false,

    enoughData: true,
    checkedTypes: [],
    checkedWeaknesses: []
  };

  fetchItems = (searchTerm, type = [], weaknesses = []) => {
    axios
      .get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
      .then(response => {
        let parsedResponse = this.parseSearchResults(response.data.pokemon, searchTerm);
        let filteredResponse = this.filterSearchResults(parsedResponse, type, weaknesses);
        console.log(this.state);
        this.setState({
          data: filteredResponse,
          isloaded: true,
          enoughData: filteredResponse.length >= 1 ? true : false
        });
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
  };

  initiateSearch = e => {
    let { searchTerm, checkedTypes, checkedWeaknesses } = this.state;
    e.preventDefault();
    this.fetchItems(searchTerm, checkedTypes, checkedWeaknesses);
  };

  handleSearchChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  handleTypeChange = (e) => {
    this.setState({
      checkedTypes: e
    })
  };

  handleWeaknessChange = (e) => {
    this.setState({
      checkedWeaknesses: e
    })
  };

  parseSearchResults = (input, searchTerm)=> {
    let resultant = [];

    if (searchTerm !== "" && searchTerm !== undefined) {
      input.forEach(element => {
        if (element.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          resultant.push(element);
        }
      });
      return resultant;
    }
    return input;
  }

  filterSearchResults = (input, type, weaknesses) => {
    let parsedArray = input;
    if (type.length > 0) {
      type.forEach(type => {
        // parsedArray.forEach((element, index) => {
        //   console.log(`checking to see if ${type} exists in ${element.type} at ${element.id - 1}`);
        //   if (element.type.indexOf(type) === -1) {
        //     console.log("it does not, so cut it from the array");
        //     parsedArray.splice(element.id - 1, 1);
        //   }
        // });

        // use the type and compare that with the types found in the parsedArray
        // if you find it (index of > -1) then use splice to cut it out
        // type is the checkbox params, compare that to the elements


      });
      
    }
    console.log("PARSED:", parsedArray);
    return parsedArray;
  }

  async componentDidMount() {
    await this.fetchItems();
  }

  render() {
    const { data, isloaded, searchTerm, enoughData, traits, checkedTypes, checkedWeaknesses, formSubmitted } = this.state;

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Catch 'Em All</h1>
        <div className="form" style={{ textAlign: "center", marginBottom: "30px" }}>
          <form onSubmit={this.initiateSearch}>
            <input type="text" value={searchTerm} placeholder="Enter search term" onChange={this.handleSearchChange} />
            <label>
              <Multiselect 
                options={traits} 
                isObject={false} 
                onSelect={this.handleTypeChange} 
                onRemove={this.handleTypeChange} 
                selectedvalues={checkedTypes} 
                placeholder={"Filter Types:"}/>
            </label>
            <label>
              <Multiselect 
                options={traits} 
                isObject={false} 
                onSelect={this.handleWeaknessChange} 
                onRemove={this.handleWeaknessChange} 
                selectedvalues={checkedWeaknesses} 
                placeholder={"Filter Weaknesses:"}/>
            </label>
            <input type="submit" value={formSubmitted ? "Update Search" : "Perform Search" } />
          </form>
        </div>
        {isloaded && <PokemonList stuff={data} renderList={enoughData} />}
      </div>
    );
  }
}

export default Home;