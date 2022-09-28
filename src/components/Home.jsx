import React, { useEffect, useState } from "react";
import PokemonThumb from "./PokemonThumb";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
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
  const genderData = [{ name: "Male" }, { name: "Female" }];
  const [users, setUsers] = useState([]);
  const [gender, setGender] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isGenChecked, setIsGenChecked] = useState(false);
  useEffect(() => {
    setUsers(userData);
    setGender(genderData);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempUser = users.map((user) =>
      user.name === name ? { ...user, isChecked: checked } : user
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

  useEffect(() => {
    getAllPokemons();
  }, []);

  console.log(gender[0]?.isChecked);
  return (
    <div className="app-container">
      <div className="search-form">
        <Form>
          <InputGroup className="mb-3">
            <label>Search by</label>
            <Form.Control
              placeholder="Name or Number"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              value={inputName}
              className="inputValues"
              onChange={(e) => setinputName(e.target.value)}
            />
            <InputGroup.Text id="basic-addon"></InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <label>Type</label>
            <div onClick={() => setIsChecked(!isChecked)} className="form-control">
              <span >
                Normal + 5 More
              </span>
              {isChecked &&
                users.map((user, index) => (
                  <div className="form-check" key={index}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={user.name}
                      checked={user?.isChecked || false}
                      onChange={handleChange}
                    />
                    <label className="form-check-label ms-2">{user.name}</label>
                  </div>
                ))}
            </div>
          </InputGroup>
          <InputGroup className="mb-3">
            <label>Gender</label>
            <div onClick={() => setIsGenChecked(!isGenChecked)} className="form-control">
              <span >
                Male +2 more
              </span>
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
                    <label className="form-check-label ms-2">{gen.name}</label>
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
                console.log(data);
                if (data.name.toLowerCase().includes(inputName.toLowerCase())) {
                  return data;
                }
              })
              .map((pokemonStats, index) => {
                return (
                  <PokemonThumb
                    key={index}
                    id={pokemonStats.id}
                    image={pokemonStats.sprites.other.dream_world.front_default}
                    name={pokemonStats.name}
                    type={pokemonStats.types[0].type.name}
                  />
                );
              })}
        </div>
        <button className="load-more" onClick={getAllPokemons}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default Home;
