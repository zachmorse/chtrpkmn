import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import _ from "lodash";
import axios from "axios";
import "../styles/home.css";

export default class NewHome extends Component {
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

                this.setState({
                    data: response.data.pokemon,
                    isloaded: true,
                    enoughData: parsedResponse.length >= 1 ? true : false
                });
            })
            .catch(err => {
                console.log("ERROR:", err);
            });
    };

    async componentDidMount() {
        await this.fetchItems();
    }

    render() {
        render() {
            const { data, isloaded, searchTerm, enoughData, types, weaknesses, checkedTypes, checkedWeaknesses } = this.state;
        
            return (
              <div>
                {/* <h1 className="headerTitle">Gotta Catch 'Em All!</h1> */}
                <div className="form" style={{ textAlign: "center", marginBottom: "30px" }}>
                  <form onSubmit={this.handleFormSubmit}>
                    <input type="text" value={searchTerm} placeholder="Enter search term" onChange={this.handleSearchChange} />
                    <label>
                      <div className="selectBox">
                        <Multiselect 
                          options={types} 
                          isObject={false} 
                          onSelect={this.handleTypeChange} 
                          onRemove={this.handleTypeChange} 
                          selectedvalues={checkedTypes} 
                          placeholder={"Filter Types:"} 
                        />
                      </div>
                    </label>
                    <label>
                      <div className="selectBox">
                        <Multiselect 
                          options={weaknesses} 
                          isObject={false} 
                          onSelect={this.handleWeaknessChange} 
                          onRemove={this.handleWeaknessChange} 
                          selectedvalues={checkedWeaknesses} 
                          placeholder={"Filter Weaknesses:"} 
                        />
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
    }
