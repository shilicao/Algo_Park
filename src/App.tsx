import "./App.css";
import { useState } from "react";

// Keep the available categories typed so category state and lookup data stay in sync.
type AlgorithmCategory = "Sorting" | "Trees" | "Map";

// These symbols and example entries are starter content for the picker UI.
const algorithmCategories: { name: AlgorithmCategory; icon: string }[] = [
  { name: "Sorting", icon: "⇅" },
  { name: "Trees", icon: "⑂" },
  { name: "Map", icon: "⌖" },
];

const algorithmsByCategory: Record<AlgorithmCategory, string[]> = {
  Sorting: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
  Trees: ["Binary Search Tree", "Tree Traversal", "AVL Tree"],
  Map: ["Breadth-First Search", "Depth-First Search", "Dijkstra's Pathfinding"],
};

function App(){
  // variable declaration and make the "dark" as the default state
  const[theme, setTheme] = useState<"dark" | "light">("dark");
  const toggleTheme = ()=> {
    setTheme((currentTheme) => currentTheme === "dark"?"light":"dark");
  };
  // The picker starts in Sorting with Bubble Sort selected. It was for testing at the moment
  const [activeCategory, setActiveCategory] = useState<AlgorithmCategory>("Sorting");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
  // Search only the currently open category, ignoring letter case and outer spaces.
  const visibleAlgorithms = algorithmsByCategory[activeCategory].filter((algorithm) =>
    algorithm.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  // Switching category clears the search and selects that category's first example.
  const chooseCategory = (category: AlgorithmCategory) => {
    setActiveCategory(category);
    setSearchQuery("");
    setSelectedAlgorithm(algorithmsByCategory[category][0]);
  };

  return (
    <main className = {`academy theme-${theme}`}>
      {/* navigation layouts */}
      <header className = "topbar">
        <a className = "logo" href = "/" aria-label = "logo design">
          <span className="crest" aria-hidden="true">
            <svg className="book-icon" viewBox="0 0 48 48">
              <path
                d="M24 17c-5-4-11-5-18-3v22c7-2 13-1 18 4 5-5 11-6 18-4V14c-7-2-13-1-18 3Z"
                fill="rgba(180, 140, 255, 0.14)"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round">
              </path>
              <path d="M24 17v23M11 20c4-.5 7 .3 10 2M11 26c4-.5 7 .3 10 2M37 20c-4-.5-7 .3-10 2M37 26c-4-.5-7 .3-10 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round">
              </path>
              <path
                d="m35 4 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1L35 4Z"
                fill="#fff0ad">
              </path>
            </svg>
          </span>
          <span className = "title">
            Algo{" "}Academy
          </span>
        </a>
        <nav className = "navigation" aria-label = "Main navigation">
            <a className = "active" href = "#">Training</a>
            <a href = "#">Quest</a>
            <a href = "#">Library</a>
        </nav>
        <div className = "rhs-actions">
          <span className = "level">★ Iron · Lv. 01</span>
          <button className = "theme-toggle" type = "button" 
          onClick={toggleTheme} aria-label = {theme === "dark"?"Switch to light theme":
          "Switch to dark theme"} aria-pressed = {theme === "dark"}>
            <span className ={`sun ${theme === "light" ? "active" : ""}`} aria-hidden = "true">☼</span>
            <span className = {`moon ${theme === "dark" ? "active" : ""}`} aria-hidden = "true">
              <svg viewBox = "0 0 24 24">
                <path d ="M19.2 15.4A8.2 8.2 0 0 1 8.6 4.8a8.2 8.2 0 1 0 10.6 10.6Z"
                  fill="currentColor">
                </path>
                <path d="m17.6 2.5.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z"
                    fill="currentColor">
                </path>
                <path d="m21.3 8.5.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4.4-1.1Z"
                  fill="currentColor">
                </path>
              </svg>
            </span>
          </button>
        </div>
      </header> 

      {/* middle sction layouts */}
      <section className = "center-layouts" aria-label = "Algorithm workspace">
        <aside className = "middle algorithm-selection">
          <div className="details-icon" aria-hidden="true">
            <span>⚙</span>
          </div>
          <h2>Algorithms</h2>
          {/* Category buttons control which algorithm group appears below. */}
          <div className="algorithm-categories" role="group" aria-label="Algorithm categories">
            {algorithmCategories.map((category) => (
              <button
                className={`category-button ${activeCategory === category.name ? "is-active" : ""}`}
                key={category.name}
                type="button"
                aria-pressed={activeCategory === category.name}
                onClick={() => chooseCategory(category.name)}
              >
                <span className="category-icon" aria-hidden="true">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* The search input filters the active category as the user types. */}
          <label className="algorithm-search">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="visually-hidden">Search {activeCategory} algorithms</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Search ${activeCategory.toLowerCase()}...`}
            />
          </label>

          {/* Selecting an item marks it active; algorithm execution is added later. */}
          <div className="algorithm-list" aria-label={`${activeCategory} algorithms`}>
            {visibleAlgorithms.length > 0 ? visibleAlgorithms.map((algorithm) => (
              <button
                className={`algorithm-option ${selectedAlgorithm === algorithm ? "is-selected" : ""}`}
                key={algorithm}
                type="button"
                aria-pressed={selectedAlgorithm === algorithm}
                onClick={() => setSelectedAlgorithm(algorithm)}
              >
                <span>{algorithm}</span>
                <span className="option-state" aria-hidden="true">
                  {selectedAlgorithm === algorithm ? "ACTIVE" : "›"}
                </span>
              </button>
            )) : (
              <p className="algorithm-empty" role="status">No matching algorithms.</p>
            )}
          </div>
        </aside>

        <section className = "middle area" aria-label = "sorting">
          <div className = "area-header">Sorting Section</div>
          <div className = "area-holder">Visualization</div>
        </section>

        <aside className = "middle details">
          <div className = "details-icon" aria-hidden = "true">
            <span>⚔︎</span>
          </div>
          <h2>Algorithm Details</h2>
        </aside>
      </section>

      {/* Bottom learning panels*/}
      <section className="bottom-panels" aria-label="Learning details">
        <section className="bottom-panel performance-tracker" aria-labelledby="performance-heading">
          <h2 id="performance-heading"><span className="performance-heading-icon" aria-hidden="true">▮▮▮</span> Performance Counters</h2>
          <div className="performance-metrics">
            {/* left empty */}
          </div>
        </section>

        <section className="bottom-panel pseudocode-card" aria-labelledby="pseudocode-heading">
          <h2 id="pseudocode-heading"><span className="pseudocode-heading-icon" aria-hidden="true">‹/›</span> Pseudocode</h2>
          {/* left empty */}
        </section>

        <aside className="bottom-panel tip-card" aria-labelledby="tip-heading">
          <h2 id="tip-heading"><span className="tip-heading-icon" aria-hidden="true">☼</span> Tips</h2>
          <div className="tip-copy">
            {/* left empty */}
          </div>
          <span className="tip-orb" aria-hidden="true">✦</span>
        </aside>
      </section>
    </main>
  )
}
export default App;
