import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await res.json()
  return data.results.map((_: any, index: number) => ({
    id: (index + 1).toString(),
  }))
}

async function getPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!res.ok) return null
  return res.json()
}

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
}

const statColors: { [key: string]: string } = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-blue-500',
  'special-attack': 'bg-purple-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-yellow-500',
}

// ✅ FIXED: Destructure `params` from function argument
export default async function PokemonPage({
  params,
}: {
  params: { id: string }
}) {
  const pokemon = await getPokemon(params.id)
  if (!pokemon) return notFound()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-red-400/10"></div>
        <div className="relative z-10 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h1 className="text-5xl font-bold capitalize bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                {pokemon.name}
              </h1>
              <div className="text-2xl font-mono text-gray-300">
                #{pokemon.id.toString().padStart(3, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pokemon Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="relative z-10 w-80 h-80 object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Pokemon Details */}
          <div className="space-y-6">
            {/* Types */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full"></span>
                Types
              </h2>
              <div className="flex gap-3">
                {pokemon.types.map((t: any, i: number) => (
                  <span
                    key={i}
                    className={`px-4 py-2 rounded-full text-white font-semibold capitalize shadow-lg ${
                      typeColors[t.type.name] || 'bg-gray-500'
                    }`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></span>
                Abilities
              </h2>
              <div className="space-y-2">
                {pokemon.abilities.map((a: any, i: number) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-lg p-3 border border-white/10 capitalize font-medium"
                  >
                    {a.ability.name.replace('-', ' ')}
                    {a.is_hidden && (
                      <span className="ml-2 text-yellow-400 text-sm">(Hidden)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
            Base Stats
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pokemon.stats.map((s: any, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold capitalize text-lg">
                    {s.stat.name.replace('-', ' ')}
                  </span>
                  <span className="text-xl font-bold text-yellow-400">
                    {s.base_stat}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      statColors[s.stat.name] || 'bg-gray-500'
                    }`}
                    style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Moves Section */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></span>
            Signature Moves
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemon.moves.slice(0, 6).map((m: any, i: number) => (
              <div
                key={i}
                className="bg-white/10 rounded-lg p-4 border border-white/10 hover:bg-white/20 transition-colors capitalize font-medium text-center"
              >
                {m.move.name.replace('-', ' ')}
              </div>
            ))}
          </div>
        </div>

        {/* Pokemon Info */}
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">Physical Traits</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Height</span>
                <span className="font-semibold">{pokemon.height / 10} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Weight</span>
                <span className="font-semibold">{pokemon.weight / 10} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Base Experience</span>
                <span className="font-semibold">{pokemon.base_experience}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">Game Data</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Order</span>
                <span className="font-semibold">#{pokemon.order}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Species</span>
                <span className="font-semibold capitalize">{pokemon.species.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Default Form</span>
                <span className="font-semibold">{pokemon.is_default ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic' // Ensure this page is always fresh
export const revalidate = 60 // Revalidate every 60 seconds