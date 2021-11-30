import * as React from 'react';
import { PokemonClient } from 'pokenode-ts'
import { useQuery } from 'react-query';
import { Box } from '../components';

const api = new PokemonClient()

export const PokemonRoute = () => {
  const [pokemonName, setPokemonName] = React.useState<string>()
  const [pokemonType, setPokemonType] = React.useState<string>('')
  const pokemonTypeQuery = useQuery(['pokemon', pokemonType], () => api.getTypeByName(pokemonType))

  const handleSelect = (type: string, name: string) => {
    setPokemonType(type)
    if (name !== pokemonName) {
      setPokemonName(name)
    }
  }

  return (
    <Box kind="flex" flexDirection="column" gap="m">
      <label>
        Search by name{' '}
        <input value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} />
      </label>
      {pokemonName ? <Pokemon name={pokemonName} onSelect={handleSelect} /> : null}
      {pokemonType ? (
        <>
          <h1>{pokemonType} Type Pokemon</h1>
          <Box kind="grid" autoFit minWidth="300px" gap="m">
            {pokemonTypeQuery.data?.pokemon?.map((pok) => (
              <Pokemon key={pok.pokemon.url} name={pok.pokemon.name} onSelect={handleSelect} />
            ))}
          </Box>
        </>
      ) : null}
    </Box>
  )
}

const Pokemon: React.FC<{name: string, onSelect: (type: string, name: string) => void}> = ({name, onSelect}) => {
  const pokemonQuery = useQuery(['pokemon', name], () => api.getPokemonByName(name))

  if (pokemonQuery.isLoading) {
    return <span>Loading...</span>
  }
  return (
    <div className="Pokemon">
      <Box
        kind="flex"
        padding="m"
        flexDirection="column"
        gap="s"
        alignItems="center"
        justifyContent="space-between"
      >
        <h2>{pokemonQuery.data?.name}</h2>
        <Box kind="flex">
          <img src={pokemonQuery.data?.sprites.front_default} alt="front profile" />
          <img src={pokemonQuery.data?.sprites.back_default} alt="back profile" />
        </Box>
        <p>Height: {pokemonQuery.data?.height} dm</p>
        <p>Weight: {pokemonQuery.data?.weight} hg</p>
        <Box kind="flex" gap="s">
          {pokemonQuery.data?.types?.map((type, i) => (
            <button
              key={type.type.name}
              className={`Pokemon__button Pokemon__button--${type.type.name}`}
              onClick={() => onSelect(type.type.name, pokemonQuery.data.name)}
            >
              {type.type.name}
            </button>
          ))}
        </Box>
      </Box>
    </div>
  )
}

