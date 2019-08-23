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
    types: ["Fire", "Water", "Grass", "Electric", "Psychic", "Normal", "Flying", "Ghost", "Poison", "Ice", "Ground", "Rock", "Dragon", "Fighting", "Bug"],
    weaknesses: ["Fire", "Water", "Grass", "Electric", "Psychic", "Normal", "Fairy", "Dark", "Steel", "Flying", "Ghost", "Poison", "Ice", "Ground", "Rock", "Dragon", "Fighting", "Bug"],
    isloaded: false,
    enoughData: true,
    checkedTypes: [],
    checkedWeaknesses: []
  };

  fetchItems = (searchTerm = "", types = [], weaknesses = []) => {
    axios
      .get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
      .then(response => {
        let parsedResponse = this.parseSearchResults(response.data.pokemon, searchTerm, types, weaknesses);
        this.setState({
          data: parsedResponse,
          isloaded: true,
          enoughData: parsedResponse.length >= 1 ? true : false
        });
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
  };

  handleFormSubmit = e => {
    let { searchTerm, checkedTypes, checkedWeaknesses } = this.state;
    e.preventDefault();
    this.fetchItems(searchTerm, checkedTypes, checkedWeaknesses);
  };

  handleSearchChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  handleTypeChange = e => {
    this.setState({
      checkedTypes: e
    });
  };

  handleWeaknessChange = e => {
    this.setState({
      checkedWeaknesses: e
    });
  };

  applyFilters = (input, parameters, value) => {
    let parsed = [];
    if (parameters.length > 0) {
      input.forEach(element => {
        if (_.difference(parameters, element[value]).length === 0) {
          parsed.push(element);
        }
      });
      return parsed;
    }
    return input;
  };

  parseSearchResults = (input, searchTerm, types, weaknesses) => {
    let resultant = [];

    if (searchTerm === "") {
      resultant = input;
    }

    if (searchTerm !== "" && searchTerm !== undefined) {
      input.forEach(element => {
        if (element.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          resultant.push(element);
        }
      });
    }

    resultant = this.applyFilters(this.applyFilters(resultant, types, "type"), weaknesses, "weaknesses");
    return resultant;
  };

  async componentDidMount() {
    await this.fetchItems();
  }

  render() {
    const { data, isloaded, searchTerm, enoughData, types, weaknesses, checkedTypes, checkedWeaknesses } = this.state;

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Catch 'Em All</h1>
        <div className="form" style={{ textAlign: "center", marginBottom: "30px" }}>
          <form onSubmit={this.handleFormSubmit}>
            <input type="text" value={searchTerm} placeholder="Enter search term" onChange={this.handleSearchChange} />
            <label className="selectBox">
              <div className="selectBox">
                <Multiselect options={types} isObject={false} onSelect={this.handleTypeChange} onRemove={this.handleTypeChange} selectedvalues={checkedTypes} placeholder={"Filter Types:"} />
              </div>
            </label>
            <label>
              <div className="selectBox">
                <Multiselect options={weaknesses} isObject={false} onSelect={this.handleWeaknessChange} onRemove={this.handleWeaknessChange} selectedvalues={checkedWeaknesses} placeholder={"Filter Weaknesses:"} />
              </div>
            </label>
            <input type="submit" value="search" />
          </form>
        </div>
        {isloaded && <PokemonList stuff={data} renderList={enoughData} />}
      </div>
    );
  }
}

export default Home;
