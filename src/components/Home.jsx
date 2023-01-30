import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "./Navbar";
const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1120"
  );
  const [inputName, setinputName] = useState("");

  // Pokemon Data
  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    setLoadMore(data.next);
    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };


  useEffect(() => {
    getAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="search-form">
          <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup className="mb-3">
              <label>Search by</label>
              <Form.Control
                placeholder="Name or Number"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={inputName}
                className="inputValues"
                onChange={(e) => {
                  setinputName(e.target.value);
                }}
              />
              <InputGroup.Text id="basic-addon">
                <button
                  id="submitbtn"
                  type="submit"
                  disabled={inputName.length <= 0}
                >
                  <span className="material-symbols-outlined">search</span>
                </button>
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemons.length > 0 ?
              allPokemons
                .filter((data) => {
                  return data.name.toLowerCase().includes(inputName.toLowerCase())
                })
                .map((pokemonStats, index) => {
                  return (
                    <PokemonCard
                      key={index}
                      id={pokemonStats.id}
                      name={pokemonStats.name}
                      type={pokemonStats.types[0].type.name}
                      data={pokemonStats}
                    />
                  );
                }) : <p>No item found</p>}
          </div>

          <button className="load-more" onClick={getAllPokemons}>
            Load more
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
