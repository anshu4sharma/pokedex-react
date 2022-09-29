import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "./Navbar";
const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
  );
  const [inputName, setinputName] = useState("");
  const userData = [
    { name: "Normal" },
    { name: "Fighting" },
    { name: "Flying" },
    { name: "Poison" },
    { name: "Ground" },
    { name: "Rock" },
  ];
  const genderData = [
    { name: "Male" },
    { name: "Female" },
    { name: "Genderless" },
  ];
  const [users, setUsers] = useState([]);
  const [gender, setGender] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isGenChecked, setIsGenChecked] = useState(false);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempUser = users.map((usr) =>
      usr.name === name ? { ...usr, isChecked: checked } : usr
    );
    setUsers(tempUser);
    setIsChecked(!isChecked);
  };
  const handlegenderChange = (e) => {
    const { name, checked } = e.target;
    let tempUser = gender.map((gen) =>
      gen.name === name ? { ...gen, isChecked: checked } : gen
    );
    setGender(tempUser);
    setIsGenChecked(!isGenChecked);
  };

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
        await allPokemons.sort((a, b) => a.id - b.id);
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };

  const fetchSinglePokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputName}`);
    const data = await res.json();
    setAllPokemons([data]);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    setUsers(userData);
    setGender(genderData);
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
                  onClick={fetchSinglePokemon}
                  id="submitbtn"
                  type="submit"
                  disabled={inputName.length <= 0}
                >
                  <span className="material-symbols-outlined">search</span>
                </button>
              </InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
              <label>Type</label>
              <div
                onClick={() => setIsChecked(!isChecked)}
                className="form-control pok-type"
              >
                <span>Normal + 5 More</span>
                {isChecked &&
                  users.map((usr, index) => (
                    <div className="form-check" key={index}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={usr.name}
                        checked={usr?.isChecked || false}
                        onChange={handleChange}
                      />
                      <label className="form-check-label ms-2">
                        {usr.name}
                      </label>
                    </div>
                  ))}
              </div>
            </InputGroup>
            <InputGroup className="mb-3">
              <label>Gender</label>
              <div
                onClick={() => setIsGenChecked(!isGenChecked)}
                className="form-control"
              >
                <span>Male +2 more</span>
                {isGenChecked &&
                  gender.map((gen, index) => (
                    <div className="form-check" key={index}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={gen.name}
                        checked={gen?.isChecked || false}
                        onChange={handlegenderChange}
                      />
                      <label className="form-check-label ms-2">
                        {gen.name}
                      </label>
                    </div>
                  ))}
              </div>
            </InputGroup>
          </Form>
        </div>
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemons.length > 0 &&
              allPokemons
                .filter((data) => {
                  if (
                    data.name.toLowerCase().includes(inputName.toLowerCase()) ||
                    data.id == inputName
                  ) {
                    return data;
                  }
                })
                .map((pokemonStats, index) => {
                  return (
                    <PokemonCard
                      key={index}
                      id={pokemonStats.id}
                      image={
                        pokemonStats.sprites.other.dream_world.front_default
                      }
                      name={pokemonStats.name}
                      type={pokemonStats.types[0].type.name}
                      data={pokemonStats}
                    />
                  );
                })}
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
