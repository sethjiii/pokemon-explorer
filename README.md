# 🧭 Pokemon Explorer

A responsive and visually appealing Pokémon Explorer web app built using **Next.js** and **TailwindCSS**. This project fetches data from the [PokeAPI](https://pokeapi.co/) and allows users to search, browse, and view detailed information about any Pokémon.

---
###Deployed Link
https://pokemon-explorer-lake.vercel.app/

## 📌 Features

### 🏠 Homepage
- Lists all Pokémons fetched from PokeAPI
- Real-time search bar to filter Pokémon by name
- Clean, mobile-friendly layout styled with TailwindCSS

### 📄 Detail Page
- Clicking on a Pokémon navigates to a dedicated page showing:
  - Official image
  - Types
  - Abilities
  - Stats (HP, Attack, Defense, etc.)
  - Moves list
- Uses **Next.js dynamic routes** at `pages/pokemon/[id].tsx`

### ⚙️ Performance Optimization
- Built using **Static Site Generation (SSG)** via `getStaticProps` and `getStaticPaths`
- Pre-rendered Pokémon detail pages for faster load and better SEO

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **API:** [PokeAPI](https://pokeapi.co/)
- **Language:** JavaScript (TypeScript optional)

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js >= 18.x
- npm or yarn installed

### 📥 Installation

```bash
git clone https://github.com/sethjiii/pokemon-explorer.git
cd pokemon-explorer
npm install


#Project Structure
pokemon-explorer/
├── public/
├── src/
│   ├── app/             # Main app routing
│   ├── components/      # Reusable components
│   ├── styles/          # Tailwind and global styles
├── pages/
│   └── pokemon/[id].tsx # Dynamic route for detail page
├── README.md

