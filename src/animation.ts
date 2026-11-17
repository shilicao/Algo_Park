// Typed animation snapshots. let the playback controls advance every category
// without needing to know how a sorting array, tree, or graph is drawn.
export type AlgorithmCategory = "Sorting" | "Trees" | "Map";
export type MetricItem = {label:string; value:number;};

export type SortingFrame = {
  kind: "sorting";
  values: number[];
  activeIndices: number[];
  sortedIndices: number[];
  metrics:MetricItem[];
};

export type TreeFrame = {
  kind: "tree";
  activeNodeId: string | null;
  visitedNodeIds: string[];
  visitOrder: string[];
  metrics?:MetricItem[];
};

export type MapFrame = {
  kind: "map";
  currentNodeId: string | null;
  visitedNodeIds: string[];
  activeEdge: [string, string] | null;
  pathNodeIds: string[];
  distances: Record<string, number>;
 metrics?:MetricItem[];
};

export type AnimationFrame = SortingFrame | TreeFrame | MapFrame;

// Those are fixed numbers used to test trees and graph's algorithms. 
// only needed for maps and trees. Sorting can auto genetate numbers to visualize the sorting process. 
export const treeNodes = [
  { id: "A", value: 8, x: 300, y: 48 },
  { id: "B", value: 4, x: 170, y: 125 },
  { id: "C", value: 12, x: 430, y: 125 },
  { id: "D", value: 2, x: 100, y: 220 },
  { id: "E", value: 6, x: 240, y: 220 },
  { id: "F", value: 10, x: 360, y: 220 },
  { id: "G", value: 14, x: 500, y: 220 },
] as const;

export const treeEdges: [string, string][] = [
  ["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"], ["C", "G"],
];

export const mapNodes = [
  { id: "A", x: 70, y: 70 },
  { id: "B", x: 215, y: 55 },
  { id: "C", x: 155, y: 160 },
  { id: "D", x: 345, y: 65 },
  { id: "E", x: 315, y: 175 },
  { id: "F", x: 475, y: 80 },
  { id: "G", x: 440, y: 205 },
  { id: "H", x: 565, y: 145 },
] as const;

export const mapEdges = [
  { from: "A", to: "B", weight: 2 },
  { from: "A", to: "C", weight: 4 },
  { from: "B", to: "C", weight: 1 },
  { from: "B", to: "D", weight: 5 },
  { from: "C", to: "E", weight: 3 },
  { from: "D", to: "E", weight: 2 },
  { from: "D", to: "F", weight: 3 },
  { from: "E", to: "G", weight: 2 },
  { from: "F", to: "G", weight: 1 },
  { from: "F", to: "H", weight: 5 },
  { from: "G", to: "H", weight: 2 },
];

//********************************* SORTING ***********************************
const makeSortFrame = (
  values: number[],
  activeIndices: number[] = [],
  sortedIndices: number[] = [],
  metrics:MetricItem[]=[],
): SortingFrame => ({
  kind: "sorting",
  values: [...values],
  activeIndices: [...activeIndices],
  sortedIndices: [...sortedIndices],
  metrics:metrics.map((metric)=>({...metric})),
});

function bubbleSortFrames(input: number[]): SortingFrame[] {
  const values = [...input];
  const sorted: number[] = [];
  const counts = {comparisons:0, swaps: 0, writes: 0};
  const getMetrics = ():MetricItem[] => [
    {label:"Comparisons", value:counts.comparisons},
    {label:"Swaps", value:counts.swaps},
    {label:"Writes", value:counts.writes},
  ];
  //grabs data of each frame for different algorithms . 
  const frames = [makeSortFrame(values, [], [], getMetrics())];
  for (let i = values.length - 1; i > 0; i--)
  {
    for (let j = 0; j < i; j++)
    {
      counts.comparisons++;
      if (values[j] > values[j+1])
      {
        [values[j], values[j + 1]] = [values[j+1], values[j]];
        counts.swaps++;
        counts.writes = counts.writes + 2; //assign two positions counts as two moves/writes.
      }
      //save every comparisons.
      frames.push(makeSortFrame(values, [j, j + 1], sorted, getMetrics()));

    }
    //makes sure the value is place at i in its sorted spot.
    sorted.unshift(i);
    frames.push(makeSortFrame(values,[], sorted, getMetrics()));
  }

  return [...frames, makeSortFrame (values, [], values.map((_, index) => index), getMetrics())];
}

function insertionSortFrames(input: number[]): SortingFrame[] {
  const values = [...input];
  const sorted:number[]=[];
  const counts = {comparisons:0, swaps:0, writes:0}
  const getMetrics = ():MetricItem[]=>[
    {label:"Comparisons", value:counts.comparisons},
    {label:"Swaps", value:counts.swaps},
    {label:"Writes", value:counts.writes},
  ];
  const frames = [makeSortFrame(values,[],[],getMetrics())];

  //be sure the loop grabs the final item. No swap for insertion sort
  for (let i = 1; i < values.length; i++)
  {
    const key = values[i];
    let tmp = i - 1;
    while (tmp >= 0)
    {
      counts.comparisons++;
      frames.push(makeSortFrame(values, [tmp, tmp+1],sorted, getMetrics()));
      if(values[tmp] <= key)
      {
        break;
      }
      values[tmp+1] = values[tmp];
      counts.writes++;
      frames.push(makeSortFrame(values, [tmp, tmp + 1], sorted, getMetrics()));
      tmp--;
    }
    values[tmp+1] = key;
    counts.writes++;
    sorted.push(i);
    frames.push(makeSortFrame(values, [tmp + 1], sorted, getMetrics()));
  }
  return [...frames, makeSortFrame(values, [], values.map((_, index) => index), getMetrics())];
}

function mergeSortFrames(input: number[]): SortingFrame[] {
  const values = [...input];
  const frames = [makeSortFrame(values)];

  const merge = (left: number, middle: number, right: number) => {
    const leftValues = values.slice(left, middle + 1);
    const rightValues = values.slice(middle + 1, right + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let target = left;

    while (leftIndex < leftValues.length && rightIndex < rightValues.length) {
      const active = [left + leftIndex, middle + 1 + rightIndex];
      if (leftValues[leftIndex] <= rightValues[rightIndex]) {
        values[target] = leftValues[leftIndex++];
      } else {
        values[target] = rightValues[rightIndex++];
      }
      frames.push(makeSortFrame(values, active));
      target++;
    }
    while (leftIndex < leftValues.length) {
      values[target] = leftValues[leftIndex++];
      frames.push(makeSortFrame(values, [target]));
      target++;
    }
    while (rightIndex < rightValues.length) {
      values[target] = rightValues[rightIndex++];
      frames.push(makeSortFrame(values, [target]));
      target++;
    }
  };

  const divide = (left: number, right: number) => {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    divide(left, middle);
    divide(middle + 1, right);
    merge(left, middle, right);
  };

  divide(0, values.length - 1);
  return [...frames, makeSortFrame(values, [], values.map((_, index) => index))];
}

function quickSortFrames(input: number[]): SortingFrame[] {
  const values = [...input];
  const frames = [makeSortFrame(values)];
  const sorted = new Set<number>();

  const partition = (low: number, high: number) => {
    const pivot = values[high];
    let boundary = low;
    for (let index = low; index < high; index++) {
      frames.push(makeSortFrame(values, [index, high], [...sorted]));
      if (values[index] <= pivot) {
        [values[boundary], values[index]] = [values[index], values[boundary]];
        frames.push(makeSortFrame(values, [boundary, index, high], [...sorted]));
        boundary++;
      }
    }
    [values[boundary], values[high]] = [values[high], values[boundary]];
    sorted.add(boundary);
    frames.push(makeSortFrame(values, [boundary], [...sorted]));
    return boundary;
  };

  const sort = (low: number, high: number) => {
    if (low >= high) {
      if (low === high) sorted.add(low);
      return;
    }
    const pivotIndex = partition(low, high);
    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  };

  sort(0, values.length - 1);
  return [...frames, makeSortFrame(values, [], values.map((_, index) => index))];
}

function heapSortFrames(input: number[]): SortingFrame[] {
  const values = [...input];
  const frames = [makeSortFrame(values)];
  const sorted: number[] = [];

  const siftDown = (size: number, root: number) => {
    let largest = root;
    const left = root * 2 + 1;
    const right = left + 1;
    if (left < size && values[left] > values[largest]) largest = left;
    if (right < size && values[right] > values[largest]) largest = right;
    frames.push(makeSortFrame(values, [root, left, right].filter((index) => index < size), sorted));
    if (largest !== root) {
      [values[root], values[largest]] = [values[largest], values[root]];
      frames.push(makeSortFrame(values, [root, largest], sorted));
      siftDown(size, largest);
    }
  };

  for (let index = Math.floor(values.length / 2) - 1; index >= 0; index--) {
    siftDown(values.length, index);
  }
  for (let end = values.length - 1; end > 0; end--) {
    [values[0], values[end]] = [values[end], values[0]];
    sorted.unshift(end);
    frames.push(makeSortFrame(values, [0, end], sorted));
    siftDown(end, 0);
  }

  return [...frames, makeSortFrame(values, [], values.map((_, index) => index))];
}

function selectionSortFrames(input: number[]): SortingFrame[] {
  const values = [...input];
  const sorted: number[] = [];
  const counts = {comparisons:0, swaps: 0, writes: 0};
  const getMetrics = ():MetricItem[] => [
    {label:"Comparisons", value:counts.comparisons},
    {label:"Swaps", value:counts.swaps},
    {label:"Writes", value:counts.writes},
  ];

  const frames = [makeSortFrame(values, [],[], getMetrics())];
  for (let i = 0; i < values.length-1; i++)
  {
    let tmp = i;
    for (let j = i + 1; j < values.length; j++)
    {
      counts.comparisons++;
      frames.push(makeSortFrame(values, [tmp, j], sorted, getMetrics()));
      if (values[j] < values[tmp])
      {
        tmp = j;
      }
    }
    if (tmp !== i)
    {
      [values[i], values[tmp]] = [values[tmp], values[i]];
      counts.swaps++;
      counts.writes = counts.writes + 2;
    }
    sorted.push(i);
    frames.push(makeSortFrame(values, [i, tmp], sorted, getMetrics()));
  }
  return [...frames, makeSortFrame(values, [], values.map((_,index) => index), getMetrics())];
}

function sortingFrames(algorithm: string, values: number[]): SortingFrame[] {
  // Each sorting implementation emits the same frame shape for the bar renderer.
  switch (algorithm) {
    case "Bubble Sort": return bubbleSortFrames(values);
    case "Insertion Sort": return insertionSortFrames(values);
    case "Merge Sort": return mergeSortFrames(values);
    case "Quick Sort": return quickSortFrames(values);
    case "Heap Sort": return heapSortFrames(values);
    case "Selection Sort": return selectionSortFrames(values);
    default: return [];
  }
}

//******************************** TREES ***************************************
function treeFrames(algorithm: string): TreeFrame[] {
  const order: string[] = [];
  const visit = (id: string | null) => {
    if (!id) return;
    const node = treeNodes.find((candidate) => candidate.id === id);
    if (!node) return;
    const left = id === "A" ? "B" : id === "B" ? "D" : id === "C" ? "F" : null;
    const right = id === "A" ? "C" : id === "B" ? "E" : id === "C" ? "G" : null;

    if (algorithm === "Pre-order Traversal") order.push(id);
    visit(left);
    if (algorithm === "In-order Traversal") order.push(id);
    visit(right);
    if (algorithm === "Post-order Traversal") order.push(id);
  };

  if (algorithm === "Level-order Traversal") {
    order.push(...["A", "B", "C", "D", "E", "F", "G"]);
  } else {
    visit("A");
  }

  const frames: TreeFrame[] = [{
    kind: "tree", activeNodeId: null, visitedNodeIds: [], 
    visitOrder: [], 
  }];
  const visited: string[] = [];
  for (const id of order) {
    visited.push(id);
    frames.push({
      kind: "tree",
      activeNodeId: id,
      visitedNodeIds: [...visited],
      visitOrder: [...visited],
    });
  }
  return frames;
}

const graphNeighbors = (id: string) => mapEdges
  .filter((edge) => edge.from === id || edge.to === id)
  .map((edge) => ({
    id: edge.from === id ? edge.to : edge.from,
    weight: edge.weight,
  }));

//********************************* GRAPHS & MAPS ***********************************
const mapFrame = (
  currentNodeId: string | null,
  visitedNodeIds: string[],
  activeEdge: [string, string] | null,
  pathNodeIds: string[],
  distances: Record<string, number>,
): MapFrame => ({
  kind: "map",
  currentNodeId,
  visitedNodeIds: [...visitedNodeIds],
  activeEdge,
  pathNodeIds: [...pathNodeIds],
  distances: { ...distances },
});

function pathTo(target: string, previous: Record<string, string | undefined>): string[] {
  const path: string[] = [];
  let node: string | undefined = target;
  while (node) {
    path.unshift(node);
    node = previous[node];
  }
  return path[0] === "A" ? path : [];
}

function breadthFirstFrames(): MapFrame[] {
  const distances = Object.fromEntries(mapNodes.map((node) => [node.id, Infinity])) as Record<string, number>;
  const previous: Record<string, string | undefined> = {};
  const queue = ["A"];
  const visited = new Set<string>(["A"]);
  const frames = [mapFrame(null, [], null, [], { ...distances, A: 0 })];
  distances.A = 0;

  while (queue.length) {
    const current = queue.shift()!;
    frames.push(mapFrame(current, [...visited], null, [], distances));
    for (const neighbor of graphNeighbors(current)) {
      if (visited.has(neighbor.id)) continue;
      visited.add(neighbor.id);
      previous[neighbor.id] = current;
      distances[neighbor.id] = distances[current] + 1;
      frames.push(mapFrame(current, [...visited], [current, neighbor.id], [], distances));
      queue.push(neighbor.id);
    }
  }

  return [...frames, mapFrame("H", [...visited], null, pathTo("H", previous), distances)];
}

function depthFirstFrames(): MapFrame[] {
  const distances = Object.fromEntries(mapNodes.map((node) => [node.id, Infinity])) as Record<string, number>;
  const previous: Record<string, string | undefined> = {};
  const stack = ["A"];
  const visited = new Set<string>();
  const frames = [mapFrame(null, [], null, [], distances)];

  while (stack.length) {
    const current = stack.pop()!;
    if (visited.has(current)) continue;
    visited.add(current);
    distances[current] = current === "A" ? 0 : distances[previous[current] ?? "A"] + 1;
    frames.push(mapFrame(current, [...visited], null, [], distances));
    const neighbors = graphNeighbors(current).reverse();
    for (const neighbor of neighbors) {
      if (visited.has(neighbor.id)) continue;
      previous[neighbor.id] ??= current;
      stack.push(neighbor.id);
      frames.push(mapFrame(current, [...visited], [current, neighbor.id], [], distances));
    }
  }

  return [...frames, mapFrame("H", [...visited], null, pathTo("H", previous), distances)];
}

function dijkstraFrames(): MapFrame[] {
  const distances = Object.fromEntries(mapNodes.map((node) => [node.id, Infinity])) as Record<string, number>;
  const previous: Record<string, string | undefined> = {};
  const visited = new Set<string>();
  distances.A = 0;
  const frames = [mapFrame(null, [], null, [], distances)];

  while (visited.size < mapNodes.length) {
    const current = mapNodes
      .map((node) => node.id)
      .filter((id) => !visited.has(id))
      .sort((a, b) => distances[a] - distances[b])[0];
    if (!current || distances[current] === Infinity) break;

    visited.add(current);
    frames.push(mapFrame(current, [...visited], null, [], distances));
    for (const neighbor of graphNeighbors(current)) {
      if (visited.has(neighbor.id)) continue;
      const candidateDistance = distances[current] + neighbor.weight;
      if (candidateDistance < distances[neighbor.id]) {
        distances[neighbor.id] = candidateDistance;
        previous[neighbor.id] = current;
      }
      frames.push(mapFrame(current, [...visited], [current, neighbor.id], [], distances));
    }
  }

  return [...frames, mapFrame("H", [...visited], null, pathTo("H", previous), distances)];
}

function mapFrames(algorithm: string): MapFrame[] {
  // Map algorithms share one graph layout, while their traversal logic differs.
  if (algorithm === "Breadth-First Search") return breadthFirstFrames();
  if (algorithm === "Depth-First Search") return depthFirstFrames();
  if (algorithm === "Dijkstra's Pathfinding") return dijkstraFrames();
  return [];
}

// The app and playback controls call one dispatcher regardless of category.
export function createAnimationFrames(
  category: AlgorithmCategory,
  algorithm: string,
  sortingValues: number[],
): AnimationFrame[] {
  if (category === "Sorting") return sortingFrames(algorithm, sortingValues);
  if (category === "Trees") return treeFrames(algorithm);
  return mapFrames(algorithm);
}
