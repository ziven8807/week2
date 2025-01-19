from collections import deque, defaultdict

class Graph:
    def __init__(self):
        self.adjacency_list = defaultdict(set)

    def add_node(self, node):
        if node not in self.adjacency_list:
            self.adjacency_list[node] = set()


    def add_edge(self, node1, node2):
        if node1 not in self.adjacency_list:
            self.add_node(node1)
        if node2 not in self.adjacency_list:
            self.add_node(node2)
        
      
        self.adjacency_list[node1].add(node2)
        self.adjacency_list[node2].add(node1)

   
    def bfs(self, start_station):
        queue = deque([start_station])
        distances = {start_station: 0}
        previous = {start_station: None}  

        while queue:
            current = queue.popleft()  

    
            for neighbor in self.adjacency_list[current]:
                if neighbor not in distances:
                    distances[neighbor] = distances[current] + 1  
                    previous[neighbor] = current  
                    queue.append(neighbor)  

        return distances, previous


    def get_path(self, start_station, end_station):
        distances, previous = self.bfs(start_station)
        path = []
        current = end_station

        while current is not None:
            path.append(current)
            current = previous.get(current)

        return path[::-1] 


    def get_neighbors(self, node):
        neighbors = self.adjacency_list.get(node)
        if neighbors:
            print(f"Neighbors of {node}:")
            for neighbor in neighbors:
                print(neighbor)
        else:
            print(f"{node} has no neighbors.")


    def print_graph(self):
        for node, edges in self.adjacency_list.items():
            print(f"{node} --> {', '.join(edges)}")



stations = [
    "Songshan", "Nanjing", "Taipei Arena", "Nanjing Fuxing", "Songjiang Nanjing", "Zhongshan",
    "Beimen", "Ximen", "Xiaonanmen", "Chiang Kai-Shek Memorial Hall", "Guting", "Taipower Building",
    "Gongguan", "Wanlong", "Jingmei", "Dapinglin", "Qizhang", "Xindian City Hall", "Xindian"
]

extra_stations = ["Xiaobitan"]

messages = {
    "Leslie": "I'm at home near Xiaobitan station.",
    "Bob": "I'm at Ximen MRT station.",
    "Mary": "I have a drink near Jingmei MRT station.",
    "Copper": "I just saw a concert at Taipei Arena.",
    "Vivian": "I'm at Xindian station waiting for you."
}


mrt_graph = Graph()

for i in range(len(stations) - 1):
    mrt_graph.add_edge(stations[i], stations[i + 1])


for station in extra_stations:
    if station == "Xiaobitan":
        mrt_graph.add_edge("Xiaobitan", "Qizhang")


all_stations = stations + extra_stations

person_station_mapping = {}

for person, message in messages.items():
    for station in all_stations:
        if station in message:
            person_station_mapping[person] = station
            break  

def find_and_print(messages, current_station):
    closest_person = None
    shortest_distance = float('inf')

    for person in messages:
        person_station = person_station_mapping[person]

      
        path = mrt_graph.get_path(current_station, person_station)
        distance = len(path) - 1  


        if distance < shortest_distance:
            shortest_distance = distance
            closest_person = person

    print(f"{closest_person}")