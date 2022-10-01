import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ProductItem from "./ProductItem";
import Navbar from "./Navbar";
const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=140"
  );
  const [inputName, setinputName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isGenChecked, setIsGenChecked] = useState(false);
  const [products, setProducts] = useState([
    { slug: "Normal", name: "Normal", checked: false },
    { slug: "Fighting", name: "Fighting", checked: false },
    { slug: "Flying", name: "Flying", checked: false },
    { slug: "Poison", name: "Poison", checked: false },
    { slug: "Ground", name: "Ground", checked: false },
    { slug: "Rock", name: "Rock", checked: false },
  ]);

  const handleChange = (slug) => {
    const copyProducts = [...products];
    const modifiedProducts = copyProducts.map((product) => {
      if (slug === product.slug) {
        product.checked = !product.checked;
      }

      return product;
    });
    setProducts(modifiedProducts);
    filterByType();
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

  const filterByType = () => {
    const GrassType = allPokemons.filter((data) => {
      if (products[0].checked && data.types[0].type.name === "normal") {
        return data;
      } else if (
        products[1].checked &&
        data.types[0].type.name === "fighting"
      ) {
        return data;
      } else if (products[2].checked && data.types[0].type.name === "flying") {
        return data;
      } else if (products[3].checked && data.types[0].type.name === "poison") {
        return data;
      } else if (products[4].checked && data.types[0].type.name === "ground") {
        return data;
      } else if (products[4].checked && data.types[0].type.name === "rock") {
        return data;
      }
    });
    setAllPokemons(GrassType);
  };

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
                {isChecked ? (
                  products.map((product, idx) => (
                    <ProductItem
                      key={idx}
                      product={product}
                      handleChange={handleChange}
                    />
                  ))
                ) : (
                  <span>Normal + 5 More</span>
                )}
              </div>
            </InputGroup>
            <InputGroup className="mb-3">
              <label>Gender</label>
              <div
                onClick={() => setIsGenChecked(!isGenChecked)}
                className="form-control"
              >
                <span>Male +2 more</span>
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
