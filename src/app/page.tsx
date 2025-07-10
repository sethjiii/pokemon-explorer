'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'

type Pokemon = {
  name: string
  url: string
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => setPokemonList(data.results))
  }, [])

  const enrichedList = pokemonList.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1
  }))

  const fuse = new Fuse(enrichedList, {
    keys: ['name', 'id'],
    threshold: 0.4,
    includeMatches: true
  })

  const results = search
    ? fuse.search(search)
    : enrichedList.map(item => ({ item }))

  const filteredPokemon = results.map(result => result.item)
  const matchesMap = Object.fromEntries(
    results.map(result => [result.item.name, (result as any).matches])
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-red-400/10"></div>
        <div className="relative z-10 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center items-center gap-4 mb-8">
              <img
                src="/pkd.png"
                alt="Pokédex"
                style={{ width: '64px', height: '64px' }}
              />

              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                Pokédex
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Discover and explore all 151 original Pokémon
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pokemon Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="mb-8 text-center">
          <p className="text-gray-300 text-lg">
            {filteredPokemon.length > 0
              ? `Showing ${filteredPokemon.length} Pokémon`
              : 'No Pokémon found'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPokemon.map((pokemon, index) => {
            const pokemonId = pokemon.id
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
            const match = matchesMap[pokemon.name]?.find((m: any) => m.key === 'name')

            return (
              <Link key={index} href={`/pokemon/${pokemonId}`}>
                <div className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl">
                  {/* Pokemon Image */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={imageUrl}
                      alt={pokemon.name}
                      className="w-full h-24 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Pokemon Info */}
                  <div className="text-center">
                    <div className="text-sm text-gray-400 font-mono mb-1">
                      #{pokemonId.toString().padStart(3, '0')}
                    </div>
                    <h3 className="text-white font-bold text-lg capitalize leading-tight">
                      {match ? (() => {
                        const parts = []
                        let lastIndex = 0
                        for (const [start, end] of match.indices) {
                          parts.push(
                            pokemon.name.slice(lastIndex, start),
                            <mark key={start} className="bg-yellow-300 text-black rounded px-1">
                              {pokemon.name.slice(start, end + 1)}
                            </mark>
                          )
                          lastIndex = end + 1
                        }
                        parts.push(pokemon.name.slice(lastIndex))
                        return parts
                      })() : pokemon.name}
                    </h3>
                  </div>

                  {/* Hover Effect Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredPokemon.length === 0 && search && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29.82-5.918 2.172M12 19.5a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Pokémon Found</h3>
            <p className="text-gray-400">Try searching for a different Pokémon name</p>
          </div>
        )}

        {/* Loading State */}
        {pokemonList.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-10 h-10 bg-white rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Loading Pokémon...</h3>
            <p className="text-gray-400">Fetching data from the Pokédex</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-400">
            Powered by <span className="text-yellow-400 font-semibold">PokéAPI</span>
          </p>
        </div>
      </div>
    </div>
  )
}
