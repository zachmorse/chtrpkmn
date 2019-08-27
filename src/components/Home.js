import React, { useState, useEffect } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import _ from "lodash";
import axios from "axios";
import "../styles/home.css";

import PokemonList from "./PokemonList";

function Home() {
  const [masterData, setMasterData] = useState([]);
  const [isLoaded, toggleLoaded] = useState(false);
  const [searchTerm, updateSearchTerm] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [selectedTypes, updateSelectedTypes] = useState([]);
  const [selectedWeaknesses, updateSelectedWeaknesses] = useState([]);

  const types = ["Fire", "Water", "Grass", "Electric", "Psychic", "Normal", "Flying", "Ghost", "Poison", "Ice", "Ground", "Rock", "Dragon", "Fighting", "Bug"];
  const weaknesses = ["Fire", "Water", "Grass", "Electric", "Psychic", "Normal", "Fairy", "Dark", "Steel", "Flying", "Ghost", "Poison", "Ice", "Ground", "Rock", "Dragon", "Fighting", "Bug"];

  useEffect(() => {
    axios
      .get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
      .then(response => {
        setMasterData(response.data.pokemon);
        setDisplayData(response.data.pokemon);
        toggleLoaded(true);
      })
      .catch(err => {
        console.log("ERROR:", err);
      });
  }, []);

  const updateResults = e => {
    e.preventDefault();

    let searched = !searchTerm ? masterData : masterData.filter(element => element.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    let typeFiltered = selectedTypes.length > 0 ? searched.filter(element => _.difference(selectedTypes, element.type).length === 0) : searched;
    let weaknessFiltered = selectedWeaknesses.length > 0 ? typeFiltered.filter(element => _.difference(selectedWeaknesses, element.weaknesses).length === 0) : typeFiltered;

    setDisplayData(weaknessFiltered);
  };

  const handleWeaknessChange = e => {
    updateSelectedWeaknesses(e);
  };

  const handleTypeChange = e => {
    updateSelectedTypes(e);
  };

  return (
    <div>
      {isLoaded && (
        <div>
          <h1 className="headerTitle">Gotta Catch 'Em All!</h1>
          <div className="form" style={{ textAlign: "center", marginBottom: "30px" }}>
            <form onSubmit={updateResults}>
              <input type="text" value={searchTerm} placeholder="Enter search term" onChange={e => updateSearchTerm(e.target.value)} />
              <label className="selectBox">
                <div className="selectBox">
                  <Multiselect options={types} isObject={false} onSelect={handleTypeChange} onRemove={handleTypeChange} selectedvalues={selectedTypes} placeholder={"Filter Types:"} />
                </div>
              </label>
              <label>
                <div className="selectBox">
                  <Multiselect options={weaknesses} isObject={false} onSelect={handleWeaknessChange} onRemove={handleWeaknessChange} selectedvalues={selectedWeaknesses} placeholder={"Filter Weaknesses:"} />
                </div>
              </label>
              <input type="submit" value="search" />
            </form>
          </div>
          <PokemonList stuff={displayData} renderList={displayData.length > 0} />
        </div>
      )}
    </div>
  );
}

export default Home;
