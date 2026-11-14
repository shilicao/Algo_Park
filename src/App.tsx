import "./App.css";
import { useState } from "react";

type AlgorithmCategory = "Sorting" | "Trees" | "Map";
type AlgorithmDetails = {
  summary: string; 
  best:string; 
  worst:string;
  average:string;
  spaceComplexity:string;
  psedocode?:string[]; //? means algorithm can have detail before code. 
  tip:string;
}

// These symbols and example entries are starter content for the picker UI.
const algorithmCategories: { name: AlgorithmCategory; icon: string }[] = 
[
  { name: "Sorting", icon: "⇅" },
  { name: "Trees", icon: "⑂" },
  { name: "Map", icon: "⌖" },
];

const algorithmsByCategory: Record<AlgorithmCategory, string[]> = 
{
  Sorting: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"],
  Trees: ["Pre-order Traversal", "In-order Traversal", "Post-order Traversal", "Level-order Traversal"],
  Map: ["Breadth-First Search", "Depth-First Search", "Dijkstra's Pathfinding"],
};
const algoDetails:Partial<Record<string, AlgorithmDetails>> = 
{
  //Sortings
  "Bubble Sort":{
    summary:"Simplest sorting algorithm. Repeatedly swapping the adjacent elements if they are in the wrong order. Not efficent for large set of datas.",
    best:"O(n)",
    worst:"O(n²)",
    average:"O(n²)",
    spaceComplexity:"O(1)",
    psedocode: [
      "for i = 0 to n - 1",
      "  for j = 0 to n - i - 2",
      "    if array[j] > array[j + 1]",
      "      swap(array[j], array[j + 1])",
      "    end if",
      "  end inner for",
      "end outer for",
    ],
    tip:"After each pass, another largest value is fixed at the end.",
  },
  "Insertion Sort":{
    summary:"Builds a sorted array one element at a time by virtually split the list into sorted and unsorted parts.",
    best:"O(n)",
    worst:"O(n²)",
    average:"O(n²)",
    spaceComplexity:"O(1)",
    psedocode: [
      "for i = 1 to n - 1",
      "  key = array[i]",
      "  j = i - 1",
      "  while j >= 0 and array[j] > key",
      "    array[j + 1] = array[j]",
      "    j = j - 1",
      "  end while",
      "  array[j + 1] = key",
      "end for",
    ],
    tip:"The left portion stays sorted as each new value is inserted into place.",
  },
  "Merge Sort":{
    summary:"Divide-and-conquer sorting algorithm. Recrusively divides an array in half, sorts each half, and merges pieces back.",
    best:"O(nlogn)",
    worst:"O(nlogn)",
    average:"O(nlogn)",
    spaceComplexity:"O(n)",
    psedocode: [
      "mergeSort(array)",
      "  if length(array) <= 1",
      "    return array",
      "  middle = floor(length(array) / 2)",
      "  left = mergeSort(left half)",
      "  right = mergeSort(right half)",
      "  return merge(left, right)",
      "",
      "merge(left, right)",
      "  result = empty list",
      "  while left and right are not empty",
      "    move the smaller first item to result",
      "  append remaining items to result",
      "  return result",
    ],
    tip:"During merging stage, compare the first unmerged value from each half.",
  },
  "Quick Sort":{
    summary:"Partitions values around a pivot, then sorts the resulting sections.",
    best:"O(nlogn)",
    worst:"O(n²)",
    average:"O(nlogn)",
    spaceComplexity:"O(logn)",
    psedocode: [
      "quickSort(array, low, high)",
      "  if low >= high",
      "    return",
      "  pivotIndex = partition(array, low, high)",
      "  quickSort(array, low, pivotIndex - 1)",
      "  quickSort(array, pivotIndex + 1, high)",
      "",
      "partition(array, low, high)",
      "  pivot = array[high]",
      "  i = low",
      "  for j = low to high - 1",
      "    if array[j] <= pivot",
      "      swap(array[i], array[j])",
      "      i = i + 1",
      "  swap(array[i], array[high])",
      "  return i",
    ],
    tip:"One partitioning finishes, the pivot would stay in its final position. ",
  },
  "Heap Sort":{ 
    summary:" Visualizes the array elements as a binary tree and uses a Max-Heap structure to repeatedly extract the maximum value.",
    best:"O(nlogn)",
    worst:"O(nlogn)",
    average:"O(nlogn)",
    spaceComplexity:"O(1)",
    psedocode: [
      "heapSort(array)",
      "  n = length(array)",
      "  for i = floor(n / 2) - 1 down to 0",
      "    heapify(array, n, i)",
      "  for end = n - 1 down to 1",
      "    swap(array[0], array[end])",
      "    heapify(array, end, 0)",
      "",
      "heapify(array, size, root)",
      "  largest = root",
      "  left = 2 * root + 1",
      "  right = 2 * root + 2",
      "  update largest if a child is larger",
      "  if largest != root",
      "    swap(array[root], array[largest])",
      "    heapify(array, size, largest)",
    ],
    tip:"After removes the maximum, restore the heap before extracting again.",
  },
  "Selection Sort":{
    summary:"Steps through the array, finds the absolute smallest item in the unsorted section, and swaps it to the front.",
    best:"O(n²)",
    worst:"O(n²)",
    average:"O(n²)",
    spaceComplexity:"O(1)",
    psedocode: [
      "for i = 0 to n - 2",
      "  minimum = i",
      "  for j = i + 1 to n - 1",
      "    if array[j] < array[minimum]",
      "      minimum = j",
      "  swap(array[i], array[minimum])",
      "end for",
    ],
    tip:"Find the minimum in the unsorted portion and move the value to the front.",
  },

  //trees, where h is the height of a tree, and w is the max width of a tree.
  "Pre-order Traversal":{
    summary:"Root -> Left Subtree -> Right Subtree.",
    best:"O(n)",
    worst:"O(n)",
    average:"O(n)",
    spaceComplexity:"O(h)",
    psedocode: [
      "preorder(node)",
      "  if node is null",
      "    return",
      "  visit(node)",
      "  preorder(node->left)",
      "  preorder(node->right)",
    ],
    tip:"The root is visited before either subtree.",
  },
  "In-order Traversal":{
    summary:"Left Subtree -> Root -> Right Subtree.",
    best:"O(n)",
    worst:"O(n)",
    average:"O(n)",
    spaceComplexity:"O(h)",
    psedocode: [
      "inorder(node)",
      "  if node is null",
      "    return",
      "  inorder(node->left)",
      "  visit(node)",
      "  inorder(node->right)",
    ],
    tip:"In a binary tree, this order visits node from smallest to largest.",
  },
  "Post-order Traversal":{
    summary:"Left Subtree -> Right Subtree -> Root",
    best:"O(n)",
    worst:"O(n)",
    average:"O(n)",
    spaceComplexity:"O(h)",
    psedocode: [
      "postorder(node)",
      "  if node is null",
      "    return",
      "  postorder(node->left)",
      "  postorder(node->right)",
      "  visit(node)",
    ],
    tip:"Each node is visited after its children.",
  },
  "Level-order Traversal":{
    summary:"Visits nodes level by level, starting from the root and moving from left to right across each horizontal depth.",
    best:"O(n)",
    worst:"O(n)",
    average:"O(n)",
    spaceComplexity:"O(w)",
    psedocode: [
      "levelOrder(root)",
      "  if root is null",
      "    return",
      "  queue = [root]",
      "  while queue is not empty",
      "    node = dequeue(queue)",
      "    visit(node)",
      "    if node.left exists",
      "      enqueue(queue, node.left)",
      "    if node.right exists",
      "      enqueue(queue, node.right)",
    ],
    tip:"The queue visits shallower levels before deeper ones.",
  },

  //graphs/maps
  "Breadth-First Search": {
    summary:"Explores a graph outward from the start node, one level at a time.",
    best:"O(V + E)",
    worst:"O(V + E)",
    average:"O(V + E)",
    spaceComplexity:"O(V)",
    psedocode: [
      "bfs(start)",
      "  visited = {start}",
      "  queue = [start]",
      "  while queue is not empty",
      "    node = dequeue(queue)",
      "    visit(node)",
      "    for each neighbor of node",
      "      if neighbor is not visited",
      "        add neighbor to visited",
      "        enqueue(queue, neighbor)",
      "    end for",
      "  end while"
    ],
    tip:"In an unweighted grapgh, BFS finds a path with the fewest edges.",
  },
  "Depth-First Search":{
    summary:"Explores as far as possible along one path before backtracking.",
    best:"O(V + E)",
    worst:"O(V + E)",
    average:"O(V + E)",
    spaceComplexity:"O(V)",
    psedocode: [
      "dfs(node)",
      "  if node is already visited",
      "    return",
      "  mark node as visited",
      "  visit(node)",
      "  for each neighbor of node",
      "    dfs(neighbor)",
      "  end for",
    ],
    tip:"DFS explores deeply, but its first path is not always the shortest path.",
  },
  "Dijkstra's Pathfinding":{
    summary:"Finds shortest paths from a start node when edge weights are non-negative.",
    best:"O((V + E) log V)",
    worst:"O((V + E) log V)",
    average:"O((V + E) log V)",
    spaceComplexity:"O(V)",
    psedocode: [
      "dijkstra(start)",
      "  distance[start] = 0",
      "  distance[all other nodes] = infinity",
      "  priorityQueue = [(0, start)]",
      "  while priorityQueue is not empty",
      "    (cost, node) = remove lowest-cost item",
      "    if cost > distance[node]",
      "      continue",
      "    for each edge from node to neighbor",
      "      newCost = cost + edge.weight",
      "      if newCost < distance[neighbor]",
      "        distance[neighbor] = newCost",
      "        add (newCost, neighbor) to priorityQueue",
      "    end for",
      "  end while"
    ],
    tip:"Dijkstra requires non-negative edge weights to find shortest paths.",
  }, 
};

function App(){
  // variable declaration and make the "dark" as the default state
  const[theme, setTheme] = useState<"dark" | "light">("dark");
  const toggleTheme = ()=> {
    setTheme((currentTheme) => currentTheme === "dark"?"light":"dark");
  };

  // selection states. But with no default entry. In other words, user pick the first entry.
  const [activeCategory, setActiveCategory] = useState<AlgorithmCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
    
  //Holds data entry that will be to render details to the right panel. 
  const details = selectedAlgorithm ? algoDetails[selectedAlgorithm]:undefined;

  // Search only the currently open category, ignoring letter case and outer spaces.
  const visibleAlgorithms = activeCategory ? algorithmsByCategory[activeCategory].filter
  ((algorithm)=>algorithm.toLowerCase().includes(searchQuery.trim().toLowerCase())):[];

  //choose a category reveal its list and search function bar.
  const chooseCategory = (category: AlgorithmCategory) => {
    setActiveCategory(category);
    setSearchQuery("");
    setSelectedAlgorithm(null);
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

          {activeCategory && (
          <>
            {/* The search input filters the active category as the user types. 
            Optional feature, adds handler for "enter" pressed on a keyboard*/}
            <label className="algorithm-search">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <span className="visually-hidden">Search {activeCategory} algorithms</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event)=> {
                  if (event.key !== "Enter")
                  {
                    return;
                  }
                  const querySelection = searchQuery.trim().toLowerCase();
                  if (!querySelection)
                  {
                    return;//meaning nothing matches the search.
                  }
                  
                  const found = visibleAlgorithms.find((algorithm)=>algorithm.toLowerCase()
                             === querySelection)?? visibleAlgorithms[0];
                  if (found)
                  {
                    event.preventDefault();
                    setSelectedAlgorithm(found);
                  }
                }}
                placeholder={`Search ${activeCategory.toLowerCase()}...`}
              />
            </label>

            {/* Algorithm is only active when user select an entry. */}
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
          </>
          )}
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
          {/* render algorithm details to the right panel. */}
          {selectedAlgorithm && details ? (
            <div className = "DETAIL-LIST">
              <p className = "details-heading">SELECTED METHOD</p>
              <h3 className = "details-name">{selectedAlgorithm}</h3>
              <p className = "details-summary">{details.summary}</p>

              <h4 className = "complexity">TIME COMPLEXITY</h4>
              <dl className = "complexity-list">
                <div>
                  <dt>Best Case:</dt>
                  <dd>{details.best}</dd>
                </div>
                <div>
                  <dt>Worst Case:</dt>
                  <dd>{details.worst}</dd>
                </div>
                <div>
                  <dt>Average Case:</dt>
                  <dd>{details.average}</dd>
                </div>
                <div>
                  <dt>Space Complexity:</dt>
                  <dd>{details.spaceComplexity}</dd>
                </div>
              </dl>
            </div>
          ):( 
            // entry handle
            <p className = "unknown-selection">
              {selectedAlgorithm ? `Details for ${selectedAlgorithm} not available at the moment.`:""}
            </p>
          )}
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
          {/* render details of pesudocode*/}
          {selectedAlgorithm && details?.psedocode ? (
            <ol className = "code">
              {details.psedocode.map((line, index)=>(
                <li key={`${selectedAlgorithm}-${index}`}>
                  <code>{line}</code>
                </li>
              ))}
            </ol>
          ):(<p className = "no-code">
              {selectedAlgorithm ? `pseudocode for ${selectedAlgorithm} is unavailable at the moment.` :""}
            </p>
          )}
        </section>

        <aside className="bottom-panel tip-card" aria-labelledby="tip-heading">
          <h2 id="tip-heading"><span className="tip-heading-icon" aria-hidden="true">💡</span> Quick Note</h2>
          <div className="tip-copy">
            {/* render details for tip or quick note panel */}
            {selectedAlgorithm && details ?.tip ? (
              <p className = "TAKE_NOTE">{details.tip}</p>
            ):(<p className = "notip">
                {selectedAlgorithm ? `No notes available for ${selectedAlgorithm}.`:""}
            </p>)}
          </div>
          <span className="tip-orb" aria-hidden="true">✦</span>
        </aside>
      </section>
    </main>
  )
}
export default App;
