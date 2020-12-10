import React, { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import "./styles.css";

export default function App() {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemon, setPokemon] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPokemon = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setError(false);
        setPokemon(data.sprites.other["official-artwork"].front_default);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setSearchPokemon(e.target.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    getPokemon(searchPokemon.toLowerCase());
    setSearchPokemon("");
  };

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <h2>Busca tú Pokemon</h2>
      {/* <p>{pokemon}</p> */}
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Pokemon no encontrado :(</p>
      ) : (
        <img src={pokemon} alt={pokemon} width="200px" />
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Ej: Pikachu"
          value={searchPokemon}
          onChange={handleChange}
          style={{
            height: "30px",
            width: "200px",
            padding: "10px",
            borderRadius: "10px",
            outline: "none",
            fontSize: "20px",
            borderStyle: "solid"
          }}
        />
      </form>
    </div>
  );
}
