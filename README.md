# Pokémon Analytics Dashboard

A React-based dashboard that visualizes Pokémon data from the [PokéAPI](https://pokeapi.co/).  
It includes interactive charts, filtering options, and a responsive layout.

---

## How to Run the Project Locally

Use **Node v20.19.x**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## Technology Choices and Why

- **React 18 + Vite**  
  Used for a modern setup with fast builds and hot reloads. It let me focus on features instead of configuration.

- **Hooks & Context**  
  `useState` handled local UI state like loading and filters.  
  `useMemo` optimized derived data for charts.  
  A custom hook (`usePokemonData`) managed fetching and localStorage caching, while Context shared data across components without prop drilling.

- **Axios**  
  Chosen over fetch for cleaner syntax, built-in JSON handling, and better error management when working with PokéAPI.

- **Chart.js (with react-chartjs-2)**  
  Used for both the bar chart (Type Distribution) and radar chart (Pokémon Stats).  
  It gave me polished visualizations with good customization while keeping setup simple.

- **Data Transformations**  
  Since PokéAPI returns nested and verbose objects, I built small utilities to transform that data into simple arrays and labels.  
  This made it easier to feed directly into charts and filters without overcomplicating the components.

- **CSS Variables + Single File**  
  Styling was kept simple in one CSS file. CSS variables kept styles consistent, and media queries ensured the app stayed responsive across devices.  
  This let me spend more time on functionality rather than setup.

---

## What I’d Improve With More Time

- Implement API rate limiting strategies and smarter caching to avoid overloading PokéAPI.
- Add unit tests (Jest + React Testing Library) to validate charts, filters, and data flow.
- Refine responsive design further, especially for smaller screens.
- Add advanced filtering such as generation trends or height/weight correlations.
- Build a side-by-side Pokémon comparison feature for easier analysis.
- Introduce a light/dark theme toggle for a better user experience.
- Use type-based color schemes to make visualizations more intuitive.

---

## Assumptions & Trade-offs

To keep things focused and within the given time:

- I worked with the first batch of Pokémon from the API instead of pulling everything. This kept the app responsive and avoided unnecessary API calls.
- I used **localStorage caching** so the app doesn’t keep refetching the same data. It’s simple and works fine for this scope, even though it’s not a perfect long-term solution.
- For charts, I went with **Chart.js (via react-chartjs-2)** because it gave me the bar and radar visualizations I needed without a lot of extra setup.
- Since PokéAPI responses are pretty detailed and nested, I wrote small helpers to reshape that data into arrays and labels that charts could use directly.
- Styling was kept lightweight: a single CSS file with variables and media queries. This made sure the layout stayed consistent and responsive without spending too much time on design work.
- I didn’t add testing in this version. The app runs fine, but with more time I’d write unit tests for the charts and filters.

---
