class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  // 添加node的function，代表捷運站，把捷運站加進去
  addNode(node) {
    if (!this.adjacencyList.has(node)) {
      this.adjacencyList.set(node, new Set());
    }
  }

  // 添加edge的function，連接兩個node（站與站的相連）
  addEdge(node1, node2) {
    if (!this.adjacencyList.has(node1)) this.addNode(node1);
    if (!this.adjacencyList.has(node2)) this.addNode(node2);

    // 連接當前站和下一站（無向圖需要雙向連接）
    this.adjacencyList.get(node1).add(node2);
    this.adjacencyList.get(node2).add(node1);
  }

  // 使用BFS計算最短路徑
  bfs(startStation) {
    const queue = [startStation];
    const distances = new Map();
    const previous = new Map(); // 用來記錄每個站的上一站，構建路徑

    distances.set(startStation, 0); // 起點的距離為0
    previous.set(startStation, null); // 起點的前一站是null

    while (queue.length > 0) {
      const current = queue.shift(); // 取出隊列的第一個元素

      // 遍歷相鄰車站
      const neighbors = this.adjacencyList.get(current);
      neighbors.forEach((neighbor) => {
        if (!distances.has(neighbor)) {
          // 若該車站未被訪問過
          distances.set(neighbor, distances.get(current) + 1); // 計算距離
          previous.set(neighbor, current); // 記錄前一站
          queue.push(neighbor); // 把相鄰車站放進隊列中
        }
      });
    }

    return { distances, previous };
  }

  // 根據previous映射還原最短路徑
  getPath(startStation, endStation) {
    const { previous } = this.bfs(startStation);
    const path = [];
    let current = endStation;

    while (current !== null) {
      path.push(current);
      current = previous.get(current);
    }

    return path.reverse(); // 返回從起點到終點的最短路徑
  }

  // 測試用function：查詢捷運站的鄰站
  getNeighbors(node) {
    const neighbors = this.adjacencyList.get(node);
    if (neighbors) {
      console.log(`Neighbors of ${node}:`);
      neighbors.forEach((neighbor) => {
        console.log(neighbor);
      });
    } else {
      console.log(`${node} has no neighbors.`);
    }
  }

  // 測試用function：打印整個松山新店線的結構
  printGraph() {
    for (let [node, edges] of this.adjacencyList.entries()) {
      let neighbors = [...edges].join(", ");
      console.log(`${node} --> ${neighbors}`);
    }
  }
}

// 車站路線
const stations = [
  "Songshan",
  "Nanjing",
  "Taipei Arena",
  "Nanjing Fuxing",
  "Songjiang Nanjing",
  "Zhongshan",
  "Beimen",
  "Ximen",
  "Xiaonanmen",
  "Chiang Kai-Shek Memorial Hall",
  "Guting",
  "Taipower Building",
  "Gongguan",
  "Wanlong",
  "Jingmei",
  "Dapinglin",
  "Qizhang",
  "Xindian City Hall",
  "Xindian",
];

const extraStations = ["Xiaobitan"];

const messages = {
  Leslie: "I'm at home near Xiaobitan station.",
  Bob: "I'm at Ximen MRT station.",
  Mary: "I have a drink near Jingmei MRT station.",
  Copper: "I just saw a concert at Taipei Arena.",
  Vivian: "I'm at Xindian station waiting for you.",
};

/*------------------------------主main----------------------------------------*/
// 創建捷運圖
const mrtGraph = new Graph();

// 用 addEdge 方法來連接車站
for (let i = 0; i < stations.length - 1; i++) {
  mrtGraph.addEdge(stations[i], stations[i + 1]);
}

// 連接附加車站與它的鄰站（例如 Xiaobitan 與 Qizhang 相連）
extraStations.forEach((station) => {
  if (station === "Xiaobitan") {
    mrtGraph.addEdge("Xiaobitan", "Qizhang");
  }
});

// 合併兩個車站列表
const allStations = [...stations, ...extraStations];

// 用來儲存人物和他們所處的車站
const personStationMapping = {};

// 遍歷 messages，為每個人物尋找對應的車站
for (const person in messages) {
  const message = messages[person];

  // 透過每個車站名檢查是否出現在 message 中
  for (const station of allStations) {
    if (message.includes(station)) {
      personStationMapping[person] = station;
      break; // 找到第一個匹配的車站後停止繼續尋找
    }
  }
}

// 定義 findAndPrint 函數
function findAndPrint(messages, currentStation) {
  let closestPerson = null;
  let shortestDistance = Infinity;

  // 遍歷 messages，計算每個人物到 currentStation 的距離
  for (const person in messages) {
    const personStation = personStationMapping[person];

    // 計算從 currentStation 到人物所在車站的最短路徑
    const path = mrtGraph.getPath(currentStation, personStation);
    const distance = path.length - 1; // 計算距離，path 的長度 - 1 即為車站數量

    // 如果找到更短的距離，更新 closestPerson
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestPerson = person;
    }
  }

  console.log(`${closestPerson}`);
}
