import React, { Component } from "react";
import axios from "axios";
import "../styles/home.css";

import PokemonList from "./PokemonList";

class Home extends Component {
  state = {
    data: [],
    searchTerm: "",
    traits: ["Fire", "Water", "Grass", "Electric", "Psychic", "Steel", "Normal", "Fairy", "Dark", "Flying", "Ghost", "Poison", "Ice", "Ground", "Rock", "Dragon", "Fighting", "Bug"],
    isloaded: false
  };

  fetchItems = () => {
    axios
      .get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
      .then(response => {
        this.setState({
          data: response.data.pokemon,
          isloaded: true
        });
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
  };

  handleSearch = e => {
    e.preventDefault();
    console.log(this.state.searchTerm);
  };

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  async componentDidMount() {
    await this.fetchItems();
  }

  render() {
    const { data, isloaded, searchTerm } = this.state;

    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Catch 'Em All</h1>
        <div className="form" style={{ textAlign: "center", marginBottom: "30px" }}>
          <form onSubmit={this.handleSearch}>
            <label>
              <input type="text" value={searchTerm} placeholder="enter search term" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        {isloaded && <PokemonList stuff={data} searchTerm={searchTerm} />}
      </div>
    );
  }
}

export default Home;
