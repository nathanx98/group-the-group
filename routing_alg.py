# from keys import AIzaSyCm0ZhqcDDR75EnTs4EfSxFIdFIdowigCs #replace this with your own API key!
import networkx as nx
import numpy as np
import osmnx as ox

#https://github.com/gboeing/osmnx-examples/blob/master/notebooks/12-node-elevations-edge-grades.ipynb

api_key = "AIzaSyCm0ZhqcDDR75EnTs4EfSxFIdFIdowigCs"

# place_name = "Amherst,Massachusetts,USA"
# graph = ox.graph_from_place(place_name)
# fig,ax = ox.plot_graph(graph)

place = 'Amherst'
place_query = {'city':'Amherst', 'state':'Massachusetts', 'country':'USA'}
G = ox.graph_from_place(place_query, network_type='drive')


G = ox.add_node_elevations(G, api_key=api_key)
G = ox.add_edge_grades(G)


G_proj = ox.project_graph(G)

origin = ox.get_nearest_node(G, (42.3868, -72.5301))
destination = ox.get_nearest_node(G, (42.3418, -72.5884))
bbox = ox.bbox_from_point((42.3868, -72.5301), distance=6000, project_utm=True)


def impedance(length, grade):
    penalty = grade ** 2
    return length * penalty


for u, v, k, data in G_proj.edges(keys=True, data=True):
    data['impedance'] = impedance(data['length'], data['grade_abs'])
    data['rise'] = data['length'] * data['grade']


def graph(origin,destination,g):    #pass G_proj as g
    return nx.shortest_path(g, source=origin, target=destination, weight='impedance')

route_by_impedance = graph(origin,destination,G_proj)
fig, ax = ox.plot_graph_route(G_proj, route_by_impedance, bbox=bbox, node_size=0)


